"use client";
import { usePathname } from "next/navigation";
import { getRouteBg } from "./lib/routeBackgroundMap";

/**
 * Paints the per-route background color into the `--route-bg` CSS variable so
 * the page never flashes white during a client-side navigation. Mounted once,
 * high in the tree (Providers).
 */
export default function RouteBackground() {
  const pathname = usePathname();
  const color = getRouteBg(pathname);
  return (
    <style
      data-route-background=""
      dangerouslySetInnerHTML={{ __html: `:root{--route-bg:${color};}` }}
    />
  );
}
