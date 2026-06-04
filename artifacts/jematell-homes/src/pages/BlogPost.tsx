import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { blogs } from "../data/blogs";
import faqCrossLinks from "../data/faqCrossLinks.json";
import { Seo } from "../seo/seo";
import { articleJsonLd, breadcrumbJsonLd } from "../seo/jsonld";
import NotFound from "./not-found";

function cleanTitle(t: string) {
  return t.replace(/\s*[—–-]\s*Jematell Homes\s*$/i, "").trim();
}

export default function BlogPost() {
  const reduce = useReducedMotion();
  const { slug } = useParams();
  const data = slug ? blogs[slug] : undefined;

  const siblings = useMemo(() => {
    const keys = Object.keys(blogs).filter(
      (k) => k !== "blog-articles" && !/[%+]/.test(k) && !/^(category_|tag_|author_)/i.test(k),
    );
    const idx = keys.indexOf(slug || "");
    return {
      prev: idx > 0 ? keys[idx - 1] : null,
      next: idx >= 0 && idx < keys.length - 1 ? keys[idx + 1] : null,
    };
  }, [slug]);

  const relatedFaqs = useMemo(
    () => faqCrossLinks.filter((f) => f.pillarBlogSlug === slug),
    [slug],
  );

  if (!data) return <NotFound />;

  const title = cleanTitle(data.title);
  const heroImg =
    data.ogImage ||
    data.blocks.find((b) => b.type === "img" && b.src)?.src ||
    "";
  const bodyBlocks = data.blocks.filter(
    (b) => !(b.type === "img" && b.src === heroImg),
  );

  const path = `/blog/${slug}`;

  return (
    <main className="page blog-post">
      <Seo
        title={title}
        description={data.description || `${title} — insights from Jematell Homes.`}
        canonical={path}
        image={heroImg}
        type="article"
        jsonLd={[
          articleJsonLd({ title, description: data.description, url: path, image: heroImg }),
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: title, url: path },
          ]),
        ]}
      />
      <section className="blog-post-hero">
        {heroImg ? <img src={heroImg} alt="" className="page-hero-bg" /> : null}
        <div className="page-hero-overlay" />
        <div className="container page-hero-content">
          <Link to="/blog" className="gallery-back" data-testid="blog-back">
            <ArrowLeft size={16} /> All Articles
          </Link>
          <motion.h1
            className="blog-post-title"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {title}
          </motion.h1>
          {data.description ? (
            <p className="page-hero-sub">{data.description}</p>
          ) : null}
        </div>
      </section>

      <section className="section-pad blog-post-body" style={{ background: "var(--color-bg)" }}>
        <div className="container container-narrow">
          {bodyBlocks.map((b, i) => {
            const anim = reduce
              ? {}
              : {
                  initial: { opacity: 0, y: 18 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, margin: "-60px" },
                  transition: { duration: 0.5 },
                };
            if (b.type === "h1" || b.type === "h2") {
              return (
                <motion.h2 key={i} className="post-h2" {...anim}>
                  {b.text}
                </motion.h2>
              );
            }
            if (b.type === "h3" || b.type === "h4") {
              return (
                <motion.h3 key={i} className="post-h3" {...anim}>
                  {b.text}
                </motion.h3>
              );
            }
            if (b.type === "p") {
              return (
                <motion.p key={i} className="post-p" {...anim}>
                  {b.text}
                </motion.p>
              );
            }
            if (b.type === "li") {
              return (
                <motion.li key={i} className="post-li" {...anim}>
                  {b.text}
                </motion.li>
              );
            }
            if (b.type === "blockquote") {
              return (
                <motion.blockquote key={i} className="post-quote" {...anim}>
                  {b.text}
                </motion.blockquote>
              );
            }
            if (b.type === "img" && b.src) {
              return (
                <motion.figure key={i} className="post-figure" {...anim}>
                  <img src={b.src} alt={b.alt || ""} loading="lazy" />
                </motion.figure>
              );
            }
            return null;
          })}
        </div>
      </section>

      {relatedFaqs.length > 0 ? (
        <section className="section-pad post-faqs" style={{ background: "var(--color-cream, #ece9e2)" }}>
          <div className="container container-narrow">
            <h2 className="post-h2">Related questions</h2>
            <ul className="post-faq-list" data-testid="post-related-faqs">
              {relatedFaqs.map((f) => (
                <li key={f.slug}>
                  <a href={`/faq/${f.slug}`} data-testid={`post-faq-${f.slug}`}>
                    {f.question.replace(/^\[PLACEHOLDER\]\s*/, "")}
                    <ArrowRight size={16} />
                  </a>
                </li>
              ))}
            </ul>
            <a href="/faq" className="post-faq-all" data-testid="post-faq-all">
              See all FAQs <ArrowRight size={14} />
            </a>
          </div>
        </section>
      ) : null}

      <section className="post-nav-strip">
        <div className="container">
          <div className="post-nav-grid">
            {siblings.prev ? (
              <Link to={`/blog/${siblings.prev}`} className="post-nav-link" data-testid="post-prev">
                <span><ArrowLeft size={14} /> Previous</span>
                <strong>{cleanTitle(blogs[siblings.prev]?.title || "")}</strong>
              </Link>
            ) : <span />}
            {siblings.next ? (
              <Link to={`/blog/${siblings.next}`} className="post-nav-link right" data-testid="post-next">
                <span>Next <ArrowRight size={14} /></span>
                <strong>{cleanTitle(blogs[siblings.next]?.title || "")}</strong>
              </Link>
            ) : <span />}
          </div>
        </div>
      </section>
    </main>
  );
}
