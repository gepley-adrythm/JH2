import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, ChevronRight, ExternalLink } from "lucide-react";
import {
  getReferenceEntry,
  getReferenceModule,
  getReferenceByKey,
} from "../data/reference";
import { getGlossaryTerm } from "../data/glossary";
import { faqDataset } from "../data/faq";
import { useContactForm } from "../contact-form";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { Seo } from "../seo/seo";
import { techArticleJsonLd, breadcrumbJsonLd } from "../seo/jsonld";
import NotFound from "./not-found";

export default function ReferenceDetail() {
  const { module, slug } = useParams();
  const { open } = useContactForm();

  const entry = useMemo(
    () => (module && slug ? getReferenceEntry(module, slug) : undefined),
    [module, slug],
  );
  const meta = useMemo(() => (module ? getReferenceModule(module) : undefined), [module]);
  const relatedTerms = useMemo(
    () => (entry ? entry.relatedTerms.map(getGlossaryTerm).filter((t): t is NonNullable<typeof t> => Boolean(t)) : []),
    [entry],
  );
  const relatedFaqs = useMemo(
    () => (entry ? entry.relatedFaqs.map((s) => faqDataset.getItem(s)).filter((i): i is NonNullable<typeof i> => Boolean(i)) : []),
    [entry],
  );
  const relatedRefs = useMemo(
    () => (entry ? entry.relatedRefs.map(getReferenceByKey).filter((r): r is NonNullable<typeof r> => Boolean(r)) : []),
    [entry],
  );

  if (!entry || !meta) return <NotFound />;

  const path = `/reference-library/${entry.module}/${entry.slug}`;
  const crumbs = [
    { name: "Home", url: "/" },
    { name: "Reference Library", url: "/reference-library" },
    { name: meta.title, url: `/reference-library/${meta.slug}` },
    { name: entry.title, url: path },
  ];
  const excerptOnly = entry.sourceLicense === "copyrighted";

  return (
    <main className="page faq-page faq-detail reference-detail">
      <Seo
        title={entry.title}
        description={entry.metaDescription || entry.shortSummary}
        canonical={path}
        jsonLd={[
          techArticleJsonLd({
            title: entry.title,
            description: entry.shortSummary,
            url: path,
            section: meta.title,
          }),
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
            <Link to="/reference-library" data-testid="reference-detail-crumb">Reference Library</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link to={`/reference-library/${meta.slug}`} data-testid="reference-detail-crumb-module">
              {meta.title}
            </Link>
          </nav>
          <h1 className="faq-detail-title hero-title">{entry.title}</h1>
          {entry.shortSummary ? (
            <p className="faq-detail-lede" data-testid="reference-detail-lede">
              {entry.shortSummary}
            </p>
          ) : null}
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--color-bg)" }}>
        <div className="container container-narrow">
          {entry.sourceUrl ? (
            <div className="faq-aside" data-citations="true" data-testid="reference-source">
              <h2 className="faq-aside-title">Primary source</h2>
              <a href={entry.sourceUrl} target="_blank" rel="noopener noreferrer" className="faq-pillar-link">
                {entry.sourceTitle || entry.sourceUrl} <ExternalLink size={14} aria-hidden="true" />
              </a>
              {excerptOnly ? (
                <p className="faq-category-desc" style={{ marginTop: "0.5rem" }}>
                  This page summarizes and quotes limited excerpts for commentary and education. See
                  the source above for the full, authoritative text.
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="faq-answer" data-testid="reference-body">
            <div dangerouslySetInnerHTML={{ __html: entry.bodyHtml }} />
          </div>

          {relatedRefs.length > 0 ? (
            <div className="faq-aside" data-testid="reference-related-refs">
              <h2 className="faq-aside-title">Related references</h2>
              <ul className="faq-list">
                {relatedRefs.map((r) => (
                  <li key={`${r.module}/${r.slug}`}>
                    <Link to={`/reference-library/${r.module}/${r.slug}`} data-testid={`reference-related-${r.slug}`}>
                      <span>{r.title}</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {relatedTerms.length > 0 ? (
            <div className="faq-aside" data-testid="reference-related-terms">
              <h2 className="faq-aside-title">Related terms</h2>
              <ul className="faq-list">
                {relatedTerms.map((r) => (
                  <li key={r.slug}>
                    <Link to={`/glossary/${r.slug}`} data-testid={`reference-term-${r.slug}`}>
                      <span>{r.term}</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {relatedFaqs.length > 0 ? (
            <div className="faq-aside" data-testid="reference-related-faqs">
              <h2 className="faq-aside-title">Related questions</h2>
              <ul className="faq-list">
                {relatedFaqs.map((r) => (
                  <li key={r.slug}>
                    <Link to={`/faq/${r.slug}`} data-testid={`reference-faq-${r.slug}`}>
                      <span>{r.question}</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <Link to={`/reference-library/${meta.slug}`} className="faq-back" data-testid="reference-detail-all">
            All {meta.title} <ArrowRight size={14} aria-hidden="true" />
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
            data-testid="reference-detail-cta-contact"
          >
            Start the conversation
          </button>
        </div>
      </section>
    </main>
  );
}
