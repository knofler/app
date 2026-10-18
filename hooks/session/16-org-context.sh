#!/usr/bin/env bash
# 16-org-context.sh — Surface the active Claude org at session start (Multi-Org-Auth Phase 4).
#
# Multiple Claude orgs run side by side on one machine via CLAUDE_CONFIG_DIR
# (one persistent authenticated session per config dir). This hook makes the
# ACTIVE org obvious at session start — like the machine/docker banners — and
# guards against working in a repo under the wrong org.
#
# Resolution (by the basename of $CLAUDE_CONFIG_DIR, default ~/.claude):
#   ~/.claude          -> personal  (knofler, personal default)
#   ~/.claude-museum   -> museum    (Powerhouse Museum, Enterprise)
#   ~/.claude-tech     -> tech      (Team org)
#
# Mismatch guard: if config/repo_org_map.txt assigns this repo to an org and the
# active org differs, warn (e.g. "in a museum repo but authed as personal").
# The map is optional — with no entry a repo defaults to personal and the guard
# stays silent.
#
# Login check: work profiles (museum/tech) must actually be signed into their
# org — the folder name alone proves nothing. Mismatch prints ⚠ ORG LOGIN MISMATCH.
#
# forceLoginOrgUUID lockdown: on managed/shared machines Enterprise pins the org
# via managed settings (switching disabled by design). When that pin is
# detected the hook reports it and SKIPS the mismatch guard — it never fights
# the lockdown. See plan/MULTI_ORG_AUTH.md + documentation/MULTI_ORG_WORKFLOW.md.
#
# Always non-fatal. bash 3.2-safe (no associative arrays). set +e throughout.
set +e

# Host-only — inside the gateway container CLAUDE_CONFIG_DIR is meaningless.
if [ -f /.dockerenv ] || [ -n "$MYAI_IN_CONTAINER" ]; then
  exit 0
fi

# --- Resolve active org from the config dir --------------------------------
CFG_DIR="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"
CFG_BASE=$(basename "$CFG_DIR")

case "$CFG_BASE" in
  .claude-museum) ORG_KEY="museum";   ORG_LABEL="Powerhouse Museum (Enterprise)" ;;
  .claude-tech)   ORG_KEY="tech";     ORG_LABEL="Team org" ;;
  .claude)        ORG_KEY="personal"; ORG_LABEL="personal default (knofler)" ;;
  *)              ORG_KEY="personal"; ORG_LABEL="personal default (knofler) [custom dir]" ;;
esac

echo "ORG: $ORG_LABEL — config $CFG_DIR"

# --- Verify the REAL login, not just the folder name ------------------------
# The label above is derived from the folder name only. On PH13292 (2026-09-28)
# all three profiles were signed into the personal org while this banner said
# "Powerhouse Museum" — Remote Control links then belonged to the wrong org and
# the phone reported "session could not be found". Read oauthAccount and
# compare. Work profiles have a known org UUID; personal has no expectation.
case "$ORG_KEY" in
  museum) EXPECT_UUID="3f50d862-a0c7-41c4-87c5-7e4e7b60e95c"; EXPECT_NAME="Powerhouse Museum" ;;
  tech)   EXPECT_UUID="364c2521-d7f7-4c7e-a1d9-dc1480a5c8db"; EXPECT_NAME="Powerhouse Technology" ;;
  *)      EXPECT_UUID=""; EXPECT_NAME="" ;;
esac
# ~/.claude keeps its login at ~/.claude.json; the other dirs keep it inside.
AUTH_JSON="${ORG_AUTH_JSON:-$CFG_DIR/.claude.json}"
[ -f "$AUTH_JSON" ] || AUTH_JSON="$HOME/.claude.json"
if [ -n "$EXPECT_UUID" ]; then
  ACTUAL=""
  if [ -f "$AUTH_JSON" ] && command -v python3 >/dev/null 2>&1; then
    ACTUAL=$(python3 -c 'import json,sys
a=(json.load(open(sys.argv[1])).get("oauthAccount") or {})
print((a.get("organizationUuid") or "")+"|"+(a.get("organizationName") or ""))' "$AUTH_JSON" 2>/dev/null)
  fi
  ACTUAL_UUID=${ACTUAL%%|*}
  ACTUAL_NAME=${ACTUAL#*|}
  if [ -z "$ACTUAL_UUID" ]; then
    echo "ORG: login not verified — no oauthAccount readable in $AUTH_JSON (signed out, or python3 missing)"
  elif [ "$ACTUAL_UUID" = "$EXPECT_UUID" ]; then
    echo "ORG: login verified — signed into $ACTUAL_NAME ✓"
  else
    echo "⚠ ORG LOGIN MISMATCH: profile $CFG_BASE should be '$EXPECT_NAME' but is signed into '$ACTUAL_NAME' ($ACTUAL_UUID). Remote Control links from this session will not show under $EXPECT_NAME. Fix: /logout, then /login with your work account and pick $EXPECT_NAME."
  fi
fi

# --- forceLoginOrgUUID lockdown detection (managed settings) ---------------
# The real key is forceLoginOrgUUID, and Claude Code enforces it ONLY from
# managed settings (it is machine-wide, so it cannot pin one profile). The old
# spelling forceLoginOrgID is still matched so a legacy file keeps reporting.
PINNED=""
for MS in \
  "/Library/Application Support/ClaudeCode/managed-settings.json" \
  "/etc/claude-code/managed-settings.json"; do
  if [ -f "$MS" ] && grep -qE 'forceLoginOrg(UUID|ID)' "$MS" 2>/dev/null; then
    PINNED="$MS"
    break
  fi
done

if [ -n "$PINNED" ]; then
  echo "ORG: pinned (forceLoginOrgUUID via $PINNED) — switching disabled by design; mismatch guard skipped."
  exit 0
fi

# --- Mismatch guard against the per-repo org map ---------------------------
ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
MAP=""
for CANDIDATE in "$ROOT/config/repo_org_map.txt" "$ROOT/AI/config/repo_org_map.txt"; do
  [ -f "$CANDIDATE" ] && { MAP="$CANDIDATE"; break; }
done

[ -z "$MAP" ] && exit 0   # no map -> repo defaults to personal, nothing to check

REPO_BASE=$(basename "$ROOT")
EXPECTED=""
# Match by full path first, then by repo basename. Skip comments/blank lines.
# Format: <repo-path-or-name><whitespace><org-key>
while IFS= read -r line; do
  # Strip leading whitespace so indented comments/blank lines are skipped too.
  trimmed=${line#"${line%%[![:space:]]*}"}
  case "$trimmed" in ''|\#*) continue ;; esac
  key=$(printf '%s\n' "$line" | awk '{print $1}')
  val=$(printf '%s\n' "$line" | awk '{print $2}')
  [ -z "$val" ] && continue
  if [ "$key" = "$ROOT" ] || [ "$key" = "$REPO_BASE" ]; then
    EXPECTED="$val"
    break
  fi
done < "$MAP"

[ -z "$EXPECTED" ] && exit 0   # repo not mapped -> defaults to personal, silent

if [ "$EXPECTED" != "$ORG_KEY" ]; then
  case "$EXPECTED" in
    museum) HINT="claude-museum" ;;
    tech)   HINT="claude-tech" ;;
    *)      HINT="claude" ;;
  esac
  echo "⚠ ORG MISMATCH: this repo ($REPO_BASE) is mapped to '$EXPECTED' but you're authed as '$ORG_KEY'. Run '$HINT' here to use the correct org."
else
  echo "ORG: repo '$REPO_BASE' matches mapped org '$EXPECTED' ✓"
fi

exit 0
