#!/bin/bash
# SessionStart hook: install dependencies so linters and builds work in
# Claude Code on the web sessions. Synchronous and idempotent.
set -euo pipefail

# Only run in the remote (web) environment. Local sessions manage their own deps.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-.}"

# npm install (not ci) so the cached container state can be reused across runs.
npm install --no-audit --no-fund
