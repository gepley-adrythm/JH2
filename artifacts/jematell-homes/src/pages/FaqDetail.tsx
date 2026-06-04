import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { faqDataset, SERVICE_LINKS } from "../data/faq";
import { blogs } from "../data/blogs";
import { useContactForm } from "../contact-form";
import { Seo } from "../seo/seo";
import { qaPageJsonLd, breadcrumbJsonLd } from "../seo/jsonld";
import NotFound from "./not-found";

function cleanTitle(t: string) {
  return t.replace(/\s*[—–-]\s*Jematell Homes\s*$/i, "").trim();
}

export default function FaqDetail() {
  const { slug } = useParams();
  const { open } = useContactForm();

  const item = useMemo(() => (slug ? faqDataset.getItem(slug) : undefined), [slug]);
  const detail = useMemo(() => (item ? faqDataset.toDetail(item) : undefined), [item]);
  const related = useMemo(() => (item ? faqDataset.related(item) : []), [item]);

  if (!item || !detail) return <NotFound />;

  const path = `/faq/${detail.slug}`;
  const services = detail.relatedServiceSlugs
    .map((s) => SERVICE_LINKS[s])
    .filter((s): s is { label: string; href: string } => Boolean(s));
  const pillar =
    detail.pillarBlogSlug && blogs[detail.pillarBlogSlug]
      ? { slug: detail.pillarBlogSlug, title: cleanTitle(blogs[detail.pillarBlogSlug].title) }
      : null;

  const paragraphs = detail.answer.split(/\n{2,}/).filter(Boolean);

  return (
    <main className="page faq-page faq-detail">
      <Seo
        title={detail.question}
        description={detail.metaDescription}
        canonical={path}
        jsonLd={[
          qaPageJsonLd({ url: path, question: detail.question, answer: detail.answer }),
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "FAQ", url: "/faq" },
            { name: detail.question, url: path },
          ]),
        ]}
      />

      <section className="page-hero faq-hero">
        <div className="page-hero-overlay" />
        <div className="container page-hero-content">
          <nav className="faq-crumbs hero-eyebrow" aria-label="Breadcrumb">
            <Link to="/faq" data-testid="faq-detail-crumb">FAQ</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>{detail.categoryTitle}</span>
          </nav>
          <h1 className="faq-detail-title hero-title">{detail.question}</h1>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--color-bg)" }}>
        <div className="container container-narrow">
          <div className="faq-answer" data-testid="faq-answer">
            {detail.answerHtml ? (
              <div dangerouslySetInnerHTML={{ __html: detail.answerHtml }} />
            ) : (
              paragraphs.map((p, i) => <p key={i}>{p}</p>)
            )}
          </div>

          {services.length > 0 ? (
            <div className="faq-aside" data-testid="faq-related-services">
              <h2 className="faq-aside-title">Related services</h2>
              <ul className="faq-aside-links">
                {services.map((s) => (
                  <li key={s.href}>
                    <Link to={s.href} data-testid={`faq-service-${s.href.replace(/^\//, "")}`}>
                      {s.label} <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {pillar ? (
            <div className="faq-aside" data-testid="faq-pillar">
              <h2 className="faq-aside-title">Go deeper</h2>
              <Link
                to={`/blog/${pillar.slug}`}
                className="faq-pillar-link"
                data-testid={`faq-pillar-${pillar.slug}`}
              >
                {pillar.title} <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          ) : null}

          {related.length > 0 ? (
            <div className="faq-aside" data-testid="faq-related">
              <h2 className="faq-aside-title">Related questions</h2>
              <ul className="faq-list">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link to={`/faq/${r.slug}`} data-testid={`faq-related-${r.slug}`}>
                      <span>{r.question}</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <Link to="/faq" className="faq-back" data-testid="faq-detail-all">
            All questions <ArrowRight size={14} aria-hidden="true" />
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
            data-testid="faq-detail-cta-contact"
          >
            Start the conversation
          </button>
        </div>
      </section>
    </main>
  );
}
