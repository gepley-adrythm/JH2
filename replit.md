# Jematell Homes

Premium marketing website for Jematell Homes — a family-owned custom home builder serving Scottsdale, Rio Verde, and the greater Phoenix metro. This is a rebuild of the client's existing Squarespace site (jematellhomes.com), reconstructed as a React + Vite app with a more premium, editorial feel.

## Run & Operate

- `pnpm --filter @workspace/jematell-homes run dev` — run the website (workflow `artifacts/jematell-homes: web`)
- `pnpm --filter @workspace/jematell-homes run typecheck` — typecheck the artifact
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000) if needed
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `node clone-data/extract.mjs` — re-run the content extraction from scraped HTML (regenerates `clone-data/extracted/*.json`)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Web artifact: React 18, Vite, plain CSS, framer-motion, lucide-react, react-router-dom, react-hook-form + zod
- API: Express 5 (not yet used by the web artifact — currently a static client)
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
    - `formData.ts` — chip options + helpers; `submit.ts` — local submit adapter (delivery not yet connected)
    - `contact-form.css` — co-located styles (all `cf-*` classes)
  - `src/index.css` — All styling (single file, no Tailwind, organized by section)
  - `src/pages/` — Page-level components
    - `Home.tsx` — landing page (composes the homepage sections)
    - `ContentPage.tsx` — generic renderer that ingests `pages.json` blocks
    - `Gallery.tsx`, `GalleryDetail.tsx` — portfolio
    - `Blog.tsx`, `BlogPost.tsx` — journal index + article
    - `Contact.tsx` — contact info cards + lead form
    - `not-found.tsx` — 404
  - `src/data/pages.ts`, `src/data/blogs.ts` — typed wrappers around the extracted JSON
  - `public/images/` — local homepage hero/section images
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
- **No fetch / no backend coupling on the public site** — fully static rendering, ready to host as a CDN-served SPA.
- **One universal contact form** — a single immersive multi-step form lives in `src/contact-form/`, mounted once via `ContactFormProvider` (inside `BrowserRouter`) and opened from everywhere via `useContactForm().open()`: header CTA (desktop + mobile), hero CTA, homepage CTA section, and the floating contact widget. It replaced the old inline lead form and the old multi-link floating widget menu. Submissions are wired end-to-end but delivery is not connected yet (`submit.ts` is a local adapter with a TODO).
- **Contact-form CSS is co-located** (`src/contact-form/contact-form.css`, imported by the provider) — a deliberate deviation from the otherwise single-`index.css` convention, to keep the ported form self-contained. All its classes are namespaced `cf-*`.

## Product

A multi-page marketing site with:
- Editorial hero + scroll-storytelling homepage (services, process, where-we-build, testimonials, lead form)
- Portfolio gallery (10 projects, each with image grid)
- Custom Homes / Spec Homes / Floor Plans service pages
- Where We Build hub + 10 location-specific landing pages (Scottsdale, Rio Verde, Phoenix, Cave Creek, Fountain Hills, Carefree, Casa Grande, Apache Junction, plus Build on Your Lot / Buy a Lot With Us)
- About, Warranty, Privacy, Thank You pages
- Blog with 47 articles, client-side search, prev/next navigation
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

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- See `artifacts/jematell-homes/.replit-artifact/artifact.toml` for the artifact's proxy config
