import React, { useEffect, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig, LazyMotion, domAnimation } from "framer-motion";
import { Header, Footer, ContactWidget } from "./layout";
import { ContactFormProvider } from "./contact-form";
import { initTracking } from "./contact-form/analytics";
import RouteBackground from "./RouteBackground";
import { SiteJsonLd } from "./seo/seo";
import Home from "./pages/Home";
import NotFound from "./pages/not-found";
import {
  ContentPage,
  Gallery,
  GalleryDetail,
  Blog,
  BlogPost,
  Contact,
  FaqIndex,
  FaqTopic,
  FaqDetail,
} from "./routes";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

/**
 * AppShell — the entire application tree *inside* the router. It is
 * router-agnostic: the client wraps it in <BrowserRouter> (App.tsx) and the
 * server wraps it in <StaticRouter> (entry-server.tsx). This split is what makes
 * SSG possible without duplicating the layout/routes.
 */
export default function AppShell() {
  useEffect(() => {
    // Capture first-touch attribution (UTMs / referrer) as soon as the app
    // mounts, before any client-side navigation changes the URL or referrer.
    initTracking();
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
      <ContactFormProvider>
        <SiteJsonLd />
        <RouteBackground />
        <ScrollToTop />
        <Header />
        <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:slug" element={<GalleryDetail />} />
          <Route path="/custom-homes" element={<ContentPage pageKey="custom-homes" />} />
          <Route path="/spec-homes" element={<ContentPage pageKey="spechomes" />} />
          <Route path="/floor-plans" element={<ContentPage pageKey="floorplans" />} />
          <Route path="/where-we-build" element={<ContentPage pageKey="where-we-build" />} />
          <Route path="/build-on-your-lot" element={<ContentPage pageKey="build-on-your-lot" />} />
          <Route path="/buy-a-lot-with-us" element={<ContentPage pageKey="buy-a-lot-with-us" />} />
          <Route path="/where-we-build/:region" element={<ContentPage isRegion />} />
          <Route path="/about" element={<ContentPage pageKey="aboutus" />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/warranty" element={<ContentPage pageKey="warranty" />} />
          <Route path="/privacy" element={<ContentPage pageKey="privacypolicy" />} />
          <Route path="/thank-you" element={<ContentPage pageKey="thankyou" />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/faq" element={<FaqIndex />} />
          <Route path="/faq/topics/:slug" element={<FaqTopic />} />
          <Route path="/faq/:slug" element={<FaqDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
        <Footer />
        <ContactWidget />
      </ContactFormProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
