// ==============================================================================
// Supabase Edge Function: whatsapp-webhook (Production Gate 2B Package)
// Target Project: lpbdwmpglwdedqdiovqu (Naani Projects Dedicated CRM Backend)
//
// Key Features:
// 1. Meta Webhook Verification (GET): Secure hub.challenge handshake.
// 2. Cryptographic Security (POST): HMAC-SHA256 signature verification via
//    X-Hub-Signature-256 header (fails closed if WHATSAPP_APP_SECRET missing).
// 3. One-to-One CRM Chats: Automated lead discovery, thread recovery, and
//    idempotent message logging into crm_messages.
// 4. Enhanced Campaign Status Receipts: Real-time correlation by meta_message_id
//    on crm_campaign_recipients; updates delivered_at, read_at, failed_at,
//    and triggers sync_campaign_counters RPC.
// 5. Automated Opt-Out Compliance: Detects STOP / UNSUBSCRIBE / CANCEL keywords
//    and automatically adds customer to crm_whatsapp_suppressions register.
// 6. Non-Blocking Fail-Safe: Campaign receipt updates are non-blocking; missing
//    campaign records never disrupt normal one-to-one CRM conversation processing.
// ==============================================================================

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.48.0";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const WHATSAPP_VERIFY_TOKEN = Deno.env.get("WHATSAPP_VERIFY_TOKEN")!;
const WHATSAPP_APP_SECRET = Deno.env.get("WHATSAPP_APP_SECRET");

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-hub-signature-256",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

/**
 * Constant-time string comparison to prevent timing attacks.
 */
function timingSafeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/**
 * Normalizes an incoming phone number string to extract the last 10 digits
 * for consistent matching against Indian mobile numbers in crm_leads.
 */
function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 ? digits.slice(-10) : digits;
}

/**
 * Formats location message content safely without empty parentheses or missing fields.
 */
function formatLocationMessage(loc: any): string {
  if (!loc) return "[Location]";
  const coords = `${loc.latitude ?? ""}, ${loc.longitude ?? ""}`.trim();
  const desc = [loc.name, loc.address].filter(Boolean).join(" - ").trim();
  if (coords && desc) return `Location: ${coords} (${desc})`;
  if (coords) return `Location: ${coords}`;
  if (desc) return `Location: ${desc}`;
  return "[Location]";
}

/**
 * Verifies the X-Hub-Signature-256 header against the raw request body
 * using HMAC-SHA256 with the Meta App Secret. Fails closed if the secret is missing.
 */
