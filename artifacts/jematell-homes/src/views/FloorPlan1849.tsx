"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { m, MotionConfig } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { CTA } from "../cta";

const FADE_IN = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 } as const,
  transition: { duration: 0.5 },
};

const DRAWINGS = [
  { label: "Floor Plan",  src: "/images/plans/1849-1.png",     alt: "1849 floor plan layout — 3 bed, 2 bath, 2-car garage" },
  { label: "Elevations",  src: "/images/plans/1849-elev-1.png", alt: "1849 floor plan — all four exterior elevations" },
];

const BASE = "https://images.squarespace-cdn.com/content/v1/6451acc5216e2b14e01b3bc3/";
const GALLERY_IMGS = [
  { id: "1ba888b8-0141-46cf-8039-3b4916c05f43", alt: "McCartney Spec 1849 — front exterior" },
  { id: "91065380-605d-47aa-8f28-98e69a43e6c3", alt: "McCartney Spec 1849 — front entry" },
  { id: "b338ed75-826c-49ff-a608-da8bcbffa985", alt: "McCartney Spec 1849 — living area" },
  { id: "2b8a6232-3cdd-420c-9f05-a7dcbeda89cb", alt: "McCartney Spec 1849 — interior" },
  { id: "8865b6bc-a6db-4e71-b4b6-b7c2304af9eb", alt: "McCartney Spec 1849 — kitchen" },
  { id: "8892f787-2762-4516-9eb0-9f43cd0d1e68", alt: "McCartney Spec 1849 — dining" },
  { id: "66be2a89-20de-43e7-a780-38ef5e0f8d7c", alt: "McCartney Spec 1849 — bedroom" },
  { id: "36d97099-ee7a-4c69-92cc-50dd527f691f", alt: "McCartney Spec 1849 — bathroom" },
  { id: "cc827fac-3a22-46de-a076-cd4d859a016f", alt: "McCartney Spec 1849 — hallway" },
  { id: "1aae17a6-fade-4007-83b9-310288e9e2fd", alt: "McCartney Spec 1849 — detail" },
].map((img) => ({ ...img, src: `${BASE}${img.id}` }));

