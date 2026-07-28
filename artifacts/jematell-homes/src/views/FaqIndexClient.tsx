"use client";
import { useMemo, useState, Fragment, type ReactNode, type ComponentType } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { ResponsiveImage } from "../components/ResponsiveImage";

export interface FaqSearchItem {
  slug: string;
  question: string;
  shortAnswer: string;
  tags: string[];
}

function normalizeTokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2);
}

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

export function FaqIndexClient({
  intro,
  items,
  children,
}: {
  intro: ReactNode;
  items: FaqSearchItem[];
  children: ReactNode;
}) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim();
    return q ? searchFaqItems(items, q) : [];
  }, [items, query]);

  return (
    <>
      <section className="page-hero faq-hero" style={{ alignItems: "center", minHeight: "65vh" }}>
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
        <div className="page-hero-overlay" style={{ background: "linear-gradient(180deg, rgba(10,12,14,0.25) 0%, rgba(10,12,14,0.45) 100%)" }} />
        <div className="container page-hero-content" style={{ textAlign: "center", maxWidth: "100%" }}>
          <h1 className="page-hero-title hero-title" style={{ textTransform: "uppercase" }}>
            Frequently Asked Questions
          </h1>
        </div>
      </section>

      <div className="container" style={{ paddingTop: "clamp(20px, 3vw, 32px)" }}>
        <Link
          href="/resources"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
            textDecoration: "none",
          }}
        >
          ← Resources
        </Link>
      </div>

      {query.trim() ? (
        <section className="section-pad" style={{ background: "var(--color-bg)", paddingTop: "clamp(24px, 3vw, 40px)" }}>
          <div className="container container-narrow">
            <p className="page-hero-sub" style={{ color: "var(--color-text)", marginBottom: 24 }}>{intro}</p>
            <div className="faq-search" role="search" style={{ maxWidth: 560, marginBottom: 32 }}>
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
            <h2 className="faq-section-title">
              {results.length} result{results.length === 1 ? "" : "s"} for &ldquo;{query.trim()}&rdquo;
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
        <section className="section-pad" style={{ background: "var(--color-bg)", paddingTop: "clamp(24px, 3vw, 40px)" }}>
          <div className="container container-narrow" style={{ marginBottom: 32 }}>
            <p className="page-hero-sub" style={{ color: "var(--color-text)", marginBottom: 24 }}>{intro}</p>
            <div className="faq-search" role="search" style={{ maxWidth: 560 }}>
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
          {children}
        </section>
      )}
    </>
  );
}
