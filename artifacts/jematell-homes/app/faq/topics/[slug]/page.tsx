import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { faqDataset } from "@/data/faq";
import { pageMetadata } from "@/seo/metadata";
import { collectionJsonLd, breadcrumbJsonLd } from "@/seo/jsonldBuilders";
import { JsonLd } from "@/seo/JsonLd";
import { CTA } from "@/cta";
import { ResponsiveImage } from "@/components/ResponsiveImage";

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

      <section className="page-hero" style={{ alignItems: "center", minHeight: "65vh" }}>
        <ResponsiveImage
          name="faq-hero"
          className="page-hero-bg"
          alt=""
          widths={[768, 1280, 1600]}
          sizes="100vw"
          width={1600}
          height={1066}
          priority
        />
        <div className="page-hero-overlay" style={{ background: "linear-gradient(180deg, rgba(10,12,14,0.25) 0%, rgba(10,12,14,0.45) 100%)" }} />
        <div className="container page-hero-content" style={{ textAlign: "center", maxWidth: "100%" }}>
          <h1 className="page-hero-title" style={{ textTransform: "uppercase" }}>{topic.title}</h1>
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