export default function FloorPlan1849() {
  const [lightbox, setLightbox]     = useState<number | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const prev = useCallback(() =>
    setSlideIndex((i) => (i - 1 + GALLERY_IMGS.length) % GALLERY_IMGS.length), []);
  const next = useCallback(() =>
    setSlideIndex((i) => (i + 1) % GALLERY_IMGS.length), []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeLightbox(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox]);

  return (
    <MotionConfig reducedMotion="user">
      <main className="page" data-testid="page-floor-plan-1849">
        <section className="gallery-detail-hero">
          <picture className="gallery-detail-hero-picture">
            <img
              src="/images/1849-rendering-v2.png"
              alt="Rendered exterior elevation of the 1849 sq ft Jematell Homes floor plan"
              className="page-hero-bg"
              loading="eager"
              fetchPriority="high"
            />
          </picture>
          <div className="page-hero-overlay" style={{ background: "linear-gradient(to top, rgba(22,22,22,0.72) 0%, rgba(22,22,22,0.2) 60%, transparent 100%)" }} />
          <div className="container page-hero-content gallery-detail-hero-content">
            <h1 className="page-hero-title hero-title">1849 Floor Plan</h1>
          </div>
        </section>

        <div className="fp1849-breadcrumb">
          <div className="container">
            <Link href="/floor-plans" className="fp1849-back" data-testid="fp1849-back">
              <ArrowLeft size={14} /> Floor Plans
            </Link>
          </div>
        </div>

        <div className="fp1849-stats">
          <div className="container">
            <div className="fp1849-stats-inner">
              <div className="fp1849-stat">
                <span className="fp1849-stat-value">1,849</span>
                <span className="fp1849-stat-label">Sq Ft</span>
              </div>
              <div className="fp1849-stat-divider" />
              <div className="fp1849-stat">
                <span className="fp1849-stat-value">3</span>
                <span className="fp1849-stat-label">Bedrooms</span>
              </div>
              <div className="fp1849-stat-divider" />
              <div className="fp1849-stat">
                <span className="fp1849-stat-value">2</span>
                <span className="fp1849-stat-label">Bathrooms</span>
              </div>
              <div className="fp1849-stat-divider" />
              <div className="fp1849-stat">
                <span className="fp1849-stat-value">2-Car</span>
                <span className="fp1849-stat-label">Garage</span>
              </div>
            </div>
          </div>
        </div>

        <section className="section-pad fp1849-plan-section" style={{ paddingTop: "clamp(24px, 3vw, 40px)" }}>
          <div className="container">
            <m.div className="page-section-head centered" {...FADE_IN}>
              <h2 className="heading-lg" style={{ textTransform: "uppercase" }}>Floor Plan &amp; Elevations</h2>
            </m.div>
            <m.p className="fp1849-plan-desc" {...FADE_IN}>
              This thoughtfully designed single-level home combines modern comfort with efficient living. Two secondary bedrooms and a full bathroom are positioned near the front of the home, creating a private retreat for family or guests. The foyer opens into a spacious great room that flows into the dining area and well-appointed kitchen with a large island and walk-in pantry. A covered patio extends the living space outdoors, while the secluded owner's suite offers a spa-inspired bathroom, generous walk-in closet, and convenient access to the nearby laundry room.
            </m.p>
            <div className="fp1849-drawings-grid">
              {DRAWINGS.map((d, i) => (
                <m.figure
                  key={d.label}
                  className="fp1849-drawing-figure fp1849-drawing-clickable"
                  {...FADE_IN}
                  onClick={() => setLightbox(i)}
                  data-testid={`fp1849-drawing-${i}`}
                >
                  <span className="fp1849-drawing-label">
                    {d.label}
                    <span className="fp1849-zoom-hint" aria-hidden="true"><ZoomIn size={13} /> Enlarge</span>
                  </span>
                  <img src={d.src} alt={d.alt} className="fp1849-drawing-img" loading="lazy" />
                </m.figure>
              ))}
            </div>
          </div>
        </section>

        <section className="fp1849-gallery-section alt-bg">
          <div className="container" style={{ paddingTop: "clamp(40px, 6vw, 80px)" }}>
            <m.div className="page-section-head centered" {...FADE_IN}>
              <h2 className="heading-lg" style={{ textTransform: "uppercase" }}>See the Finished Home</h2>
              <p className="fp1849-gallery-body">The 1849 floor plan built in Casa Grande, AZ.</p>
            </m.div>
          </div>

          <m.div className="fp1849-carousel" {...FADE_IN}>
            <button
              className="fp1849-carousel-btn fp1849-carousel-prev"
              onClick={prev}
              aria-label="Previous photo"
              data-testid="fp1849-carousel-prev"
            >
              <ChevronLeft size={22} />
            </button>

            <div className="fp1849-carousel-track">
              {[0, 1, 2].map((offset) => {
                const img = GALLERY_IMGS[(slideIndex + offset) % GALLERY_IMGS.length];
                return (
                  <img
                    key={`${slideIndex}-${offset}`}
                    src={img.src}
                    alt={img.alt}
                    className="fp1849-carousel-img"
                    loading="lazy"
                  />
                );
              })}
            </div>

            <button
              className="fp1849-carousel-btn fp1849-carousel-next"
              onClick={next}
              aria-label="Next photo"
              data-testid="fp1849-carousel-next"
            >
              <ChevronRight size={22} />
            </button>

            <div className="fp1849-carousel-dots" role="tablist">
              {GALLERY_IMGS.map((_, i) => (
                <button
                  key={i}
                  className={`fp1849-carousel-dot${i === slideIndex ? " active" : ""}`}
                  onClick={() => setSlideIndex(i)}
                  aria-label={`Photo ${i + 1}`}
                  aria-selected={i === slideIndex}
                  role="tab"
                />
              ))}
            </div>
          </m.div>

          <div className="container" style={{ paddingBottom: "clamp(40px, 6vw, 80px)" }}>
            <m.div style={{ textAlign: "center", marginTop: "32px" }} {...FADE_IN}>
              <Link
                href="/gallery/mccartney-spec-1849"
                className="btn btn-primary"
                data-testid="fp1849-gallery-link"
              >
                View Full Gallery <ArrowRight size={16} />
              </Link>
            </m.div>
          </div>
        </section>

        <CTA bgImage="/images/fp1849-cta.jpg" />
      </main>
      {lightbox !== null && (
        <div
          className="fp1849-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={DRAWINGS[lightbox].label}
          data-testid="fp1849-lightbox"
          onClick={closeLightbox}
        >
          <button
            className="fp1849-lightbox-close"
            onClick={closeLightbox}
            aria-label="Close"
            data-testid="fp1849-lightbox-close"
          >
            <X size={22} />
          </button>
          <img
            src={DRAWINGS[lightbox].src}
            alt={DRAWINGS[lightbox].alt}
            className="fp1849-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </MotionConfig>
  );
}
