import ContentPage from "@/views/ContentPage";
import { pageMetadata } from "@/seo/metadata";
import { contentPageMeta, contentPageJsonLd } from "@/lib/contentPageMeta";
import { JsonLd } from "@/seo/JsonLd";
import { pages } from "@/data/pages";

export const metadata = pageMetadata(contentPageMeta({ pageKey: "floorplans" }));

export default function FloorPlans() {
  const jsonLd = contentPageJsonLd({ pageKey: "floorplans" });
  return (
    <>
      {jsonLd.length ? <JsonLd data={jsonLd} /> : null}
      <ContentPage pageKey="floorplans" data={pages["floorplans"]} />
    </>
  );
}
