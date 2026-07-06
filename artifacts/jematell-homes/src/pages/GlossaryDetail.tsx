import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Clock } from "lucide-react";
import { getGlossaryTerm } from "../data/glossary";
import { faqDataset } from "../data/faq";
import { useContactForm } from "../contact-form";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { Seo } from "../seo/seo";
import { definedTermJsonLd, breadcrumbJsonLd } from "../seo/jsonld";
import { annotateHeadings, readingTime } from "../lib/detail";
import { DetailMore, type MoreColumn } from "../components/DetailParts";
import NotFound from "./not-found";

export default function GlossaryDetail() {
  const { slug } = useParams();
  const { open } = useContactForm();

  const term = useMemo(() => (slug ? getGlossaryTerm(slug) : undefined), [slug]);
  const article = useMemo(() => annotateHeadings(term?.definitionHtml || ""), [term]);
  const minutes = useMemo(() => readingTime(term?.definitionHtml || ""), [term]);
  const relatedTerms = useMemo(
    () => (term ? term.relatedTerms.map(getGlossaryTerm).filter((t): t is NonNullable<typeof t> => Boolean(t)) : []),
    [term],
  );
  const relatedFaqs = useMemo(
    () => (term ? term.relatedFaqs.map((s) => faqDataset.getItem(s)).filter((i): i is NonNullable<typeof i> => Boolean(i)) : []),
    [term],
  );

  if (!term) return <NotFound />;

  const path = `/glossary/${term.slug}`;
  const crumbs = [
    { name: "Home", url: "/" },
    { name: "Glossary", url: "/glossary" },
    { name: term.term, url: path },
  ];
  const columns: MoreColumn[] = [
    { label: "Related questions", items: relatedFaqs.map((r) => ({ to: `/faq/${r.slug}`, label: r.question })) },
  ];

  return (
    <main className="page faq-page faq-detail glossary-detail">
      <Seo
        title={term.term}
        description={term.metaDescription || term.shortDefinition}
        canonical={path}
        jsonLd={[
          definedTermJsonLd({ term: term.term, definition: term.shortDefinition, url: path }),
          breadcrumbJsonLd(crumbs),
        ]}
      />

      <section className="page-hero faq-hero faq-detail-hero page-hero-short">
        <ResponsiveImage name="cta-bg" className="page-hero-bg" alt="" widths={[768, 1280, 1920, 2500]} sizes="100vw" width={2500} height={1667} priority />
        <div className="page-hero-overlay" />
        <div className="container page-hero-content">
          <nav className="faq-crumbs hero-eyebrow" aria-label="Breadcrumb">
            <Link to="/glossary" data-testid="glossary-detail-crumb">Glossary</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>{term.category || "Term"}</span>
          </nav>
          <h1 className="faq-detail-title hero-title">{term.term}</h1>
          <div className="dt-hero-meta">
            <span><Clock size={14} aria-hidden="true" /> {minutes} min read</span>
          </div>
        </div>
      </section>

      <section className="dt-section">
        <div className="container">
          <div style={{ maxWidth: 720, marginInline: "auto" }}>
            <div className="dt-main">
              {term.shortDefinition ? (
                <div className="dt-answer-card" data-testid="glossary-short">
                  <span className="dt-answer-card-label">In short</span>
                  <p>{term.shortDefinition}</p>
                </div>
              ) : null}

              <div className="dt-prose" data-testid="glossary-definition" dangerouslySetInnerHTML={{ __html: article.html }} />

              {relatedTerms.length > 0 ? (
                <div className="dt-more" data-testid="glossary-related-terms">
                  <h2 className="dt-more-title">Related terms</h2>
                  <div className="dt-chips" style={{ marginTop: 22 }}>
                    {relatedTerms.map((r) => (
                      <Link key={r.slug} to={`/glossary/${r.slug}`} className="dt-chip" data-testid={`glossary-related-${r.slug}`}>
                        {r.term}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}

              <DetailMore columns={columns} testid="glossary-related-faqs" />

              <Link to="/glossary" className="dt-back" data-testid="glossary-detail-all">
                All terms <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-cta">
        <div className="container faq-cta-inner">
          <h2 className="faq-cta-title">Building and want a straight answer?</h2>
          <p className="faq-cta-sub">Tell us about your project and we'll walk you through the details in plain language.</p>
          <button type="button" className="btn btn-primary" onClick={() => open()} data-testid="glossary-detail-cta-contact">
            Start the conversation
          </button>
        </div>
      </section>
    </main>
  );
}
