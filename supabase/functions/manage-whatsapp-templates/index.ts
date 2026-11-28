// ==============================================================================
// Supabase Edge Function: manage-whatsapp-templates
// Target Project: lpbdwmpglwdedqdiovqu (Dedicated CRM Backend)
// WABA ID: 1017083661443186
// Meta Graph API: v21.0
//
// Key Capabilities:
// 1. Strict Environment Guard: Protected against unauthorized project execution.
// 2. Staff Role Verification: Requires Bearer JWT with admin or moderator role.
// 3. Meta API Submission: Submits validated message templates to Meta WhatsApp Business API.
// 4. Template Synchronization: Pulls approved, rejected, paused, and pending statuses from Meta.
// 5. Fail-Safe Error Handling: Captures Meta OAuthExceptions and rejection reasons.
// ==============================================================================

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.48.0";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const WHATSAPP_ACCESS_TOKEN = Deno.env.get("WHATSAPP_ACCESS_TOKEN");
const WHATSAPP_BUSINESS_ACCOUNT_ID = Deno.env.get("WHATSAPP_BUSINESS_ACCOUNT_ID") || "1017083661443186";
const GRAPH_API_VERSION = "v21.0";

// Project Reference Guard
const ALLOWED_PROJECT_REFS = ["lpbdwmpglwdedqdiovqu", "bhwoenqfxbgkbrsmahjt"];
const FORBIDDEN_PROJECT_REFS = ["hadxpgwzmvxqslcyykyw"];

function validateEnvironment(url: string | undefined): { valid: boolean; projectRef: string; isProduction: boolean } {
  if (!url) throw new Error("CRITICAL CONFIGURATION ERROR: Missing SUPABASE_URL.");
  for (const forbidden of FORBIDDEN_PROJECT_REFS) {
    if (url.includes(forbidden)) {
      throw new Error(`CRITICAL SAFETY VIOLATION: Execution forbidden against public website project (${forbidden}).`);
    }
  }
  const matched = ALLOWED_PROJECT_REFS.find((ref) => url.includes(ref));
  if (!matched) {
    throw new Error(`CRITICAL SAFETY VIOLATION: Execution forbidden against unrecognized project (${url}).`);
  }
  return { valid: true, projectRef: matched, isProduction: matched === "lpbdwmpglwdedqdiovqu" };
}

const envCheck = validateEnvironment(SUPABASE_URL);

