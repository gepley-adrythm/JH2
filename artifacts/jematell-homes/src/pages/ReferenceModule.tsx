import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { getReferenceModule, referencesByCategory } from "../data/reference";
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
          <nav className="faq-crumbs hero-eyebrow" aria-label="Breadcrumb">
            <Link to="/reference-library" data-testid="reference-module-crumb">Reference Library</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>{meta.title}</span>
          </nav>
          <h1 className="faq-hero-title hero-title">{meta.title}</h1>
          <p className="page-hero-sub hero-subtitle">{meta.description}</p>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--color-cream, #ece9e2)" }}>
        <div className="container">
          {groups.map((g) => (
            <div key={g.category} className="faq-category" data-testid={`reference-category-${g.category}`}>
              {g.category ? <h2 className="faq-category-title">{g.category}</h2> : null}
              <div className="faq-card-grid">
                {g.entries.map((e) => (
                  <Link
                    key={e.slug}
                    to={`/reference-library/${e.module}/${e.slug}`}
                    className="faq-q-card"
                    data-testid={`reference-entry-${e.slug}`}
                  >
                    <span className="faq-q-card-q">{e.title}</span>
                    <span className="faq-category-desc">{e.shortSummary}</span>
                    <span className="faq-q-card-more">
                      Read <ArrowRight size={15} aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <Link to="/reference-library" className="faq-back" data-testid="reference-module-all">
            All modules <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="faq-cta">
        <div className="container faq-cta-inner">
          <h2 className="faq-cta-title">Ready to talk it through?</h2>
          <p className="faq-cta-sub">
            Every build starts with a conversation. Tell us what you have in mind.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => open()}
            data-testid="reference-module-cta-contact"
          >
            Start the conversation
          </button>
        </div>
      </section>
    </main>
  );
}
