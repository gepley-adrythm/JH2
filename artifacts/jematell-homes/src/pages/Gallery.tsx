import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { pages } from "../data/pages";
import { Seo } from "../seo/seo";
import { collectionJsonLd } from "../seo/jsonld";

const GALLERY_PROJECTS = [
  { slug: "modern-farmhouse", title: "Modern Farmhouse" },
  { slug: "rio-verde-farmhouse", title: "Rio Verde Farmhouse" },
  { slug: "cave-creek", title: "Cave Creek" },
  { slug: "rio-verde-rv", title: "Rio Verde RV" },
  { slug: "desert-retreat", title: "Desert Retreat" },
  { slug: "cozy-comfort", title: "Cozy Comfort" },
  { slug: "twilight-house", title: "Twilight House" },
  { slug: "az-city-custom", title: "AZ City Custom" },
  { slug: "mccartney-spec-1644", title: "McCartney Spec 1644" },
  { slug: "mccartney-spec-1849", title: "McCartney Spec 1849" },
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
        description="A selection of custom and semi-custom homes Jematell Homes has built across Arizona — each one shaped by the land it sits on and the family that calls it home."
        canonical="/gallery"
        jsonLd={collectionJsonLd({
          name: "Gallery — Jematell Homes",
          description: "Custom homes built by Jematell Homes across Arizona.",
          url: "/gallery",
        })}
      />
      <section className="page-hero page-hero-short">
        <div className="page-hero-overlay" style={{ background: "linear-gradient(180deg, var(--color-bg) 0%, var(--color-cream) 100%)" }} />
        <div className="container page-hero-content">
          <span className="eyebrow page-hero-eyebrow" style={{ color: "var(--color-accent)" }}>Our Portfolio</span>
          <h1 className="page-hero-title" style={{ color: "var(--color-dark)" }}>Gallery</h1>
          <p className="page-hero-sub" style={{ color: "var(--color-text-muted)" }}>
            A selection of homes we've built across Arizona — each one shaped by
            the land it sits on and the family that calls it home.
          </p>
        </div>
      </section>
      <section className="section-pad" style={{ background: "var(--color-bg)" }}>
        <div className="container">
          <div className="gallery-grid">
            {GALLERY_PROJECTS.map((proj, i) => {
              const img = firstImage(`gallery_${proj.slug}`);
              return (
                <motion.div
                  key={proj.slug}
                  className={`gallery-card ${i % 5 === 0 ? "wide" : ""}`}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
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
                      <h2 className="gallery-card-title">{proj.title}</h2>
                      <span className="gallery-card-arrow">→</span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
