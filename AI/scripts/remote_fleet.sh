#!/usr/bin/env bash
# =============================================================================
# remote_fleet.sh — one idle claude-museum session per repo = every repo
# remotely drivable from the phone (remoteControlAtStartup:true makes each
# session auto-appear in the mobile app's Code list).
#
# Idle sessions burn ZERO tokens (session hooks are shell-only; the model is
# only billed when a session is driven). Cost is RAM (~250-400 MB/session) —
# hence the cap and the duplicate guard.
#
# PROCESS OWNERSHIP: each session runs inside a named tmux session (one per
# repo+profile: `myai-fleet-<profile>-<repo>`), NOT as a bare iTerm tab. tmux
# is the process owner — the claude process survives iTerm quitting, the user
# logging out, or iTerm crashing, because it's a child of tmux's server, not
# of Terminal.app/iTerm. `start` still opens an iTerm tab per repo as a local
# convenience, but that tab only runs `tmux attach` — closing it detaches,
# it does not kill the session. (Sleep is a separate, already-solved problem:
# keep_awake.sh holds PreventSystemSleep and `pmset disablesleep=1` covers lid
# close — this only addresses the GUI-process-ownership half.)
# Requires tmux (`brew install tmux`) on the Mac running `start`.
#
# Duplicate guard (wrap-up-aware): a museum session is the repo's REMOTE
# DOORWAY — one should always exist. On start:
#   - museum session already live            → skip (doorway already there)
#   - only tech/default sessions live:
#       repo tree CLEAN  (wrapped up)        → START museum alongside (dual
#                                              session OK — wrap up completed
#                                              means no duplicate-work risk)
#       repo tree DIRTY  (mid-work)          → skip: finish with `wrap up`
#                                              first, then re-run start
#   - no session                             → start
# Operating model: claude-tech = runner; claude-museum = remote + interactive
# (interactive always ends with `wrap up`; mid-work handover = wrap up in the
# tech/default session, then pick up the museum session from the phone).
#
# ANCHOR RULE: the master AI repo's museum session is the fleet's remote
# doorway — the ONLY way to restart stopped sessions from the phone is to
# drive that session and type `remote start <repo…>` (it runs this script on
# the Mac and opens the iTerm tabs). So `stop` NEVER kills the anchor — not
# via `all`, not even by name — unless --include-anchor is passed explicitly.
# If the anchor ever dies anyway (reboot, crash), recovery needs one action
# ON the Mac: open a terminal there (or Screen Sharing/SSH) and run
# `remote_fleet.sh start AI` — then the phone has its doorway back.
#
# Usage:
#   scripts/remote_fleet.sh status                  # who is live where, which profile
#   scripts/remote_fleet.sh start [all|core|name…]  # open museum session per repo (iTerm tabs)
#   scripts/remote_fleet.sh start --last-start      # reopen EXACTLY the repos the most recent
#                                                   #   explicitly-targeted 'start' run launched
#                                                   #   (duplicate guard applies as normal; the
#                                                   #   record itself is left untouched — see
#                                                   #   --last-start below)
#   scripts/remote_fleet.sh stop  [all|name…]       # stop MUSEUM sessions only (never your
#                                                   #   interactive claude/claude-tech shells;
#                                                   #   never the master-AI anchor session)
#   scripts/remote_fleet.sh stop --last-start       # stop ONLY the sessions the most recent
#                                                   #   'start' run actually launched (undo a
#                                                   #   start without touching already-live
#                                                   #   sessions; anchor rule still applies)
#   scripts/remote_fleet.sh attach [all|core|name…] # open an iTerm tab attached to an already-
#                                                   #   running tmux session (no new claude
#                                                   #   process) — the recovery move when iTerm
#                                                   #   itself was quit/crashed but the fleet's
#                                                   #   tmux sessions are still alive
# Options:
#   --dry-run         print what would happen, do nothing
#   --max N           cap sessions started in one run (default 12 — RAM guard)
#   --profile P       config-dir suffix to launch with (default museum)
#   --include-anchor  allow `stop` to kill the master-AI anchor session too
#   --last-start      (start/stop) target the repos recorded by the last real
#                     explicitly-targeted 'start' run — the record at
#                     ~/.myai-remote-fleet-last-start, machine-local. With no
#                     record on this machine, --last-start is a clean error.
#                     DECISION (documented, do not change casually): a
#                     'start --last-start' run NEVER rewrites the record. The
#                     record always means "the last start whose repo set the
#                     operator chose explicitly", so stop --last-start /
#                     start --last-start form a stable, re-runnable toggle
#                     pair over the same set — reopening from the record (where
#                     some repos may be skipped as already live) can't shrink
#                     what a later stop --last-start acts on.
#
# Repo set: config/remote_fleet.txt (one path per line, ~ ok, # comments).
# `core` = master AI + agentFlow + connect (the product trio).
# =============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd)"
MASTER_PATH="$(cd "$SCRIPT_DIR/.." && pwd)"
FLEET_FILE="$MASTER_PATH/config/remote_fleet.txt"
CORE_NAMES="AI agentFlow connect"

