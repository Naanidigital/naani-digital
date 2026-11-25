// src/components/crm/campaigns/CampaignHistoryView.tsx
// ==============================================================================
// Campaign History & Audit Inspector (Stage 5D)
// Persisted Staging campaigns table with drill-downs and audit log timeline
// ==============================================================================

import React, { useState, useEffect } from 'react';
import {
  Send,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Activity,
  AlertTriangle,
  History,
  RotateCw,
  Eye,
  Trash2,
  Plus,
  Layers,
  StopCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  getStagingCampaigns,
  getStagingCampaignEvents,
  StagingCampaignRecord,
  StagingCampaignAuditEvent
} from '@/lib/campaignStagingService';

interface CampaignHistoryViewProps {
  onNewCampaign: () => void;
  onMonitorCampaign: (campaign: StagingCampaignRecord) => void;
}

export const CampaignHistoryView: React.FC<CampaignHistoryViewProps> = ({
  onNewCampaign,
  onMonitorCampaign,
}) => {
  const [campaigns, setCampaigns] = useState<StagingCampaignRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAuditCampaign, setSelectedAuditCampaign] = useState<StagingCampaignRecord | null>(null);
  const [auditEvents, setAuditEvents] = useState<StagingCampaignAuditEvent[]>([]);
  const [auditLoading, setAuditLoading] = useState<boolean>(false);

  const loadCampaigns = async () => {
    setLoading(true);
    try {
      const data = await getStagingCampaigns();
      setCampaigns(data);
    } catch (err) {
      console.error('Failed to load campaigns:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  const handleOpenAuditModal = async (camp: StagingCampaignRecord) => {
    setSelectedAuditCampaign(camp);
    setAuditLoading(true);
    try {
      const events = await getStagingCampaignEvents(camp.id);
      setAuditEvents(events);
    } catch (err) {
      console.error('Failed to load audit events:', err);
    } finally {
      setAuditLoading(false);
    }
  };

  const filteredCampaigns = campaigns.filter((c) => {
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.template_name.toLowerCase().includes(q) ||
        c.campaign_type.toLowerCase().includes(q)
      );
    }
    return true;
  });

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
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-400 border border-slate-700">
            <StopCircle className="w-3 h-3" /> Cancelled
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
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <History className="w-5 h-5 text-amber-400" />
            Campaign History & Lifecycle Records
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Full audit log of created, running, paused, and completed campaigns in production project <code className="text-slate-300">lpbdwmpglwdedqdiovqu</code>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={loadCampaigns}
            disabled={loading}
            className="border-slate-700 text-slate-300 hover:bg-slate-800 text-xs h-9"
          >
            <RotateCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>

          <Button
            size="sm"
            onClick={onNewCampaign}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs h-9 px-4 rounded-xl flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" />
            Create Campaign
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search campaigns by name, template, or type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="running">Running</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {filteredCampaigns.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-2">
            <Layers className="w-8 h-8 mx-auto text-slate-600" />
            <div className="text-sm font-medium text-slate-400">No campaigns found</div>
            <p className="text-xs">Adjust your search filter or create a new campaign.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-mono border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Campaign Name</th>
                  <th className="py-3 px-4">Template</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Recipients</th>
                  <th className="py-3 px-4 text-right">Eligible</th>
                  <th className="py-3 px-4 text-right">Sent (Mock)</th>
                  <th className="py-3 px-4 text-right">Delivered</th>
                  <th className="py-3 px-4 text-right">Unknown</th>
                  <th className="py-3 px-4 text-right">Created At</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredCampaigns.map((camp) => (
                  <tr key={camp.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-100">{camp.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        Type: {camp.campaign_type}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-mono text-slate-300 text-[11px]">{camp.template_name}</div>
                      <div className="text-[10px] text-slate-500 uppercase">{camp.template_language}</div>
                    </td>
                    <td className="py-3.5 px-4">{getStatusBadge(camp.status)}</td>
                    <td className="py-3.5 px-4 text-right font-mono font-medium">{camp.total_recipients}</td>
                    <td className="py-3.5 px-4 text-right font-mono text-emerald-400 font-semibold">{camp.eligible_recipients}</td>
                    <td className="py-3.5 px-4 text-right font-mono text-sky-400">{camp.sent_count}</td>
                    <td className="py-3.5 px-4 text-right font-mono text-emerald-400">{camp.delivered_count}</td>
                    <td className="py-3.5 px-4 text-right font-mono text-amber-400">{camp.unknown_count}</td>
                    <td className="py-3.5 px-4 text-right font-mono text-slate-400 text-[11px]">
                      {new Date(camp.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1 whitespace-nowrap">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleOpenAuditModal(camp)}
                        className="h-7 px-2 text-[11px] text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                      >
                        Audit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onMonitorCampaign(camp)}
                        className="h-7 px-2.5 text-[11px] border-amber-500/40 text-amber-300 hover:bg-amber-500/10 font-bold"
                      >
                        Inspect
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Audit Modal */}
      {selectedAuditCampaign && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <History className="w-4 h-4 text-amber-400" />
                  Campaign Audit Log Timeline
                </h4>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {selectedAuditCampaign.name} ({selectedAuditCampaign.id.slice(0, 8)}...)
                </p>
              </div>
              <button
                onClick={() => setSelectedAuditCampaign(null)}
                className="text-slate-400 hover:text-slate-200 text-sm"
              >
                ✕
              </button>
            </div>

            {auditLoading ? (
              <div className="p-8 text-center text-slate-400">Loading audit records...</div>
            ) : auditEvents.length === 0 ? (
              <div className="p-8 text-center text-slate-500">No audit events recorded yet.</div>
            ) : (
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {auditEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-amber-400 uppercase font-mono text-[11px]">
                        {evt.event_type}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(evt.created_at).toLocaleString()}
                      </span>
                    </div>
                    {evt.event_data && (
                      <pre className="text-[10px] text-slate-400 bg-slate-900/60 p-2 rounded overflow-x-auto font-mono">
                        {JSON.stringify(evt.event_data, null, 2)}
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end pt-2 border-t border-slate-800">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedAuditCampaign(null)}
                className="border-slate-700 text-slate-300 text-xs"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
