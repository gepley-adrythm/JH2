import { useLocation } from "react-router-dom";
import { getRouteBg } from "./routeBackground";

/**
 * Paints the per-route background color into the `--route-bg` CSS variable so
 * the page never flashes white during a client-side navigation. Mount once,
 * high in the tree (App.tsx). Adapted from the kit's Next.js version by swapping
 * `usePathname` for React Router's `useLocation`.
 */
export default function RouteBackground() {
  const { pathname } = useLocation();
  const color = getRouteBg(pathname);
  return (
    <style
      data-route-background=""
      dangerouslySetInnerHTML={{ __html: `:root{--route-bg:${color};}` }}
    />
  );
}
