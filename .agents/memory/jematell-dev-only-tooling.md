---
name: Dev-only tooling pattern (gallery reorder editor)
description: How dev-only authoring tools (the gallery drag-to-reorder editor + its persistence) are built so they can never ship to the static production deploy.
---

# Dev-only tooling: never ships, persists across checkpoints

The gallery detail pages have a dev-only drag-to-reorder editor with a toolbar
(Save / Preview production / Copy order / Reset). It must never appear in
production.

## Why this is safe
The web app's production deploy is **static** (`artifact.toml`
`serve = "static"`, `publicDir = dist/public`) — there is no server in prod at
all. So two independent guards keep dev tooling out:

1. **The UI component** is gated by `import.meta.env.DEV` + a `React.lazy`
   dynamic `import()`; in a prod build `isDev` folds to `false`, the lazy branch
   is dead code, and Rollup never emits the chunk. Verified by building and
   grepping `dist` (0 matches for the component / its strings).
2. **Its persistence backend** is a Vite middleware with `apply: "serve"` — it
   only exists while `vite dev` runs, and a static deploy runs no Vite at all.

## Persistence ("Save → backend, never lost")
Save POSTs the order to `/__dev/gallery-order` (the Vite serve-only middleware),
which writes a **committed** JSON file (`src/data/gallery-orders.json`). That
survives cache clears, a different browser, and checkpoints — localStorage alone
would not. On mount the dev component hydrates from the server (server wins),
falling back to localStorage. The path is reachable behind the proxy because the
web artifact is mounted at `/` (BASE_PATH `/`); `/api/*` would instead route to
the api-server, so the endpoint deliberately uses `/__dev/*`, not `/api/*`.

## How to apply (any future dev-only editor here)
- Component: gate with `import.meta.env.DEV` + lazy dynamic import.
- Backend: use a Vite `apply:"serve"` middleware, NOT the api-server (which is a
  real prod service). Write to a committed file if the data must persist.
- Verify: prod build + `grep -r` the `dist` output for the dev strings (expect 0).
