import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, ChevronRight, ExternalLink, Clock, Calendar } from "lucide-react";
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
import { annotateHeadings, readingTime, formatDate } from "../lib/detail";
import { useReadingProgress } from "../lib/useReadingProgress";
import { DetailProgress, DetailToc, DetailMore, type MoreColumn } from "../components/DetailParts";
import NotFound from "./not-found";

export default function ReferenceDetail() {
  const { module, slug } = useParams();
  const { open } = useContactForm();

  const entry = useMemo(
    () => (module && slug ? getReferenceEntry(module, slug) : undefined),
    [module, slug],
  );
  const meta = useMemo(() => (module ? getReferenceModule(module) : undefined), [module]);
  const article = useMemo(() => annotateHeadings(entry?.bodyHtml || ""), [entry]);
  const minutes = useMemo(() => readingTime(entry?.bodyHtml || ""), [entry]);

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

  const { progressRef, activeId } = useReadingProgress(article.toc);

  if (!entry || !meta) return <NotFound />;

  const path = `/reference-library/${entry.module}/${entry.slug}`;
  const crumbs = [
    { name: "Home", url: "/" },
    { name: "Reference Library", url: "/reference-library" },
    { name: meta.title, url: `/reference-library/${meta.slug}` },
    { name: entry.title, url: path },
  ];
  const excerptOnly = entry.sourceLicense === "copyrighted";

  const columns: MoreColumn[] = [
    { label: `More in ${meta.title}`, items: relatedRefs.map((r) => ({ to: `/reference-library/${r.module}/${r.slug}`, label: r.title })) },
    { label: "Related questions", items: relatedFaqs.map((r) => ({ to: `/faq/${r.slug}`, label: r.question })) },
    { label: "Related terms", items: relatedTerms.map((r) => ({ to: `/glossary/${r.slug}`, label: r.term })) },
  ];

  const body = (
    <div className="dt-main">
      {entry.sourceUrl ? (
        <a
          href={entry.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="dt-source-card"
          data-citations="true"
          data-testid="reference-source"
        >
          <span className="dt-source-card-label">Primary source</span>
          <span className="dt-source-card-title">
            {entry.sourceTitle || entry.sourceUrl} <ExternalLink size={16} aria-hidden="true" />
          </span>
          {excerptOnly ? (
            <span className="dt-source-card-note">
              This page summarizes and quotes limited excerpts for commentary and education. See the source for the full, authoritative text.
            </span>
          ) : null}
        </a>
      ) : null}

      <div className="dt-prose" data-testid="reference-body" dangerouslySetInnerHTML={{ __html: article.html }} />

      <DetailMore columns={columns} testid="reference-related" />

      <Link to={`/reference-library/${meta.slug}`} className="dt-back" data-testid="reference-detail-all">
        All {meta.title} <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </div>
  );

  return (
    <main className="page faq-page faq-detail reference-detail">
      <Seo
        title={entry.title}
        description={entry.metaDescription || entry.shortSummary}
        canonical={path}
        jsonLd={[
          techArticleJsonLd({ title: entry.title, description: entry.shortSummary, url: path, section: meta.title }),
          breadcrumbJsonLd(crumbs),
        ]}
      />

      <DetailProgress innerRef={progressRef} />

      <section className="page-hero faq-hero faq-detail-hero">
        <ResponsiveImage name="cta-bg" className="page-hero-bg" alt="" widths={[768, 1280, 1920, 2500]} sizes="100vw" width={2500} height={1667} priority />
        <div className="page-hero-overlay" />
        <div className="container page-hero-content">
          <nav className="faq-crumbs hero-eyebrow" aria-label="Breadcrumb">
            <Link to="/reference-library" data-testid="reference-detail-crumb">Reference Library</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link to={`/reference-library/${meta.slug}`} data-testid="reference-detail-crumb-module">{meta.title}</Link>
          </nav>
          <h1 className="faq-detail-title hero-title">{entry.title}</h1>
          {entry.shortSummary ? (
            <p className="faq-detail-lede" data-testid="reference-detail-lede">{entry.shortSummary}</p>
          ) : null}
          <div className="dt-hero-meta">
            {entry.updatedDate ? (
              <span><Calendar size={14} aria-hidden="true" /> Updated {formatDate(entry.updatedDate)}</span>
            ) : null}
            <span><Clock size={14} aria-hidden="true" /> {minutes} min read</span>
          </div>
        </div>
      </section>

      <section className="dt-section">
        <div className="container">
          <div className="dt-shell">
            {body}
            <aside className="dt-rail">
              <div className="dt-facts" data-testid="reference-facts">
                <div className="dt-facts-title">At a glance</div>
                <div className="dt-facts-row">
                  <span className="dt-facts-k">Collection</span>
                  <span className="dt-facts-v">{meta.title}</span>
                </div>
                {entry.category ? (
                  <div className="dt-facts-row">
                    <span className="dt-facts-k">Topic</span>
                    <span className="dt-facts-v">{entry.category}</span>
                  </div>
                ) : null}
                <div className="dt-facts-row">
                  <span className="dt-facts-k">Source</span>
                  <span className="dt-facts-v">
                    {excerptOnly ? (
                      <span className="dt-badge dt-badge--warm">Excerpt only</span>
                    ) : (
                      <span className="dt-badge">Public source</span>
                    )}
                  </span>
                </div>
                {entry.updatedDate ? (
                  <div className="dt-facts-row">
                    <span className="dt-facts-k">Updated</span>
                    <span className="dt-facts-v">{formatDate(entry.updatedDate)}</span>
                  </div>
                ) : null}
              </div>
              <DetailToc toc={article.toc} activeId={activeId} />
            </aside>
          </div>
        </div>
      </section>

      <section className="faq-cta">
        <div className="container faq-cta-inner">
          <h2 className="faq-cta-title">Building somewhere specific?</h2>
          <p className="faq-cta-sub">Tell us your city and lot and we'll walk you through the codes and rules that apply.</p>
          <button type="button" className="btn btn-primary" onClick={() => open()} data-testid="reference-detail-cta-contact">
            Start the conversation
          </button>
        </div>
      </section>
    </main>
  );
}
