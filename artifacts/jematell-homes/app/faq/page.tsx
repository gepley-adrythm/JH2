import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { faqDataset } from "@/data/faq";
import { pageMetadata } from "@/seo/metadata";
import { faqPageJsonLd } from "@/seo/jsonld";
import { JsonLd } from "@/seo/JsonLd";
import { ContactCta } from "@/components/ContactCta";
import { FaqIndexClient, type FaqSearchItem } from "@/pages/FaqIndexClient";

const INTRO =
  "Straight answers about building a custom home in Arizona: timelines, budgets, lots, floor plans, and what it's like to work with a family-owned builder.";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description: INTRO,
  canonical: "/faq",
});

export default function FaqIndexPage() {
  const categories = faqDataset.categories();
  const topics = faqDataset.topics();
  const allItems = faqDataset.all();

  const searchItems: FaqSearchItem[] = allItems.map((i) => ({
    slug: i.slug,
    question: i.question,
    shortAnswer: i.shortAnswer,
    tags: i.tags,
  }));

  return (
    <main className="page faq-page">
      <JsonLd
        data={faqPageJsonLd({
          url: "/faq",
          items: allItems.map((i) => ({
            question: i.question,
            shortAnswer: i.shortAnswer,
          })),
        })}
      />

      <FaqIndexClient intro={INTRO} items={searchItems}>
        <section className="section-pad" style={{ background: "var(--color-cream, #ece9e2)" }}>
          <div className="container">
            {topics.length > 0 ? (
              <div className="faq-topics" data-testid="faq-topics">
                <h2 className="faq-section-title">Browse by topic</h2>
                <div className="faq-topic-chips">
                  {topics.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/faq/topics/${t.slug}`}
                      className="faq-topic-chip"
                      data-testid={`faq-topic-${t.slug}`}
                    >
                      {t.title}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            {categories.map((c) => (
              <div key={c.slug} className="faq-category" data-testid={`faq-category-${c.slug}`}>
                <h2 className="faq-category-title">{c.title}</h2>
                <p className="faq-category-desc">{c.description}</p>
                <div className="faq-card-grid">
                  {c.items.map((i) => (
                    <Link
                      key={i.slug}
                      href={`/faq/${i.slug}`}
                      className="faq-q-card"
                      data-testid={`faq-q-${i.slug}`}
                    >
                      <span className="faq-q-card-q">{i.question}</span>
                      <span className="faq-q-card-more">
                        Read answer <ArrowRight size={15} aria-hidden="true" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </FaqIndexClient>

      <section className="faq-cta">
        <div className="container faq-cta-inner">
          <h2 className="faq-cta-title">Still have a question?</h2>
          <p className="faq-cta-sub">
            Tell us about your project and we'll get back to you personally.
          </p>
          <ContactCta testid="faq-cta-contact">Start the conversation</ContactCta>
        </div>
      </section>
    </main>
  );
}
