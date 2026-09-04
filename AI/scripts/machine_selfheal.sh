#!/usr/bin/env bash
# machine_selfheal.sh — idempotently bring THIS Mac's MACHINE-LOCAL config in
# line with the repo, so multi-machine setup needs zero manual steps. Safe to
# run every session: silent + no-op when already correct. Invoked by the
# 18-machine-selfheal session hook AND documented in the `agent mode` protocol.
#
# Why: things like the launchd runner interval and the deployed statusline live
# OUTSIDE git (per-machine launchd plists / ~/.claude-* files). Without this,
# every new/other Mac needs manual re-setup. This self-heals them on session
# start instead.
#
# Corrects (only what drifted):
#   1. Statusline — redeploy ~/.claude-org-statusline.sh from
#      scripts/org-statusline.sh when missing/stale (so repo dir name + model +
#      colour-blind-safe palette always render).
#   2. Runner cadence — if the launchd CLI runner is ALREADY installed at an
#      old hour+ interval (>=3600s), bump it to the 10-min default and reload.
#      NEVER auto-installs the runner (that stays a deliberate opt-in) and never
#      overrides a deliberate sub-hour custom interval.
#
# Steps 1-4, 6-10 and 12 are macOS only (launchd/plutil/pmset/Docker-Desktop);
# skips on vm/cloud and when prerequisites are absent. bash 3.2-safe. Steps 11
# and 5 are plain git/docker/python3 — no macOS dependency — so they run on any
# host (Linux dev machines, Linux CI) and are gated separately above, ahead of
# the Darwin check.
set +e

[ "$(hostname -s 2>/dev/null)" = "vm" ] && exit 0

SCRIPT_DIR=$(cd "$(dirname "$0")" 2>/dev/null && pwd) || exit 0
REPO_ROOT_SH="$(cd "$SCRIPT_DIR/.." 2>/dev/null && pwd)"
CHANGED=""

# ── 11. Git-remote SSH→HTTPS auth fallback (LL 2026-07-06/07) ─────────────────
# Two agentFlow sessions hit "SSH transport was broken on this machine (no
# key)" after a machine switch to PH11911 and had to hand-flip `origin` to
# HTTPS via a gh token each time, noting the next agent on a different machine
# would need the same fix — a per-session manual step on every machine switch.
# Probe SSH reachability once per session; when this Mac has no usable key for
# github.com, auto-fall-back `origin` from git@github.com:… to
# https://github.com/… using `gh` as the git credential helper (never embeds a
# raw token in .git/config). Tags the flip with git config
# `myai.origin-auth-fallback=1` so a later session on a Mac WITH a working key
# can tell the HTTPS remote was automatic and restore SSH — never touches a
# remote the user deliberately pointed at HTTPS themselves. Cross-platform
# (git/ssh/gh only) — runs ahead of the macOS-only gate below.
if [ -n "$REPO_ROOT_SH" ] && command -v git >/dev/null 2>&1; then
    ORIGIN_URL=$(git -C "$REPO_ROOT_SH" remote get-url origin 2>/dev/null)
    AUTO_FLIPPED=$(git -C "$REPO_ROOT_SH" config --get myai.origin-auth-fallback 2>/dev/null)
    case "$ORIGIN_URL" in
        git@github.com:*)
            if command -v ssh >/dev/null 2>&1; then
                SSH_OUT=$(ssh -T git@github.com -o BatchMode=yes -o StrictHostKeyChecking=accept-new -o ConnectTimeout=5 2>&1)
                case "$SSH_OUT" in
                    *"successfully authenticated"*) : ;;  # SSH key works — nothing to do
                    *)
                        if command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1; then
                            SLUG=$(echo "$ORIGIN_URL" | sed -e 's|^git@github\.com:||' -e 's|\.git$||')
                            HTTPS_URL="https://github.com/${SLUG}.git"
                            if gh auth setup-git >/dev/null 2>&1 \
                               && git -C "$REPO_ROOT_SH" remote set-url origin "$HTTPS_URL" 2>/dev/null \
                               && git -C "$REPO_ROOT_SH" config myai.origin-auth-fallback 1 >/dev/null 2>&1; then
                                CHANGED="$CHANGED origin-ssh-to-https-fallback($SLUG)"
                                echo "machine-selfheal: 🔑 SSH auth to github.com unavailable on this Mac (no usable key) — origin switched to HTTPS via the gh credential helper."
                            fi
                        else
                            echo "machine-selfheal: 🟠 SSH auth to github.com is broken on this Mac (no usable key) and gh is not authenticated — origin left as SSH, git operations will fail."
                            echo "                  Fix: gh auth login   (then re-run scripts/machine_selfheal.sh), or install/load an SSH key for this Mac."
                        fi
                        ;;
                esac
            fi
            ;;
        https://github.com/*)
            # Only restore SSH when THIS script performed the earlier fallback.
            if [ "$AUTO_FLIPPED" = "1" ] && command -v ssh >/dev/null 2>&1; then
                SSH_OUT=$(ssh -T git@github.com -o BatchMode=yes -o StrictHostKeyChecking=accept-new -o ConnectTimeout=5 2>&1)
                case "$SSH_OUT" in
                    *"successfully authenticated"*)
                        SLUG=$(echo "$ORIGIN_URL" | sed -e 's|^https://github\.com/||' -e 's|\.git$||')
                        SSH_URL="git@github.com:${SLUG}.git"
                        if git -C "$REPO_ROOT_SH" remote set-url origin "$SSH_URL" 2>/dev/null \
                           && git -C "$REPO_ROOT_SH" config --unset myai.origin-auth-fallback 2>/dev/null; then
                            CHANGED="$CHANGED origin-https-restored-to-ssh($SLUG)"
                            echo "machine-selfheal: 🔑 SSH key now works on this Mac — origin restored from the auto HTTPS fallback back to SSH."
                        fi
                        ;;
                esac
            fi
            ;;
    esac
