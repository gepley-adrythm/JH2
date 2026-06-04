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
  - `pages/*.html`, `blogs/*.html` — raw scraped source HTML
  - `extracted/pages.json`, `extracted/blogs.json` — structured `{title, description, ogImage, blocks[]}` keyed by slug

## Architecture decisions

- **Routing basename uses `import.meta.env.BASE_URL`** so the app works both at `/` in dev and behind any path prefix the artifact proxy assigns.
- **Generic ContentPage renderer** handles 20+ inner pages (custom-homes, spec-homes, about, warranty, every location page, etc.) from a structured JSON document. Specialized components only exist for pages with genuinely different layouts (Home, Gallery, GalleryDetail, Blog, BlogPost, Contact).
- **Content comes from `clone-data/extracted/*.json`** — produced by scraping the existing Squarespace site and parsing with cheerio into `{type, text|src|alt}` block arrays. Re-run `node clone-data/extract.mjs` after rescraping to refresh.
- **Blog filters out Squarespace taxonomy URLs** (category_*, tag_*, percent-encoded slugs) — only the ~47 real article slugs are rendered.
- **Inner-page images are referenced via Squarespace CDN URLs** directly (they're the client's own assets). Homepage uses local files in `public/images/` for the first-paint hero.
- **Static pre-rendering (SSG), not SSR** — every public route is rendered to real HTML at build time (`renderToString` + `StaticRouter`) and hydrated in the browser. All content is static at build time (extracted JSON + the FAQ seed), so every indexable page ships a real H1 + body copy in the first HTML response. Dev runs as plain CSR; SSG is verified via `build`.
- **Per-page SEO + JSON-LD policy** — the `src/seo/` collector sets title/meta/canonical/OG per route. Site-wide JSON-LD types (Organization/GeneralContractor/WebSite) are emitted exactly once; page-specific types are added per page (Service, Article/BlogPosting, FAQPage on FAQ hub/topic, QAPage on FAQ detail, BreadcrumbList on nested pages). Never emit the same `@type` twice on one page.
- **FAQ lives in the web app** — `/faq`, `/faq/topics/:slug`, `/faq/:slug` are real React routes using the site's design system, nav, motion, and universal contact form, pre-rendered via SSG. The FAQ detail breadcrumb is 4-level (Home › FAQ › Topic › Question) when the item has a resolvable topic, falling back to 3-level when it does not (categories have no pages, so they are not link-worthy breadcrumb nodes). The api-server no longer serves public FAQ HTML — it keeps the DB, `/api/faqs`, and the build-time JSON-LD validator only.
- **Motion system** — one shared easing (`cubic-bezier(0.22,1,0.36,1)`), durations 0.3-0.8s, defined in `src/motion.ts` / `src/transitions.css`; every animation is disabled under `prefers-reduced-motion`. Above-the-fold H1s use the CSS `hero-title` class (NOT framer-motion `initial={{opacity:0}}`) so the heading is visible in the raw pre-JS HTML.
- **One universal contact form** — a single immersive multi-step form lives in `src/contact-form/`, mounted once via `ContactFormProvider` (inside `BrowserRouter`) and opened from everywhere via `useContactForm().open()`: header CTA (desktop + mobile), hero CTA, homepage CTA section, and the floating contact widget. It replaced the old inline lead form and the old multi-link floating widget menu.
- **Contact form email delivery** — `submit.ts` POSTs the lead to `POST /api/contact` (the api-server artifact at the proxy-root `/api` path; root-relative, NOT `BASE_URL`-prefixed since it is a separate artifact). The api-server route (`artifacts/api-server/src/routes/contact.ts`) validates with the generated `SubmitContactBody` zod schema and sends an HTML+text email via the **Gmail integration** (`@replit/connectors-sdk`, connector `google-mail`, `POST /gmail/v1/users/me/messages/send` with a base64url MIME message). Recipients default to `gepley@adrythm.com` + `tyler@jematellhomes.com`, overridable via the `CONTACT_NOTIFY_TO` env var (comma-separated). `Reply-To` is set to the lead's name+email so replies go straight to the lead. User input is HTML-escaped and header fields are CRLF-stripped (injection guards).
- **Lead attribution** — `src/contact-form/analytics.ts` captures *first-touch* attribution on app mount (`initTracking()` in `AppShell`, persisted in `sessionStorage` so it survives client-side navigation before the form opens). UTM params win when present; otherwise `source`/`medium` are derived **dynamically** from `document.referrer` (search-engine hosts → `organic`, social hosts → `social`, any other host → `referral`, a `gclid` with no UTMs → `cpc`, no referrer → `direct`). The full attribution block (source, medium, campaign, raw UTMs, gclid, referrer, landing page, trigger url) is included in the notification email.
- **Contact-form CSS is co-located** (`src/contact-form/contact-form.css`, imported by the provider) — a deliberate deviation from the otherwise single-`index.css` convention, to keep the ported form self-contained. All its classes are namespaced `cf-*`.
- **Performance: responsive WebP images** — `src/components/ResponsiveImage.tsx` renders a `<picture>` with WebP `srcset`/`sizes` variants (generated by `scripts/gen-images.mjs` at q90, kept visually lossless) and the original JPEG as fallback. `picture { display: contents }` keeps the wrapper layout-neutral so existing CSS targeting the inner `<img>`/class is unchanged; intrinsic `width`/`height` give zero CLS. Re-run `node scripts/gen-images.mjs` after adding/replacing a source JPEG in `public/images/`. **The homepage hero is deliberately NOT run through this pipeline** — `public/images/hero.jpg` is itself an already-compressed 2500px WebP, so re-encoding it to downscaled WebP variants double-compressed the aerial photo and visibly softened it. The hero renders the original `hero.jpg` directly (full-res `<img>`, browser-downscaled) and is preloaded in `index.html` (`<link rel=preload as=image href="%BASE_URL%images/hero.jpg">`) for LCP. Do not re-add hero variants to `gen-images.mjs`.
- **Performance: per-route code splitting** — `src/routes.tsx` splits every non-home page into its own chunk. It is **eager on the server, lazy on the client** (branch on `import.meta.env.SSR`): SSG `renderToString` is synchronous and cannot suspend on `React.lazy`, so the server build top-level-awaits the real modules and emits full HTML, while the client gets `React.lazy` chunks. `<Routes>` is wrapped in `<Suspense>`; React 18 keeps the server HTML during hydration (no blank flash). Home + NotFound stay eager. This dropped the initial JS bundle from ~1.2MB to ~190KB (the 517KB blog-data chunk now only loads on blog pages).
- **Performance: fonts via non-blocking `<link>`** — the Google Fonts stylesheet is loaded with a `<link>` in `index.html` (preconnect already present), not a CSS `@import` (which chain-blocks render). Newsreader + Outfit are narrowed to the weights actually used (300–600, italic kept), `font-display: swap`.
- **Performance: framer-motion via `LazyMotion`** — `AppShell` wraps the app in `<LazyMotion features={domAnimation} strict>`, and every component imports `m` (not `motion`). This ships only the DOM-animation feature set instead of the full `motion` engine (which would otherwise sit in the initial chunk because the homepage + AppShell use motion). `domAnimation` is sufficient because nothing uses `layout`/`drag` (which would need `domMax`). `strict` mode throws if a component imports the full `motion`, guaranteeing the lighter path. `MotionConfig`, `AnimatePresence`, and `useReducedMotion` are unaffected and used as before.
- **Performance: contact form is lazy-loaded** — `ContactFormProvider` loads `ContactForm` via `React.lazy` (wrapped in `<Suspense fallback={null}>`, inside `AnimatePresence`), so the ~47KB form chunk only downloads when the form is first opened, not on first paint. It has no SEO value (behind a button), so this is safe.
- **Automated speed & a11y guard** — `scripts/audit.mjs` (run via `pnpm run audit` / `audit:ci`, registered as the `audit` validation command) is a deterministic, browser-free regression check against the built `dist/public`. It asserts: a real `<h1>` + `<html lang>` + non-empty `<title>` in the raw prerendered HTML of representative routes; no render-blocking resources (every local script is `type=module`, no `@import` in built CSS, blocking stylesheets ≤ budget); an initial-JS gzip budget (entry + modulepreloads, ~139KB measured, 180KB budget — this set is shared across all prerendered routes since they reuse one `index.html` template); and an accessibility budget of zero *gated* axe-core violations per route (run in jsdom). A violation is gated when its impact is serious/critical **or** its rule id is in `alwaysFailRules` — `heading-order` is gated explicitly even though axe ranks it "moderate", because a broken heading hierarchy is a named regression target. Budgets and rule sets live in the `CONFIG` block at the top of the script. **Excluded rules (`CONFIG.ignoredRules`):** `color-contrast` (jsdom does no layout/paint, so axe can only report it "incomplete" — runtime contrast must be checked with the browser-based testing harness) and `region` (the floating contact widget is an intentional fixed element outside page landmarks). Note: blog-card and gallery-card titles are `<h2>` (not `<h3>`/`<span>`) so the list pages keep a valid h1→h2 hierarchy under this guard.
- **Content style guard (em dashes + AI buzzwords)** — `scripts/content-lint.mjs` (run standalone via `pnpm run lint:content` / `lint:content:ci`; in CI it is chained into the `audit:ci` build so it shares one `dist/` with the audit and the two never race) walks every `dist/public/**/index.html`, strips tags/scripts/styles to visible text, and asserts two things. (1) **Em dashes are a hard ERROR everywhere** (em dash `—` U+2014 + horizontal bar `―` U+2015 — mechanical regression, the house style is a spaced hyphen `" - "`). The en dash `–` (U+2013) is deliberately NOT flagged: it is legitimate for numeric/weight ranges (e.g. font weights `300–600`, price ranges in FAQ copy). (2) **AI buzzwords** (a conservative list — e.g. `insights`, `elevate`, `seamless`, `robust`, `game changer`, `when it comes to`, `stand the test of time`) are an ERROR on the site's own marketing routes but a non-failing WARN on legacy long-form (`blog/<slug>`, `faq/<slug>` — the client's own article/answer prose, intentionally left in their voice). The owned/legacy split is a regex (`CONFIG.legacyRouteRe`); the word list lives in `CONFIG`. The source of cleanup lives upstream: `clone-data/normalize.mjs` exports `stripEmDashes()` + `cleanText()` (em dash → `" - "` plus a **SAFE 1:1** AI-synonym map — deliberately excludes context-risky words like `elevate`/`insights` and multi-word phrases, which are hand-fixed instead), and `clone-data/extract.mjs` runs `cleanText` on title/description/block text so re-extraction stays clean. The `/blog` index surfaces legacy article *descriptions* as card copy, so those `description` fields in `blogs.json` are cleaned (the article *bodies* are left as warnings).
- **Premium Blog index hero** — `Blog.tsx` uses the same immersive image-hero pattern as the FAQ archive (`page-hero faq-hero` + `ResponsiveImage name="cta-bg"` as `page-hero-bg` + `page-hero-overlay` + `faq-hero-title hero-title` + `page-hero-sub` + `faq-search` search box). It reuses existing CSS — no new rules. The old `.blog-search` CSS is now unused but left in place. Like all above-the-fold heroes, the H1 uses the CSS `hero-title` class (visible in raw pre-JS HTML), not a framer-motion `initial={{opacity:0}}`.

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
- **Lazy routes must stay eager on the server** — when adding a route to `src/routes.tsx`, add it to BOTH the `import.meta.env.SSR` (eager `await import`) and the client (`React.lazy`) branches. A client-only-lazy route renders an empty Suspense fallback into the prerendered HTML and loses its SEO content.
- **Use `m` from framer-motion, never the full `motion` component** — `LazyMotion ... strict` is enabled in `AppShell`, so importing `motion` and using `motion.div` throws at runtime. Import `m` and use `m.div`. (`MotionConfig`/`AnimatePresence`/`useReducedMotion` are fine.) If you ever need `layout` or `drag` animations, switch the `AppShell` feature set from `domAnimation` to `domMax`.
- **Hand-written asset URLs in `index.html` must use the `%BASE_URL%` token** (e.g. the hero preload), never a root-absolute `/images/...` — runtime image requests are `BASE_URL`-prefixed behind the proxy, so a mismatched preload double-fetches.
- **A bare `motion.*` (instead of `m.*`) only fails at runtime, not at build** — Vite/esbuild does NOT typecheck, so a component using `motion.div` while importing only `m` builds fine but throws during SSG `renderToString`. The prerender then writes a fallback page with no `<h1>`/body, silently failing the `audit` content check for *only the routes that render the broken component* (here: `RelatedFaqsSection`, which appears on service + location/region pages via `FAQ_SERVICE_MAP`). Always run `pnpm --filter @workspace/jematell-homes run typecheck` (catches it as TS2552) and the `audit` before trusting a build.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- See `artifacts/jematell-homes/.replit-artifact/artifact.toml` for the artifact's proxy config
