/**
 * detail.ts — small, dependency-free helpers shared by the content detail
 * pages (guides, reference, FAQ, glossary). Everything here is a pure string
 * transform so it runs identically during SSG prerender and in the browser —
 * no DOM, no client-only APIs. The heading anchors it injects end up in the
 * prerendered HTML, so in-page "jump to section" links work without JavaScript.
 */

export interface TocEntry {
  id: string;
  text: string;
  level: number;
}

/** Turn heading text into a URL-safe anchor id (lowercase, dashed). */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&[a-z]+;/g, " ") // decode stray entities to spaces
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 60) || "section";
}

/** Strip HTML tags to plain text (for word counts and TOC labels). */
export function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&[a-z]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Give every <h2>/<h3> in a body-HTML string a stable `id` and return the
 * table of contents built from the <h2> headings (the main sections). If a
 * heading already carries an id we keep it. Slug collisions get -2, -3 suffixes
 * so anchors stay unique on long pages.
 */
export function annotateHeadings(
  html: string,
  opts: { seeAlso?: boolean } = {},
): { html: string; toc: TocEntry[] } {
  // Guides opt out: guideEnrich.ts already resolves their link clusters into richer
  // components, and short link runs are deliberately left as prose there. Other detail
  // pages keep the callout.
  const seeAlso = opts.seeAlso !== false;
  const toc: TocEntry[] = [];
  const used = new Set<string>();

  // Leave the appended "Sources" citations block untouched — its <h2> is not a
  // real content section and must not appear in the table of contents.
  const marker = html.search(/<aside[^>]*data-citations/i);
  const head = marker >= 0 ? html.slice(0, marker) : html;
  const tail = marker >= 0 ? html.slice(marker) : "";

  const out = head.replace(
    /<h([23])((?:\s[^>]*)?)>([\s\S]*?)<\/h\1>/gi,
    (_m, lvl: string, attrs: string, inner: string) => {
      const level = Number(lvl);
      const text = stripTags(inner);

      // Reuse an existing id when the heading already has one.
      const existing = /\sid\s*=\s*["']([^"']+)["']/i.exec(attrs);
      let id = existing ? existing[1] : slugify(text);
      if (!existing) {
        let candidate = id;
        let n = 2;
        while (used.has(candidate)) candidate = `${id}-${n++}`;
        id = candidate;
      }
      used.add(id);

      // A trailing "Sources" heading is reference apparatus, not a real
      // section — keep it out of the table of contents.
      if (level === 2 && text && !/^sources?$/i.test(text)) toc.push({ id, text, level });

      const nextAttrs = existing ? attrs : ` id="${id}"${attrs}`;
      return `<h${lvl}${nextAttrs}>${inner}</h${lvl}>`;
    },
  );

  // Lift link-dense "see also" paragraphs (3+ links that are mostly link text)
  // into a callout so they read as an intentional element, not a spammy inline
  // link dump. Contextual prose that merely cites a link is left alone.
  const enhanced = !seeAlso ? out : out.replace(/<p>([\s\S]*?)<\/p>/gi, (m, inner: string) => {
    const links = (inner.match(/<a\s/gi) || []).length;
    if (links < 3) return m;
    const total = inner.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    const linkText = (inner.match(/<a\b[^>]*>([\s\S]*?)<\/a>/gi) || [])
      .map((a) => a.replace(/<[^>]+>/g, ""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    const ratio = total.length ? linkText.length / total.length : 0;
    return ratio >= 0.5 ? `<p class="dt-seealso">${inner}</p>` : m;
  });

  return { html: wrapTables(enhanced) + tail, toc };
}

/**
 * Put every body table in its own horizontally scrollable box.
 *
 * Without this a wide table forces the whole page to scroll sideways on a phone. A five-column
 * cost table at 375px measured 539px against a 375px client width, which drags the entire
 * layout with it. Scoping the scroll to the table keeps the page still.
 *
 * The wrapper is focusable and labelled because a scrollable region that only responds to a
 * mouse is unreachable by keyboard, which is an accessibility failure in its own right.
 */
export function wrapTables(html: string): string {
  return html.replace(/<table(?![^>]*\bdata-nowrap\b)([\s\S]*?)<\/table>/gi, (m) =>
    `<div class="dt-tablewrap" tabindex="0" role="region" aria-label="Table, scroll to see more">${m}</div>`,
  );
}

/**
 * Clean a guide body for the long-read layout: drop a leading heading that just
 * repeats the guide title (8 of the pillar guides open this way) and the "What
 * this guide covers" overview list, which the sticky table of contents now
 * replaces. Runs before annotateHeadings so neither pollutes the TOC.
 */
export function prepareGuideBody(html: string, title: string): string {
  const norm = (s: string) => stripTags(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  let out = html.replace(
    /^\s*<h([1-3])[^>]*>([\s\S]*?)<\/h\1>/i,
    (m, _lvl, inner) => (norm(inner) === norm(title) ? "" : m),
  );
  out = out.replace(
    /<h[1-3][^>]*>\s*what this guide covers\s*<\/h[1-3]>\s*(?:<(ul|ol)[^>]*>[\s\S]*?<\/\1>)?/i,
    "",
  );
  return out.replace(/^\s+/, "");
}

/** Estimated read time in whole minutes (≈200 wpm, floor of 1). */
export function readingTime(html: string): number {
  const words = stripTags(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * "Month D, YYYY" from an ISO-ish date string; passthrough on parse failure.
 *
 * timeZone is pinned to UTC on purpose. A date-only string like "2026-07-23"
 * parses as UTC midnight, so formatting it in the machine's local zone renders
 * the PREVIOUS day anywhere west of Greenwich: the repl (UTC) built "July 23"
 * while a Phoenix laptop (UTC-7) built "July 22" from the same content. That
 * made the build non-reproducible and, worse, made the visible "Updated" date
 * disagree with the dateModified we emit in JSON-LD. Pinning to UTC keeps the
 * rendered date identical to the stored ISO date on every machine.
 */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
