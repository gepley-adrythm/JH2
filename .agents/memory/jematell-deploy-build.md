---
name: Publish build stability
description: Why production Next builds are pinned to one SSG worker
---

Publish builds intermittently failed with `TypeError: Cannot read properties of null (reading 'useContext'/'useEffect')` during static export — a different random page each attempt — while local warm AND cold builds passed all 747 pages cleanly.

**Why:** The deployment build machine crashes parallel SSG workers nondeterministically (Turbopack SSR chunks + 3 workers). Not a code bug; do not chase individual failing pages.

**How to apply:** `next.config.mjs` sets `experimental.cpus: 1` for non-development builds — keep it. A minimal `app/global-error.tsx` (self-contained, no providers) is also required: the auto-generated `/_global-error` prerender bypasses the root layout providers and fails otherwise. If a publish build fails on a random page with a null-React-hook error, first verify locally with a cold `NODE_ENV=production pnpm run build`, then suspect the build machine.
