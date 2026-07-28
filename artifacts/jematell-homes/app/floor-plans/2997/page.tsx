import { pageMetadata } from "@/seo/metadata";
import { breadcrumbJsonLd } from "@/seo/jsonldBuilders";
import { JsonLd } from "@/seo/JsonLd";
import { pages } from "@/data/pages";
import FloorPlan2997 from "@/views/FloorPlan2997";

export const metadata = pageMetadata({
  title: "2997 Floor Plan",
  description:
    "The Jematell Homes 2997 sq ft modern farmhouse floor plan — 5 bedrooms, 3.5 baths, a 2-car garage, and an upstairs bonus room. View full architectural drawings, all four elevations, and photos of the completed Modern Farmhouse.",
  canonical: "/floor-plans/2997",
  image: "/images/plans/2997-rendering.png",
});

// Finished-home carousel reuses the Modern Farmhouse gallery photos. Read here
// (server component) so the full `pages` dataset stays out of the client bundle.
const GALLERY = (pages["gallery_modern-farmhouse"]?.blocks ?? [])
  .filter((b) => b.type === "img" && b.src)
  .slice(0, 12)
  .map((b) => ({ src: b.src!, alt: b.alt || "The completed 2997 Modern Farmhouse built by Jematell Homes in Rio Verde, AZ" }));

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Floor Plans", url: "/floor-plans" },
            { name: "2997 Floor Plan", url: "/floor-plans/2997" },
          ]),
        ]}
      />
      <FloorPlan2997 galleryImages={GALLERY} />
    </>
  );
}
