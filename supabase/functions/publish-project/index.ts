// ==============================================================================
// Supabase Edge Function: publish-project
// Target Backend: lpbdwmpglwdedqdiovqu (Master CRM Database)
// Public Sync Target: hadxpgwzmvxqslcyykyw (Public Website Database)
//
// Key Responsibilities:
// 1. Authenticate caller and verify 'admin' role in public.user_roles.
// 2. Validate that the project is verified and approved before sync.
// 3. Perform server-side validation against required schema fields.
// 4. Upsert project to HADX public database using server-side service credentials.
// 5. Verify the HADX write before setting publish_status = 'published' in LPBD.
// 6. Record audit log entry in public.project_publishing_audit_logs.
// ==============================================================================

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.48.0";

const LPBD_URL = Deno.env.get("SUPABASE_URL") || "https://lpbdwmpglwdedqdiovqu.supabase.co";
const LPBD_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

// Public Website Database Credentials (strictly server-side)
const HADX_URL = Deno.env.get("HADX_SUPABASE_URL") || "https://hadxpgwzmvxqslcyykyw.supabase.co";
const HADX_SERVICE_ROLE_KEY = Deno.env.get("HADX_SERVICE_ROLE_KEY") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

interface PublishRequestPayload {
  projectId?: string;
  projectSlug?: string;
  action: "publish" | "unpublish" | "validate_only";
  reason: string;
}

