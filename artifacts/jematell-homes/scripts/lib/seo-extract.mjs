/**
 * seo-extract.mjs — the single definition of "the SEO surface of a page".
 *
 * Shared by seo-snapshot.mjs (built HTML in out/, before publish) and
 * seo-verify-live.mjs (the deployed site, after publish) so both answer the
 * same question with the same rules.
 *
 * Deliberately excluded, because perf work is SUPPOSED to change these:
 *   preload/prefetch hints, stylesheet and script URLs, class attributes,
 *   inline <style> blocks, srcset/sizes/width/height on <img>.
 * Included from images: the src BASENAME (with any responsive width suffix
 * stripped) and the alt text. A resolution ladder may change which file the
 * browser picks; it must never change which image the page is about.
 */
import { basename } from "node:path";
import { createHash } from "node:crypto";
import * as cheerio from "cheerio";

export const sha = (s) => createHash("sha256").update(s).digest("hex").slice(0, 16);
export const norm = (s) => (s ?? "").replace(/\s+/g, " ").trim();

/**
 * JSON-LD is emitted by a serializer, so key order is not guaranteed stable
 * across builds. Sort every object key recursively before hashing so a mere
 * reordering is not reported as a content change.
 */
export function stableSort(v) {
  if (Array.isArray(v)) return v.map(stableSort);
  if (v && typeof v === "object") {
    return Object.fromEntries(
      Object.keys(v)
        .sort()
        .map((k) => [k, stableSort(v[k])]),
    );
  }
  return v;
}

export function extract(html) {
  const $ = cheerio.load(html);
  const metaByName = (n) => norm($(`meta[name="${n}"]`).attr("content"));

  const og = {};
  $('meta[property^="og:"]').each((_, el) => {
    og[$(el).attr("property")] = norm($(el).attr("content"));
  });
  const twitter = {};
  $('meta[name^="twitter:"]').each((_, el) => {
    twitter[$(el).attr("name")] = norm($(el).attr("content"));
  });

  const jsonldTypes = [];
  const jsonldBlocks = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    const raw = $(el).text();
    try {
      const parsed = JSON.parse(raw);
      jsonldBlocks.push(JSON.stringify(stableSort(parsed)));
      for (const node of Array.isArray(parsed) ? parsed : [parsed]) {
        if (node && node["@type"]) jsonldTypes.push(String(node["@type"]));
        for (const g of node?.["@graph"] ?? []) {
          if (g?.["@type"]) jsonldTypes.push(String(g["@type"]));
        }
      }
    } catch {
      // Unparseable JSON-LD is itself a regression worth catching.
      jsonldBlocks.push("PARSE_ERROR:" + sha(raw));
      jsonldTypes.push("PARSE_ERROR");
    }
  });

  const headings = [];
  $("h1,h2,h3").each((_, el) => {
    headings.push(el.tagName.toLowerCase() + ":" + norm($(el).text()));
  });

  // Internal link graph: hrefs only, normalized, deduped, sorted. Losing or
  // gaining internal links is a real SEO change even when nothing visible moves.
  const links = new Set();
  $("a[href]").each((_, el) => {
    const href = ($(el).attr("href") || "").trim();
    if (!href || href.startsWith("#") || /^(mailto:|tel:|javascript:)/i.test(href)) return;
    links.add(href.replace(/\/$/, "") || "/");
  });
  const internal = [...links].filter((h) => h.startsWith("/")).sort();
  const external = [...links].filter((h) => !h.startsWith("/")).sort();

  const images = [];
  let missingAlt = 0;
  $("img").each((_, el) => {
    const src = $(el).attr("src") || "";
    if ($(el).attr("alt") === undefined) missingAlt++;
    const base = basename(src.split("?")[0]).replace(/-\d{2,4}(?=\.[a-z0-9]+$)/i, "");
    images.push(`${base}|${norm($(el).attr("alt"))}`);
  });

  // Visible text: strip script/style, collapse whitespace. Catches any content
  // that silently disappears during a refactor.
  const $body = cheerio.load(html);
  $body("script,style,noscript,template").remove();
  const text = norm($body("body").text());

  return {
    title: norm($("title").first().text()),
    description: metaByName("description"),
    canonical: norm($('link[rel="canonical"]').attr("href")),
    robots: metaByName("robots"),
    lang: norm($("html").attr("lang")),
    viewport: metaByName("viewport"),
    h1: $("h1")
      .map((_, el) => norm($(el).text()))
      .get(),
    headingCount: headings.length,
    headingHash: sha(headings.join("\n")),
    og,
    twitter,
    jsonldTypes: jsonldTypes.sort(),
    jsonldHash: sha(jsonldBlocks.sort().join("\n")),
    internalLinkCount: internal.length,
    internalLinkHash: sha(internal.join("\n")),
    externalLinks: external,
    imageCount: images.length,
    imageHash: sha(images.join("\n")),
    missingAlt,
    wordCount: text ? text.split(" ").length : 0,
    textHash: sha(text),
    alternates: $('link[rel="alternate"]')
      .map((_, el) => `${$(el).attr("hreflang") || ""}|${$(el).attr("href") || ""}`)
      .get()
      .sort(),
  };
}
