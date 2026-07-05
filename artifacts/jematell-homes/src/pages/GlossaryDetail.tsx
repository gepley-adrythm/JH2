import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { getGlossaryTerm } from "../data/glossary";
import { faqDataset } from "../data/faq";
import { useContactForm } from "../contact-form";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { Seo } from "../seo/seo";
import { definedTermJsonLd, breadcrumbJsonLd } from "../seo/jsonld";
import NotFound from "./not-found";

export default function GlossaryDetail() {
  const { slug } = useParams();
  const { open } = useContactForm();

  const term = useMemo(() => (slug ? getGlossaryTerm(slug) : undefined), [slug]);
  const relatedTerms = useMemo(
    () => (term ? term.relatedTerms.map(getGlossaryTerm).filter((t): t is NonNullable<typeof t> => Boolean(t)) : []),
    [term],
  );
  const relatedFaqs = useMemo(
    () =>
      term
        ? term.relatedFaqs
            .map((s) => faqDataset.getItem(s))
            .filter((i): i is NonNullable<typeof i> => Boolean(i))
        : [],
    [term],
  );

  if (!term) return <NotFound />;

  const path = `/glossary/${term.slug}`;
  const crumbs = [
    { name: "Home", url: "/" },
    { name: "Glossary", url: "/glossary" },
    { name: term.term, url: path },
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

      <section className="page-hero faq-hero faq-detail-hero">
        <ResponsiveImage
          name="cta-bg"
          className="page-hero-bg"
          alt=""
          widths={[768, 1280, 1920, 2500]}
          sizes="100vw"
          width={2500}
          height={1667}
          priority
        />
        <div className="page-hero-overlay" />
        <div className="container page-hero-content">
          <nav className="faq-crumbs hero-eyebrow" aria-label="Breadcrumb">
            <Link to="/glossary" data-testid="glossary-detail-crumb">Glossary</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>{term.category || "Term"}</span>
          </nav>
          <h1 className="faq-detail-title hero-title">{term.term}</h1>
          {term.shortDefinition ? (
            <p className="faq-detail-lede" data-testid="glossary-detail-lede">
              {term.shortDefinition}
            </p>
          ) : null}
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--color-bg)" }}>
        <div className="container container-narrow">
          <div className="faq-answer" data-testid="glossary-definition">
            <div dangerouslySetInnerHTML={{ __html: term.definitionHtml }} />
          </div>

          {relatedTerms.length > 0 ? (
            <div className="faq-aside" data-testid="glossary-related-terms">
              <h2 className="faq-aside-title">Related terms</h2>
              <ul className="faq-list">
                {relatedTerms.map((r) => (
                  <li key={r.slug}>
                    <Link to={`/glossary/${r.slug}`} data-testid={`glossary-related-${r.slug}`}>
                      <span>{r.term}</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {relatedFaqs.length > 0 ? (
            <div className="faq-aside" data-testid="glossary-related-faqs">
              <h2 className="faq-aside-title">Related questions</h2>
              <ul className="faq-list">
                {relatedFaqs.map((r) => (
                  <li key={r.slug}>
                    <Link to={`/faq/${r.slug}`} data-testid={`glossary-faq-${r.slug}`}>
                      <span>{r.question}</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <Link to="/glossary" className="faq-back" data-testid="glossary-detail-all">
            All terms <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="faq-cta">
        <div className="container faq-cta-inner">
          <h2 className="faq-cta-title">Ready to talk it through?</h2>
          <p className="faq-cta-sub">
            Every build starts with a conversation. Tell us what you have in mind.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => open()}
            data-testid="glossary-detail-cta-contact"
          >
            Start the conversation
          </button>
        </div>
      </section>
    </main>
  );
}
