// ==============================================================================
// Consent Configuration & Legal Proof Component
// Enforces that imported contacts default strictly to unverified
// ==============================================================================

import React from 'react';
import { ConsentMetadata, ConsentStatus, ConsentSource } from '@/lib/campaignImport/types';
import { ShieldAlert, ShieldCheck, Info } from 'lucide-react';

interface ConsentConfigCardProps {
  consent: ConsentMetadata;
  onChange: (updated: ConsentMetadata) => void;
}

export const ConsentConfigCard: React.FC<ConsentConfigCardProps> = ({ consent, onChange }) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Consent & Opt-in Compliance</span>
            <span className="text-[10px] bg-slate-800 text-slate-400 border border-slate-700 px-2 py-0.5 rounded font-mono">
              DPDP Act & Meta Policy
            </span>
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Imported contacts default strictly to <code className="text-amber-400 font-mono">unverified</code>. They cannot be targeted in marketing campaigns without explicit documented consent.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Default Consent Status */}
        <div>
          <label className="block text-slate-300 font-medium mb-1.5">
            Default Import Consent Status
          </label>
          <select
            value={consent.status}
            onChange={(e) => onChange({ ...consent, status: e.target.value as ConsentStatus })}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
          >
            <option value="unverified">⚠️ Unverified (Default — Quarantined from Marketing)</option>
            <option value="opted_in">✅ Explicitly Opted-In (Requires Proof Reference)</option>
            <option value="opted_out">⛔ Opted-Out</option>
          </select>
          <p className="text-[11px] text-slate-500 mt-1">
            Contacts with <span className="text-amber-400">unverified</span> status are excluded from marketing dispatches.
          </p>
        </div>

        {/* Consent Source */}
        <div>
          <label className="block text-slate-300 font-medium mb-1.5">
            Consent Source
          </label>
          <select
            value={consent.source}
            onChange={(e) => onChange({ ...consent, source: e.target.value as ConsentSource })}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
          >
            <option value="unverified_import">Unverified Spreadsheet Import</option>
            <option value="csv_import">Documented CSV / Partner Import</option>
            <option value="web_form">Website Property Enquiry Lead Gate</option>
            <option value="whatsapp_inbound_optin">WhatsApp Customer Inbound Opt-in</option>
            <option value="offline_agreement">Offline Site Visit / Application Form</option>
          </select>
        </div>

        {/* Consent Proof Reference */}
        <div>
          <label className="block text-slate-300 font-medium mb-1.5">
            Consent Proof / Document Reference
          </label>
          <input
            type="text"
            placeholder="e.g. Form URL, Ticket #, Site Visit Form Ref"
            value={consent.proofReference || ''}
            onChange={(e) => onChange({ ...consent, proofReference: e.target.value })}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Consent Capture Date */}
        <div>
          <label className="block text-slate-300 font-medium mb-1.5">
            Opt-in Capture Date
          </label>
          <input
            type="date"
            value={consent.capturedAt ? consent.capturedAt.split('T')[0] : new Date().toISOString().split('T')[0]}
            onChange={(e) => onChange({ ...consent, capturedAt: new Date(e.target.value).toISOString() })}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {consent.status === 'opted_in' && !consent.proofReference && (
        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
          <Info className="w-4 h-4 shrink-0" />
          <span>Warning: Assigning <strong>opted_in</strong> status without entering a Document/Proof Reference may fail compliance audits.</span>
        </div>
      )}
    </div>
  );
};
