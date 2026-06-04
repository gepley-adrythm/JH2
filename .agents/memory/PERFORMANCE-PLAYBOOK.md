# Performance & Speed Playbook

A portable set of speed/performance patterns used on this Next.js site. Hand this to another
Replit agent as a checklist of optimizations to apply. Cloudflare/CDN image-delivery specifics
are intentionally excluded — everything here works on any Replit project (some patterns require
Next.js 15+/16 App Router).

> How to use this doc: skim the **Quick Checklist**, then read the section for any item you want to
> implement. Each section says *what it does*, *why it helps*, and *how to apply it*. Adapt names
> and paths to the target project — do not assume this project's files exist there.

---

## Quick Checklist

- [ ] Enable `optimizePackageImports` for heavy libraries (icons, animation, query, UI primitives).
- [ ] Turn on the React Compiler for automatic memoization.
- [ ] Use `output: "standalone"` for lean production builds.
- [ ] Inline critical CSS (`experimental.inlineCss`) to cut render-blocking requests.
- [ ] Cache server data with the `'use cache'` directive + tiered `cacheLife` + semantic `cacheTag`.
- [ ] Expose an on-demand revalidation route so content updates don't wait for TTL expiry.
- [ ] Pre-render known pages with `generateStaticParams` (SSG/PPR).
- [ ] Stream below-the-fold / low-priority UI with `<Suspense>`; keep SEO-critical content synchronous.
- [ ] Hydrate TanStack Query from server `initialData` to kill duplicate first-load fetches.
- [ ] Load fonts locally with `next/font/local` and the right `display` strategy.
- [ ] Use `LazyMotion` so the animation library isn't in the main bundle.
- [ ] `dynamic(..., { ssr: false })` for client-only widgets (toasts, modals, charts).
- [ ] Preload the LCP/hero image with `priority` (or a `Link: rel=preload` header).
- [ ] Precompute a search index table; add a small in-memory LRU+TTL cache on hot API routes.

---

## 1. Build & Bundle Configuration (`next.config.ts`)

**Tree-shake heavy libraries.** `optimizePackageImports` rewrites barrel imports so only the used
exports ship. Huge win for icon packs and UI primitive collections.

```ts
experimental: {
  optimizePackageImports: [
    'lucide-react',
    'framer-motion',
    '@tanstack/react-query',
    'react-icons/si',
    'zod',
    // ...any library you import many small named exports from
  ],
  inlineCss: true,        // inline critical CSS, fewer render-blocking requests
},
reactCompiler: true,      // automatic memoization → fewer re-renders, less hand-written useMemo
output: "standalone",     // minimal production output
productionBrowserSourceMaps: false,  // smaller, faster prod builds
```

**Why it matters:** smaller JS/CSS payloads = faster Time-to-Interactive and lower LCP. The React
Compiler removes most manual `useMemo`/`useCallback`/`memo` work while still cutting re-renders.

**How to apply:** add the libraries you import heavily to `optimizePackageImports`. Enable
`reactCompiler` only on React 19 + the compiler-compatible setup, then smoke-test interactions.

---

## 2. Server-Data Caching with `'use cache'` (Next.js 15+/16)

Wrap data-fetching functions in the `'use cache'` directive, give each a **time-to-live** and a
**semantic tag**. The tag is what you invalidate later.

```ts
// lib/serverData.ts
export async function fetchBlogPosts() {
  'use cache';
  cacheLife('hours');        // tiered TTL: 'minutes' | 'hours' | 'days'
  cacheTag('blog');          // invalidate by tag, not by URL
  return db.select()...;
}
```

**Tier the TTLs to how often data changes:**
- `cacheLife('days')` — team bios, service pages, evergreen content.
- `cacheLife('hours')` — blog, FAQ, articles, glossary.
- `cacheLife('minutes')` — events, anything time-sensitive.

