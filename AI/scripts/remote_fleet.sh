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
# DOORWAY — one should always exist, and it is identified by its LABEL
# ("<DEVICE> - <repo>", passed as `claude -n`), never merely by "some session of
# this profile is running in that repo". An unlabelled session is not a doorway:
# the phone's Code list titles it from its own first prompt, which reads like the
# repo's last commit. See session_label_of_pid for the full history. On start:
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
#   scripts/remote_fleet.sh sessions                # EVERY session on this Mac: REMOTE / LIVE / OFFLINE + label
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
#   scripts/remote_fleet.sh rc-keepalive [all|core|name…]  # KEEP DOORWAYS PHONE-DRIVABLE
#                                                   #   (SWARM_MESSAGING P4): re-arm any doorway
#                                                   #   whose Remote Control binding has DROPPED
#                                                   #   (bridgeSessionId null after a sleep /
#                                                   #   gateway restart — tmux + pid still look
#                                                   #   healthy so `status` shows LIVE while the
#                                                   #   phone can't see it). Only re-arms doorways
#                                                   #   this script's tmux owns; healthy ones are
#                                                   #   left untouched. Safe on a timer / from
#                                                   #   `boot`. --dry-run reports without touching.
#   scripts/remote_fleet.sh live-note --to <addr> --subject <text> [--from <addr>] \
#                          [--body <text>] [--swarm <id>] [--reply-to <id>]
#                                                   #   MIRROR A LIVE SendMessage INTO THE DURABLE
#                                                   #   MAILBOX as kind:live-note (SWARM_MESSAGING
#                                                   #   P4 / guardrail §3: no agent-only channel
#                                                   #   outside the gateway — every live note is
#                                                   #   summarised into the mailbox so it shows on
#                                                   #   /swarm and survives the recipient being
#                                                   #   asleep). Addresses: host | host/repo |
#                                                   #   repo | role. --from defaults to this
#                                                   #   host/repo. --dry-run prints, sends nothing.
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
# live-note flags (P4): populated only by the `live-note` action, ignored by all
# others. Kept out of TARGETS so they never look like a repo name.
NOTE_TO=""; NOTE_FROM=""; NOTE_SUBJECT=""; NOTE_BODY=""; NOTE_SWARM=""; NOTE_REPLY=""
TARGETS=()
while [ $# -gt 0 ]; do
  case "$1" in
    --dry-run) DRY_RUN=true ;;
    --max) shift; MAX="${1:-12}" ;;
    --profile) shift; PROFILE="${1:-museum}" ;;
    --include-anchor) INCLUDE_ANCHOR=true ;;
    --last-start) LAST_START=true ;;
    --to) shift; NOTE_TO="${1:-}" ;;
    --from) shift; NOTE_FROM="${1:-}" ;;
    --subject) shift; NOTE_SUBJECT="${1:-}" ;;
    --body) shift; NOTE_BODY="${1:-}" ;;
    --swarm) shift; NOTE_SWARM="${1:-}" ;;
    --reply-to) shift; NOTE_REPLY="${1:-}" ;;
    *) TARGETS+=("$1") ;;
  esac
  shift
done
[ ${#TARGETS[@]} -eq 0 ] && TARGETS=(all)

CONFIG_DIR="$HOME/.claude-$PROFILE"
if [ "${REMOTE_FLEET_LIB_ONLY:-0}" != 1 ]; then
  [ -d "$CONFIG_DIR" ] || { echo "✗ profile config dir not found: $CONFIG_DIR" >&2; exit 1; }
fi

# Session display name — "<DEVICE> - <repo>", passed to `claude -n`.
# WHY: the phone's Code list titles a remote session from its FIRST prompt, so a
# doorway that starts nameless ends up called "Agent mode -min" — identical
# across repos and machines, and unactionable when five doorways on two Macs are
# all "Connected" at once (the subtitle carries owner/repo but never the device).
# -n pins device+repo into the title up front and costs no model turn.
DEVICE="${REMOTE_FLEET_DEVICE:-$(hostname -s 2>/dev/null || echo unknown)}"
session_display_name() { printf '%s - %s' "$DEVICE" "$1"; }

# ── repo set ──────────────────────────────────────────────────────────────────
expand_tilde() { case "$1" in "~/"*) printf '%s' "$HOME/${1#\~/}" ;; *) printf '%s' "$1" ;; esac; }

# fleet_root_ok <path> → 0 for a git repo OR a myAI workspace folder (.mcp.json,
# e.g. POWERHOUSE/WEBSITE, a parent of several repos the operator drives as one).
# Workspaces have no .git; tree_state reads them as "clean" (git status is empty).
fleet_root_ok() { [ -e "$1/.git" ] || [ -e "$1/.mcp.json" ]; }

