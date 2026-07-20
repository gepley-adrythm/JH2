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
  output: "export",
  trailingSlash: false,
  images: { unoptimized: true },
  outputFileTracingRoot: path.join(import.meta.dirname, "..", ".."),
};

export default nextConfig;
