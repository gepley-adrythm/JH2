import React, { useMemo } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { motion, MotionConfig } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Layers,
  DollarSign,
  CheckCircle2,
  Compass,
  Calendar,
  ClipboardList,
  FileCheck,
  Home,
  Check,
} from "lucide-react";
import { pages, type PageData, type Block } from "../data/pages";
import { Seo } from "../seo/seo";
import { serviceJsonLd, breadcrumbJsonLd } from "../seo/jsonld";
import NotFound from "./not-found";
import { CityNavigator } from "../components/CityNavigator";

const SERVICE_KEYS = new Set(["custom-homes", "spechomes", "floorplans"]);
const WHERE_NESTED_KEYS = new Set(["build-on-your-lot", "buy-a-lot-with-us"]);

function buildPageJsonLd(
  key: string,
  isRegion: boolean | undefined,
  data: PageData,
  pageTitle: string,
  path: string,
): object[] {
  if (isRegion) {
    return [
      breadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: "Where We Build", url: "/where-we-build" },
        { name: pageTitle, url: path },
      ]),
    ];
  }
  if (SERVICE_KEYS.has(key)) {
    return [
      serviceJsonLd({
        name: pageTitle,
        description: data.description,
        url: path,
        image: data.ogImage,
      }),
    ];
  }
  if (WHERE_NESTED_KEYS.has(key)) {
    return [
      breadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: "Where We Build", url: "/where-we-build" },
        { name: pageTitle, url: path },
      ]),
    ];
  }
  return [];
}

function cleanTitle(t: string) {
  return t
    .replace(/\s*[—–-]\s*Jematell Homes\s*$/i, "")
    .replace(/\s*\|.*$/, "")
    .replace(/\s*[—–]\s*(Contact Us|Learn More|Explore|Home Warranty|Privacy Options).*$/i, "")
    .trim();
}

function norm(s: string | undefined | null) {
  return (s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

const SERVICE_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  "site selection": MapPin,
  "material selection": Layers,
  funding: DollarSign,
  "final inspections": CheckCircle2,
  design: Compass,
  "weekly updates": Calendar,
  "pre-construction": ClipboardList,
  permitting: FileCheck,
};

function iconFor(label: string) {
  return SERVICE_ICONS[label.toLowerCase().trim()] || Home;
}

const FADE_IN = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 } as const,
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

interface Section {
  heading: Block | null;
  blocks: Block[];
}

function splitIntoSections(blocks: Block[]): Section[] {
  const sections: Section[] = [];
  let current: Section = { heading: null, blocks: [] };
  for (const b of blocks) {
    if (b.type === "h1" || b.type === "h2") {
      if (current.heading || current.blocks.length) sections.push(current);
      current = { heading: b, blocks: [] };
    } else {
      current.blocks.push(b);
    }
  }
  if (current.heading || current.blocks.length) sections.push(current);
  return sections;
}

function dedupeListsAndParagraphs(blocks: Block[]): Block[] {
  // After our extractor fix duplicates should be gone, but belt+suspenders for legacy data.
  const out: Block[] = [];
  const seen = new Set<string>();
  for (const b of blocks) {
    const key = `${b.text || b.src || ""}`;
    if (b.type === "li" || b.type === "p") {
      if (seen.has(key)) continue;
      seen.add(key);
    }
    out.push(b);
  }
  return out;
}

function isServiceGridSection(s: Section): boolean {
  const h = s.heading?.text?.toLowerCase() || "";
  if (!h.includes("full-service") && !h.includes("project management")) return false;
  const h4s = s.blocks.filter((b) => b.type === "h4").length;
  return h4s >= 4;
}

function isProcessSection(s: Section): boolean {
  const h = s.heading?.text?.toLowerCase() || "";
  if (!(h.includes("process") || h.includes("how it works"))) return false;
  const numbered = s.blocks.filter(
    (b) =>
      (b.type === "h3" || b.type === "h4") &&
      b.text &&
      /^(step\s*\d|[1-9]\.)/i.test(b.text.trim()),
  );
  const allH3 = s.blocks.filter((b) => b.type === "h3");
  return numbered.length >= 2 || allH3.length >= 3;
}

