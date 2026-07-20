import { SITE_URL } from "@/seo/siteMeta";

export const dynamic = "force-static";

/** llms.txt — plain-text orientation file for AI crawlers (ported verbatim from prerender.mjs). */
export function GET() {
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
  return new Response(llms, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
