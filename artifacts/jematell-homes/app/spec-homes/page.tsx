import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pageMetadata } from "@/seo/metadata";
import { contentPageMeta, contentPageJsonLd } from "@/lib/contentPageMeta";
import { JsonLd } from "@/seo/JsonLd";
import { SpecHomesMap } from "@/views/SpecHomesMap";

export const metadata = pageMetadata(contentPageMeta({ pageKey: "spechomes" }));

const HOMES = [
  {
    plan: "1849 Plan",
    href: "/floor-plans/1849",
    img: "/images/1849-rendering-v2.png",
    address: "7948 N. Roland Dr, Casa Grande, AZ 85194",
    lat: 32.952139,
    lon: -111.685667,
    specs: ["1,849 Sq Ft", "3 Bedrooms", "2 Bathrooms", "2-Car Garage"],
    status: "Coming Soon",
  },
  {
    plan: "1644 Plan",
    href: "/floor-plans/1644",
    img: "/images/plans/1644-rendering.png",
    address: "7924 N. Roland Dr, Casa Grande, AZ 85194",
    lat: 32.952000,
    lon: -111.685639,
    specs: ["1,644 Sq Ft", "3 Bedrooms", "2 Bathrooms", "2-Car Garage"],
    status: "Coming Soon",
  },
];

export default function SpecHomes() {
  const jsonLd = contentPageJsonLd({ pageKey: "spechomes" });
  return (
    <>
      {jsonLd.length ? <JsonLd data={jsonLd} /> : null}
      <main className="page" data-testid="page-spec-homes">
        {/* Hero — kept as-is */}
        <section className="page-hero" data-testid="page-hero" style={{ alignItems: "center", minHeight: "65vh" }}>
          <img src="/images/spec-homes-hero-3.jpg" alt="" className="page-hero-bg" loading="eager" fetchPriority="high" />
          <div
            className="page-hero-overlay"
            style={{ background: "linear-gradient(180deg, rgba(10,12,14,0.25) 0%, rgba(10,12,14,0.45) 100%)" }}
          />
          <div className="container page-hero-content" style={{ textAlign: "center", maxWidth: "100%" }}>
            <h1 className="page-hero-title hero-title" style={{ textTransform: "uppercase" }}>Spec Homes</h1>
          </div>
        </section>

        {/* Intro: reworked copy + kitchen photo */}
        <section className="section-pad">
          <div className="container">
            <div className="spec-intro-grid">
              <div className="spec-intro-copy">
                <h2 className="heading-lg" style={{ textTransform: "uppercase", fontSize: "48px" }}>High quality, stylish homes at affordable pricing</h2>
                <p>
                  Our homes are designed with current trends in mind, and we never choose a price tag over quality.
                  Experience the satisfaction of owning a thoughtfully designed and impeccably constructed spec home,
                  built by a team that treats every detail like it matters. Contact us today to learn more about our
                  available spec homes.
                </p>
                <Link href="/contact" className="btn btn-primary" data-testid="spec-intro-cta">
                  Contact Us
                </Link>
              </div>
              <div className="spec-intro-media" style={{ minHeight: 480 }}>
                <img
                  src="/images/spec-homes-kitchen.jpg"
                  alt="Kitchen in a Jematell Homes spec home with a quartz waterfall island, subway-tile backsplash, and stainless appliances"
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Homes coming soon: interactive map + cards */}
        <section className="section-pad alt-bg" data-testid="spec-coming-soon">
          <div className="container">
            <div className="page-section-head centered">
              <span className="eyebrow">Homes Coming Soon</span>
              <h2 className="heading-lg">New spec homes in Casa Grande</h2>
              <p className="spec-coming-intro">
                Two brand-new spec homes are underway on N. Roland Drive. Explore the location on the map, then see the
                plans we are building on each lot.
              </p>
            </div>

            <SpecHomesMap
              homes={HOMES.map((h) => ({
                lat: h.lat,
                lon: h.lon,
                plan: `The ${h.plan}`,
                address: h.address,
                status: h.status,
                href: h.href,
              }))}
            />

            <div className="spec-homes-cards">
              {HOMES.map((h) => (
                <article className="page-tier-card" key={h.plan} data-testid={`spec-card-${h.plan.split(" ")[0]}`}>
                  <Link href={h.href} className="page-tier-media fp-exclusive-media">
                    <img src={h.img} alt={`Rendered exterior of the ${h.plan} by Jematell Homes`} loading="lazy" />
                  </Link>
                  <div className="page-tier-body">
                    <span className="eyebrow" style={{ color: "var(--color-warm)" }}>{h.status}</span>
                    <h3 className="page-tier-title">The {h.plan}</h3>
                    <p className="spec-card-address">{h.address}</p>
                    <ul className="fp-exclusive-specs" aria-label="Plan specifications">
                      {h.specs.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                    <Link href={h.href} className="page-tier-link" data-testid={`spec-card-${h.plan.split(" ")[0]}-cta`}>
                      View Plan &amp; Elevations <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
