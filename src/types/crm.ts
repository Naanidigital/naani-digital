export interface CrmConversation {
  id: string;
  lead_id: string | null;
  wa_id: string;
  customer_name: string | null;
  channel: string;
  status: "open" | "resolved" | "archived";
  unread_count: number;
  last_message_text: string | null;
  last_message_at: string;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
  lead?: CrmLead | null;
}

export interface CrmMessage {
  id: string;
  conversation_id: string;
  wa_message_id: string | null;
  direction: "inbound" | "outbound";
  sender_type: "customer" | "agent" | "system";
  sender_id: string | null;
  message_type: "text" | "image" | "document" | "audio" | "video";
  content: string | null;
  media_url: string | null;
  status: "received" | "sent" | "delivered" | "read" | "failed";
  error_message: string | null;
  raw_payload?: any;
  created_at: string;
}

export interface CrmLead {
  id: string;
  full_name: string | null;
  phone: string;
  email: string | null;
  looking_for: string | null;
  budget: string | null;
  preferred_location: string | null;
  status: "new" | "contacted" | "qualified" | "site_visit_scheduled" | "negotiation" | "closed_won" | "closed_lost" | "archived";
  source: string;
  notes: string | null;
  assigned_to: string | null;
  last_contacted_at: string | null;
  created_at: string;
  updated_at: string;
}
