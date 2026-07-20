"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { ResponsiveImage } from "../components/ResponsiveImage";

/**
 * The searchable slice of a FAQ item. Summary-only fields (never the full
 * dataset): exactly what faqDataset.search() matches against, so the island
 * reproduces the old client-side search without shipping answer bodies.
 */
export interface FaqSearchItem {
  slug: string;
  question: string;
  shortAnswer: string;
  tags: string[];
}

/** Mirrors normalizeTokens in @workspace/faq dataset.ts. */
function normalizeTokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2);
}

/** Mirrors faqDataset.search(): token hits over question + shortAnswer + tags. */
function searchFaqItems(items: FaqSearchItem[], query: string): FaqSearchItem[] {
  const tokens = normalizeTokens(query);
  if (tokens.length === 0) return [];
  return items
    .map((i) => {
      const hay = `${i.question} ${i.shortAnswer} ${i.tags.join(" ")}`.toLowerCase();
      const score = tokens.reduce((s, t) => s + (hay.includes(t) ? 1 : 0), 0);
      return { i, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.i);
}

/**
 * FaqIndexClient is the interactive part of /faq: the hero with the search box
 * plus the section below it, which swaps between the server-rendered browse
 * content (`children`: topic chips + category grids) and live search results.
 * The rest of the page (JSON-LD, closing CTA) stays on the server.
 */
export function FaqIndexClient({
  intro,
  items,
  children,
}: {
  intro: string;
  items: FaqSearchItem[];
  children: React.ReactNode;
}) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim();
    return q ? searchFaqItems(items, q) : [];
  }, [items, query]);

  return (
    <>
      <section className="page-hero faq-hero">
        <ResponsiveImage
          name="spec-home"
          className="page-hero-bg"
          alt=""
          widths={[768, 1280, 1600]}
          sizes="100vw"
          width={1600}
          height={1066}
          priority
        />
        <div className="page-hero-overlay" />
        <div className="container page-hero-content">
          <h1 className="faq-hero-title hero-title">Frequently Asked Questions</h1>
          <p className="page-hero-sub hero-subtitle">{intro}</p>
          <div className="faq-search hero-cta" role="search">
            <Search size={18} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions…"
              aria-label="Search frequently asked questions"
              data-testid="faq-search-input"
            />
          </div>
        </div>
      </section>

      {query.trim() ? (
        <section className="section-pad" style={{ background: "var(--color-bg)" }}>
          <div className="container container-narrow">
            <h2 className="faq-section-title">
              {results.length} result{results.length === 1 ? "" : "s"} for “{query.trim()}”
            </h2>
            <ul className="faq-list" data-testid="faq-search-results">
              {results.map((i) => (
                <li key={i.slug}>
                  <Link href={`/faq/${i.slug}`} data-testid={`faq-result-${i.slug}`}>
                    <span>{i.question}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </li>
              ))}
              {results.length === 0 ? (
                <li className="faq-empty">No matches — try fewer or different words.</li>
              ) : null}
            </ul>
          </div>
        </section>
      ) : (
        children
      )}
    </>
  );
}
