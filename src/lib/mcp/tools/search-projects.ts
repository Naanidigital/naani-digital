import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

declare const process: { env: Record<string, string | undefined> };

function supabaseForUser(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "search_projects",
  title: "Search Naani real estate projects",
  description:
    "Search published real estate projects on Naani by keyword (matches name, builder, location, city, or property type). Returns up to 20 results with slug, name, builder, location, price range, status and configuration.",
  inputSchema: {
    query: z
      .string()
      .describe("Search text — project name, builder, location, BHK or property type. Use empty string to list featured projects."),
    limit: z
      .number()
      .int()
      .describe("Maximum results to return (1-50). Defaults to 20 when unset.")
      .optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ query, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const cap = Math.min(Math.max(limit ?? 20, 1), 50);
    let q = supabase
      .from("projects")
      .select(
        "slug,name,builder,location,city,property_type,configuration,price_range,status,possession,featured"
      )
      .eq("publish_status", "published")
      .order("featured", { ascending: false })
      .order("name", { ascending: true })
      .limit(cap);

    const trimmed = query.trim();
    if (trimmed.length > 0) {
      const like = `%${trimmed.replace(/[%,]/g, " ")}%`;
      q = q.or(
        [
          `name.ilike.${like}`,
          `builder.ilike.${like}`,
          `location.ilike.${like}`,
          `city.ilike.${like}`,
          `property_type.ilike.${like}`,
          `configuration.ilike.${like}`,
        ].join(",")
      );
    }

    const { data, error } = await q;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { results: data ?? [] },
    };
  },
});
