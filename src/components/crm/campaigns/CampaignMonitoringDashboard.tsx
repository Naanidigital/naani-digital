// ==============================================================================
// Campaign Monitoring & Live Dry-Run Dashboard (Stage 4)
// Real-time dispatch telemetry, rate gauge, lease tracker, and audit drawer
// ==============================================================================

import React, { useState, useEffect, useRef } from 'react';
import {
  Activity,
  Play,
  Pause,
  StopCircle,
  RotateCw,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Send,
  Eye,
  CheckCheck,
  ShieldAlert,
  ShieldCheck,
  Zap,
  Server,
  Layers,
  HelpCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  History,
  XCircle,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CampaignDraft } from '@/lib/campaignComposer/types';
import { NormalizedContact } from '@/lib/campaignImport/types';
import {
  CampaignRunSummary,
  QueueRecipientItem,
  RecipientDispatchStatus,
} from '@/lib/campaignDispatch/types';
import { CampaignQueueManager } from '@/lib/campaignDispatch/queueManager';
import { AdaptiveRateLimiter } from '@/lib/campaignDispatch/rateLimiter';
import { CampaignDispatchPipeline } from '@/lib/campaignDispatch/dispatchWorker';
import {
  invokeStagingWorkerDispatch,
  invokeStagingRecoverStaleLeases,
  updateStagingCampaignStatus,
} from '@/lib/campaignStagingService';

interface CampaignMonitoringDashboardProps {
  draft: CampaignDraft;
  allContacts: NormalizedContact[];
  onBack: () => void;
}

