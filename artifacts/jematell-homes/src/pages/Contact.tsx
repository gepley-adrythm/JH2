import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { CTA } from "../cta";
import { Seo } from "../seo/seo";
import { breadcrumbJsonLd } from "../seo/jsonld";

export default function Contact() {
  return (
    <main className="page">
      <Seo
        title="Contact"
        description="Tell us about your vision and we'll be in touch to schedule a consultation. Call (602) 421-5576 or email info@jematellhomes.com."
        canonical="/contact"
        jsonLd={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ])}
      />
      <section className="page-hero page-hero-short" style={{ background: "var(--color-cream)" }}>
        <div className="container page-hero-content" style={{ textAlign: "center" }}>
          <span className="eyebrow page-hero-eyebrow" style={{ color: "var(--color-accent)" }}>Contact</span>
          <h1 className="page-hero-title" style={{ color: "var(--color-dark)" }}>
            Create the home of your dreams.
          </h1>
          <p className="page-hero-sub" style={{ color: "var(--color-text-muted)", maxWidth: 600, margin: "0 auto" }}>
            We're excited to hear about your ideas. Tell us about your vision and we'll be in touch to schedule a consultation.
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--color-bg)" }}>
        <div className="container">
          <div className="contact-info-grid">
            <a className="contact-info-card" href="tel:6024215576" data-testid="contact-phone">
              <Phone size={22} />
              <span className="ci-label">Call</span>
              <span className="ci-value">(602) 421-5576</span>
            </a>
            <a className="contact-info-card" href="mailto:info@jematellhomes.com" data-testid="contact-email">
              <Mail size={22} />
              <span className="ci-label">Email</span>
              <span className="ci-value">info@jematellhomes.com</span>
            </a>
            <div className="contact-info-card">
              <MapPin size={22} />
              <span className="ci-label">Visit</span>
              <span className="ci-value">
                8350 E Raintree Dr Ste 210<br />Scottsdale, AZ 85260
              </span>
            </div>
          </div>
          <p style={{ textAlign: "center", marginTop: 32, color: "var(--color-text-muted)", fontSize: 13 }}>
            ROC# 339367
          </p>
        </div>
      </section>

      <CTA />
    </main>
  );
}
