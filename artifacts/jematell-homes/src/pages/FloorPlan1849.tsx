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
          description="The Jematell Homes 1849 sq ft floor plan — view full architectural drawings, all four elevations, and photos of the completed home."
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
            <Link to="/floor-plans" className="fp1849-back" data-testid="fp1849-back">
              <ArrowLeft size={14} /> Floor Plans
            </Link>
            <h1 className="page-hero-title hero-title">1849 Floor Plan</h1>
          </div>
        </section>

        <section className="section-pad fp1849-plan-section">
          <div className="container">
            <m.div className="page-section-head centered" {...FADE_IN}>
              <span className="eyebrow">Plans &amp; Elevations</span>
              <h2 className="heading-lg">Floor Plan &amp; Elevations</h2>
              <p className="fp1849-plan-lead">
                Full architectural drawings including all four elevations, floor plan, and roof plan.
              </p>
            </m.div>
            <m.div className="fp1849-pdf-wrap" {...FADE_IN}>
              <a
                href="/plans/1849-floor-plan.pdf"
                download
                className="btn btn-secondary fp1849-download"
                data-testid="fp1849-download"
              >
                <Download size={16} /> Download PDF
              </a>
              <div className="fp1849-pdf-embed">
                <object
                  data="/plans/1849-floor-plan.pdf"
                  type="application/pdf"
                  className="fp1849-pdf-object"
                  aria-label="1849 floor plan and elevations PDF"
                >
                  <p className="fp1849-pdf-fallback">
                    PDF preview not available in this browser.{" "}
                    <a href="/plans/1849-floor-plan.pdf" download>Download the PDF</a>.
                  </p>
                </object>
              </div>
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
