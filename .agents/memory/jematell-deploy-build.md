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

## Second failure mode: image-layer push, not the build

A publish can be marked `failed` with build logs that contain **no error at all** — they simply stop after `Pushing Repl layer...` / `Created pid1 binary layer`, then the build times out several minutes later. That is the image upload dying, not the app.

**How to tell it apart:** diff the failed build's log tail against the last successful one. A healthy publish continues `Created Repl layer` → `Pushing Repl (cache) layer` → `Pushed image manifest` → `Creating Autoscale service` → `Deployment successful`. If the static export finished (route table + `[precompress] N files` line present) and only the push steps are missing, the code is fine — republishing is the fix.

**Why it is fragile here:** the export is ~1.4 GB across ~6.7k files plus brotli/gzip siblings, so the Repl layer push takes ~5 minutes even when it works — little headroom before the timeout. Keep non-runtime bulk out of the image via `.replitignore` (git history, caches, uploaded assets, raw scrape data). Only `clone-data/extracted/*.json` is imported by the build; the rest of `clone-data/` is reference material and safe to exclude.
