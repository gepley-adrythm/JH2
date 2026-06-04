/**
 * prerender.mjs — Static Site Generation step.
 *
 * Runs after `vite build` (client → dist/public) and `vite build --ssr`
 * (server → dist/server/entry-server.js). For every route returned by the SSR
 * bundle's getRoutes(), it renders real HTML + a per-page <head>, injects them
 * into the built index.html template, and writes dist/public/<route>/index.html.
 * It also emits sitemap.xml, robots.txt, and llms.txt.
 */
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const distPublic = join(root, "dist", "public");
const serverEntry = join(root, "dist", "server", "entry-server.js");

const { render, getRoutes, SITE_URL } = await import(serverEntry);

const template = readFileSync(join(distPublic, "index.html"), "utf-8");
const routes = getRoutes();

function writePage(route, html, head) {
  const page = template
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace("<!--app-head-->", () => head)
    .replace("<!--app-html-->", () => html);
  const outDir = route === "/" ? distPublic : join(distPublic, route);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), page, "utf-8");
}

for (const route of routes) {
  const { html, head } = render(route);
  writePage(route, html, head);
}

// sitemap.xml
const locs = routes.map((r) => `${SITE_URL}${r}`);
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  locs.map((u) => `  <url><loc>${u}</loc></url>`).join("\n") +
  `\n</urlset>\n`;
writeFileSync(join(distPublic, "sitemap.xml"), sitemap, "utf-8");

// robots.txt
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
writeFileSync(join(distPublic, "robots.txt"), robots, "utf-8");

// llms.txt — a plain-text orientation file for AI crawlers.
const llms =
  `# Jematell Homes\n\n` +
  `> Family-owned Arizona custom home builder serving Scottsdale, Rio Verde, and the greater Phoenix metro.\n\n` +
  `## Key pages\n` +
  `- [Home](${SITE_URL}/)\n` +
  `- [Custom Homes](${SITE_URL}/custom-homes)\n` +
  `- [Spec Homes](${SITE_URL}/spec-homes)\n` +
  `- [Floor Plans](${SITE_URL}/floor-plans)\n` +
  `- [Gallery](${SITE_URL}/gallery)\n` +
  `- [Where We Build](${SITE_URL}/where-we-build)\n` +
  `- [Blog](${SITE_URL}/blog)\n` +
  `- [Contact](${SITE_URL}/contact)\n\n` +
  `## Sitemap\n- [sitemap.xml](${SITE_URL}/sitemap.xml)\n`;
writeFileSync(join(distPublic, "llms.txt"), llms, "utf-8");

console.log(`Prerendered ${routes.length} routes + sitemap.xml, robots.txt, llms.txt`);
