import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.48.0";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const WHATSAPP_ACCESS_TOKEN = Deno.env.get("WHATSAPP_ACCESS_TOKEN")!;
const WHATSAPP_PHONE_NUMBER_ID = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID")!;

// Server-side privileged client for administrative operations and DB writes
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

/**
 * Normalizes phone numbers to standard international format (without +)
 * e.g., 9493943946 -> 919493943946 for India.
 */
function sanitizePhoneNumber(input: string): string {
  const digits = input.replace(/\D/g, "");
  if (digits.length === 10) {
    return `91${digits}`;
  }
  return digits;
}

interface TemplateComponentParam {
  type: string;
  text?: string;
  image?: { link?: string; id?: string };
  document?: { link?: string; filename?: string; id?: string };
  video?: { link?: string; id?: string };
  payload?: string;
  [key: string]: any;
}

interface TemplateComponent {
  type: string;
  sub_type?: string;
  index?: string | number;
  parameters?: TemplateComponentParam[];
  [key: string]: any;
}

interface ValidatedTemplate {
  name: string;
  language: { code: string };
  components?: TemplateComponent[];
}

/**
 * Validates and sanitizes WhatsApp template payload against Meta Cloud API specifications.
 */
function validateTemplate(rawTemplate: any): { template?: ValidatedTemplate; error?: string } {
  if (!rawTemplate || typeof rawTemplate !== "object" || Array.isArray(rawTemplate)) {
    return { error: "Validation Error: 'template' must be a valid object." };
  }

  // 1. Template Name Validation
  const name = rawTemplate.name || rawTemplate.templateName;
  if (!name || typeof name !== "string" || !name.trim()) {
    return { error: "Validation Error: 'template.name' is required." };
  }
  const cleanName = name.trim();
  if (!/^[a-z0-9_]{1,512}$/.test(cleanName)) {
    return {
      error: `Validation Error: Invalid template name '${cleanName}'. Template names must be 1 to 512 characters containing only lowercase alphanumeric characters and underscores.`,
    };
  }

  // 2. Language Code Validation
  let langCode: string | undefined;
  if (typeof rawTemplate.language === "string") {
    langCode = rawTemplate.language.trim();
  } else if (rawTemplate.language && typeof rawTemplate.language === "object") {
    langCode = rawTemplate.language.code?.trim();
  } else if (typeof rawTemplate.templateLanguage === "string") {
    langCode = rawTemplate.templateLanguage.trim();
  }

  if (!langCode) {
    return { error: "Validation Error: 'template.language' (or 'template.language.code') is required." };
  }

  // Standard Meta language code pattern (e.g. 'en', 'en_US', 'hi', 'te')
  if (!/^[a-z]{2,3}(_[A-Za-z0-9]+)?$/.test(langCode)) {
    return {
      error: `Validation Error: Invalid language code '${langCode}'. Expected standard ISO format (e.g., 'en', 'en_US', 'hi', 'te').`,
    };
  }

  // 3. Components Validation (Optional)
  const components = rawTemplate.components || rawTemplate.templateComponents;
  let validatedComponents: TemplateComponent[] | undefined = undefined;

  if (components !== undefined && components !== null) {
    if (!Array.isArray(components)) {
      return { error: "Validation Error: 'template.components' must be an array." };
    }

    validatedComponents = [];
    for (let i = 0; i < components.length; i++) {
      const comp = components[i];
      if (!comp || typeof comp !== "object" || Array.isArray(comp)) {
        return { error: `Validation Error: Component at index ${i} must be a valid object.` };
      }

      if (!comp.type || typeof comp.type !== "string") {
        return { error: `Validation Error: Component at index ${i} requires a 'type' string.` };
      }

      const compType = comp.type.trim().toLowerCase();
      if (!["header", "body", "button"].includes(compType)) {
        return {
          error: `Validation Error: Component at index ${i} has unsupported type '${comp.type}'. Allowed types: 'header', 'body', 'button'.`,
        };
      }

      const cleanComp: TemplateComponent = { type: compType };

      // Button specific validation
      if (compType === "button") {
        if (!comp.sub_type || typeof comp.sub_type !== "string") {
          return { error: `Validation Error: Button component at index ${i} requires 'sub_type' ('quick_reply' or 'url').` };
        }
        const subType = comp.sub_type.trim().toLowerCase();
        if (!["quick_reply", "url"].includes(subType)) {
          return { error: `Validation Error: Button sub_type '${comp.sub_type}' at index ${i} is invalid. Allowed: 'quick_reply', 'url'.` };
        }
        cleanComp.sub_type = subType;

        if (comp.index === undefined || comp.index === null) {
          return { error: `Validation Error: Button component at index ${i} requires an 'index' position.` };
        }
        cleanComp.index = String(comp.index);
      }

      // Parameters validation
      if (comp.parameters !== undefined && comp.parameters !== null) {
        if (!Array.isArray(comp.parameters)) {
          return { error: `Validation Error: Component '${compType}' parameters at index ${i} must be an array.` };
        }

        const validParams: TemplateComponentParam[] = [];
        for (let j = 0; j < comp.parameters.length; j++) {
          const param = comp.parameters[j];
          if (!param || typeof param !== "object" || Array.isArray(param)) {
            return { error: `Validation Error: Parameter at index ${j} in component '${compType}' must be an object.` };
          }

          if (!param.type || typeof param.type !== "string") {
            return { error: `Validation Error: Parameter at index ${j} in component '${compType}' requires a 'type' string.` };
          }

          const paramType = param.type.trim().toLowerCase();
          const cleanParam: TemplateComponentParam = { type: paramType };

          switch (paramType) {
            case "text": {
              if (param.text === undefined || param.text === null || typeof param.text !== "string") {
                return { error: `Validation Error: Text parameter at index ${j} in component '${compType}' requires a string 'text'.` };
              }
              if (param.text.length > 1024) {
                return { error: `Validation Error: Text parameter at index ${j} exceeds maximum allowed length of 1,024 characters.` };
              }
              cleanParam.text = param.text;
              break;
            }
            case "image": {
              if (!param.image || typeof param.image !== "object" || (!param.image.link && !param.image.id)) {
                return { error: `Validation Error: Image parameter at index ${j} requires 'image.link' (URL) or 'image.id'.` };
              }
              cleanParam.image = param.image;
              break;
            }
            case "document": {
              if (!param.document || typeof param.document !== "object" || (!param.document.link && !param.document.id)) {
                return { error: `Validation Error: Document parameter at index ${j} requires 'document.link' (URL) or 'document.id'.` };
              }
              cleanParam.document = param.document;
              break;
            }
            case "video": {
              if (!param.video || typeof param.video !== "object" || (!param.video.link && !param.video.id)) {
                return { error: `Validation Error: Video parameter at index ${j} requires 'video.link' (URL) or 'video.id'.` };
              }
              cleanParam.video = param.video;
              break;
            }
            case "payload": {
              if (param.payload === undefined || param.payload === null || typeof param.payload !== "string") {
                return { error: `Validation Error: Button payload parameter at index ${j} requires a string 'payload'.` };
              }
              cleanParam.payload = param.payload;
              break;
            }
            default: {
              return {
                error: `Validation Error: Unsupported parameter type '${param.type}' at index ${j} in component '${compType}'.`,
              };
            }
          }

          validParams.push(cleanParam);
        }

        cleanComp.parameters = validParams;
      }

      validatedComponents.push(cleanComp);
    }
  }

  return {
    template: {
      name: cleanName,
      language: { code: langCode },
      ...(validatedComponents && validatedComponents.length > 0 ? { components: validatedComponents } : {}),
    },
  };
}

