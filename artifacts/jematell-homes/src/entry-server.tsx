import { StaticRouter } from "react-router-dom";
import { renderToString } from "react-dom/server";
import AppShell from "./AppShell";
import { createHeadSink, serializeHead, SeoSinkContext } from "./seo/seo";
import { pages } from "./data/pages";
import { blogs } from "./data/blogs";
import { locations, locationHref } from "./config/siteConfig";
import { faqRoutes } from "./data/faq";

export { SITE_URL } from "./seo/siteMeta";

const BASENAME = (import.meta.env.BASE_URL || "/").replace(/\/$/, "") || "/";

export interface RenderResult {
  html: string;
  head: string;
}

/** Render a single in-app path to its HTML body + serialized <head>. */
export function render(pathname: string): RenderResult {
  const sink = createHeadSink();
  const html = renderToString(
    <SeoSinkContext.Provider value={sink}>
      <StaticRouter location={pathname} basename={BASENAME}>
        <AppShell />
      </StaticRouter>
    </SeoSinkContext.Provider>,
  );
  return { html, head: serializeHead(sink) };
}

function isRealPost(slug: string): boolean {
  if (slug === "blog-articles") return false;
  if (/[%+]/.test(slug)) return false;
  if (/^(category_|tag_|author_)/i.test(slug)) return false;
  return true;
}

/** The full list of in-app paths to pre-render. Single source for the sitemap. */
export function getRoutes(): string[] {
  const routes = new Set<string>([
    "/",
    "/gallery",
    "/custom-homes",
    "/spec-homes",
    "/floor-plans",
    "/where-we-build",
    "/build-on-your-lot",
    "/buy-a-lot-with-us",
    "/about",
    "/contact",
    "/warranty",
    "/privacy",
    "/thank-you",
    "/blog",
    "/llm-info",
  ]);
  for (const loc of locations) routes.add(locationHref(loc.slug));
  routes.add("/gallery/crist");
  for (const key of Object.keys(pages)) {
    if (key.startsWith("gallery_")) {
      routes.add(`/gallery/${key.slice("gallery_".length)}`);
    }
  }
  for (const slug of Object.keys(blogs)) {
    if (isRealPost(slug)) routes.add(`/blog/${slug}`);
  }
  for (const r of faqRoutes()) routes.add(r);
  return Array.from(routes);
}
