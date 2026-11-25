// ==============================================================================
// Audience Preview Table Component
// Paginated view of contacts with status badges, consent gates, and suppression markers
// ==============================================================================

import React, { useState } from 'react';
import { NormalizedContact } from '@/lib/campaignImport/types';
import {
  ShieldCheck,
  ShieldAlert,
  Ban,
  Copy,
  ChevronLeft,
  ChevronRight,
  Database,
  FileSpreadsheet
} from 'lucide-react';

interface AudiencePreviewTableProps {
  contacts: NormalizedContact[];
  pageSize?: number;
}

export const AudiencePreviewTable: React.FC<AudiencePreviewTableProps> = ({
  contacts,
  pageSize = 20,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(contacts.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentBatch = contacts.slice(startIndex, startIndex + pageSize);

  const renderStatusBadge = (c: NormalizedContact) => {
    if (c.isDuplicateInFile) {
      return (
        <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[10px] font-mono">
          <Copy className="w-3 h-3" /> Duplicate
        </span>
      );
    }
    if (c.isSuppressed) {
      return (
        <span className="inline-flex items-center gap-1 bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded text-[10px] font-mono">
          <Ban className="w-3 h-3" /> Suppressed
        </span>
      );
    }
    if (c.consent.status === 'opted_in') {
      return (
        <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-mono">
          <ShieldCheck className="w-3 h-3" /> Opted-In (Sendable)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[10px] font-mono">
        <ShieldAlert className="w-3 h-3" /> Unverified (Quarantined)
      </span>
    );
  };

  return (
    <div className="space-y-3">
      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-mono">
              <tr>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Phone (E.164)</th>
                <th className="py-3 px-4">Location / Property</th>
                <th className="py-3 px-4">BHK / Budget</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4 text-right">Targeting Eligibility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {currentBatch.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No contacts match the selected filters.
                  </td>
                </tr>
              ) : (
                currentBatch.map((contact, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-100">
                      <div className="flex items-center gap-2">
                        <span>{contact.name || 'Unnamed Contact'}</span>
                        {contact.isDuplicateInCrm && (
                          <span
                            className="text-[9px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 py-0.2 rounded font-mono"
                            title="Exists in CRM Leads database"
                          >
                            CRM Match
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-300">
                      {contact.formattedPhone || contact.rawPhone}
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      <div className="truncate max-w-xs">
                        <span>{contact.location || '—'}</span>
                        {contact.propertyInterest && (
                          <span className="text-slate-500 block text-[11px]">
                            {contact.propertyInterest}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      <span>{contact.bhk || '—'}</span>
                      {contact.budget && (
                        <span className="text-slate-500 block text-[11px] font-mono">
                          {contact.budget}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      <span className="inline-flex items-center gap-1">
                        {contact.crmLeadId ? (
                          <Database className="w-3 h-3 text-blue-400" />
                        ) : (
                          <FileSpreadsheet className="w-3 h-3 text-amber-400" />
                        )}
                        {contact.leadSource || 'Direct'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {renderStatusBadge(contact)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>
            Showing <strong className="text-slate-200">{startIndex + 1}</strong> to{' '}
            <strong className="text-slate-200">
              {Math.min(startIndex + pageSize, contacts.length)}
            </strong>{' '}
            of <strong className="text-slate-200">{contacts.length.toLocaleString()}</strong> contacts
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-slate-300">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