fleet_paths() { # all configured fleet paths, expanded, existing repos/workspaces only
  [ -f "$FLEET_FILE" ] || { echo "✗ $FLEET_FILE missing" >&2; return 1; }
  grep -vE '^\s*(#|$)' "$FLEET_FILE" | while IFS= read -r line; do
    p="$(expand_tilde "$line")"
    fleet_root_ok "$p" && printf '%s\n' "$p"
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
# Display name a LIVE session was actually launched with (`claude -n '<name>'`)
# → "<DEVICE> - <repo>", or empty when the session carries no -n at all.
#
# WHY THIS IS VERIFIED AND NOT ASSUMED (operator report, 2026-09-11: "it makes
# the last commit as the remote session header"): `-n` is a CREATION-ONLY flag —
# there is no runtime rename, no /rename — so a session that started nameless
# stays nameless for life, and the phone's Code list falls back to its own
# auto-generated title, which reads like the repo's last commit subject. The
# labelling commit (c7df549f) only ever applied -n to sessions THIS script
# spawns, while do_start's same-profile branch skipped on "a museum session
# exists in this repo", never on "a LABELLED doorway exists in this repo". So
# any museum session in the repo — the operator's own hand-started one, or a
# doorway predating c7df549f — made start skip, no labelled doorway was ever
# created, and the header stayed auto-generated. The label IS the doorway
# contract: assert it, don't assume it.
#
# Reads the rest of the command line after -n/--name, because the name contains
# spaces ("<DEVICE> - <repo>") and ps reports it unquoted; this script always
# passes -n last, so there is nothing after the name to swallow.
session_label_of_pid() {
  [ -n "${1:-}" ] || return 0
  ps -o command= -p "$1" 2>/dev/null | awk '
    {
      for (i = 1; i <= NF; i++) {
        if ($i == "-n" || $i == "--name") {
          for (j = i + 1; j <= NF; j++) printf "%s%s", (j > i + 1 ? " " : ""), $j
          printf "\n"; exit
        }
        if ($i ~ /^--name=/) {
          sub(/^--name=/, "", $i)
          for (j = i; j <= NF; j++) printf "%s%s", (j > i ? " " : ""), $j
          printf "\n"; exit
        }
      }
    }'
}

# Remote Control state of a LIVE session → "on" | "off" | "" (no record = unknown).
# WHY: a correct label is not a doorway on its own. 2026-09-29: the AI doorway
# 'PH11911 - AI' was labelled, tmux-owned and idle, but its Remote Control
# binding had dropped (bridgeSessionId null), so it was not on the phone while
# start skipped it as "already live" and the boot reported PASS. The source of
# truth is claude's own per-session record, the same one do_sessions reads.
# REMOTE_FLEET_SESSIONS_ROOT overrides $HOME (tests).
session_rc_of_pid() { # $1=pid $2=profile
  local root="${REMOTE_FLEET_SESSIONS_ROOT:-$HOME}" dir f
  if [ "$2" = "default" ]; then dir="$root/.claude"; else dir="$root/.claude-$2"; fi
  f="$dir/sessions/$1.json"
  [ -f "$f" ] || return 0
  if grep -Eq '"bridgeSessionId": *"' "$f"; then echo on; else echo off; fi
}

# pid|cwd|profile|label|rc — label is the 4th field (empty = nameless session),
# rc the 5th (see session_rc_of_pid). '|' is stripped from the label so a
# hostname or repo containing it cannot shift the record's field layout.
claude_procs() {
  local pid cwd prof label rc
  ps -axo pid=,command= | awk '$2 ~ /(^|\/)claude$/ || $2 ~ /(^|\/)claude / {print $1}' | while read -r pid; do
    cwd="$(lsof -a -p "$pid" -d cwd -Fn 2>/dev/null | sed -n 's/^n//p' | head -1)"
    [ -n "$cwd" ] || continue
    prof="$(ps eww "$pid" 2>/dev/null | grep -o 'CLAUDE_CONFIG_DIR=[^ ]*' | head -1 | sed 's|.*/\.claude-\{0,1\}||')"
    [ -n "$prof" ] || prof="default"
    label="$(session_label_of_pid "$pid" | tr '|' '/')"
    rc="$(session_rc_of_pid "$pid" "$prof")"
    printf '%s|%s|%s|%s|%s\n' "$pid" "$cwd" "$prof" "$label" "$rc"
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

# tmux_owns_pid <tmux_name> <pid> → true only when <pid> (or an ancestor) is a
# pane process of that tmux session. WHY: the name alone is not ownership. A
# hand-started session in a repo that ALSO has a tmux doorway maps to the same
# name, so has-session said "tmux-owned" and stop/start killed the doorway
# instead of the pid they were acting on (2026-09-29: pid 32121 in AI was
# tagged tmux:myai-fleet-museum-AI, which held a different session). No
# pipeline (grep -q + SIGPIPE under pipefail — see is_self_process).
tmux_owns_pid() {
  local panes pid="$2" depth=0 nl='
'
  command -v tmux >/dev/null 2>&1 || return 1
  panes="$(tmux list-panes -t "$1" -F '#{pane_pid}' 2>/dev/null)" || return 1
  [ -n "$panes" ] || return 1
  while [ -n "$pid" ] && [ "$pid" -gt 1 ] 2>/dev/null && [ "$depth" -lt 12 ]; do
    case "$nl$panes$nl" in *"$nl$pid$nl"*) return 0 ;; esac
    pid="$(ps -o ppid= -p "$pid" 2>/dev/null | tr -d ' ')"
    depth=$((depth + 1))
  done
  return 1
}

# True when the CALLER is running inside this tmux session. `wrap up` archives
# its own repo's doorway (CORE_KEYWORDS → wrap up), and a wrap up driven FROM
# the phone runs inside that very session — killing it there would decapitate
# the pane mid-handoff-write. Guarded in do_stop: skip, don't kill.
is_current_tmux_session() {
  [ -n "${TMUX:-}" ] || return 1
  [ "$(tmux display-message -p '#S' 2>/dev/null)" = "$1" ]
}

# Ancestor pids of this shell, self included (capped walk, no infinite loop on a
# reparented pid). WHY: the tmux check above is NOT sufficient. A museum-profile
# session can run OUTSIDE tmux (a plain terminal with Remote Control attached is
# still profile=museum, so claude_procs lists it and do_stop's no-tmux fallback
# would `kill` it). `wrap up` archiving its own doorway from such a session would
# kill itself mid-handoff-write. Identity is the pid, not the tmux name.
self_pid_chain() {
  local pid=$$ depth=0
  while [ -n "$pid" ] && [ "$pid" -gt 1 ] 2>/dev/null && [ "$depth" -lt 12 ]; do
    printf '%s\n' "$pid"
    pid="$(ps -o ppid= -p "$pid" 2>/dev/null | tr -d ' ')"
    depth=$((depth + 1))
  done
}

# NO PIPELINE HERE, deliberately. `self_pid_chain | grep -qxF "$1"` looks
# equivalent and is not: grep -q exits on the first match while the chain walk is
# still forking `ps`, the walk dies of SIGPIPE, and this script runs under
# `pipefail` — so the function returned 141 and every self-check silently read as
# "not me". Caught only by running the real script (the unit suite drops
# errexit/pipefail after sourcing, so a pipeline bug passes there).
is_self_process() { # $1 = candidate claude pid
  [ -n "${1:-}" ] || return 1
  local chain p
  chain="$(self_pid_chain)"
  for p in $chain; do
    [ "$p" = "$1" ] && return 0
  done
  return 1
}

# Indirected behind a function (not an inline `command -v tmux`) so tests can
# stub it independently of whether tmux happens to be installed on the CI/dev
# machine running the suite, and independently of the tmux() shell-function
# stub tests already install for has-session/new-session/etc.
tmux_available() { command -v tmux >/dev/null 2>&1; }

# Indirected so tests can point it at a stub. Both call sites (do_start holds,
# do_stop releases) go through this.
KEEP_AWAKE_SH="${KEEP_AWAKE_SH:-$(dirname "$0")/keep_awake.sh}"

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
  local procs p matches line pid prof label flag
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
      printf '%s\n' "$matches" | while IFS='|' read -r pid _ prof label rc; do
        tname="$(tmux_session_name "$prof" "$(basename "$p")")"
        # An unlabelled phone-drivable session is a DEFECT, not a detail: the
        # phone titles it from its own first prompt (reads like the last
        # commit) instead of "<DEVICE> - <repo>". Show it here so the drift is
        # visible before the operator reaches for their phone. Every profile,
        # not just $PROFILE: Remote Control is on in all of them, and the
        # setup_org_dirs.sh wrappers label hand-started sessions too.
        flag=""
        if [ "$label" != "$(session_display_name "$(basename "$p")")" ]; then
          if [ -n "$label" ]; then flag=" MISLABELLED:$label"; else flag=" UNLABELLED"; fi
        fi
        # Labelled or not, a dropped Remote Control binding = not on the phone.
        [ "$rc" = "off" ] && flag="$flag RC-OFF"
        if tmux_owns_pid "$tname" "$pid"; then
          printf '[%s pid %s tmux:%s%s] ' "$prof" "$pid" "$tname" "$flag"
        else
          printf '[%s pid %s%s] ' "$prof" "$pid" "$flag"
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
  [ -x "$KEEP_AWAKE_SH" ] && "$KEEP_AWAKE_SH" || true

  $DRY_RUN || require_tmux

  local procs started=0 skipped=0 rc_ok=0 rc_failed=0 rc_unconfirmed=0 rc_status p name matches cmd tmux_name attach_cmd script_lines="" started_paths=""
  local expected same_prof other_prof unlabelled_pid unlabelled_label _cand _clabel
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
    if $LAST_START && ! fleet_root_ok "$p"; then
      echo "  !! $name — recorded path is no longer a repo/workspace ($p), skipped"
      continue
    fi
    matches="$(procs_for_repo "$p" "$procs")"
    expected="$(session_display_name "$name")"
    same_prof="$(printf '%s\n' "$matches" | awk -F'|' -v pr="$PROFILE" '$3 == pr')"
    if [ -n "$same_prof" ]; then
      # THE DOORWAY CONTRACT IS THE LABEL, NOT THE PROCESS. Skipping on "a
      # $PROFILE session exists here" is what let an unlabelled session stand in
      # for a doorway forever (see session_label_of_pid). Only a session
      # carrying "<DEVICE> - <repo>" AND a live Remote Control binding counts as
      # the doorway (rc "off" = dropped; "" = no record, benefit of the doubt).
      if [ -n "$(printf '%s\n' "$same_prof" | awk -F'|' -v want="$expected" '$4 == want && $5 != "off"')" ]; then
        echo "  ↷ $name — $PROFILE remote session already live, labelled '$expected' (skipped)"
        skipped=$((skipped + 1)); continue
      fi
      tmux_name="$(tmux_session_name "$PROFILE" "$name")"
      # With several unlabelled sessions (a hand-started one beside our old
      # doorway), act on the one our tmux session actually owns — picking the
      # first listed made start treat the doorway as hand-started, then kill
      # it as a "stale" session anyway before spawning.
      unlabelled_pid="" unlabelled_label=""
      while IFS='|' read -r _cand _ _ _clabel _; do
        if [ -n "$_cand" ] && tmux_owns_pid "$tmux_name" "$_cand"; then
          unlabelled_pid="$_cand"; unlabelled_label="$_clabel"; break
        fi
      done <<EOF
$same_prof
EOF
      if [ -z "$unlabelled_pid" ]; then
        unlabelled_pid="$(printf '%s\n' "$same_prof" | awk -F'|' 'NR == 1 { print $1 }')"
        unlabelled_label="$(printf '%s\n' "$same_prof" | awk -F'|' 'NR == 1 { print $4 }')"
      fi
      if is_self_process "$unlabelled_pid" || is_current_tmux_session "$tmux_name"; then
        # Cannot be repaired in place: -n is creation-only and this is the
        # session running this very command. Say so plainly and hand over the
        # one-liner instead of silently reporting a healthy skip.
        if [ "$unlabelled_label" = "$expected" ]; then
          echo "  ⊘ $name — THIS session (pid $unlabelled_pid) is labelled '$expected' but its Remote Control is OFF, so the phone cannot see it. Run /remote-control inside it."
        elif [ -n "$unlabelled_label" ]; then
          echo "  ⊘ $name — THIS session (pid $unlabelled_pid) is the only $PROFILE session here and it is labelled '$unlabelled_label', not '$expected'."
        else
          echo "  ⊘ $name — THIS session (pid $unlabelled_pid) is the only $PROFILE session here and it carries NO -n label, so the phone titles it from its own first prompt (it reads like the repo's last commit), not '$expected'."
        fi
        echo "     A running session cannot be relabelled (-n is creation-only, there is no /rename). Leave this session, then: bash AI/scripts/remote_fleet.sh start $name"
        skipped=$((skipped + 1)); continue
      fi
      if ! tree_clean "$p"; then
        echo "  ✋ $name — $PROFILE session pid $unlabelled_pid is not labelled '$expected' but the repo is MID-WORK — not touching it (finish with 'wrap up' there, then re-run start) (skipped)"
        skipped=$((skipped + 1)); continue
      fi
      if tmux_available && tmux_owns_pid "$tmux_name" "$unlabelled_pid"; then
        # This pid is the pane of OUR tmux session = a genuine doorway that
        # lost (or never had) its label. Safe to recreate: it is ours.
        if $DRY_RUN; then
          echo "  ⟳ $name — would recreate tmux-owned doorway pid $unlabelled_pid (unlabelled) as '$expected'"
        else
          if [ "$unlabelled_label" = "$expected" ]; then
            echo "  ⟳ $name — doorway pid $unlabelled_pid is tmux-owned ($tmux_name) and labelled, but its Remote Control is OFF (not on the phone) → recreating it"
          else
            echo "  ⟳ $name — doorway pid $unlabelled_pid is tmux-owned ($tmux_name) but not labelled '$expected' → recreating it labelled"
          fi
          tmux kill-session -t "$tmux_name" 2>/dev/null || true
        fi
      else
        # Not ours: a hand-started $PROFILE session. Never kill the operator's
        # own work — start the labelled doorway alongside it (tree is clean) so
        # the phone still gets "<DEVICE> - <repo>"; the next run then sees the
        # labelled doorway and skips normally.
        echo "  ⚠ $name — a $PROFILE session (pid $unlabelled_pid) is live here with no doorway label and is NOT tmux-owned by this script, so it is a hand-started session, not a doorway — NOT killing it. Starting the labelled doorway ALONGSIDE. Don't drive both at once."
      fi
    fi
    # ONLY other-profile matches reach here: a same-profile match was either
    # skipped as the labelled doorway or already handled (recreate / warn)
    # above, and keying this block on "$matches" made it print its
    # "different profile" line for a same-profile session too.
    other_prof="$(printf '%s\n' "$matches" | awk -F'|' -v pr="$PROFILE" '$3 != pr')"
    if [ -n "$other_prof" ]; then
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
    # --remote-control '<label>' turns Remote Control on AND names the phone's
    # entry at launch, instead of relying on the profile setting. -n stays LAST
    # (session_label_of_pid reads to end of line) and labels the local session.
    # unset ANTHROPIC_API_KEY: morning_boot.sh exports all of .env (set -a), and
    # the tmux server it spawns keeps that env — a doorway that sees the key runs
    # on API billing and Remote Control never comes up (2026-10-01, PH13292).
    cmd="unset ANTHROPIC_API_KEY; CLAUDE_CONFIG_DIR='$CONFIG_DIR' exec claude --dangerously-skip-permissions --remote-control '$(session_display_name "$name")' -n '$(session_display_name "$name")'"
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
    # NON-FATAL. tmux already owns every session started above; the iTerm tab is
    # a convenience. From an unattended launchd run (the `boot` routine's
    # doorway phase) iTerm can be unscriptable (TCC, no GUI yet) — under
    # `set -e` that used to abort here, before the last-start record below was
    # written, and made a healthy doorway look like a failed start.
    if ! osascript -e "$script_lines
end tell" >/dev/null 2>&1; then
      echo "  ⚠ iTerm attach failed (osascript) — sessions are up under tmux; open the tabs later with: bash $0 attach ${TARGETS[*]}"
    fi
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
  local procs p name stopped=0 pid prof tmux_name remaining
  # The inner loop runs in a subshell (pipe into `while read`), so it cannot
  # export what it stopped — it records the pids in this file instead.
  STOPPED_PIDS_FILE="$(mktemp -t rf-stopped.XXXXXX)"
  procs="$(claude_procs)"
  while IFS= read -r p; do
    [ -n "$p" ] || continue
    name="$(basename "$p")"
    if is_anchor "$p" && ! $INCLUDE_ANCHOR; then
      echo "  ⚓ $name — ANCHOR doorway (master AI repo), never stopped: it's the only phone-reachable session that can 'remote start' the others back (override: --include-anchor)"
      continue
    fi
    procs_for_repo "$p" "$procs" | while IFS='|' read -r pid _ prof _; do
      if [ "$prof" = "$PROFILE" ]; then
        tmux_name="$(tmux_session_name "$prof" "$name")"
        if is_current_tmux_session "$tmux_name" || is_self_process "$pid"; then
          echo "  ⊘ $name — this IS the session you are running in (pid $pid) — not stopping itself. It archives on the next 'remote start' / '-min' boot, which relabels it '$(session_display_name "$name")'."
          continue
        fi
        if tmux_owns_pid "$tmux_name" "$pid"; then
          if $DRY_RUN; then echo "  ■ would stop [$prof] $name (tmux session $tmux_name)"
          else tmux kill-session -t "$tmux_name" 2>/dev/null \
                 && { echo "  ■ stopped [$prof] $name (tmux session $tmux_name)"; printf '%s\n' "$pid" >> "$STOPPED_PIDS_FILE"; } \
                 || true; fi
        else
          # no owning tmux session found (pre-tmux session, or tmux missing) — fall back to killing the pid directly
          if $DRY_RUN; then echo "  ■ would stop [$prof] $name (pid $pid)"
          else kill "$pid" 2>/dev/null \
                 && { echo "  ■ stopped [$prof] $name (pid $pid)"; printf '%s\n' "$pid" >> "$STOPPED_PIDS_FILE"; } \
                 || true; fi
        fi
      else
        echo "  ↷ $name pid $pid is [$prof] — left alone (only $PROFILE sessions are stopped)"
      fi
    done
    stopped=$((stopped + 1))
  done <<EOF
$(stop_targets)
EOF

  # The power assertion exists FOR these sessions, so it must not outlive them.
  # 2026-09-12: an orphaned `caffeinate -dimsu` from `start` (nohup+disown,
  # "asserting forever") kept the operator's Mac awake — and therefore UNLOCKED,
  # because the screen-lock countdown only starts when the display sleeps — for
  # 15h, since nothing ever released it. Re-snapshot AFTER the kills: the
  # snapshot taken at the top of do_stop still lists what we just stopped.
  if ! $DRY_RUN; then
    remaining="$(fleet_paths | while IFS= read -r fp; do procs_for_repo "$fp" "$procs"; done \
                 | awk -F'|' -v pr="$PROFILE" '$3 == pr { print $1 }' \
                 | grep -vxF -f "$STOPPED_PIDS_FILE" 2>/dev/null | grep -c . || true)"
    if [ "${remaining:-0}" -eq 0 ]; then
      [ -x "$KEEP_AWAKE_SH" ] && "$KEEP_AWAKE_SH" --release || true
    else
      echo "  ⏻ keep-awake held: $remaining $PROFILE session(s) still live on this machine"
    fi
  fi
  rm -f "$STOPPED_PIDS_FILE"
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

# ── rc-keepalive (SWARM_MESSAGING P4) ───────────────────────────────────────────
# A doorway is only useful while its Remote Control binding is LIVE. That binding
# drops on its own — a websocket death when the Mac sleeps, a gateway restart, the
# 2026-09-29 'PH11911 - AI' incident — leaving the tmux session and pid perfectly
# healthy (so `status` prints LIVE) while the phone can no longer see it
# (bridgeSessionId → null, session_rc_of_pid → "off"). `start` already recreates
# such a doorway, but only inside a full sweep: dual-session warnings, iTerm tabs,
# the RAM cap, the last-start record rewrite. rc-keepalive is the focused,
# idempotent, side-effect-light re-arm meant to run on a timer or from `boot`:
# for every fleet doorway whose Remote Control has DROPPED and which THIS script's
# tmux owns, kill+respawn it with --remote-control and verify the handshake.
#   rc "on"   → healthy, left untouched.
#   rc "off"  → dropped:
#                 · tmux-owned by us            → re-arm (kill + respawn + verify)
#                 · the CURRENT session         → can't (-n/--remote-control are
#                                                  creation-only); print the manual
#                                                  /remote-control one-liner
#                 · hand-started, not ours       → never killed; print the fix
#   rc ""     → no per-session record (can't prove dropped) → left as-is, reported.
# No labelled doorway for a repo → reported (run `start <name>`), never spawned:
# creating a doorway is `start`'s job, keeping one alive is this one's. --dry-run
# reports what it would re-arm and touches nothing. The re-armed process is
# tmux-owned and phone-drivable immediately; re-open a LOCAL iTerm tab (optional)
# with `attach <name>`.
do_rc_keepalive() {
  $DRY_RUN || require_tmux
  local procs p name expected matches same_prof door pid rc tmux_name rc_status cmd
  local rearmed=0 healthy=0 failed=0 nodoor=0 skipped=0 held=false
  procs="$(claude_procs)"
  while IFS= read -r p; do
    [ -n "$p" ] || continue
    name="$(basename "$p")"
    expected="$(session_display_name "$name")"
    matches="$(procs_for_repo "$p" "$procs")"
    same_prof="$(printf '%s\n' "$matches" | awk -F'|' -v pr="$PROFILE" '$3 == pr')"
    # the labelled doorway line for this repo (may be empty); rc = 5th field.
    door="$(printf '%s\n' "$same_prof" | awk -F'|' -v want="$expected" '$4 == want' | head -1)"
    if [ -z "$door" ]; then
      echo "  ↷ $name — no $PROFILE doorway labelled '$expected' is live (run: start $name)"
      nodoor=$((nodoor + 1)); continue
    fi
    pid="$(printf '%s' "$door" | awk -F'|' '{print $1}')"
    rc="$(printf '%s' "$door" | awk -F'|' '{print $5}')"
    tmux_name="$(tmux_session_name "$PROFILE" "$name")"
    if [ "$rc" = "on" ]; then
      echo "  ✓ $name — Remote Control on (pid $pid) — phone-drivable, left untouched"
      healthy=$((healthy + 1)); continue
    fi
    if [ -z "$rc" ]; then
      echo "  ? $name — no Remote Control record for pid $pid — can't prove a drop, left as-is (check the phone's Code list)"
      skipped=$((skipped + 1)); continue
    fi
    # rc == "off" → the binding has dropped.
    if is_self_process "$pid" || is_current_tmux_session "$tmux_name"; then
      echo "  ⊘ $name — THIS session (pid $pid) has Remote Control OFF. A running session can't be re-armed from outside (-n/--remote-control are creation-only, there is no /rename) — run /remote-control inside it."
      skipped=$((skipped + 1)); continue
    fi
    if ! tmux_owns_pid "$tmux_name" "$pid"; then
      echo "  ⚠ $name — doorway pid $pid has Remote Control OFF but is NOT tmux-owned by this script (hand-started) — NOT killing it. Attach and run /remote-control, or: stop $name && start $name."
      skipped=$((skipped + 1)); continue
    fi
    if $DRY_RUN; then
      echo "  ⟳ $name — would re-arm Remote Control: recreate tmux doorway '$tmux_name' (pid $pid) with --remote-control"
      rearmed=$((rearmed + 1)); continue
    fi
    # The doorway is ours and dropped → recreate it. Hold the power assertion once
    # (a re-armed doorway is a live session the Mac must stay awake for), lazily so
    # a run that re-arms nothing never asserts.
    if ! $held; then
      [ -x "$KEEP_AWAKE_SH" ] && "$KEEP_AWAKE_SH" || true
      held=true
    fi
    tmux kill-session -t "$tmux_name" 2>/dev/null || true
    cmd="unset ANTHROPIC_API_KEY; CLAUDE_CONFIG_DIR='$CONFIG_DIR' exec claude --dangerously-skip-permissions --remote-control '$expected' -n '$expected'"
    tmux new-session -d -s "$tmux_name" -c "$p" "$cmd"
    rc_status="$(poll_remote_control "$tmux_name")"
    case "$rc_status" in
      ok)
        echo "  ⟳ $name — Remote Control re-armed (tmux: $tmux_name) — handshake OK"
        rearmed=$((rearmed + 1)) ;;
      unconfirmed)
        echo "  ? $name — re-armed (tmux: $tmux_name) but handshake UNCONFIRMED after ${REMOTE_FLEET_RC_TIMEOUT}s — check the phone's Code list; if absent: tmux attach -t $tmux_name, then /remote-control"
        rearmed=$((rearmed + 1)) ;;
      failed:*)
        echo "  ✗ FAILED $name — re-arm handshake FAILED (tmux: $tmux_name): ${rc_status#failed:}. Session is up but NOT phone-drivable. Retry: tmux attach -t $tmux_name, then /remote-control."
        failed=$((failed + 1)) ;;
    esac
  done <<EOF
