import React from "react";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
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

      <section className="contact-location section-pad" style={{ background: "var(--color-bg)" }}>
        <div className="container">
          <div className="contact-location-grid">
            <div className="cl-photo">
              <picture>
                <source srcSet="/images/office-1280.webp 1280w, /images/office-960.webp 960w, /images/office-640.webp 640w" sizes="(min-width: 1024px) 320px, (min-width: 640px) 40vw, 100vw" type="image/webp" />
                <img src="/images/office.jpg" alt="Jematell Homes office lobby" loading="lazy" />
              </picture>
            </div>

            <div className="cl-info">
              <div className="cl-row">
                <MapPin size={18} />
                <span>8350 E Raintree Dr Ste 210<br />Scottsdale, AZ 85260</span>
              </div>
              <div className="cl-row">
                <Phone size={18} />
                <a href="tel:6024215576">(602) 421-5576</a>
              </div>
              <div className="cl-row">
                <Mail size={18} />
                <a href="mailto:info@jematellhomes.com">info@jematellhomes.com</a>
              </div>
              <a
                href="https://maps.app.goo.gl/pSjm2LpxCc5CcTVD8"
                target="_blank"
                rel="noopener noreferrer"
                className="cl-maps-link"
                data-testid="contact-maps-link"
              >
                View on Google Maps <ArrowRight size={14} />
              </a>
              <p className="cl-roc">ROC# 339367</p>
            </div>

            <div className="cl-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3322.4723783111376!2d-111.90154582430198!3d33.61899187332323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b77c4a350dd2b%3A0x36391f467ebe51cb!2sJematell%20Homes!5e0!3m2!1sen!2sus!4v1782847583042!5m2!1sen!2sus"
                title="Jematell Homes location"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