Deno.serve(async (req: Request) => {
  // 1. CORS Preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    // 2. Authentication & Role-Based Access Control (Admin/Moderator Only)
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Missing Bearer token in Authorization header" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const token = authHeader.replace("Bearer ", "").trim();
    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(token);

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Invalid or expired session token" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Verify user role in public.user_roles (admin or moderator required)
    const { data: roleRow, error: roleError } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .in("role", ["admin", "moderator"])
      .maybeSingle();

    if (roleError || !roleRow) {
      return new Response(
        JSON.stringify({
          error: "Forbidden: You do not have permissions to send WhatsApp messages. Admin or moderator role required.",
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // 3. Payload Validation (Supports both plain-text and Meta template messages)
    const body = await req.json();
    const { toPhone, messageText, conversationId, template, messageType } = body;

    if (!toPhone || typeof toPhone !== "string" || !toPhone.trim()) {
      return new Response(
        JSON.stringify({ error: "Validation Error: 'toPhone' is required." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const cleanToPhone = sanitizePhoneNumber(toPhone);
    if (cleanToPhone.length < 10 || cleanToPhone.length > 15) {
      return new Response(
        JSON.stringify({
          error: `Validation Error: Invalid phone number format '${toPhone}'. Expected 10 to 15 digits.`,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Determine message modality: Template vs. Plain-Text
    const isTemplateRequested = Boolean(template || messageType === "template" || body.templateName);
    let validatedTemplateData: ValidatedTemplate | null = null;
    let effectiveDisplayContent = "";

    if (isTemplateRequested) {
      const templateInput = template || {
        name: body.templateName,
        language: body.templateLanguage,
        components: body.templateComponents,
      };

      const { template: vTemplate, error: tError } = validateTemplate(templateInput);
      if (tError || !vTemplate) {
        return new Response(
          JSON.stringify({ error: tError || "Validation Error: Invalid template specification." }),
          {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }

      validatedTemplateData = vTemplate;
      effectiveDisplayContent = (messageText && typeof messageText === "string" && messageText.trim())
        ? messageText.trim()
        : `[Template: ${vTemplate.name}]`;
    } else {
      // Plain-text validation
      if (!messageText || typeof messageText !== "string" || !messageText.trim()) {
        return new Response(
          JSON.stringify({
            error: "Validation Error: Either 'messageText' (for plain-text) or 'template' (for approved templates) is required.",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }

      if (messageText.trim().length > 4096) {
        return new Response(
          JSON.stringify({
            error: "Validation Error: Message exceeds WhatsApp limit of 4,096 characters.",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }

      effectiveDisplayContent = messageText.trim();
    }

    // 4. Pre-Resolve or Create Conversation Thread with Collision Safety
    // This guarantees that both successful AND failed message attempts are audited in CRM
    const nowIso = new Date().toISOString();
    let targetConvId = conversationId;

    if (!targetConvId) {
      const { data: existingConv } = await supabaseAdmin
        .from("crm_conversations")
        .select("id")
        .eq("wa_id", cleanToPhone)
        .maybeSingle();

      if (existingConv) {
        targetConvId = existingConv.id;
      } else {
        const { data: newConv, error: convErr } = await supabaseAdmin
          .from("crm_conversations")
          .insert({
            wa_id: cleanToPhone,
            customer_name: `Contact (${cleanToPhone.slice(-10)})`,
            channel: "whatsapp",
            status: "open",
            unread_count: 0,
            last_message_text: effectiveDisplayContent,
            last_message_at: nowIso,
            assigned_to: user.id,
          })
          .select("id")
          .maybeSingle();

        if (!convErr && newConv) {
          targetConvId = newConv.id;
        } else {
          // Concurrency recovery: Check if another agent or webhook created it simultaneously
          const { data: recoveredConv } = await supabaseAdmin
            .from("crm_conversations")
            .select("id")
            .eq("wa_id", cleanToPhone)
            .maybeSingle();

          if (recoveredConv) {
            targetConvId = recoveredConv.id;
          } else {
            console.error(
              "[send-whatsapp-message] Failed to create or recover conversation thread:",
              convErr?.message
            );
          }
        }
      }
    }

    // 4b. Pre-Send Recipient Pacing Reservation (Cross-Channel Recipient Pair Rate Limit)
    // Atomically reserves the dispatch slot BEFORE invoking Meta Cloud API
    // Enforces the 60-second cooldown across all channels (Campaign Worker + Direct CRM Inbox)
    const { data: pacingRows, error: pacingErr } = await supabaseAdmin.rpc(
      "check_and_update_recipient_pacing",
      {
        p_phone: cleanToPhone,
        p_source_type: "crm_inbox",
        p_source_campaign_id: null,
        p_source_worker_id: `crm_agent_${user.id.substring(0, 8)}`,
        p_cooldown_seconds: 60,
      }
    );

    if (pacingErr) {
      console.error(
        "[send-whatsapp-message] Failed to query/reserve recipient pacing:",
        pacingErr.message
      );
    }

    const pacingResult = Array.isArray(pacingRows) ? pacingRows[0] : pacingRows;
    if (pacingResult && pacingResult.can_dispatch === false) {
      const waitSec = pacingResult.seconds_remaining ?? 60;
      const prevSource = pacingResult.previous_source || "another channel";
      console.warn(
        `[send-whatsapp-message] Pre-send pacing rejected for ${cleanToPhone}: dispatched via ${prevSource} recently, wait ${waitSec}s`
      );

      return new Response(
        JSON.stringify({
          error: `Recipient pair rate limit: A WhatsApp message was sent to this recipient recently via ${
            prevSource === "crm_inbox" ? "CRM Inbox" : "Campaign Dispatch"
          }. Please wait ${waitSec} seconds before sending another message.`,
          code: "PAIR_RATE_LIMIT_COOLDOWN",
          isCooldownBlocked: true,
          waitSecondsRemaining: waitSec,
          previousSource: prevSource,
          lastDispatchedAt: pacingResult.last_dispatched_at,
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // 5. Server-Side Execution: Meta Cloud API Call
    if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
      console.error(
        "[send-whatsapp-message] Missing required WhatsApp Cloud API environment secrets."
      );
      return new Response(
        JSON.stringify({
          error: "Server configuration error: WhatsApp API credentials are not configured.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const metaEndpoint = `https://graph.facebook.com/v21.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

    // Construct Meta Cloud API outbound payload based on modality
    let metaPayload: Record<string, any>;
    const finalMessageType = validatedTemplateData ? "template" : "text";

    if (validatedTemplateData) {
      metaPayload = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: cleanToPhone,
        type: "template",
        template: {
          name: validatedTemplateData.name,
          language: validatedTemplateData.language,
          ...(validatedTemplateData.components && validatedTemplateData.components.length > 0
            ? { components: validatedTemplateData.components }
            : {}),
        },
      };
    } else {
      metaPayload = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: cleanToPhone,
        type: "text",
        text: {
          preview_url: false,
          body: effectiveDisplayContent,
        },
      };
    }

    const metaResponse = await fetch(metaEndpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(metaPayload),
    });

    const metaData = await metaResponse.json();

    // 6. Handle Meta Failure: Record in CRM and Return Error
    if (!metaResponse.ok) {
      console.error(
        `[send-whatsapp-message] Meta Cloud API returned status ${metaResponse.status}:`,
        metaData.error?.message || "Unknown error"
      );

      // Record failed outbound attempt with guaranteed thread attribution
      if (targetConvId) {
        const { error: failInsertErr } = await supabaseAdmin.from("crm_messages").insert({
          conversation_id: targetConvId,
          direction: "outbound",
          sender_type: "agent",
          sender_id: user.id,
          message_type: finalMessageType,
          content: effectiveDisplayContent,
          status: "failed",
          error_message: metaData.error ? JSON.stringify(metaData.error) : "Meta delivery failure",
          raw_payload: metaData,
          created_at: nowIso,
        });

        if (failInsertErr) {
          console.error(
            "[send-whatsapp-message] Failed to record failed message:",
            failInsertErr.message
          );
        }
      }

      return new Response(
        JSON.stringify({
          error: "Failed to send WhatsApp message via Meta Cloud API",
          details: metaData.error || metaData,
        }),
        {
          status: metaResponse.status,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // 7. Handle Meta Success: Never mark sent until Meta confirms acceptance
    const waMessageId = metaData.messages?.[0]?.id || null;

    if (targetConvId) {
      // Record outbound message in crm_messages with status 'sent'
      const { error: msgInsertErr } = await supabaseAdmin.from("crm_messages").insert({
        conversation_id: targetConvId,
        wa_message_id: waMessageId,
        direction: "outbound",
        sender_type: "agent",
        sender_id: user.id,
        message_type: finalMessageType,
        content: effectiveDisplayContent,
        status: "sent",
        raw_payload: metaData,
        created_at: nowIso,
      });

      if (msgInsertErr) {
        console.error(
          "[send-whatsapp-message] Failed to record sent message:",
          msgInsertErr.message
        );
      }

      // Update thread timestamp, reset unread count, and assign agent
      const { error: threadUpdateErr } = await supabaseAdmin
        .from("crm_conversations")
        .update({
          last_message_text: effectiveDisplayContent,
          last_message_at: nowIso,
          unread_count: 0,
          assigned_to: user.id,
        })
        .eq("id", targetConvId);

      if (threadUpdateErr) {
        console.error(
          "[send-whatsapp-message] Failed to update conversation thread:",
          threadUpdateErr.message
        );
      }
    }

    console.log(
      `[send-whatsapp-message] ${finalMessageType.toUpperCase()} message successfully sent by agent ${user.id} to ${cleanToPhone} (wa_message_id: ${waMessageId})`
    );

    return new Response(
      JSON.stringify({
        success: true,
        messageId: waMessageId,
        conversationId: targetConvId,
        messageType: finalMessageType,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (err: any) {
    console.error("[send-whatsapp-message] Internal server error:", err.message);
    return new Response(
      JSON.stringify({ error: "Internal Server Error", message: err.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
