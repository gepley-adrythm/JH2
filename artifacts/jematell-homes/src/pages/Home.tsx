import React from "react";
import { MotionConfig } from "framer-motion";
import { Hero, About, StatsStrip, ServicesSplit, Process, WhereWeBuild, Reviews } from "../sections";
import { CTA } from "../cta";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <Hero />
        <About />
        <StatsStrip />
        <ServicesSplit />
        <Process />
        <WhereWeBuild />
        <Reviews />
        <CTA />
      </main>
    </MotionConfig>
  );
}
