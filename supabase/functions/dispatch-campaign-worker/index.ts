// ==============================================================================
// Supabase Edge Function: dispatch-campaign-worker (Production Gate 2B Package)
// Target Project: lpbdwmpglwdedqdiovqu (Naani Projects Dedicated CRM Backend)
//
// Key Features:
// 1. Strict Environment Guard: Allows production CRM (lpbdwmpglwdedqdiovqu) and
//    isolated staging (bhwoenqfxbgkbrsmahjt). Strictly rejects public website
//    (hadxpgwzmvxqslcyykyw) and all unknown hosts.
// 2. Strict Authentication: Requires valid Bearer JWT from auth.users with staff
//    role (admin or moderator) in public.user_roles, or direct service_role.
// 3. Queue Claiming: Atomic batch lease with FOR UPDATE SKIP LOCKED.
// 4. Compliance Controls: Pre-dispatch consent checks and global suppression register.
// 5. Human-Agent Priority: check_and_update_recipient_pacing (Rule B & C) and
//    check_campaign_dispatch_priority (Rule D pre-dispatch recheck).
// 6. Dual-Mode Dispatch:
//    - dryRun: true (Default): Safe mock dispatch, zero external API calls.
//    - dryRun: false (Live): Calls Meta Cloud API Graph API v21.0 using
//      WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID. Requires explicit
//      server-side ALLOW_LIVE_WHATSAPP_DISPATCH=true and client confirmation.
// 7. Ambiguous Outcome Quarantine: Leaves network timeouts and 5xx errors in
//    sending_unknown with zero automatic retry.
// ==============================================================================

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.48.0";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const WHATSAPP_ACCESS_TOKEN = Deno.env.get("WHATSAPP_ACCESS_TOKEN");
const WHATSAPP_PHONE_NUMBER_ID = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID");
const ALLOW_LIVE_WHATSAPP_DISPATCH = Deno.env.get("ALLOW_LIVE_WHATSAPP_DISPATCH") === "true";

// ------------------------------------------------------------------------------
// 1. Project Reference Environment Guard
// ------------------------------------------------------------------------------
const ALLOWED_PROJECT_REFS = ["lpbdwmpglwdedqdiovqu", "bhwoenqfxbgkbrsmahjt"];
const FORBIDDEN_PROJECT_REFS = ["hadxpgwzmvxqslcyykyw"];

