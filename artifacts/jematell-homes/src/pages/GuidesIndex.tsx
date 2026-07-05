import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { guideGroups } from "../data/guides";
import { useContactForm } from "../contact-form";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { Seo } from "../seo/seo";
import { collectionJsonLd } from "../seo/jsonld";

const INTRO =
  "In-depth guides that walk the whole journey end to end: how to build a custom home in Arizona, construction financing, the pre-construction permit layer, building on rural land, choosing a builder, and a complete guide for every city we build in.";

export default function GuidesIndex() {
  const { open } = useContactForm();
  const groups = guideGroups();

  return (
    <main className="page faq-page guides-page">
      <Seo
        title="Custom Home Building Guides"
        description={INTRO}
        canonical="/guides"
        jsonLd={collectionJsonLd({ name: "Custom Home Building Guides", description: INTRO, url: "/guides" })}
      />

      <section className="page-hero faq-hero">
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
          <span className="eyebrow" style={{ color: "var(--color-bone)" }}>The complete guides</span>
          <h1 className="page-hero-title" style={{ textTransform: "uppercase" }}>Guides</h1>
        </div>
      </section>

      <section className="lib-hub section-pad">
        <div className="container">
          {groups.map((g) => (
            <div key={g.label} className="lib-group" data-testid={`guides-group-${g.label.replace(/\s+/g, "-").toLowerCase()}`}>
              <div className="lib-group-label">{g.label}</div>
              <div className="lib-grid">
                {g.guides.map((guide) => (
                  <Link
                    key={guide.slug}
                    to={`/guides/${guide.slug}`}
                    className="lib-card"
                    data-testid={`guide-${guide.slug}`}
                  >
                    <span className="lib-card-count">{guide.city ? "City guide" : "Pillar guide"}</span>
                    <h3 className="lib-card-title">{guide.city || guide.title}</h3>
                    <p className="lib-card-desc">{guide.summary}</p>
                    <span className="lib-card-more">
                      Read the guide <ArrowRight size={15} aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="faq-cta">
        <div className="container faq-cta-inner">
          <h2 className="faq-cta-title">Ready to start your build?</h2>
          <p className="faq-cta-sub">
            Tell us about your project and we'll help you take the first step.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => open()}
            data-testid="guides-cta-contact"
          >
            Start the conversation
          </button>
        </div>
      </section>
    </main>
  );
}
