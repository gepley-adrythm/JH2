/**
 * glossary.ts — the web app's entry point to glossary content. Terms are
 * authored as markdown in the content repo and converted to glossary.json
 * (term + rich definition HTML + sources + related terms). Pure data, so it
 * works identically during SSG and in the browser.
 */
import glossaryJson from "./glossary.json";

export interface GlossarySource {
  title: string;
  url: string;
}
export interface GlossaryTerm {
  slug: string;
  term: string;
  shortDefinition: string;
  definitionHtml: string;
  metaDescription: string;
  category: string;
  relatedTerms: string[];
  relatedFaqs: string[];
  sources: GlossarySource[];
  updatedDate: string;
}

export const glossaryTerms = glossaryJson as unknown as GlossaryTerm[];

const bySlug = new Map(glossaryTerms.map((t) => [t.slug, t]));
export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return bySlug.get(slug);
}

/** The starting letter used to bucket a term in the A–Z index. */
export function termLetter(term: string): string {
  const c = term.trim()[0]?.toUpperCase() ?? "#";
  return /[A-Z]/.test(c) ? c : "#";
}

/** Terms grouped into A–Z sections, each already sorted by term. */
export function glossaryByLetter(): { letter: string; terms: GlossaryTerm[] }[] {
  const groups = new Map<string, GlossaryTerm[]>();
  for (const t of glossaryTerms) {
    const l = termLetter(t.term);
    (groups.get(l) ?? groups.set(l, []).get(l)!).push(t);
  }
  return [...groups.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([letter, terms]) => ({ letter, terms }));
}

/** Case-insensitive substring search over term + short definition. */
export function searchGlossary(query: string): GlossaryTerm[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return glossaryTerms.filter(
    (t) => t.term.toLowerCase().includes(q) || t.shortDefinition.toLowerCase().includes(q),
  );
}

/** All glossary in-app paths — consumed by the prerender route list. */
export function glossaryRoutes(): string[] {
  return ["/glossary", ...glossaryTerms.map((t) => `/glossary/${t.slug}`)];
}