$(resolve_targets)
EOF
  echo
  echo "rc-keepalive: re-armed: $rearmed  healthy: $healthy  FAILED: $failed  no-doorway: $nodoor  skipped: $skipped"
  [ "$failed" -gt 0 ] && echo "⚠ $failed doorway(s) failed to re-arm — see FAILED lines above, they are NOT phone-drivable yet."
  return 0
}

# ── live-note (SWARM_MESSAGING P4 / guardrail §3) ────────────────────────────────
# Mirror a live SendMessage (the fast path when both ends are online) into the
# DURABLE mailbox as kind:live-note, so guardrail §3 holds — "no agent-only channel
# exists outside the gateway; live SendMessage calls are summarised to the mailbox
# as kind:live-note". The mirror makes the note (a) visible on /swarm via the same
# event-bus every mail emits, and (b) durable, so a peer that was asleep when the
# live message flew still sees it in mail_inbox. SendMessage itself is a Claude Code
# harness tool (Anthropic Remote Control), not repo code — so a session that used
# it runs this one-liner right after to record the summary.
#   remote_fleet.sh live-note --to <addr> --subject "<what you told them>" \
#       [--from <addr>] [--body "<detail>"] [--swarm <id>] [--reply-to <id>]
# Addresses resolve by convention (mailbox-store normalises casing): host,
# host/repo, repo, or role. --from defaults to this host/repo. Exit 0 on send,
# 1 if the gateway is unreachable or mail_send errors (so a caller/automation
# knows the mirror did NOT happen), 2 on bad arguments. --dry-run prints the
# would-send line and touches nothing.
do_live_note() {
  local root rid_lib gw_lib host repo from to subj body swarm reply url payload resp mid
  [ -n "$NOTE_TO" ]      || { echo "✗ live-note: --to <address> is required (host | host/repo | repo | role)" >&2; exit 2; }
  [ -n "$NOTE_SUBJECT" ] || { echo "✗ live-note: --subject \"<text>\" is required" >&2; exit 2; }
  root="$MASTER_PATH"
  host="$(hostname -s 2>/dev/null | tr '[:upper:]' '[:lower:]')"
  for rid_lib in "$root/scripts/lib/repo_id.sh" "$root/AI/scripts/lib/repo_id.sh"; do
    # shellcheck source=/dev/null
    [ -f "$rid_lib" ] && . "$rid_lib" && break
  done
  if command -v canonical_repo_id >/dev/null 2>&1; then repo="$(canonical_repo_id "$root")"; else repo="$(basename "$root")"; fi
  repo="$(printf '%s' "$repo" | tr '[:upper:]' '[:lower:]')"
  from="${NOTE_FROM:-$host/$repo}"
  to="$NOTE_TO"; subj="$NOTE_SUBJECT"; body="${NOTE_BODY:-$NOTE_SUBJECT}"; swarm="$NOTE_SWARM"; reply="$NOTE_REPLY"
  if $DRY_RUN; then
    echo "  ▶ would mirror live-note → mailbox: from=$from to=$to kind=live-note subject=\"$subj\"${swarm:+ swarm=$swarm}"
    return 0
  fi
  for gw_lib in "$root/scripts/lib/gateway.sh" "$root/AI/scripts/lib/gateway.sh"; do
    # shellcheck source=/dev/null
    [ -f "$gw_lib" ] && . "$gw_lib" && break
  done
  GATEWAY_LOCAL_TOKEN="${GATEWAY_LOCAL_TOKEN:-myai-local-bridge-dev}"
  url="http://localhost:${MCP_PORT:-3100}/mcp"
  # Build the JSON-RPC body in python so subject/body with quotes or newlines are
  # escaped correctly (a raw shell heredoc would corrupt the payload).
  payload="$(TO="$to" FROM="$from" SUBJ="$subj" BODY="$body" SWARM="$swarm" REPLY="$reply" /usr/bin/python3 -c '
import json, os
args = {"to": os.environ["TO"], "from": os.environ["FROM"], "kind": "live-note",
        "subject": os.environ["SUBJ"], "body": os.environ["BODY"]}
if os.environ.get("SWARM"): args["swarmId"] = os.environ["SWARM"]
if os.environ.get("REPLY"): args["replyTo"] = os.environ["REPLY"]
print(json.dumps({"jsonrpc":"2.0","method":"tools/call","id":1,
                  "params":{"name":"mail_send","arguments":args}}))
' 2>/dev/null || true)"
  [ -n "$payload" ] || { echo "✗ live-note: could not build request (python3 missing?)" >&2; exit 1; }
  resp="$(curl -sf -m 6 -X POST "$url" -H 'content-type: application/json' \
      -H "x-gateway-local-token: $GATEWAY_LOCAL_TOKEN" -d "$payload" 2>/dev/null || true)"
  if [ -z "$resp" ]; then
    echo "✗ live-note: gateway unreachable at $url — the live note was NOT mirrored to the mailbox (start the gateway, then retry)." >&2
    exit 1
  fi
  mid="$(printf '%s' "$resp" | /usr/bin/python3 -c '
import sys, json
try:
    outer = json.loads(sys.stdin.read())
    data = json.loads(outer["result"]["content"][0]["text"])
except Exception:
    print("ERR:unparseable gateway response"); sys.exit(0)
if data.get("error"):
    print("ERR:" + str(data["error"])); sys.exit(0)
msg = data.get("message") or {}
print(msg.get("messageId") or "sent")
' 2>/dev/null || true)"
  case "${mid:-ERR:empty}" in
    ERR:*) echo "✗ live-note: mail_send failed: ${mid#ERR:}" >&2; exit 1 ;;
    *)     echo "  ✉ live-note mirrored to mailbox → $to (id ${mid}, kind live-note)${swarm:+, swarm $swarm}" ;;
  esac
  return 0
}