function isFloorPlanTiersSection(s: Section, nextSections: Section[]): boolean {
  // "Explore Floor Plans" h1 followed by tier triples
  const h = s.heading?.text?.toLowerCase() || "";
  if (!h.includes("floor plan") && !h.includes("explore floor")) return false;
  const h4s = s.blocks.filter((b) => b.type === "h4").length;
  return h4s >= 2;
  void nextSections;
}

function isWhyChooseSection(s: Section): boolean {
  const h = s.heading?.text?.toLowerCase() || "";
  if (!h.includes("why")) return false;
  const numbered = s.blocks.filter(
    (b) => b.type === "h3" && b.text && /^[1-9]\./.test(b.text.trim()),
  );
  return numbered.length >= 2;
}

function isLocationEditorialSection(s: Section): boolean {
  // Multiple h3s like "Building In X", "Construction In X", "Activities In X"
  // — each card must have meaningful paragraph payload, else this is a bare tier list.
  const h3s = s.blocks.filter((b) => b.type === "h3").length;
  const ps = s.blocks.filter((b) => b.type === "p" && (b.text || "").length > 40).length;
  return !s.heading && h3s >= 3 && ps >= h3s;
}

function isTierListSection(s: Section): boolean {
  // Heading-less group of h3s with little/no body content (e.g. floor-plan tiers from sparse pages)
  const h3s = s.blocks.filter((b) => b.type === "h3").length;
  const ps = s.blocks.filter((b) => b.type === "p").length;
  return !s.heading && h3s >= 2 && ps < h3s;
}

