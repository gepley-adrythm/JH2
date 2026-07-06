import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Clock } from "lucide-react";
import { faqDataset, SERVICE_LINKS } from "../data/faq";
import { blogs } from "../data/blogs";
import { useContactForm } from "../contact-form";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { Seo } from "../seo/seo";
import { qaPageJsonLd, breadcrumbJsonLd } from "../seo/jsonld";
import { annotateHeadings, readingTime } from "../lib/detail";
import { useReadingProgress } from "../lib/useReadingProgress";
import { DetailProgress, DetailToc, DetailMore, type MoreColumn } from "../components/DetailParts";
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
  const article = useMemo(() => annotateHeadings(detail?.answerHtml || ""), [detail]);
  const minutes = useMemo(() => readingTime(detail?.answerHtml || detail?.answer || ""), [detail]);

  const { progressRef, activeId } = useReadingProgress(article.toc);

  if (!item || !detail) return <NotFound />;

  const path = `/faq/${detail.slug}`;
  const primaryTopic = (() => {
    for (const ts of detail.topicSlugs) {
      const t = faqDataset.getTopic(ts);
      if (t) return { slug: t.slug, title: t.title };
    }
    return null;
  })();
  const crumbs = [
    { name: "Home", url: "/" },
    { name: "FAQ", url: "/faq" },
    ...(primaryTopic ? [{ name: primaryTopic.title, url: `/faq/topics/${primaryTopic.slug}` }] : []),
    { name: detail.question, url: path },
  ];
  const services = detail.relatedServiceSlugs
    .map((s) => SERVICE_LINKS[s])
    .filter((s): s is { label: string; href: string } => Boolean(s));
  const pillar =
    detail.pillarBlogSlug && blogs[detail.pillarBlogSlug]
      ? { slug: detail.pillarBlogSlug, title: cleanTitle(blogs[detail.pillarBlogSlug].title) }
      : null;
  const paragraphs = detail.answer.split(/\n{2,}/).filter(Boolean);

  const columns: MoreColumn[] = [
    { label: "Related questions", items: related.map((r) => ({ to: `/faq/${r.slug}`, label: r.question })) },
    { label: "Related services", items: services.map((s) => ({ to: s.href, label: s.label })) },
    ...(pillar ? [{ label: "Go deeper", items: [{ to: `/blog/${pillar.slug}`, label: pillar.title }] }] : []),
  ];

  const body = (
    <div className="dt-main">
      {detail.shortAnswer ? (
        <div className="dt-answer-card" data-testid="faq-short-answer">
          <span className="dt-answer-card-label">The short answer</span>
          <p>{detail.shortAnswer}</p>
        </div>
      ) : null}
      <div className="dt-prose" data-testid="faq-answer">
        {detail.answerHtml ? (
          <div dangerouslySetInnerHTML={{ __html: article.html }} />
        ) : (
          paragraphs.map((p, i) => <p key={i}>{p}</p>)
        )}
      </div>
      <DetailMore columns={columns} testid="faq-related" />
      <Link to="/faq" className="dt-back" data-testid="faq-detail-all">
        All questions <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </div>
  );

  return (
    <main className="page faq-page faq-detail">
      <Seo
        title={detail.question}
        description={detail.metaDescription}
        canonical={path}
        jsonLd={[
          qaPageJsonLd({ url: path, question: detail.question, answer: detail.answer }),
          breadcrumbJsonLd(crumbs),
        ]}
      />

      <DetailProgress innerRef={progressRef} />

      <section className="page-hero faq-hero faq-detail-hero page-hero-short">
        <ResponsiveImage name="cta-bg" className="page-hero-bg" alt="" widths={[768, 1280, 1920, 2500]} sizes="100vw" width={2500} height={1667} priority />
        <div className="page-hero-overlay" />
        <div className="container page-hero-content">
          <nav className="faq-crumbs hero-eyebrow" aria-label="Breadcrumb">
            <Link to="/faq" data-testid="faq-detail-crumb">FAQ</Link>
            <ChevronRight size={14} aria-hidden="true" />
            {primaryTopic ? (
              <Link to={`/faq/topics/${primaryTopic.slug}`} data-testid="faq-detail-crumb-topic">{primaryTopic.title}</Link>
            ) : (
              <span>{detail.categoryTitle}</span>
            )}
          </nav>
          <h1 className="faq-detail-title hero-title">{detail.question}</h1>
          <div className="dt-hero-meta">
            <span><Clock size={14} aria-hidden="true" /> {minutes} min read</span>
          </div>
        </div>
      </section>

      <section className="dt-section">
        <div className="container">
          {article.toc.length > 1 ? (
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
          <button type="button" className="btn btn-primary" onClick={() => open()} data-testid="faq-detail-cta-contact">
            Start the conversation
          </button>
        </div>
      </section>
    </main>
  );
}
