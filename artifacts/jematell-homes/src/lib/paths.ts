/**
 * paths.ts — asset-path helpers shared by server and client components.
 * The site always deploys at the domain root, so BASE is a constant "/"
 * (the old Vite build read import.meta.env.BASE_URL; Next has no base-path
 * indirection here and the audit gates pin BASE_PATH=/ anyway).
 */
export const BASE = "/";

/** Public-image URL for a filename in public/images. */
export const img = (name: string) => `/images/${name}`;
