// src/components/crm/campaigns/CampaignDashboardView.tsx
// ==============================================================================
// Operational Campaign Dashboard (Stage 5D)
// Displays real-time metrics, statuses, and telemetry from Staging DB
// ==============================================================================

import React, { useState, useEffect } from 'react';
import {
  Activity,
  Send,
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  ShieldAlert,
  ShieldCheck,
  Plus,
  RotateCw,
  Eye,
  CheckCheck,
  FileSpreadsheet,
  BookOpen,
  ArrowRight,
  Server
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  getStagingDashboardMetrics,
  getStagingCampaigns,
  StagingDashboardMetrics,
  StagingCampaignRecord
} from '@/lib/campaignStagingService';

interface CampaignDashboardViewProps {
  onNavigateToTab: (tab: string) => void;
  onMonitorCampaign: (campaign: StagingCampaignRecord) => void;
}

export const CampaignDashboardView: React.FC<CampaignDashboardViewProps> = ({
  onNavigateToTab,
  onMonitorCampaign,
}) => {
  const [metrics, setMetrics] = useState<StagingDashboardMetrics | null>(null);
  const [recentCampaigns, setRecentCampaigns] = useState<StagingCampaignRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [m, c] = await Promise.all([
        getStagingDashboardMetrics(),
        getStagingCampaigns(),
      ]);
      setMetrics(m);
      setRecentCampaigns(c.slice(0, 5));
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
            <Clock className="w-3 h-3 text-slate-400" /> Draft
          </span>
        );
      case 'running':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-blue-500/20 text-blue-400 border border-blue-500/30 animate-pulse font-bold">
            <Activity className="w-3 h-3" /> Running
          </span>
        );
      case 'paused':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <Clock className="w-3 h-3 text-amber-400" /> Paused
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-400 border border-slate-700">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Production CRM Safe Dispatch Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/40 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/40">
                PRODUCTION CRM — SAFE DISPATCH MODE
              </span>
              <span className="text-xs font-mono text-slate-400">
                Target: <code className="text-emerald-400 font-bold">lpbdwmpglwdedqdiovqu</code>
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Production WhatsApp campaign manager with server-enforced dry-run safety lock. Dispatches simulate or execute with atomic queue leasing, consent quarantine, and 60s recipient pacing.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <Button
            size="sm"
            variant="outline"
            onClick={loadData}
            disabled={loading}
            className="border-slate-700 bg-slate-800/80 text-slate-200 hover:bg-slate-700 text-xs h-8"
          >
            <RotateCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            size="sm"
            onClick={() => onNavigateToTab('create')}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs h-8 px-3 rounded-lg flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Row 1: Campaign Lifecycle Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
          <span className="text-[11px] text-slate-400 block font-medium">Total Campaigns</span>
          <div className="text-2xl font-black text-slate-100 font-mono mt-1">
            {metrics?.totalCampaigns ?? 0}
          </div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">Configured in production</span>
        </div>

        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 shadow-lg">
          <span className="text-[11px] text-slate-400 block font-medium">Draft Campaigns</span>
          <div className="text-2xl font-black text-slate-300 font-mono mt-1">
            {metrics?.draftCampaigns ?? 0}
          </div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">Pending dispatch</span>
        </div>

        <div className="bg-slate-900 border border-blue-500/30 rounded-2xl p-4 shadow-lg">
          <span className="text-[11px] text-blue-400 block font-medium">Running Campaigns</span>
          <div className="text-2xl font-black text-blue-400 font-mono mt-1 flex items-center gap-2">
            {metrics?.runningCampaigns ?? 0}
            {(metrics?.runningCampaigns ?? 0) > 0 && (
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping inline-block" />
            )}
          </div>
          <span className="text-[10px] text-blue-400/70 mt-0.5 block">Active worker queue</span>
        </div>

        <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-4 shadow-lg">
          <span className="text-[11px] text-amber-400 block font-medium">Paused Campaigns</span>
          <div className="text-2xl font-black text-amber-300 font-mono mt-1">
            {metrics?.pausedCampaigns ?? 0}
          </div>
          <span className="text-[10px] text-amber-400/70 mt-0.5 block">Temporarily halted</span>
        </div>

        <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-4 shadow-lg">
          <span className="text-[11px] text-emerald-400 block font-medium">Completed Campaigns</span>
          <div className="text-2xl font-black text-emerald-300 font-mono mt-1">
            {metrics?.completedCampaigns ?? 0}
          </div>
          <span className="text-[10px] text-emerald-400/70 mt-0.5 block">Queue fully processed</span>
        </div>
      </div>

      {/* Row 2: Recipient Telemetry & Delivery Breakdown (Section 4 Requirements) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              Recipient Dispatch Telemetry & Funnel
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Aggregated recipient lifecycle counters directly from PostgreSQL table <code className="text-slate-300">crm_campaigns</code>.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-400 flex items-center gap-3">
            <span>Total Recipient Pool: <strong className="text-slate-100">{metrics?.totalRecipients ?? 0}</strong></span>
            <span>•</span>
            <span>Eligible Consent: <strong className="text-emerald-400">{metrics?.eligibleRecipients ?? 0}</strong></span>
          </div>
        </div>

        {/* 8 Status Telemetry Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {/* 1. Queued */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
            <span className="text-[10px] uppercase font-mono text-slate-400 block">Queued</span>
            <div className="text-lg font-bold text-slate-200 font-mono mt-1">
              {metrics?.queuedRecipients ?? 0}
            </div>
            <span className="text-[9px] text-slate-500 block">Waiting worker</span>
          </div>

          {/* 2. Sending */}
          <div className="bg-slate-950 border border-blue-500/20 rounded-xl p-3">
            <span className="text-[10px] uppercase font-mono text-blue-400 block">Sending</span>
            <div className="text-lg font-bold text-blue-400 font-mono mt-1">
              {metrics?.sendingRecipients ?? 0}
            </div>
            <span className="text-[9px] text-blue-400/70 block">Leased active</span>
          </div>

          {/* 3. Sent */}
          <div className="bg-slate-950 border border-sky-500/20 rounded-xl p-3">
            <span className="text-[10px] uppercase font-mono text-sky-400 block">Sent</span>
            <div className="text-lg font-bold text-sky-400 font-mono mt-1">
              {metrics?.sentMessages ?? 0}
            </div>
            <span className="text-[9px] text-sky-400/70 block">Simulated WAMID</span>
          </div>

          {/* 4. Delivered */}
          <div className="bg-slate-950 border border-emerald-500/20 rounded-xl p-3">
            <span className="text-[10px] uppercase font-mono text-emerald-400 block">Delivered</span>
            <div className="text-lg font-bold text-emerald-400 font-mono mt-1">
              {metrics?.deliveredMessages ?? 0}
            </div>
            <span className="text-[9px] text-emerald-400/70 block">Handset ACK</span>
          </div>

          {/* 5. Read */}
          <div className="bg-slate-950 border border-emerald-500/30 rounded-xl p-3">
            <span className="text-[10px] uppercase font-mono text-emerald-300 block font-semibold">Read</span>
            <div className="text-lg font-bold text-emerald-300 font-mono mt-1">
              {metrics?.readMessages ?? 0}
            </div>
            <span className="text-[9px] text-emerald-400/70 block">Read receipt</span>
          </div>

          {/* 6. Failed */}
          <div className="bg-slate-950 border border-red-500/20 rounded-xl p-3">
            <span className="text-[10px] uppercase font-mono text-red-400 block">Failed</span>
            <div className="text-lg font-bold text-red-400 font-mono mt-1">
              {metrics?.failedMessages ?? 0}
            </div>
            <span className="text-[9px] text-red-400/70 block">Terminal error</span>
          </div>

          {/* 7. Skipped */}
          <div className="bg-slate-950 border border-purple-500/20 rounded-xl p-3">
            <span className="text-[10px] uppercase font-mono text-purple-300 block">Skipped</span>
            <div className="text-lg font-bold text-purple-300 font-mono mt-1">
              {metrics?.skippedRecipients ?? 0}
            </div>
            <span className="text-[9px] text-purple-300/70 block">No opt-in / DND</span>
          </div>

          {/* 8. Sending Unknown */}
          <div className="bg-slate-950 border border-amber-500/30 rounded-xl p-3">
            <span className="text-[10px] uppercase font-mono text-amber-400 block font-bold flex items-center gap-1">
              <AlertTriangle className="w-2.5 h-2.5" />
              Unknown
            </span>
            <div className="text-lg font-bold text-amber-300 font-mono mt-1">
              {metrics?.unknownStatusCount ?? 0}
            </div>
            <span className="text-[9px] text-amber-400/70 block">Timeout isolated</span>
          </div>
        </div>
      </div>

      {/* Row 3: Active & Recent Campaigns Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Send className="w-4 h-4 text-amber-400" />
              Recent Production Campaigns
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live campaigns persisted in PostgreSQL on project <code className="text-slate-300">lpbdwmpglwdedqdiovqu</code>.
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigateToTab('history')}
            className="text-xs text-amber-400 hover:text-amber-300 h-8 flex items-center gap-1"
          >
            View Full History
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>

        {recentCampaigns.length === 0 ? (
          <div className="p-8 text-center bg-slate-950 border border-slate-800/80 rounded-xl space-y-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
              <Send className="w-5 h-5" />
            </div>
            <div className="text-sm font-semibold text-slate-300">No campaigns created yet</div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Get started by creating your first WhatsApp campaign draft using the guided 7-step composer.
            </p>
            <Button
              size="sm"
              onClick={() => onNavigateToTab('create')}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs"
            >
              Launch Campaign Wizard
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-mono border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Campaign Name</th>
                  <th className="py-2.5 px-3">Template</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Recipients</th>
                  <th className="py-2.5 px-3 text-right">Eligible</th>
                  <th className="py-2.5 px-3 text-right">Sent (Mock)</th>
                  <th className="py-2.5 px-3 text-right">Delivered</th>
                  <th className="py-2.5 px-3 text-right">Unknown</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {recentCampaigns.map((camp) => (
                  <tr key={camp.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-100">{camp.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        {new Date(camp.created_at).toLocaleString()}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-mono text-slate-300 text-[11px]">{camp.template_name}</div>
                      <div className="text-[10px] text-slate-500 uppercase">{camp.template_language}</div>
                    </td>
                    <td className="py-3 px-3">{getStatusBadge(camp.status)}</td>
                    <td className="py-3 px-3 text-right font-mono font-medium">{camp.total_recipients}</td>
                    <td className="py-3 px-3 text-right font-mono text-emerald-400 font-semibold">{camp.eligible_recipients}</td>
                    <td className="py-3 px-3 text-right font-mono text-sky-400">{camp.sent_count}</td>
                    <td className="py-3 px-3 text-right font-mono text-emerald-400">{camp.delivered_count}</td>
                    <td className="py-3 px-3 text-right font-mono text-amber-400">{camp.unknown_count}</td>
                    <td className="py-3 px-3 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onMonitorCampaign(camp)}
                        className="h-7 text-xs border-amber-500/40 text-amber-300 hover:bg-amber-500/10 font-semibold"
                      >
                        Inspect / Dispatch
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Row 4: Quick Workflow Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => onNavigateToTab('create')}
          className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 cursor-pointer transition-all hover:shadow-xl group"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Plus className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
            7-Step Campaign Composer
          </h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Create high-converting WhatsApp campaigns with approved templates, variable mapping, and live preview.
          </p>
        </div>

        <div
          onClick={() => onNavigateToTab('imports')}
          className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 cursor-pointer transition-all hover:shadow-xl group"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
            CSV & Excel Ingestion
          </h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Upload contact lists with automatic column detection, E.164 normalization, and strict opt-in consent gating.
          </p>
        </div>

        <div
          onClick={() => onNavigateToTab('templates')}
          className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 cursor-pointer transition-all hover:shadow-xl group"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
            Meta Approved Templates
          </h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Browse Meta-approved templates across English, Telugu, and Hindi with interactive phone preview.
          </p>
        </div>
      </div>
    </div>
  );
};
