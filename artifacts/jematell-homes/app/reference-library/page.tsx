import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { REFERENCE_MODULES, moduleCount } from "@/data/reference";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { pageMetadata } from "@/seo/metadata";
import { collectionJsonLd } from "@/seo/jsonldBuilders";
import { JsonLd } from "@/seo/JsonLd";
import { ContactCta } from "@/components/ContactCta";

const INTRO =
  "The source material behind every answer, in plain language: the adopted building codes for each city we serve, the Arizona statutes that govern a build, the residential code explained section by section, and the design guidelines of the guard-gated communities.";

export const metadata = pageMetadata({
  title: "Reference Library",
  description: INTRO,
  canonical: "/reference-library",
});

export default function ReferenceIndexPage() {
  return (
    <main className="page faq-page reference-page">
      <JsonLd
        data={collectionJsonLd({ name: "Reference Library", description: INTRO, url: "/reference-library" })}
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
          <span className="eyebrow" style={{ color: "var(--color-bone)" }}>The source material</span>
          <h1 className="page-hero-title" style={{ textTransform: "uppercase" }}>Reference Library</h1>
        </div>
      </section>

      <section className="lib-hub section-pad">
        <div className="container">
          <div className="lib-grid" data-testid="reference-modules">
            {REFERENCE_MODULES.map((m) => (
              <Link
                key={m.slug}
                href={`/reference-library/${m.slug}`}
                className="lib-card"
                data-testid={`reference-module-${m.slug}`}
              >
                <span className="lib-card-count">{moduleCount(m.slug)} entries</span>
                <h2 className="lib-card-title">{m.title}</h2>
                <p className="lib-card-desc">{m.description}</p>
                <span className="lib-card-more">
                  Browse <ArrowRight size={15} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-cta">
        <div className="container faq-cta-inner">
          <h2 className="faq-cta-title">Building somewhere specific?</h2>
          <p className="faq-cta-sub">
            Tell us your city and lot and we'll walk you through the codes and rules that apply.
          </p>
          <ContactCta testid="reference-cta-contact">Start the conversation</ContactCta>
        </div>
      </section>
    </main>
  );
}
