/**
 * Project Publication Gate Controller
 * 
 * Controls public visibility and sitemap/prerender inclusion of upcoming projects
 * pending legal, regulatory (TG RERA), and editorial approval.
 * 
 * When set to `false`:
 * - Public production visitors are redirected to /projects.
 * - Local development access is enabled strictly via import.meta.env.DEV.
 * - All query-parameter bypasses are completely removed.
 * - The URL is excluded from production sitemaps, prerendering, and public footer links.
 * 
 * Set to `true` once official publication approval has been granted.
 */
export const PROJECT_PUBLICATION_GATES = {
  // Brigade Kompally: Approved for publication
  brigadeKompally: true,
};
