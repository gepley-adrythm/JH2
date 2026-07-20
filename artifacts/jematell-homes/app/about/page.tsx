import ContentPage from "@/views/ContentPage";
import { pageMetadata } from "@/seo/metadata";
import { contentPageMeta, contentPageJsonLd } from "@/lib/contentPageMeta";
import { JsonLd } from "@/seo/JsonLd";
import { pages } from "@/data/pages";

export const metadata = pageMetadata(contentPageMeta({ pageKey: "aboutus" }));

export default function About() {
  const jsonLd = contentPageJsonLd({ pageKey: "aboutus" });
  return (
    <>
      {jsonLd.length ? <JsonLd data={jsonLd} /> : null}
      <ContentPage pageKey="aboutus" data={pages["aboutus"]} />
    </>
  );
}
