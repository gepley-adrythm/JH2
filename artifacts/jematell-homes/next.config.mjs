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
  experimental: {
    // Restores the cross-route fade the Vite build had via react-router's
    // `viewTransition` Link prop: with this flag on, the <ViewTransition>
    // boundary in app/layout.tsx opts client navigations into
    // document.startViewTransition, so the ::view-transition-old/new(root)
    // keyframes in src/transitions.css fire again.
    viewTransition: true,
  },
};

export default nextConfig;
