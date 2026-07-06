import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { getReferenceModule, referencesByCategory, moduleCount } from "../data/reference";
import { useContactForm } from "../contact-form";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { Seo } from "../seo/seo";
import { collectionJsonLd, breadcrumbJsonLd } from "../seo/jsonld";
import NotFound from "./not-found";

export default function ReferenceModule() {
  const { module } = useParams();
  const { open } = useContactForm();

  const meta = useMemo(() => (module ? getReferenceModule(module) : undefined), [module]);
  const groups = useMemo(() => (module ? referencesByCategory(module) : []), [module]);

  if (!meta) return <NotFound />;

  const path = `/reference-library/${meta.slug}`;
  const count = moduleCount(meta.slug);
  const crumbs = [
    { name: "Home", url: "/" },
    { name: "Reference Library", url: "/reference-library" },
    { name: meta.title, url: path },
  ];

  return (
    <main className="page faq-page reference-page">
      <Seo
        title={meta.title}
        description={meta.description}
        canonical={path}
        jsonLd={[
          collectionJsonLd({ name: meta.title, description: meta.description, url: path }),
          breadcrumbJsonLd(crumbs),
        ]}
      />

      <section className="page-hero faq-hero">
        <ResponsiveImage name="spec-home" className="page-hero-bg" alt="" widths={[768, 1280, 1600]} sizes="100vw" width={1600} height={1066} priority />
        <div className="page-hero-overlay" />
        <div className="container page-hero-content">
          <nav className="faq-crumbs hero-eyebrow" aria-label="Breadcrumb">
            <Link to="/reference-library" data-testid="reference-module-crumb">Reference Library</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>{count} entries</span>
          </nav>
          <h1 className="page-hero-title" style={{ textTransform: "uppercase" }}>{meta.title}</h1>
          <p className="page-hero-sub hero-subtitle">{meta.description}</p>
        </div>
      </section>

      <section className="lib-hub section-pad">
        <div className="container">
          {groups.map((g) => (
            <div key={g.category || "all"} className="lib-group" data-testid={`reference-category-${g.category}`}>
              {g.category ? <div className="lib-group-label">{g.category}</div> : null}
              <div className="lib-grid">
                {g.entries.map((e) => (
                  <Link
                    key={e.slug}
                    to={`/reference-library/${e.module}/${e.slug}`}
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

          <Link to="/reference-library" className="dt-back" data-testid="reference-module-all">
            All collections <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="faq-cta">
        <div className="container faq-cta-inner">
          <h2 className="faq-cta-title">Building somewhere specific?</h2>
          <p className="faq-cta-sub">Tell us your city and lot and we'll walk you through the codes and rules that apply.</p>
          <button type="button" className="btn btn-primary" onClick={() => open()} data-testid="reference-module-cta-contact">
            Start the conversation
          </button>
        </div>
      </section>
    </main>
  );
}
