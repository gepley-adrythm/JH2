---
name: Cross-artifact API calls from the web app
description: Why fetches to the separate api-server use a root-relative /api path, not a BASE_URL-prefixed one
---

# Calling the api-server from the jematell-homes web app

When the web app fetches its sibling Express **api-server** (a separate artifact mounted by the
proxy at the root path `/api`), use a **root-relative** URL like `/api/contact`. Do **not**
prefix it with `import.meta.env.BASE_URL`.

**Why:** The replit.md gotcha "hand-written URLs must use BASE_URL" applies only to a web app
calling its *own* same-artifact routes/assets (which live under the artifact's path prefix). The
api-server is a *different* artifact; the shared proxy routes `/api` most-specific-first
regardless of whatever path prefix the web artifact is mounted under, so a BASE_URL-prefixed
`/<webprefix>/api/...` would miss it. Verified working through the dev proxy at `localhost:80`.

**How to apply:** For same-artifact URLs → BASE_URL-prefixed. For the separate `/api` artifact →
plain root-relative `/api/...`.