fi

# ── 5. Gateway image staleness warning (merged ≠ deployed) ──
# A gateway PR merged to main does NOT update the running container — twice now a
# stale gateway silently broke the fleet (06-26: missing tasks_update{repo};
# 07-02: missing tasks_claim → runner claimed NOTHING for 6 days while 56 tasks
# sat pending). Compare the myai-gateway image build time against the last commit
# touching runtime/ — warn when the image is older. Warn-only (a rebuild mid-
# session is the operator's/agent's call): docker compose build gateway && up -d.
#
# Streak escalation (this warning was previously fire-and-forget — nothing
# tracked whether it kept recurring session after session, so a genuinely-stuck
# staleness read no differently than a first-time blip and could go ignored
# indefinitely). A lightweight gitignored counter at state/.gateway-staleness-
# streak persists count/first_epoch/last_epoch across sessions; escalates the
# message at 3 and 6 consecutive detections. Debounced 5 minutes so re-running
# this script multiple times within one live session doesn't inflate the count.
# Cleared only on a CONFIRMED fresh image (both timestamps known, image newer) —
# left untouched when docker/git can't answer (unknown ≠ resolved).
#
# Active alert escalation (§5b): the tiers above are still just boot-log prints
# — passive banners among a dozen other session-start hook lines, easy to
# scroll past across a run of `-min` sessions (the gateway has sat stale for
# entire multi-session stretches before). Once staleness has persisted past
# GATEWAY_STALE_ALERT_HOURS (default 24, measured from FIRST detection), §5b
# pushes a notification-engine alert (notifications_send → Telegram/dashboard,
# same mechanism as mongo_sync_staleness.sh / brain_sync_canary.sh) so it
# lands on a phone instead of only in a scrollback. Detection/alerting ONLY —
# NEVER rebuilds the shared gateway (deploy guard: rebuilds are interactive
# ops from the MASTER checkout). Re-alerts at most once per
# GATEWAY_STALE_ALERT_COOLDOWN_HOURS (default 24); the last-alert epoch
# persists as alert_epoch in the same streak file and is only advanced on a
# SUCCESSFUL send, so a failed send retries next session.
#
# Plain git/docker/python3 — no macOS dependency — so (like §11 above) this
# runs on any host, ahead of the Darwin gate below (Linux dev machines, Linux
# CI). Was previously placed AFTER the Darwin gate, which silently no-opped
# this entire warning + its streak counter on Linux CI — the portability gap
# that made scripts/tests/test_machine_selfheal_gateway_staleness.sh fail only
# in CI while passing on every macOS dev machine.
if [ -n "$REPO_ROOT_SH" ] && command -v docker >/dev/null 2>&1; then
    GW_IMG=$(docker inspect --format '{{.Image}}' myai-gateway 2>/dev/null)
    if [ -n "$GW_IMG" ]; then
        # Epoch seconds on both sides — docker Created is UTC, git %cI is local-offset;
        # comparing them as strings would false-fire by up to a timezone width.
        IMG_TS=$(docker inspect --format '{{.Created}}' "$GW_IMG" 2>/dev/null | /usr/bin/python3 -c '
import sys, datetime
s = sys.stdin.read().strip()[:19]
try: print(int(datetime.datetime.strptime(s, "%Y-%m-%dT%H:%M:%S").replace(tzinfo=datetime.timezone.utc).timestamp()))
except Exception: pass' 2>/dev/null)
        SRC_TS=$(cd "$REPO_ROOT_SH" && git log -1 --format=%ct -- runtime/ 2>/dev/null)
        STREAK_FILE="$REPO_ROOT_SH/state/.gateway-staleness-streak"
        if [ -n "$IMG_TS" ] && [ -n "$SRC_TS" ]; then
            if [ "$IMG_TS" -lt "$SRC_TS" ] 2>/dev/null; then
                NOW_EPOCH=$(date +%s)
                PREV_COUNT=0 PREV_LAST=0 PREV_FIRST="" PREV_ALERT=0
                if [ -f "$STREAK_FILE" ]; then
                    PREV_COUNT=$(grep -E '^count=' "$STREAK_FILE" 2>/dev/null | head -1 | cut -d= -f2)
                    PREV_LAST=$(grep -E '^last_epoch=' "$STREAK_FILE" 2>/dev/null | head -1 | cut -d= -f2)
                    PREV_FIRST=$(grep -E '^first_epoch=' "$STREAK_FILE" 2>/dev/null | head -1 | cut -d= -f2)
                    PREV_ALERT=$(grep -E '^alert_epoch=' "$STREAK_FILE" 2>/dev/null | head -1 | cut -d= -f2)
                    case "$PREV_COUNT" in ''|*[!0-9]*) PREV_COUNT=0 ;; esac
                    case "$PREV_LAST" in ''|*[!0-9]*) PREV_LAST=0 ;; esac
                    case "$PREV_ALERT" in ''|*[!0-9]*) PREV_ALERT=0 ;; esac
                fi
                FIRST_EPOCH="${PREV_FIRST:-$NOW_EPOCH}"
                # A corrupt first_epoch would break both the message and the
                # §5b age arithmetic — reset it to now (restarts the clock,
                # never crashes the hook).
                case "$FIRST_EPOCH" in ''|*[!0-9]*) FIRST_EPOCH=$NOW_EPOCH ;; esac
                DEBOUNCE_SECS=300
                ELAPSED=$((NOW_EPOCH - PREV_LAST))
                if [ "$PREV_LAST" -gt 0 ] && [ "$ELAPSED" -lt "$DEBOUNCE_SECS" ]; then
                    STREAK_COUNT="$PREV_COUNT"
                else
                    STREAK_COUNT=$((PREV_COUNT + 1))
                fi
                mkdir -p "$(dirname "$STREAK_FILE")" 2>/dev/null
                { echo "count=$STREAK_COUNT"; echo "first_epoch=$FIRST_EPOCH"; echo "last_epoch=$NOW_EPOCH"; echo "alert_epoch=$PREV_ALERT"; } > "$STREAK_FILE" 2>/dev/null

                if [ "$STREAK_COUNT" -ge 6 ]; then
                    echo "machine-selfheal: ⛔ GATEWAY IMAGE STALE — ${STREAK_COUNT} CONSECUTIVE SESSIONS UNRESOLVED, since epoch $FIRST_EPOCH."
                    echo "                  image built $IMG_TS but runtime/ last changed $SRC_TS. This is the exact drift that starved the runner via a dead tasks_claim before — it is NOT self-resolving."
                    echo "                  Someone at the MASTER checkout must run: docker compose build gateway && docker compose up -d gateway"
                    echo "                  Flag this as a blocker in AI/state/STATE.md / AI_AGENT_HANDOFF.md if it recurs again."
                elif [ "$STREAK_COUNT" -ge 3 ]; then
                    echo "machine-selfheal: 🔴 GATEWAY IMAGE STALE — ${STREAK_COUNT} consecutive sessions have now seen this, unaddressed (past incidents: dead tasks_claim starved the runner)."
                    echo "                  image built $IMG_TS but runtime/ last changed $SRC_TS."
                    echo "                  Fix (from the MASTER checkout): docker compose build gateway && docker compose up -d gateway"
                else
                    echo "machine-selfheal: 🟠 GATEWAY IMAGE STALE — image built $IMG_TS but runtime/ last changed $SRC_TS."
                    echo "                  The running gateway is missing merged code (past incidents: dead tasks_claim starved the runner)."
                    echo "                  Fix: docker compose build gateway && docker compose up -d gateway"
                fi

                # ── 5b. Notification-engine escalation (staleness > threshold) ──
                # See the header comment: past GATEWAY_STALE_ALERT_HOURS the
                # banner stops being enough — push a real alert. Best-effort,
                # never fatal, curl capped at 5s so session boot stays snappy.
                GW_ALERT_HOURS="${GATEWAY_STALE_ALERT_HOURS:-24}"
                GW_COOLDOWN_HOURS="${GATEWAY_STALE_ALERT_COOLDOWN_HOURS:-24}"
                GW_STALE_AGE=$((NOW_EPOCH - FIRST_EPOCH))
                if [ "${GATEWAY_STALE_ALERT_DISABLE:-0}" != "1" ] && command -v curl >/dev/null 2>&1 \
                   && [ "$GW_STALE_AGE" -ge $((GW_ALERT_HOURS * 3600)) ] 2>/dev/null \
                   && [ $((NOW_EPOCH - PREV_ALERT)) -ge $((GW_COOLDOWN_HOURS * 3600)) ] 2>/dev/null; then
                    . "$SCRIPT_DIR/lib/gateway.sh" 2>/dev/null || GATEWAY_LOCAL_TOKEN="${GATEWAY_LOCAL_TOKEN:-myai-local-bridge-dev}"
                    GW_STALE_H=$((GW_STALE_AGE / 3600))
                    GW_HOST=$(hostname -s 2>/dev/null || echo unknown)
                    GW_MSG="Gateway image STALE for ${GW_STALE_H}h on ${GW_HOST} (${STREAK_COUNT} consecutive session(s)): image built epoch $IMG_TS but runtime/ last changed epoch $SRC_TS — the running gateway is missing merged code (past incidents: dead tasks_claim starved the runner for 6 days). NOT auto-rebuilding (deploy guard). Fix from the MASTER checkout: docker compose build gateway && docker compose up -d gateway"
                    GW_BODY=$(MSG="$GW_MSG" /usr/bin/python3 -c '
import json, os
print(json.dumps({"jsonrpc": "2.0", "method": "tools/call", "id": 1,
  "params": {"name": "notifications_send", "arguments": {
    "message": os.environ["MSG"], "level": "critical",
    "title": "Gateway Image Stale", "source": "machine-selfheal"}}}))' 2>/dev/null)
                    GW_SENT=0
                    if [ -n "$GW_BODY" ] && curl -sf -m 5 -X POST "${GATEWAY_MCP:-http://localhost:3100/mcp}" \
                         -H 'content-type: application/json' \
                         -H "x-gateway-local-token: ${GATEWAY_LOCAL_TOKEN:-}" \
                         -d "$GW_BODY" >/dev/null 2>&1; then
                        GW_SENT=1
                        echo "machine-selfheal: 📣 staleness has exceeded ${GW_ALERT_HOURS}h — notification-engine alert sent (notifications_send)."
                    elif [ -x "$SCRIPT_DIR/notify-telegram.sh" ] && "$SCRIPT_DIR/notify-telegram.sh" error "Gateway Image Stale: $GW_MSG" >/dev/null 2>&1; then
                        GW_SENT=1
                        echo "machine-selfheal: 📣 staleness has exceeded ${GW_ALERT_HOURS}h — gateway unreachable, alert sent via notify-telegram.sh."
                    else
                        echo "machine-selfheal: ⚠️  staleness has exceeded ${GW_ALERT_HOURS}h but the alert could NOT be sent (gateway + Telegram both unreachable) — will retry next session."
                    fi
                    if [ "$GW_SENT" = "1" ]; then
                        { echo "count=$STREAK_COUNT"; echo "first_epoch=$FIRST_EPOCH"; echo "last_epoch=$NOW_EPOCH"; echo "alert_epoch=$NOW_EPOCH"; } > "$STREAK_FILE" 2>/dev/null
                    fi
                fi
            else
                # Confirmed fresh — clear any prior streak.
                rm -f "$STREAK_FILE" 2>/dev/null
            fi
        fi
    fi
fi

# macOS-only from here down (statusline/launchd/pmset/Docker-Desktop are Mac-specific).
[ "$(uname -s)" = "Darwin" ] || exit 0

# ── 1. Statusline deploy ────────────────────────────────────
SRC="$SCRIPT_DIR/org-statusline.sh"
DEST="$HOME/.claude-org-statusline.sh"
if [ -f "$SRC" ]; then
    if [ ! -f "$DEST" ] || ! cmp -s "$SRC" "$DEST"; then
        if cp "$SRC" "$DEST" 2>/dev/null && chmod +x "$DEST" 2>/dev/null; then
            CHANGED="${CHANGED}statusline "
        fi
    fi
fi

# ── 2. Runner presence + cadence ──
# The autonomous CLI runner is a WORKER, and workers are per-machine: launchd is
# a LOCAL macOS facility (no central scheduler), and the runner needs this Mac's
# Claude CLI + logged-in profile + Docker/gateway + checked-out repos. The QUEUE
# is shared (Atlas) but each Mac that should drain it off-hours must install its
# own runner. machine_selfheal deliberately NEVER auto-installs it (installing a
# headless agent that spends your Claude plan must be an explicit opt-in) — so
# when it's absent we REMIND how to enable it, unless this Mac opted out.
PLIST="$HOME/Library/LaunchAgents/com.myai.cli-task-runner.plist"
DESIRED_INTERVAL=600   # 10 min — matches setup_cli_runner_schedule.sh default
RUNNER_INSTALLED=0
if [ -f "$PLIST" ]; then
    RUNNER_INSTALLED=1
    if command -v plutil >/dev/null 2>&1; then
        CUR=$(plutil -extract StartInterval raw "$PLIST" 2>/dev/null || echo "")
        # Only correct an OLD hour+ cadence (3h/5h legacy). Leave deliberate
        # sub-hour intervals alone.
        if [ -n "$CUR" ] && [ "$CUR" -ge 3600 ] 2>/dev/null; then
            if plutil -replace StartInterval -integer "$DESIRED_INTERVAL" "$PLIST" >/dev/null 2>&1; then
                launchctl unload "$PLIST" 2>/dev/null
                launchctl load "$PLIST" 2>/dev/null
                CHANGED="${CHANGED}runner-interval(${CUR}s->${DESIRED_INTERVAL}s) "
            fi
        fi
        # Model policy (2026-07-24 supersede of the 2026-07-07 Sonnet-only rule):
        # Sonnet/Opus/Fable are ALL standard runner models now, so per-Mac
        # CLI_MODEL/CLI_MODELS plist pins are deliberate and MUST stick — the
        # block that stripped *fable*|*opus* pins here (enforcing the retired
        # Sonnet-only policy) was removed by task-56e65748. We still normalize a
        # museum-profile CLAUDE_CONFIG_DIR back to claude-tech (the runner script
        # hard-refuses museum anyway; this fixes the config at the source).
        PLIST_FIXED=0
        V=$(plutil -extract "EnvironmentVariables.CLAUDE_CONFIG_DIR" raw "$PLIST" 2>/dev/null || echo "")
        case "$V" in
            *claude-museum*)
                plutil -replace "EnvironmentVariables.CLAUDE_CONFIG_DIR" -string "$HOME/.claude-tech" "$PLIST" >/dev/null 2>&1 && \
                    { PLIST_FIXED=1; CHANGED="${CHANGED}runner-profile(museum->tech) "; }
                ;;
        esac
        if [ "$PLIST_FIXED" = "1" ]; then
            launchctl unload "$PLIST" 2>/dev/null
            launchctl load "$PLIST" 2>/dev/null
        fi
    fi
