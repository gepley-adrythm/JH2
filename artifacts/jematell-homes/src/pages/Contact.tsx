import React from "react";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { CTA } from "../cta";
import { Seo } from "../seo/seo";
import { breadcrumbJsonLd } from "../seo/jsonld";
import { useContactForm } from "../contact-form/ContactFormProvider";

export default function Contact() {
  const { open: openContactForm } = useContactForm();
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
      <section className="page-hero page-hero-short">
        <picture>
          <source
            srcSet="/images/contact-hero-2000.webp 2000w, /images/contact-hero-1600.webp 1600w, /images/contact-hero-1280.webp 1280w, /images/contact-hero-768.webp 768w"
            sizes="100vw"
            type="image/webp"
          />
          <img src="/images/contact-hero.jpg" alt="" className="page-hero-bg" aria-hidden="true" />
        </picture>
        <div className="page-hero-overlay" />
        <div className="container page-hero-content" style={{ textAlign: "center" }}>
          <span className="eyebrow page-hero-eyebrow">Contact</span>
          <h1 className="page-hero-title hero-title">
            Create the home of your dreams.
          </h1>
          <p className="page-hero-sub" style={{ maxWidth: 600, margin: "0 auto" }}>
            We're excited to hear about your ideas. Tell us about your vision and we'll be in touch to schedule a consultation.
          </p>
        </div>
      </section>

      <section className="contact-intro">
        <div className="container contact-intro-inner">
          <span className="eyebrow">Let's Get Started</span>
          <h2 className="contact-intro-heading">We're excited to hear about your ideas!</h2>
          <p className="contact-intro-body">
            To begin the process, please share some details about your project by completing the form on this page.
            From there we will contact you to arrange our introductory meeting and get things started.
          </p>
          <button
            className="btn-primary"
            onClick={openContactForm}
            data-testid="contact-intro-cta"
          >
            Start Your Build
          </button>
        </div>
      </section>

      <section className="contact-location section-pad" style={{ background: "var(--color-cream)" }}>
        <div className="container">
          <div className="cl-outer">
            <div className="cl-photo">
              <picture>
                <source srcSet="/images/office-1280.webp 1280w, /images/office-960.webp 960w, /images/office-640.webp 640w" sizes="320px" type="image/webp" />
                <img src="/images/office.jpg" alt="Jematell Homes office lobby" loading="lazy" />
              </picture>
            </div>

            <div className="cl-card">
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
        </div>
      </section>

      <CTA />
    </main>
  );
}