ACTION="${1:-status}"; shift 2>/dev/null || true

DRY_RUN=false; MAX=12; PROFILE="museum"; INCLUDE_ANCHOR=false; LAST_START=false
LAST_START_FILE="$HOME/.myai-remote-fleet-last-start"
TARGETS=()
while [ $# -gt 0 ]; do
  case "$1" in
    --dry-run) DRY_RUN=true ;;
    --max) shift; MAX="${1:-12}" ;;
    --profile) shift; PROFILE="${1:-museum}" ;;
    --include-anchor) INCLUDE_ANCHOR=true ;;
    --last-start) LAST_START=true ;;
    *) TARGETS+=("$1") ;;
  esac
  shift
done
[ ${#TARGETS[@]} -eq 0 ] && TARGETS=(all)

CONFIG_DIR="$HOME/.claude-$PROFILE"
if [ "${REMOTE_FLEET_LIB_ONLY:-0}" != 1 ]; then
  [ -d "$CONFIG_DIR" ] || { echo "✗ profile config dir not found: $CONFIG_DIR" >&2; exit 1; }
fi

# ── repo set ──────────────────────────────────────────────────────────────────
expand_tilde() { case "$1" in "~/"*) printf '%s' "$HOME/${1#\~/}" ;; *) printf '%s' "$1" ;; esac; }

fleet_paths() { # all configured fleet repo paths, expanded, existing git repos only
  [ -f "$FLEET_FILE" ] || { echo "✗ $FLEET_FILE missing" >&2; return 1; }
  grep -vE '^\s*(#|$)' "$FLEET_FILE" | while IFS= read -r line; do
    p="$(expand_tilde "$line")"
    [ -e "$p/.git" ] && printf '%s\n' "$p"
  done
}

# resolve TARGETS (all|core|names) → newline-separated paths
resolve_targets() {
  local want sel paths p name
  paths="$(fleet_paths)"
  for want in "${TARGETS[@]}"; do
    case "$want" in
      all)  printf '%s\n' "$paths" ;;
      core) for name in $CORE_NAMES; do
              printf '%s\n' "$paths" | while IFS= read -r p; do
                [ "$(basename "$p")" = "$name" ] && printf '%s\n' "$p"
              done
            done ;;
      *)    sel="$(printf '%s\n' "$paths" | while IFS= read -r p; do
                [ "$(basename "$p")" = "$want" ] && printf '%s\n' "$p"
              done)"
            if [ -n "$sel" ]; then printf '%s\n' "$sel"
            else echo "  !! unknown fleet repo: $want (see $FLEET_FILE)" >&2; fi ;;
    esac
  done | awk '!seen[$0]++'
}