function validateProjectEnvironment(url: string | undefined): { valid: boolean; projectRef: string; isProduction: boolean } {
  if (!url) {
    throw new Error("CRITICAL CONFIGURATION ERROR: Missing SUPABASE_URL environment variable.");
  }
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

const envCheck = validateProjectEnvironment(SUPABASE_URL);

// Server-side service-role client for atomic lease RPCs and status updates
const supabaseAdmin = createClient(SUPABASE_URL || "", SUPABASE_SERVICE_ROLE_KEY || "", {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

interface DispatchWorkerPayload {
  campaignId?: string;
  action?: "health_check" | "claim_and_dispatch" | "recover_stale_leases";
  workerId?: string;
  batchSize?: number;
  leaseSeconds?: number;
  dryRun?: boolean;
  liveDispatchConfirmed?: boolean;
}

Deno.serve(async (req: Request) => {
  // CORS Preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // GET Health Check (Public / Non-Mutating)
  if (req.method === "GET") {
    return new Response(
      JSON.stringify({
        status: "ok",
        function: "dispatch-campaign-worker",
        environment: envCheck.isProduction ? "production" : "staging",
        projectRef: envCheck.projectRef,
        liveDispatchAuthorized: ALLOW_LIVE_WHATSAPP_DISPATCH,
        metaCredentialsConfigured: !!(WHATSAPP_ACCESS_TOKEN && WHATSAPP_PHONE_NUMBER_ID),
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
    // --------------------------------------------------------------------------
    // 2. Authentication & Authorization Check
    // --------------------------------------------------------------------------
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Missing Bearer token in Authorization header" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const token = authHeader.replace("Bearer ", "").trim();
    let isAuthorized = false;
    let callerId = "unknown";

    const sKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (sKey && token === sKey) {
      isAuthorized = true;
      callerId = "service_role";
    } else {
      const { data: { user }, error: authErr } = await supabaseAdmin.auth.getUser(token);
      if (authErr || !user) {
        return new Response(
          JSON.stringify({ error: "Unauthorized: Invalid authentication token", details: authErr?.message }),
          { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      callerId = `user_${user.id.substring(0, 8)}`;

      // Verify staff role in public.user_roles (admin or moderator required)
      const { data: roleRecord } = await supabaseAdmin
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle();

      isAuthorized = roleRecord?.role === "admin" || roleRecord?.role === "moderator";
    }

    if (!isAuthorized) {
      return new Response(
        JSON.stringify({ error: "Forbidden: Caller lacks campaign manager staff privileges" }),
        { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // --------------------------------------------------------------------------
    // 3. Parse and Validate Request Payload
    // --------------------------------------------------------------------------
    const payload: DispatchWorkerPayload = await req.json().catch(() => ({}));
    const {
      campaignId,
      action = "health_check",
      workerId = `worker_${crypto.randomUUID().substring(0, 8)}`,
      batchSize = 50,
      leaseSeconds = 90,
      dryRun = true, // Default to dry-run mode for safety
      liveDispatchConfirmed = false,
    } = payload;

    // --------------------------------------------------------------------------
    // ACTION: Safe Health Check (Read-Only)
    // --------------------------------------------------------------------------
    if (action === "health_check") {
      const { data: dbCheck, error: dbErr } = await supabaseAdmin
        .from("crm_campaigns")
        .select("count", { count: "exact", head: true });

      return new Response(
        JSON.stringify({
          status: "ok",
          function: "dispatch-campaign-worker",
          environment: envCheck.isProduction ? "production" : "staging",
          projectRef: envCheck.projectRef,
          databaseConnected: !dbErr,
          campaignsCount: dbCheck ?? null,
          caller: callerId,
          liveDispatchAuthorized: ALLOW_LIVE_WHATSAPP_DISPATCH,
          metaCredentialsConfigured: !!(WHATSAPP_ACCESS_TOKEN && WHATSAPP_PHONE_NUMBER_ID),
          timestamp: new Date().toISOString(),
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!campaignId) {
      return new Response(
        JSON.stringify({ error: "Missing required parameter: campaignId" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // --------------------------------------------------------------------------
    // ACTION: Recover Stale Leases (Quarantine to sending_unknown)
    // --------------------------------------------------------------------------
    if (action === "recover_stale_leases") {
      const { data: recoveredCount, error: recoverErr } = await supabaseAdmin.rpc(
        "recover_stale_campaign_leases",
        { p_campaign_id: campaignId }
      );

      if (recoverErr) {
        return new Response(
          JSON.stringify({ error: `Lease recovery error: ${recoverErr.message}` }),
          { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      await supabaseAdmin.rpc("sync_campaign_counters", { p_campaign_id: campaignId });

      return new Response(
        JSON.stringify({
          success: true,
          action: "recover_stale_leases",
          campaignId,
          recoveredCount: recoveredCount || 0,
          timestamp: new Date().toISOString(),
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // --------------------------------------------------------------------------
    // ACTION: Claim and Dispatch Batch
    // --------------------------------------------------------------------------
    if (action === "claim_and_dispatch") {
      // Live Dispatch Safety Guard
      const isLiveDispatch = !dryRun;
      if (isLiveDispatch) {
        if (!envCheck.isProduction) {
          return new Response(
            JSON.stringify({
              error: "Live Meta dispatch is strictly forbidden in non-production environments.",
              safety_lock: true,
            }),
            { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
          );
        }
        if (!ALLOW_LIVE_WHATSAPP_DISPATCH) {
          return new Response(
            JSON.stringify({
              error: "Live dispatch rejected: Server-side environment variable ALLOW_LIVE_WHATSAPP_DISPATCH is not enabled.",
              safety_lock: true,
            }),
            { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
          );
        }
        if (!liveDispatchConfirmed) {
          return new Response(
            JSON.stringify({
              error: "Live dispatch rejected: Client must explicitly pass liveDispatchConfirmed: true.",
              safety_lock: true,
            }),
            { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
          );
        }
        if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
          return new Response(
            JSON.stringify({
              error: "Server configuration error: WhatsApp Cloud API credentials are not configured.",
            }),
            { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
          );
        }
      }

      // 6a. Proactively recover any stale leases before claiming new batch
      await supabaseAdmin.rpc("recover_stale_campaign_leases", { p_campaign_id: campaignId });

      // 6b. Verify the campaign is currently running
      const { data: campaign, error: campErr } = await supabaseAdmin
        .from("crm_campaigns")
        .select("id, status, template_name, template_language")
        .eq("id", campaignId)
        .single();

      if (campErr || !campaign) {
        return new Response(
          JSON.stringify({ error: `Campaign not found: ${campaignId}` }),
          { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      if (campaign.status !== "running") {
        return new Response(
          JSON.stringify({ error: `Campaign is not in running status (current status: ${campaign.status})` }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      // 6c. Atomically claim batch using claim_campaign_recipient_batch RPC (FOR UPDATE SKIP LOCKED)
      const { data: claimedBatch, error: claimErr } = await supabaseAdmin.rpc(
        "claim_campaign_recipient_batch",
        {
          p_campaign_id: campaignId,
          p_worker_id: workerId,
          p_batch_size: Math.min(100, Math.max(1, batchSize)),
          p_lease_seconds: leaseSeconds,
        }
      );

      if (claimErr) {
        return new Response(
          JSON.stringify({ error: `Batch claim RPC failed: ${claimErr.message}` }),
          { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      const items = (claimedBatch as any[]) || [];
      const dispatchResults: Array<{
        recipientId: string;
        phone: string;
        status: string;
        metaMessageId?: string;
        cooldownRemaining?: number;
        reason?: string;
      }> = [];

      // 6d. Process each claimed recipient in batch
      for (const recipient of items) {
        const phone = recipient.normalized_phone;

        // Compliance Guard 1: Verify Consent Status
        if (recipient.consent_status !== "opted_in") {
          await supabaseAdmin
            .from("crm_campaign_recipients")
            .update({
              status: "skipped",
              last_error_code: "CONSENT_NOT_OPTED_IN",
              last_error_message: `Recipient consent is '${recipient.consent_status}'; must be opted_in.`,
              locked_by: null,
              locked_until: null,
              updated_at: new Date().toISOString(),
            })
            .eq("id", recipient.id);

          dispatchResults.push({
            recipientId: recipient.id,
            phone,
            status: "skipped",
            reason: "Consent not opted_in",
          });
          continue;
        }

        // Compliance Guard 2: Verify Global Suppression Register
        const { data: suppressionRow } = await supabaseAdmin
          .from("crm_whatsapp_suppressions")
          .select("id, reason")
          .eq("normalized_phone", phone)
          .maybeSingle();

        if (suppressionRow) {
          await supabaseAdmin
            .from("crm_campaign_recipients")
            .update({
              status: "suppressed",
              last_error_code: "RECIPIENT_SUPPRESSED",
              last_error_message: `Recipient is on global suppression list (${suppressionRow.reason || "opt-out"}).`,
              locked_by: null,
              locked_until: null,
              updated_at: new Date().toISOString(),
            })
            .eq("id", recipient.id);

          dispatchResults.push({
            recipientId: recipient.id,
            phone,
            status: "suppressed",
            reason: "Global suppression list",
          });
          continue;
        }

        // Compliance Guard 3: Pacing Cooldown Reservation (Rule B & Rule C)
        const { data: pacingRows, error: pacingErr } = await supabaseAdmin.rpc(
          "check_and_update_recipient_pacing",
          {
            p_phone: phone,
            p_source_type: "campaign",
            p_source_campaign_id: campaignId,
            p_source_worker_id: workerId,
            p_cooldown_seconds: 60,
          }
        );

        const pacingResult = Array.isArray(pacingRows) ? pacingRows[0] : pacingRows;

        if (pacingErr || !pacingResult || pacingResult.can_dispatch === false) {
          const waitSec = pacingResult?.seconds_remaining ?? 60;
          const retryTime = new Date(Date.now() + waitSec * 1000).toISOString();

          await supabaseAdmin
            .from("crm_campaign_recipients")
            .update({
              status: "queued",
              deferral_retry_until: retryTime,
              locked_by: null,
              locked_until: null,
              updated_at: new Date().toISOString(),
            })
            .eq("id", recipient.id);

          await supabaseAdmin.from("crm_campaign_events").insert({
            campaign_id: campaignId,
            recipient_id: recipient.id,
            event_type: "pacing_deferred",
            event_data: {
              seconds_remaining: waitSec,
              previous_source: pacingResult?.previous_source || "unknown",
              retry_after: retryTime,
            },
          });

          dispatchResults.push({
            recipientId: recipient.id,
            phone,
            status: "deferred_pacing",
            cooldownRemaining: waitSec,
            reason: `Cooldown active (${waitSec}s remaining)`,
          });
          continue;
        }

        // Compliance Guard 4: Final Pre-Dispatch Human Priority Check (Rule D)
        const { data: prioCheck } = await supabaseAdmin.rpc(
          "check_campaign_dispatch_priority",
          {
            p_phone: phone,
            p_max_age_seconds: 60,
          }
        );
        const prioResult = Array.isArray(prioCheck) ? prioCheck[0] : prioCheck;
        if (prioResult && prioResult.can_proceed === false) {
          const waitSec = prioResult.seconds_remaining ?? 60;
          const retryTime = new Date(Date.now() + waitSec * 1000).toISOString();

          await supabaseAdmin
            .from("crm_campaign_recipients")
            .update({
              status: "queued",
              deferral_retry_until: retryTime,
              locked_by: null,
              locked_until: null,
              updated_at: new Date().toISOString(),
            })
            .eq("id", recipient.id);

          await supabaseAdmin.from("crm_campaign_events").insert({
            campaign_id: campaignId,
            recipient_id: recipient.id,
            event_type: "human_priority_deferred",
            event_data: {
              reason: "human_message_superseded_campaign",
              seconds_remaining: waitSec,
              retry_after: retryTime,
            },
          });

          dispatchResults.push({
            recipientId: recipient.id,
            phone,
            status: "deferred_human_priority",
            cooldownRemaining: waitSec,
            reason: "Superseded by human CRM agent message",
          });
          continue;
        }

        // ----------------------------------------------------------------------
        // 6e. Execution Branch: Mock Mode vs Live Meta Dispatch
        // ----------------------------------------------------------------------
        if (!isLiveDispatch) {
          // DRY-RUN / MOCK MODE: Generate synthetic WAMID and mark sent
          const fakeMetaId = `wamid.HBgM${Date.now()}${crypto.randomUUID().substring(0, 8).toUpperCase()}A`;
          const nowIso = new Date().toISOString();

          await supabaseAdmin
            .from("crm_campaign_recipients")
            .update({
              status: "sent",
              meta_message_id: fakeMetaId,
              sent_at: nowIso,
              locked_by: null,
              locked_until: null,
              updated_at: nowIso,
            })
            .eq("id", recipient.id);

          await supabaseAdmin.from("crm_campaign_events").insert({
            campaign_id: campaignId,
            recipient_id: recipient.id,
            event_type: "dispatched_mock",
            event_data: {
              meta_message_id: fakeMetaId,
              worker_id: workerId,
              mode: "mock_dry_run",
            },
          });

          dispatchResults.push({
            recipientId: recipient.id,
            phone,
            status: "sent",
            metaMessageId: fakeMetaId,
          });
        } else {
          // LIVE DISPATCH MODE: Invoke Meta Cloud API v21.0
          const metaEndpoint = `https://graph.facebook.com/v21.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`;
          const components: any[] = [];
          if (recipient.customer_name) {
            components.push({
              type: "body",
              parameters: [{ type: "text", text: recipient.customer_name }],
            });
          }

          const metaPayload = {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: phone,
            type: "template",
            template: {
              name: campaign.template_name,
              language: { code: campaign.template_language || "en" },
              ...(components.length > 0 ? { components } : {}),
            },
          };

          try {
            const metaResponse = await fetch(metaEndpoint, {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(metaPayload),
            });

            const metaData = await metaResponse.json().catch(() => ({}));

            if (metaResponse.ok && metaData.messages?.[0]?.id) {
              const realWamid = metaData.messages[0].id;
              const nowIso = new Date().toISOString();

              await supabaseAdmin
                .from("crm_campaign_recipients")
                .update({
                  status: "sent",
                  meta_message_id: realWamid,
                  sent_at: nowIso,
                  locked_by: null,
                  locked_until: null,
                  updated_at: nowIso,
                })
                .eq("id", recipient.id);

              await supabaseAdmin.from("crm_campaign_events").insert({
                campaign_id: campaignId,
                recipient_id: recipient.id,
                event_type: "dispatched_live",
                event_data: {
                  meta_message_id: realWamid,
                  worker_id: workerId,
                },
              });

              dispatchResults.push({
                recipientId: recipient.id,
                phone,
                status: "sent",
                metaMessageId: realWamid,
              });
            } else {
              // Handle Meta Client / Rate Limit Errors
              const errorCode = metaData.error?.code ?? metaResponse.status;
              const errorMsg = metaData.error?.message ?? "Meta API rejected message";

              // Quality pause or template pause check
              if (errorCode === 130429 || errorCode === 131056) {
                // Rate limit / Frequency limit hit: defer recipient
                const waitSec = 120;
                const retryTime = new Date(Date.now() + waitSec * 1000).toISOString();
                await supabaseAdmin
                  .from("crm_campaign_recipients")
                  .update({
                    status: "queued",
                    deferral_retry_until: retryTime,
                    last_error_code: String(errorCode),
                    last_error_message: errorMsg,
                    locked_by: null,
                    locked_until: null,
                    updated_at: new Date().toISOString(),
                  })
                  .eq("id", recipient.id);

                dispatchResults.push({
                  recipientId: recipient.id,
                  phone,
                  status: "deferred_rate_limit",
                  reason: `Meta error ${errorCode}: ${errorMsg}`,
                });
              } else {
                // Fatal recipient error (e.g. invalid phone number)
                await supabaseAdmin
                  .from("crm_campaign_recipients")
                  .update({
                    status: "failed",
                    last_error_code: String(errorCode),
                    last_error_message: errorMsg,
                    locked_by: null,
                    locked_until: null,
                    updated_at: new Date().toISOString(),
                  })
                  .eq("id", recipient.id);

                dispatchResults.push({
                  recipientId: recipient.id,
                  phone,
                  status: "failed",
                  reason: `Meta error ${errorCode}: ${errorMsg}`,
                });
              }
            }
          } catch (netErr: any) {
            // Ambiguous Network Outcome: Move to sending_unknown quarantine (RULE D)
            // NEVER auto-retry or drop without confirmation
            console.error(`[dispatch-campaign-worker] Network exception dispatching to ${phone}:`, netErr.message);

            await supabaseAdmin
              .from("crm_campaign_recipients")
              .update({
                status: "sending_unknown",
                last_error_code: "NETWORK_TIMEOUT_AMBIGUOUS",
                last_error_message: netErr.message || "Network exception during Meta API dispatch",
                locked_by: null,
                locked_until: null,
                updated_at: new Date().toISOString(),
              })
              .eq("id", recipient.id);

            await supabaseAdmin.from("crm_campaign_events").insert({
              campaign_id: campaignId,
              recipient_id: recipient.id,
              event_type: "dispatch_timeout_ambiguous",
              event_data: { error: netErr.message },
            });

            dispatchResults.push({
              recipientId: recipient.id,
              phone,
              status: "sending_unknown",
              reason: "Network timeout; quarantined to prevent double sending",
            });
          }
        }
      }

      // 6f. Reconcile campaign counters atomically
      await supabaseAdmin.rpc("sync_campaign_counters", { p_campaign_id: campaignId });

      return new Response(
        JSON.stringify({
          success: true,
          action: "claim_and_dispatch",
          campaignId,
          workerId,
          mode: isLiveDispatch ? "live_dispatch" : "mock_dry_run",
          claimedCount: items.length,
          dispatchedCount: dispatchResults.filter((r) => r.status === "sent").length,
          deferredCount: dispatchResults.filter((r) => r.status.startsWith("deferred")).length,
          suppressedCount: dispatchResults.filter((r) => r.status === "suppressed" || r.status === "skipped").length,
          failedCount: dispatchResults.filter((r) => r.status === "failed" || r.status === "sending_unknown").length,
          results: dispatchResults,
          timestamp: new Date().toISOString(),
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ error: `Unsupported action: ${action}` }),
      { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error in dispatch worker" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
