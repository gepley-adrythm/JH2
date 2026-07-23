import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { guideGroups } from "@/data/guides";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { pageMetadata } from "@/seo/metadata";
import { collectionJsonLd } from "@/seo/jsonldBuilders";
import { JsonLd } from "@/seo/JsonLd";
import { ContactCta } from "@/components/ContactCta";

const INTRO =
  "In-depth guides that walk the whole journey end to end: how to build a custom home in Arizona, construction financing, the pre-construction permit layer, building on rural land, choosing a builder, and a complete guide for every city we build in.";

export const metadata = pageMetadata({
  title: "Custom Home Building Guides",
  description: INTRO,
  canonical: "/guides",
});

export default function GuidesIndexPage() {
  const groups = guideGroups();

  return (
    <main className="page faq-page guides-page">
      <JsonLd
        data={collectionJsonLd({ name: "Custom Home Building Guides", description: INTRO, url: "/guides" })}
      />

      <section className="page-hero" style={{ alignItems: "center", minHeight: "65vh" }}>
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
        <div className="page-hero-overlay" style={{ background: "linear-gradient(180deg, rgba(10,12,14,0.25) 0%, rgba(10,12,14,0.45) 100%)" }} />
        <div className="container page-hero-content" style={{ textAlign: "center", maxWidth: "100%" }}>
          <h1 className="page-hero-title hero-title" style={{ textTransform: "uppercase" }}>Guides</h1>
        </div>
      </section>

      <div className="container" style={{ paddingTop: "clamp(20px, 3vw, 32px)" }}>
        <Link href="/resources" className="btn btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          ← Resources
        </Link>
      </div>

      <section className="lib-hub section-pad">
        <div className="container">
          {groups.map((g) => (
            <div key={g.label} className="lib-group" data-testid={`guides-group-${g.label.replace(/\s+/g, "-").toLowerCase()}`}>
              <div className="lib-group-label" style={{ fontSize: "20px" }}>{g.label}</div>
              <div className="lib-grid">
                {g.guides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
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
          <ContactCta testid="guides-cta-contact">Start the conversation</ContactCta>
        </div>
      </section>
    </main>
  );
}
