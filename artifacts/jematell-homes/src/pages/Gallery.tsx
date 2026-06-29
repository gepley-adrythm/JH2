import React from "react";
import { Link } from "react-router-dom";
import { m, useReducedMotion } from "framer-motion";
import { pages } from "../data/pages";
import { GALLERY_PROJECTS } from "../data/galleryProjects";
import { Seo } from "../seo/seo";
import { collectionJsonLd } from "../seo/jsonld";

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
      <section className="page-hero page-hero-short" style={{ alignItems: "center" }}>
        <picture>
          <source srcSet="/images/gallery-hero.webp" type="image/webp" />
          <img src="/images/gallery-hero.jpg" alt="" className="page-hero-bg" loading="eager" />
        </picture>
        <div className="page-hero-overlay" style={{ background: "linear-gradient(180deg, rgba(10,12,14,0.55) 0%, rgba(10,12,14,0.72) 100%)" }} />
        <div className="container page-hero-content" style={{ textAlign: "center", maxWidth: "100%" }}>
          <h1 className="page-hero-title">OUR PORTFOLIO</h1>
        </div>
      </section>
      <section className="section-pad" style={{ background: "var(--color-bg)", paddingTop: "48px" }}>
        <div className="gallery-page-inner">
          <div className="gallery-grid">
            {GALLERY_PROJECTS.map((proj, i) => {
              const img = proj.thumb ?? firstImage(`gallery_${proj.slug}`);
              return (
                <m.div
                  key={proj.slug}
                  className="gallery-card"
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                >
                  <Link to={`/gallery/${proj.slug}`} data-testid={`gallery-card-${proj.slug}`}>
                    <div className={`gallery-card-media${img ? "" : " gallery-card-placeholder"}`}>
                      {img && <img src={img} alt={proj.title} loading="lazy" />}
                      <div className="gallery-card-overlay">
                        <h2 className="gallery-card-title">{proj.title}</h2>
                      </div>
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
