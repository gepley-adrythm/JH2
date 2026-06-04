import { useState } from "react";
import { Link } from "react-router-dom";
import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { locations, locationHref } from "../config/siteConfig";
import { pages } from "../data/pages";
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
  "https://images.squarespace-cdn.com/content/v1/6451acc5216e2b14e01b3bc3/cb106191-10f5-42ca-bd2a-4b2f12503dae/53-DJI_20260125135120_0044_D.jpg";

function cityImage(slug: string): string {
  return pages[slug]?.ogImage || FALLBACK_IMAGE;
}

export function CityNavigator() {
  const [active, setActive] = useState(0);

  return (
    <section className="city-nav section-pad" aria-labelledby="city-nav-heading">
      <div className="container">
        <m.div className="city-nav-head" {...FADE_IN_UP_PROPS}>
          <span className="eyebrow">Explore by community</span>
          <h2 className="heading-lg" id="city-nav-heading">
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
                  to={locationHref(loc.slug)}
                  className="city-nav-link"
                  viewTransition
                  data-testid={`city-nav-${loc.slug}`}
                  aria-label={`Explore building a custom home in ${loc.name}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <img
                    className="city-nav-img"
                    src={cityImage(loc.slug)}
                    alt=""
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                  <span className="city-nav-overlay" aria-hidden="true" />
                  <span className="city-nav-index" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="city-nav-body">
                    <span className="city-nav-name">{loc.name}</span>
                    <span className="city-nav-cta">
                      Explore <ArrowUpRight size={16} />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default CityNavigator;
