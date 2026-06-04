import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { faqDataset } from "../data/faq";
import { useContactForm } from "../contact-form";
import { Seo } from "../seo/seo";
import { faqPageJsonLd, breadcrumbJsonLd } from "../seo/jsonld";
import NotFound from "./not-found";

export default function FaqTopic() {
  const { slug } = useParams();
  const { open } = useContactForm();
  const topic = useMemo(() => (slug ? faqDataset.getTopic(slug) : undefined), [slug]);

  if (!topic) return <NotFound />;

  const path = `/faq/topics/${topic.slug}`;

  return (
    <main className="page faq-page faq-topic">
      <Seo
        title={topic.title}
        description={topic.description}
        canonical={path}
        jsonLd={[
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
            <Link to="/faq" data-testid="faq-crumb-home">FAQ</Link>
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
                <Link to={`/faq/${i.slug}`} data-testid={`faq-topic-q-${i.slug}`}>
                  <span>{i.question}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/faq" className="faq-back" data-testid="faq-topic-all">
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
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => open()}
            data-testid="faq-topic-cta-contact"
          >
            Start the conversation
          </button>
        </div>
      </section>
    </main>
  );
}
