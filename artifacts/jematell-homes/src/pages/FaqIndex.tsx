import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { faqDataset } from "../data/faq";
import { useContactForm } from "../contact-form";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { Seo } from "../seo/seo";
import { faqPageJsonLd } from "../seo/jsonld";

const INTRO =
  "Straight answers about building a custom home in Arizona: timelines, budgets, lots, floor plans, and what it's like to work with a family-owned builder.";

export default function FaqIndex() {
  const { open } = useContactForm();
  const [query, setQuery] = useState("");

  const categories = useMemo(() => faqDataset.categories(), []);
  const topics = useMemo(() => faqDataset.topics(), []);
  const allItems = useMemo(() => faqDataset.all(), []);

  const results = useMemo(() => {
    const q = query.trim();
    return q ? faqDataset.search(q) : [];
  }, [query]);

  return (
    <main className="page faq-page">
      <Seo
        title="Frequently Asked Questions"
        description={INTRO}
        canonical="/faq"
        jsonLd={faqPageJsonLd({
          url: "/faq",
          items: allItems.map((i) => ({
            question: i.question,
            shortAnswer: i.shortAnswer,
          })),
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
          <h1 className="faq-hero-title hero-title">Frequently Asked Questions</h1>
          <p className="page-hero-sub hero-subtitle">{INTRO}</p>
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
                  <Link to={`/faq/${i.slug}`} data-testid={`faq-result-${i.slug}`}>
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
        <>
          <section className="section-pad" style={{ background: "var(--color-cream, #ece9e2)" }}>
            <div className="container">
              {topics.length > 0 ? (
                <div className="faq-topics" data-testid="faq-topics">
                  <h2 className="faq-section-title">Browse by topic</h2>
                  <div className="faq-topic-chips">
                    {topics.map((t) => (
                      <Link
                        key={t.slug}
                        to={`/faq/topics/${t.slug}`}
                        className="faq-topic-chip"
                        data-testid={`faq-topic-${t.slug}`}
                      >
                        {t.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}

              {categories.map((c) => (
                <div key={c.slug} className="faq-category" data-testid={`faq-category-${c.slug}`}>
                  <h2 className="faq-category-title">{c.title}</h2>
                  <p className="faq-category-desc">{c.description}</p>
                  <div className="faq-card-grid">
                    {c.items.map((i) => (
                      <Link
                        key={i.slug}
                        to={`/faq/${i.slug}`}
                        className="faq-q-card"
                        data-testid={`faq-q-${i.slug}`}
                      >
                        <span className="faq-q-card-q">{i.question}</span>
                        <span className="faq-q-card-more">
                          Read answer <ArrowRight size={15} aria-hidden="true" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      <section className="faq-cta">
        <div className="container faq-cta-inner">
          <h2 className="faq-cta-title">Still have a question?</h2>
          <p className="faq-cta-sub">
            Tell us about your project and we'll get back to you personally.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => open()}
            data-testid="faq-cta-contact"
          >
            Start the conversation
          </button>
        </div>
      </section>
    </main>
  );
}
