import ContentPage from "@/views/ContentPage";
import { pageMetadata } from "@/seo/metadata";
import { contentPageMeta, contentPageJsonLd } from "@/lib/contentPageMeta";
import { JsonLd } from "@/seo/JsonLd";
import { pages } from "@/data/pages";
import { serviceJsonLd } from "@/seo/jsonldBuilders";
import { BuildOnYourLotHub } from "@/views/BuildOnYourLotHub";

export const metadata = pageMetadata(contentPageMeta({ pageKey: "build-on-your-lot" }));

export default function BuildOnYourLot() {
  const data = pages["build-on-your-lot"];
  const jsonLd = [
    ...contentPageJsonLd({ pageKey: "build-on-your-lot" }),
    serviceJsonLd({
      name: "Build on Your Lot Custom Home Construction",
      description: data.description,
      url: "/build-on-your-lot",
      ...(data.ogImage ? { image: data.ogImage } : {}),
    }),
  ];
  return (
    <>
      <JsonLd data={jsonLd} />
      <ContentPage pageKey="build-on-your-lot" data={data} hubSlot={<BuildOnYourLotHub />} />
    </>
  );
}
