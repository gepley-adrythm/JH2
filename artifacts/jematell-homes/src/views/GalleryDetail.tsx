"use client";
import React from "react";
import { m, useReducedMotion } from "framer-motion";
import { GALLERY_BY_SLUG } from "../data/galleryProjects";
import { cristImages, CRIST_HERO_JPG, CRIST_HERO_WEBP } from "../data/crist";

function isLocalPath(src: string): boolean {
  return src.startsWith("/") || src.startsWith("./") || !src.startsWith("http");
}

function webpPath(jpgSrc: string): string {
  return jpgSrc.replace(/\.jpe?g$/i, ".webp");
}

const isDev = process.env.NODE_ENV !== "production";

const DevDraggableGallery = isDev
  ? React.lazy(() =>
      import("../dev/DevDraggableGallery").then((m) => ({
        default: m.DevDraggableGallery,
      }))
    )
  : null;

export interface GalleryDetailImage {
  src: string;
  alt?: string;
}

interface GalleryDetailProps {
  slug: string;
  title?: string;
  ogImage?: string;
  images?: GalleryDetailImage[];
}

export default function GalleryDetail({ slug, title = "", ogImage, images = [] }: GalleryDetailProps) {
  const reduce = useReducedMotion();
  if (slug === "crist") {
    const imgs = cristImages();

    const devImages = isDev
      ? imgs.map((img, i) => ({
          key: img.jpg.split("/").pop()!.replace(/\.(jpg|jpeg|webp)$/i, ""),
          src: img.jpg,
          webp: img.webp,
          alt: img.alt,
          eager: i < 6,
        }))
      : null;

    return (
      <main className="page">
        <section className="gallery-detail-hero">
          <picture className="gallery-detail-hero-picture">
            <source srcSet={CRIST_HERO_WEBP} type="image/webp" />
            <img src={CRIST_HERO_JPG} alt="Skinner Custom" className="page-hero-bg" loading="eager" />
          </picture>
          <div className="page-hero-overlay" style={{ background: "linear-gradient(to top, rgba(22,22,22,0.72) 0%, rgba(22,22,22,0.2) 60%, transparent 100%)" }} />
          <div className="container page-hero-content gallery-detail-hero-content">
            <h1 className="page-hero-title">Skinner Custom</h1>
          </div>
        </section>
        <div className="gallery-detail-stats">
          <div className="container">
            <div className="gallery-detail-stats-inner">
              <div className="gallery-detail-stat">
                <span className="gallery-detail-stat-value">Custom</span>
                <span className="gallery-detail-stat-label">Build Type</span>
              </div>
              <div className="gallery-detail-stat-divider" />
              <div className="gallery-detail-stat">
                <span className="gallery-detail-stat-value">Surprise</span>
                <span className="gallery-detail-stat-label">Location</span>
              </div>
              <div className="gallery-detail-stat-divider" />
              <div className="gallery-detail-stat">
                <span className="gallery-detail-stat-value">2026</span>
                <span className="gallery-detail-stat-label">Completed</span>
              </div>
            </div>
          </div>
        </div>
        <section className="section-pad" style={{ background: "var(--color-bg)", paddingTop: 0 }}>
          <div className="gallery-masonry-wrap">
            {isDev && DevDraggableGallery && devImages ? (
              <React.Suspense fallback={null}>
                <DevDraggableGallery
                  initialImages={devImages}
                  slug="crist"
                  masonryClass="gallery-masonry gallery-masonry-crist"
                />
              </React.Suspense>
            ) : (
              <div className="gallery-masonry gallery-masonry-crist">
                {imgs.map((img, i) => (
                  <m.figure
                    key={i}
                    className="gallery-masonry-item"
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, delay: (i % 5) * 0.06 }}
                  >
                    <picture>
                      <source srcSet={img.webp} type="image/webp" />
                      <img
                        src={img.jpg}
                        alt={img.alt}
                        loading={i < 6 ? "eager" : "lazy"}
                      />
                    </picture>
                  </m.figure>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    );
  }

  const devImages = isDev
    ? images.map((img, i) => ({
        key: img.src,
        src: img.src,
        webp: isLocalPath(img.src) ? webpPath(img.src) : undefined,
        alt: img.alt || title,
        eager: i < 4,
      }))
    : null;

  return (
    <main className="page">
      <section className="gallery-detail-hero">
        {ogImage ? (
          isLocalPath(ogImage) ? (
            <picture className="gallery-detail-hero-picture">
              <source srcSet={webpPath(ogImage)} type="image/webp" />
              <img src={ogImage} alt="" className="page-hero-bg" loading="eager" />
            </picture>
          ) : (
            <img src={ogImage} alt="" className="page-hero-bg" loading="eager" />
          )
        ) : null}
        <div className="page-hero-overlay" />
        <div className="container page-hero-content gallery-detail-hero-content">
          <h1 className="page-hero-title">{title}</h1>
        </div>
      </section>
      {(() => {
        const proj = GALLERY_BY_SLUG[slug];
        const stats = [
          proj?.buildType  && { value: proj.buildType,  label: "Build Type" },
          proj?.location   && { value: proj.location,   label: "Location" },
          proj?.completed  && { value: proj.completed,  label: "Completed" },
        ].filter(Boolean) as { value: string; label: string }[];
        if (stats.length === 0) return null;
        return (
          <div className="gallery-detail-stats">
            <div className="container">
              <div className="gallery-detail-stats-inner">
                {stats.map((s, i) => (
                  <React.Fragment key={s.label}>
                    {i > 0 && <div className="gallery-detail-stat-divider" />}
                    <div className="gallery-detail-stat">
                      <span className="gallery-detail-stat-value">{s.value}</span>
                      <span className="gallery-detail-stat-label">{s.label}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        );
      })()}
      <section className="section-pad" style={{ background: "var(--color-bg)", paddingTop: 0 }}>
        <div className="gallery-masonry-wrap">
          {isDev && DevDraggableGallery && devImages ? (
            <React.Suspense fallback={null}>
              <DevDraggableGallery
                initialImages={devImages}
                slug={slug}
                masonryClass="gallery-masonry"
              />
            </React.Suspense>
          ) : (
            <div className="gallery-masonry">
              {images.map((img, i) => (
                <m.figure
                  key={i}
                  className="gallery-masonry-item"
                  initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                  whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: (i % 4) * 0.07 }}
                >
                  {isLocalPath(img.src) ? (
                    <picture>
                      <source srcSet={webpPath(img.src)} type="image/webp" />
                      <img src={img.src} alt={img.alt || title} loading={i < 4 ? "eager" : "lazy"} />
                    </picture>
                  ) : (
                    <img src={img.src} alt={img.alt || title} loading={i < 4 ? "eager" : "lazy"} />
                  )}
                </m.figure>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
