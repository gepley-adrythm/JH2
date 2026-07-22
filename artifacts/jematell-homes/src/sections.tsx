"use client";
import React, { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ResponsiveImage } from "./components/ResponsiveImage";
import { img } from "./lib/paths";
import Link from "next/link";
import { useContactForm } from "./contact-form";
import { EASE_OUT_EXPO } from "./motion";

// FeaturedProjects lives in its own module (it is also rendered by ContentPage
// on /custom-homes, which must not pull the rest of the home sections into its
// route JS). Re-exported here so the home page import path is unchanged.
export { FeaturedProjects } from "./components/FeaturedProjects";

export { HomepageFloorPlans } from "./components/HomepageFloorPlans";

// --- Data ---
const REVIEWS = [
  {
    headline: "“They are highly committed to delivering a quality product…",
    body: "We did a custom home build with Jematell Homes and are very glad we did! Joe worked with us through the entire process to make sure we got the exact home we wanted. Him, Tyler and their team did an incredible job building our first home, gave honest recommendations, and were very transparent”",
    author: "Travis & Sarah W.",
  },
  {
    headline: "“We couldn’t be happier with our Jematell Home!",
    body: "We couldn’t be happier with our Jematell Home!! It has a spacious floor plan, beautiful finishes, and a large lot!! Working with the Jematell Homes team made the home-buying process easy. If you’re thinking about buying a house give them a call.”",
    author: "Joe & Cassandra M.",
  },
  {
    headline: "“You can tell Jematell Homes takes pride in their work and doesn’t cut corners…”",
    body: "We bought a completed home from Jematell Homes, and we are very happy with our decision. Every finish felt thoughtfully selected, and the layout was both functional and beautiful. Even though it was a spec home, it felt anything but standard.”",
    author: "Ashton S.",
  },
];

// --- Sections ---

export function Hero() {
  const { open: openContactForm } = useContactForm();
  return (
    <section className="hero">
      <div className="hero-bg">
        <img
          src={img("hero.jpg")}
          alt="Aerial view of Jematell Home"
          width={2500}
          height={1406}
          fetchPriority="high"
        />
      </div>
      <div className="hero-overlay" />
      <div className="container hero-content">
        <div className="hero-copy">
          <h1 className="heading-xl hero-title">
            <span>Let's Make Your</span>
            <span>Dream a Reality</span>
          </h1>
          <button type="button" className="btn btn-outline-light hero-cta" data-testid="hero-cta" onClick={openContactForm}>
            Start Your Build
          </button>
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="about section-pad" id="about">
      <div className="container">
        <div className="about-grid" style={{ display: 'block' }}>
          <m.div
            className="about-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          >
            <span className="eyebrow" style={{ fontSize: '15px' }}>Get to know us</span>
            <h2 className="heading-lg" style={{ fontSize: '55px', marginBottom: '32px', textTransform: 'uppercase' }}>A family-owned builder for Arizona</h2>
            <p>
              As a family-owned Arizona home builder, we take pride in creating well-built homes that feel thoughtful, comfortable, and made to last.
            </p>
            <p>
              From the first conversation to the final walk-through, we focus on honest communication, quality craftsmanship, and the details that make a house feel like home. Whether you’re looking for a custom build or a move-in-ready spec home, we’re here to help bring your vision to life.
            </p>
            <p>
              Welcome to Jematell Homes, where we turn your dream home into a reality.
            </p>
          </m.div>
        </div>
      </div>
    </section>
  );
}


