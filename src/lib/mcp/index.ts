import { auth, defineMcp } from "@lovable.dev/mcp-js";
import searchProjects from "./tools/search-projects";
import getProject from "./tools/get-project";

// Build the OAuth issuer from the project ref (Vite inlines this at build
// time so this stays import-safe). Never derive it from SUPABASE_URL because
// on Lovable Cloud that value points at the .lovable.cloud proxy, and mcp-js
// rejects any token whose configured issuer doesn't match the discovery
// document's `issuer` field (RFC 8414 §3.3).
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "naani-projects-mcp",
  title: "Naani Projects MCP",
  version: "0.1.0",
  instructions:
    "Tools for browsing published real estate projects on Naani (Hyderabad). Use `search_projects` to find matching projects by name, builder, location, BHK, or property type, then `get_project_details` with a slug to fetch the full record (amenities, FAQs, pricing, gallery, canonical URL).",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [searchProjects, getProject],
});
