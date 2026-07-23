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
  // Dev-only /api proxy to the api-server (contact form, mortgage rate) —
  // replaces the old Vite dev proxy. Same-namespace localhost in the Replit
  // workflow; production doesn't need it (the api-server serves the site AND
  // mounts /api itself). rewrites are unsupported under output:"export", so
  // this must stay inside the development conditional.
  ...(process.env.NODE_ENV === "development"
    ? {
        async rewrites() {
          return [
            {
              source: "/api/:path*",
              destination: "http://localhost:5000/api/:path*",
            },
          ];
        },
      }
    : {}),
  // NOTE: experimental.viewTransition + a React <ViewTransition> boundary were
  // tried here to restore the old cross-route fade, but the experimental
  // wrapper broke framer-motion's whileInView reveals (sections rendered stuck
  // at their SSR opacity:0). Cross-route fades can return when that React API
  // stabilizes; scroll reveals matter more.
  experimental: {
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