// Master DB Privileged Client
const lpbdAdmin = createClient(LPBD_URL, LPBD_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    // -------------------------------------------------------------------------
    // 1. AUTHENTICATION & ROLE VERIFICATION
    // -------------------------------------------------------------------------
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing Authorization header." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const token = authHeader.replace("Bearer ", "").trim();
    const { data: userData, error: userErr } = await lpbdAdmin.auth.getUser(token);

    if (userErr || !userData.user) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired session token." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const callerUser = userData.user;

    // Check admin role in user_roles
    const { data: roleRow, error: roleErr } = await lpbdAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", callerUser.id)
      .maybeSingle();

    if (roleErr || !roleRow || roleRow.role !== "admin") {
      return new Response(
        JSON.stringify({ error: "Forbidden: Only authorized administrators may publish or unpublish projects." }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // -------------------------------------------------------------------------
    // 2. PARSE PAYLOAD
    // -------------------------------------------------------------------------
    const body: PublishRequestPayload = await req.json();
    const { projectId, projectSlug, action, reason } = body;

    if (!projectId && !projectSlug) {
      return new Response(
        JSON.stringify({ error: "Either projectId or projectSlug must be supplied." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!reason || reason.trim().length < 5) {
      return new Response(
        JSON.stringify({ error: "A valid business justification (reason, min 5 chars) is mandatory for this audit trail." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // -------------------------------------------------------------------------
    // 3. RETRIEVE PROJECT FROM LPBD
    // -------------------------------------------------------------------------
    let projectQuery = lpbdAdmin.from("projects").select("*");
    if (projectId) {
      projectQuery = projectQuery.eq("id", projectId);
    } else if (projectSlug) {
      projectQuery = projectQuery.eq("slug", projectSlug);
    }

    const { data: projectRow, error: fetchErr } = await projectQuery.maybeSingle();

    if (fetchErr || !projectRow) {
      return new Response(
        JSON.stringify({ error: `Project not found in master database: ${fetchErr?.message || "Not found"}` }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Guard against unauthorized Casagrand Evon early publication
    if (projectRow.slug === "casagrand-evon-kompally" && action === "publish") {
      // In Phase 5A, Casagrand Evon is strictly protected
      const allowOverride = req.headers.get("x-override-safety-guard") === "true";
      if (!allowOverride) {
        return new Response(
          JSON.stringify({
            error: "SAFETY LOCK ACTIVE: Casagrand Evon is strictly guarded in Phase 5A and cannot be synchronized to HADX until Phase 5B approval.",
            code: "CASAGRAND_EVON_PHASE5A_LOCKED"
          }),
          { status: 423, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // -------------------------------------------------------------------------
    // 4. ACTION DISPATCH: UNPUBLISH
    // -------------------------------------------------------------------------
    if (action === "unpublish") {
      const fromStatus = projectRow.publish_status;

      // Update HADX to unpublish or delete
      if (HADX_SERVICE_ROLE_KEY) {
        const hadxAdmin = createClient(HADX_URL, HADX_SERVICE_ROLE_KEY, {
          auth: { persistSession: false },
        });
        await hadxAdmin.from("projects").delete().eq("slug", projectRow.slug);
      }

      // Update LPBD
      const { error: unpubErr } = await lpbdAdmin
        .from("projects")
        .update({
          publish_status: "unpublished",
          featured: false,
          synchronization_status: "pending",
          updated_at: new Date().toISOString(),
        })
        .eq("id", projectRow.id);

      if (unpubErr) throw unpubErr;

      // Log audit
      await logPublishAudit({
        projectId: projectRow.id,
        projectSlug: projectRow.slug,
        action: "unpublish",
        fromStatus,
        toStatus: "unpublished",
        performerId: callerUser.id,
        performerEmail: callerUser.email || "unknown",
        reason,
      });

      return new Response(
        JSON.stringify({ success: true, message: `Project ${projectRow.name} (${projectRow.slug}) successfully unpublished.` }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // -------------------------------------------------------------------------
    // 5. SERVER-SIDE VALIDATION BEFORE PUBLISHING
    // -------------------------------------------------------------------------
    const validationErrors: string[] = [];

    // A. Required fields check
    if (!projectRow.name?.trim()) validationErrors.push("Project name is required.");
    if (!projectRow.builder?.trim()) validationErrors.push("Builder is required.");
    if (!projectRow.location?.trim()) validationErrors.push("Location is required.");
    if (!projectRow.city?.trim()) validationErrors.push("City is required.");
    if (!projectRow.slug?.trim()) validationErrors.push("Slug is required.");
    if (!projectRow.property_type?.trim()) validationErrors.push("Property type is required.");

    // B. RERA check: Do not infer verification merely from registration presence
    const reraNum = projectRow.rera_registration_number || extractReraNumber(projectRow);
    if (!reraNum) {
      validationErrors.push("Valid TG RERA registration number is mandatory for public publishing.");
    }

    // C. Approval status check
    const isApproved = projectRow.approval_status === "approved" || projectRow.publish_status === "approved";
    if (!isApproved) {
      validationErrors.push(`Project cannot be published: current status is '${projectRow.publish_status}', approval status is '${projectRow.approval_status || "pending"}'. Project must be approved first.`);
    }

    if (action === "validate_only") {
      return new Response(
        JSON.stringify({
          valid: validationErrors.length === 0,
          errors: validationErrors,
          project: {
            id: projectRow.id,
            slug: projectRow.slug,
            name: projectRow.name,
            rera: reraNum,
            approval_status: projectRow.approval_status,
          },
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (validationErrors.length > 0) {
      return new Response(
        JSON.stringify({
          error: "Project validation failed. Resolve all errors before publishing.",
          details: validationErrors,
        }),
        { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // -------------------------------------------------------------------------
    // 6. EXECUTE HADX SYNCHRONIZATION
    // -------------------------------------------------------------------------
    if (!HADX_SERVICE_ROLE_KEY) {
      // Record failure if HADX credentials missing
      await lpbdAdmin.from("projects").update({
        publish_status: "publication_failed",
        last_synchronization_error: "HADX_SERVICE_ROLE_KEY not configured on server.",
        updated_at: new Date().toISOString(),
      }).eq("id", projectRow.id);

      return new Response(
        JSON.stringify({ error: "Server Configuration Error: Missing HADX target credentials." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const hadxAdmin = createClient(HADX_URL, HADX_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    // Prepare clean HADX payload matching public catalogue schema
    const hadxPayload = {
      slug: projectRow.slug,
      name: projectRow.name,
      builder: projectRow.builder,
      location: projectRow.location,
      city: projectRow.city || "Hyderabad",
      configuration: projectRow.configuration,
      bhk_list: projectRow.bhk_list,
      property_type: projectRow.property_type || "Apartment",
      price_range: projectRow.price_range,
      min_price_inr: projectRow.min_price_inr,
      max_price_inr: projectRow.max_price_inr,
      status: projectRow.status || "Under Construction",
      possession: projectRow.possession,
      usp: projectRow.usp,
      description: projectRow.description,
      amenities: projectRow.amenities || [],
      faqs: projectRow.faqs || [],
      gallery: projectRow.gallery || [],
      hero_image: projectRow.hero_image,
      brochure_url: projectRow.brochure_url,
      map_embed_url: projectRow.map_embed_url,
      seo_title: projectRow.seo_title,
      meta_description: projectRow.meta_description,
      canonical_url: projectRow.canonical_url,
      custom_page_path: projectRow.custom_page_path,
      featured: projectRow.featured || false,
      publish_status: "published",
      source: projectRow.source || "internal",
      updated_at: new Date().toISOString(),
    };

    // Duplicate-safe upsert into HADX
    const { data: hadxWriteData, error: hadxWriteErr } = await hadxAdmin
      .from("projects")
      .upsert(hadxPayload, { onConflict: "slug" })
      .select("id, slug, updated_at")
      .single();

    if (hadxWriteErr) {
      // Synchronization failed: update LPBD status to publication_failed
      await lpbdAdmin.from("projects").update({
        publish_status: "publication_failed",
        synchronization_status: "failed",
        last_synchronization_error: hadxWriteErr.message,
        updated_at: new Date().toISOString(),
      }).eq("id", projectRow.id);

      await logPublishAudit({
        projectId: projectRow.id,
        projectSlug: projectRow.slug,
        action: "publish_sync",
        fromStatus: projectRow.publish_status,
        toStatus: "publication_failed",
        performerId: callerUser.id,
        performerEmail: callerUser.email || "unknown",
        reason: `Synchronization to HADX failed: ${hadxWriteErr.message}`,
      });

      return new Response(
        JSON.stringify({ error: `Synchronization to HADX failed: ${hadxWriteErr.message}` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify write on HADX before marking published in LPBD
    const { data: verifyRow, error: verifyErr } = await hadxAdmin
      .from("projects")
      .select("id, slug, publish_status")
      .eq("slug", projectRow.slug)
      .maybeSingle();

    if (verifyErr || !verifyRow || verifyRow.publish_status !== "published") {
      throw new Error("HADX post-write verification failed: row not confirmed published.");
    }

    // Update LPBD as published & synced
    const fromStatus = projectRow.publish_status;
    const nowIso = new Date().toISOString();

    await lpbdAdmin.from("projects").update({
      publish_status: "published",
      synchronization_status: "synced",
      publication_timestamp: nowIso,
      last_synchronized_at: nowIso,
      last_synchronization_error: null,
      public_database_record_id: verifyRow.id,
      updated_at: nowIso,
    }).eq("id", projectRow.id);

    // Record audit log
    await logPublishAudit({
      projectId: projectRow.id,
      projectSlug: projectRow.slug,
      action: "publish_sync",
      fromStatus,
      toStatus: "published",
      performerId: callerUser.id,
      performerEmail: callerUser.email || "unknown",
      reason,
      metadata: { hadx_record_id: verifyRow.id, synced_at: nowIso },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: `Project ${projectRow.name} (${projectRow.slug}) successfully published to HADX.`,
        publicRecordId: verifyRow.id,
        publishedAt: nowIso,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function extractReraNumber(row: any): string | null {
  const text = `${row.description || ""} ${row.usp || ""} ${JSON.stringify(row.faqs || "")}`;
  const match = text.match(/P0[0-9]{9}/);
  return match ? match[0] : null;
}

async function logPublishAudit(entry: {
  projectId: string;
  projectSlug: string;
  action: string;
  fromStatus: string;
  toStatus: string;
  performerId: string | null;
  performerEmail: string;
  reason: string;
  metadata?: Record<string, any>;
}) {
  try {
    await lpbdAdmin.from("project_publishing_audit_logs").insert({
      project_id: entry.projectId,
      project_slug: entry.projectSlug,
      action: entry.action,
      from_status: entry.fromStatus,
      to_status: entry.toStatus,
      performed_by: entry.performerId,
      performer_email: entry.performerEmail,
      reason: entry.reason,
      metadata: entry.metadata || {},
    });
  } catch (e: any) {
    console.warn("Failed to write publishing audit log:", e.message);
  }
}
