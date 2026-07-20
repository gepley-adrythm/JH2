import ContentPage from "@/views/ContentPage";
import { pageMetadata } from "@/seo/metadata";
import { contentPageMeta, contentPageJsonLd } from "@/lib/contentPageMeta";
import { JsonLd } from "@/seo/JsonLd";
import { pages } from "@/data/pages";

// contentPageMeta sets noindex for thankyou, matching the old
// <Seo noindex={key === "thankyou"} /> behavior.
export const metadata = pageMetadata(contentPageMeta({ pageKey: "thankyou" }));

export default function ThankYou() {
  const jsonLd = contentPageJsonLd({ pageKey: "thankyou" });
  return (
    <>
      {jsonLd.length ? <JsonLd data={jsonLd} /> : null}
      <ContentPage pageKey="thankyou" data={pages["thankyou"]} />
    </>
  );
}
