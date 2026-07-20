import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, ChevronRight } from "lucide-react";
import { faqDataset } from "@/data/faq";
import { pageMetadata } from "@/seo/metadata";
import { faqPageJsonLd, breadcrumbJsonLd } from "@/seo/jsonldBuilders";
import { JsonLd } from "@/seo/JsonLd";
import { ContactCta } from "@/components/ContactCta";

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
          faqPageJsonLd({
            url: path,
            items: topic.items.map((i) => ({
              question: i.question,
              shortAnswer: i.shortAnswer,
            })),
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

      <section className="faq-cta">
        <div className="container faq-cta-inner">
          <h2 className="faq-cta-title">Still have a question?</h2>
          <p className="faq-cta-sub">
            Tell us about your project and we'll get back to you personally.
          </p>
          <ContactCta testid="faq-topic-cta-contact">Start the conversation</ContactCta>
        </div>
      </section>
    </main>
  );
}
