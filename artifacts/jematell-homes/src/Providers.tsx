"use client";
import { useEffect } from "react";
import { LazyMotion, MotionConfig } from "framer-motion";
import { Header, Footer, ContactWidget } from "./layout";
import { ContactFormProvider } from "./contact-form";
import RouteBackground from "./RouteBackground";

// domAnimation is loaded async (LazyMotion's code-splitting pattern) so the
// feature bundle stays out of the initial route JS; m. components render
// their server-rendered initial styles until it lands just after hydration.
const loadMotionFeatures = () =>
  import("./motionFeatures").then((mod) => mod.default);

/**
 * Providers — the client shell around every page. Pages themselves are server
 * components; they flow through as `children`, so the corpus content never
 * enters the client bundle. This replaces AppShell from the Vite build
 * (ScrollToTop is gone: the App Router restores scroll natively).
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Capture first-touch attribution (UTMs / referrer) as soon as the app
    // mounts, before any client-side navigation changes the URL or referrer.
    // Loaded async so the analytics module stays out of the initial route JS;
    // the effect still runs on first mount, before any user-driven navigation.
    void import("./contact-form/analytics").then((mod) => mod.initTracking());
  }, []);

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <ContactFormProvider>
          <RouteBackground />
          <Header />
          {children}
          <Footer />
          <ContactWidget />
        </ContactFormProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
