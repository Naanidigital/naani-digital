// src/lib/campaignStagingService.ts
// ==============================================================================
// Production Campaign Service (Connected to Supabase: lpbdwmpglwdedqdiovqu)
// Handles campaign drafts, audience eligibility, recipient claiming,
// worker dispatch, and billing observability.
// ==============================================================================

import { crmSupabase } from "@/integrations/supabase/crmClient";

export interface StagingCampaignRecord {
  id: string;
  name: string;
  description?: string | null;
  project_id?: string | null;
  campaign_type: string;
  template_name: string;
  template_language: string;
  template_snapshot: any;
  audience_source: string;
  status: 'draft' | 'awaiting_approval' | 'scheduled' | 'queued' | 'running' | 'paused' | 'completed' | 'partially_completed' | 'failed' | 'cancelled';
  total_recipients: number;
  eligible_recipients: number;
  queued_count: number;
  sending_count: number;
  unknown_count: number;
  sent_count: number;
  delivered_count: number;
  read_count: number;
  failed_count: number;
  excluded_count: number;
  opted_out_count: number;
  created_at: string;
  updated_at: string;
  started_at?: string | null;
  completed_at?: string | null;
}

export interface StagingCampaignRecipient {
  id: string;
  campaign_id: string;
  normalized_phone: string;
  customer_name?: string | null;
  template_variables: Record<string, string>;
  consent_status: 'opted_in' | 'unverified' | 'opted_out' | 'suppressed';
  consent_source?: string | null;
  status: 'queued' | 'sending' | 'sending_unknown' | 'sent' | 'delivered' | 'read' | 'failed' | 'suppressed' | 'skipped' | 'opted_out' | 'cancelled';
  meta_message_id?: string | null;
  attempt_count: number;
  max_retries: number;
  locked_by?: string | null;
  locked_until?: string | null;
  last_error_code?: string | null;
  last_error_message?: string | null;
  queued_at?: string | null;
  sent_at?: string | null;
  delivered_at?: string | null;
  read_at?: string | null;
  failed_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface StagingCampaignAuditEvent {
  id: string;
  campaign_id: string;
  recipient_id?: string | null;
  event_type: string;
  event_data: any;
  created_at: string;
}

export interface StagingSuppressionRecord {
  id: string;
  normalized_phone: string;
  reason: string;
  source: string;
  notes?: string | null;
  suppressed_at: string;
  created_at: string;
}

export interface StagingImportHistoryRecord {
  id: string;
  campaign_id?: string | null;
  original_filename: string;
  file_size_bytes?: number | null;
  total_rows: number;
  valid_rows: number;
  invalid_rows: number;
  duplicate_rows: number;
  excluded_rows: number;
  consent_eligible_rows: number;
  column_mapping?: any;
  error_report?: any[];
  created_at: string;
}

export interface StagingDashboardMetrics {
  totalCampaigns: number;
  draftCampaigns: number;
  runningCampaigns: number;
  pausedCampaigns: number;
  completedCampaigns: number;
  totalRecipients: number;
  eligibleRecipients: number;
  queuedRecipients: number;
  sendingRecipients: number;
  sentMessages: number;
  deliveredMessages: number;
  readMessages: number;
  failedMessages: number;
  skippedRecipients: number;
  unknownStatusCount: number;
}

// 1. Fetch Aggregated Operational Metrics from Staging DB
export async function getStagingDashboardMetrics(): Promise<StagingDashboardMetrics> {
  const { data: campaigns, error } = await crmSupabase
    .from("crm_campaigns")
    .select("*");

  if (error || !campaigns) {
    console.error("[StagingCampaignService] Error fetching campaigns:", error);
    return {
      totalCampaigns: 0,
      draftCampaigns: 0,
      runningCampaigns: 0,
      pausedCampaigns: 0,
      completedCampaigns: 0,
      totalRecipients: 0,
      eligibleRecipients: 0,
      queuedRecipients: 0,
      sendingRecipients: 0,
      sentMessages: 0,
      deliveredMessages: 0,
      readMessages: 0,
      failedMessages: 0,
      skippedRecipients: 0,
      unknownStatusCount: 0,
    };
  }

  const metrics: StagingDashboardMetrics = {
    totalCampaigns: campaigns.length,
    draftCampaigns: campaigns.filter((c) => c.status === "draft").length,
    runningCampaigns: campaigns.filter((c) => c.status === "running").length,
    pausedCampaigns: campaigns.filter((c) => c.status === "paused").length,
    completedCampaigns: campaigns.filter((c) => c.status === "completed").length,
    totalRecipients: campaigns.reduce((acc, c) => acc + (c.total_recipients || 0), 0),
    eligibleRecipients: campaigns.reduce((acc, c) => acc + (c.eligible_recipients || 0), 0),
    queuedRecipients: campaigns.reduce((acc, c) => acc + (c.queued_count || 0), 0),
    sendingRecipients: campaigns.reduce((acc, c) => acc + (c.sending_count || 0), 0),
    sentMessages: campaigns.reduce((acc, c) => acc + (c.sent_count || 0), 0),
    deliveredMessages: campaigns.reduce((acc, c) => acc + (c.delivered_count || 0), 0),
    readMessages: campaigns.reduce((acc, c) => acc + (c.read_count || 0), 0),
    failedMessages: campaigns.reduce((acc, c) => acc + (c.failed_count || 0), 0),
    skippedRecipients: campaigns.reduce((acc, c) => acc + (c.excluded_count || 0), 0),
    unknownStatusCount: campaigns.reduce((acc, c) => acc + (c.unknown_count || 0), 0),
  };

  return metrics;
}

// 2. Fetch Staging Campaigns List
export async function getStagingCampaigns(): Promise<StagingCampaignRecord[]> {
  const { data, error } = await crmSupabase
    .from("crm_campaigns")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[StagingCampaignService] Failed to load campaigns:", error);
    return [];
  }
  return (data as StagingCampaignRecord[]) || [];
}

