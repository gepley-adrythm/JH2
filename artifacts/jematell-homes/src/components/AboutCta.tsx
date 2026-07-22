"use client";
import { ArrowRight } from "lucide-react";
import { ResponsiveImage } from "./ResponsiveImage";
import { useContactForm } from "../contact-form";

// Standalone version of the site CTA (normally rendered inside ContentPage) so
// the redesigned, custom-built About page can keep the existing "Let's Build
// Your Dream Home" call to action, wired to the same contact-form modal.
function renderCtaTitle(title: string) {
  const words = title.trim().split(/\s+/);
  if (words.length < 2) return title;
  const mid = Math.ceil(words.length / 2);
  const first = words.slice(0, mid).join(" ");
  const second = words.slice(mid).join(" ");
  return (
    <>
      <span className="cta-title-line">{first}</span>
      <span className="cta-title-line cta-title-line--accent">{second}</span>
    </>
  );
}

export function AboutCta() {
  const { open } = useContactForm();
  return (
    <section className="cta">
      <ResponsiveImage
        name="cta-bg"
        className="cta-bg"
        alt="Desert landscape"
        widths={[768, 1280, 1920, 2500]}
        sizes="100vw"
        width={2500}
        height={1667}
      />
      <div className="cta-overlay" />
      <div className="container">
        <div
          className="cta-grid"
          style={{ gridTemplateColumns: "1fr", textAlign: "center", maxWidth: 760, marginInline: "auto" }}
        >
          <div className="cta-content">
            <span className="eyebrow" style={{ color: "var(--color-bone)" }}>Build With Us</span>
            <h2 className="heading-lg cta-title" style={{ textTransform: "uppercase" }}>
              {renderCtaTitle("Let's Build Your Dream Home")}
            </h2>
            <p style={{ marginInline: "auto" }}>
              Relax while we manage every detail, throughout the entire process. Tell us about your vision, and
              we&apos;ll be in touch to schedule a consultation.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              data-testid="page-cta"
              onClick={open}
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
