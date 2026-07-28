import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { faqDataset } from "@/data/faq";
import { pageMetadata } from "@/seo/metadata";
import { collectionJsonLd, breadcrumbJsonLd } from "@/seo/jsonldBuilders";
import { JsonLd } from "@/seo/JsonLd";
import { CTA } from "@/cta";

export const dynamicParams = false;

export function generateStaticParams() {
  return faqDataset.topics().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = faqDataset.getTopic(slug);
  if (!topic) return {};
  return pageMetadata({
    title: topic.title,
    description: topic.description,
    canonical: `/faq/topics/${topic.slug}`,
  });
}

export default async function FaqTopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = faqDataset.getTopic(slug);
  if (!topic) notFound();

  const path = `/faq/topics/${topic.slug}`;

  return (
    <main className="page faq-page faq-topic">
      <JsonLd
        data={[
          collectionJsonLd({
            name: topic.title,
            description: topic.description,
            url: path,
          }),
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "FAQ", url: "/faq" },
            { name: topic.title, url: path },
          ]),
        ]}
      />

      <section className="page-hero faq-hero">
        <div className="page-hero-overlay" />
        <div className="container page-hero-content">
          <nav className="faq-crumbs hero-eyebrow" aria-label="Breadcrumb">
            <Link href="/faq" data-testid="faq-crumb-home">FAQ</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>{topic.title}</span>
          </nav>
          <h1 className="faq-hero-title hero-title">{topic.title}</h1>
          <p className="page-hero-sub hero-subtitle">{topic.description}</p>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--color-bg)" }}>
        <div className="container container-narrow">
          <div className="dt-back-row">
            <Link href="/faq" className="dt-back dt-back--top" data-testid="faq-topic-back">
              <ArrowLeft size={14} aria-hidden="true" />
              FAQ
            </Link>
          </div>
          <ul className="faq-list" data-testid="faq-topic-list">
            {topic.items.map((i) => (
              <li key={i.slug}>
                <Link href={`/faq/${i.slug}`} data-testid={`faq-topic-q-${i.slug}`}>
                  <span>{i.question}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/faq" className="faq-back" data-testid="faq-topic-all">
            All questions <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <CTA />
    </main>
  );
}