// 3. Fetch Single Campaign with Details
export async function getStagingCampaignDetails(campaignId: string): Promise<StagingCampaignRecord | null> {
  const { data, error } = await crmSupabase
    .from("crm_campaigns")
    .select("*")
    .eq("id", campaignId)
    .maybeSingle();

  if (error || !data) {
    console.error("[StagingCampaignService] Failed to load campaign:", error);
    return null;
  }
  return data as StagingCampaignRecord;
}

// 4. Fetch Staging Campaign Recipients with Filtering
export async function getStagingCampaignRecipients(
  campaignId: string,
  statusFilter?: string
): Promise<StagingCampaignRecipient[]> {
  let query = crmSupabase
    .from("crm_campaign_recipients")
    .select("*")
    .eq("campaign_id", campaignId)
    .order("created_at", { ascending: true });

  if (statusFilter && statusFilter !== "ALL") {
    query = query.eq("status", statusFilter);
  }

  const { data, error } = await query;
  if (error) {
    console.error("[StagingCampaignService] Failed to load recipients:", error);
    return [];
  }
  return (data as StagingCampaignRecipient[]) || [];
}

// 5. Fetch Campaign Audit Events
export async function getStagingCampaignEvents(campaignId: string): Promise<StagingCampaignAuditEvent[]> {
  const { data, error } = await crmSupabase
    .from("crm_campaign_events")
    .select("*")
    .eq("campaign_id", campaignId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[StagingCampaignService] Failed to load events:", error);
    return [];
  }
  return (data as StagingCampaignAuditEvent[]) || [];
}

// 6. Fetch Suppressions
export async function getStagingSuppressions(): Promise<StagingSuppressionRecord[]> {
  const { data, error } = await crmSupabase
    .from("crm_whatsapp_suppressions")
    .select("*")
    .order("suppressed_at", { ascending: false });

  if (error) {
    console.error("[StagingCampaignService] Failed to load suppressions:", error);
    return [];
  }
  return (data as StagingSuppressionRecord[]) || [];
}

// 7. Add Manual Suppression
export async function addStagingSuppression(
  normalizedPhone: string,
  reason: string = "manual_admin_suppression",
  notes?: string
): Promise<{ success: boolean; error?: string }> {
  const cleanPhone = normalizedPhone.replace(/\D/g, "");
  const { error } = await crmSupabase.from("crm_whatsapp_suppressions").insert({
    normalized_phone: cleanPhone,
    reason,
    source: "admin_crm",
    notes: notes || "Manual suppression added via CRM interface",
  });

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

// 8. Fetch Import History
export async function getStagingImportHistory(): Promise<StagingImportHistoryRecord[]> {
  const { data, error } = await crmSupabase
    .from("crm_campaign_imports")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[StagingCampaignService] Failed to load imports:", error);
    return [];
  }
  return (data as StagingImportHistoryRecord[]) || [];
}

