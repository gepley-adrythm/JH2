"use client";
import { m } from "framer-motion";
import Link from "next/link";
import { EASE_OUT_EXPO, FADE_IN_UP_PROPS } from "../motion";
import { GALLERY_PROJECTS } from "../data/galleryProjects";

/**
 * FeaturedProjects: moved verbatim out of src/sections.tsx. It is the one home
 * section that ContentPage (/custom-homes) also renders; keeping it in its own
 * module means content routes do not pull the rest of the home sections
 * (Hero/About/Process/Reviews) into their route JS. sections.tsx re-exports it
 * so the home page import is unchanged.
 */

// Hardcoded (not sourced from the full clone-data/pages.json — that dataset
// is large and only meant to be pulled into route-level lazy chunks, never
// the eagerly-loaded homepage bundle).
const FEATURED_PROJECT_IMAGES: Record<string, string> = {
  crist: "/images/gallery/crist/10-DSC05808.jpg",
  "modern-farmhouse": "/images/gallery/modern-farmhouse/kitchen-hero.jpg",
  "rio-verde-farmhouse": "/images/gallery/rio-verde-farmhouse/kitchen-hero.jpg",
};

const FEATURED_PROJECT_SLUGS = ["crist", "modern-farmhouse", "rio-verde-farmhouse"];

export function FeaturedProjects() {
  const projects = FEATURED_PROJECT_SLUGS.map((slug) => {
    const proj = GALLERY_PROJECTS.find((p) => p.slug === slug);
    if (!proj) return null;
    return { ...proj, image: FEATURED_PROJECT_IMAGES[slug] ?? "" };
  }).filter((p): p is NonNullable<typeof p> => p !== null);

  return (
    <section className="featured-projects section-pad">
      <div className="container">
        <m.div {...FADE_IN_UP_PROPS}>
          <h2 className="heading-md featured-projects-heading" style={{ fontSize: '55px', textTransform: 'uppercase' }}>CUSTOM Homes We've Built</h2>
        </m.div>
        <div className="gallery-grid featured-projects-grid">
          {projects.map((proj, i) => (
            <m.div
              key={proj.slug}
              className="gallery-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: EASE_OUT_EXPO }}
            >
              <Link href={`/gallery/${proj.slug}`} data-testid={`featured-project-${proj.slug}`}>
                <div className={`gallery-card-media${proj.image ? "" : " gallery-card-placeholder"}`}>
                  {proj.image && <img src={proj.image} alt={proj.title} loading="lazy" />}
                  <div className="gallery-card-overlay">
                    <h3 className="gallery-card-title">{proj.title}</h3>
                  </div>
                </div>
                <div className="gallery-card-meta">
                  <div className="gallery-card-text">
                    <span className="gallery-card-sub">{proj.meta}</span>
                  </div>
                  <span className="gallery-card-arrow">→</span>
                </div>
              </Link>
            </m.div>
          ))}
        </div>
        <m.div className="featured-projects-cta" {...FADE_IN_UP_PROPS}>
          <Link href="/gallery" className="btn btn-primary" data-testid="link-view-full-gallery">
            View Full Gallery
          </Link>
        </m.div>
      </div>
    </section>
  );
}
