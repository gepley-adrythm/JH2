---
name: Publish build stability
description: Why production Next builds are pinned to one SSG worker (unconditionally)
---

Publish builds intermittently failed with `TypeError: Cannot read properties of null (reading useContext/useEffect)` during static export, a different random page each attempt, while local builds passed all 747 pages.

**Root cause (confirmed 2026-07-23):** the crash is nondeterministic parallel-SSG-worker teardown. The deploy build machine sets a NON-STANDARD NODE_ENV (Next prints the "non-standard NODE_ENV" warning), so the earlier env-gated fix `NODE_ENV === "development" ? {} : { cpus: 1 }` silently did NOT apply on deploy: the deploy log showed "Generating static pages using 3 workers". A local build with NODE_ENV=production forced 1 worker and passed 747/747.

**Fix (keep, do NOT revert or re-gate):**
1. `next.config.mjs` sets `experimental.cpus: 1` UNCONDITIONALLY (never gate it on NODE_ENV again) plus `staticGenerationRetryCount: 3`.
2. The `build` script forces `NODE_ENV=production` so config resolves predictably and the non-standard-NODE_ENV warning goes away.
3. Keep the minimal self-contained `app/global-error.tsx` (the /_global-error prerender bypasses root-layout providers).

If a publish still fails on a random page with a null-React-hook error, the build machine ignored cpus:1 entirely; next lever is in-process static generation, not chasing individual pages.