// 9. Save Staging Campaign Draft with Recipients
export async function createStagingCampaignDraft(params: {
  name: string;
  description?: string;
  campaignType: string;
  templateName: string;
  templateLanguage: string;
  templateSnapshot: any;
  variableMappings: any;
  audienceSource: string;
  recipients: Array<{
    phone: string;
    normalizedPhone: string;
    name?: string;
    variables: Record<string, string>;
    consentStatus: 'opted_in' | 'unverified' | 'opted_out' | 'suppressed';
    consentSource?: string;
  }>;
}): Promise<{ success: boolean; campaignId?: string; error?: string }> {
  try {
    // 1. Calculate recipient breakdown
    const total = params.recipients.length;
    const eligible = params.recipients.filter(
      (r) => r.consentStatus === "opted_in"
    ).length;
    const excluded = total - eligible;

    // 2. Insert Campaign Row (status: 'draft')
    const { data: campaign, error: campError } = await crmSupabase
      .from("crm_campaigns")
      .insert({
        name: params.name,
        description: params.description || null,
        campaign_type: params.campaignType,
        template_name: params.templateName,
        template_language: params.templateLanguage,
        template_snapshot: params.templateSnapshot,
        audience_source: params.audienceSource,
        status: "draft",
        total_recipients: total,
        eligible_recipients: eligible,
        queued_count: eligible,
        sending_count: 0,
        sent_count: 0,
        delivered_count: 0,
        read_count: 0,
        failed_count: 0,
        excluded_count: excluded,
        unknown_count: 0,
      })
      .select()
      .single();

    if (campError || !campaign) {
      return { success: false, error: campError?.message || "Failed to create campaign draft" };
    }

    // 3. Batch Insert Recipients
    if (params.recipients.length > 0) {
      const recipientRows = params.recipients.map((r) => ({
        campaign_id: campaign.id,
        normalized_phone: r.normalizedPhone,
        customer_name: r.name || "Customer",
        template_variables: r.variables || {},
        consent_status: r.consentStatus,
        consent_source: r.consentSource || "crm_import",
        status: r.consentStatus === "opted_in" ? "queued" : "skipped",
      }));

      // Insert in chunks of 200
      for (let i = 0; i < recipientRows.length; i += 200) {
        const chunk = recipientRows.slice(i, i + 200);
        const { error: recipError } = await crmSupabase
          .from("crm_campaign_recipients")
          .insert(chunk);

        if (recipError) {
          console.warn("[StagingCampaignService] Warning during recipient insert:", recipError);
        }
      }
    }

    // 4. Log Audit Event
    await crmSupabase.from("crm_campaign_events").insert({
      campaign_id: campaign.id,
      event_type: "created",
      event_data: {
        actor: "Staff Admin",
        name: params.name,
        totalRecipients: total,
        eligibleRecipients: eligible,
        templateName: params.templateName,
      },
    });

    return { success: true, campaignId: campaign.id };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// 10. Update Campaign Status
export async function updateStagingCampaignStatus(
  campaignId: string,
  newStatus: 'running' | 'paused' | 'cancelled' | 'completed'
): Promise<{ success: boolean; error?: string }> {
  const updateData: any = {
    status: newStatus,
    updated_at: new Date().toISOString(),
  };

  if (newStatus === "running") {
    updateData.started_at = new Date().toISOString();
  } else if (newStatus === "completed" || newStatus === "cancelled") {
    updateData.completed_at = new Date().toISOString();
  }

  const { error } = await crmSupabase
    .from("crm_campaigns")
    .update(updateData)
    .eq("id", campaignId);

  if (error) {
    return { success: false, error: error.message };
  }

  // Audit event
  const eventTypeMap: Record<string, string> = {
    running: "started",
    paused: "paused",
    cancelled: "cancelled",
    completed: "completed",
  };

  await crmSupabase.from("crm_campaign_events").insert({
    campaign_id: campaignId,
    event_type: eventTypeMap[newStatus] || "updated",
    event_data: {
      newStatus,
      timestamp: new Date().toISOString(),
      actor: "Staff Admin",
    },
  });

  return { success: true };
}

// 11. Edge Function Worker Dispatch (Default dryRun: true for safety)
export async function invokeStagingWorkerDispatch(params: {
  campaignId: string;
  batchSize?: number;
  leaseSeconds?: number;
  dryRun?: boolean;
  liveDispatchConfirmed?: boolean;
}): Promise<{
  success: boolean;
  claimedCount?: number;
  results?: Array<{ phone: string; status: string; mockWamid?: string; reason?: string }>;
  error?: string;
}> {
  try {
    const { data: sessionData } = await crmSupabase.auth.getSession();
    const token = sessionData?.session?.access_token || "";

    const edgeFunctionUrl =
      import.meta.env.VITE_CAMPAIGN_WORKER_URL ||
      import.meta.env.VITE_STAGING_EDGE_FUNCTION_URL ||
      "https://lpbdwmpglwdedqdiovqu.supabase.co/functions/v1/dispatch-campaign-worker";

    // Strictly enforce dryRun: true unless explicitly requested
    const response = await fetch(edgeFunctionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        action: "claim_and_dispatch",
        campaignId: params.campaignId,
        batchSize: params.batchSize || 10,
        leaseSeconds: params.leaseSeconds || 60,
        dryRun: params.dryRun ?? true,
        liveDispatchConfirmed: params.liveDispatchConfirmed ?? false,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return { success: false, error: data.error || `HTTP ${response.status}` };
    }

    return {
      success: true,
      claimedCount: data.claimedCount || 0,
      results: data.results || [],
    };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// 12. Edge Function Worker: Recover Stale Leases
export async function invokeStagingRecoverStaleLeases(
  campaignId: string
): Promise<{ success: boolean; recoveredCount?: number; error?: string }> {
  try {
    const { data: sessionData } = await crmSupabase.auth.getSession();
    const token = sessionData?.session?.access_token || "";

    const edgeFunctionUrl =
      import.meta.env.VITE_CAMPAIGN_WORKER_URL ||
      import.meta.env.VITE_STAGING_EDGE_FUNCTION_URL ||
      "https://lpbdwmpglwdedqdiovqu.supabase.co/functions/v1/dispatch-campaign-worker";

    const response = await fetch(edgeFunctionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        action: "recover_stale_leases",
        campaignId,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return { success: false, error: data.error || `HTTP ${response.status}` };
    }

    return {
      success: true,
      recoveredCount: data.recoveredCount || 0,
    };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// 13. Reconcile Campaign Counters via RPC
export async function reconcileStagingCampaignCounters(campaignId: string): Promise<boolean> {
  const { error } = await crmSupabase.rpc("sync_campaign_counters", {
    p_campaign_id: campaignId,
  });
  if (error) {
    console.error("[CampaignService] Error syncing counters:", error);
    return false;
  }
  return true;
}

// 14. Billing & Delivery Observability Summary
export interface CampaignBillingSummary {
  apiAcceptedCount: number;
  sentCount: number;
  deliveredCount: number;
  readCount: number;
  failedCount: number;
  unknownCount: number;
  totalOutbound: number;
  inboundReceivedCount: number;
  recentFailures: Array<{
    id: string;
    waMessageId?: string | null;
    phone?: string | null;
    status: string;
    errorCode?: string | number | null;
    errorTitle?: string | null;
    errorMessage?: string | null;
    createdAt: string;
  }>;
}

export async function getCampaignBillingSummary(): Promise<CampaignBillingSummary> {
  try {
    const { data: msgs } = await crmSupabase
      .from("crm_messages")
      .select("id, wa_message_id, direction, message_type, status, error_message, created_at, conversation_id")
      .order("created_at", { ascending: false });

    let apiAcceptedCount = 0;
    let sentCount = 0;
    let deliveredCount = 0;
    let readCount = 0;
    let failedCount = 0;
    let unknownCount = 0;
    let inboundReceivedCount = 0;
    const recentFailures: Array<{
      id: string;
      waMessageId?: string | null;
      phone?: string | null;
      status: string;
      errorCode?: string | number | null;
      errorTitle?: string | null;
      errorMessage?: string | null;
      createdAt: string;
    }> = [];

    if (msgs) {
      for (const m of msgs) {
        if (m.direction === "inbound") {
          inboundReceivedCount++;
          continue;
        }
        if (m.wa_message_id && m.wa_message_id.startsWith("wamid.")) {
          apiAcceptedCount++;
        }
        if (m.status === "sent") sentCount++;
        else if (m.status === "delivered") deliveredCount++;
        else if (m.status === "read") readCount++;
        else if (m.status === "failed") {
          failedCount++;
          let errorCode: any = null;
          let errorTitle: any = null;
          let errorMessage: any = null;
          try {
            const parsed = JSON.parse(m.error_message);
            if (Array.isArray(parsed) && parsed[0]) {
              errorCode = parsed[0].code;
              errorTitle = parsed[0].title;
              errorMessage = parsed[0].error_data?.details || parsed[0].message;
            } else if (typeof parsed === "object" && parsed !== null) {
              errorCode = parsed.code;
              errorTitle = parsed.title;
              errorMessage = parsed.message;
            }
          } catch {
            errorMessage = m.error_message;
          }
          recentFailures.push({
            id: m.id,
            waMessageId: m.wa_message_id,
            phone: null,
            status: m.status,
            errorCode,
            errorTitle,
            errorMessage,
            createdAt: m.created_at,
          });
        } else if (m.status === "sending_unknown") {
          unknownCount++;
        }
      }
    }

    const { data: recips } = await crmSupabase
      .from("crm_campaign_recipients")
      .select("id, meta_message_id, status, last_error_code, last_error_message, created_at, normalized_phone")
      .order("created_at", { ascending: false });

    if (recips) {
      for (const r of recips) {
        if (r.meta_message_id && r.meta_message_id.startsWith("wamid.")) {
          apiAcceptedCount++;
        }
        if (r.status === "sent") sentCount++;
        else if (r.status === "delivered") deliveredCount++;
        else if (r.status === "read") readCount++;
        else if (r.status === "failed") {
          failedCount++;
          recentFailures.push({
            id: r.id,
            waMessageId: r.meta_message_id,
            phone: r.normalized_phone,
            status: r.status,
            errorCode: r.last_error_code,
            errorTitle: "Campaign Delivery Failed",
            errorMessage: r.last_error_message,
            createdAt: r.created_at,
          });
        } else if (r.status === "sending_unknown") {
          unknownCount++;
        }
      }
    }

    const totalOutbound = sentCount + deliveredCount + readCount + failedCount + unknownCount;

    return {
      apiAcceptedCount,
      sentCount,
      deliveredCount,
      readCount,
      failedCount,
      unknownCount,
      totalOutbound: totalOutbound || apiAcceptedCount,
      inboundReceivedCount,
      recentFailures,
    };
  } catch (err) {
    console.error("[CampaignService] Error loading billing summary:", err);
    return {
      apiAcceptedCount: 0,
      sentCount: 0,
      deliveredCount: 0,
      readCount: 0,
      failedCount: 0,
      unknownCount: 0,
      totalOutbound: 0,
      inboundReceivedCount: 0,
      recentFailures: [],
    };
  }
}

// Production Aliases
export const getCampaignDashboardMetrics = getStagingDashboardMetrics;
export const getCampaigns = getStagingCampaigns;
export const getCampaignDetails = getStagingCampaignDetails;
export const getCampaignRecipients = getStagingCampaignRecipients;
export const getCampaignEvents = getStagingCampaignEvents;
export const getSuppressions = getStagingSuppressions;
export const addSuppression = addStagingSuppression;
export const getImportHistory = getStagingImportHistory;
export const createCampaignDraft = createStagingCampaignDraft;
export const updateCampaignStatus = updateStagingCampaignStatus;
export const invokeWorkerDispatch = invokeStagingWorkerDispatch;
export const invokeRecoverStaleLeases = invokeStagingRecoverStaleLeases;
export const reconcileCampaignCounters = reconcileStagingCampaignCounters;
export type CampaignRecord = StagingCampaignRecord;
export type CampaignRecipient = StagingCampaignRecipient;
export type CampaignAuditEvent = StagingCampaignAuditEvent;
export type SuppressionRecord = StagingSuppressionRecord;
export type ImportHistoryRecord = StagingImportHistoryRecord;
export type DashboardMetrics = StagingDashboardMetrics;
