import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Calendar, Clock, BookOpen } from "lucide-react";
import { getGuide } from "../data/guides";
import { getReferenceByKey } from "../data/reference";
import { getGlossaryTerm } from "../data/glossary";
import { faqDataset } from "../data/faq";
import { useContactForm } from "../contact-form";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { Seo } from "../seo/seo";
import { articleJsonLd, breadcrumbJsonLd } from "../seo/jsonld";
import { annotateHeadings, readingTime, formatDate, prepareGuideBody } from "../lib/detail";
import { useReadingProgress } from "../lib/useReadingProgress";
import { DetailProgress, DetailToc, DetailMore, type MoreColumn } from "../components/DetailParts";
import NotFound from "./not-found";

export default function GuideDetail() {
  const { slug } = useParams();
  const { open } = useContactForm();

  const guide = useMemo(() => (slug ? getGuide(slug) : undefined), [slug]);
  const prepared = useMemo(() => (guide ? prepareGuideBody(guide.bodyHtml, guide.title) : ""), [guide]);
  const article = useMemo(() => annotateHeadings(prepared), [prepared]);
  const minutes = useMemo(() => readingTime(prepared), [prepared]);

  const relatedGuides = useMemo(
    () => (guide ? guide.relatedGuides.map(getGuide).filter((g): g is NonNullable<typeof g> => Boolean(g)).slice(0, 6) : []),
    [guide],
  );
  const relatedRefs = useMemo(
    () => (guide ? guide.relatedRefs.map(getReferenceByKey).filter((r): r is NonNullable<typeof r> => Boolean(r)).slice(0, 6) : []),
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

  const { progressRef, activeId } = useReadingProgress(article.toc);

  if (!guide) return <NotFound />;

  const path = `/guides/${guide.slug}`;
  const crumbs = [
    { name: "Home", url: "/" },
    { name: "Guides", url: "/guides" },
    { name: guide.title, url: path },
  ];

  const columns: MoreColumn[] = [
    { label: "Related questions", items: relatedFaqs.map((r) => ({ to: `/faq/${r.slug}`, label: r.question })) },
    { label: "Related guides", items: relatedGuides.map((r) => ({ to: `/guides/${r.slug}`, label: r.title })) },
    { label: "In the reference library", items: relatedRefs.map((r) => ({ to: `/reference-library/${r.module}/${r.slug}`, label: r.title })) },
    { label: "Related terms", items: relatedTerms.map((r) => ({ to: `/glossary/${r.slug}`, label: r.term })) },
  ];

  const body = (
    <div className="dt-main">
      <div className="dt-prose" data-testid="guide-body" dangerouslySetInnerHTML={{ __html: article.html }} />
      <DetailMore columns={columns} testid="guide-related" />
      <Link to="/guides" className="dt-back" data-testid="guide-detail-all">
        All guides <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </div>
  );

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

      <DetailProgress innerRef={progressRef} />

      <section className="page-hero faq-hero faq-detail-hero">
        <ResponsiveImage name="cta-bg" className="page-hero-bg" alt="" widths={[768, 1280, 1920, 2500]} sizes="100vw" width={2500} height={1667} priority />
        <div className="page-hero-overlay" />
        <div className="container page-hero-content">
          <nav className="faq-crumbs hero-eyebrow" aria-label="Breadcrumb">
            <Link to="/guides" data-testid="guide-detail-crumb">Guides</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>{guide.category || "Guide"}</span>
          </nav>
          <h1 className="faq-detail-title hero-title">{guide.title}</h1>
          {guide.summary ? (
            <p className="faq-detail-lede" data-testid="guide-detail-lede">{guide.summary}</p>
          ) : null}
          <div className="dt-hero-meta">
            {guide.updatedDate ? (
              <span><Calendar size={14} aria-hidden="true" /> Updated {formatDate(guide.updatedDate)}</span>
            ) : null}
            <span><Clock size={14} aria-hidden="true" /> {minutes} min read</span>
            {guide.sources?.length ? (
              <span><BookOpen size={14} aria-hidden="true" /> {guide.sources.length} sources</span>
            ) : null}
          </div>
        </div>
      </section>

      <section className="dt-section">
        <div className="container">
          {article.toc.length > 0 ? (
            <div className="dt-shell">
              {body}
              <aside className="dt-rail">
                <DetailToc toc={article.toc} activeId={activeId} />
              </aside>
            </div>
          ) : (
            <div style={{ maxWidth: 720, marginInline: "auto" }}>{body}</div>
          )}
        </div>
      </section>

      <section className="faq-cta">
        <div className="container faq-cta-inner">
          <h2 className="faq-cta-title">Ready to talk it through?</h2>
          <p className="faq-cta-sub">Every build starts with a conversation. Tell us what you have in mind.</p>
          <button type="button" className="btn btn-primary" onClick={() => open()} data-testid="guide-detail-cta-contact">
            Start the conversation
          </button>
        </div>
      </section>
    </main>
  );
}
