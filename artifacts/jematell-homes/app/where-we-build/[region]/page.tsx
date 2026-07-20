import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentPage from "@/views/ContentPage";
import { pageMetadata } from "@/seo/metadata";
import { contentPageMeta, contentPageJsonLd } from "@/lib/contentPageMeta";
import { JsonLd } from "@/seo/JsonLd";
import { locations } from "@/config/siteConfig";
import { pages } from "@/data/pages";

export const dynamicParams = false;

export function generateStaticParams() {
  // Same source the old prerender used: the canonical locations list
  // (locationHref(slug) === /where-we-build/<slug>).
  return locations.map((loc) => ({ region: loc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  return pageMetadata(contentPageMeta({ region }));
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region } = await params;
  if (!pages[region]) notFound();
  const jsonLd = contentPageJsonLd({ region });
  return (
    <>
      {jsonLd.length ? <JsonLd data={jsonLd} /> : null}
      <ContentPage isRegion region={region} data={pages[region]} />
    </>
  );
}
