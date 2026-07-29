/**
 * Guide body enrichment — turn link dumps into things worth reading.
 *
 * The old behaviour (detail.ts) took any link-dense paragraph and wrapped it in a single
 * `.dt-seealso` callout labelled "Related on this site". One guide ended up with 22 identical
 * grey boxes. Repetitive, and worse, each box was only a list of link text: the reader had to
 * click to learn anything.
 *
 * Every one of those links points at a page whose summary we already have in memory — an FAQ's
 * shortAnswer, a glossary term's shortDefinition, a reference page's shortSummary. So the fix is
 * not a nicer box. It is to RESOLVE the links and render their substance inline, in a form that
 * suits the kind of thing being linked:
 *
 *   faq   -> accordion of questions, each with a teaser and a link to the full answer
 *   term  -> definition cards
 *   ref   -> a table of code/statute pages and what each covers
 *   guide -> a next-steps strip
 *   mixed -> a grouped panel that keeps each kind in its own lane
 *
 * Two rules keep it from becoming a new kind of monotony:
 *
 *  1. **Short runs stay prose.** A three-link sentence is a sentence, not a widget. 23 of the 62
 *     candidate blocks are exactly that, so leaving them inline removes a third of the clutter
 *     before any styling happens. Reducing the count IS the quality fix.
 *  2. **Consecutive blocks of the same kind alternate presentation**, so a guide with several FAQ
 *     clusters does not show the same accordion five times.
 *
 * Output is plain HTML with zero client JS — accordions are native <details>, matching the
 * interlink engine's approach.
 */

export interface EnrichCtx {
  faq: (slug: string) => { question: string; shortAnswer?: string } | undefined;
  term: (slug: string) => { term: string; shortDefinition?: string } | undefined;
  ref: (key: string) => { title: string; shortSummary?: string } | undefined;
  guide: (slug: string) => { title: string; summary?: string } | undefined;
}

type Kind = "faq" | "term" | "ref" | "guide" | "other";
interface LinkRef {
  href: string;
  text: string;
  kind: Kind;
}

const esc = (s: string) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function kindOf(href: string): Kind {
  if (href.startsWith("/faq/")) return "faq";
  if (href.startsWith("/glossary/")) return "term";
  if (href.startsWith("/reference-library/")) return "ref";
  if (href.startsWith("/guides/")) return "guide";
  return "other";
}

/**
 * A teaser, not a copy. The FAQ detail page renders shortAnswer verbatim, so reproducing all of
 * it here would duplicate that page's opening block. Take whole sentences up to a budget instead.
 */
function teaser(text: string | undefined, budget = 165): string {
  if (!text) return "";
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= budget) return clean;

  // Split on sentence ends only when the next token starts a new sentence. Without the
  // lookahead, "A.R.S. 45-454 defines..." splits after "A.R.S." and the teaser becomes the
  // abbreviation alone. Single capitals (initials) are re-joined below.
  const parts = clean.split(/(?<=[.!?])\s+(?=[A-Z])/);
  const sentences: string[] = [];
  for (const p of parts) {
    const prev = sentences[sentences.length - 1];
    // an abbreviation-ish fragment is glued back onto its neighbour rather than standing alone
    if (prev && (/\b[A-Z](\.[A-Z])*\.$/.test(prev) || prev.length < 20)) {
      sentences[sentences.length - 1] = `${prev} ${p}`;
    } else {
      sentences.push(p);
    }
  }

  let out = "";
  for (const s of sentences) {
    if (out && (out + " " + s).length > budget) break;
    out = out ? `${out} ${s}` : s;
    if (out.length >= budget) break;
  }

  // A single sentence longer than the budget still has to be cut, on a word boundary.
  if (!out || out.length > budget) {
    out = (out || clean).slice(0, budget).replace(/[\s,;:]+\S*$/, "");
  }
  return out.length < clean.length && !/[.!?]$/.test(out) ? `${out}…` : out;
}

