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
export function annotateHeadings(html: string): { html: string; toc: TocEntry[] } {
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

  return { html: out + tail, toc };
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

/** "Month D, YYYY" from an ISO-ish date string; passthrough on parse failure. */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
