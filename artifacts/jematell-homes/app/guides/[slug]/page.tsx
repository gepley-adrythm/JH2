import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, ChevronRight, Calendar, Clock, BookOpen } from "lucide-react";
import { guides, getGuide } from "@/data/guides";
import { getReferenceByKey } from "@/data/reference";
import { getGlossaryTerm } from "@/data/glossary";
import { faqDataset } from "@/data/faq";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { pageMetadata } from "@/seo/metadata";
import { articleJsonLd, breadcrumbJsonLd } from "@/seo/jsonldBuilders";
import { JsonLd } from "@/seo/JsonLd";
import { annotateHeadings, readingTime, formatDate, prepareGuideBody } from "@/lib/detail";
import { DetailShell } from "@/components/DetailShell";
import { DetailMore, DetailDisclaimer, type MoreColumn } from "@/components/DetailParts";
import { ContactCta } from "@/components/ContactCta";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return pageMetadata({
    title: guide.title,
    description: guide.metaDescription || guide.summary,
    canonical: `/guides/${guide.slug}`,
  });
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const prepared = prepareGuideBody(guide.bodyHtml, guide.title);
  const article = annotateHeadings(prepared);
  const minutes = readingTime(prepared);

  const relatedGuides = guide.relatedGuides
    .map(getGuide)
    .filter((g): g is NonNullable<typeof g> => Boolean(g))
    .slice(0, 6);
  const relatedRefs = guide.relatedRefs
    .map(getReferenceByKey)
    .filter((r): r is NonNullable<typeof r> => Boolean(r))
    .slice(0, 6);
  const relatedFaqs = guide.relatedFaqs
    .map((s) => faqDataset.getItem(s))
    .filter((i): i is NonNullable<typeof i> => Boolean(i))
    .slice(0, 6);
  const relatedTerms = guide.relatedTerms
    .map(getGlossaryTerm)
    .filter((t): t is NonNullable<typeof t> => Boolean(t))
    .slice(0, 6);

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

  const hero = (
    <section className="page-hero faq-hero faq-detail-hero">
      <ResponsiveImage name="cta-bg" className="page-hero-bg" alt="" widths={[768, 1280, 1920, 2500]} sizes="100vw" width={2500} height={1667} priority />
      <div className="page-hero-overlay" />
      <div className="container page-hero-content">
        <nav className="faq-crumbs hero-eyebrow" aria-label="Breadcrumb">
          <Link href="/guides" data-testid="guide-detail-crumb">Guides</Link>
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
  );

  return (
    <main className="page faq-page faq-detail guide-detail">
      <JsonLd
        data={[
          articleJsonLd({ title: guide.title, description: guide.summary, url: path }),
          breadcrumbJsonLd(crumbs),
        ]}
      />

      <DetailShell toc={article.toc} hero={hero}>
        <div className="dt-main">
          <div className="dt-prose" data-testid="guide-body" dangerouslySetInnerHTML={{ __html: article.html }} />
          <DetailMore columns={columns} testid="guide-related" />
          <Link href="/guides" className="dt-back" data-testid="guide-detail-all">
            All guides <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <DetailDisclaimer />
        </div>
      </DetailShell>

      <section className="faq-cta">
        <div className="container faq-cta-inner">
          <h2 className="faq-cta-title">Ready to talk it through?</h2>
          <p className="faq-cta-sub">Every build starts with a conversation. Tell us what you have in mind.</p>
          <ContactCta testid="guide-detail-cta-contact">Start the conversation</ContactCta>
        </div>
      </section>
    </main>
  );
}