const slugOf = (href: string) => href.split("?")[0].split("#")[0].replace(/\/$/, "").split("/").pop() || "";
const refKey = (href: string) => href.replace(/^\/reference-library\//, "").replace(/\/$/, "");

/* ---------------------------------------------------------------- renderers */

function renderQaAccordion(links: LinkRef[], ctx: EnrichCtx, heading: string): string {
  const items = links
    .map((l) => {
      const item = ctx.faq(slugOf(l.href));
      if (!item) return "";
      const t = teaser(item.shortAnswer);
      return (
        `<details class="ge-qa-item"><summary>${esc(item.question)}</summary>` +
        `<div class="ge-qa-body">${t ? `<p>${esc(t)}</p>` : ""}` +
        `<a class="ge-qa-more" href="${esc(l.href)}">Read the full answer</a></div></details>`
      );
    })
    .filter(Boolean)
    .join("");
  if (!items) return "";
  return `<div class="ge-block ge-qa"><p class="ge-label">${esc(heading)}</p>${items}</div>`;
}

function renderQaList(links: LinkRef[], ctx: EnrichCtx, heading: string): string {
  const items = links
    .map((l) => {
      const item = ctx.faq(slugOf(l.href));
      if (!item) return "";
      const t = teaser(item.shortAnswer, 120);
      return (
        `<li class="ge-qlist-item"><a href="${esc(l.href)}">${esc(item.question)}</a>` +
        (t ? `<span class="ge-qlist-teaser">${esc(t)}</span>` : "") +
        `</li>`
      );
    })
    .filter(Boolean)
    .join("");
  if (!items) return "";
  return `<div class="ge-block ge-qlist"><p class="ge-label">${esc(heading)}</p><ul>${items}</ul></div>`;
}

function renderTermCards(links: LinkRef[], ctx: EnrichCtx): string {
  const cards = links
    .map((l) => {
      const t = ctx.term(slugOf(l.href));
      if (!t) return "";
      return (
        `<a class="ge-termcard" href="${esc(l.href)}">` +
        `<span class="ge-termcard-name">${esc(t.term)}</span>` +
        `<span class="ge-termcard-def">${esc(teaser(t.shortDefinition, 130))}</span></a>`
      );
    })
    .filter(Boolean)
    .join("");
  if (!cards) return "";
  return `<div class="ge-block ge-terms"><p class="ge-label">Terms in this section</p><div class="ge-termgrid">${cards}</div></div>`;
}

function renderRefTable(links: LinkRef[], ctx: EnrichCtx): string {
  const rows = links
    .map((l) => {
      const r = ctx.ref(refKey(l.href));
      if (!r) return "";
      return (
        `<tr><th scope="row"><a href="${esc(l.href)}">${esc(r.title)}</a></th>` +
        `<td>${esc(teaser(r.shortSummary, 150))}</td></tr>`
      );
    })
    .filter(Boolean)
    .join("");
  if (!rows) return "";
  return (
    `<div class="ge-block ge-ref"><p class="ge-label">In the reference library</p>` +
    `<table class="ge-reftable"><tbody>${rows}</tbody></table></div>`
  );
}

function renderGuidePaths(links: LinkRef[], ctx: EnrichCtx): string {
  const cards = links
    .map((l) => {
      const g = ctx.guide(slugOf(l.href));
      if (!g) return "";
      return (
        `<a class="ge-path" href="${esc(l.href)}">` +
        `<span class="ge-path-title">${esc(g.title)}</span>` +
        `<span class="ge-path-sum">${esc(teaser(g.summary, 110))}</span></a>`
      );
    })
    .filter(Boolean)
    .join("");
  if (!cards) return "";
  return `<div class="ge-block ge-paths"><p class="ge-label">Continue with</p><div class="ge-pathgrid">${cards}</div></div>`;
}

/** Mixed clusters: keep each kind in its own lane rather than one undifferentiated list. */
function renderMixed(groups: Map<Kind, LinkRef[]>, ctx: EnrichCtx, variant: number): string {
  const parts: string[] = [];
  const faqs = groups.get("faq") ?? [];
  const terms = groups.get("term") ?? [];
  const refs = groups.get("ref") ?? [];
  const gds = groups.get("guide") ?? [];

  if (faqs.length) {
    parts.push(
      variant % 2 === 0
        ? renderQaAccordion(faqs, ctx, "Questions this raises")
        : renderQaList(faqs, ctx, "Questions this raises"),
    );
  }
  if (terms.length) parts.push(renderTermCards(terms, ctx));
  if (refs.length) parts.push(renderRefTable(refs, ctx));
  if (gds.length) parts.push(renderGuidePaths(gds, ctx));

  const body = parts.filter(Boolean).join("");
  return body ? `<div class="ge-cluster">${body}</div>` : "";
}

/* -------------------------------------------------------------------- main */

export function enrichGuideBody(html: string, ctx: EnrichCtx): string {
  // per-kind counters drive presentation variation within a single guide
  const seen: Record<string, number> = { faq: 0, mixed: 0 };

  return html.replace(/<p>([\s\S]*?)<\/p>/gi, (whole, inner: string) => {
    const anchors = [...inner.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
    if (anchors.length < 4) return whole; // 3-link sentences stay prose, deliberately

    const plain = inner.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    const linkText = anchors.map((a) => a[2].replace(/<[^>]+>/g, "")).join(" ").replace(/\s+/g, " ").trim();
    // still require the paragraph to be mostly link text; real prose that cites sources is left alone
    if (!plain.length || linkText.length / plain.length < 0.5) return whole;

    const links: LinkRef[] = anchors.map((a) => ({
      href: a[1],
      text: a[2].replace(/<[^>]+>/g, "").trim(),
      kind: kindOf(a[1]),
    }));
    if (links.some((l) => l.kind === "other")) return whole; // external/unknown: leave as written

    const groups = new Map<Kind, LinkRef[]>();
    for (const l of links) groups.set(l.kind, [...(groups.get(l.kind) ?? []), l]);

    let out = "";
    if (groups.size === 1) {
      const [kind, list] = [...groups.entries()][0];
      if (kind === "faq") {
        out = seen.faq++ % 2 === 0
          ? renderQaAccordion(list, ctx, "Questions this raises")
          : renderQaList(list, ctx, "Common questions");
      } else if (kind === "term") out = renderTermCards(list, ctx);
      else if (kind === "ref") out = renderRefTable(list, ctx);
      else if (kind === "guide") out = renderGuidePaths(list, ctx);
    } else {
      out = renderMixed(groups, ctx, seen.mixed++);
    }

    // If nothing resolved (stale slug, missing entry) keep the original paragraph rather than
    // silently deleting content.
    return out || whole;
  });
}
