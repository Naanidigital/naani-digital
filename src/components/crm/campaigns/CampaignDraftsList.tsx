// ==============================================================================
// Campaign Drafts List & Management Dashboard (Stage 3)
// Lists saved drafts with audit trail, eligible audience counts, and edit triggers
// ==============================================================================

import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Search,
  Calendar,
  Users,
  Layers,
  Sparkles,
  Trash2,
  Edit,
  History,
  ShieldCheck,
  AlertTriangle,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CampaignDraft } from '@/lib/campaignComposer/types';

interface CampaignDraftsListProps {
  drafts: CampaignDraft[];
  onNewCampaign: () => void;
  onEditDraft: (draft: CampaignDraft) => void;
  onDeleteDraft: (id: string) => void;
  onMonitorDraft?: (draft: CampaignDraft) => void;
}

export const CampaignDraftsList: React.FC<CampaignDraftsListProps> = ({
  drafts,
  onNewCampaign,
  onEditDraft,
  onDeleteDraft,
  onMonitorDraft,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAuditDraft, setSelectedAuditDraft] = useState<CampaignDraft | null>(null);

  const filteredDrafts = drafts.filter((d) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      d.name.toLowerCase().includes(q) ||
      d.templateName.toLowerCase().includes(q) ||
      d.objective.toLowerCase().includes(q)
    );
  });

  const getObjectiveLabel = (obj: string) => {
    switch (obj) {
      case 'project_launch':
        return '🚀 Project Launch';
      case 'lead_reengagement':
        return '🔄 Lead Re-engagement';
      case 'open_house':
        return '🏡 Open House / Site Visit';
      case 'price_alert':
        return '💰 Price Advantage Alert';
      case 'event_invitation':
        return '🎟️ Event Invitation';
      default:
        return '📢 General Promotion';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            Saved Campaign Drafts
          </h3>
          <p className="text-xs text-slate-400">
            Campaign configurations saved in draft state. Sending and scheduling will be enabled in Stage 4.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={onNewCampaign}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl shadow-lg shadow-amber-950/30 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create New Campaign
          </Button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
        <input
          type="text"
          placeholder="Filter drafts by campaign name, template, or objective..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
        />
      </div>

      {/* Drafts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDrafts.map((draft) => (
          <div
            key={draft.id}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-4 transition-all shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {getObjectiveLabel(draft.objective)}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    Draft
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-100">{draft.name}</h4>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedAuditDraft(draft)}
                  title="View Audit Trail"
                  className="h-8 w-8 p-0 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                >
                  <History className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onEditDraft(draft)}
                  title="Edit Draft"
                  className="h-8 w-8 p-0 text-slate-400 hover:text-amber-400 hover:bg-slate-800"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    if (confirm(`Delete draft "${draft.name}"?`)) {
                      onDeleteDraft(draft.id);
                    }
                  }}
                  title="Delete Draft"
                  className="h-8 w-8 p-0 text-slate-400 hover:text-red-400 hover:bg-slate-800"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Template & Language Tag */}
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 space-y-1 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Template:</span>
                <span className="font-mono text-slate-200">{draft.templateName}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Language:</span>
                <span className="font-mono text-slate-200">{draft.languageCode}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Variables Mapped:</span>
                <span className="text-slate-200">{draft.variableMappings.length}</span>
              </div>
            </div>

            {/* Audience KPI Pill & Dispatch Trigger */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span>Eligible Audience:</span>
                <span className="font-bold text-emerald-400">
                  {draft.audienceStats.eligibleAudience.toLocaleString()}
                </span>
              </div>

              {onMonitorDraft && (
                <Button
                  size="sm"
                  onClick={() => onMonitorDraft(draft)}
                  className="bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-xs px-2.5 py-1 h-7 rounded-lg font-semibold flex items-center gap-1"
                >
                  <Activity className="w-3.5 h-3.5" />
                  Dry-Run Pipeline
                </Button>
              )}
            </div>
          </div>
        ))}

        {filteredDrafts.length === 0 && (
          <div className="col-span-full py-16 text-center bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl p-6">
            <FileText className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <h4 className="text-sm font-semibold text-slate-300">No Campaign Drafts Found</h4>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Create your first promotional campaign using approved Meta templates and verified audiences.
            </p>
            <Button
              onClick={onNewCampaign}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Create Campaign
            </Button>
          </div>
        )}
      </div>

      {/* Audit Trail Modal */}
      {selectedAuditDraft && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <History className="w-4 h-4 text-amber-400" />
                  Audit Trail
                </h4>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{selectedAuditDraft.name}</p>
              </div>
              <button
                onClick={() => setSelectedAuditDraft(null)}
                className="text-slate-400 hover:text-slate-200 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {selectedAuditDraft.auditTrail.map((entry, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">{entry.action}</span>
                    <span className="text-[10px] text-slate-500">
                      {new Date(entry.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-slate-400 text-[11px]">{entry.details}</div>
                  <div className="text-[10px] text-slate-500">Actor: {entry.actor}</div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-800">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedAuditDraft(null)}
                className="border-slate-700 text-slate-300"
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
