import * as cheerio from "cheerio";
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "fs";
import { join, basename } from "path";

function extractPage(html, sourceUrl) {
  const $ = cheerio.load(html);

  const title =
    $('meta[property="og:title"]').attr("content") ||
    $("title").text().trim();
  const description =
    $('meta[name="description"]').attr("content") ||
    $('meta[property="og:description"]').attr("content") ||
    "";
  const ogImage = $('meta[property="og:image"]').attr("content") || "";

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
      if (/^(gallery|custom homes|spec homes|floor plans|where we build|about us|contact|home|start your build)$/i.test(text)) return;
      const key = tag + ":" + text;
      if (seen.has(key)) return;
      seen.add(key);
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