**Cache-miss guard (avoid long-lived 404s).** When a freshly published record isn't found yet,
shorten the cache life on the miss so it becomes visible quickly instead of caching the empty
result for hours:

```ts
const row = await db.select()...;
if (!row) {
  cacheLife('minutes');   // don't cache a 404 for hours
  return null;
}
```

**Why it matters:** the page renders from cache instead of hitting the DB on every request, while
tags + short-miss TTLs keep content fresh.

> ⚠️ **Gotcha:** content cached this way will NOT show new DB rows until the tag is revalidated or
> the TTL expires. After inserting/seeding data, revalidate the tag (see §3) or restart the app.

---

## 3. On-Demand Revalidation Route

Don't make editors wait for a TTL. Expose an authenticated route that purges specific tags:

```ts
// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';

export async function POST(req) {
  // validate an admin key first
  const { tags } = await req.json();
  for (const tag of tags) revalidateTag(tag);
  return Response.json({ revalidated: tags });
}
```

**Why it matters:** instant publish without redeploying or flushing everything. Pair it with the
tags from §2 (`blog`, `content`, `events`, ...).

**How to apply:** gate it behind an admin API key, restrict to a known set of allowed tags, and
call it from your CMS/seed scripts after writes.

---

## 4. Rendering Strategy: SSG, Streaming, and Synchronous SEO

**Pre-render known pages** with `generateStaticParams` so they ship as static HTML:

```ts
// app/(main)/faq/[slug]/page.tsx
export async function generateStaticParams() {
  const slugs = await getAllFaqSlugs();
  return slugs.map(slug => ({ slug }));
}
```

**Stream low-priority UI with `<Suspense>`** so it doesn't block first paint / LCP:

```tsx
<Suspense fallback={null}><TrackingCapture /></Suspense>
<Suspense fallback={<BelowFoldSkeleton/>}><BelowFoldContent/></Suspense>
```

**Keep SEO-critical content synchronous.** Deliberately do NOT wrap primary article/FAQ body
content in a top-level `Suspense` — you want it in the initial HTML chunk so non-JS crawlers see it.
Stream the *peripheral* stuff (analytics, "related" widgets, below-the-fold), not the main content.

**Speculation Rules for instant navigation.** Hint the browser to prerender/prefetch the most
likely next page in the background:

```html
<script type="speculationrules">
{ "prerender": [{ "where": { "href_matches": "/seminars" }, "eagerness": "moderate" }] }
</script>
```

**Why it matters:** static + streamed pages have the best LCP; synchronous main content protects
SEO; speculation rules make the *next* click feel instant.

---

## 5. TanStack Query: Hydrate from Server Data

Fetch on the server, pass it as `initialData`, and mark it fresh so the client doesn't immediately
refetch on first load:

```ts
// hooks/useDataQueries.ts
export function useEvents(serverInitialData?: Event[]) {
  return useQuery({
    queryKey: ['/api/events'],
    initialData: serverInitialData,
    initialDataUpdatedAt: serverInitialData ? Date.now() : undefined,
    staleTime: 1000 * 60 * 5,   // 5 min default
  });
}
```

Global defaults that reduce wasteful refetches:

```ts
// lib/queryClient.ts
new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      staleTime: 1000 * 60 * 5,
      retry: 2,
      retryDelay: (i) => Math.min(1000 * 2 ** i, 8000),
    },
  },
});
```

**Why it matters:** no double-fetch (server render + client mount), no layout shift, fewer
background network calls. Override `staleTime` per hook for slow-changing data (e.g. 1 hour).

---

## 6. Fonts: `next/font/local`

Self-host fonts and pick the `display` strategy per role:

```ts
import localFont from 'next/font/local';

const serif = localFont({ src: '...', display: 'swap' });       // body/headings: show fallback, swap in
const sans  = localFont({ src: '...', display: 'optional' });   // avoid layout shift; skip if slow
const accent = localFont({ src: '...', display: 'optional', preload: false }); // rarely used → don't preload
```

