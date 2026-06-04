import React from "react";
import { useParams, Link } from "react-router-dom";
import { m, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { pages } from "../data/pages";
import { Seo } from "../seo/seo";
import { breadcrumbJsonLd } from "../seo/jsonld";
import NotFound from "./not-found";

export default function GalleryDetail() {
  const { slug } = useParams();
  const reduce = useReducedMotion();
  const data = pages[`gallery_${slug}`];
  if (!data) return <NotFound />;

  const title = data.title.replace(/\s*[—–-]\s*Jematell Homes\s*$/i, "").trim();
  const images = data.blocks.filter((b) => b.type === "img" && b.src);
  const path = `/gallery/${slug}`;

  return (
    <main className="page">
      <Seo
        title={title}
        description={data.description || `${title} — a custom home built by Jematell Homes in Arizona.`}
        canonical={path}
        image={data.ogImage}
        jsonLd={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Gallery", url: "/gallery" },
          { name: title, url: path },
        ])}
      />
      <section className="gallery-detail-hero">
        {data.ogImage ? <img src={data.ogImage} alt="" className="page-hero-bg" /> : null}
        <div className="page-hero-overlay" />
        <div className="container page-hero-content">
          <Link to="/gallery" className="gallery-back" data-testid="gallery-back">
            <ArrowLeft size={16} /> Back to Gallery
          </Link>
          <h1 className="page-hero-title">{title}</h1>
          {data.description ? <p className="page-hero-sub">{data.description}</p> : null}
        </div>
      </section>
      <section className="section-pad" style={{ background: "var(--color-bg)" }}>
        <div className="container">
          <div className="gallery-masonry">
            {images.map((img, i) => (
              <m.figure
                key={i}
                className="gallery-masonry-item"
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
              >
                <img src={img.src!} alt={img.alt || title} loading="lazy" />
              </m.figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
