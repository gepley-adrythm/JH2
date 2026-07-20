"use client";
import { useEffect } from "react";
import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import { Header, Footer, ContactWidget } from "./layout";
import { ContactFormProvider } from "./contact-form";
import { initTracking } from "./contact-form/analytics";
import RouteBackground from "./RouteBackground";

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
    initTracking();
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
