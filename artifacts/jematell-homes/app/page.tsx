import { preload } from "react-dom";
import { pageMetadata } from "@/seo/metadata";
import { Hero, About, ServicesSplit, Process, Reviews, FeaturedProjects } from "@/sections";
import { CTA } from "@/cta";

export const metadata = pageMetadata({
  title: "Custom & Semi-Custom Home Builder in Arizona",
  description:
    "Jematell Homes is a family-owned Arizona custom home builder serving Scottsdale, Rio Verde, and the greater Phoenix metro: quietly luxurious homes built with passion, integrity, and a personal touch.",
  canonical: "/",
});

export default function Home() {
  // LCP hero image — same early-preload the old index.html template did.
  preload("/images/hero.jpg", { as: "image", fetchPriority: "high" });
  return (
    <main>
      <Hero />
      <About />
      <ServicesSplit />
      <Process />
      <FeaturedProjects />
      <Reviews />
      <CTA />
    </main>
  );
}
