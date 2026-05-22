import React from "react";
import { Header, Footer, ContactWidget } from "./layout";
import { Hero, About, StatsStrip, ServicesSplit, Process, WhereWeBuild, Reviews } from "./sections";
import { CTA } from "./cta";

export default function App() {
  return (
    <>
      <Header />
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
      <Footer />
      <ContactWidget />
    </>
  );
}
