import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, ChevronRight, Clock } from "lucide-react";
import { faqDataset, SERVICE_LINKS } from "@/data/faq";
import { blogs } from "@/data/blogs";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { pageMetadata } from "@/seo/metadata";
import { qaPageJsonLd, breadcrumbJsonLd } from "@/seo/jsonld";
import { JsonLd } from "@/seo/JsonLd";
import { annotateHeadings, readingTime } from "@/lib/detail";
import { DetailShell } from "@/components/DetailShell";
import { DetailMore, DetailDisclaimer, type MoreColumn } from "@/components/DetailParts";
import { ContactCta } from "@/components/ContactCta";

export const dynamicParams = false;

export function generateStaticParams() {
  return faqDataset.all().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = faqDataset.getItem(slug);
  if (!item) return {};
  const detail = faqDataset.toDetail(item);
  return pageMetadata({
    title: detail.question,
    description: detail.metaDescription,
    canonical: `/faq/${detail.slug}`,
  });
}

function cleanTitle(t: string) {
  return t.replace(/\s*[—–-]\s*Jematell Homes\s*$/i, "").trim();
}

export default async function FaqDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = faqDataset.getItem(slug);
  if (!item) notFound();
  const detail = faqDataset.toDetail(item);
  const related = faqDataset.related(item);
  const article = annotateHeadings(detail.answerHtml || "");
  const minutes = readingTime(detail.answerHtml || detail.answer || "");

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

  const hero = (
    <section className="page-hero faq-hero faq-detail-hero page-hero-short">
      <ResponsiveImage name="cta-bg" className="page-hero-bg" alt="" widths={[768, 1280, 1920, 2500]} sizes="100vw" width={2500} height={1667} priority />
      <div className="page-hero-overlay" />
      <div className="container page-hero-content">
        <nav className="faq-crumbs hero-eyebrow" aria-label="Breadcrumb">
          <Link href="/faq" data-testid="faq-detail-crumb">FAQ</Link>
          <ChevronRight size={14} aria-hidden="true" />
          {primaryTopic ? (
            <Link href={`/faq/topics/${primaryTopic.slug}`} data-testid="faq-detail-crumb-topic">{primaryTopic.title}</Link>
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
  );

  return (
    <main className="page faq-page faq-detail">
      <JsonLd
        data={[
          qaPageJsonLd({ url: path, question: detail.question, answer: detail.answer }),
          breadcrumbJsonLd(crumbs),
        ]}
      />

      <DetailShell toc={article.toc} hero={hero}>
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
          <Link href="/faq" className="dt-back" data-testid="faq-detail-all">
            All questions <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <DetailDisclaimer />
        </div>
      </DetailShell>

      <section className="faq-cta">
        <div className="container faq-cta-inner">
          <h2 className="faq-cta-title">Ready to talk it through?</h2>
          <p className="faq-cta-sub">Every build starts with a conversation. Tell us what you have in mind.</p>
          <ContactCta testid="faq-detail-cta-contact">Start the conversation</ContactCta>
        </div>
      </section>
    </main>
  );
}
