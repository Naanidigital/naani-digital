import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Isolated Supabase client exclusively for the Naani Projects CRM (/crm).
 * Connects directly to the new primary production backend: lpbdwmpglwdedqdiovqu.
 *
 * Architecture Safeguards:
 * 1. Uses dedicated environment variables (VITE_CRM_SUPABASE_URL, VITE_CRM_SUPABASE_ANON_KEY).
 * 2. Uses a distinct localStorage key ('naani_crm_auth_session') to prevent session collisions
 *    with public website users.
 * 3. Never touches or replaces the legacy website client (src/integrations/supabase/client.ts).
 * 4. Never exposes the Supabase service-role key.
 */

const CRM_SUPABASE_URL =
  import.meta.env.VITE_CRM_SUPABASE_URL ||
  "https://lpbdwmpglwdedqdiovqu.supabase.co";

const CRM_SUPABASE_ANON_KEY =
  import.meta.env.VITE_CRM_SUPABASE_ANON_KEY || "";

if (!CRM_SUPABASE_ANON_KEY && typeof window !== "undefined") {
  console.warn(
    "[CRM Client] VITE_CRM_SUPABASE_ANON_KEY is not configured. Please supply the anon key in your environment."
  );
}

export const crmSupabase = createClient<Database>(
  CRM_SUPABASE_URL,
  CRM_SUPABASE_ANON_KEY,
  {
    auth: {
      storageKey: "naani_crm_auth_session",
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
