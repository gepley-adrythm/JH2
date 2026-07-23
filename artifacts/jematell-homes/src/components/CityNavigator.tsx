"use client";
import { useState } from "react";
import Link from "next/link";
import { m } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { locations, locationHref } from "../config/siteConfig";
import { FADE_IN_UP_PROPS } from "../motion";

/**
 * Premium, expanding image-accordion that leads the /where-we-build page.
 *
 * Each city is a tall panel that grows when it becomes active (hover, focus, or
 * keyboard tab) — revealing its imagery and an explicit "Explore" affordance —
 * while the others recede to slim spines with vertical labels. The whole panel
 * is a single <Link>, so it is fully keyboard reachable and focusing it expands
 * it. On narrow viewports the accordion relaxes into a stacked grid of cards.
 *
 * The flex-grow animation rides the site's shared easing (defined in the CSS,
 * matching EASE_OUT_EXPO) and is fully disabled under prefers-reduced-m.
 */

const FALLBACK_IMAGE =
  "/images/cdn/cb106191-10f5-42ca-bd2a-4b2f12503dae__53-DJI_20260125135120_0044_D.webp";

const LOCAL_CITY_HERO: Record<string, string> = {
  "surprise": "/images/city-hero-surprise.jpg",
};

function cityImage(slug: string, images?: Record<string, string>): string {
  return LOCAL_CITY_HERO[slug] || images?.[slug] || FALLBACK_IMAGE;
}

export function CityNavigator({ images }: { images?: Record<string, string> } = {}) {
  const [active, setActive] = useState(0);

  return (
    <section className="city-nav section-pad" aria-labelledby="city-nav-heading">
      <div className="container">
        <m.div className="city-nav-head" {...FADE_IN_UP_PROPS} style={{ textAlign: "center" }}>
          <span className="eyebrow">Explore by Region</span>
          <h2 className="heading-lg" id="city-nav-heading" style={{ textTransform: "uppercase", whiteSpace: "nowrap" }}>
            Find your place in the desert
          </h2>
          <p className="city-nav-intro">
            From the foothills of Scottsdale to the open skies of Casa Grande, we build across
            Arizona&rsquo;s most sought-after communities. Choose a region to see where your home
            could take shape.
          </p>
        </m.div>

        <ul
          className="city-nav-track"
          role="list"
          onMouseLeave={() => setActive(0)}
          data-testid="city-nav-track"
        >
          {locations.map((loc, i) => {
            const isActive = i === active;
            return (
              <li
                key={loc.slug}
                className="city-nav-item"
                data-active={isActive}
                style={{ flexGrow: isActive ? 5 : 1 }}
              >
                <Link
                  href={locationHref(loc.slug)}
                  className="city-nav-link"
                  data-testid={`city-nav-${loc.slug}`}
                  aria-label={`Explore building a custom home in ${loc.name}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <img
                    className="city-nav-img"
                    src={cityImage(loc.slug, images)}
                    alt=""
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                  <span className="city-nav-overlay" aria-hidden="true" />
                  <span className="city-nav-index" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="city-nav-body">
                    <span className="city-nav-name">{loc.name}</span>
                    <span className="city-nav-tagline">{loc.tagline}</span>
                    <span className="city-nav-cta">
                      Explore <ArrowUpRight size={16} />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <m.div className="city-nav-lot-ctas" {...FADE_IN_UP_PROPS}>
          <Link href="/build-on-your-lot" className="city-nav-lot-card" data-testid="city-nav-build-on-your-lot">
            <span className="city-nav-lot-eyebrow">Already own land?</span>
            <span className="city-nav-lot-title-row">
              <span className="city-nav-lot-title">Build on Your Lot</span>
              <ArrowRight size={20} className="city-nav-lot-arrow" />
            </span>
            <p className="city-nav-lot-sub">We build on your homesite. Full design-to-keys management on land you own.</p>
          </Link>
          <Link href="/buy-a-lot-with-us" className="city-nav-lot-card" data-testid="city-nav-buy-a-lot-with-us">
            <span className="city-nav-lot-eyebrow">Need land first?</span>
            <span className="city-nav-lot-title-row">
              <span className="city-nav-lot-title">Buy a Lot With Us</span>
              <ArrowRight size={20} className="city-nav-lot-arrow" />
            </span>
            <p className="city-nav-lot-sub">We help you find and secure the right homesite in your target community.</p>
          </Link>
        </m.div>
      </div>
    </section>
  );
}

export default CityNavigator;
