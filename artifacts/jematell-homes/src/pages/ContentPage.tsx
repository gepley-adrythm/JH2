import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { pages, type PageData, type Block } from "../data/pages";
import NotFound from "./not-found";

function cleanTitle(t: string) {
  return t.replace(/\s*[—–-]\s*Jematell Homes\s*$/i, "").trim();
}

function GroupedBlocks({ blocks }: { blocks: Block[] }) {
  const reduce = useReducedMotion();
  const groups = useMemo(() => {
    const out: Array<
      | { kind: "list"; items: string[] }
      | { kind: "block"; block: Block }
    > = [];
    let buf: string[] = [];
    const flush = () => {
      if (buf.length) {
        out.push({ kind: "list", items: buf });
        buf = [];
      }
    };
    for (const b of blocks) {
      if (b.type === "li" && b.text) {
        buf.push(b.text);
      } else {
        flush();
        out.push({ kind: "block", block: b });
      }
    }
    flush();
    return out;
  }, [blocks]);

  return (
    <div className="page-body">
      {groups.map((g, i) => {
        if (g.kind === "list") {
          return (
            <motion.ul
              key={i}
              className="page-list"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              {g.items.map((it, j) => (
                <li key={j}>{it}</li>
              ))}
            </motion.ul>
          );
        }
        const b = g.block;
        const anim = reduce
          ? {}
          : {
              initial: { opacity: 0, y: 24 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-80px" },
              transition: { duration: 0.6 },
            };
        if (b.type === "h1" || b.type === "h2") {
          return (
            <motion.h2 key={i} className="page-h2 heading-lg" {...anim}>
              {b.text}
            </motion.h2>
          );
        }
        if (b.type === "h3") {
          return (
            <motion.h3 key={i} className="page-h3 heading-md" {...anim}>
              {b.text}
            </motion.h3>
          );
        }
        if (b.type === "h4") {
          return (
            <motion.h4 key={i} className="page-h4" {...anim}>
              {b.text}
            </motion.h4>
          );
        }
        if (b.type === "p") {
          return (
            <motion.p key={i} className="page-p" {...anim}>
              {b.text}
            </motion.p>
          );
        }
        if (b.type === "blockquote") {
          return (
            <motion.blockquote key={i} className="page-quote" {...anim}>
              {b.text}
            </motion.blockquote>
          );
        }
        if (b.type === "img" && b.src) {
          return (
            <motion.figure
              key={i}
              className="page-figure"
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
            >
              <img src={b.src} alt={b.alt || ""} loading="lazy" />
              {b.alt ? <figcaption>{b.alt}</figcaption> : null}
            </motion.figure>
          );
        }
        return null;
      })}
    </div>
  );
}

function PageHero({ data }: { data: PageData }) {
  const reduce = useReducedMotion();
  const title = cleanTitle(data.title);
  return (
    <section className="page-hero">
      {data.ogImage ? (
        <img src={data.ogImage} alt="" className="page-hero-bg" />
      ) : null}
      <div className="page-hero-overlay" />
      <div className="container page-hero-content">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="eyebrow page-hero-eyebrow">Jematell Homes</span>
          <h1 className="page-hero-title">{title}</h1>
          {data.description ? (
            <p className="page-hero-sub">{data.description}</p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}

function PageCTA() {
  return (
    <section className="page-cta">
      <div className="container">
        <div className="page-cta-inner">
          <div>
            <span className="eyebrow">Get Started</span>
            <h2 className="heading-lg">Let's build your dream home.</h2>
            <p>
              Schedule a consultation with our team and tell us about your land,
              your lifestyle, and what home means to you.
            </p>
          </div>
          <Link to="/contact" className="btn btn-primary" data-testid="page-cta">
            Start Your Build <ArrowRight size={16} />
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
  const key = isRegion ? params.region || "" : pageKey || "";
  const data = pages[key];
  if (!data) return <NotFound />;
  return (
    <main className="page">
      <PageHero data={data} />
      <section className="page-content section-pad">
        <div className="container container-readable">
          <GroupedBlocks blocks={data.blocks} />
        </div>
      </section>
      <PageCTA />
    </main>
  );
}
