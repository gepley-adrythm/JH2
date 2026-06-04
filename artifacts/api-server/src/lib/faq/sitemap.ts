import type { Dataset } from "./dataset";
import { escapeHtml } from "./html";

// Build /sitemap-faq.xml covering the FAQ hub, every active FAQ detail page,
// and every topic page.
export function renderFaqSitemap(dataset: Dataset, baseUrl: string): string {
  const urls: { loc: string; lastmod?: string }[] = [];
  urls.push({ loc: `${baseUrl}/faq` });
  for (const t of dataset.topics()) {
    urls.push({ loc: `${baseUrl}/faq/topics/${t.slug}` });
  }
  for (const item of dataset.all()) {
    urls.push({
      loc: `${baseUrl}/faq/${item.slug}`,
      lastmod: item.updatedDate.slice(0, 10),
    });
  }

  const body = urls
    .map((u) => {
      const lastmod = u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : "";
      return `  <url><loc>${escapeHtml(u.loc)}</loc>${lastmod}</url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`;
}
