/**
 * servicePageLinks.ts -- link items for the hand-built service pages
 * (/casitas-and-guest-houses, /rv-garages). Each helper turns corpus
 * records into the LinkItem shape the Interlink component renders, so the
 * cards and accordions on those pages show the FAQ short answers, statute
 * summaries and guide summaries as written in the corpus, never copy typed
 * into the page. Server-only: pulls the FAQ dataset and reference JSON.
 */
import { faqDataset } from "@/data/faq";
import { getReferenceByKey } from "@/data/reference";
import { getGuide } from "@/data/guides";
import { getGlossaryTerm } from "@/data/glossary";
import { blogs } from "@/data/blogs";
import type { LinkItem } from "@/lib/interlink";

/** First sentence, capped, for card blurbs. Accordions show the whole short answer. */
export function lead(text: string, max = 170): string {
  const clean = (text || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const cut = clean.search(/[.!?]\s/);
  const s = cut > 0 ? clean.slice(0, cut + 1) : clean;
  return s.length > max ? s.slice(0, max).replace(/\s+\S*$/, "") + "..." : s;
}

export function faqLinks(slugs: string[], opts: { full?: boolean; meta?: Record<string, string> } = {}): LinkItem[] {
  const out: LinkItem[] = [];
  for (const slug of slugs) {
    const i = faqDataset.getItem(slug);
    if (!i) continue;
    out.push({
      to: `/faq/${i.slug}`,
      label: i.question,
      kind: "faq",
      blurb: opts.full ? i.shortAnswer : lead(i.shortAnswer),
      meta: opts.meta?.[slug],
    });
  }
  return out;
}

export function refLinks(keys: string[]): LinkItem[] {
  const out: LinkItem[] = [];
  for (const key of keys) {
    const r = getReferenceByKey(key);
    if (!r) continue;
    out.push({ to: `/reference-library/${r.module}/${r.slug}`, label: r.title, kind: "reference", blurb: lead(r.shortSummary), meta: "Arizona statute" });
  }
  return out;
}

export function guideLinks(slugs: string[]): LinkItem[] {
  const out: LinkItem[] = [];
  for (const slug of slugs) {
    const g = getGuide(slug);
    if (!g) continue;
    out.push({ to: `/guides/${g.slug}`, label: g.title, kind: "guide", blurb: lead(g.summary) });
  }
  return out;
}

export function termLinks(slugs: string[]): LinkItem[] {
  const out: LinkItem[] = [];
  for (const slug of slugs) {
    const t = getGlossaryTerm(slug);
    if (!t) continue;
    out.push({ to: `/glossary/${t.slug}`, label: t.term, kind: "glossary", blurb: lead(t.shortDefinition) });
  }
  return out;
}

export function blogLinks(slugs: string[]): LinkItem[] {
  const out: LinkItem[] = [];
  for (const slug of slugs) {
    const b = blogs[slug];
    if (!b) continue;
    out.push({ to: `/blog/${slug}`, label: b.title.replace(/\s*[-|]\s*Jematell Homes\s*$/i, ""), kind: "blog", blurb: lead(b.description), meta: "From the journal" });
  }
  return out;
}
