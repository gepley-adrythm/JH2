import { pageMetadata } from "@/seo/metadata";
import { breadcrumbJsonLd } from "@/seo/jsonldBuilders";
import { JsonLd } from "@/seo/JsonLd";
import FloorPlan1604 from "@/views/FloorPlan1604";

export const metadata = pageMetadata({
  title: "1604 Floor Plan",
  description: "The Jematell Homes 1604 sq ft floor plan — 3 bed, 2 bath, 2-car garage. View full architectural drawings, all four elevations, and photos of the completed home.",
  canonical: "/floor-plans/1604",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Floor Plans", url: "/floor-plans" },
            { name: "1604 Floor Plan", url: "/floor-plans/1604" },
          ]),
        ]}
      />
      <FloorPlan1604 />
    </>
  );
}
