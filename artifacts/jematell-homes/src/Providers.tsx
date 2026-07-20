"use client";
import { useEffect } from "react";
import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import { Header, Footer, ContactWidget } from "./layout";
import { ContactFormProvider } from "./contact-form";
import RouteBackground from "./RouteBackground";

// domAnimation loads SYNCHRONOUSLY on purpose. The async LazyMotion pattern
// (features={() => import(...)}) left every m. component inert under the App
// Router: whileInView reveals kept their server-rendered opacity:0 style and
// entire sections stayed invisible. ~16KB gzip back in the shared bundle is
// the price of animations actually running; the audit budget accounts for it.

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
    <LazyMotion features={domAnimation} strict>
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
