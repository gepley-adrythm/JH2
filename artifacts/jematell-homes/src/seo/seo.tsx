/**
 * seo.tsx — head management that works in both render modes:
 *  - SSR/SSG: a HeadSink is provided via SeoSinkContext; <Seo> and <SiteJsonLd>
 *    write into it during render, and entry-server serializes it into <head>.
 *  - CSR / client navigation: no sink is provided; the components imperatively
 *    update document.head in an effect so the tab title / meta / JSON-LD stay
 *    correct as the SPA navigates.
 *
 * Exactly one <Seo> renders per page; <SiteJsonLd> renders once in AppShell.
 */
import { createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { siteConfig } from "../config/siteConfig";
import {
  SITE_URL,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  absoluteUrl,
  buildSiteJsonLd,
} from "./siteMeta";

export interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

export interface HeadSink {
  title: string;
  metas: MetaTag[];
  canonical: string;
  siteJsonLd: object[];
  pageJsonLd: object[];
}

export function createHeadSink(): HeadSink {
  return { title: "", metas: [], canonical: "", siteJsonLd: [], pageJsonLd: [] };
}

export const SeoSinkContext = createContext<HeadSink | null>(null);

export function formatTitle(title?: string): string {
  const brand = siteConfig.brand.name;
  const t = (title || "").trim();
  if (!t || t.toLowerCase() === brand.toLowerCase()) return brand;
  return `${t} — ${brand}`;
}

export interface SeoProps {
  title?: string;
  description?: string;
  /** Site-relative path or absolute URL. Defaults to the current pathname. */
  canonical?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  jsonLd?: object | object[];
}

interface Resolved {
  title: string;
  description: string;
  canonical: string;
  image: string;
  type: string;
  robots: string;
  jsonLd: object[];
}

function resolveSeo(props: SeoProps, pathname: string): Resolved {
  const jsonLd = props.jsonLd
    ? Array.isArray(props.jsonLd)
      ? props.jsonLd
      : [props.jsonLd]
    : [];
  return {
    title: formatTitle(props.title),
    description: props.description || DEFAULT_DESCRIPTION,
    canonical: props.canonical ? absoluteUrl(props.canonical) : absoluteUrl(pathname),
    image: absoluteUrl(props.image || DEFAULT_OG_IMAGE),
    type: props.type || "website",
    robots: props.noindex ? "noindex, nofollow" : "index, follow",
    jsonLd,
  };
}

function buildMetas(r: Resolved): MetaTag[] {
  return [
    { name: "description", content: r.description },
    { name: "robots", content: r.robots },
    { property: "og:title", content: r.title },
    { property: "og:description", content: r.description },
    { property: "og:type", content: r.type },
    { property: "og:url", content: r.canonical },
    { property: "og:image", content: r.image },
    { property: "og:site_name", content: siteConfig.brand.name },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: r.title },
    { name: "twitter:description", content: r.description },
    { name: "twitter:image", content: r.image },
  ];
}

function applyToDocument(r: Resolved) {
  document.title = r.title;
  for (const m of buildMetas(r)) {
    const sel = m.name ? `meta[name="${m.name}"]` : `meta[property="${m.property}"]`;
    let el = document.head.querySelector<HTMLMetaElement>(sel);
    if (!el) {
      el = document.createElement("meta");
      if (m.name) el.setAttribute("name", m.name);
      if (m.property) el.setAttribute("property", m.property);
      el.setAttribute("data-seo", "");
      document.head.appendChild(el);
    }
    el.setAttribute("content", m.content);
  }
  let canon = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canon) {
    canon = document.createElement("link");
    canon.setAttribute("rel", "canonical");
    canon.setAttribute("data-seo", "");
    document.head.appendChild(canon);
  }
  canon.setAttribute("href", r.canonical);

  document.head.querySelectorAll("script[data-seo-jsonld]").forEach((n) => n.remove());
  for (const obj of r.jsonLd) {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.setAttribute("data-seo-jsonld", "");
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  }
}

export function Seo(props: SeoProps) {
  const sink = useContext(SeoSinkContext);
  const location = useLocation();
  const r = resolveSeo(props, location.pathname);
  if (sink) {
    sink.title = r.title;
    sink.canonical = r.canonical;
    sink.metas = buildMetas(r);
    sink.pageJsonLd = r.jsonLd;
  }
  const jsonLdKey = JSON.stringify(r.jsonLd);
  useEffect(() => {
    applyToDocument(r);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [r.title, r.description, r.canonical, r.image, r.type, r.robots, jsonLdKey]);
  return null;
}

export function SiteJsonLd() {
  const sink = useContext(SeoSinkContext);
  if (sink) {
    sink.siteJsonLd = buildSiteJsonLd();
  }
  useEffect(() => {
    if (document.head.querySelector("script[data-site-jsonld]")) return;
    for (const obj of buildSiteJsonLd()) {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.setAttribute("data-site-jsonld", "");
      s.textContent = JSON.stringify(obj);
      document.head.appendChild(s);
    }
  }, []);
  return null;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function jsonLdScript(obj: object): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

/** Serialize a HeadSink into an HTML string for injection into <head> (SSR). */
export function serializeHead(sink: HeadSink): string {
  const parts: string[] = [];
  parts.push(`<title>${escapeHtml(sink.title || siteConfig.brand.name)}</title>`);
  for (const m of sink.metas) {
    const attr = m.name
      ? `name="${escapeHtml(m.name)}"`
      : `property="${escapeHtml(m.property!)}"`;
    parts.push(`<meta ${attr} content="${escapeHtml(m.content)}" data-seo />`);
  }
  if (sink.canonical) {
    parts.push(`<link rel="canonical" href="${escapeHtml(sink.canonical)}" data-seo />`);
  }
  for (const obj of sink.siteJsonLd) {
    parts.push(
      `<script type="application/ld+json" data-site-jsonld>${jsonLdScript(obj)}</script>`,
    );
  }
  for (const obj of sink.pageJsonLd) {
    parts.push(
      `<script type="application/ld+json" data-seo-jsonld>${jsonLdScript(obj)}</script>`,
    );
  }
  return parts.join("\n    ");
}
