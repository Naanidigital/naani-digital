import { crmSupabase } from "@/integrations/supabase/crmClient";
import type { CrmMessage } from "@/types/crm";

/**
 * 24-Hour WhatsApp Customer Service Window Duration in Milliseconds.
 * Per Meta WhatsApp Cloud API Policy:
 * Businesses can reply with free-form text messages within 24 hours of the customer's last inbound message.
 * Outside of this 24-hour window, only pre-approved WhatsApp Message Templates may be delivered.
 */
export const WHATSAPP_WINDOW_DURATION_MS = 24 * 60 * 60 * 1000;

export interface CustomerWindowStatus {
  isOpen: boolean;
  expiresAt: Date | null;
  remainingMs: number;
  formattedRemaining: string;
  hasInbound: boolean;
  lastInboundAt: string | null;
}

/**
 * Calculates the real-time WhatsApp Customer Service Window status
 * based on the most recent inbound message from the customer.
 */
export function getCustomerServiceWindow(messages: CrmMessage[]): CustomerWindowStatus {
  // Find the most recent inbound message in chronological or reverse order
  const latestInbound = [...messages]
    .reverse()
    .find((m) => m.direction === "inbound" || m.sender_type === "customer");

  if (!latestInbound || !latestInbound.created_at) {
    return {
      isOpen: false,
      expiresAt: null,
      remainingMs: 0,
      formattedRemaining: "No customer message on record",
      hasInbound: false,
      lastInboundAt: null,
    };
  }

  const inboundTime = new Date(latestInbound.created_at).getTime();
  const expiresAt = new Date(inboundTime + WHATSAPP_WINDOW_DURATION_MS);
  const now = Date.now();
  const remainingMs = expiresAt.getTime() - now;
  const isOpen = remainingMs > 0;

  let formattedRemaining = "Window Expired";
  if (isOpen) {
    const hours = Math.floor(remainingMs / (1000 * 60 * 60));
    const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
    if (hours > 0) {
      formattedRemaining = `${hours}h ${minutes}m remaining`;
    } else {
      formattedRemaining = `${Math.max(1, minutes)}m remaining`;
    }
  }

  return {
    isOpen,
    expiresAt,
    remainingMs: Math.max(0, remainingMs),
    formattedRemaining,
    hasInbound: true,
    lastInboundAt: latestInbound.created_at,
  };
}

/**
 * Parses Meta Cloud API error payloads into clear, human-readable explanations.
 */
export function formatMetaError(error: any): string {
  if (!error) return "Unknown error occurred while contacting WhatsApp Cloud API.";

  // If error is already a string
  if (typeof error === "string") {
    try {
      const parsed = JSON.parse(error);
      return formatMetaError(parsed);
    } catch {
      return error;
    }
  }

  // Meta error code mappings
  const code = error.code || error.error_subcode || error.details?.code;
  const message = error.message || error.details?.message || error.error;

  switch (code) {
    case 131047:
      return "Meta Policy Rejection (#131047): More than 24 hours have passed since the customer last replied. Free-form text messages cannot be delivered outside the 24-hour service window. An approved WhatsApp message template is required.";
    case 100:
      return "Invalid Phone Number (#100): The recipient phone number is not a valid WhatsApp destination.";
    case 190:
      return "Authentication Error (#190): WhatsApp access token is expired or unauthorized. Please verify backend credentials.";
    case 131026:
      return "Message Undeliverable (#131026): Recipient is not registered on WhatsApp or has blocked incoming business messages.";
    case 130429:
      return "Rate Limit Exceeded (#130429): WhatsApp Cloud API throughput limit reached. Please retry in a few moments.";
    case 131051:
      return "Unsupported Message Type (#131051): Unsupported message format.";
    default:
      if (typeof message === "string" && message.includes("24 hours")) {
        return "24-Hour Window Expired: WhatsApp policy requires approved message templates outside the 24-hour window.";
      }
      return message || JSON.stringify(error);
  }
}

export interface SendWhatsAppPayload {
  toPhone: string;
  messageText: string;
  conversationId?: string;
}

export interface SendWhatsAppResponse {
  success: boolean;
  messageId?: string;
  conversationId?: string;
  error?: string;
  details?: any;
}

/**
 * Invokes the deployed 'send-whatsapp-message' Supabase Edge Function
 * using the authenticated CRM operator's session JWT.
 */
export async function sendWhatsAppMessage(
  payload: SendWhatsAppPayload
): Promise<SendWhatsAppResponse> {
  const text = payload.messageText.trim();
  if (!text) {
    return {
      success: false,
      error: "Message text cannot be empty.",
    };
  }

  if (!payload.toPhone || !payload.toPhone.trim()) {
    return {
      success: false,
      error: "Recipient phone number is required.",
    };
  }

  // 1. Check authenticated staff session
  const {
    data: { session },
    error: sessionError,
  } = await crmSupabase.auth.getSession();

  if (sessionError || !session || !session.access_token) {
    return {
      success: false,
      error: "Authentication required. Please log in with authorized staff credentials to send WhatsApp messages.",
    };
  }

  try {
    // 2. Invoke deployed Edge Function
    const { data, error } = await crmSupabase.functions.invoke("send-whatsapp-message", {
      body: {
        toPhone: payload.toPhone,
        messageText: text,
        conversationId: payload.conversationId,
      },
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (error) {
      let extractedError = error.message;
      let errorDetails: any = null;

      // Extract JSON payload from FunctionsHttpError context if present
      if (error && "context" in error && error.context) {
        try {
          const body = await (error.context as Response).json();
          if (body.error) extractedError = body.error;
          if (body.details) {
            errorDetails = body.details;
            extractedError = formatMetaError(body.details);
          }
        } catch {
          // context already consumed or not JSON
        }
      }

      return {
        success: false,
        error: extractedError || "Failed to dispatch WhatsApp message via Edge Function",
        details: errorDetails,
      };
    }

    if (!data || !data.success) {
      const errMsg = data?.error ? formatMetaError(data.details || data.error) : "Unexpected response from WhatsApp dispatch";
      return {
        success: false,
        error: errMsg,
        details: data?.details,
      };
    }

    return {
      success: true,
      messageId: data.messageId,
      conversationId: data.conversationId,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Network error while connecting to WhatsApp dispatch service",
    };
  }
}