export const CampaignMonitoringDashboard: React.FC<CampaignMonitoringDashboardProps> = ({
  draft,
  allContacts,
  onBack,
}) => {
  const [pipeline, setPipeline] = useState<CampaignDispatchPipeline | null>(null);
  const [queueManager, setQueueManager] = useState<CampaignQueueManager | null>(null);
  const [summary, setSummary] = useState<CampaignRunSummary | null>(null);
  const [recipients, setRecipients] = useState<QueueRecipientItem[]>([]);
  const [selectedRecipient, setSelectedRecipient] = useState<QueueRecipientItem | null>(null);

  // Filter & Pagination State
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Initialize Queue Manager and Pipeline
  useEffect(() => {
    const qm = new CampaignQueueManager(draft.id);

    // If queue is empty, initialize from eligible contacts
    if (qm.getRecipients().length === 0) {
      // Find eligible contacts matching draft's location/bhk
      const eligible = allContacts.filter((c) => {
        if (!c.isValid) return false;
        if (c.consent.status !== 'opted_in') return false;
        if (c.isSuppressed) return false;
        return true;
      });

      // If no staged contacts, generate a sample audience of 50 recipients for testing
      const targetAudience: NormalizedContact[] =
        eligible.length >= 10
          ? eligible
          : Array.from({ length: 50 }, (_, i) => ({
              rowIndex: i + 1,
              rawPhone: `9198${String(i + 1).padStart(8, '0')}`,
              normalizedPhone: `9198${String(i + 1).padStart(8, '0')}`,
              formattedPhone: `+91 98${String(i + 1).padStart(8, '0')}`,
              name: `Buyer ${i + 1} Reddy`,
              location: 'Neopolis, Kokapet',
              propertyInterest: 'The Cascades',
              consent: { status: 'opted_in', source: 'web_form' },
              isValid: true,
              isDuplicateInFile: false,
              isDuplicateInCrm: false,
              isSuppressed: false,
            }));

      qm.initializeQueue(draft, targetAudience, true);
    }

    const rateLimiter = new AdaptiveRateLimiter({
      maxMessagesPerSecond: 25,
      currentTier: 'TIER_2',
      qualityScore: 'GREEN',
    });

    const pipe = new CampaignDispatchPipeline(qm, rateLimiter, {
      workerCount: 2,
      batchSize: 20,
      leaseSeconds: 60,
      isDryRun: true,
      onProgress: (newSummary, newItems) => {
        setSummary(newSummary);
        setRecipients([...newItems]);
      },
    });

    setQueueManager(qm);
    setPipeline(pipe);
    setSummary(qm.getSummary(0));
    setRecipients(qm.getRecipients());
  }, [draft.id]);

  // Handle Controls
  const handleStartDryRun = async () => {
    if (!pipeline) return;
    setIsRunning(true);
    setIsPaused(false);
    try {
      // If campaign has a UUID in PostgreSQL, update status & ping staging worker
      if (draft.id && draft.id.includes('-')) {
        await updateStagingCampaignStatus(draft.id, 'running');
        await invokeStagingWorkerDispatch({ campaignId: draft.id, batchSize: 20, leaseSeconds: 60 });
      }
      await pipeline.start();
    } finally {
      setIsRunning(false);
      setIsPaused(false);
      if (draft.id && draft.id.includes('-')) {
        await updateStagingCampaignStatus(draft.id, 'completed');
      }
    }
  };

  const handlePause = async () => {
    if (!pipeline) return;
    pipeline.pause();
    setIsPaused(true);
    setSummary(pipeline.getSummary());
    if (draft.id && draft.id.includes('-')) {
      await updateStagingCampaignStatus(draft.id, 'paused');
    }
  };

  const handleResume = async () => {
    if (!pipeline) return;
    pipeline.resume();
    setIsPaused(false);
    setSummary(pipeline.getSummary());
    if (draft.id && draft.id.includes('-')) {
      await updateStagingCampaignStatus(draft.id, 'running');
    }
  };

  const handleCancel = async () => {
    if (!pipeline) return;
    if (confirm('Cancel this campaign run? Unprocessed items will be marked cancelled.')) {
      pipeline.cancel();
      setIsRunning(false);
      setIsPaused(false);
      setSummary(pipeline.getSummary());
      setRecipients([...queueManager!.getRecipients()]);
      if (draft.id && draft.id.includes('-')) {
        await updateStagingCampaignStatus(draft.id, 'cancelled');
      }
    }
  };

  // Stale Lease Recovery via Edge Function / Queue
  const handleSimulateStaleRecovery = async () => {
    if (draft.id && draft.id.includes('-')) {
      const res = await invokeStagingRecoverStaleLeases(draft.id);
      if (res.success) {
        alert(`Staging Edge Function recovered ${res.recoveredCount ?? 0} stale leases into sending_unknown.`);
      }
    }
    if (!queueManager) return;
    const recovered = queueManager.recoverStaleLeases();
    if (!draft.id || !draft.id.includes('-')) {
      alert(`Recovered ${recovered} stale worker leases back to pending queue.`);
    }
    setSummary(queueManager.getSummary(0));
    setRecipients([...queueManager.getRecipients()]);
  };

  // Status Badge Helper
  const getStatusBadge = (status: RecipientDispatchStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
            <Clock className="w-3 h-3 text-slate-400" /> Pending
          </span>
        );
      case 'claimed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-blue-500/15 text-blue-400 border border-blue-500/30 animate-pulse">
            <Zap className="w-3 h-3" /> Processing
          </span>
        );
      case 'sending_unknown':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
            <AlertTriangle className="w-3 h-3 text-amber-400" /> Unknown Timeout
          </span>
        );
      case 'sent':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-sky-500/15 text-sky-400 border border-sky-500/30">
            <Send className="w-3 h-3" /> Sent
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCheck className="w-3 h-3" /> Delivered
          </span>
        );
      case 'read':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 font-bold">
            <Eye className="w-3 h-3 text-emerald-300" /> Read
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-red-500/15 text-red-400 border border-red-500/30">
            <XCircle className="w-3 h-3" /> Failed
          </span>
        );
      case 'suppressed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-purple-500/15 text-purple-300 border border-purple-500/30">
            <ShieldAlert className="w-3 h-3" /> Suppressed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-500 border border-slate-700">
            Cancelled
          </span>
        );
    }
  };

  // Filtered Recipients
  const filteredRecipients = recipients.filter((r) => {
    if (statusFilter !== 'ALL' && r.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return r.name.toLowerCase().includes(q) || r.phone.includes(q);
    }
    return true;
  });

  const PAGE_SIZE = 15;
  const totalPages = Math.ceil(filteredRecipients.length / PAGE_SIZE) || 1;
  const paginatedRecipients = filteredRecipients.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const completedCount =
    (summary?.sentCount || 0) +
    (summary?.deliveredCount || 0) +
    (summary?.readCount || 0) +
    (summary?.failedCount || 0) +
    (summary?.suppressedCount || 0);

  const progressPercent = summary?.totalRecipients
    ? Math.round((completedCount / summary.totalRecipients) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="h-7 px-2 text-slate-400 hover:text-slate-100 text-xs"
            >
              ← Back to Campaigns
            </Button>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono uppercase">
              Stage 4 Dispatch Pipeline
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-400" />
            {draft.name}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Template: <span className="font-mono text-slate-300">{draft.templateName}</span> ({draft.languageCode}) • Target: {draft.audienceStats.eligibleAudience} verified recipients
          </p>
        </div>

        {/* Global Dispatch Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {!isRunning ? (
            <Button
              onClick={handleStartDryRun}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-lg shadow-emerald-950/30"
            >
              <Play className="w-4 h-4 fill-current" />
              Start Dry-Run Dispatch
            </Button>
          ) : isPaused ? (
            <Button
              onClick={handleResume}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5"
            >
              <Play className="w-4 h-4 fill-current" />
              Resume Dispatch
            </Button>
          ) : (
            <Button
              onClick={handlePause}
              variant="outline"
              className="border-amber-500 text-amber-300 hover:bg-amber-500/10 text-xs px-4 py-2 rounded-xl flex items-center gap-1.5"
            >
              <Pause className="w-4 h-4 fill-current" />
              Pause Dispatch
            </Button>
          )}

          <Button
            variant="outline"
            disabled={!isRunning && summary?.status !== 'active'}
            onClick={handleCancel}
            className="border-red-500/40 text-red-400 hover:bg-red-500/10 text-xs px-3 py-2 rounded-xl flex items-center gap-1.5"
          >
            <StopCircle className="w-4 h-4" />
            Cancel
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleSimulateStaleRecovery}
            title="Recover Stale Leases"
            className="text-slate-400 hover:text-slate-200 border border-slate-800 rounded-xl px-2.5 h-9"
          >
            <RotateCw className="w-3.5 h-3.5 mr-1" />
            Recover Leases
          </Button>
        </div>
      </div>

      {/* Production Safe Dispatch Notice */}
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-300">
        <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-emerald-200 uppercase font-mono tracking-wider">
            PRODUCTION DISPATCH WORKER — DRY-RUN SAFETY MODE (TARGET: lpbdwmpglwdedqdiovqu)
          </div>
          <div className="text-emerald-300/90 leading-relaxed">
            Worker executions on production backend <code className="bg-slate-900 px-1 rounded font-bold text-emerald-400">lpbdwmpglwdedqdiovqu</code> default to safe dry-run mode. Atomic queue leasing, 60s recipient pacing, and eligibility rules are verified without depleting Meta marketing quotas.
          </div>
        </div>
      </div>

      {/* Progress & Speed Telemetry Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs text-slate-400">Queue Dispatch Progress</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-2xl font-extrabold text-slate-100 font-mono">
                {progressPercent}%
              </span>
              <span className="text-xs text-slate-400">
                ({completedCount} of {summary?.totalRecipients || 0} processed)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-[11px] text-slate-400 block">Pacing Speed</span>
              <span className="text-base font-bold text-emerald-400 font-mono flex items-center justify-end gap-1">
                <Zap className="w-3.5 h-3.5" />
                {summary?.currentSpeedMsgsPerSec || 0} msgs/sec
              </span>
            </div>

            <div className="text-right border-l border-slate-800 pl-6">
              <span className="text-[11px] text-slate-400 block">Est. Time Remaining</span>
              <span className="text-base font-bold text-slate-200 font-mono">
                {summary?.estimatedSecondsRemaining
                  ? `${summary.estimatedSecondsRemaining}s`
                  : summary?.status === 'completed'
                  ? 'Done'
                  : '—'}
              </span>
            </div>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800 flex">
          <div
            className="bg-emerald-500 transition-all duration-300 h-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 9 Status KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
          <span className="text-[11px] text-slate-400 block">Total Recipients</span>
          <span className="text-lg font-bold text-slate-100 font-mono mt-0.5 block">
            {summary?.totalRecipients || 0}
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
          <span className="text-[11px] text-slate-400 block">Pending in Queue</span>
          <span className="text-lg font-bold text-slate-300 font-mono mt-0.5 block">
            {summary?.pendingCount || 0}
          </span>
        </div>

        <div className="bg-slate-900 border border-blue-500/20 rounded-xl p-3.5">
          <span className="text-[11px] text-blue-400 block">Processing (Leased)</span>
          <span className="text-lg font-bold text-blue-400 font-mono mt-0.5 block">
            {summary?.claimedCount || 0}
          </span>
        </div>

        <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-3.5">
          <span className="text-[11px] text-emerald-400 block">Sent & Delivered</span>
          <span className="text-lg font-bold text-emerald-400 font-mono mt-0.5 block">
            {(summary?.sentCount || 0) + (summary?.deliveredCount || 0) + (summary?.readCount || 0)}
          </span>
        </div>

        <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-3.5">
          <span className="text-[11px] text-amber-400 font-semibold block flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            Sending Unknown
          </span>
          <span className="text-lg font-bold text-amber-300 font-mono mt-0.5 block">
            {summary?.sendingUnknownCount || 0}
          </span>
        </div>
      </div>

      {/* Recipients Queue Inspection Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-4 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              Recipient Dispatch Telemetry Log
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Live audit record of every claimed lease, Meta message ID, opaque callback token, and handset delivery.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search phone or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="claimed">Claimed (Leased)</option>
              <option value="sending_unknown">Sending Unknown</option>
              <option value="sent">Sent</option>
              <option value="delivered">Delivered</option>
              <option value="read">Read</option>
              <option value="failed">Failed</option>
              <option value="suppressed">Suppressed</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-mono border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-3">Recipient Name</th>
                <th className="py-2.5 px-3">Phone (E.164)</th>
                <th className="py-2.5 px-3">Dispatch Status</th>
                <th className="py-2.5 px-3">Worker Lease</th>
                <th className="py-2.5 px-3">Meta Message ID</th>
                <th className="py-2.5 px-3 text-right">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {paginatedRecipients.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500">
                    {item.recipientIndex}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-200">{item.name}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-300">{item.phone}</td>
                  <td className="py-2.5 px-3">{getStatusBadge(item.status)}</td>
                  <td className="py-2.5 px-3 font-mono text-[10px] text-slate-400">
                    {item.workerId ? `${item.workerId}` : '—'}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[10px] text-slate-400 truncate max-w-[170px]">
                    {item.metaMessageId ? `${item.metaMessageId} (Simulated)` : '—'}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedRecipient(item)}
                      className="h-6 px-2 text-[11px] text-slate-400 hover:text-amber-400 hover:bg-slate-800"
                    >
                      Inspect
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
          <span>
            Showing {(currentPage - 1) * PAGE_SIZE + 1} to{' '}
            {Math.min(currentPage * PAGE_SIZE, filteredRecipients.length)} of{' '}
            {filteredRecipients.length} recipients
          </span>

          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="h-7 w-7 p-0 border-slate-800 text-slate-400"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </Button>
            <span className="px-2 text-xs font-mono">{currentPage} / {totalPages}</span>
            <Button
              size="sm"
              variant="outline"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="h-7 w-7 p-0 border-slate-800 text-slate-400"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Recipient Audit Drawer Modal */}
      {selectedRecipient && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <History className="w-4 h-4 text-amber-400" />
                  Recipient Telemetry & Audit Detail
                </h4>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {selectedRecipient.name} ({selectedRecipient.phone})
                </p>
              </div>
              <button
                onClick={() => setSelectedRecipient(null)}
                className="text-slate-400 hover:text-slate-200 text-sm"
              >
                ✕
              </button>
            </div>

            {/* Core Identifiers */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px]">Current Status:</span>
                <div>{getStatusBadge(selectedRecipient.status)}</div>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Attempt Count:</span>
                <span className="font-mono text-slate-200 font-semibold">
                  {selectedRecipient.attemptCount} / {selectedRecipient.maxAttempts}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block text-[10px]">Meta Message ID:</span>
                <span className="font-mono text-slate-300 text-[11px] break-all">
                  {selectedRecipient.metaMessageId ? `${selectedRecipient.metaMessageId} (Simulated)` : 'None assigned yet'}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block text-[10px]">Opaque Callback Token:</span>
                <span className="font-mono text-amber-300 text-[11px] break-all">
                  {selectedRecipient.bizOpaqueCallbackData || 'None'}
                </span>
              </div>
              {selectedRecipient.errorMessage && (
                <div className="col-span-2 bg-red-500/10 border border-red-500/20 rounded p-2 text-red-300 text-[11px]">
                  <span className="font-bold">Error:</span> {selectedRecipient.errorMessage}
                </div>
              )}
            </div>

            {/* Audit Log Timeline */}
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              <h5 className="text-xs font-semibold text-slate-300">Sequential State Transitions</h5>
              {selectedRecipient.auditLog.map((log, i) => (
                <div
                  key={i}
                  className="bg-slate-950 border border-slate-800/80 rounded-lg p-2.5 text-xs space-y-0.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">{log.action}</span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{log.details}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-800">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedRecipient(null)}
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
