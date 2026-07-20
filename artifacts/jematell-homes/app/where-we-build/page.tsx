import ContentPage from "@/views/ContentPage";
import { pageMetadata } from "@/seo/metadata";
import { contentPageMeta, contentPageJsonLd } from "@/lib/contentPageMeta";
import { JsonLd } from "@/seo/JsonLd";
import { pages } from "@/data/pages";
import { locations } from "@/config/siteConfig";

export const metadata = pageMetadata(contentPageMeta({ pageKey: "where-we-build" }));

export default function WhereWeBuild() {
  const jsonLd = contentPageJsonLd({ pageKey: "where-we-build" });
  // slug -> ogImage for the CityNavigator, resolved server-side so the client
  // bundle does not need the full pages dataset.
  const cityImages: Record<string, string> = {};
  for (const loc of locations) {
    const og = pages[loc.slug]?.ogImage;
    if (og) cityImages[loc.slug] = og;
  }
  return (
    <>
      {jsonLd.length ? <JsonLd data={jsonLd} /> : null}
      <ContentPage pageKey="where-we-build" data={pages["where-we-build"]} cityImages={cityImages} />
    </>
  );
}
