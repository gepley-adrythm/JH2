import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { Seo } from "../seo/seo";

const INTRO =
  "Everything we have learned building custom homes across Scottsdale, Rio Verde, and the Phoenix metro, written down and kept current. Real cost ranges, the code edition each city actually enforces, what it takes to make a raw lot buildable, and the answers most builders leave you to find on your own.";

interface ResourceSection {
  title: string;
  description: string;
  /** When present the card is live and links here; otherwise it renders as an upcoming section. */
  href?: string;
  cta: string;
}

// FAQ and Blog are live today. Guides, Glossary, and the Reference Library are
// being populated from the content engine (~600 pages); flip each `href` on as
// that section ships onto the site.
const SECTIONS: ResourceSection[] = [
  {
    title: "FAQ",
    description:
      "Straight answers to the questions people actually ask before they build — timelines, budgets, lots, permits, water, design, and what it is like to work with a family-owned builder.",
    href: "/faq",
    cta: "Browse the FAQ",
  },
  {
    title: "Guides",
    description:
      "In-depth guides that walk the whole journey end to end: how to build a custom home in Arizona, construction financing, the pre-construction permit layer, building on rural land, and a complete guide for every city we build in.",
    cta: "Coming soon",
  },
  {
    title: "Glossary",
    description:
      "Clear definitions for the terms that come up on a custom build — allowances, draw schedules, setbacks, NAOS, the ROC, post-tension slabs, and dozens more.",
    cta: "Coming soon",
  },
  {
    title: "Reference Library",
    description:
      "The source material, in plain language: adopted building codes for every city we serve, Arizona building-law statutes section by section, the residential code explained, and the design guidelines of the guard-gated communities.",
    cta: "Coming soon",
  },
  {
    title: "Blog",
    description:
      "Project stories, updates, and a closer look at the custom homes we are building across Arizona.",
    href: "/blog",
    cta: "Read the blog",
  },
];

export default function Resources() {
  return (
    <main className="page resources-page">
      <Seo
        title="Resources"
        description={INTRO}
        canonical="/resources"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Resources",
          description: INTRO,
        }}
      />

      <section className="page-hero">
        <ResponsiveImage
          name="spec-home"
          className="page-hero-bg"
          alt=""
          widths={[768, 1280, 1600]}
          sizes="100vw"
          width={1600}
          height={1066}
          priority
        />
        <div className="page-hero-overlay" />
        <div className="container page-hero-content">
          <p className="page-hero-eyebrow">The Jematell Homes resource library</p>
          <h1 className="page-hero-title">Resources</h1>
          <p className="page-hero-sub">{INTRO}</p>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--color-cream, #ece9e2)" }}>
        <div className="container">
          <div className="faq-card-grid" data-testid="resources-grid">
            {SECTIONS.map((s) =>
              s.href ? (
                <Link
                  key={s.title}
                  to={s.href}
                  className="faq-q-card"
                  data-testid={`resource-${s.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <span className="faq-q-card-q">{s.title}</span>
                  <span className="faq-category-desc">{s.description}</span>
                  <span className="faq-q-card-more">
                    {s.cta} <ArrowRight size={15} aria-hidden="true" />
                  </span>
                </Link>
              ) : (
                <div
                  key={s.title}
                  className="faq-q-card"
                  aria-disabled="true"
                  style={{ opacity: 0.72 }}
                  data-testid={`resource-${s.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <span className="faq-q-card-q">{s.title}</span>
                  <span className="faq-category-desc">{s.description}</span>
                  <span className="faq-q-card-more">{s.cta}</span>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
