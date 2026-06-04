# Jematell Homes

Premium marketing website for Jematell Homes — a family-owned custom home builder serving Scottsdale, Rio Verde, and the greater Phoenix metro. This is a rebuild of the client's existing Squarespace site (jematellhomes.com), reconstructed as a React + Vite app with a more premium, editorial feel.

## Run & Operate

- `pnpm --filter @workspace/jematell-homes run dev` — run the website (workflow `artifacts/jematell-homes: web`)
- `pnpm --filter @workspace/jematell-homes run typecheck` — typecheck the artifact
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000) if needed
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/jematell-homes run audit` — speed & accessibility regression check against the existing `dist/public` build
- `pnpm --filter @workspace/jematell-homes run audit:ci` — build first, then run the audit (this is the registered `audit` validation command)
- `pnpm --filter @workspace/jematell-homes run lint:content` — content style check against the existing `dist/public` build (em dashes + AI buzzwords)
- `pnpm --filter @workspace/jematell-homes run lint:content:ci` — build first, then run the content lint (standalone). In CI the content lint is folded into `audit:ci` (one shared build) so the two checks never race on `dist/`
- `node clone-data/extract.mjs` — re-run the content extraction from scraped HTML (regenerates `clone-data/extracted/*.json`)
- `node clone-data/download-cdn.mjs` — mirror every Squarespace-hosted image referenced by the site into `clone-data/cdn/` (dev-only staging for the eventual off-Squarespace self-host) and write `clone-data/cdn-manifest.json` (remote URL → local path). Idempotent.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Web artifact: React, Vite (SSG prerender), plain CSS, framer-motion, lucide-react, react-router-dom v7. Dependencies are kept lean — the unused scaffold UI kit (radix, recharts, react-hook-form, zod, etc.) has been pruned; only `card.tsx` + `lib/utils` remain from the old `components/ui`.
- Shared lib: `@workspace/faq` — FAQ seed + types + dataset/JSON-LD helpers; single source of truth consumed by both the web app and the api-server
- API: Express 5 — owns the FAQ DB, `/api/faqs`, and a build-time FAQ JSON-LD validator. It no longer renders public FAQ HTML (the web app does)
- Build: Vite + esbuild

## Where things live

- `artifacts/jematell-homes/` — the website
  - `src/App.tsx` — BrowserRouter + all route definitions
  - `src/layout.tsx` — Header (with NavDropdown component), Footer, floating ContactWidget
  - `src/sections.tsx` — Homepage sections (Hero, About, StatsStrip, ServicesSplit, Process, WhereWeBuild, Reviews)
  - `src/cta.tsx` — Homepage CTA section; its button opens the universal contact form (no inline form anymore)
  - `src/contact-form/` — The universal multi-step contact form ("ContactV5")
    - `ContactFormProvider.tsx` — mounts the form once, exposes `useContactForm()` → `{ open, close, isOpen }`; handles Esc, body-scroll-lock, focus trap + focus restoration
    - `ContactForm.tsx` — the immersive full-screen multi-step form (name → contact → message-builder → extras → thank-you)
    - `formData.ts` — chip options + helpers; `submit.ts` — POSTs to `/api/contact` (Gmail email delivery)
    - `analytics.ts` — first-touch attribution: captures UTMs / referrer on app mount (sessionStorage), derives source/medium dynamically from `document.referrer` when UTMs are absent
    - `contact-form.css` — co-located styles (all `cf-*` classes)
  - `src/index.css` — All styling (single file, no Tailwind, organized by section)
  - `src/pages/` — Page-level components
    - `Home.tsx` — landing page (composes the homepage sections)
    - `ContentPage.tsx` — generic renderer that ingests `pages.json` blocks
    - `Gallery.tsx`, `GalleryDetail.tsx` — portfolio
    - `Blog.tsx`, `BlogPost.tsx` — journal index + article
    - `FaqIndex.tsx`, `FaqTopic.tsx`, `FaqDetail.tsx` — FAQ hub, topic pages, and Q&A detail pages
    - `Contact.tsx` — contact info cards + lead form
    - `not-found.tsx` — 404
  - `src/config/` — central `siteConfig` + `navConfig` (brand, CTA, services, locations, contact, social; primary nav + sub-nav children) — single source of truth, no hardcoded brand strings in components
  - `src/motion.ts`, `src/transitions.css` — motion tokens (one easing `cubic-bezier(0.22,1,0.36,1)`, durations 0.3-0.8s) + cross-route fade / hero entrance / scroll-reveal CSS; all reduced-motion guarded
  - `src/seo/` — per-page `Seo` head collector + `jsonld.ts` builders; site-wide JSON-LD `@type`s emitted once, page types added per page
  - `src/entry-client.tsx`, `src/entry-server.tsx`, prerender script — the SSG pipeline (hydrate in browser; `renderToString` + `StaticRouter` at build time)
  - `src/data/pages.ts`, `src/data/blogs.ts`, `src/data/faq.ts` — typed wrappers around the content sources (extracted JSON + the shared FAQ lib)
  - `public/images/` — local homepage hero/section images
- `lib/faq/` — shared FAQ seed, types, dataset builder, and JSON-LD/render helpers (the build-time validator reuses the render helpers)
- `clone-data/` — content extraction pipeline (dev-only, not shipped)
  - `extract.mjs` — cheerio-based extractor
  - `download-cdn.mjs` — mirrors all referenced Squarespace images to `clone-data/cdn/` for the future self-host migration; writes `cdn-manifest.json`
  - `pages/*.html`, `blogs/*.html` — raw scraped source HTML
  - `extracted/pages.json`, `extracted/blogs.json` — structured `{title, description, ogImage, blocks[]}` keyed by slug
  - `cdn/` — local mirror of all Squarespace images (dev-only, NOT yet shipped/wired); `cdn-manifest.json` maps each original remote URL to its local path. To self-host: copy `cdn/` into the artifact `public/` tree and rewrite references via the manifest.

## Architecture decisions

This is the at-a-glance list. Deep detail (the "why", edge cases, budgets) has been
moved into focused topic files under `.agents/memory/` to keep this README scannable —
follow the pointers when you need the full story.

- **Routing basename uses `import.meta.env.BASE_URL`** so the app works at `/` in dev and behind any proxy path prefix.
- **Generic ContentPage renderer** handles 20+ inner pages from a structured JSON document; specialized components only exist for genuinely different layouts (Home, Gallery, GalleryDetail, Blog, BlogPost, Contact).
- **Content comes from `clone-data/extracted/*.json`** (cheerio scrape of the old Squarespace site). Re-run `node clone-data/extract.mjs` after rescraping. Blog filters out Squarespace taxonomy URLs; inner-page images use Squarespace CDN URLs; homepage uses local `public/images/`.
- **Static pre-rendering (SSG), not SSR** — every public route is `renderToString`'d to real HTML at build time and hydrated in the browser; dev is plain CSR. → `.agents/memory/jematell-seo-ssg.md`
- **Per-page SEO + JSON-LD policy** — `src/seo/` collector; site-wide types emitted once, page types added per page; never emit the same `@type` twice. → `.agents/memory/jematell-seo-ssg.md`
- **FAQ lives in the web app** (`/faq`, `/faq/topics/:slug`, `/faq/:slug`), SSG-prerendered; api-server keeps only the DB + `/api/faqs` + JSON-LD validator. → `.agents/memory/jematell-seo-ssg.md`
- **Motion system** — one shared easing `cubic-bezier(0.22,1,0.36,1)`, durations 0.3-0.8s (`src/motion.ts` / `src/transitions.css`); all reduced-motion guarded. Above-the-fold H1s use the CSS `hero-title` class, not framer-motion opacity.
- **One universal contact form** (`src/contact-form/`), mounted once via `ContactFormProvider`, opened everywhere via `useContactForm().open()`. Gmail email delivery + first-touch attribution + co-located `cf-*` CSS. → `.agents/memory/jematell-contact-form.md`
- **Performance** — responsive WebP images (`ResponsiveImage` + `gen-images.mjs`, hero is a deliberate exception), eager-server/lazy-client per-route code splitting, non-blocking font `<link>`, framer-motion via `LazyMotion` (use `m`, never `motion`), lazy-loaded contact form. → `.agents/memory/jematell-performance.md`
- **Quality guards** — `scripts/audit.mjs` (real-H1 + JS gzip budget + gated axe-core a11y) and `scripts/content-lint.mjs` (em dashes = hard error, AI buzzwords = error on owned routes / warn on legacy prose). → `.agents/memory/jematell-quality-guards.md`
- **Premium Blog index hero** — `Blog.tsx` reuses the FAQ archive's image-hero pattern (`page-hero faq-hero` + `ResponsiveImage name="cta-bg"` + `faq-hero-title hero-title` + `faq-search`), no new CSS.

## Product

A multi-page marketing site with:
- Editorial hero + scroll-storytelling homepage (services, process, where-we-build, testimonials, lead form)
- Portfolio gallery (10 projects, each with image grid)
- Custom Homes / Spec Homes / Floor Plans service pages
- Where We Build hub + 10 location-specific landing pages (Scottsdale, Rio Verde, Phoenix, Cave Creek, Fountain Hills, Carefree, Casa Grande, Apache Junction, plus Build on Your Lot / Buy a Lot With Us)
- About, Warranty, Privacy, Thank You pages
- Blog with 47 articles, client-side search, prev/next navigation
- FAQ hub + per-topic pages + individual Q&A detail pages, cross-linked to blog pillars and service pages. Content is a focused set of deep, research-phase, building-code-grounded answers (permitting, adopted codes, land due diligence, wells/septic/water-supply, zoning/setbacks/NAOS, ADUs, budgeting/financing) — each 500-1,500 words, citing real AZ law (A.R.S. 45-454, A.R.S. 32-2101, Scottsdale ESLO/NAOS, HB 2720, ADWR/ADEQ) and always reminding readers to confirm specifics with the local AHJ.
- Contact page with info cards, a floating contact widget on every page, validated lead form

## User preferences

- Rebuild of the client's own Squarespace site — they confirmed legitimate ownership upfront.
- React + Vite + plain CSS stack (user accepted this in place of the originally-mentioned Next.js).
- 2026-grade premium feel — no gimmicks, no emojis in the UI.
- Editorial typography: Fraunces serif for headings, Outfit for body.
- Warm desert palette (defined as CSS custom properties in `index.css`).
- Mobile-first, must work down to 360px.
- All animations must respect `prefers-reduced-motion`.
- All interactive elements need kebab-case `data-testid` attributes.

## Gotchas

- **Don't add the artifact to the root `tsconfig.json` references** — it's a leaf workspace.
- **Don't run `pnpm dev` at the workspace root** — use the workflow `artifacts/jematell-homes: web`.
- **Verify with typecheck, not build** — `build` needs `PORT`/`BASE_PATH` env vars the workflow wires up.
- **Some `pages.json` keys use underscores** (e.g. `gallery_modern-farmhouse`, `aboutus`, `spechomes`) — the route mapping in `App.tsx` translates URL-friendly slugs to these JSON keys.
- **Always strip the " — Jematell Homes" title suffix** when displaying page titles (handled by `cleanTitle()` in renderers).
- **Skip `rv-garages-old`** — deprecated page; no route exists for it.
- **Blog slug filter** must reject keys containing `%`, `+`, or starting with `category_`/`tag_`/`author_` — these are Squarespace taxonomy URLs, not real articles.
- **The web app owns `/faq*`; the api-server owns only `/api`** — don't re-add public FAQ HTML routes to the api-server or let both artifacts claim `/faq*` in their `artifact.toml` (use the artifacts skill, not hand edits).
- **Above-the-fold H1s must use the CSS `hero-title` class, never framer-motion `initial={{opacity:0}}`** — the latter ships an invisible heading in the raw pre-JS HTML, which fails the real-H1 SEO requirement.
- **Lazy routes must stay eager on the server** — when adding a route to `src/routes.tsx`, add it to BOTH the `import.meta.env.SSR` (eager `await import`) and the client (`React.lazy`) branches, or the prerendered HTML loses its SEO content. → `.agents/memory/jematell-performance.md`
- **Use `m` from framer-motion, never the full `motion`** — `LazyMotion ... strict` is on; `motion.div` throws at runtime AND a bare `motion.*` builds fine but silently fails SSG (writes a no-H1 fallback page, failing the `audit` for that route). Always typecheck (catches TS2552) + audit before trusting a build. → `.agents/memory/jematell-performance.md`
- **Hand-written asset URLs in `index.html` must use the `%BASE_URL%` token** (e.g. the hero preload), never a root-absolute `/images/...` — runtime image requests are `BASE_URL`-prefixed behind the proxy, so a mismatched preload double-fetches.
- **Keep the full-screen mobile nav a SIBLING of `<header>`, never nested inside it** — `.site-header.scrolled`'s `backdrop-filter` makes the header a containing block, collapsing a nested `position:fixed inset:0` panel to the header box (intermittent: only when scrolled/solid). `Header` returns a fragment with `#mobile-nav-panel` as a sibling. → `.agents/memory/fixed-overlay-containing-block.md`

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- See `artifacts/jematell-homes/.replit-artifact/artifact.toml` for the artifact's proxy config
- **Deep architecture detail lives in `.agents/memory/`** (`jematell-seo-ssg.md`, `jematell-performance.md`, `jematell-contact-form.md`, `jematell-quality-guards.md`, `fixed-overlay-containing-block.md`, `floorplan-tier-images.md`) — this README keeps the at-a-glance summary; those files hold the full "why" and edge cases.