export function ServicesSplit() {
  return (
    <section className="services-split" id="services">
      <div className="service-pane" data-testid="card-custom">
        <ResponsiveImage
          name="custom-home"
          className="service-bg"
          alt="Custom home kitchen with green cabinetry and marble island"
          widths={[768, 1280, 1600, 2000, 2500]}
          sizes="(min-width: 900px) 50vw, 100vw"
          width={2500}
          height={1667}
        />
        <div className="service-overlay" />
        <div className="service-content">
          <span className="eyebrow" style={{ color: '#fff' }}>Portfolio</span>
          <h3 style={{ whiteSpace: 'nowrap' }}>Build a Custom Home</h3>
          <p>
            Is a custom home what you’re envisioning? Explore our portfolio of past projects, learn more about our process, and discover how we bring your unique vision to life in the desert.
          </p>
          <Link href="/custom-homes" className="btn btn-outline-light">Explore Custom</Link>
        </div>
      </div>
      <div className="service-pane" data-testid="card-spec">
        <ResponsiveImage
          name="spec-home"
          className="service-bg"
          alt="Twilight House spec home front exterior"
          widths={[768, 1280, 1600]}
          sizes="(min-width: 900px) 50vw, 100vw"
          width={1600}
          height={1066}
        />
        <div className="service-overlay" />
        <div className="service-content">
          <span className="eyebrow" style={{ color: '#fff' }}>Available</span>
          <h3 style={{ whiteSpace: 'nowrap' }}>Buy One of Our Homes</h3>
          <p>
            Explore stunning Arizona properties and find a home that perfectly suits your unique preferences and lifestyle. Move-in ready luxury, crafted with our signature attention to detail.
          </p>
          <Link href="/spec-homes" className="btn btn-outline-light">View Spec Homes</Link>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const steps = [
    { num: "01", title: "Consultation", desc: "We start by getting to know your vision, budget, goals, and the land you\u2019ll be building on." },
    { num: "02", title: "Design", desc: "Together, we shape the architecture, layout, finishes, and interior selections that bring your home to life." },
    { num: "03", title: "Build", desc: "Our team manages the construction process with care, communication, and attention to quality. You\u2019ll know what\u2019s happening throughout the build, from foundation to finishing touches. Weekly updates." },
    { num: "04", title: "Completion", desc: "Once the home is complete, we walk through every detail with you to make sure it feels right. Then comes the best part: handing over the keys to your finished Jematell home.", featured: true },
  ];

  return (
    <section className="process section-pad">
      <div className="container">
        <span className="eyebrow" style={{ fontSize: '15px' }}>Our Process</span>
        <h2 className="heading-lg" style={{ fontSize: '55px', textTransform: 'uppercase' }}>How we build your dream home</h2>
        <div className="process-grid">
          {steps.map((step, i) => (
            <m.div
              key={i}
              className={`process-card process-card--${step.num}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: Math.min(i, 5) * 0.06, duration: 0.5, ease: EASE_OUT_EXPO }}
            >
              {step.featured && (
                <ResponsiveImage
                  name="completion-reveal"
                  className="process-bg"
                  alt="Finished primary bathroom in a completed Jematell home"
                  widths={[768, 1280, 1600]}
                  sizes="(min-width: 900px) 33vw, 100vw"
                  width={1600}
                  height={1066}
                />
              )}
              <div className="process-num">{step.num}</div>
              <div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="reviews section-pad" id="reviews">
      <div className="container">
        <div className="reviews-container">
          <div className="reviews-left">
            <span className="eyebrow" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              Reviews
              <span style={{ color: 'var(--color-accent)', fontSize: '14px', letterSpacing: '2px' }}>
                ★★★★★
              </span>
            </span>
            <h2 className="heading-lg" style={{ fontSize: '55px', textTransform: 'uppercase' }}>What our homeowners say</h2>
            <div style={{ display: 'flex', gap: '8px', marginTop: '32px' }}>
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  data-testid={`review-pager-${i}`}
                  className="review-pager"
                  style={{
                    width: i === current ? '32px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    border: 'none',
                    padding: 0,
                    background: i === current ? 'var(--color-accent)' : 'var(--color-border)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  aria-label={`Go to review ${i + 1}`}
                  aria-current={i === current}
                />
              ))}
            </div>
          </div>
          <div className="reviews-right">
            <div className="review-content" data-testid={`review-${current}`}>
              <AnimatePresence mode="wait">
                <m.div
                  key={current}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                >
                  <p className="review-body">{REVIEWS[current].headline}</p>
                  <p style={{ marginBottom: '24px', color: 'var(--color-text-muted)' }}>{REVIEWS[current].body}</p>
                  <div className="review-author">- {REVIEWS[current].author}</div>
                </m.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
