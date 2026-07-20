import ContentPage from "@/views/ContentPage";
import { pageMetadata } from "@/seo/metadata";
import { contentPageMeta, contentPageJsonLd } from "@/lib/contentPageMeta";
import { JsonLd } from "@/seo/JsonLd";
import { pages } from "@/data/pages";

export const metadata = pageMetadata(contentPageMeta({ pageKey: "build-on-your-lot" }));

export default function BuildOnYourLot() {
  const jsonLd = contentPageJsonLd({ pageKey: "build-on-your-lot" });
  return (
    <>
      {jsonLd.length ? <JsonLd data={jsonLd} /> : null}
      <ContentPage pageKey="build-on-your-lot" data={pages["build-on-your-lot"]} />
    </>
  );
}
