import ContentPage from "@/views/ContentPage";
import { pageMetadata } from "@/seo/metadata";
import { contentPageMeta, contentPageJsonLd } from "@/lib/contentPageMeta";
import { JsonLd } from "@/seo/JsonLd";
import { pages } from "@/data/pages";

export const metadata = pageMetadata(contentPageMeta({ pageKey: "privacypolicy" }));

export default function Privacy() {
  const jsonLd = contentPageJsonLd({ pageKey: "privacypolicy" });
  return (
    <>
      {jsonLd.length ? <JsonLd data={jsonLd} /> : null}
      <ContentPage pageKey="privacypolicy" data={pages["privacypolicy"]} />
    </>
  );
}
