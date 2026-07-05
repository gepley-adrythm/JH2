import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { glossaryTerms, glossaryByLetter, searchGlossary } from "../data/glossary";
import { useContactForm } from "../contact-form";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { Seo } from "../seo/seo";
import { definedTermSetJsonLd } from "../seo/jsonld";

const INTRO =
  "Plain-English definitions for the terms that come up on a custom build in Arizona: allowances, draw schedules, setbacks, NAOS, post-tension slabs, the ROC, and dozens more, each with the sources behind it.";

export default function GlossaryIndex() {
  const { open } = useContactForm();
  const [query, setQuery] = useState("");

  const letters = useMemo(() => glossaryByLetter(), []);
  const results = useMemo(() => (query.trim() ? searchGlossary(query) : []), [query]);

  return (
    <main className="page faq-page glossary-page">
      <Seo
        title="Custom Home Building Glossary"
        description={INTRO}
        canonical="/glossary"
        jsonLd={definedTermSetJsonLd({
          name: "Custom Home Building Glossary",
          description: INTRO,
          url: "/glossary",
          terms: glossaryTerms.map((t) => ({ term: t.term, url: `/glossary/${t.slug}` })),
        })}
      />

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
          <h1 className="faq-hero-title hero-title">Glossary</h1>
          <p className="page-hero-sub hero-subtitle">{INTRO}</p>
          <div className="faq-search hero-cta" role="search">
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
      </section>

      {query.trim() ? (
        <section className="section-pad" style={{ background: "var(--color-bg)" }}>
          <div className="container container-narrow">
            <h2 className="faq-section-title">
              {results.length} result{results.length === 1 ? "" : "s"} for “{query.trim()}”
            </h2>
            <ul className="faq-list" data-testid="glossary-search-results">
              {results.map((t) => (
                <li key={t.slug}>
                  <Link to={`/glossary/${t.slug}`} data-testid={`glossary-result-${t.slug}`}>
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
        <section className="section-pad" style={{ background: "var(--color-cream, #ece9e2)" }}>
          <div className="container">
            <div className="faq-topics" data-testid="glossary-letters">
              <div className="faq-topic-chips">
                {letters.map((g) => (
                  <a key={g.letter} href={`#letter-${g.letter}`} className="faq-topic-chip">
                    {g.letter}
                  </a>
                ))}
              </div>
            </div>

            {letters.map((g) => (
              <div
                key={g.letter}
                id={`letter-${g.letter}`}
                className="faq-category"
                data-testid={`glossary-letter-${g.letter}`}
              >
                <h2 className="faq-category-title">{g.letter}</h2>
                <div className="faq-card-grid">
                  {g.terms.map((t) => (
                    <Link
                      key={t.slug}
                      to={`/glossary/${t.slug}`}
                      className="faq-q-card"
                      data-testid={`glossary-term-${t.slug}`}
                    >
                      <span className="faq-q-card-q">{t.term}</span>
                      <span className="faq-category-desc">{t.shortDefinition}</span>
                      <span className="faq-q-card-more">
                        Read definition <ArrowRight size={15} aria-hidden="true" />
                      </span>
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
    </main>
  );
}
