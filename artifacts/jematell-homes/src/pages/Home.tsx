import React from "react";
import { Hero, About, StatsStrip, ServicesSplit, Process, WhereWeBuild, Reviews } from "../sections";
import { CTA } from "../cta";

export default function Home() {
  return (
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
  );
}
