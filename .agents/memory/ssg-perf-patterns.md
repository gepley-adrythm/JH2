---
name: SSG performance patterns (jematell-homes)
description: Non-obvious constraints when code-splitting, preloading, and serving responsive images in a Vite SSG (renderToString + StaticRouter) app.
---

# Code-splitting in a synchronous-SSG app

Route components must be **eager on the server, lazy on the client**.

**Why:** the prerender renders each route with `renderToString`, which is
synchronous and cannot suspend/await `React.lazy` — a lazy route would render the
Suspense fallback (empty) into the static HTML, breaking the "real H1 + body in
raw HTML" SEO requirement. The client, by contrast, wants per-page chunks so the
initial bundle stays small.

**How to apply:** branch on `import.meta.env.SSR` (Vite replaces it with a
literal per build, so the dead branch + its imports are tree-shaken). Server
branch uses top-level-`await` dynamic imports; client branch uses `React.lazy`.
Wrap `<Routes>` in `<Suspense>` — React 18 keeps the server HTML visible during
hydration until the matched chunk loads, so there is no blank flash. Keep the LCP
landing page (Home) and tiny pages (NotFound) eager so they ship in the main
bundle. The server bundle becoming async (TLA) is fine: prerender loads it via
`await import(serverEntry)`.

# Image preloads / asset URLs must honor BASE_URL

Any hand-written asset URL in `index.html` (e.g. an LCP `<link rel="preload"
as="image" imagesrcset=...>`) must use Vite's `%BASE_URL%` token, not a
root-absolute `/images/...` path.

**Why:** at runtime the app prefixes asset paths with `import.meta.env.BASE_URL`
(the proxy assigns a path prefix in production). A root-absolute preload would not
match the actual request the browser makes for the image, wasting the preload and
double-fetching.

# Responsive <picture> without disturbing existing CSS

A `<picture>` wrapper around an `<img>` can break layouts that target the bare
`<img>`. Add `picture { display: contents }` globally so the wrapper adds no box;
existing rules targeting the inner `<img>` (or its class) keep working unchanged.
Put intrinsic `width`/`height` on the `<img>` for zero CLS even when CSS uses
`object-fit: cover`.
