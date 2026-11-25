// ==============================================================================
// Audience Filter Panel Component
// Multidimensional real estate filtering (Location, Budget, Property, BHK, Consent)
// ==============================================================================

import React from 'react';
import { AudienceFilterCriteria, ConsentStatus } from '@/lib/campaignImport/types';
import { Filter, Search, RotateCcw, ShieldCheck, ShieldAlert, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AudienceFilterPanelProps {
  criteria: AudienceFilterCriteria;
  onChange: (updated: AudienceFilterCriteria) => void;
  availableLocations?: string[];
  availableBudgets?: string[];
  availableProperties?: string[];
  availableBhkTypes?: string[];
  availableSources?: string[];
  onReset?: () => void;
}

export const AudienceFilterPanel: React.FC<AudienceFilterPanelProps> = ({
  criteria,
  onChange,
  availableLocations = [],
  availableBudgets = [],
  availableProperties = [],
  availableBhkTypes = [],
  availableSources = [],
  onReset = () => {},
}) => {
  const toggleArrayItem = (key: keyof AudienceFilterCriteria, item: string) => {
    const list = (criteria[key] as string[]) || [];
    const exists = list.includes(item);
    const updated = exists ? list.filter((x) => x !== item) : [...list, item];
    onChange({ ...criteria, [key]: updated });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, phone, location, project..."
            value={criteria.searchQuery || ''}
            onChange={(e) => onChange({ ...criteria, searchQuery: e.target.value })}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Source Toggle */}
          <div className="inline-flex rounded-lg bg-slate-950 p-1 border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => onChange({ ...criteria, sourceType: 'all' })}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                (criteria.sourceType || 'all') === 'all'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Sources
            </button>
            <button
              type="button"
              onClick={() => onChange({ ...criteria, sourceType: 'crm_leads' })}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                criteria.sourceType === 'crm_leads'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              CRM Leads
            </button>
            <button
              type="button"
              onClick={() => onChange({ ...criteria, sourceType: 'imported_files' })}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                criteria.sourceType === 'imported_files'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Spreadsheet
            </button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-slate-400 hover:text-slate-200 text-xs h-8"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      {/* Multidimensional Facets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* Location Dropdown */}
        <div>
          <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
            Location ({criteria.locations?.length || 0})
          </label>
          <select
            value=""
            onChange={(e) => {
              if (e.target.value) toggleArrayItem('locations', e.target.value);
            }}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="">Select Location...</option>
            {availableLocations.map((loc) => (
              <option key={loc} value={loc} className="bg-slate-900 text-slate-200">
                {loc} {criteria.locations?.includes(loc) ? '✓' : ''}
              </option>
            ))}
          </select>
          {criteria.locations && criteria.locations.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {criteria.locations.map((loc) => (
                <span
                  key={loc}
                  onClick={() => toggleArrayItem('locations', loc)}
                  className="bg-amber-500/10 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded text-[10px] cursor-pointer hover:bg-amber-500/20"
                >
                  {loc} ×
                </span>
              ))}
            </div>
          )}
        </div>

        {/* BHK Configuration */}
        <div>
          <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
            BHK Type ({criteria.bhkTypes?.length || 0})
          </label>
          <select
            value=""
            onChange={(e) => {
              if (e.target.value) toggleArrayItem('bhkTypes', e.target.value);
            }}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="">Select BHK...</option>
            {availableBhkTypes.map((bhk) => (
              <option key={bhk} value={bhk} className="bg-slate-900 text-slate-200">
                {bhk} {criteria.bhkTypes?.includes(bhk) ? '✓' : ''}
              </option>
            ))}
          </select>
          {criteria.bhkTypes && criteria.bhkTypes.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {criteria.bhkTypes.map((bhk) => (
                <span
                  key={bhk}
                  onClick={() => toggleArrayItem('bhkTypes', bhk)}
                  className="bg-amber-500/10 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded text-[10px] cursor-pointer hover:bg-amber-500/20"
                >
                  {bhk} ×
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Budget Range */}
        <div>
          <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
            Budget ({criteria.budgets?.length || 0})
          </label>
          <select
            value=""
            onChange={(e) => {
              if (e.target.value) toggleArrayItem('budgets', e.target.value);
            }}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="">Select Budget...</option>
            {availableBudgets.map((bud) => (
              <option key={bud} value={bud} className="bg-slate-900 text-slate-200">
                {bud} {criteria.budgets?.includes(bud) ? '✓' : ''}
              </option>
            ))}
          </select>
          {criteria.budgets && criteria.budgets.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {criteria.budgets.map((bud) => (
                <span
                  key={bud}
                  onClick={() => toggleArrayItem('budgets', bud)}
                  className="bg-amber-500/10 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded text-[10px] cursor-pointer hover:bg-amber-500/20"
                >
                  {bud} ×
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Consent Status Filter */}
        <div>
          <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
            Consent Gate
          </label>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => toggleArrayItem('consentStatuses', 'opted_in')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-medium border flex items-center justify-center gap-1 transition-colors ${
                criteria.consentStatuses?.includes('opted_in')
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Opted-In
            </button>
            <button
              type="button"
              onClick={() => toggleArrayItem('consentStatuses', 'unverified')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-medium border flex items-center justify-center gap-1 transition-colors ${
                criteria.consentStatuses?.includes('unverified')
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              Unverified
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
