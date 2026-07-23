"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { useContactForm } from "../contact-form";
import { ResponsiveImage } from "../components/ResponsiveImage";

export interface GlossaryTermLite {
  slug: string;
  term: string;
  shortDefinition: string;
}

export interface GlossaryLetterGroup {
  letter: string;
  terms: GlossaryTermLite[];
}

/**
 * GlossaryIndexClient - the interactive body of /glossary: the search box in
 * the hero plus the switch between search results and the A-Z index. Receives
 * only lightweight term summaries (slug/term/shortDefinition) from the server
 * page, so the full glossary corpus (definition HTML, sources, related links)
 * never enters the client bundle. Markup ported verbatim from the old
 * GlossaryIndex page.
 */
export function GlossaryIndexClient({
  letters,
  terms,
}: {
  letters: GlossaryLetterGroup[];
  terms: GlossaryTermLite[];
}) {
  const { open } = useContactForm();
  const [query, setQuery] = useState("");

  // Same predicate as searchGlossary() in src/data/glossary.ts, applied to the
  // lightweight list in its original data order (matching the old page).
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return terms.filter(
      (t) => t.term.toLowerCase().includes(q) || t.shortDefinition.toLowerCase().includes(q),
    );
  }, [terms, query]);

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
          <h1 className="page-hero-title hero-title" style={{ textTransform: "uppercase" }}>Glossary</h1>
        </div>
      </section>

      <div className="container" style={{ paddingTop: "clamp(20px, 3vw, 32px)", display: "flex", alignItems: "center", gap: 24 }}>
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
        <div className="faq-search" role="search" style={{ flex: 1, maxWidth: 480 }}>
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search terms…"
            aria-label="Search the glossary"
            data-testid="glossary-search-input"
          />
        </div>
      </div>

      {query.trim() ? (
        <section className="section-pad" style={{ background: "var(--color-bg)" }}>
          <div className="container container-narrow">
            <h2 className="faq-section-title">
              {results.length} result{results.length === 1 ? "" : "s"} for “{query.trim()}”
            </h2>
            <ul className="faq-list" data-testid="glossary-search-results">
              {results.map((t) => (
                <li key={t.slug}>
                  <Link href={`/glossary/${t.slug}`} data-testid={`glossary-result-${t.slug}`}>
                    <span>{t.term}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </li>
              ))}
              {results.length === 0 ? (
                <li className="faq-empty">No matches. Try fewer or different words.</li>
              ) : null}
            </ul>
          </div>
        </section>
      ) : (
        <section className="glossary-index section-pad">
          <div className="container">
            <div className="glossary-az" data-testid="glossary-letters">
              {letters.map((g) => (
                <a key={g.letter} href={`#letter-${g.letter}`}>{g.letter}</a>
              ))}
            </div>

            {letters.map((g) => (
              <div
                key={g.letter}
                id={`letter-${g.letter}`}
                className="glossary-letter"
                data-testid={`glossary-letter-${g.letter}`}
              >
                <div className="glossary-letter-mark">{g.letter}</div>
                <div className="glossary-term-grid">
                  {g.terms.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/glossary/${t.slug}`}
                      className="glossary-term"
                      data-testid={`glossary-term-${t.slug}`}
                    >
                      <span className="glossary-term-name">
                        {t.term} <ArrowRight size={16} aria-hidden="true" />
                      </span>
                      <span className="glossary-term-def">{t.shortDefinition}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="faq-cta">
        <div className="container faq-cta-inner">
          <h2 className="faq-cta-title">Building and want a straight answer?</h2>
          <p className="faq-cta-sub">
            Tell us about your project and we'll walk you through the details in plain language.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => open()}
            data-testid="glossary-cta-contact"
          >
            Start the conversation
          </button>
        </div>
      </section>
    </>
  );
}
