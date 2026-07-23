import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ChevronRight, Clock } from "lucide-react";
import { glossaryTerms, getGlossaryTerm } from "@/data/glossary";
import { faqDataset } from "@/data/faq";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { pageMetadata } from "@/seo/metadata";
import { definedTermJsonLd, breadcrumbJsonLd } from "@/seo/jsonldBuilders";
import { JsonLd } from "@/seo/JsonLd";
import { annotateHeadings, readingTime } from "@/lib/detail";
import { DetailMore, DetailDisclaimer, type MoreColumn } from "@/components/DetailParts";
import { CTA } from "@/cta";

export const dynamicParams = false;

export function generateStaticParams() {
  return glossaryTerms.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const term = getGlossaryTerm(slug);
  if (!term) return {};
  return pageMetadata({
    title: term.term,
    description: term.metaDescription || term.shortDefinition,
    canonical: `/glossary/${term.slug}`,
  });
}

export default async function GlossaryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const term = getGlossaryTerm(slug);
  if (!term) notFound();

  const article = annotateHeadings(term.definitionHtml || "");
  const minutes = readingTime(term.definitionHtml || "");
  const relatedTerms = term.relatedTerms
    .map(getGlossaryTerm)
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const relatedFaqs = term.relatedFaqs
    .map((s) => faqDataset.getItem(s))
    .filter((i): i is NonNullable<typeof i> => Boolean(i));

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
      <JsonLd
        data={[
          definedTermJsonLd({ term: term.term, definition: term.shortDefinition, url: path }),
          breadcrumbJsonLd(crumbs),
        ]}
      />

      <section className="page-hero faq-hero faq-detail-hero page-hero-short">
        <ResponsiveImage name="cta-bg" className="page-hero-bg" alt="" widths={[768, 1280, 1920, 2500]} sizes="100vw" width={2500} height={1667} priority />
        <div className="page-hero-overlay" />
        <div className="container page-hero-content">
          <nav className="faq-crumbs hero-eyebrow" aria-label="Breadcrumb">
            <Link href="/glossary" data-testid="glossary-detail-crumb">Glossary</Link>
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
              <div className="dt-back-row">
                <Link href="/glossary" className="dt-back dt-back--top" data-testid="glossary-detail-back">
                  <ArrowLeft size={14} aria-hidden="true" />
                  Glossary
                </Link>
              </div>
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
                      <Link key={r.slug} href={`/glossary/${r.slug}`} className="dt-chip" data-testid={`glossary-related-${r.slug}`}>
                        {r.term}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}

              <DetailMore columns={columns} testid="glossary-related-faqs" />

              <Link href="/glossary" className="dt-back" data-testid="glossary-detail-all">
                All terms <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <DetailDisclaimer />
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