const supabaseAdmin = createClient(SUPABASE_URL || "", SUPABASE_SERVICE_ROLE_KEY || "", {
  auth: { persistSession: false, autoRefreshToken: false },
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

export interface MetaTemplateComponent {
  type: "HEADER" | "BODY" | "FOOTER" | "BUTTONS";
  format?: "TEXT" | "IMAGE" | "VIDEO" | "DOCUMENT";
  text?: string;
  example?: {
    header_text?: string[];
    header_handle?: string[];
    body_text?: string[][];
  };
  buttons?: Array<{
    type: "QUICK_REPLY" | "PHONE_NUMBER" | "URL";
    text: string;
    phone_number?: string;
    url?: string;
    example?: string[];
  }>;
}

export interface MetaTemplateSubmissionPayload {
  name: string;
  category: "MARKETING" | "UTILITY" | "AUTHENTICATION";
  language: string;
  components: MetaTemplateComponent[];
}

/**
 * Validates template components before submission to Meta Graph API.
 */
export function validateTemplateForMeta(payload: MetaTemplateSubmissionPayload): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Name check: lowercase, numbers, underscores only
  if (!payload.name || !/^[a-z0-9_]{1,512}$/.test(payload.name)) {
    errors.push("Template name must be 1-512 characters, lowercase alphanumeric and underscores only.");
  }

  // Category check
  if (!["MARKETING", "UTILITY", "AUTHENTICATION"].includes(payload.category)) {
    errors.push("Category must be MARKETING, UTILITY, or AUTHENTICATION.");
  }

  // Language check
  if (!payload.language || payload.language.trim().length === 0) {
    errors.push("Language code is required (e.g. 'en', 'en_US', 'te').");
  }

  // Body component check
  const bodyComponent = payload.components.find((c) => c.type === "BODY");
  if (!bodyComponent || !bodyComponent.text || bodyComponent.text.trim().length === 0) {
    errors.push("A message BODY component is required.");
  } else {
    if (bodyComponent.text.length > 1024) {
      errors.push(`Body text exceeds maximum allowed length of 1024 characters (current: ${bodyComponent.text.length}).`);
    }

    // Extract variables like {{1}}, {{2}}
    const varMatches = [...bodyComponent.text.matchAll(/\{\{(\d+)\}\}/g)];
    const varIndices = varMatches.map((m) => parseInt(m[1], 10));

    if (varIndices.length > 0) {
      // Must be sequential starting from 1
      for (let i = 1; i <= varIndices.length; i++) {
        if (!varIndices.includes(i)) {
          errors.push(`Variables must be sequential starting at {{1}}. Missing {{${i}}}.`);
          break;
        }
      }

      // Examples check
      const examples = bodyComponent.example?.body_text?.[0] || [];
      if (examples.length < varIndices.length) {
        errors.push(`Body requires sample values for all ${varIndices.length} variables. Provided: ${examples.length}.`);
      }
    }
  }

  // Header check
  const headerComponent = payload.components.find((c) => c.type === "HEADER");
  if (headerComponent) {
    if (headerComponent.format === "TEXT") {
      if (headerComponent.text && headerComponent.text.length > 60) {
        errors.push("Header text exceeds maximum 60 characters.");
      }
    } else if (headerComponent.format === "IMAGE") {
      const handles = headerComponent.example?.header_handle;
      if (!handles || !Array.isArray(handles) || handles.length === 0 || !handles[0] || !handles[0].trim()) {
        errors.push("IMAGE header requires a valid Meta upload handle (example.header_handle).");
      }
      if ((headerComponent.example as any)?.header_text) {
        errors.push("IMAGE header must not contain header_text; use header_handle.");
      }
    }
  }

  // Footer check
  const footerComponent = payload.components.find((c) => c.type === "FOOTER");
  if (footerComponent && footerComponent.text && footerComponent.text.length > 60) {
    errors.push("Footer text exceeds maximum 60 characters.");
  }

  // Buttons check
  const buttonsComponent = payload.components.find((c) => c.type === "BUTTONS");
  if (buttonsComponent && buttonsComponent.buttons) {
    if (buttonsComponent.buttons.length > 10) {
      errors.push("Maximum 10 buttons are permitted.");
    }
    const quickReplies = buttonsComponent.buttons.filter((b) => b.type === "QUICK_REPLY");
    const urlButtons = buttonsComponent.buttons.filter((b) => b.type === "URL");
    const phoneButtons = buttonsComponent.buttons.filter((b) => b.type === "PHONE_NUMBER");

    if (urlButtons.length > 2) errors.push("Maximum 2 URL buttons permitted.");
    if (phoneButtons.length > 1) errors.push("Maximum 1 Phone Number button permitted.");

    for (const btn of buttonsComponent.buttons) {
      if (btn.text.length > 25) {
        errors.push(`Button text "${btn.text}" exceeds 25 characters.`);
      }
      if (btn.type === "URL" && !btn.url) {
        errors.push(`URL button "${btn.text}" is missing destination URL.`);
      }
      if (btn.type === "PHONE_NUMBER" && !btn.phone_number) {
        errors.push(`Phone button "${btn.text}" is missing phone number.`);
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Inspects binary bytes to validate image format (JPEG or PNG) via magic numbers.
 */
export function detectAndValidateMimeType(bytes: Uint8Array): { valid: boolean; detectedMime?: string; error?: string } {
  if (!bytes || bytes.length < 4) {
    return { valid: false, error: "File buffer is empty or too small." };
  }
  // JPEG: 0xFF 0xD8 0xFF
  if (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) {
    return { valid: true, detectedMime: "image/jpeg" };
  }
  // PNG: 0x89 0x50 0x4E 0x47 0x0D 0x0A 0x1A 0x0A
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47 &&
    bytes[4] === 0x0D && bytes[5] === 0x0A && bytes[6] === 0x1A && bytes[7] === 0x0A
  ) {
    return { valid: true, detectedMime: "image/png" };
  }
  return {
    valid: false,
    error: "Unsupported file content. Meta requires a valid JPG/JPEG or PNG image for template headers.",
  };
}

/**
 * Formats Meta Graph API error objects into a detailed, user-readable string.
 * Never exposes access tokens or sensitive request headers.
 */
export function formatMetaError(metaErr: any): string {
  if (!metaErr) return "Unknown Meta API error";
  const parts: string[] = [];
  if (metaErr.error_user_title) parts.push(metaErr.error_user_title);
  if (metaErr.message) parts.push(metaErr.message);
  if (metaErr.error_user_msg) parts.push(`(${metaErr.error_user_msg})`);
  if (metaErr.error_data?.details) parts.push(`Details: ${metaErr.error_data.details}`);
  if (metaErr.code) {
    parts.push(`[Meta Code: ${metaErr.code}${metaErr.error_subcode ? `, Subcode: ${metaErr.error_subcode}` : ""}]`);
  }
  return parts.length > 0 ? parts.join(" - ") : "Meta API returned an unformatted error";
}

/**
 * Resolves Meta App ID from environment or dynamic /app query.
 */
export async function getMetaAppId(): Promise<{ appId?: string; error?: string }> {
  const envAppId = Deno.env.get("META_APP_ID") || Deno.env.get("WHATSAPP_APP_ID");
  if (envAppId && envAppId.trim()) {
    return { appId: envAppId.trim() };
  }
  if (!WHATSAPP_ACCESS_TOKEN) {
    return { error: "WHATSAPP_ACCESS_TOKEN is not configured." };
  }
  try {
    const appRes = await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/app`, {
      headers: { Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}` },
    });
    const appData = await appRes.json();
    if (appRes.ok && appData.id) {
      return { appId: appData.id };
    }
    const errMsg = appData.error ? formatMetaError(appData.error) : "Could not resolve App ID from Meta Graph API.";
    return {
      error: `Missing Meta configuration: Meta App ID is not configured and could not be resolved automatically from Meta (${errMsg}). Please configure META_APP_ID in Supabase Edge Function secrets.`,
    };
  } catch (err: any) {
    return {
      error: `Failed to query Meta for App ID: ${err.message}. Please configure META_APP_ID in Supabase Edge Function secrets.`,
    };
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // GET Health Check
  if (req.method === "GET") {
    return new Response(
      JSON.stringify({
        status: "ok",
        function: "manage-whatsapp-templates",
        environment: envCheck.isProduction ? "production" : "staging",
        projectRef: envCheck.projectRef,
        wabaId: WHATSAPP_BUSINESS_ACCOUNT_ID,
        graphApiVersion: GRAPH_API_VERSION,
        metaCredentialsConfigured: !!WHATSAPP_ACCESS_TOKEN,
        timestamp: new Date().toISOString(),
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    // Authentication Check
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized: Missing Bearer token" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const token = authHeader.replace("Bearer ", "").trim();
    let callerUserId: string | null = null;
    let isServiceRole = false;

    if (token === SUPABASE_SERVICE_ROLE_KEY) {
      isServiceRole = true;
    } else {
      const { data: { user }, error: authErr } = await supabaseAdmin.auth.getUser(token);
      if (authErr || !user) {
        return new Response(JSON.stringify({ error: "Unauthorized: Invalid or expired token" }), {
          status: 401,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      callerUserId = user.id;

      // Check user_roles for admin or moderator
      const { data: roleRow, error: roleErr } = await supabaseAdmin
        .from("user_roles")
        .select("role")
        .eq("user_id", callerUserId)
        .maybeSingle();

      if (roleErr || !roleRow || !["admin", "moderator"].includes(roleRow.role)) {
        return new Response(
          JSON.stringify({ error: "Forbidden: Staff role (admin or moderator) required" }),
          { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
    }

    // Parse Request: supports multipart/form-data for uploads and application/json
    const contentType = req.headers.get("content-type") || "";
    let action = "list_templates";
    let body: any = {};
    let uploadedFile: { name: string; type: string; size: number; bytes: Uint8Array } | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      action = (formData.get("action") as string) || "upload_media";
      const file = formData.get("file") as File | null;
      if (file) {
        const arrayBuffer = await file.arrayBuffer();
        uploadedFile = {
          name: file.name,
          type: file.type || "image/jpeg",
          size: file.size,
          bytes: new Uint8Array(arrayBuffer),
        };
      }
    } else {
      body = await req.json().catch(() => ({}));
      action = body.action || "list_templates";
      if (action === "upload_media" && body.file_data) {
        const binaryStr = atob(body.file_data);
        const bytes = new Uint8Array(binaryStr.length);
        for (let i = 0; i < binaryStr.length; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }
        uploadedFile = {
          name: body.file_name || "sample_header.jpg",
          type: body.file_type || "image/jpeg",
          size: bytes.length,
          bytes,
        };
      }
    }

    // --------------------------------------------------------------------------
    // ACTION: Upload Media to Meta Resumable Upload API (Header Samples)
    // --------------------------------------------------------------------------
    if (action === "upload_media") {
      if (!uploadedFile || uploadedFile.bytes.length === 0) {
        return new Response(
          JSON.stringify({ success: false, error: "No file provided for upload." }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      // 1. File size limit: 5MB for IMAGE
      const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
      if (uploadedFile.size > MAX_IMAGE_SIZE) {
        return new Response(
          JSON.stringify({
            success: false,
            error: `File size exceeds the 5MB limit supported by Meta for template images (provided: ${(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB).`,
          }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      // 2. MIME type & magic bytes validation
      const validation = detectAndValidateMimeType(uploadedFile.bytes);
      if (!validation.valid) {
        return new Response(
          JSON.stringify({ success: false, error: validation.error }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      const verifiedMime = validation.detectedMime || uploadedFile.type;

      // 3. Check WhatsApp Access Token
      if (!WHATSAPP_ACCESS_TOKEN) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Server configuration error: WHATSAPP_ACCESS_TOKEN is not configured.",
          }),
          { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      // 4. Resolve Meta App ID
      const appResult = await getMetaAppId();
      if (!appResult.appId) {
        return new Response(
          JSON.stringify({
            success: false,
            error: appResult.error || "Missing Meta configuration: Meta App ID could not be determined.",
            missingConfig: "META_APP_ID",
          }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      const metaAppId = appResult.appId;

      // 5. Step 1: Create Resumable Upload Session
      const sessionUrl = `https://graph.facebook.com/${GRAPH_API_VERSION}/${metaAppId}/uploads?file_length=${uploadedFile.size}&file_type=${encodeURIComponent(verifiedMime)}&file_name=${encodeURIComponent(uploadedFile.name)}`;
      const sessionRes = await fetch(sessionUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const sessionData = await sessionRes.json();
      if (!sessionRes.ok || sessionData.error || !sessionData.id) {
        console.error("[manage-whatsapp-templates] Meta Upload Session Error:", sessionData.error);
        return new Response(
          JSON.stringify({
            success: false,
            error: formatMetaError(sessionData.error) || "Meta rejected upload session creation.",
            metaError: sessionData.error,
          }),
          { status: sessionRes.status || 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      const uploadSessionId = sessionData.id;

      // 6. Step 2: Upload Binary Data to the Session
      const binaryUploadUrl = `https://graph.facebook.com/${GRAPH_API_VERSION}/${uploadSessionId}`;
      const binaryRes = await fetch(binaryUploadUrl, {
        method: "POST",
        headers: {
          Authorization: `OAuth ${WHATSAPP_ACCESS_TOKEN}`,
          file_offset: "0",
          "Content-Type": "application/octet-stream",
        },
        body: uploadedFile.bytes,
      });
      const binaryData = await binaryRes.json();
      if (!binaryRes.ok || binaryData.error || !binaryData.h) {
        console.error("[manage-whatsapp-templates] Meta Binary Upload Error:", binaryData.error);
        return new Response(
          JSON.stringify({
            success: false,
            error: formatMetaError(binaryData.error) || "Meta rejected binary image upload.",
            metaError: binaryData.error,
          }),
          { status: binaryRes.status || 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      const headerHandle = binaryData.h;

      return new Response(
        JSON.stringify({
          success: true,
          handle: headerHandle,
          fileName: uploadedFile.name,
          fileSize: uploadedFile.size,
          fileType: verifiedMime,
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // --------------------------------------------------------------------------
    // ACTION 1: Submit Template Directly to Meta Graph API v21.0
    // --------------------------------------------------------------------------
    if (action === "submit_to_meta") {
      const templatePayload: MetaTemplateSubmissionPayload = body.template;
      if (!templatePayload) {
        return new Response(JSON.stringify({ error: "Missing template payload in request" }), {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      // Pre-submission validation
      const validation = validateTemplateForMeta(templatePayload);
      if (!validation.valid) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Template validation failed",
            validationErrors: validation.errors,
          }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      // Check Meta access token
      if (!WHATSAPP_ACCESS_TOKEN) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Server configuration error: WHATSAPP_ACCESS_TOKEN is not set.",
          }),
          { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      // Call Meta WhatsApp Business Management API
      const metaUrl = `https://graph.facebook.com/${GRAPH_API_VERSION}/${WHATSAPP_BUSINESS_ACCOUNT_ID}/message_templates`;
      const metaRes = await fetch(metaUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(templatePayload),
      });

      const metaData = await metaRes.json();

      if (!metaRes.ok || metaData.error) {
        console.error("[manage-whatsapp-templates] Meta API Error:", metaData.error);
        const detailedMessage = formatMetaError(metaData.error);
        return new Response(
          JSON.stringify({
            success: false,
            error: detailedMessage || "Meta API rejected template creation",
            metaError: {
              message: metaData.error?.message,
              code: metaData.error?.code,
              error_subcode: metaData.error?.error_subcode,
              error_user_title: metaData.error?.error_user_title,
              error_user_msg: metaData.error?.error_user_msg,
              details: metaData.error?.error_data?.details,
              fbtrace_id: metaData.error?.fbtrace_id,
            },
          }),
          { status: metaRes.status || 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      // Success from Meta
      const metaTemplateId = metaData.id;
      const metaStatus = metaData.status || "PENDING";
      const metaCategory = metaData.category || templatePayload.category;

      // Extract variables from body
      const bodyComp = templatePayload.components.find((c) => c.type === "BODY");
      const varMatches = [...(bodyComp?.text || "").matchAll(/\{\{(\d+)\}\}/g)];
      const variablePlaceholders = varMatches.map((m) => `{{${m[1]}}}`);

      // Upsert into crm_whatsapp_templates
      const headerComp = templatePayload.components.find((c) => c.type === "HEADER");
      const headerType = headerComp ? (headerComp.format || "TEXT") : "NONE";

      const { data: savedRecord, error: dbErr } = await supabaseAdmin
        .from("crm_whatsapp_templates")
        .upsert(
          {
            meta_template_id: metaTemplateId,
            template_name: templatePayload.name,
            language: templatePayload.language,
            category: metaCategory,
            status: metaStatus,
            header_type: headerType,
            components: templatePayload.components,
            variable_placeholders: variablePlaceholders,
            description: body.description || null,
            raw_meta_response: metaData,
            last_synced_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          { onConflict: "template_name,language" }
        )
        .select()
        .single();

      return new Response(
        JSON.stringify({
          success: true,
          metaTemplateId,
          status: metaStatus,
          category: metaCategory,
          template: savedRecord || templatePayload,
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // --------------------------------------------------------------------------
    // ACTION 2: Synchronize All Templates from Meta Graph API
    // --------------------------------------------------------------------------
    if (action === "sync_with_meta") {
      if (!WHATSAPP_ACCESS_TOKEN) {
        return new Response(
          JSON.stringify({ error: "Missing WHATSAPP_ACCESS_TOKEN configuration." }),
          { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      const syncUrl = `https://graph.facebook.com/${GRAPH_API_VERSION}/${WHATSAPP_BUSINESS_ACCOUNT_ID}/message_templates?fields=name,status,category,language,components,quality_score,rejected_reason,id&limit=100`;
      const metaRes = await fetch(syncUrl, {
        headers: { Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}` },
      });

      const metaData = await metaRes.json();
      if (!metaRes.ok || metaData.error) {
        return new Response(
          JSON.stringify({ error: metaData.error?.message || "Failed to fetch templates from Meta", metaError: metaData.error }),
          { status: metaRes.status || 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      const rawTemplates = metaData.data || [];
      const synced = [];

      for (const tmpl of rawTemplates) {
        const headerComp = tmpl.components?.find((c: any) => c.type === "HEADER");
        const headerType = headerComp ? (headerComp.format || "TEXT") : "NONE";
        const bodyComp = tmpl.components?.find((c: any) => c.type === "BODY");
        const varMatches = [...(bodyComp?.text || "").matchAll(/\{\{(\d+)\}\}/g)];
        const variablePlaceholders = varMatches.map((m) => `{{${m[1]}}}`);

        const { data: upserted } = await supabaseAdmin
          .from("crm_whatsapp_templates")
          .upsert(
            {
              meta_template_id: tmpl.id,
              template_name: tmpl.name,
              language: tmpl.language,
              category: tmpl.category,
              status: tmpl.status,
              header_type: headerType,
              components: tmpl.components || [],
              variable_placeholders: variablePlaceholders,
              rejection_reason: tmpl.rejected_reason || null,
              quality_score: tmpl.quality_score?.score || "UNKNOWN",
              raw_meta_response: tmpl,
              last_synced_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            { onConflict: "template_name,language" }
          )
          .select()
          .maybeSingle();

        synced.push(upserted || tmpl);
      }

      return new Response(
        JSON.stringify({ success: true, count: synced.length, templates: synced }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // --------------------------------------------------------------------------
    // ACTION 3: List / Retrieve Cached Templates
    // --------------------------------------------------------------------------
    if (action === "list_templates") {
      let query = supabaseAdmin.from("crm_whatsapp_templates").select("*");
      if (body.status && body.status !== "ALL") {
        query = query.eq("status", body.status);
      }
      if (body.category && body.category !== "ALL") {
        query = query.eq("category", body.category);
      }
      query = query.order("updated_at", { ascending: false });

      const { data, error } = await query;
      if (error) throw error;

      return new Response(
        JSON.stringify({ success: true, count: data?.length || 0, templates: data || [] }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(JSON.stringify({ error: `Unrecognized action: ${action}` }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err: any) {
    console.error("[manage-whatsapp-templates] Internal Exception:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
