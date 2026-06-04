---
name: FAQ SEO module (jematell-homes)
description: How the SSR FAQ system is wired across the api-server and the static web SPA.
---

The FAQ system is SSR'd by the **api-server** (Express), not the React SPA, because the SPA is fully static and SEO needs server-rendered HTML + JSON-LD.

- Pages are served at **top-level** paths (`/faq`, `/faq/:slug`, `/faq/topics/:slug`, `/sitemap-faq.xml`) — OUTSIDE `/api`. The reverse proxy routes them by listing those paths in `artifacts/api-server/.replit-artifact/artifact.toml` `services.paths`. Most-specific-first matching keeps `/faq` from colliding with the SPA at `/`.
- Express 5 route order matters: register `/faq/topics/:slug` BEFORE `/faq/:slug`.
- **Seed is the single source of truth** (`src/lib/faq/seed.ts`); it is synced into the DB on boot (idempotent upsert by slug, deactivate-missing), non-fatal if the DB is down.
- `render.ts` is a **pure** function of dataset → HTML, so the build-time JSON-LD validator (`faq:validate`, wired as `prebuild`) runs hermetically from the seed with no DB.
- **`shortAnswer` + `metaDescription` are schema/meta only, NEVER visible body copy.** shortAnswer → FAQPage `acceptedAnswer`; full answer → QAPage + visible on detail.
- Cross-linking to the static SPA uses a **generated JSON file** (`faqCrossLinks.json`) the SPA imports at build time — the SPA can't import server code at runtime. Links to `/faq/*` from the SPA must be plain `<a href>` (cross-artifact full nav), not react-router `<Link>`.

**Why:** Build Spec required DB-backed SSR with schema.org structured data; the SPA stays a CDN-served static app.
