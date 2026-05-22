import * as cheerio from "cheerio";
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "fs";
import { join, basename } from "path";

function extractPage(html, sourceUrl) {
  const $ = cheerio.load(html);

  let title =
    $('meta[property="og:title"]').attr("content") ||
    $("title").text().trim();
  // Strip Squarespace SEO suffixes: " | ...", " — ...", " - ..."
  title = title
    .replace(/\s*[—–-]\s*Jematell Homes\s*$/i, "")
    .replace(/\s*\|.*$/, "")
    .replace(/\s*[—–]\s*(Contact Us|Learn More|Explore|Home Warranty|Privacy Options).*$/i, "")
    .trim();
  const description =
    $('meta[name="description"]').attr("content") ||
    $('meta[property="og:description"]').attr("content") ||
    "";
  let ogImage = $('meta[property="og:image"]').attr("content") || "";
  // Skip generic site logo / profile photo / brand-asset OG fallback so the hero can use a real photo.
  const isBrandAsset = (u) => /profile\+?photo|logo|favicon|jematell[\s+_-]?homes|brand|icon/i.test(u);
  if (isBrandAsset(ogImage)) ogImage = "";
  // If no usable OG image, pick the first non-logo content image as the hero
  if (!ogImage) {
    $("img").each((_, el) => {
      if (ogImage) return;
      const src = $(el).attr("data-src") || $(el).attr("src") || "";
      if (!src || src.startsWith("data:")) return;
      if (isBrandAsset(src)) return;
      if (!/squarespace-cdn\.com/.test(src)) return;
      ogImage = src;
    });
  }

  // Squarespace content lives in #page or main
  const root = $("#page").length ? $("#page") : $("main").length ? $("main") : $("body");

  // Remove scripts/styles/headers/footers
  root.find("script, style, noscript, nav, header, footer, .Header, .Footer, .sqs-announcement-bar-dropzone").remove();

  // Extract structured blocks in document order
  const blocks = [];
  const seen = new Set();
  root.find("h1, h2, h3, h4, p, blockquote, li, img").each((_, el) => {
    const $el = $(el);
    const tag = el.tagName.toLowerCase();
    if (tag === "img") {
      const src = $el.attr("data-src") || $el.attr("src") || "";
      const alt = ($el.attr("alt") || "").trim();
      if (!src || src.startsWith("data:")) return;
      // Squarespace logos / icons skip
      if (/squarespace-cdn\.com|jematellhomes\.com|squarespace\.com/.test(src)) {
        if (seen.has(src)) return;
        seen.add(src);
        blocks.push({ type: "img", src, alt });
      }
    } else {
      const text = $el.text().trim().replace(/\s+/g, " ");
      if (!text || text.length < 2) return;
      // Skip nav/footer remnants
      if (/^(gallery|custom homes|spec homes|floor plans|where we build|about us|contact|home|start your build|menu|close)$/i.test(text)) return;
      // Skip if a parent already contributed this text (Squarespace duplicates text in nested wrappers).
      const textKey = "text:" + text;
      if (seen.has(textKey)) return;
      seen.add(textKey);
      blocks.push({ type: tag, text });
    }
  });

  return { sourceUrl, title, description, ogImage, blocks };
}

function processDir(inDir, outFile) {
  const files = readdirSync(inDir).filter((f) => f.endsWith(".html"));
  const result = {};
  for (const f of files) {
    const slug = basename(f, ".html");
    const html = readFileSync(join(inDir, f), "utf8");
    try {
      const url = `https://jematellhomes.com/${inDir.includes("blogs") ? "blog-articles/" : ""}${slug === "home" ? "" : slug}`;
      result[slug] = extractPage(html, url);
    } catch (e) {
      console.error("Failed", f, e.message);
    }
  }
  writeFileSync(outFile, JSON.stringify(result, null, 2));
  console.log(`Wrote ${outFile}: ${Object.keys(result).length} entries`);
}

mkdirSync("clone-data/extracted", { recursive: true });
processDir("clone-data/pages", "clone-data/extracted/pages.json");
processDir("clone-data/blogs", "clone-data/extracted/blogs.json");
