import { Link } from "react-router-dom";
import { m, MotionConfig } from "framer-motion";
import { ArrowLeft, ArrowRight, Download, Images } from "lucide-react";
import { Seo } from "../seo/seo";
import { breadcrumbJsonLd } from "../seo/jsonld";

const FADE_IN = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 } as const,
  transition: { duration: 0.5 },
};

export default function FloorPlan1849() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="page" data-testid="page-floor-plan-1849">
        <Seo
          title="1849 Floor Plan"
          description="The Jematell Homes 1849 sq ft floor plan — 3 bed, 2 bath, 2-car garage. View full architectural drawings, all four elevations, and photos of the completed home."
          canonical="/floor-plans/1849"
          jsonLd={[
            breadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Floor Plans", url: "/floor-plans" },
              { name: "1849 Floor Plan", url: "/floor-plans/1849" },
            ]),
          ]}
        />

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
            <Link to="/floor-plans" className="fp1849-back" data-testid="fp1849-back">
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
              <h2 className="heading-lg">Floor Plan &amp; Elevations</h2>
            </m.div>
            <div className="fp1849-drawings-grid">
              <m.figure className="fp1849-drawing-figure" {...FADE_IN}>
                <span className="fp1849-drawing-label">Floor Plan</span>
                <img
                  src="/images/plans/1849-1.png"
                  alt="1849 floor plan layout — 3 bed, 2 bath, 2-car garage"
                  className="fp1849-drawing-img"
                  loading="lazy"
                />
              </m.figure>
              <m.figure className="fp1849-drawing-figure" {...FADE_IN}>
                <span className="fp1849-drawing-label">Elevations</span>
                <img
                  src="/images/plans/1849-elev-1.png"
                  alt="1849 floor plan — all four exterior elevations"
                  className="fp1849-drawing-img"
                  loading="lazy"
                />
              </m.figure>
            </div>
          </div>
        </section>

        <section className="section-pad fp1849-download-section">
          <div className="container">
            <m.div className="fp1849-download-wrap" {...FADE_IN}>
              <span className="eyebrow">Full Package</span>
              <h2 className="heading-lg">Download the Plans</h2>
              <p className="fp1849-download-body">
                All five sheets — floor plan, four elevations, and roof plan — in a single PDF.
              </p>
              <a
                href="/plans/1849-floor-plan.pdf"
                download
                className="btn btn-secondary fp1849-download"
                data-testid="fp1849-download"
              >
                <Download size={16} /> Download PDF
              </a>
            </m.div>
          </div>
        </section>

        <section className="section-pad fp1849-gallery-section alt-bg">
          <div className="container">
            <m.div className="fp1849-gallery-cta" {...FADE_IN}>
              <span className="fp1849-gallery-icon" aria-hidden="true">
                <Images size={36} />
              </span>
              <span className="eyebrow">Completed Build</span>
              <h2 className="heading-lg">See the Finished Home</h2>
              <p className="fp1849-gallery-body">
                Browse photos of the McCartney Spec — built on this exact plan in Casa Grande, AZ.
              </p>
              <Link
                to="/gallery/mccartney-spec-1849"
                className="btn btn-primary"
                data-testid="fp1849-gallery-link"
              >
                View Gallery <ArrowRight size={16} />
              </Link>
            </m.div>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}
