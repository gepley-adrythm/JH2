"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { m, useReducedMotion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { ResponsiveImage } from "../components/ResponsiveImage";

const INTRO =
  "Expert advice on home building, custom design, and life in Arizona, from our family to yours.";

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  image: string;
}

export function BlogIndexClient({ posts }: { posts: BlogPostMeta[] }) {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }, [posts, query]);

  return (
    <>
      <section className="page-hero faq-hero" style={{ alignItems: "center", minHeight: "65vh" }}>
        <ResponsiveImage
          name="cta-bg"
          className="page-hero-bg"
          alt=""
          widths={[768, 1280, 1920, 2500]}
          sizes="100vw"
          width={2500}
          height={1667}
          priority
        />
        <div className="page-hero-overlay" style={{ background: "linear-gradient(180deg, rgba(10,12,14,0.25) 0%, rgba(10,12,14,0.45) 100%)" }} />
        <div className="container page-hero-content" style={{ textAlign: "center", maxWidth: "100%" }}>
          <h1 className="page-hero-title hero-title" style={{ textTransform: "uppercase" }}>Blog Articles</h1>
        </div>
      </section>

      <div className="container" style={{ paddingTop: "clamp(20px, 3vw, 32px)" }}>
        <Link
          href="/resources"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
            textDecoration: "none",
          }}
        >
          ← Resources
        </Link>
      </div>

      <section className="section-pad" style={{ background: "var(--color-bg)", paddingTop: "clamp(24px, 3vw, 40px)" }}>
        <div className="container">
          <p className="page-hero-sub" style={{ color: "var(--color-text)", marginBottom: 24, textAlign: "center", maxWidth: 620, marginInline: "auto" }}>{INTRO}</p>
          <div className="faq-search" role="search" style={{ maxWidth: 560, marginBottom: 32, marginInline: "auto" }}>
            <Search size={18} aria-hidden="true" />
            <input
              type="search"
              placeholder="Search articles…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              data-testid="blog-search"
              aria-label="Search blog"
            />
          </div>
          <div className="blog-meta-bar">
            <span>{filtered.length} {filtered.length === 1 ? "article" : "articles"}</span>
          </div>
          <div className="blog-grid">
            {filtered.map((post, i) => (
              <m.article
                key={post.slug}
                className="blog-card"
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              >
                <Link href={`/blog/${post.slug}`} data-testid={`blog-card-${post.slug}`}>
                  {post.image ? (
                    <div className="blog-card-media">
                      <img src={post.image} alt={post.title} loading="lazy" />
                    </div>
                  ) : (
                    <div className="blog-card-media blog-card-placeholder" />
                  )}
                  <div className="blog-card-body">
                    <h2 className="blog-card-title">{post.title}</h2>
                    {post.description ? (
                      <p className="blog-card-desc">{post.description}</p>
                    ) : null}
                    <span className="blog-card-link">
                      Read article <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </m.article>
            ))}
          </div>
          {filtered.length === 0 ? (
            <p style={{ textAlign: "center", padding: "80px 0", color: "var(--color-text-muted)" }}>
              No articles match &ldquo;{query}&rdquo;. Try another search.
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
}
