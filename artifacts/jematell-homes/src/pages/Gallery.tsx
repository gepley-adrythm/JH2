import React from "react";
import { Link } from "react-router-dom";
import { m, useReducedMotion } from "framer-motion";
import { pages } from "../data/pages";
import { CRIST_AERIAL_JPG, CRIST_AERIAL_WEBP } from "../data/crist";
import { Seo } from "../seo/seo";
import { collectionJsonLd } from "../seo/jsonld";

const GALLERY_PROJECTS = [
  { slug: "modern-farmhouse",   title: "Modern Farmhouse",    meta: "Custom Home" },
  { slug: "rio-verde-farmhouse", title: "Rio Verde Farmhouse", meta: "Rio Verde · Custom Home" },
  { slug: "cave-creek",          title: "Cave Creek",          meta: "Cave Creek · Custom Home" },
  { slug: "rio-verde-rv",        title: "Rio Verde RV",        meta: "Rio Verde, AZ" },
  { slug: "twilight-house",      title: "Twilight House",      meta: "Custom Home" },
  { slug: "desert-retreat",      title: "Desert Retreat",      meta: "Custom Home" },
  { slug: "mccartney-spec-1849", title: "McCartney Spec 1849", meta: "Spec Home" },
  { slug: "mccartney-spec-1644", title: "McCartney Spec 1644", meta: "Spec Home" },
  { slug: "cozy-comfort",        title: "Cozy Comfort",        meta: "Custom Home" },
  { slug: "az-city-custom",      title: "AZ City Custom",      meta: "Custom Home" },
];

function firstImage(key: string): string {
  const p = pages[key];
  if (!p) return "";
  const img = p.blocks.find((b) => b.type === "img" && b.src);
  return img?.src || p.ogImage || "";
}

export default function Gallery() {
  const reduce = useReducedMotion();
  return (
    <main className="page">
      <Seo
        title="Gallery"
        description="A selection of custom and semi-custom homes Jematell Homes has built across Arizona, each one shaped by the land it sits on and the family that calls it home."
        canonical="/gallery"
        jsonLd={collectionJsonLd({
          name: "Gallery - Jematell Homes",
          description: "Custom homes built by Jematell Homes across Arizona.",
          url: "/gallery",
        })}
      />
      <section className="page-hero page-hero-short">
        <picture className="page-hero-bg" style={{ display: "contents" }}>
          <source srcSet="/images/gallery-hero.webp" type="image/webp" />
          <img src="/images/gallery-hero.jpg" alt="" className="page-hero-bg" loading="eager" />
        </picture>
        <div className="page-hero-overlay" style={{ background: "linear-gradient(180deg, rgba(10,12,14,0.55) 0%, rgba(10,12,14,0.72) 100%)" }} />
        <div className="container page-hero-content">
          <h1 className="page-hero-title">OUR PORTFOLIO</h1>
        </div>
      </section>
      <section className="section-pad" style={{ background: "var(--color-bg)", paddingTop: "48px" }}>
        <div className="container">

          <m.div
            className="gallery-featured"
            initial={reduce ? false : { opacity: 0, y: 32 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75 }}
          >
            <Link to="/gallery/crist" data-testid="gallery-featured-crist">
              <div className="gallery-featured-media">
                <picture>
                  <source srcSet={CRIST_AERIAL_WEBP} type="image/webp" />
                  <img src={CRIST_AERIAL_JPG} alt="Crist Residence aerial" loading="eager" />
                </picture>
                <div className="gallery-featured-overlay" />
              </div>
              <div className="gallery-featured-content">
                <span className="gallery-featured-eyebrow">Featured Project · 2026</span>
                <h2 className="gallery-featured-title">Crist Residence</h2>
                <div className="gallery-featured-meta">
                  <span>Rio Verde, AZ</span>
                  <span className="gallery-featured-dot" />
                  <span>56 Photographs</span>
                  <span className="gallery-featured-dot" />
                  <span>Custom Home</span>
                </div>
                <span className="gallery-featured-cta">View Project →</span>
              </div>
            </Link>
          </m.div>

          <div className="gallery-divider">
            <span className="gallery-divider-label">More Projects</span>
          </div>

          <div className="gallery-grid">
            {GALLERY_PROJECTS.map((proj, i) => {
              const img = firstImage(`gallery_${proj.slug}`);
              return (
                <m.div
                  key={proj.slug}
                  className={`gallery-card ${i % 5 === 0 ? "wide" : ""}`}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                >
                  <Link to={`/gallery/${proj.slug}`} data-testid={`gallery-card-${proj.slug}`}>
                    {img ? (
                      <div className="gallery-card-media">
                        <img src={img} alt={proj.title} loading="lazy" />
                      </div>
                    ) : (
                      <div className="gallery-card-media gallery-card-placeholder" />
                    )}
                    <div className="gallery-card-meta">
                      <div className="gallery-card-text">
                        <h2 className="gallery-card-title">{proj.title}</h2>
                        <span className="gallery-card-sub">{proj.meta}</span>
                      </div>
                      <span className="gallery-card-arrow">→</span>
                    </div>
                  </Link>
                </m.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
