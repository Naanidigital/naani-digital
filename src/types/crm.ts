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

// ==============================================================================
// PROJECT PUBLISHING WORKFLOW LIFECYCLE TYPES (PHASE 5A)
// ==============================================================================

export type ProjectPublishLifecycleStatus =
  | "draft"
  | "verification_pending"
  | "verification_failed"
  | "ready_for_approval"
  | "approved"
  | "publishing"
  | "published"
  | "publication_failed"
  | "unpublished";

export type ProjectVerificationStatus =
  | "unverified"
  | "pending"
  | "verified"
  | "failed";

export type ProjectApprovalStatus =
  | "pending"
  | "ready"
  | "approved"
  | "rejected";

export type ProjectSyncStatus =
  | "pending"
  | "synced"
  | "failed";

export interface CrmPublishingProject {
  id: string;
  slug: string;
  name: string;
  builder: string;
  location: string;
  city: string;
  property_type: string;
  configuration: string | null;
  bhk_list: number[] | null;
  price_range: string | null;
  min_price_inr: number | null;
  max_price_inr: number | null;
  status: string | null;
  possession: string | null;
  usp: string | null;
  description: string | null;
  amenities: string[] | null;
  faqs: Array<{ q: string; a: string }> | null;
  gallery: string[] | null;
  hero_image: string | null;
  brochure_url: string | null;
  map_embed_url: string | null;
  seo_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  custom_page_path: string | null;
  featured: boolean;
  publish_status: ProjectPublishLifecycleStatus;
  source: string | null;
  created_at: string;
  updated_at: string;

  // Governance & Verification Fields
  verification_status?: ProjectVerificationStatus;
  rera_registration_number?: string | null;
  rera_authority?: string | null;
  rera_verification_date?: string | null;
  official_verification_source?: string | null;
  verified_promoter?: string | null;
  registered_project_name?: string | null;
  rera_verification_evidence?: string | null;
  review_notes?: string | null;
  approval_status?: ProjectApprovalStatus;
  approved_by?: string | null;
  approval_timestamp?: string | null;
  approval_notes?: string | null;
  publication_timestamp?: string | null;
  synchronization_status?: ProjectSyncStatus;
  last_synchronization_error?: string | null;
  last_synchronized_at?: string | null;
  public_database_record_id?: string | null;
}

export interface ProjectPublishingAuditLog {
  id: string;
  project_id: string;
  project_slug: string;
  action:
    | "save_draft"
    | "mark_verification_complete"
    | "mark_verification_failed"
    | "mark_ready_for_approval"
    | "approve_for_publishing"
    | "reject_approval"
    | "publish_sync"
    | "unpublish";
  from_status: string;
  to_status: string;
  performed_by: string | null;
  performer_email: string | null;
  reason: string | null;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface ProjectPublishingStats {
  total: number;
  draft: number;
  verification_pending: number;
  verification_failed: number;
  ready_for_approval: number;
  approved: number;
  published: number;
  publication_failed: number;
  unpublished: number;
}
