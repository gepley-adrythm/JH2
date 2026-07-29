import { pageMetadata } from "@/seo/metadata";
import { absoluteUrl } from "@/seo/siteMeta";
import { Hero, About, ServicesSplit, Process, Reviews, FeaturedProjects, HomepageFloorPlans } from "@/sections";
import { CTA } from "@/cta";

export const metadata = pageMetadata({
  title: "Custom & Semi-Custom Home Builder in Arizona",
  description:
    "Jematell Homes is a family-owned Arizona custom home builder serving Scottsdale, Rio Verde, and the greater Phoenix metro: quietly luxurious homes built with passion, integrity, and a personal touch.",
  canonical: "/",
});

export default function Home() {
  // The hero's preload is emitted by ResponsiveImage (priority) so the hint
  // always matches the rendered <picture> — a manual webp preload here would
  // double-download now that the picture serves AVIF first.
  return (
    <main>
      {/* Root canonical/og:url carry the trailing slash to stay byte-identical
          with the old build and sitemap.xml. Next's metadata resolver strips it
          under trailingSlash:false, so pageMetadata omits both for "/" and the
          tags are rendered here instead (React hoists them into <head>). */}
      <link rel="canonical" href={absoluteUrl("/")} />
      <meta property="og:url" content={absoluteUrl("/")} />
      <Hero />
      <About />
      <ServicesSplit />
      <Process />
      <FeaturedProjects />
      <Reviews />
      <HomepageFloorPlans />
      <CTA />
    </main>
  );
}
