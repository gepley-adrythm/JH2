import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { m, useReducedMotion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { blogs } from "../data/blogs";
import { Seo } from "../seo/seo";
import { collectionJsonLd } from "../seo/jsonld";
import { ResponsiveImage } from "../components/ResponsiveImage";

const INTRO =
  "Expert advice on home building, custom design, and life in Arizona, from our family to yours.";

interface PostMeta {
  slug: string;
  title: string;
  description: string;
  image: string;
}

function isRealPost(slug: string): boolean {
  if (slug === "blog-articles") return false;
  if (/[%+]/.test(slug)) return false;
  if (/^(category_|tag_|author_)/i.test(slug)) return false;
  return true;
}

function buildList(): PostMeta[] {
  const out: PostMeta[] = [];
  for (const [slug, data] of Object.entries(blogs)) {
    if (!data || !data.title) continue;
    if (!isRealPost(slug)) continue;
    const title = data.title.replace(/\s*[—–-]\s*Jematell Homes\s*$/i, "").trim();
    const image =
      data.ogImage ||
      data.blocks.find((b) => b.type === "img" && b.src)?.src ||
      "";
    out.push({
      slug,
      title,
      description: data.description || "",
      image,
    });
  }
  return out;
}

export default function Blog() {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const list = useMemo(buildList, []);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }, [list, query]);

  return (
    <main className="page">
      <Seo
        title="Blog"
        description="Expert advice on home building, custom design, and life in Arizona, from the Jematell Homes family to yours."
        canonical="/blog"
        jsonLd={collectionJsonLd({
          name: "Blog - Jematell Homes",
          description: "Expert advice on home building, custom design, and life in Arizona.",
          url: "/blog",
        })}
      />
      <section className="page-hero faq-hero">
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
        <div className="page-hero-overlay" />
        <div className="container page-hero-content">
          <span className="eyebrow page-hero-eyebrow">Journal</span>
          <h1 className="faq-hero-title hero-title">Blog Articles</h1>
          <p className="page-hero-sub hero-subtitle">{INTRO}</p>
          <div className="faq-search hero-cta" role="search">
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
        </div>
      </section>
      <section className="section-pad" style={{ background: "var(--color-bg)" }}>
        <div className="container">
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
                <Link to={`/blog/${post.slug}`} data-testid={`blog-card-${post.slug}`}>
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
              No articles match "{query}". Try another search.
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
}
