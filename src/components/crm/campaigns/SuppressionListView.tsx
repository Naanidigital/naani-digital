// src/components/crm/campaigns/SuppressionListView.tsx
// ==============================================================================
// Suppression List & Opt-Out Compliance Manager (Stage 5D)
// Persisted Staging suppressions table with manual suppression add dialog
// ==============================================================================

import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Search,
  Plus,
  RotateCw,
  Phone,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  getStagingSuppressions,
  addStagingSuppression,
  StagingSuppressionRecord
} from '@/lib/campaignStagingService';

export const SuppressionListView: React.FC = () => {
  const [suppressions, setSuppressions] = useState<StagingSuppressionRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [reasonFilter, setReasonFilter] = useState<string>('ALL');

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newPhone, setNewPhone] = useState<string>('');
  const [newReason, setNewReason] = useState<string>('manual_admin_suppression');
  const [newNotes, setNewNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const loadSuppressions = async () => {
    setLoading(true);
    try {
      const data = await getStagingSuppressions();
      setSuppressions(data);
    } catch (err) {
      console.error('Failed to load suppressions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuppressions();
  }, []);

  const handleAddSuppression = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhone.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await addStagingSuppression(newPhone, newReason, newNotes);
      if (res.success) {
        setIsAddModalOpen(false);
        setNewPhone('');
        setNewNotes('');
        await loadSuppressions();
      } else {
        alert(`Failed to add suppression: ${res.error}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredSuppressions = suppressions.filter((s) => {
    if (reasonFilter !== 'ALL' && s.reason !== reasonFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        s.normalized_phone.includes(q) ||
        (s.notes && s.notes.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const getReasonBadge = (reason: string) => {
    switch (reason) {
      case 'customer_opt_out':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-red-500/15 text-red-400 border border-red-500/30">
            Customer Opt-Out
          </span>
        );
      case 'inbound_stop_keyword':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold">
            STOP Keyword
          </span>
        );
      case 'manual_admin_suppression':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-purple-500/15 text-purple-300 border border-purple-500/30">
            Staff DND Entry
          </span>
        );
      case 'bounce_undeliverable':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-400 border border-slate-700">
            Undeliverable Bounce
          </span>
        );
      case 'spam_report':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold">
            Spam Complaint
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
            {reason}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/30 px-2 py-0.5 rounded font-mono uppercase font-bold">
              Compliance Enforcement
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            WhatsApp Suppression & Do-Not-Disturb List
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Phones registered here are excluded from all campaign queues and pre-send eligibility filters at the PostgreSQL database level.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={loadSuppressions}
            disabled={loading}
            className="border-slate-700 text-slate-300 hover:bg-slate-800 text-xs h-9"
          >
            <RotateCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>

          <Button
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            className="bg-red-500 hover:bg-red-600 text-slate-950 font-bold text-xs h-9 px-4 rounded-xl flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" />
            Add Suppression
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search phone number or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Reason:</span>
          <select
            value={reasonFilter}
            onChange={(e) => setReasonFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
          >
            <option value="ALL">All Reasons</option>
            <option value="customer_opt_out">Customer Opt-Out</option>
            <option value="inbound_stop_keyword">STOP Keyword</option>
            <option value="manual_admin_suppression">Staff DND Entry</option>
            <option value="bounce_undeliverable">Undeliverable Bounce</option>
            <option value="spam_report">Spam Complaint</option>
          </select>
        </div>
      </div>

      {/* Suppressions Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {filteredSuppressions.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-2">
            <ShieldAlert className="w-8 h-8 mx-auto text-slate-600" />
            <div className="text-sm font-medium text-slate-400">No suppressions found</div>
            <p className="text-xs">All customers are currently eligible for outreach based on your filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-mono border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Suppressed Phone (E.164)</th>
                  <th className="py-3 px-4">Reason Category</th>
                  <th className="py-3 px-4">Source</th>
                  <th className="py-3 px-4">Notes & Audit Context</th>
                  <th className="py-3 px-4 text-right">Suppressed At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredSuppressions.map((sup) => (
                  <tr key={sup.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4 font-mono font-semibold text-slate-100 flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-red-400" />
                      +{sup.normalized_phone}
                    </td>
                    <td className="py-3 px-4">{getReasonBadge(sup.reason)}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-400 uppercase">{sup.source}</td>
                    <td className="py-3 px-4 text-slate-300 max-w-xs truncate">{sup.notes || '—'}</td>
                    <td className="py-3 px-4 text-right font-mono text-[11px] text-slate-400">
                      {new Date(sup.suppressed_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Suppression Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                Add Phone to Suppression List
              </h4>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-200 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSuppression} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Phone Number (E.164 format):</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 919876543210 or +91 98765 43210"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-red-500"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Digits will be automatically normalized to country code without symbols.
                </span>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Suppression Reason:</label>
                <select
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="manual_admin_suppression">Manual Admin / Staff Request</option>
                  <option value="customer_opt_out">Customer Requested Opt-Out</option>
                  <option value="inbound_stop_keyword">Customer Sent STOP</option>
                  <option value="bounce_undeliverable">Invalid / Undeliverable Number</option>
                  <option value="spam_report">Spam Report / Abuse Complaint</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Context Notes:</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Customer requested DND during verbal consultation"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddModalOpen(false)}
                  className="border-slate-700 text-slate-300 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmitting || !newPhone.trim()}
                  className="bg-red-500 hover:bg-red-600 text-slate-950 font-bold text-xs"
                >
                  {isSubmitting ? 'Saving...' : 'Confirm Suppression'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
