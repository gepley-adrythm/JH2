import type { MetadataRoute } from "next";
import { SITE_URL } from "@/seo/siteMeta";
import { getAllRoutes } from "@/lib/routeList";

export const dynamic = "force-static";

/** sitemap.xml — same URL set as the old prerender (no lastmod/priority, matching the previous output). */
export default function sitemap(): MetadataRoute.Sitemap {
  return getAllRoutes().map((r) => ({ url: `${SITE_URL}${r}` }));
}
