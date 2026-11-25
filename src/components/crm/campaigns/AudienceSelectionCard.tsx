// ==============================================================================
// Campaign Audience Selection & Eligibility Card (Stage 3)
// Multi-source segmentation with strict unverified quarantine & suppression gating
// ==============================================================================

import React from 'react';
import {
  Users,
  ShieldCheck,
  ShieldAlert,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Copy,
  Layers,
  MapPin,
  Home,
  Tag
} from 'lucide-react';
import {
  NormalizedContact,
  AudienceFilterCriteria,
} from '@/lib/campaignImport/types';
import { CampaignAudienceStats } from '@/lib/campaignComposer/types';

interface AudienceSelectionCardProps {
  allContacts: NormalizedContact[];
  filterCriteria: AudienceFilterCriteria;
  onChangeFilterCriteria: (newFilters: AudienceFilterCriteria) => void;
  audienceStats: CampaignAudienceStats;
}

const POPULAR_LOCATIONS = [
  'Neopolis, Kokapet',
  'Kokapet',
  'Financial District',
  'Gachibowli',
  'Tellapur',
  'Miyapur',
  'Bachupally',
];

const BHK_OPTIONS = ['2 BHK', '3 BHK', '4 BHK', '5 BHK+'];

export const AudienceSelectionCard: React.FC<AudienceSelectionCardProps> = ({
  allContacts,
  filterCriteria,
  onChangeFilterCriteria,
  audienceStats,
}) => {
  const toggleLocation = (loc: string) => {
    const current = filterCriteria.locations || [];
    const updated = current.includes(loc)
      ? current.filter((l) => l !== loc)
      : [...current, loc];
    onChangeFilterCriteria({ ...filterCriteria, locations: updated.length ? updated : undefined });
  };

  const toggleBhk = (bhk: string) => {
    const current = filterCriteria.bhkTypes || [];
    const updated = current.includes(bhk)
      ? current.filter((b) => b !== bhk)
      : [...current, bhk];
    onChangeFilterCriteria({ ...filterCriteria, bhkTypes: updated.length ? updated : undefined });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-400" />
            Audience Targeting & Compliance Eligibility
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Filter multi-source contacts. Only verified opt-in recipients with valid phone numbers are eligible to receive campaigns.
          </p>
        </div>
        <div className="text-xs text-slate-400 flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>Unverified & Suppressed automatically quarantined</span>
        </div>
      </div>

      {/* KPI Counters Banner (Real-time Breakdown) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Total Ingested */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-center">
          <span className="text-[11px] text-slate-400 font-medium block">Total Contacts</span>
          <span className="text-lg font-bold text-slate-200 mt-0.5 block">
            {audienceStats.totalContacts.toLocaleString()}
          </span>
        </div>

        {/* Valid E.164 */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-center">
          <span className="text-[11px] text-slate-400 font-medium block">Valid E.164</span>
          <span className="text-lg font-bold text-sky-400 mt-0.5 block">
            {audienceStats.validContacts.toLocaleString()}
          </span>
        </div>

        {/* Verified Opt-In */}
        <div className="bg-slate-950/80 border border-emerald-500/20 rounded-xl p-3 text-center">
          <span className="text-[11px] text-emerald-400 font-medium block flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            Verified Opt-In
          </span>
          <span className="text-lg font-bold text-emerald-400 mt-0.5 block">
            {audienceStats.verifiedOptInContacts.toLocaleString()}
          </span>
        </div>

        {/* Unverified Quarantined */}
        <div className="bg-slate-950/80 border border-amber-500/20 rounded-xl p-3 text-center">
          <span className="text-[11px] text-amber-400 font-medium block flex items-center justify-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            Unverified
          </span>
          <span className="text-lg font-bold text-amber-400 mt-0.5 block">
            {audienceStats.unverifiedContacts.toLocaleString()}
          </span>
        </div>

        {/* Suppressed / Duplicates */}
        <div className="bg-slate-950/80 border border-red-500/20 rounded-xl p-3 text-center">
          <span className="text-[11px] text-red-400 font-medium block flex items-center justify-center gap-1">
            <XCircle className="w-3 h-3" />
            Suppressed / Dup
          </span>
          <span className="text-lg font-bold text-red-400 mt-0.5 block">
            {(audienceStats.suppressedContacts + audienceStats.duplicateContacts).toLocaleString()}
          </span>
        </div>

        {/* Final Eligible Audience (Hero Pill) */}
        <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-3 text-center ring-1 ring-emerald-500/30">
          <span className="text-[11px] text-emerald-300 font-bold block flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Eligible Audience
          </span>
          <span className="text-xl font-extrabold text-emerald-300 mt-0.5 block">
            {audienceStats.eligibleAudience.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Target Filters Selection */}
      <div className="space-y-4 pt-2">
        {/* Source Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            Contact Source
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { id: 'all', label: 'All Contacts (CRM + Imports)', desc: 'Combined audience' },
              { id: 'crm_leads', label: 'CRM Leads Only', desc: 'Direct website inquiries' },
              { id: 'spreadsheet_imports', label: 'Spreadsheet Imports Only', desc: 'Staged CSV / Excel lists' },
            ].map((src) => (
              <button
                key={src.id}
                type="button"
                onClick={() =>
                  onChangeFilterCriteria({
                    ...filterCriteria,
                    sourceType: src.id as any,
                  })
                }
                className={`p-3 rounded-xl border text-left transition-all ${
                  filterCriteria.sourceType === src.id
                    ? 'bg-amber-500/10 border-amber-500 text-slate-100 ring-1 ring-amber-500/30'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold text-slate-200">{src.label}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{src.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Location Filtering */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            Target Localities (Multi-select)
          </label>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_LOCATIONS.map((loc) => {
              const isSelected = filterCriteria.locations?.includes(loc);
              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => toggleLocation(loc)}
                  className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all ${
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {loc}
                </button>
              );
            })}
          </div>
        </div>

        {/* BHK Filtering */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5 text-slate-400" />
            BHK Preference (Multi-select)
          </label>
          <div className="flex flex-wrap gap-1.5">
            {BHK_OPTIONS.map((bhk) => {
              const isSelected = filterCriteria.bhkTypes?.includes(bhk);
              return (
                <button
                  key={bhk}
                  type="button"
                  onClick={() => toggleBhk(bhk)}
                  className={`text-xs px-3 py-1 rounded-lg border font-medium transition-all ${
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {bhk}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Safety Compliance Warning */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 flex items-start gap-3 text-xs text-slate-400">
        <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-semibold text-slate-300">Strict Meta Policy Protection:</span>{' '}
          Recipients marked as <span className="text-amber-400">Unverified</span> or on the{' '}
          <span className="text-red-400">Global Suppression List</span> are automatically purged from the sendable audience. 
          To move imported contacts to eligible status, record verified opt-in proof in Contact Management.
        </div>
      </div>
    </div>
  );
};