async function verifySignature(
  rawBody: string,
  signatureHeader: string | null,
  appSecret: string | undefined
): Promise<{ valid: boolean; reason?: string }> {
  if (!appSecret) {
    return {
      valid: false,
      reason: "Server misconfiguration: WHATSAPP_APP_SECRET is not configured",
    };
  }

  if (!signatureHeader) {
    return { valid: false, reason: "Missing X-Hub-Signature-256 header" };
  }

  if (!signatureHeader.startsWith("sha256=")) {
    return { valid: false, reason: "Invalid signature format; expected sha256=" };
  }

  const expectedHex = signatureHeader.slice(7).toLowerCase();

  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(appSecret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signatureBuffer = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(rawBody)
    );

    const computedHex = Array.from(new Uint8Array(signatureBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    if (!timingSafeCompare(computedHex, expectedHex)) {
      return { valid: false, reason: "HMAC digest mismatch" };
    }

    return { valid: true };
  } catch (err: any) {
    return { valid: false, reason: `Verification error: ${err.message}` };
  }
}

const OPT_OUT_KEYWORDS = ["STOP", "UNSUBSCRIBE", "OPT OUT", "OPTOUT", "CANCEL", "BLOCK", "DND"];

Deno.serve(async (req: Request) => {
  // CORS Preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // --------------------------------------------------------------------------
  // 1. Meta Webhook Verification Handshake (GET)
  // --------------------------------------------------------------------------
  if (req.method === "GET") {
    const url = new URL(req.url);
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");

    if (mode === "subscribe" && token && timingSafeCompare(token, WHATSAPP_VERIFY_TOKEN)) {
      console.log("[whatsapp-webhook] Meta webhook verified successfully");
      return new Response(challenge, {
        status: 200,
        headers: { "Content-Type": "text/plain", ...corsHeaders },
      });
    }

    console.warn("[whatsapp-webhook] Meta verification failed: token mismatch or invalid mode");
    return new Response("Verification failed", {
      status: 403,
      headers: corsHeaders,
    });
  }

  // --------------------------------------------------------------------------
  // 2. Inbound Events & Messages (POST)
  // --------------------------------------------------------------------------
  if (req.method === "POST") {
    try {
      const rawBody = await req.text();

      // Signature verification with X-Hub-Signature-256 (Fails closed)
      const signatureHeader = req.headers.get("x-hub-signature-256");
      const signatureCheck = await verifySignature(
        rawBody,
        signatureHeader,
        WHATSAPP_APP_SECRET
      );

      if (!signatureCheck.valid) {
        console.error(
          `[whatsapp-webhook] Unauthorized webhook payload: ${signatureCheck.reason}`
        );
        return new Response(
          JSON.stringify({ error: "Invalid signature", reason: signatureCheck.reason }),
          {
            status: 401,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }

      const body = JSON.parse(rawBody);

      if (body.object !== "whatsapp_business_account") {
        return new Response("Not a WhatsApp Business Account event", {
          status: 404,
          headers: corsHeaders,
        });
      }

      for (const entry of body.entry || []) {
        for (const change of entry.changes || []) {
          const value = change.value;
          if (!value) continue;

          // ==================================================================
          // A. Process Status Receipts (sent, delivered, read, failed)
          // ==================================================================
          if (value.statuses && Array.isArray(value.statuses)) {
            for (const statusObj of value.statuses) {
              const waMessageId = statusObj.id;
              const newStatus = statusObj.status; // 'sent' | 'delivered' | 'read' | 'failed'
              const validStatuses = ["sent", "delivered", "read", "failed"];

              if (waMessageId && validStatuses.includes(newStatus)) {
                const statusTimestamp = statusObj.timestamp
                  ? new Date(parseInt(statusObj.timestamp, 10) * 1000).toISOString()
                  : new Date().toISOString();

                const errorMsg = statusObj.errors
                  ? JSON.stringify(statusObj.errors)
                  : null;

                // 1. Update Existing One-to-One CRM Messages Table
                const { error: statusErr } = await supabase
                  .from("crm_messages")
                  .update({
                    status: newStatus,
                    ...(errorMsg ? { error_message: errorMsg } : {}),
                  })
                  .eq("wa_message_id", waMessageId);

                if (statusErr) {
                  console.error(
                    `[whatsapp-webhook] Failed to update crm_messages for ${waMessageId}:`,
                    statusErr.message
                  );
                }

                // 2. Enhanced Campaign Recipient Correlation (by meta_message_id)
                // Non-blocking: missing campaign records never break CRM processing
                try {
                  const { data: matchedRecipient } = await supabase
                    .from("crm_campaign_recipients")
                    .select("id, campaign_id, status")
                    .eq("meta_message_id", waMessageId)
                    .maybeSingle();

                  if (matchedRecipient) {
                    const updatePayload: Record<string, any> = {
                      status: newStatus,
                      updated_at: new Date().toISOString(),
                    };

                    if (newStatus === "delivered") {
                      updatePayload.delivered_at = statusTimestamp;
                    } else if (newStatus === "read") {
                      updatePayload.read_at = statusTimestamp;
                    } else if (newStatus === "failed") {
                      updatePayload.failed_at = statusTimestamp;
                      updatePayload.last_error_code = statusObj.errors?.[0]?.code?.toString() || "META_DELIVERY_FAILURE";
                      updatePayload.last_error_message = statusObj.errors?.[0]?.message || statusObj.errors?.[0]?.title || "Message failed delivery by Meta";
                    }

                    await supabase
                      .from("crm_campaign_recipients")
                      .update(updatePayload)
                      .eq("id", matchedRecipient.id);

                    // Insert audit event
                    await supabase.from("crm_campaign_events").insert({
                      campaign_id: matchedRecipient.campaign_id,
                      recipient_id: matchedRecipient.id,
                      event_type: `receipt_${newStatus}`,
                      event_data: {
                        meta_message_id: waMessageId,
                        status: newStatus,
                        timestamp: statusTimestamp,
                        errors: statusObj.errors || null,
                      },
                    });

                    // Synchronize aggregate campaign counters atomically
                    await supabase.rpc("sync_campaign_counters", { p_campaign_id: matchedRecipient.campaign_id });
                    console.log(`[whatsapp-webhook] Correlated campaign receipt ${waMessageId} -> ${newStatus}`);
                  }
                } catch (campErr: any) {
                  console.warn("[whatsapp-webhook] Campaign recipient correlation notice:", campErr.message);
                }
              }
            }
          }

          // ==================================================================
          // B. Process Inbound Messages
          // ==================================================================
          if (value.messages && Array.isArray(value.messages)) {
            const contacts = value.contacts || [];
            const contactName = contacts[0]?.profile?.name || null;

            for (const message of value.messages) {
              const waMessageId = message.id;
              const fromPhone = message.from;
              const msgType = message.type || "text";
              const timestamp = message.timestamp
                ? new Date(parseInt(message.timestamp, 10) * 1000).toISOString()
                : new Date().toISOString();

              if (!waMessageId || !fromPhone) continue;

              // Step 1: Idempotency & Deduplication Check
              const { data: existingMsg, error: dedupErr } = await supabase
                .from("crm_messages")
                .select("id")
                .eq("wa_message_id", waMessageId)
                .maybeSingle();

              if (dedupErr) {
                console.error("[whatsapp-webhook] Deduplication check error:", dedupErr.message);
              }

              if (existingMsg) {
                console.log(`[whatsapp-webhook] Skipping duplicate message: ${waMessageId}`);
                continue;
              }

              // Step 2: Content Parsing by Type
              let content: string | null = null;
              let mediaUrl: string | null = null;

              switch (msgType) {
                case "text":
                  content = message.text?.body || "";
                  break;
                case "image":
                  content = message.image?.caption || "[Image]";
                  mediaUrl = message.image?.id || null;
                  break;
                case "document":
                  content = message.document?.filename || "[Document]";
                  mediaUrl = message.document?.id || null;
                  break;
                case "audio":
                  content = "[Audio]";
                  mediaUrl = message.audio?.id || null;
                  break;
                case "video":
                  content = message.video?.caption || "[Video]";
                  mediaUrl = message.video?.id || null;
                  break;
                case "location":
                  content = formatLocationMessage(message.location);
                  break;
                case "interactive":
                  content =
                    message.interactive?.button_reply?.title ||
                    message.interactive?.list_reply?.title ||
                    "[Interactive Response]";
                  break;
                case "button":
                  content = message.button?.text || "[Button Reply]";
                  break;
                default:
                  content = `[${msgType} message]`;
              }

              const normPhone = normalizePhone(fromPhone);

              // --------------------------------------------------------------
              // Step 2b: Automated Opt-Out / STOP Keyword Suppression Check
              // --------------------------------------------------------------
              if (content) {
                const upperTrim = content.trim().toUpperCase();
                if (OPT_OUT_KEYWORDS.includes(upperTrim)) {
                  try {
                    await supabase
                      .from("crm_whatsapp_suppressions")
                      .insert({
                        normalized_phone: normPhone,
                        reason: "customer_opt_out",
                        source: "whatsapp_webhook",
                        notes: `Customer opted out via inbound keyword '${content.trim()}'`,
                      })
                      .select("id")
                      .maybeSingle();

                    // Cancel pending campaign recipients for this phone
                    await supabase
                      .from("crm_campaign_recipients")
                      .update({
                        status: "suppressed",
                        last_error_code: "INBOUND_STOP_KEYWORD",
                        last_error_message: `Customer sent opt-out keyword: ${content.trim()}`,
                      })
                      .eq("normalized_phone", normPhone)
                      .eq("status", "queued");

                    console.log(`[whatsapp-webhook] Processed automated opt-out for ${normPhone}`);
                  } catch (optErr: any) {
                    console.error("[whatsapp-webhook] Opt-out handling notice:", optErr.message);
                  }
                }
              }

              // Step 3: Lead Resolution (Match or Auto-Create)
              let leadId: string | null = null;
              const { data: existingLeads } = await supabase
                .from("crm_leads")
                .select("id, full_name")
                .or(`phone.eq.${fromPhone},phone.ilike.%${normPhone}`)
                .limit(1);

              if (existingLeads && existingLeads.length > 0) {
                leadId = existingLeads[0].id;
                await supabase
                  .from("crm_leads")
                  .update({
                    last_contacted_at: timestamp,
                    ...(contactName && !existingLeads[0].full_name
                      ? { full_name: contactName }
                      : {}),
                  })
                  .eq("id", leadId);
              } else {
                const { data: newLead, error: leadErr } = await supabase
                  .from("crm_leads")
                  .insert({
                    full_name: contactName || `WhatsApp Contact (${normPhone})`,
                    phone: fromPhone,
                    source: "whatsapp",
                    status: "new",
                    last_contacted_at: timestamp,
                  })
                  .select("id")
                  .maybeSingle();

                if (!leadErr && newLead) {
                  leadId = newLead.id;
                  console.log(`[whatsapp-webhook] Created new CRM lead: ${leadId}`);
                } else {
                  const { data: recoveredLead } = await supabase
                    .from("crm_leads")
                    .select("id")
                    .or(`phone.eq.${fromPhone},phone.ilike.%${normPhone}`)
                    .limit(1)
                    .maybeSingle();

                  if (recoveredLead) leadId = recoveredLead.id;
                }
              }

              // Step 4: Conversation Thread Resolution (Match or Create with Collision Recovery)
              let convId: string | null = null;
              const { data: existingConv } = await supabase
                .from("crm_conversations")
                .select("id, customer_name")
                .eq("wa_id", fromPhone)
                .maybeSingle();

              if (existingConv) {
                convId = existingConv.id;
                await supabase
                  .from("crm_conversations")
                  .update({
                    ...(leadId ? { lead_id: leadId } : {}),
                    customer_name: contactName || existingConv.customer_name,
                    last_message_text: content,
                    last_message_at: timestamp,
                    status: "open",
                  })
                  .eq("id", convId);
              } else {
                const { data: newConv, error: convErr } = await supabase
                  .from("crm_conversations")
                  .insert({
                    lead_id: leadId,
                    wa_id: fromPhone,
                    customer_name: contactName || `WhatsApp (${normPhone})`,
                    channel: "whatsapp",
                    status: "open",
                    unread_count: 0,
                    last_message_text: content,
                    last_message_at: timestamp,
                  })
                  .select("id")
                  .maybeSingle();

                if (!convErr && newConv) {
                  convId = newConv.id;
                  console.log(`[whatsapp-webhook] Created new conversation thread: ${convId}`);
                } else {
                  const { data: recoveredConv } = await supabase
                    .from("crm_conversations")
                    .select("id")
                    .eq("wa_id", fromPhone)
                    .maybeSingle();

                  if (recoveredConv) {
                    convId = recoveredConv.id;
                    await supabase
                      .from("crm_conversations")
                      .update({
                        ...(leadId ? { lead_id: leadId } : {}),
                        last_message_text: content,
                        last_message_at: timestamp,
                        status: "open",
                      })
                      .eq("id", convId);
                  }
                }
              }

              // Step 5: Insert Message Record with Idempotent Upsert Guarantee
              if (convId) {
                const { error: msgInsertErr } = await supabase.from("crm_messages").upsert(
                  {
                    conversation_id: convId,
                    wa_message_id: waMessageId,
                    direction: "inbound",
                    sender_type: "customer",
                    sender_id: fromPhone,
                    message_type: msgType,
                    content: content,
                    media_url: mediaUrl,
                    status: "received",
                    raw_payload: message,
                    created_at: timestamp,
                  },
                  { onConflict: "wa_message_id", ignoreDuplicates: true }
                );

                if (msgInsertErr) {
                  console.error(
                    `[whatsapp-webhook] Failed to insert inbound message ${waMessageId}:`,
                    msgInsertErr.message
                  );
                } else {
                  console.log(
                    `[whatsapp-webhook] Recorded inbound message ${waMessageId} in thread ${convId}`
                  );
                }
              }
            }
          }
        }
      }

      // Always return 200 OK promptly so Meta acknowledges delivery
      return new Response(JSON.stringify({ status: "success" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (err: any) {
      console.error("[whatsapp-webhook] Unexpected processing error:", err.message);
      // Return 200 on internal errors to prevent Meta from spam-retrying malformed payloads
      return new Response(
        JSON.stringify({ status: "error", message: err.message }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
  }

  return new Response("Method Not Allowed", {
    status: 405,
    headers: corsHeaders,
  });
});
