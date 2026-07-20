import type { Metadata } from "next";
import NotFound from "@/views/not-found";

// The old page rendered <Seo title="Page Not Found" noindex />; the title flows
// through the root layout's "%s - Jematell Homes" template, same as before.
// No robots field here: Next always injects its own noindex meta for the
// not-found boundary, and an explicit one would emit a duplicate robots tag.
export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFoundPage() {
  return <NotFound />;
}
