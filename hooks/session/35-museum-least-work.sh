#!/bin/bash
# 35-museum-least-work.sh — museum DIRECTS, it does not do the work.
#
# Operator 2026-10-02 (task-7fd4320e): the museum profile (~/.claude-museum) is
# API-BILLED and expensive — agy (Antigravity, paid Google sub) and claude-tech
# (Team sub) are the hands. A museum session in a repo that is not actually a
# Powerhouse repo is almost always an accident that burns API credits on work a
# subscription seat would do for free. Warn at session start, point at the
# cheap lanes, and remind that directing (dispatch_delegate / swarm_plan) is
# the museum's one legitimate job anywhere.
#
# A repo counts as Powerhouse when EITHER:
#   - config/repo_org_map.txt (or AI/config/…) maps it to org 'museum', OR
#   - its origin remote lives under a powerhouse GitHub org (powerhouse-ict,
#     powerhouse-museum, …).
#
# Warn-only, never blocks. bash 3.2-safe. Test overrides: MUSEUM_GUARD_ROOT
# (repo root), CLAUDE_CONFIG_DIR as usual.
set +e

# Host-only — inside the gateway container CLAUDE_CONFIG_DIR is meaningless.
# MYAI_IN_CONTAINER is authoritative when explicitly set (even to empty): the
# hermetic test (scripts/tests/test_museum_least_work.sh) runs inside the CI
# self-hosted runner container — where /.dockerenv exists — yet must exercise
# host behaviour, so it exports MYAI_IN_CONTAINER="". Only fall back to the
# /.dockerenv probe when the var is unset (a real host/gateway session).
if [ -n "${MYAI_IN_CONTAINER+set}" ]; then
  [ -n "$MYAI_IN_CONTAINER" ] && exit 0
elif [ -f /.dockerenv ]; then
  exit 0
fi

CFG_DIR="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"
case "$(basename "$CFG_DIR")" in
  .claude-museum) ;;    # the only profile this guard is about
  *) exit 0 ;;
esac

ROOT="${MUSEUM_GUARD_ROOT:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
REPO_BASE=$(basename "$ROOT")

# ── Powerhouse test 1: repo_org_map.txt says 'museum' ────────────────────────
MAPPED=""
for CANDIDATE in "$ROOT/config/repo_org_map.txt" "$ROOT/AI/config/repo_org_map.txt"; do
  [ -f "$CANDIDATE" ] || continue
  while IFS= read -r line; do
    trimmed=${line#"${line%%[![:space:]]*}"}
    case "$trimmed" in ''|\#*) continue ;; esac
    key=$(printf '%s\n' "$line" | awk '{print $1}')
    val=$(printf '%s\n' "$line" | awk '{print $2}')
    [ -z "$val" ] && continue
    if [ "$key" = "$ROOT" ] || [ "$key" = "$REPO_BASE" ]; then
      MAPPED="$val"
      break
    fi
  done < "$CANDIDATE"
  [ -n "$MAPPED" ] && break
done
[ "$MAPPED" = "museum" ] && exit 0

# ── Powerhouse test 2: origin remote under a powerhouse GitHub org ───────────
ORIGIN=$(git -C "$ROOT" remote get-url origin 2>/dev/null)
case "$ORIGIN" in
  *[Pp]owerhouse*) exit 0 ;;
esac

echo "💸 MUSEUM LEAST-WORK: this is the museum profile (API-billed) in a non-Powerhouse repo ($REPO_BASE)."
echo "   Museum DIRECTS, it does not do the work — do hands-on coding here with 'claude-tech' (Team sub) or 'agy' (Antigravity) instead."
echo "   From this session, delegate rather than build: dispatch_delegate / swarm_plan (the 'swarm <goal>' keyword)."

exit 0
