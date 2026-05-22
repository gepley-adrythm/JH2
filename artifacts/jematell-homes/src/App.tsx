import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Header, Footer, ContactWidget } from "./layout";
import Home from "./pages/Home";
import NotFound from "./pages/not-found";
import ContentPage from "./pages/ContentPage";
import Gallery from "./pages/Gallery";
import GalleryDetail from "./pages/GalleryDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

const BASENAME = (import.meta.env.BASE_URL || "/").replace(/\/$/, "") || "/";

export default function App() {
  return (
    <BrowserRouter basename={BASENAME}>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:slug" element={<GalleryDetail />} />
        <Route path="/custom-homes" element={<ContentPage pageKey="custom-homes" />} />
        <Route path="/spec-homes" element={<ContentPage pageKey="spechomes" />} />
        <Route path="/floor-plans" element={<ContentPage pageKey="floorplans" />} />
        <Route path="/where-we-build" element={<ContentPage pageKey="where-we-build" />} />
        <Route path="/where-we-build/:region" element={<ContentPage isRegion />} />
        <Route path="/about" element={<ContentPage pageKey="aboutus" />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/warranty" element={<ContentPage pageKey="warranty" />} />
        <Route path="/privacy" element={<ContentPage pageKey="privacypolicy" />} />
        <Route path="/thank-you" element={<ContentPage pageKey="thankyou" />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ContactWidget />
    </BrowserRouter>
  );
}
