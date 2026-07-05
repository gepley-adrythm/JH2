import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { getGuide } from "../data/guides";
import { getReferenceByKey } from "../data/reference";
import { getGlossaryTerm } from "../data/glossary";
import { faqDataset } from "../data/faq";
import { useContactForm } from "../contact-form";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { Seo } from "../seo/seo";
import { articleJsonLd, breadcrumbJsonLd } from "../seo/jsonld";
import NotFound from "./not-found";

export default function GuideDetail() {
  const { slug } = useParams();
  const { open } = useContactForm();

  const guide = useMemo(() => (slug ? getGuide(slug) : undefined), [slug]);
  const relatedGuides = useMemo(
    () => (guide ? guide.relatedGuides.map(getGuide).filter((g): g is NonNullable<typeof g> => Boolean(g)) : []),
    [guide],
  );
  const relatedRefs = useMemo(
    () => (guide ? guide.relatedRefs.map(getReferenceByKey).filter((r): r is NonNullable<typeof r> => Boolean(r)) : []),
    [guide],
  );
  const relatedFaqs = useMemo(
    () => (guide ? guide.relatedFaqs.map((s) => faqDataset.getItem(s)).filter((i): i is NonNullable<typeof i> => Boolean(i)).slice(0, 6) : []),
    [guide],
  );
  const relatedTerms = useMemo(
    () => (guide ? guide.relatedTerms.map(getGlossaryTerm).filter((t): t is NonNullable<typeof t> => Boolean(t)).slice(0, 6) : []),
    [guide],
  );

  if (!guide) return <NotFound />;

  const path = `/guides/${guide.slug}`;
  const crumbs = [
    { name: "Home", url: "/" },
    { name: "Guides", url: "/guides" },
    { name: guide.title, url: path },
  ];

  return (
    <main className="page faq-page faq-detail guide-detail">
      <Seo
        title={guide.title}
        description={guide.metaDescription || guide.summary}
        canonical={path}
        jsonLd={[
          articleJsonLd({ title: guide.title, description: guide.summary, url: path }),
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
            <Link to="/guides" data-testid="guide-detail-crumb">Guides</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>{guide.category || "Guide"}</span>
          </nav>
          <h1 className="faq-detail-title hero-title">{guide.title}</h1>
          {guide.summary ? (
            <p className="faq-detail-lede" data-testid="guide-detail-lede">
              {guide.summary}
            </p>
          ) : null}
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--color-bg)" }}>
        <div className="container container-narrow">
          <div className="faq-answer" data-testid="guide-body">
            <div dangerouslySetInnerHTML={{ __html: guide.bodyHtml }} />
          </div>

          {relatedGuides.length > 0 ? (
            <div className="faq-aside" data-testid="guide-related-guides">
              <h2 className="faq-aside-title">Related guides</h2>
              <ul className="faq-list">
                {relatedGuides.map((r) => (
                  <li key={r.slug}>
                    <Link to={`/guides/${r.slug}`} data-testid={`guide-related-${r.slug}`}>
                      <span>{r.title}</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {relatedFaqs.length > 0 ? (
            <div className="faq-aside" data-testid="guide-related-faqs">
              <h2 className="faq-aside-title">Related questions</h2>
              <ul className="faq-list">
                {relatedFaqs.map((r) => (
                  <li key={r.slug}>
                    <Link to={`/faq/${r.slug}`} data-testid={`guide-faq-${r.slug}`}>
                      <span>{r.question}</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {relatedRefs.length > 0 ? (
            <div className="faq-aside" data-testid="guide-related-refs">
              <h2 className="faq-aside-title">In the reference library</h2>
              <ul className="faq-list">
                {relatedRefs.map((r) => (
                  <li key={`${r.module}/${r.slug}`}>
                    <Link to={`/reference-library/${r.module}/${r.slug}`} data-testid={`guide-ref-${r.slug}`}>
                      <span>{r.title}</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {relatedTerms.length > 0 ? (
            <div className="faq-aside" data-testid="guide-related-terms">
              <h2 className="faq-aside-title">Related terms</h2>
              <ul className="faq-list">
                {relatedTerms.map((r) => (
                  <li key={r.slug}>
                    <Link to={`/glossary/${r.slug}`} data-testid={`guide-term-${r.slug}`}>
                      <span>{r.term}</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <Link to="/guides" className="faq-back" data-testid="guide-detail-all">
            All guides <ArrowRight size={14} aria-hidden="true" />
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
            data-testid="guide-detail-cta-contact"
          >
            Start the conversation
          </button>
        </div>
      </section>
    </main>
  );
}
