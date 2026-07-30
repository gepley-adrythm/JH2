import path from "node:path";

/**
 * Static-export Next config. The site remains fully prerendered (no Node
 * runtime for pages) and is served by the api-server artifact, which also
 * mounts /api — same deployment shape as the Vite SSG build it replaces.
 *
 * trailingSlash stays false so every canonical URL is byte-identical to the
 * old site (/faq/foo, not /faq/foo/). The export therefore writes faq/foo.html
 * and the serving layer resolves extensionless paths to .html files.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow HMR/dev resources through Replit's proxied preview domains. Without
  // this, Next's dev-mode cross-origin protection silently rejects the RSC
  // hydration requests: the page renders but never hydrates (zero React
  // fibers), so every whileInView reveal stays at its SSR opacity:0. Dev-only
  // key, ignored by production builds.
  allowedDevOrigins: ["*.picard.replit.dev", "*.replit.dev"],
  // Static export for builds. Under `next dev` output is unset: export mode
  // would reject the dev-only /__dev/gallery-order route handler (dynamic GET
  // + POST), and dev runs a real server anyway. `next build` always runs with
  // NODE_ENV=production, so the deployed artifact is still the pure export.
  ...(process.env.NODE_ENV === "development" ? {} : { output: "export" }),
  trailingSlash: false,
  images: { unoptimized: true },
  outputFileTracingRoot: path.join(import.meta.dirname, "..", ".."),
  // Dev-only route handlers use the extra ".dev.ts" page extension, so files
  // like app/%5F_dev/gallery-order/route.dev.ts (the %5F folder prefix encodes
  // the leading underscore of the /__dev URL segment, which a bare _ folder
  // would make private) exist ONLY under `next dev`. Production `next build`
  // ignores them; POST handlers are not allowed in output:"export" builds, and
  // this endpoint must never ship anyway.
  ...(process.env.NODE_ENV === "development"
    ? { pageExtensions: ["tsx", "ts", "jsx", "js", "dev.tsx", "dev.ts"] }
    : {}),
  // Dev-only proxy to the api-server — replaces the old Vite dev proxy. Same-
  // namespace localhost in the Replit workflow; production doesn't need it (the
  // api-server serves the site AND mounts these itself). rewrites are
  // unsupported under output:"export", so this must stay inside the development
  // conditional.
  //
  // Everything the api-server owns in production is proxied here, so a path
  // behaves the same in both places. Without the /financing/estimate entry, the
  // calculator's "Copy link to this estimate" button produced a link that 404s
  // in dev and works in production, which is a confusing thing to hand a
  // reviewer. Note the estimate route is the EXACT path only: the prerendered
  // scenario pages at /financing/estimate/<slug> are real Next pages and must
  // keep being served by Next.
  //
  // The api-server's port comes from its PORT env var, and the two ways it gets
  // started in this workspace disagree: the "api server" workflow in .replit
  // passes PORT=5000, while the Replit-managed run uses 8081 (the port .replit
  // maps to external 80). Pointing at the wrong one turns every proxied path
  // into a 500, so the origin is overridable and defaults to the port actually
  // in use. Set API_DEV_ORIGIN if you start the api-server somewhere else.
  ...(process.env.NODE_ENV === "development"
    ? {
        async rewrites() {
          const api = process.env.API_DEV_ORIGIN ?? "http://localhost:8081";
          return [
            { source: "/api/:path*", destination: `${api}/api/:path*` },
            { source: "/financing/estimate", destination: `${api}/financing/estimate` },
            { source: "/mcp", destination: `${api}/mcp` },
            { source: "/openapi.json", destination: `${api}/openapi.json` },
            { source: "/.well-known/:path*", destination: `${api}/.well-known/:path*` },
          ];
        },
      }
    : {}),
  // React Compiler was TRIED here (2026-07-29) and removed on evidence: its
  // memoization instrumentation added +2.5-7KB gzip per route (pushing
  // /custom-homes over the 200KB audit budget) to speed up re-renders this
  // hydrate-once static site barely does. TBT already scores 0.95-1.0; the
  // added bytes sit in the critical graph that prices LCP, the metric that
  // actually needs help. Don't re-enable without re-measuring both sides.
  // NOTE: experimental.viewTransition + a React <ViewTransition> boundary were
  // tried here to restore the old cross-route fade, but the experimental
  // wrapper broke framer-motion's whileInView reveals (sections rendered stuck
  // at their SSR opacity:0). Cross-route fades can return when that React API
  // stabilizes; scroll reveals matter more.
  experimental: {
    // inlineCss was ON here until 2026-07-30, to remove two render-blocking
    // stylesheet requests from the critical path. Measured, it was costing far
    // more than it saved, because Next does not only move the CSS into a
    // <style> tag — it ALSO serializes the same CSS text into the RSC flight
    // payload, so every page shipped the stylesheet twice:
    //
    //   index.html 496KB  =  38KB of actual content
    //                     + 147KB inline <style>
    //                     + 309KB inline flight payload (~127KB of it the SAME
    //                       CSS again, as inline <script> the main thread must
    //                       parse and execute before anything else)
    //
    // With it off, index.html is 56KB and the flight payload is 15KB. Two
    // Lighthouse runs each, same machine, back to back, mobile + throttled:
    //
    //             TBT          LCP     TTI      score
    //   ON    183 / 346ms    8.9s    9.4s    0.60-0.65
    //   OFF    15 /  49ms    7.5s    8.0s    0.68-0.74
    //
    // TBT is 30% of the performance score, and ON's 183-346ms spread is exactly
    // the swing that made live scores oscillate between 76 and 93. The cost is
    // real but small: +2.3KB and one extra request on a cold first load
    // (10.3KB HTML + 23.3KB CSS brotli, vs 31.3KB HTML). That CSS is hashed and
    // immutable, so it is fetched once and then reused across all 1,011 pages,
    // while inlining re-sent it with every single navigation. The two
    // stylesheets are discovered by the preload scanner at the same instant as
    // the fonts, hero and JS and resolve in one overlapped round trip;
    // audit.mjs's render-blocking budget is 3 and this uses 2.
    //
    // Do not re-enable without re-running that A/B.
    inlineCss: false,
    // Persist the Turbopack compilation graph to disk so server restarts and
    // revisited routes skip recompilation entirely. Dev-only; production builds
    // are unaffected.
    turbopackFileSystemCacheForDev: true,
    // Pin static generation to a single worker in production builds. The
    // deployment build machine intermittently crashed parallel SSG workers
    // with "Cannot read properties of null (reading 'useEffect'/'useContext')"
    // on a different random page each attempt; one worker removes that
    // failure mode at the cost of a slower (but reliable) publish build.
    // Applied unconditionally: the deployment build env sets a non-production
    // NODE_ENV, which silently disabled the previous env-gated version of this
    // fix (build log showed "3 workers" despite it). Retry knob is defense in
    // depth against the nondeterministic per-page worker crash.
    cpus: 1,
    staticGenerationRetryCount: 3,
  },
};

export default nextConfig;