# ── live-process discovery ────────────────────────────────────────────────────
# claude_procs → lines "pid|cwd|profile" for every running claude CLI process.
claude_procs() {
  local pid cwd prof
  ps -axo pid=,command= | awk '$2 ~ /(^|\/)claude$/ || $2 ~ /(^|\/)claude / {print $1}' | while read -r pid; do
    cwd="$(lsof -a -p "$pid" -d cwd -Fn 2>/dev/null | sed -n 's/^n//p' | head -1)"
    [ -n "$cwd" ] || continue
    prof="$(ps eww "$pid" 2>/dev/null | grep -o 'CLAUDE_CONFIG_DIR=[^ ]*' | head -1 | sed 's|.*/\.claude-\{0,1\}||')"
    [ -n "$prof" ] || prof="default"
    printf '%s|%s|%s\n' "$pid" "$cwd" "$prof"
  done
}

procs_for_repo() { # $1=repo path, $2=all claude procs → matching lines
  printf '%s\n' "$2" | awk -F'|' -v repo="$1" '$2 == repo'
}

# tree_state <repo> → "clean" | "residue" | "DIRTY"
# DIRTY = real mid-work: modified TRACKED files that are not framework
# propagation (AI/, .claude/, hooks/, CLAUDE/GEMINI/AGENTS.md), not ephemeral
# state caches, and not nested-git-repo pointers (a parent shows "M <subrepo>"
# whenever the sub-repo's content moves — that's the sub-repo's business).
# residue = only untracked files / framework noise (wrapped, safe to coexist).
tree_state() {
  local p="$1" line st path real=0 any=0
  while IFS= read -r line; do
    [ -n "$line" ] || continue
    any=1
    st="${line:0:2}"; path="${line:3}"; path="${path%\"}"; path="${path#\"}"
    case "$st" in "??"*) continue ;; esac
    case "$path" in
      AI/*|.claude/*|hooks/*|CLAUDE.md|GEMINI.md|AGENTS.md) continue ;;
    esac
    [ -e "$p/$path/.git" ] && continue
    real=1; break
  done <<EOF
$(git -C "$p" status --porcelain 2>/dev/null)
EOF
  if [ "$real" = 1 ]; then echo "DIRTY"; elif [ "$any" = 1 ]; then echo "residue"; else echo "clean"; fi
}

tree_clean() { # 0 when no REAL mid-work (clean or residue) — the dual-session gate
  [ "$(tree_state "$1")" != "DIRTY" ]
}

# is_anchor <repo> → 0 when repo is the master AI repo (the fleet's remote
# doorway). Detected by signature, not by this script's own location — the
# script propagates into every managed repo's AI/, but only the MASTER has
# update_all.sh + managed_repos.txt at its repo ROOT.
is_anchor() {
  [ -f "$1/scripts/update_all.sh" ] && [ -f "$1/config/managed_repos.txt" ]
}

# tmux_session_name <profile> <reponame> → the tmux session that owns the
# repo's claude process (one per repo+profile, so museum and any other
# profile can coexist without colliding). Sanitized: tmux session names
# can't contain ':' or whitespace.
tmux_session_name() {
  local prof="$1" name="$2" clean
  clean="$(printf '%s' "$name" | tr -c 'A-Za-z0-9_-' '_')"
  printf 'myai-fleet-%s-%s' "$prof" "$clean"
}

# Indirected behind a function (not an inline `command -v tmux`) so tests can
# stub it independently of whether tmux happens to be installed on the CI/dev
# machine running the suite, and independently of the tmux() shell-function
# stub tests already install for has-session/new-session/etc.
tmux_available() { command -v tmux >/dev/null 2>&1; }

require_tmux() {
  tmux_available || { echo "✗ tmux not found — install with: brew install tmux" >&2; exit 1; }
}

# ── remote-control handshake verification (task-52b349fb) ────────────────────
# `start` used to report "started" purely on the tmux session existing — but a
# tmux session coming up healthy says nothing about whether the claude process
# inside actually registered Remote Control. Observed failure: a session
# spawned into a directory that already had a live claude process from another
# profile inherited a dead/archived binding — the pane showed "Remote Control
# disconnected ... (code 4090)" / "/rc failed" while the tmux session and pid
# looked perfectly healthy, so the session was invisible on the phone despite
# `start` printing success.
#
# poll_remote_control <tmux_name> → "ok" | "failed:<detail>" | "unconfirmed"
# Polls the pane's captured text for the known failure signature or a positive
# remote-control signal (the QR/URL screen or an explicit active/enabled/ready
# state — see documentation/MOBILE_CONTROL.md), up to REMOTE_FLEET_RC_TIMEOUT
# seconds. Neither signal by the deadline is reported as "unconfirmed" — never
# silently treated as success.
REMOTE_FLEET_RC_TIMEOUT="${REMOTE_FLEET_RC_TIMEOUT:-15}"
REMOTE_FLEET_RC_POLL_INTERVAL="${REMOTE_FLEET_RC_POLL_INTERVAL:-1}"
poll_remote_control() {
  local tname="$1" waited=0 pane fail_line
  while [ "$waited" -lt "$REMOTE_FLEET_RC_TIMEOUT" ]; do
    pane="$(tmux capture-pane -t "$tname" -p 2>/dev/null || true)"
    fail_line="$(printf '%s\n' "$pane" | grep -iE 'remote control disconnected|/rc failed|\(code 4090\)' | tail -1 || true)"
    if [ -n "$fail_line" ]; then
      printf 'failed:%s\n' "$fail_line"
      return 0
    fi
    if printf '%s\n' "$pane" | grep -qiE 'remote control (is )?(active|enabled|connected|ready)|scan.*qr code|remote-control.*(active|enabled|ready)'; then
      echo "ok"
      return 0
    fi
    sleep "$REMOTE_FLEET_RC_POLL_INTERVAL"
    waited=$((waited + REMOTE_FLEET_RC_POLL_INTERVAL))
  done
  echo "unconfirmed"
}

# ── status ────────────────────────────────────────────────────────────────────
do_status() {
  local procs p matches line pid prof
  procs="$(claude_procs)"
  echo "REMOTE FLEET — live claude sessions per fleet repo (profile $PROFILE = phone-drivable)"
  printf '%-22s %-10s %-8s %s\n' "REPO" "STATUS" "TREE" "SESSIONS"
  fleet_paths | while IFS= read -r p; do
    tree="$(tree_state "$p")"
    matches="$(procs_for_repo "$p" "$procs")"
    if [ -z "$matches" ]; then
      printf '%-22s %-10s %-8s %s\n' "$(basename "$p")" "-" "$tree" "none"
    else
      printf '%-22s %-10s %-8s ' "$(basename "$p")" "LIVE" "$tree"
      printf '%s\n' "$matches" | while IFS='|' read -r pid _ prof; do
        tname="$(tmux_session_name "$prof" "$(basename "$p")")"
        if command -v tmux >/dev/null 2>&1 && tmux has-session -t "$tname" 2>/dev/null; then
          printf '[%s pid %s tmux:%s] ' "$prof" "$pid" "$tname"
        else
          printf '[%s pid %s] ' "$prof" "$pid"
        fi
      done
      echo
    fi
  done
  # sessions running OUTSIDE fleet repos (context, not managed)
  echo
  echo "(other live claude sessions: $(printf '%s\n' "$procs" | grep -c . || true) total across all dirs — 'start' only skips exact repo matches)"
  # tmux dependency check (task-52b349fb): surface this BEFORE the operator
  # reaches for their phone and finds 'start' hard-failing with no warning.
  tmux_available \
    || echo "⚠ tmux not found — 'start'/'attach' will hard-fail. Install with: brew install tmux (macOS) or your package manager. (also flagged by \`myai doctor\`)"
}

# ── start ─────────────────────────────────────────────────────────────────────
# start_targets → the repo paths 'start' should act on: the recorded last-start
# set (--last-start) or the usual all|core|name resolution.
start_targets() {
  if $LAST_START; then
    grep -vE '^\s*(#|$)' "$LAST_START_FILE" || true
  else
    resolve_targets
  fi
}

do_start() {
  # A sleeping Mac drops every websocket and kills these sessions — hold a
  # power assertion before spawning any. Non-fatal; prints the lid-close gap.
  [ -x "$(dirname "$0")/keep_awake.sh" ] && "$(dirname "$0")/keep_awake.sh" || true

  $DRY_RUN || require_tmux

  local procs started=0 skipped=0 rc_ok=0 rc_failed=0 rc_unconfirmed=0 rc_status p name matches cmd tmux_name attach_cmd script_lines="" started_paths=""
  if $LAST_START; then
    if [ ! -s "$LAST_START_FILE" ]; then
      echo "✗ --last-start: no record at $LAST_START_FILE (no 'start' has run on this machine yet)" >&2
      exit 1
    fi
    if ! grep -qvE '^\s*(#|$)' "$LAST_START_FILE"; then
      echo "  (last 'start' run launched nothing — nothing to reopen)"
      return 0
    fi
  fi
  procs="$(claude_procs)"
  while IFS= read -r p; do
    [ -n "$p" ] || continue
    name="$(basename "$p")"
    if $LAST_START && [ ! -e "$p/.git" ]; then
      echo "  !! $name — recorded path is no longer a git repo ($p), skipped"
      continue
    fi
    matches="$(procs_for_repo "$p" "$procs")"
    if [ -n "$(printf '%s\n' "$matches" | awk -F'|' -v pr="$PROFILE" '$3 == pr')" ]; then
      echo "  ↷ $name — $PROFILE remote session already live (skipped)"
      skipped=$((skipped + 1)); continue
    fi
    if [ -n "$matches" ]; then
      if tree_clean "$p"; then
        echo "  ⚠ $name — interactive session ALREADY LIVE (different profile) + repo is CLEAN (wrapped up) → starting $PROFILE remote doorway ALONGSIDE. KNOWN TRIGGER (task-52b349fb): a session spawned into a directory with an existing live claude process can come up with a dead/archived remote-control binding (\"Remote Control disconnected ... code 4090\") even though the tmux session itself looks perfectly healthy — the handshake check below will catch this; if it reports FAILED, attach and run /remote-control manually. Don't drive both sessions at once."
      else
        echo "  ✋ $name — interactive session MID-WORK (uncommitted changes) — finish with 'wrap up' there, then re-run start (skipped)"
        skipped=$((skipped + 1)); continue
      fi
    fi
    if [ "$started" -ge "$MAX" ]; then
      echo "  !! cap reached (--max $MAX) — remaining repos skipped this run"
      break
    fi
    tmux_name="$(tmux_session_name "$PROFILE" "$name")"
    cmd="CLAUDE_CONFIG_DIR='$CONFIG_DIR' exec claude"
    if $DRY_RUN; then
      echo "  ▶ would start [$PROFILE] $name — tmux session '$tmux_name' in $p: $cmd (iTerm tab attaches to it)"
    else
      # tmux, not iTerm, owns the process: create/replace the named session
      # first, then queue an iTerm tab that only ATTACHES — closing/crashing
      # iTerm from here on detaches, it does not kill the session.
      if tmux has-session -t "$tmux_name" 2>/dev/null; then
        echo "  ⟳ $name — stale tmux session '$tmux_name' found with no live claude match — recreating"
        tmux kill-session -t "$tmux_name" 2>/dev/null || true
      fi
      tmux new-session -d -s "$tmux_name" -c "$p" "$cmd"
      # Verify the /rc handshake actually completed BEFORE claiming the
      # session is phone-drivable (task-52b349fb) — a healthy tmux session
      # says nothing about whether claude registered Remote Control inside it.
      rc_status="$(poll_remote_control "$tmux_name")"
      case "$rc_status" in
        ok)
          echo "  ▶ starting [$PROFILE] $name (tmux: $tmux_name) — remote-control handshake OK"
          rc_ok=$((rc_ok + 1)) ;;
        unconfirmed)
          echo "  ? $name — tmux session up (tmux: $tmux_name) but remote-control handshake UNCONFIRMED after ${REMOTE_FLEET_RC_TIMEOUT}s — check the phone's Code list; if it's not there: tmux attach -t $tmux_name, then run /remote-control (or /rc) inside"
          rc_unconfirmed=$((rc_unconfirmed + 1)) ;;
        failed:*)
          echo "  ✗ FAILED $name — remote-control handshake FAILED (tmux: $tmux_name): ${rc_status#failed:}. Session is up but NOT phone-drivable. Retry: tmux attach -t $tmux_name, then run /remote-control (or /rc) inside the pane."
          rc_failed=$((rc_failed + 1)) ;;
      esac
      attach_cmd="tmux attach -t '$tmux_name'"
      if [ -z "$script_lines" ]; then
        script_lines="tell application \"iTerm\"
  activate
  set fleetWin to (create window with default profile)
  tell current session of fleetWin to write text \"$attach_cmd\""
      else
        script_lines="$script_lines
  tell fleetWin
    create tab with default profile
    tell current session to write text \"$attach_cmd\"
  end tell"
      fi
    fi
    started=$((started + 1))
    started_paths="${started_paths}${p}
"
  done <<EOF
$(start_targets)
EOF
  if ! $DRY_RUN && [ -n "$script_lines" ]; then
    osascript -e "$script_lines
end tell" >/dev/null
  fi
  # record what THIS run launched (machine-local) so 'stop --last-start' can
  # undo exactly this start without touching sessions that were already live.
  # A 'start --last-start' run deliberately does NOT rewrite the record (see
  # header): the record stays "the last explicitly-targeted start", keeping
  # start/stop --last-start a stable toggle over the same repo set.
  if ! $DRY_RUN && ! $LAST_START; then
    {
      echo "# repos started by the last 'remote_fleet.sh start' run on $(hostname -s)"
      printf '%s' "$started_paths"
    } > "$LAST_START_FILE"
  fi
  echo
  if $DRY_RUN; then
    echo "started: $started  skipped(already live): $skipped  (~$((started * 350)) MB new RAM)"
  else
    echo "started: $started  rc-ok: $rc_ok  rc-FAILED: $rc_failed  rc-unconfirmed: $rc_unconfirmed  skipped(already live): $skipped  (~$((started * 350)) MB new RAM)"
    [ "$rc_failed" -gt 0 ] && echo "⚠ $rc_failed session(s) came up but did NOT pass the remote-control handshake — see FAILED lines above, they are NOT phone-drivable yet."
    [ "$rc_unconfirmed" -gt 0 ] && echo "? $rc_unconfirmed session(s) unconfirmed — check the phone's Code list before relying on them."
  fi
  [ "$started" -gt 0 ] && ! $DRY_RUN && echo "Each new session attempts to auto-enable Remote Control (museum settings) — verified above, not assumed; also check the phone's Code list."
  return 0
}

# ── stop ──────────────────────────────────────────────────────────────────────
# stop_targets → the repo paths 'stop' should act on: the recorded last-start
# set (--last-start) or the usual all|core|name resolution.
stop_targets() {
  if $LAST_START; then
    if [ ! -s "$LAST_START_FILE" ]; then
      echo "✗ --last-start: no record at $LAST_START_FILE (no 'start' has run on this machine yet)" >&2
      return 0
    fi
    grep -vE '^\s*(#|$)' "$LAST_START_FILE" || {
      echo "  (last 'start' run launched nothing — nothing to stop)" >&2
      true
    }
  else
    resolve_targets
  fi
}

do_stop() {
  local procs p name stopped=0 pid prof tmux_name
  procs="$(claude_procs)"
  while IFS= read -r p; do
    [ -n "$p" ] || continue
    name="$(basename "$p")"
    if is_anchor "$p" && ! $INCLUDE_ANCHOR; then
      echo "  ⚓ $name — ANCHOR doorway (master AI repo), never stopped: it's the only phone-reachable session that can 'remote start' the others back (override: --include-anchor)"
      continue
    fi
    procs_for_repo "$p" "$procs" | while IFS='|' read -r pid _ prof; do
      if [ "$prof" = "$PROFILE" ]; then
        tmux_name="$(tmux_session_name "$prof" "$name")"
        if command -v tmux >/dev/null 2>&1 && tmux has-session -t "$tmux_name" 2>/dev/null; then
          if $DRY_RUN; then echo "  ■ would stop [$prof] $name (tmux session $tmux_name)"
          else tmux kill-session -t "$tmux_name" 2>/dev/null && echo "  ■ stopped [$prof] $name (tmux session $tmux_name)"; fi
        else
          # no owning tmux session found (pre-tmux session, or tmux missing) — fall back to killing the pid directly
          if $DRY_RUN; then echo "  ■ would stop [$prof] $name (pid $pid)"
          else kill "$pid" 2>/dev/null && echo "  ■ stopped [$prof] $name (pid $pid)"; fi
        fi
      else
        echo "  ↷ $name pid $pid is [$prof] — left alone (only $PROFILE sessions are stopped)"
      fi
    done
    stopped=$((stopped + 1))
  done <<EOF
$(stop_targets)
EOF
  return 0
}

# ── attach ────────────────────────────────────────────────────────────────────
# Recovery move for the chronic GUI-binding problem: tmux owns the process, so
# if iTerm was quit/crashed the claude process is still alive in its tmux
# session — this just opens a fresh iTerm tab attached to it. No new claude
# process, no duplicate guard needed (attaching is not starting).
do_attach() {
  require_tmux
  local procs p name matches tmux_name attach_cmd script_lines="" attached=0
  procs="$(claude_procs)"
  while IFS= read -r p; do
    [ -n "$p" ] || continue
    name="$(basename "$p")"
    matches="$(procs_for_repo "$p" "$procs")"
    if [ -z "$(printf '%s\n' "$matches" | awk -F'|' -v pr="$PROFILE" '$3 == pr')" ]; then
      echo "  ↷ $name — no live $PROFILE session found (use 'start' first)"
      continue
    fi
    tmux_name="$(tmux_session_name "$PROFILE" "$name")"
    if ! tmux has-session -t "$tmux_name" 2>/dev/null; then
      echo "  !! $name — claude process is live but no tmux session '$tmux_name' found (predates the tmux migration?) — nothing to attach to"
      continue
    fi
    attach_cmd="tmux attach -t '$tmux_name'"
    if $DRY_RUN; then
      echo "  ▶ would open iTerm tab attached to $tmux_name"
    else
      if [ -z "$script_lines" ]; then
        script_lines="tell application \"iTerm\"
  activate
  set fleetWin to (create window with default profile)
  tell current session of fleetWin to write text \"$attach_cmd\""
      else
        script_lines="$script_lines
  tell fleetWin
    create tab with default profile
    tell current session to write text \"$attach_cmd\"
  end tell"
      fi
      echo "  ▶ attaching iTerm tab to [$PROFILE] $name (tmux: $tmux_name)"
    fi
    attached=$((attached + 1))
  done <<EOF
$(resolve_targets)
EOF
  if ! $DRY_RUN && [ -n "$script_lines" ]; then
    osascript -e "$script_lines
end tell" >/dev/null
  fi
  echo
  echo "attached: $attached"
  return 0
}

# When sourced with REMOTE_FLEET_LIB_ONLY=1 (scripts/tests/test_remote_fleet.sh),
# stop here: functions + parsed defaults are defined, nothing dispatches.
if [ "${REMOTE_FLEET_LIB_ONLY:-0}" = "1" ]; then return 0 2>/dev/null || exit 0; fi

case "$ACTION" in
  status) do_status ;;
  start)  do_start ;;
  stop)   do_stop ;;
  attach) do_attach ;;
  -h|--help|help) awk 'NR==1{next} /^# =+$/{if(++seen==2) exit; next} {sub(/^# ?/,""); print}' "$0" ;;
  *) echo "unknown action: $ACTION (status|start|stop|attach)" >&2; exit 2 ;;
esac
