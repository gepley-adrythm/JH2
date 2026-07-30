/**
 * siteChrome.ts — borrow the real site's head, header and footer from the
 * static export.
 *
 * The api-server renders /financing/estimate itself, because that URL takes
 * arbitrary query parameters and a static export can only prerender a known
 * list of pages. It used to ship a small hand-written stylesheet that
 * approximated the brand, which is why it looked like a lesser page next to the
 * prerendered scenario pages: 6.6KB of approximation against the site's real
 * 155KB design system.
 *
 * Rather than maintain a second design system, this reads one exported page and
 * lifts what it needs: the <html> class (which carries the next/font CSS
 * variables — without it the typography silently falls back), the stylesheet and
 * font preload links, and the header and footer markup. The estimate page then
 * uses the same class names as the scenario pages and inherits the real design.
 *
 * Deliberately NOT lifted: <script> tags. There is no React tree here to
 * hydrate, so the chrome is inert markup. Nav links work; the mobile nav toggle
 * does not, which is an acceptable trade for a page reached by a shared link.
 *
 * Cached against the source file's mtime so a rebuild is picked up without a
 * restart — otherwise a dev rebuild would leave this pointing at CSS hashes that
 * no longer exist.
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { staticSiteDir } from "../middlewares/staticSite";

export interface SiteChrome {
  /** Class list from <html>, carrying the font variables. */
  htmlClass: string;
  /**
   * Stylesheet + font preload tags, in document order.
   *
   * Correct in production, where this same process serves the export and the
   * hashed URLs resolve. NOT correct under `next dev`, which proxies this page
   * and serves its own differently-hashed chunks, so those URLs 404 there —
   * hence inlineCss below.
   */
  headLinks: string;
  /** The stylesheet contents, for environments where the hashed URLs do not resolve. */
  inlineCss: string;
  /** The site header markup, scripts stripped. */
  header: string;
  /** The site footer markup, scripts stripped. */
  footer: string;
}

/** The page we harvest from: always exported, and it carries the full chrome. */
const SOURCE_PAGE = "financing.html";

const EMPTY: SiteChrome = { htmlClass: "", headLinks: "", inlineCss: "", header: "", footer: "" };

let cache: { mtimeMs: number; chrome: SiteChrome } | null = null;

function block(html: string, tag: "header" | "footer"): string {
  const open = html.indexOf(`<${tag}`);
  const close = html.indexOf(`</${tag}>`);
  if (open === -1 || close === -1 || close < open) return "";
  // Strip any script tags; nothing here is meant to execute.
  return html.slice(open, close + tag.length + 3).replace(/<script[\s\S]*?<\/script>/g, "");
}

export function siteChrome(): SiteChrome {
  const file = join(staticSiteDir(), SOURCE_PAGE);
  if (!existsSync(file)) return EMPTY;

  try {
    const { mtimeMs } = statSync(file);
    if (cache && cache.mtimeMs === mtimeMs) return cache.chrome;

    const html = readFileSync(file, "utf8");
    const head = html.slice(0, html.indexOf("</head>"));

    const htmlClass = (html.match(/<html[^>]*\sclass="([^"]*)"/) || [])[1] ?? "";
    // Stylesheets and font preloads only. Skipping the page-specific image
    // preload keeps us from prefetching the financing hero on every estimate.
    const headLinks = (head.match(/<link[^>]*>/g) ?? [])
      .filter((tag) => /rel="stylesheet"/.test(tag) || (/rel="preload"/.test(tag) && /as="font"/.test(tag)))
      .join("\n");

    // Read the stylesheets themselves so the page can be styled even when the
    // hashed URLs are not resolvable from the origin serving it.
    const cssHrefs = (head.match(/<link[^>]*rel="stylesheet"[^>]*>/g) ?? [])
      .map((tag) => (tag.match(/href="([^"]+)"/) || [])[1])
      .filter((href): href is string => typeof href === "string" && href.startsWith("/"));

    // Fall back to the harvested page's own <style> blocks when it has no
    // stylesheet links.
    //
    // Next's experimental.inlineCss emits the CSS as <style> and NO
    // <link rel="stylesheet"> at all. That silently broke this page: the
    // harvest found zero stylesheets, so inlineCss came back empty AND
    // headLinks carried only font preloads, and every shared estimate link
    // rendered completely unstyled. Reading the <style> blocks makes the
    // estimate page correct under either setting, so toggling inlineCss can
    // never take it out again.
    const inlineCss = cssHrefs.length
      ? cssHrefs
          .map((href) => {
            const cssFile = join(staticSiteDir(), href.replace(/^\//, ""));
            return existsSync(cssFile) ? readFileSync(cssFile, "utf8") : "";
          })
          .join("\n")
      : (head.match(/<style[^>]*>[\s\S]*?<\/style>/g) ?? [])
          .map((tag) => tag.replace(/^<style[^>]*>/, "").replace(/<\/style>$/, ""))
          .join("\n");

    const chrome: SiteChrome = {
      htmlClass,
      headLinks,
      inlineCss,
      header: block(html, "header"),
      footer: block(html, "footer"),
    };
    cache = { mtimeMs, chrome };
    return chrome;
  } catch {
    // A missing or unreadable export must not take the endpoint down; the page
    // still renders, just without the site chrome.
    return EMPTY;
  }
}