# ── sessions ──────────────────────────────────────────────────────────────────
# Every claude session on THIS Mac, any profile, any directory — grouped by what
# the phone can do with it. Source of truth is claude's own per-session record
# (<profile>/sessions/<pid>.json): `name` + `nameSource` ("user" = our -n label,
# "derived" = claude's auto name like 'azure-1e', which is what the phone shows),
# `bridgeSessionId` present = Remote Control attached, and `status`. A record
# whose pid is gone (or reused by a non-claude process) is OFFLINE: the phone
# may still list it — archive it there. REMOTE_FLEET_PROFILE_DIRS overrides the
# profile dirs scanned (tests).
do_sessions() {
  # An array, not a word-split string: a profile dir with a space in it would
  # otherwise arrive as two argv entries. REMOTE_FLEET_PROFILE_DIRS stays a
  # space-separated override (tests).
  local dirs=() d
  if [ -n "${REMOTE_FLEET_PROFILE_DIRS:-}" ]; then
    read -r -a dirs <<< "$REMOTE_FLEET_PROFILE_DIRS"
  else
    for d in "$HOME/.claude" "$HOME"/.claude-*; do
      if [ -d "$d/sessions" ]; then dirs+=("$d"); fi
    done
  fi
  DEVICE="$DEVICE" python3 - ${dirs[@]+"${dirs[@]}"} <<'PY'
import glob, json, os, subprocess, sys
device = os.environ["DEVICE"]
rows = {"REMOTE": [], "LIVE": [], "OFFLINE": []}
for d in sys.argv[1:]:
    prof = os.path.basename(d).replace(".claude-", "").replace(".claude", "default")
    for f in sorted(glob.glob(os.path.join(d, "sessions", "*.json"))):
        try:
            j = json.load(open(f))
        except Exception:
            continue
        pid = j.get("pid")
        try:
            comm = subprocess.run(["ps", "-o", "command=", "-p", str(pid)],
                                  capture_output=True, text=True).stdout.strip()
        except Exception:
            comm = ""
        alive = "claude" in comm.split(" ")[0]
        repo = os.path.basename((j.get("cwd") or "").rstrip("/")) or "?"
        name = j.get("name") or ""
        want = f"{device} - {repo}"
        if name == want:
            label = name
        elif j.get("nameSource") == "user" and name:
            label = f"{name}  (custom)"
        else:
            label = f"UNLABELLED — auto-named '{name or '?'}'"
        grp = "OFFLINE" if not alive else ("REMOTE" if j.get("bridgeSessionId") else "LIVE")
        rows[grp].append((repo, prof, str(pid), j.get("status") or "-", label))
heads = {
    "REMOTE":  "REMOTE — live, Remote Control on (in the phone's Code list, drivable)",
    "LIVE":    "LIVE — running here, NO Remote Control (not reachable from the phone)",
    "OFFLINE": "OFFLINE — process gone (phone may still list it — archive it there)",
}
print(f"SESSIONS on {device} — every claude session, all profiles")
for g in ("REMOTE", "LIVE", "OFFLINE"):
    print(f"\n{heads[g]}  [{len(rows[g])}]")
    if not rows[g]:
        print("  (none)")
    for r in sorted(rows[g]):
        print(f"  {r[0]:<18} {r[1]:<9} pid {r[2]:<7} {r[3]:<6} {r[4]}")
PY
}

# When sourced with REMOTE_FLEET_LIB_ONLY=1 (scripts/tests/test_remote_fleet.sh),
# stop here: functions + parsed defaults are defined, nothing dispatches.
if [ "${REMOTE_FLEET_LIB_ONLY:-0}" = "1" ]; then return 0 2>/dev/null || exit 0; fi

case "$ACTION" in
  status) do_status ;;
  start)  do_start ;;
  stop)   do_stop ;;
  attach) do_attach ;;
  rc-keepalive|rc-check) do_rc_keepalive ;;
  live-note) do_live_note ;;
  sessions) do_sessions ;;
  -h|--help|help) awk 'NR==1{next} /^# =+$/{if(++seen==2) exit; next} {sub(/^# ?/,""); print}' "$0" ;;
  *) echo "unknown action: $ACTION (status|sessions|start|stop|attach|rc-keepalive|live-note)" >&2; exit 2 ;;
esac