elif [ ! -f "$HOME/.ai-cli-runner/.no-runner" ]; then
    # Not a worker on this Mac, and not explicitly opted out → remind how to enable.
    # Locate the setup script relative to this script (works in master + managed).
    SELF_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    SETUP="${SELF_DIR}/setup_cli_runner_schedule.sh"
    echo "machine-selfheal: 🤖 RUNNER REMINDER — this Mac is NOT an autonomous worker (no launchd CLI runner installed)."
    echo "                  The task queue is shared (Atlas), but each Mac that drains it off-hours needs its own runner."
    echo "                  Enable it (once per Mac):"
    echo "                    ${SETUP} --every-minutes 10"
    echo "                    sudo pmset -c sleep 0     # so launchd fires overnight; keep it plugged in + lid open"
    echo "                  Don't want this Mac to be a worker?  touch ~/.ai-cli-runner/.no-runner  (silences this)"
fi

# ── 3. Sleep-guard reminder (only matters when this Mac IS a runner host) ──
# launchd does NOT fire while a Mac is asleep + missed StartIntervals don't queue,
# so an autonomous-runner host must not sleep on AC power. Can't auto-fix (needs
# sudo) → remind on session start. Only nag actual runner hosts; a non-runner Mac
# may legitimately sleep. Silent when AC sleep is already disabled (0).
# Real incident 2026-06-16: both Macs slept overnight → 0 tasks ran.
if [ "$RUNNER_INSTALLED" = "1" ] && command -v pmset >/dev/null 2>&1; then
    AC_SLEEP=$(pmset -g custom 2>/dev/null | awk '/^AC Power/{ac=1;next} /^[A-Za-z]/{ac=0} ac && $1=="sleep"{print $2; exit}')
    if [ -n "$AC_SLEEP" ] && [ "$AC_SLEEP" != "0" ] 2>/dev/null; then
        echo "machine-selfheal: ⏰ WAKE REMINDER — this Mac runs the CLI runner but sleeps on AC (sleep=${AC_SLEEP}m); it can't fire while asleep."
        echo "                  Fix (needs sudo, once per Mac):  sudo pmset -c sleep 0   — then keep it plugged in + lid open."
    fi
