import React from "react";

/**
 * Per-route components are eagerly imported on the server and lazily imported on
 * the client:
 *
 * - SSG (`renderToString` in entry-server) is synchronous and cannot suspend on
 *   `React.lazy`, so the server build awaits the real modules at load time and
 *   renders full HTML for every route.
 * - The client build code-splits each page into its own chunk, so the initial
 *   bundle only ships the shell + Home; other pages load on navigation (and,
 *   during hydration, React 18 keeps the server HTML visible until the matched
 *   chunk resolves — no blank flash).
 *
 * Vite replaces `import.meta.env.SSR` with a literal per build, so the unused
 * branch — and its imports — are tree-shaken out of each bundle.
 *
 * Home and NotFound are intentionally NOT split (see AppShell): Home is the LCP
 * landing page and belongs in the initial bundle; NotFound is tiny.
 */
type RouteComp =
  | React.ComponentType<any>
  | React.LazyExoticComponent<React.ComponentType<any>>;

let Gallery: RouteComp;
let GalleryDetail: RouteComp;
let Blog: RouteComp;
let BlogPost: RouteComp;
let Contact: RouteComp;
let ContentPage: RouteComp;
let FaqIndex: RouteComp;
let FaqTopic: RouteComp;
let FaqDetail: RouteComp;
let LlmInfo: RouteComp;
let Resources: RouteComp;
let GlossaryIndex: RouteComp;
let GlossaryDetail: RouteComp;
let ReferenceIndex: RouteComp;
let ReferenceModule: RouteComp;
let ReferenceDetail: RouteComp;

if (import.meta.env.SSR) {
  Gallery = (await import("./pages/Gallery")).default;
  GalleryDetail = (await import("./pages/GalleryDetail")).default;
  Blog = (await import("./pages/Blog")).default;
  BlogPost = (await import("./pages/BlogPost")).default;
  Contact = (await import("./pages/Contact")).default;
  ContentPage = (await import("./pages/ContentPage")).default;
  FaqIndex = (await import("./pages/FaqIndex")).default;
  FaqTopic = (await import("./pages/FaqTopic")).default;
  FaqDetail = (await import("./pages/FaqDetail")).default;
  LlmInfo = (await import("./pages/LlmInfo")).default;
  Resources = (await import("./pages/Resources")).default;
  GlossaryIndex = (await import("./pages/GlossaryIndex")).default;
  GlossaryDetail = (await import("./pages/GlossaryDetail")).default;
  ReferenceIndex = (await import("./pages/ReferenceIndex")).default;
  ReferenceModule = (await import("./pages/ReferenceModule")).default;
  ReferenceDetail = (await import("./pages/ReferenceDetail")).default;
} else {
  Gallery = React.lazy(() => import("./pages/Gallery"));
  GalleryDetail = React.lazy(() => import("./pages/GalleryDetail"));
  Blog = React.lazy(() => import("./pages/Blog"));
  BlogPost = React.lazy(() => import("./pages/BlogPost"));
  Contact = React.lazy(() => import("./pages/Contact"));
  ContentPage = React.lazy(() => import("./pages/ContentPage"));
  FaqIndex = React.lazy(() => import("./pages/FaqIndex"));
  FaqTopic = React.lazy(() => import("./pages/FaqTopic"));
  FaqDetail = React.lazy(() => import("./pages/FaqDetail"));
  LlmInfo = React.lazy(() => import("./pages/LlmInfo"));
  Resources = React.lazy(() => import("./pages/Resources"));
  GlossaryIndex = React.lazy(() => import("./pages/GlossaryIndex"));
  GlossaryDetail = React.lazy(() => import("./pages/GlossaryDetail"));
  ReferenceIndex = React.lazy(() => import("./pages/ReferenceIndex"));
  ReferenceModule = React.lazy(() => import("./pages/ReferenceModule"));
  ReferenceDetail = React.lazy(() => import("./pages/ReferenceDetail"));
}

export {
  Gallery,
  GalleryDetail,
  Blog,
  BlogPost,
  Contact,
  ContentPage,
  FaqIndex,
  FaqTopic,
  FaqDetail,
  LlmInfo,
  Resources,
  GlossaryIndex,
  GlossaryDetail,
  ReferenceIndex,
  ReferenceModule,
  ReferenceDetail,
};
