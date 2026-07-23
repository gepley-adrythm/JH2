---
name: Dev-server self-healing supervisor
description: How the jematell dev servers auto-recover through post-merge installs and SSH churn
---

Both dev workflows run under `scripts/dev-supervisor.sh` (workflow → `pnpm run dev` → supervisor loop → `dev:raw`). The supervisor never exits: it waits while `pnpm install` is rewriting node_modules, kills stale listeners on its port, runs the server, and restarts with backoff (fast after long healthy runs, up to 30s in crash loops). It forwards TERM/INT to the child so workflow restarts stay clean.

**Why:** the workspace has concurrent git syncs (post-merge hook runs pnpm install + drizzle push under the running server) and a second developer over SSH causing process/port churn; previously any crash left workflows stopped until manually restarted.

**How to apply:** never revert `dev` to run the server directly — the raw command lives in `dev:raw`. `scripts/post-merge.sh` deliberately always exits 0 and caps db push at 12s (20s hook budget); failures are flagged in `/tmp/post-merge-degraded`, so check that file if deps/schema seem stale after a merge.
