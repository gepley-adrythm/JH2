---
name: Jematell SEO + SSG architecture
description: Static prerender pipeline, per-page SEO/JSON-LD policy, FAQ routes, ContentPage renderer, content extraction for jematell-homes
---

# Jematell SEO + SSG

## Static pre-rendering (SSG), not SSR
Every public route is rendered to real HTML at build time (`renderToString` +
`StaticRouter`) and hydrated in the browser. All content is static at build time
(extracted JSON + the FAQ seed), so every indexable page ships a real H1 + body copy
in the first HTML response. Dev runs as plain CSR; SSG is verified via `build`.

**Above-the-fold H1 rule:** use the CSS `hero-title` class, NEVER framer-motion
`initial={{opacity:0}}` — the latter ships an invisible heading in the raw pre-JS
HTML and fails the real-H1 SEO requirement (enforced by the `audit`).

## Per-page SEO + JSON-LD policy
`src/seo/` collector sets title/meta/canonical/OG per route. Site-wide JSON-LD types
(Organization/GeneralContractor/WebSite) are emitted exactly ONCE; page-specific types
are added per page (Service, Article/BlogPosting, FAQPage on FAQ hub/topic, QAPage on
FAQ detail, BreadcrumbList on nested pages). **Never emit the same `@type` twice on one
page.**

## FAQ lives in the web app
`/faq`, `/faq/topics/:slug`, `/faq/:slug` are real React routes (site design system,
nav, motion, universal contact form), pre-rendered via SSG. FAQ detail breadcrumb is
4-level (Home > FAQ > Topic > Question) when the item has a resolvable topic, falling
back to 3-level when it does not (categories have no pages, so they are not
link-worthy breadcrumb nodes). The api-server no longer serves public FAQ HTML — it
keeps the DB, `/api/faqs`, and the build-time JSON-LD validator only. Do not let both
artifacts claim `/faq*` in `artifact.toml`.

## Generic ContentPage renderer
`ContentPage` handles 20+ inner pages (custom-homes, spec-homes, about, warranty,
every location page) from a structured JSON document. Specialized components only
exist for genuinely different layouts (Home, Gallery, GalleryDetail, Blog, BlogPost,
Contact). Routing basename uses `import.meta.env.BASE_URL` so the app works at `/` in
dev and behind any proxy path prefix.

## Content extraction
Content comes from `clone-data/extracted/*.json`, produced by scraping the existing
Squarespace site and parsing with cheerio into `{type, text|src|alt}` block arrays.
Re-run `node clone-data/extract.mjs` after rescraping. Blog filter rejects keys
containing `%`/`+` or starting with `category_`/`tag_`/`author_` (Squarespace taxonomy
URLs, not real articles) — only ~47 real article slugs render. Inner-page images use
Squarespace CDN URLs directly (client's own assets); homepage uses local
`public/images/`.
