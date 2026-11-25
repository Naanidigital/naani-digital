// ==============================================================================
// Import Summary Card & Error Inspector
// Comprehensive breakdown of import metrics, duplicates, and validation errors
// ==============================================================================

import React, { useState } from 'react';
import { ImportValidationReport } from '@/lib/campaignImport/types';
import {
  CheckCircle2,
  AlertOctagon,
  Copy,
  Users,
  ShieldCheck,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Download,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImportSummaryCardProps {
  report: ImportValidationReport;
  filename: string;
  processingTimeMs?: number;
}

export const ImportSummaryCard: React.FC<ImportSummaryCardProps> = ({
  report,
  filename,
  processingTimeMs,
}) => {
  const [showErrors, setShowErrors] = useState(false);

  const downloadErrorReport = () => {
    if (report.errors.length === 0) return;
    const header = 'Row Index,Phone,Reason\n';
    const csvContent =
      header +
      report.errors
        .map((e) => `"${e.rowIndex}","${e.phone.replace(/"/g, '""')}","${e.reason.replace(/"/g, '""')}"`)
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${filename.replace(/\.[^/.]+$/, '')}_error_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
            <span>Import Verification Summary</span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono">
              Ready
            </span>
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            File: <span className="text-slate-200 font-mono">{filename}</span>
            {processingTimeMs !== undefined && (
              <span className="text-slate-500 ml-2">({processingTimeMs} ms)</span>
            )}
          </p>
        </div>

        {report.errors.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={downloadErrorReport}
            className="border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white text-xs self-start"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Download Errors ({report.errors.length})
          </Button>
        )}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-left">
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3">
          <span className="text-[10px] font-mono uppercase text-slate-500">Total Rows</span>
          <p className="text-lg font-bold text-slate-100 mt-0.5 font-mono">
            {report.totalRows.toLocaleString()}
          </p>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3">
          <span className="text-[10px] font-mono uppercase text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Valid
          </span>
          <p className="text-lg font-bold text-emerald-400 mt-0.5 font-mono">
            {report.validRows.toLocaleString()}
          </p>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3">
          <span className="text-[10px] font-mono uppercase text-red-400 flex items-center gap-1">
            <AlertOctagon className="w-3 h-3" /> Invalid
          </span>
          <p className="text-lg font-bold text-red-400 mt-0.5 font-mono">
            {report.invalidRows.toLocaleString()}
          </p>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3">
          <span className="text-[10px] font-mono uppercase text-amber-400 flex items-center gap-1">
            <Copy className="w-3 h-3" /> Duplicates
          </span>
          <p className="text-lg font-bold text-amber-400 mt-0.5 font-mono">
            {report.duplicateInFileRows.toLocaleString()}
          </p>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3">
          <span className="text-[10px] font-mono uppercase text-blue-400 flex items-center gap-1">
            <Users className="w-3 h-3" /> In CRM
          </span>
          <p className="text-lg font-bold text-blue-400 mt-0.5 font-mono">
            {report.duplicateInCrmRows.toLocaleString()}
          </p>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3">
          <span className="text-[10px] font-mono uppercase text-emerald-500 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Opted-In
          </span>
          <p className="text-lg font-bold text-emerald-500 mt-0.5 font-mono">
            {report.consentEligibleRows.toLocaleString()}
          </p>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3">
          <span className="text-[10px] font-mono uppercase text-amber-500 flex items-center gap-1">
            <ShieldAlert className="w-3 h-3" /> Unverified
          </span>
          <p className="text-lg font-bold text-amber-500 mt-0.5 font-mono">
            {report.unverifiedRows.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Expandable Error Inspector */}
      {report.errors.length > 0 && (
        <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950/40">
          <button
            onClick={() => setShowErrors(!showErrors)}
            className="w-full px-4 py-2.5 flex items-center justify-between text-xs text-slate-300 hover:bg-slate-800/40 font-medium transition-colors"
          >
            <span className="flex items-center gap-2 text-red-400">
              <AlertCircle className="w-4 h-4" />
              <span>View Actionable Error Report ({report.errors.length} issues detected)</span>
            </span>
            {showErrors ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showErrors && (
            <div className="max-h-60 overflow-y-auto border-t border-slate-800">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 sticky top-0 text-slate-400 uppercase text-[10px] font-mono">
                  <tr>
                    <th className="py-2 px-3">Row</th>
                    <th className="py-2 px-3">Phone Value</th>
                    <th className="py-2 px-3">Issue Reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 font-mono text-[11px]">
                  {report.errors.map((err, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30">
                      <td className="py-2 px-3 text-slate-500">#{err.rowIndex}</td>
                      <td className="py-2 px-3 text-slate-300">{err.phone}</td>
                      <td className="py-2 px-3 text-red-400/90 font-sans">{err.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
