import React from "react";
import { MotionConfig } from "framer-motion";
import { Hero, About, ServicesSplit, Process, WhereWeBuild, Reviews } from "../sections";
import { CTA } from "../cta";
import { Seo } from "../seo/seo";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <Seo
        title="Custom & Semi-Custom Home Builder in Arizona"
        description="Jematell Homes is a family-owned Arizona custom home builder serving Scottsdale, Rio Verde, and the greater Phoenix metro: quietly luxurious homes built with passion, integrity, and a personal touch."
        canonical="/"
      />
      <main>
        <Hero />
        <About />
        <ServicesSplit />
        <Process />
        <WhereWeBuild />
        <Reviews />
        <CTA />
      </main>
    </MotionConfig>
  );
}
