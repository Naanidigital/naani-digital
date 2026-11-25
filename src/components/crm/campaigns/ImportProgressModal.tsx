// ==============================================================================
// Import Progress Modal Component
// Non-blocking progress indicator for large files up to 10,000 rows
// ==============================================================================

import React from 'react';
import { Loader2, ShieldAlert } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ImportProgressModalProps {
  isOpen: boolean;
  processedRows?: number;
  totalRows?: number;
  current?: number;
  total?: number;
  filename?: string;
}

export const ImportProgressModal: React.FC<ImportProgressModalProps> = ({
  isOpen,
  processedRows,
  totalRows,
  current,
  total,
  filename,
}) => {
  if (!isOpen) return null;

  const processed = processedRows ?? current ?? 0;
  const targetTotal = totalRows ?? total ?? 0;
  const percentage = targetTotal > 0 ? Math.round((processed / targetTotal) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-5 animate-in fade-in-50 zoom-in-95">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-100">Processing Spreadsheet</h3>
            <p className="text-xs text-slate-400">
              {filename ? `Validating ${filename} in chunks` : 'Validating and normalizing contacts in chunks'}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono text-slate-300">
            <span>
              {processed.toLocaleString()} / {targetTotal.toLocaleString()} rows
            </span>
            <span className="font-semibold text-amber-400">{percentage}%</span>
          </div>
          <Progress value={percentage} className="h-2 bg-slate-800" />
        </div>

        <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Safety Lock Active: Zero WhatsApp messages are dispatched during file ingestion.</span>
        </div>
      </div>
    </div>
  );
};