const CTA_KEYWORDS = /\b(begin|start|ready|let'?s|contact us|schedule|get in touch|book|inquire|reach out)\b/i;
function isLikelyCTA(text: string | undefined): boolean {
  if (!text) return false;
  if (text.length > 80) return false;
  return CTA_KEYWORDS.test(text);
}

function PageHero({ data, hideDescription }: { data: PageData; hideDescription?: boolean }) {
  const title = cleanTitle(data.title);
  return (
    <section className="page-hero" data-testid="page-hero">
      {data.ogImage ? (
        <img src={data.ogImage} alt="" className="page-hero-bg" loading="eager" />
      ) : null}
      <div className="page-hero-overlay" />
      <div className="container page-hero-content">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <span className="eyebrow page-hero-eyebrow">Jematell Homes</span>
          <h1 className="page-hero-title">{title}</h1>
          {data.description && !hideDescription ? (
            <p className="page-hero-sub">{data.description}</p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}

function IntroSection({
  subtitle,
  intro,
  image,
}: {
  subtitle?: string;
  intro?: string;
  image?: { src: string; alt?: string };
}) {
  if (!subtitle && !intro && !image) return null;
  return (
    <section className="page-intro section-pad">
      <div className="container">
        <div className={`page-intro-grid ${image ? "with-image" : "no-image"}`}>
          <motion.div className="page-intro-copy" {...FADE_IN}>
            {subtitle ? (
              <h2 className="heading-lg page-intro-title">{subtitle}</h2>
            ) : null}
            {intro ? <p className="page-intro-p">{intro}</p> : null}
          </motion.div>
          {image ? (
            <motion.figure
              className="page-intro-figure"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55 }}
            >
              <img src={image.src} alt={image.alt || ""} loading="lazy" />
            </motion.figure>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ServiceGridSection({ section }: { section: Section }) {
  const items: Array<{ title: string; body: string }> = [];
  let title: string | null = null;
  for (const b of section.blocks) {
    if (b.type === "h4" && b.text) {
      title = b.text;
    } else if (b.type === "p" && b.text && title) {
      items.push({ title, body: b.text });
      title = null;
    }
  }
  return (
    <section className="page-services section-pad">
      <div className="container">
        <motion.div className="page-section-head" {...FADE_IN}>
          <span className="eyebrow">What we do</span>
          <h2 className="heading-lg">{section.heading?.text}</h2>
        </motion.div>
        <div className="page-services-grid">
          {items.map((it, i) => {
            const Icon = iconFor(it.title);
            return (
              <motion.div
                key={i}
                className="page-service-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <div className="page-service-icon">
                  <Icon size={22} />
                </div>
                <h3 className="page-service-title">{it.title}</h3>
                <p className="page-service-body">{it.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProcessSection({ section }: { section: Section }) {
  const steps: Array<{ title: string; body: string }> = [];
  let title: string | null = null;
  for (const b of section.blocks) {
    if ((b.type === "h3" || b.type === "h4") && b.text) {
      title = b.text;
    } else if (b.type === "p" && b.text && title) {
      steps.push({ title, body: b.text });
      title = null;
    }
  }
  return (
    <section className="page-process section-pad">
      <div className="container">
        <motion.div className="page-section-head centered" {...FADE_IN}>
          <span className="eyebrow">The process</span>
          <h2 className="heading-lg">{section.heading?.text}</h2>
        </motion.div>
        <ol className="page-process-list">
          {steps.map((s, i) => (
            <motion.li
              key={i}
              className="page-process-step"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="page-process-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="page-process-body">
                <h3 className="page-process-title">{s.title.replace(/^(step\s*\d+:?\s*|[1-9]\.\s*)/i, "")}</h3>
                <p>{s.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FloorPlanTiersSection({ section }: { section: Section }) {
  // Group h4 + p + img triples (img may precede or follow)
  type Tier = { title: string; body: string; img?: string; alt?: string };
  const tiers: Tier[] = [];
  let current: Partial<Tier> = {};
  for (const b of section.blocks) {
    if (b.type === "h4" && b.text) {
      if (current.title) {
        tiers.push(current as Tier);
        current = {};
      }
      current.title = b.text;
    } else if (b.type === "p" && b.text && current.title && !current.body) {
      current.body = b.text;
    } else if (b.type === "img" && b.src) {
      if (current.title) {
        current.img = b.src;
        current.alt = b.alt;
      } else {
        // pending image: hold for next tier
        current.img = current.img || b.src;
        current.alt = current.alt || b.alt;
      }
    }
  }
  if (current.title) tiers.push(current as Tier);

  if (!tiers.length) return null;

  return (
    <section className="page-tiers section-pad alt-bg">
      <div className="container">
        <motion.div className="page-section-head centered" {...FADE_IN}>
          <span className="eyebrow">Floor plans</span>
          <h2 className="heading-lg">{section.heading?.text}</h2>
        </motion.div>
        <div className="page-tiers-grid">
          {tiers.map((t, i) => (
            <motion.article
              key={i}
              className="page-tier-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              {t.img ? (
                <div className="page-tier-media">
                  <img src={t.img} alt={t.alt || t.title} loading="lazy" />
                </div>
              ) : null}
              <div className="page-tier-body">
                <span className="eyebrow">Tier {String.fromCharCode(64 + i + 1)}</span>
                <h3 className="page-tier-title">{t.title}</h3>
                <p>{t.body}</p>
                <Link to="/contact" className="page-tier-link" data-testid={`tier-${i}-cta`}>
                  Discuss this plan <ArrowRight size={14} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseSection({ section }: { section: Section }) {
  type Feature = { title: string; body: string; bullets: string[] };
  const features: Feature[] = [];
  let current: Partial<Feature> | null = null;
  for (const b of section.blocks) {
    if (b.type === "h3" && b.text) {
      if (current?.title) features.push({ ...(current as Feature), bullets: current.bullets || [] });
      current = { title: b.text.replace(/^[1-9]\.\s*/, ""), body: "", bullets: [] };
    } else if (b.type === "p" && b.text && current) {
      if (!current.body) current.body = b.text;
      else current.body += "\n\n" + b.text;
    } else if (b.type === "li" && b.text && current) {
      (current.bullets ||= []).push(b.text);
    }
  }
  if (current?.title) features.push({ ...(current as Feature), bullets: current.bullets || [] });

  return (
    <section className="page-why section-pad">
      <div className="container">
        <motion.div className="page-section-head" {...FADE_IN}>
          <span className="eyebrow">Why us</span>
          <h2 className="heading-lg">{section.heading?.text}</h2>
        </motion.div>
        <div className="page-why-grid">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="page-why-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
            >
              <div className="page-why-num">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="page-why-title">{f.title}</h3>
              {f.body ? <p className="page-why-body">{f.body}</p> : null}
              {f.bullets.length ? (
                <ul className="page-why-list">
                  {f.bullets.map((bl, j) => (
                    <li key={j}>
                      <Check size={14} /> {bl}
                    </li>
                  ))}
                </ul>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TierListSection({ section, eyebrow }: { section: Section; eyebrow?: string }) {
  const tiers = section.blocks.filter((b) => b.type === "h3" && b.text).map((b) => b.text!);
  if (!tiers.length) return null;
  return (
    <section className="page-tiers section-pad alt-bg">
      <div className="container">
        {eyebrow ? (
          <motion.div className="page-section-head centered" {...FADE_IN}>
            <span className="eyebrow">{eyebrow}</span>
          </motion.div>
        ) : null}
        <div className="page-tiers-grid">
          {tiers.map((t, i) => (
            <motion.article
              key={i}
              className="page-tier-card tier-card-bare"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="page-tier-body">
                <span className="eyebrow">Tier {String.fromCharCode(64 + i + 1)}</span>
                <h3 className="page-tier-title">{t}</h3>
                <Link to="/contact" className="page-tier-link" data-testid={`tier-${i}-cta`}>
                  Discuss this plan <ArrowRight size={14} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationEditorialSection({ section }: { section: Section }) {
  const cards: Array<{ title: string; paras: string[] }> = [];
  let current: { title: string; paras: string[] } | null = null;
  for (const b of section.blocks) {
    if (b.type === "h3" && b.text) {
      if (current) cards.push(current);
      current = { title: b.text, paras: [] };
    } else if (b.type === "p" && b.text && current) {
      current.paras.push(b.text);
    }
  }
  if (current) cards.push(current);

  return (
    <section className="page-editorial section-pad alt-bg">
      <div className="container">
        <div className="page-editorial-grid">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              className="page-editorial-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <h3 className="page-editorial-title">{c.title}</h3>
              {c.paras.map((p, j) => (
                <p key={j} className="page-editorial-p">
                  {p}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SplitSection({
  section,
  index,
}: {
  section: Section;
  index: number;
}) {
  // Generic alternating section: title + paragraphs (+ first image as media)
  const paras: string[] = [];
  let img: { src: string; alt?: string } | null = null;
  const subheads: Array<{ title: string; body: string[] }> = [];
  let currentSub: { title: string; body: string[] } | null = null;
  const bullets: string[] = [];

  for (const b of section.blocks) {
    if (b.type === "img" && b.src && !img) {
      img = { src: b.src, alt: b.alt };
    } else if (b.type === "h3" || b.type === "h4") {
      if (currentSub) subheads.push(currentSub);
      currentSub = { title: b.text || "", body: [] };
    } else if (b.type === "p" && b.text) {
      if (currentSub) currentSub.body.push(b.text);
      else paras.push(b.text);
    } else if (b.type === "li" && b.text) {
      bullets.push(b.text);
    }
  }
  if (currentSub) subheads.push(currentSub);

  const isOdd = index % 2 === 1;

  return (
    <section className={`page-split section-pad ${isOdd ? "alt-bg" : ""}`}>
      <div className="container">
        <div className={`page-split-grid ${img ? "with-media" : "no-media"} ${isOdd ? "reverse" : ""}`}>
          <motion.div className="page-split-copy" {...FADE_IN}>
            {section.heading ? (
              <h2 className="heading-lg page-split-title">{section.heading.text}</h2>
            ) : null}
            {paras.map((p, i) => (
              <p key={i} className="page-split-p">
                {p}
              </p>
            ))}
            {bullets.length ? (
              <ul className="page-split-bullets">
                {bullets.map((b, i) => (
                  <li key={i}>
                    <Check size={14} /> {b}
                  </li>
                ))}
              </ul>
            ) : null}
            {subheads.length ? (
              <div className="page-split-subheads">
                {subheads.map((s, i) => (
                  <div key={i} className="page-split-subhead">
                    <h3>{s.title}</h3>
                    {s.body.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                ))}
              </div>
            ) : null}
          </motion.div>
          {img ? (
            <motion.figure
              className="page-split-figure"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55 }}
            >
              <img src={img.src} alt={img.alt || ""} loading="lazy" />
            </motion.figure>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ProseSection({ section }: { section: Section }) {
  // Used for legal-style long-form content (Privacy)
  return (
    <section className="page-prose section-pad">
      <div className="container container-readable">
        {section.heading ? (
          <h2 className="heading-md page-prose-h">{section.heading.text}</h2>
        ) : null}
        {section.blocks.map((b, i) => {
          if (b.type === "h3") return <h3 key={i} className="page-prose-h3">{b.text}</h3>;
          if (b.type === "h4") return <h4 key={i} className="page-prose-h4">{b.text}</h4>;
          if (b.type === "p") return <p key={i} className="page-prose-p">{b.text}</p>;
          if (b.type === "li") return <li key={i} className="page-prose-li">{b.text}</li>;
          if (b.type === "img" && b.src)
            return (
              <figure key={i} className="page-figure">
                <img src={b.src} alt={b.alt || ""} loading="lazy" />
              </figure>
            );
          return null;
        })}
      </div>
    </section>
  );
}

function PageCTA({ title, body }: { title?: string; body?: string }) {
  return (
    <section className="page-cta">
      <div className="container">
        <div className="page-cta-inner">
          <div>
            <span className="eyebrow">Get started</span>
            <h2 className="heading-lg">{title || "Let's build your dream home."}</h2>
            <p>
              {body ||
                "Schedule a consultation with our team and tell us about your land, your lifestyle, and what home means to you."}
            </p>
          </div>
          <Link to="/contact" className="btn btn-primary" data-testid="page-cta">
            Start your build <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

interface Props {
  pageKey?: string;
  isRegion?: boolean;
}

export default function ContentPage({ pageKey, isRegion }: Props) {
  const params = useParams();
  const location = useLocation();
  const key = isRegion ? params.region || "" : pageKey || "";
  const data = pages[key];

  const layout = useMemo(() => {
    if (!data) return null;
    const blocks = dedupeListsAndParagraphs(data.blocks);

    // Extract intro pieces (skip lead img since hero uses ogImage)
    let i = 0;
    // Skip leading hero image
    while (i < blocks.length && blocks[i].type === "img") i++;
    // Skip a leading on-page h1 headline. Either it just echoes the page title,
    // or it sits directly above an h2/h3 subtitle (the real intro heading) — e.g.
    // location pages render [h1 "RIO VERDE"][h2 "BUILD A HOME IN RIO VERDE"][p].
    // Without this, the h1 falls through, leaving the intro copy column empty.
    while (
      i < blocks.length &&
      blocks[i].type === "h1" &&
      blocks[i].text &&
      (cleanTitle(data.title).toLowerCase() === blocks[i].text!.toLowerCase() ||
        (blocks[i + 1] != null &&
          (blocks[i + 1].type === "h2" || blocks[i + 1].type === "h3")))
    )
      i++;

    let subtitle: string | undefined;
    let intro: string | undefined;
    let introImg: { src: string; alt?: string } | undefined;
    // When the intro heading is identical to the hero description, keep it as the
    // intro heading and hide the description in the hero instead — so the tagline
    // shows exactly once and the intro section isn't left headingless.
    let heroDescDup = false;

    const descNorm = norm(data.description);
    if (i < blocks.length && (blocks[i].type === "h2" || blocks[i].type === "h3")) {
      const candidate = blocks[i].text || "";
      subtitle = candidate;
      if (norm(candidate) === descNorm) heroDescDup = true;
      i++;
    }
    if (i < blocks.length && blocks[i].type === "p") {
      const candidate = blocks[i].text || "";
      if (norm(candidate) !== descNorm) intro = candidate;
      i++;
    }
    // Look ahead for an early image to pair with the intro
    for (let j = i; j < Math.min(i + 4, blocks.length); j++) {
      if (blocks[j].type === "img" && blocks[j].src) {
        introImg = { src: blocks[j].src!, alt: blocks[j].alt };
        blocks.splice(j, 1);
        break;
      }
    }

    // Detect trailing CTA: final h1 (e.g. "BEGIN YOUR BUILD", "LET'S MAKE...") + optional p.
    // Require keyword intent so legit final h1s like "WARRANTY" or "THANK YOU!" are not truncated.
    let ctaTitle: string | undefined;
    let ctaBody: string | undefined;
    for (let j = blocks.length - 1; j >= Math.max(i, blocks.length - 4); j--) {
      if (blocks[j].type === "h1" && isLikelyCTA(blocks[j].text)) {
        ctaTitle = blocks[j].text;
        if (blocks[j + 1] && blocks[j + 1].type === "p") {
          ctaBody = blocks[j + 1].text;
        }
        blocks.length = j; // truncate
        break;
      }
    }

    const remaining = blocks.slice(i);
    const sections = splitIntoSections(remaining);

    return { subtitle, intro, introImg, sections, ctaTitle, ctaBody, heroDescDup };
  }, [data]);

  if (!data) return <NotFound />;
  if (!layout) return null;

  const { subtitle, intro, introImg, sections, ctaTitle, ctaBody, heroDescDup } = layout;

  // Privacy policy gets its own typographic treatment
  const isLegal = /privacy/i.test(data.title);

  const tierEyebrow = key === "floorplans" ? "Floor plans" : undefined;

  const pageTitle = cleanTitle(data.title);
  const pageJsonLd = buildPageJsonLd(key, isRegion, data, pageTitle, location.pathname);

  return (
    <MotionConfig reducedMotion="user">
      <main className="page" data-testid={`page-${key}`}>
        <Seo
          title={pageTitle}
          description={data.description}
          canonical={location.pathname}
          image={data.ogImage}
          noindex={key === "thankyou"}
          jsonLd={pageJsonLd.length ? pageJsonLd : undefined}
        />
        <PageHero data={data} hideDescription={heroDescDup} />
        {key === "where-we-build" ? <CityNavigator /> : null}
        <IntroSection subtitle={subtitle} intro={intro} image={introImg} />

        {isLegal
          ? sections.map((s, i) => <ProseSection key={i} section={s} />)
          : sections.map((s, i) => {
              if (isServiceGridSection(s)) return <ServiceGridSection key={i} section={s} />;
              if (isProcessSection(s)) return <ProcessSection key={i} section={s} />;
              if (isFloorPlanTiersSection(s, sections.slice(i + 1)))
                return <FloorPlanTiersSection key={i} section={s} />;
              if (isWhyChooseSection(s)) return <WhyChooseSection key={i} section={s} />;
              if (isLocationEditorialSection(s)) return <LocationEditorialSection key={i} section={s} />;
              if (isTierListSection(s))
                return <TierListSection key={i} section={s} eyebrow={tierEyebrow} />;
              return <SplitSection key={i} section={s} index={i} />;
            })}

        <PageCTA title={ctaTitle ? cleanTitle(ctaTitle) : undefined} body={ctaBody} />
      </main>
    </MotionConfig>
  );
}
