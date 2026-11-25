// ==============================================================================
// Column Mapper Component
// Visual mapping of spreadsheet headers to standard CRM campaign fields
// ==============================================================================

import React from 'react';
import { ColumnMapping, StandardField } from '@/lib/campaignImport/types';
import { CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

interface ColumnMapperProps {
  mappings: ColumnMapping[];
  onMappingChange: (fileHeader: string, newTarget: StandardField) => void;
}

const FIELD_OPTIONS: Array<{ value: StandardField; label: string; required?: boolean }> = [
  { value: 'phone', label: '📱 Phone Number (Required)', required: true },
  { value: 'name', label: '👤 Full Name' },
  { value: 'email', label: '✉️ Email Address' },
  { value: 'location', label: '📍 Location / Locality' },
  { value: 'budget', label: '💰 Budget / Price' },
  { value: 'property_interest', label: '🏢 Property / Project' },
  { value: 'bhk', label: '🛏️ BHK Configuration' },
  { value: 'lead_source', label: '🏷️ Lead Source / Campaign' },
  { value: 'consent_status', label: '🛡️ Consent Status' },
  { value: 'notes', label: '📝 Notes / Remarks' },
  { value: 'ignore', label: '✖️ Ignore Column' },
];

export const ColumnMapper: React.FC<ColumnMapperProps> = ({ mappings, onMappingChange }) => {
  const hasPhoneMapped = mappings.some((m) => m.targetField === 'phone');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
            <span>Map Spreadsheet Columns</span>
            <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-mono">
              Auto-Detection Active
            </span>
          </h4>
          <p className="text-xs text-slate-400">
            Confirm or change the mapping for each column. At least one column must be mapped to Phone Number.
          </p>
        </div>
      </div>

      {!hasPhoneMapped && (
        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>Please map at least one column to <strong>Phone Number</strong> to proceed.</span>
        </div>
      )}

      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-mono">
              <tr>
                <th className="py-3 px-4">File Header</th>
                <th className="py-3 px-4">Sample Data</th>
                <th className="py-3 px-4">Target CRM Field</th>
                <th className="py-3 px-4 text-right">Detection</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {mappings.map((mapping) => (
                <tr key={mapping.fileHeader} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-slate-200">
                    {mapping.fileHeader}
                  </td>
                  <td className="py-3 px-4 text-slate-400 max-w-xs truncate">
                    {mapping.sampleValues.length > 0 ? (
                      <span className="bg-slate-800/80 px-2 py-0.5 rounded text-[11px] text-slate-300 font-mono">
                        {mapping.sampleValues.join(', ')}
                      </span>
                    ) : (
                      <span className="italic text-slate-600">empty</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={mapping.targetField}
                      onChange={(e) => onMappingChange(mapping.fileHeader, e.target.value as StandardField)}
                      className={`w-full max-w-xs text-xs rounded-lg px-2.5 py-1.5 border font-medium focus:outline-none transition-colors ${
                        mapping.targetField === 'phone'
                          ? 'bg-amber-950/40 border-amber-500/50 text-amber-300'
                          : mapping.targetField !== 'ignore'
                          ? 'bg-slate-800 border-slate-700 text-slate-100'
                          : 'bg-slate-900 border-slate-800 text-slate-500'
                      }`}
                    >
                      {FIELD_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-slate-900 text-slate-200">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {mapping.confidence > 0 && mapping.targetField !== 'ignore' ? (
                      <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono">
                        <Sparkles className="w-3 h-3" />
                        {Math.round(mapping.confidence * 100)}% match
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-600 font-mono">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
