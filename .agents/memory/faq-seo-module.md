---
name: FAQ module (jematell-homes)
description: Where the FAQ system lives after it was folded into the web app, and the durable rules that govern it.
---

The FAQ system is **real React pages in the web app** (`/faq`, `/faq/topics/:slug`, `/faq/:slug`), pre-rendered via the site's SSG pipeline. It is NOT SSR'd by the api-server anymore. The web artifact owns `/faq*`; the api-server owns only `/api`.

- **Single source of truth** = the shared `@workspace/faq` lib (seed + types + dataset builder + render/JSON-LD helpers). Both the web app and the api-server import it; never fork the seed back into either app.
- **api-server's remaining FAQ role**: the DB, `/api/faqs`, seed sync on boot (idempotent upsert by slug), and a build-time JSON-LD validator. It no longer renders public FAQ HTML. The lib's render/shell/jsonld helpers are kept *only* because the validator reuses them — they are not dead code.
- **Routing ownership is a coordinated `artifact.toml` pair**: web `paths=["/"]` (owns `/faq*` via most-specific-first matching), api `paths=["/api"]`. Both must change together — if both claim `/faq*` you get a routing conflict. Use the artifacts skill, not hand edits.
- **JSON-LD policy** (must stay consistent with the validator): hub + topic pages emit `FAQPage`; topic + detail also emit `BreadcrumbList` (nested pages get a breadcrumb, the hub does not); detail emits `QAPage`. Site-wide `@type`s (Organization/GeneralContractor/WebSite) are emitted once site-wide — never duplicate any `@type` on a page.
- **Detail breadcrumb is 4-level** `Home > FAQ > Topic > Question` when the item has a resolvable topic; falls back to 3-level when it has none. The 3rd crumb is the item's first resolvable **topic** (topics have pages at `/faq/topics/<slug>`). **Categories are NOT link-worthy** breadcrumb nodes — they exist only as sections on the hub, with no page.
- **`shortAnswer` + `metaDescription` are schema/meta only, NEVER visible body copy.** shortAnswer → FAQPage `acceptedAnswer`; the full answer → QAPage + visible on the detail page.
- Cross-linking FAQ ↔ services ↔ blog pillars uses `relatedServiceSlugs` (mapped to real site routes via a SERVICE_LINKS map; unknown slugs are skipped, never dead links) and `pillarBlogSlug`.

**Why:** the public site is a static (SSG) React app with one design system, nav, motion, and contact form; the FAQ should share all of it rather than be a hand-written HTML clone in the api-server. SEO still needs real H1 + body + structured data in the first HTML response, which SSG provides.
