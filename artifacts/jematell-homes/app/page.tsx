import { preload } from "react-dom";
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
  // LCP hero image — same early-preload the old index.html template did.
  preload("/images/hero-1280.webp", {
    as: "image",
    fetchPriority: "high",
    imageSrcSet:
      "/images/hero-768.webp 768w, /images/hero-1280.webp 1280w, /images/hero-1920.webp 1920w, /images/hero-2500.webp 2500w",
    imageSizes: "(orientation: portrait) 200vw, 100vw",
  });
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
