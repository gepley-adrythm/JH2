import { img } from "./layout";
import { ArrowRight } from "lucide-react";
import { useContactForm } from "./contact-form";

export function CTA() {
  const { open: openContactForm } = useContactForm();

  return (
    <section className="cta" id="contact">
      <img src={img("cta-bg.jpg")} className="cta-bg" alt="Desert landscape" />
      <div className="cta-overlay" />

      <div className="container">
        <div
          className="cta-grid"
          style={{ gridTemplateColumns: "1fr", textAlign: "center", maxWidth: 760, marginInline: "auto" }}
        >
          <div className="cta-content">
            <span className="eyebrow" style={{ color: 'var(--color-bone)' }}>Build With Us</span>
            <h2 className="heading-lg">Begin Your Build</h2>
            <p style={{ marginInline: "auto" }}>
              Relax while we manage every detail, throughout the entire process. Tell us about your vision, and we’ll be in touch to schedule a consultation.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              data-testid="cta-button"
              onClick={openContactForm}
              style={{ marginTop: 32 }}
            >
              Start Your Build <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