**Why it matters:** local fonts remove a third-party round-trip. `swap` prevents invisible text
(FOIT) for primary fonts; `optional` + `preload: false` avoids layout shift and wasted bytes for
secondary/accent fonts.

---

## 7. Animation: `LazyMotion` (framer-motion)

Keep the animation engine out of the main bundle; load only the feature set you use, and use the
lightweight `m` component instead of `motion`:

```tsx
// providers
import { LazyMotion, domAnimation } from 'framer-motion';
<LazyMotion features={domAnimation} strict>{children}</LazyMotion>

// components — use `m`, not `motion`
import { m } from 'framer-motion';
<m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
```

**Why it matters:** `motion` pulls in the full library; `m` + `LazyMotion` defers it, shrinking the
initial JS payload. `strict` throws if you accidentally import the heavy `motion` component.

**SSR animation gotcha:** never compute an animation's `initial` value by mutating a ref *during
render* — under streaming/Suspense the server can render twice and disagree with the client,
causing a hydration mismatch and a visible flash. Use a mount gate instead:

```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
const initial = mounted ? { opacity: 0 } : false; // no fade on first paint; fade on later transitions
```

---

## 8. Code-Split Client-Only Widgets

Defer components that aren't needed for first paint and have no SEO value:

```ts
import dynamic from 'next/dynamic';
const Toaster = dynamic(() => import('@/components/ui/toaster').then(m => m.Toaster), { ssr: false });
```

Good candidates: toasts, modals/dialogs, charts, rich-text editors, maps, anything below the fold.

**Why it matters:** smaller initial bundle, faster interactivity. `ssr: false` also avoids
shipping server HTML for things only the browser needs.

---

## 9. Preload the LCP / Hero Image

The single biggest LCP lever is the hero image. Two options:

- Simplest: `<Image priority />` on the hero so Next.js emits a high-priority preload.
- Advanced: emit a `Link: rel=preload; as=image; imagesrcset=...; fetchpriority=high` **response
  header** (with `media` queries for mobile vs desktop art) so the download starts before the HTML
  finishes parsing.

```tsx
import Image from 'next/image';
<Image src={heroSrc} alt="" priority sizes="100vw" />
```

**Why it matters:** the hero typically *is* the LCP element; preloading it shaves a large chunk off
LCP. Only preload the *one* above-the-fold hero — preloading everything backfires.

**General image hygiene (provider-agnostic):** always set `sizes`, never ship an image far larger
than its rendered box, and avoid layout shift by giving images explicit dimensions.

---

## 10. Search: Precomputed Index + In-Memory Cache

Don't query many content tables on every keystroke. Build one **search index table** and refresh it
on a schedule / on content change. Combine approaches for quality:

- Trigram match for typo tolerance.
- TSVector full-text for keyword relevance.
- (Optional) vector/embedding search for semantic matches.

Add a tiny **LRU + TTL** cache in front of the hot search route to absorb repeated common queries,
plus basic per-IP rate limiting:

```ts
const CACHE_MAX = 500;
const CACHE_TTL = 60 * 60 * 1000; // 1h
const resultCache = new Map<string, { data: any; ts: number }>();
// on hit within TTL → return cached; on miss → query, then store (evict oldest at CACHE_MAX)
```

**Why it matters:** search becomes a single indexed read instead of N joins, and the in-memory
cache makes popular queries effectively free.

---

## Ordering / Priorities

If you can only do a few things, do them in this order for the biggest wins:

1. **`optimizePackageImports`** + **code-split client-only widgets** — quick, large bundle cuts.
2. **`'use cache'` + tiered TTLs** — removes per-request DB/render cost.
3. **Hydrate TanStack Query from server data** — kills duplicate first-load fetches.
4. **Preload the hero image** — direct LCP improvement.
5. **`LazyMotion` + local fonts** — shave the remaining bundle and font round-trips.

Everything else is incremental polish on top of these.
