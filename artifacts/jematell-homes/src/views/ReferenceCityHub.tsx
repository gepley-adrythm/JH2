import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight, MapPin } from "lucide-react";
import type { JurisdictionMeta, ReferenceEntry, ReferenceModuleMeta } from "@/data/reference";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { JsonLd } from "@/seo/JsonLd";
import { collectionJsonLd, breadcrumbJsonLd } from "@/seo/jsonldBuilders";
import { ContactCta } from "@/components/ContactCta";

/**
 * A city hub for the per-city building-codes collection: one page that gathers all of
 * a jurisdiction's spokes (adopted codes, permits, inspections, zoning, fees, special
 * topics) grouped in reading order. Reuses the Reference Library hub CSS (lib-hub /
 * lib-group / lib-grid / lib-card) so it matches the module index with no new styles.
 */
export function ReferenceCityHub({
  meta,
  jurisdiction,
  groups,
}: {
  meta: ReferenceModuleMeta;
  jurisdiction: JurisdictionMeta;
  groups: { category: string; entries: ReferenceEntry[] }[];
}) {
  const path = `/reference-library/${meta.slug}/${jurisdiction.slug}`;
  const count = groups.reduce((n, g) => n + g.entries.length, 0);
  const title = `${jurisdiction.name} Building Codes`;
  const crumbs = [
    { name: "Home", url: "/" },
    { name: "Reference Library", url: "/reference-library" },
    { name: meta.title, url: `/reference-library/${meta.slug}` },
    { name: jurisdiction.name, url: path },
  ];

  return (
    <main className="page faq-page reference-page">
      <JsonLd
        data={[
          collectionJsonLd({ name: title, description: jurisdiction.blurb, url: path }),
          breadcrumbJsonLd(crumbs),
        ]}
      />

      <section className="page-hero faq-hero">
        <ResponsiveImage name="spec-home" className="page-hero-bg" alt="" widths={[768, 1280, 1600]} sizes="100vw" width={1600} height={1066} priority />
        <div className="page-hero-overlay" />
        <div className="container page-hero-content">
          <nav className="faq-crumbs hero-eyebrow" aria-label="Breadcrumb">
            <Link href="/reference-library" data-testid="city-hub-crumb">Reference Library</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link href={`/reference-library/${meta.slug}`} data-testid="city-hub-crumb-module">{meta.title}</Link>
          </nav>
          <h1 className="page-hero-title" style={{ textTransform: "uppercase" }}>{title}</h1>
          <p className="page-hero-sub hero-subtitle">{jurisdiction.blurb}</p>
          <div className="dt-hero-meta">
            <span><MapPin size={14} aria-hidden="true" /> {jurisdiction.county}</span>
            <span>{count} {count === 1 ? "page" : "pages"}</span>
          </div>
        </div>
      </section>

      <section className="lib-hub section-pad">
        <div className="container">
          <div className="dt-back-row">
            <Link
              href={`/reference-library/${meta.slug}`}
              className="dt-back dt-back--top"
              data-testid="city-hub-back"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              {meta.title}
            </Link>
          </div>
          {groups.map((g) => (
            <div key={g.category || "all"} className="lib-group" data-testid={`city-category-${g.category}`}>
              {g.category ? <div className="lib-group-label">{g.category}</div> : null}
              <div className="lib-grid">
                {g.entries.map((e) => (
                  <Link
                    key={e.slug}
                    href={`/reference-library/${e.module}/${e.slug}`}
                    className="lib-card"
                    data-testid={`reference-entry-${e.slug}`}
                  >
                    <h3 className="lib-card-title">{e.title}</h3>
                    <p className="lib-card-desc">{e.shortSummary}</p>
                    <span className="lib-card-more">
                      Read the reference <ArrowRight size={15} aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <Link href={`/reference-library/${meta.slug}`} className="dt-back" data-testid="city-hub-all">
            All cities <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="faq-cta">
        <div className="container faq-cta-inner">
          <h2 className="faq-cta-title">Building in {jurisdiction.name}?</h2>
          <p className="faq-cta-sub">Tell us your lot and we'll walk you through the codes, permits, and fees that apply.</p>
          <ContactCta testid="city-hub-cta-contact">Start the conversation</ContactCta>
        </div>
      </section>
    </main>
  );
}