fi

# ── 4. Gateway tmpfs mountpoint guard (must exist before any gateway rebuild) ──
# docker-compose mounts a tmpfs at runtime/node_modules/.vite-temp (writable vitest
# cache overlaying the RO ./:/app/AI bind). Docker can't create that mountpoint on a
# read-only bind, so the host dir must pre-exist. The §12 node_modules Dropbox purge
# deletes it → the next `docker compose up --build gateway` fails to START with
# "make mountpoint .vite-temp: read-only file system" and the gateway goes DOWN.
# Recreate it idempotently every session so a rebuild always succeeds. (Real
# incident 2026-06-26: gateway down after a post-purge rebuild.)
if [ -n "$REPO_ROOT_SH" ] && [ -f "$REPO_ROOT_SH/docker-compose.yml" ] \
   && grep -q 'node_modules/.vite-temp' "$REPO_ROOT_SH/docker-compose.yml" 2>/dev/null \
   && [ ! -d "$REPO_ROOT_SH/runtime/node_modules/.vite-temp" ]; then
    mkdir -p "$REPO_ROOT_SH/runtime/node_modules/.vite-temp" 2>/dev/null \
      && CHANGED="${CHANGED}${CHANGED:+, }recreated gateway .vite-temp mountpoint (post-purge guard)"
