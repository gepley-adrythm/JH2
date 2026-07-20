import ContentPage from "@/views/ContentPage";
import { pageMetadata } from "@/seo/metadata";
import { contentPageMeta, contentPageJsonLd } from "@/lib/contentPageMeta";
import { JsonLd } from "@/seo/JsonLd";
import { pages } from "@/data/pages";

export const metadata = pageMetadata(contentPageMeta({ pageKey: "buy-a-lot-with-us" }));

export default function BuyALotWithUs() {
  const jsonLd = contentPageJsonLd({ pageKey: "buy-a-lot-with-us" });
  return (
    <>
      {jsonLd.length ? <JsonLd data={jsonLd} /> : null}
      <ContentPage pageKey="buy-a-lot-with-us" data={pages["buy-a-lot-with-us"]} />
    </>
  );
}