fi

# ── Runner-workspace trust guard (claude-tech) ────────────────────────────────
# 2026-07-03 incident: every runner fire died on "workspace has not been trusted"
# (headless claude -p can't answer the trust dialog) and poison-blocked a healthy
# task every 10 min. Ensure every ~/ci-workspaces/<repo> is pre-trusted in the
# runner profile's .claude.json. Idempotent; silent when already trusted.
TECH_CFG="$HOME/.claude-tech/.claude.json"
WS_ROOT="$HOME/ci-workspaces"
if [ -f "$TECH_CFG" ] && [ -d "$WS_ROOT" ] && command -v node >/dev/null 2>&1; then
    TRUSTED=$(node -e '
      const fs = require("fs");
      const [cfgPath, wsRoot] = process.argv.slice(1);
      let cfg; try { cfg = JSON.parse(fs.readFileSync(cfgPath, "utf8")); } catch { console.log(0); process.exit(0); }
      cfg.projects = cfg.projects || {};
      let set = 0;
      for (const d of fs.readdirSync(wsRoot)) {
        const key = `${wsRoot}/${d}`;
        try { if (!fs.statSync(key).isDirectory()) continue; } catch { continue; }
        cfg.projects[key] = cfg.projects[key] || {};
        if (!cfg.projects[key].hasTrustDialogAccepted) { cfg.projects[key].hasTrustDialogAccepted = true; set++; }
      }
      if (set) fs.writeFileSync(cfgPath, JSON.stringify(cfg, null, 2));
      console.log(set);
    ' "$TECH_CFG" "$WS_ROOT" 2>/dev/null || echo 0)
    if [ "${TRUSTED:-0}" -gt 0 ] 2>/dev/null; then
        CHANGED="$CHANGED runner-workspace-trust($TRUSTED)"
    fi
fi

# ── 6. Remote-readiness guard (claude-museum) ─────────────────────────────────
# The remote fleet (remote start / phone Code list) needs one MACHINE-LOCAL line:
# remoteControlAtStartup:true in ~/.claude-museum/settings.json — set on the MBP
# 2026-07-03 but owed manually on every other Mac (PH11911 🔲 in the handoff).
# Self-heal it: any Mac WITH a museum profile becomes remote-ready on first
# session start, zero manual steps. Merge-never-clobber; invalid JSON → warn +
# skip; no museum profile → silent no-op (that Mac isn't a remote doorway host).
MUSEUM_SETTINGS="$HOME/.claude-museum/settings.json"
if [ -d "$HOME/.claude-museum" ] && command -v node >/dev/null 2>&1; then
    RC_SET=$(node -e '
      const fs = require("fs");
      const p = process.argv[1];
      let s = {};
      if (fs.existsSync(p)) {
        try { s = JSON.parse(fs.readFileSync(p, "utf8")); }
        catch { console.log("INVALID"); process.exit(0); }
      }
      if (s.remoteControlAtStartup === true) { console.log(0); process.exit(0); }
      s.remoteControlAtStartup = true;
      fs.writeFileSync(p, JSON.stringify(s, null, 2));
      console.log(1);
    ' "$MUSEUM_SETTINGS" 2>/dev/null || echo 0)
    if [ "$RC_SET" = "INVALID" ]; then
        echo "machine-selfheal: 🟠 $MUSEUM_SETTINGS is invalid JSON — remoteControlAtStartup NOT set (fix the file, never clobbered)."
    elif [ "${RC_SET:-0}" -gt 0 ] 2>/dev/null; then
        CHANGED="$CHANGED museum-remote-control-at-startup"
    fi
fi

# ── 7. Gateway split-brain guard (LL 2026-07-04) ──────────────────────────────
# The shared myai gateway must be composed from the MASTER checkout — only its
# .env carries the real (Atlas) MONGODB_URI. A compose-up from a runner
# ci-workspace (env-less clone) once rebound the gateway to the EMPTY local
# mongo for 10.5h: every runner fire claimed nothing (fleet-wide starvation)
# and task status flips were written to the wrong DB and lost. Two tells:
#   a) the container's compose working_dir label points inside ci-workspaces;
#   b) the container's MONGODB_URI differs from what its owning dir's .env says.
# Either → warn + self-heal by recreating gateway+dashboard from the right dir.
# Silent when healthy; skips when docker is off or the container doesn't exist
# (a fresh master boot creates it correctly).
if command -v docker >/dev/null 2>&1; then
    GW_WD=$(docker inspect myai-gateway --format '{{index .Config.Labels "com.docker.compose.project.working_dir"}}' 2>/dev/null)
    if [ -n "$GW_WD" ]; then
        WS_ROOT2="${CI_WORKSPACES:-$HOME/ci-workspaces}"
        # Locate the master checkout: explicit override, this repo (when it is
        # not itself a workspace clone), then the known Dropbox candidates. A
        # candidate qualifies only with a compose file AND an .env that actually
        # sets MONGODB_URI — an env-less clone can never be "master".
        MASTER=""
        for cand in "${MYAI_MASTER_ROOT:-}" "$REPO_ROOT_SH" \
                    "$HOME/Dropbox/Dev/PROJECT/CODE/_MY_PROJECT/AI" \
                    "$HOME/Dropbox/Dev/PROJECT/CODE/AI"; do
            [ -n "$cand" ] || continue
            case "$cand" in "$WS_ROOT2"/*) continue ;; esac
            if [ -f "$cand/docker-compose.yml" ] && grep -qE '^MONGODB_URI=' "$cand/.env" 2>/dev/null; then
                MASTER="$cand"; break
            fi
        done
        ROGUE="" HEAL_DIR=""
        case "$GW_WD" in
            "$WS_ROOT2"/*) ROGUE="compose working_dir is a runner ci-workspace ($GW_WD)"; HEAL_DIR="$MASTER" ;;
        esac
        if [ -z "$ROGUE" ]; then
            # working_dir looks legit — check Mongo drift against the .env that
            # SHOULD be feeding the container (its owning dir's, else master's).
            ENV_SRC="$GW_WD/.env"
            grep -qE '^MONGODB_URI=' "$ENV_SRC" 2>/dev/null || ENV_SRC="${MASTER:+$MASTER/.env}"
            WANT_URI=$(grep -E '^MONGODB_URI=' "$ENV_SRC" 2>/dev/null | head -1 | cut -d= -f2-)
            HAVE_URI=$(docker exec myai-gateway sh -c 'echo "$MONGODB_URI"' 2>/dev/null)
            if [ -n "$WANT_URI" ] && [ -n "$HAVE_URI" ] && [ "$HAVE_URI" != "$WANT_URI" ]; then
                ROGUE="gateway MONGODB_URI differs from $ENV_SRC (stale/wrong env — split-brain risk)"
                HEAL_DIR="$GW_WD"
                grep -qE '^MONGODB_URI=' "$GW_WD/.env" 2>/dev/null || HEAL_DIR="$MASTER"
            fi
        fi
        if [ -n "$ROGUE" ]; then
            echo "machine-selfheal: 🔴 GATEWAY SPLIT-BRAIN GUARD — $ROGUE."
            echo "                  The shared gateway must run from the master checkout with its real env (LL 2026-07-04: a workspace compose-up served an empty DB for 10.5h and starved the fleet)."
            if [ -n "$HEAL_DIR" ] && ( cd "$HEAL_DIR" && docker compose up -d gateway dashboard ) >/dev/null 2>&1; then
                CHANGED="$CHANGED gateway-splitbrain-heal($HEAL_DIR)"
                echo "                  Self-healed: recreated gateway+dashboard from $HEAL_DIR."
            else
                echo "                  AUTO-FIX UNAVAILABLE — run manually from the master AI repo: docker compose up -d gateway dashboard (or set MYAI_MASTER_ROOT and re-run scripts/machine_selfheal.sh)."
            fi
        fi
    fi
fi

# ── 8. Brain remote AUTO-WIRE (auto-sync needs an origin) ─────────────────────
# Cross-machine continuity (wrap up → agent mode elsewhere) only works when the
# brain repo pushes/pulls a shared origin. Setting MYAI_BRAIN_REMOTE in your own
# .env IS the deliberate opt-in — so ENFORCE it, don't merely remind (a reminder
# is exactly what let the office PC silently no-op its brain push, LL 2026-07-06):
#   - brain has no origin but MYAI_BRAIN_REMOTE is set → add origin + fetch.
#   - no brain dir at all but MYAI_BRAIN_REMOTE is set → clone it.
# Reminder-only fallback when no remote URL can be found. Never overrides an
# existing/different origin (warns instead). Offline stays non-fatal.
MYAI_HOME_SH="${MYAI_HOME:-$HOME/.myai}"
BRAIN_DIR_SH="${MYAI_BRAIN_DIR:-}"
if [ -z "$BRAIN_DIR_SH" ] && [ -f "$MYAI_HOME_SH/brain.path" ]; then
    BRAIN_DIR_SH="$(head -1 "$MYAI_HOME_SH/brain.path" 2>/dev/null)"
fi
[ -n "$BRAIN_DIR_SH" ] || BRAIN_DIR_SH="$MYAI_HOME_SH/brain"
BRAIN_SUGGESTED=""
for src in "$REPO_ROOT_SH/.env" "$REPO_ROOT_SH/AI/.env" "$MYAI_HOME_SH/brain.remote"; do
    [ -f "$src" ] || continue
    case "$src" in
        *.env) BRAIN_SUGGESTED="$(grep -E '^MYAI_BRAIN_REMOTE=' "$src" 2>/dev/null | head -1 | cut -d= -f2- | sed 's/^["'"'"']//;s/["'"'"']$//')" ;;
        *)     BRAIN_SUGGESTED="$(head -1 "$src" 2>/dev/null)" ;;
    esac
    [ -n "$BRAIN_SUGGESTED" ] && break
done
if command -v git >/dev/null 2>&1 && [ -n "$BRAIN_SUGGESTED" ]; then
    if [ ! -d "$BRAIN_DIR_SH/.git" ]; then
        # brand-new machine, no brain yet → clone the shared brain
        if git clone --quiet "$BRAIN_SUGGESTED" "$BRAIN_DIR_SH" >/dev/null 2>&1; then
            CHANGED="$CHANGED brain-cloned($BRAIN_SUGGESTED)"
        else
            echo "machine-selfheal: 🧠 brain clone failed ($BRAIN_SUGGESTED) — run: git clone \"$BRAIN_SUGGESTED\" \"$BRAIN_DIR_SH\""
        fi
    elif [ -f "$BRAIN_DIR_SH/BRAIN.md" ]; then
        CUR_ORIGIN="$(git -C "$BRAIN_DIR_SH" remote get-url origin 2>/dev/null)"
        if [ -z "$CUR_ORIGIN" ]; then
            git -C "$BRAIN_DIR_SH" remote add origin "$BRAIN_SUGGESTED" 2>/dev/null \
              && git -C "$BRAIN_DIR_SH" fetch --quiet origin >/dev/null 2>&1 \
              && CHANGED="$CHANGED brain-remote-wired"
        elif [ "$CUR_ORIGIN" != "$BRAIN_SUGGESTED" ]; then
            echo "machine-selfheal: 🧠 brain origin ($CUR_ORIGIN) ≠ configured MYAI_BRAIN_REMOTE ($BRAIN_SUGGESTED) — left as-is; reconcile if unintended."
        fi
    fi
elif [ -d "$BRAIN_DIR_SH/.git" ] && [ -f "$BRAIN_DIR_SH/BRAIN.md" ] \
     && ! git -C "$BRAIN_DIR_SH" remote get-url origin >/dev/null 2>&1; then
    echo "machine-selfheal: 🧠 brain has no origin and no MYAI_BRAIN_REMOTE found — set MYAI_BRAIN_REMOTE in AI/.env to enable cross-machine continuity."
fi

# ── 9. Multi-Org direnv .envrc activation (Phase 2) ───────────────────────────
# `.envrc` files are MACHINE-LOCAL config (gitignored, per-machine absolute paths)
# — exactly what this self-heal exists to reconcile. Once the user fills
# config/repo_org_map.txt with real museum/tech repos, drop the machine-local
# .envrc into each mapped repo so cd-ing there auto-selects the right Claude org
# via CLAUDE_CONFIG_DIR. This is what "activates" Phase 2: no manual step after
# filling the map. Idempotent — setup_org_envrc.sh only (re)writes a .envrc when
# missing/changed. Silent no-op when the map has no active entries or direnv is
# absent (nothing to activate yet). Master repo only (managed clones have no map).
ORG_MAP="$REPO_ROOT_SH/config/repo_org_map.txt"
ENVRC_SCRIPT="$SCRIPT_DIR/setup_org_envrc.sh"
if [ -f "$ORG_MAP" ] && [ -x "$ENVRC_SCRIPT" ] && command -v direnv >/dev/null 2>&1; then
    ORG_ACTIVE=$(awk 'NF && $1 !~ /^#/' "$ORG_MAP" 2>/dev/null | wc -l | tr -d ' ')
    if [ "${ORG_ACTIVE:-0}" -gt 0 ] 2>/dev/null; then
        ORG_OUT=$("$ENVRC_SCRIPT" 2>/dev/null)
        ORG_WROTE=$(printf '%s\n' "$ORG_OUT" | grep -cE '^[[:space:]]*\+ wrote ' 2>/dev/null | tr -d ' ')
        if [ "${ORG_WROTE:-0}" -gt 0 ] 2>/dev/null; then
            CHANGED="$CHANGED org-envrc($ORG_WROTE)"
        fi
    fi
fi

# ── 10. Conflicted-copy pre-commit guard (DEVOPS root-cause fix 2026-07-20) ──
# core.hooksPath is LOCAL git config (.git/config isn't synced by git itself),
# so every machine's checkout of every repo needs this set once. Self-heal it
# here — same rationale as the statusline/runner-cadence steps above — so the
# Dropbox conflicted-copy commit guard is active fleet-wide without a manual
# per-machine step, even between full update_all.sh runs. Idempotent + silent
# when already correct (install_git_hooks.sh only writes when it must).
HOOKS_INSTALLER="$SCRIPT_DIR/install_git_hooks.sh"
if [ -x "$HOOKS_INSTALLER" ]; then
    HOOKS_OUT=$("$HOOKS_INSTALLER" "$REPO_ROOT_SH" 2>/dev/null)
    case "$HOOKS_OUT" in
        *"core.hooksPath ->"*) CHANGED="$CHANGED git-hooks-installed" ;;
    esac
fi

# ── 12. Docker credsStore hang guard (LL 2026-07-22) ─────────────────────────
# After a machine switch, Docker Desktop's `credsStore: "desktop"` credential
# helper can hang indefinitely on `get` (the Desktop creds backend isn't
# responsive), which makes EVERY `docker pull` / `docker compose build` block at
# the auth step and die with "DeadlineExceeded: context deadline exceeded" — even
# for PUBLIC images that need no auth at all. Real incident 2026-07-22: a gateway
# rebuild on the MBP hung twice until node:20-slim was pulled with an isolated
# empty config; Docker Hub itself answered in 0.29s — the hang was purely the
# helper. Fix durably by switching the store to the standalone `osxkeychain`
# helper, which talks to the macOS keychain directly and does NOT depend on the
# Desktop backend. Only ACTS when the configured helper genuinely HANGS (a fast
# non-zero exit = "no stored creds" = healthy, left alone); merge-never-clobber
# (only rewrites the credsStore key). ~0.5s on a healthy Mac, 3s ceiling on hang.
DOCKER_CFG="$HOME/.docker/config.json"
if command -v docker >/dev/null 2>&1 && [ -f "$DOCKER_CFG" ] && command -v node >/dev/null 2>&1; then
    CUR_STORE=$(node -e 'try{const c=JSON.parse(require("fs").readFileSync(process.argv[1],"utf8"));process.stdout.write(String(c.credsStore||""))}catch(e){}' "$DOCKER_CFG" 2>/dev/null)
    if [ "$CUR_STORE" = "desktop" ] && command -v docker-credential-osxkeychain >/dev/null 2>&1; then
        # Probe the desktop helper with a hard 3s ceiling (macOS has no `timeout`).
        ( printf 'https://index.docker.io/v1/\n' | docker-credential-desktop get >/dev/null 2>&1 ) &
        _probe_pid=$!
        _i=0; _hang=0
        while kill -0 "$_probe_pid" 2>/dev/null; do
            _i=$((_i+1))
            if [ "$_i" -ge 6 ]; then kill -9 "$_probe_pid" 2>/dev/null; _hang=1; break; fi
            sleep 0.5
        done
        [ "$_hang" = "0" ] && wait "$_probe_pid" 2>/dev/null
        if [ "$_hang" = "1" ]; then
            if node -e '
              const fs=require("fs"),p=process.argv[1];
              let c={}; try{c=JSON.parse(fs.readFileSync(p,"utf8"))}catch(e){process.exit(1)}
              c.credsStore="osxkeychain";
              fs.writeFileSync(p, JSON.stringify(c,null,4)+"\n");
            ' "$DOCKER_CFG" 2>/dev/null; then
                CHANGED="$CHANGED docker-credsStore(desktop-hung->osxkeychain)"
                echo "machine-selfheal: 🔑 Docker 'desktop' credential helper was hanging (would block every build/pull with DeadlineExceeded) — switched credsStore to 'osxkeychain' (backend-free)."
            fi
        fi
    fi
fi

[ -n "$CHANGED" ] && echo "machine-selfheal: applied -> $CHANGED"
exit 0
