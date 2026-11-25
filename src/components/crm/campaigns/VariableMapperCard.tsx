// ==============================================================================
// Variable Mapper Card (Stage 3)
// Maps template placeholders {{1}}, {{2}} to CRM fields with mandatory fallbacks
// ==============================================================================

import React from 'react';
import {
  Sparkles,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Database,
  Type
} from 'lucide-react';
import {
  TemplateComponent,
  VariableMapping
} from '@/lib/campaignComposer/types';
import { StandardField } from '@/lib/campaignImport/types';
import { getTemplatePlaceholders } from '@/lib/campaignComposer/templateService';

interface VariableMapperCardProps {
  components: TemplateComponent[];
  mappings: VariableMapping[];
  onChangeMappings: (newMappings: VariableMapping[]) => void;
}

const AVAILABLE_FIELDS: Array<{ field: StandardField; label: string; example: string }> = [
  { field: 'name', label: '👤 Recipient Full Name', example: 'e.g. Rajesh Kumar' },
  { field: 'propertyInterest', label: '🏢 Property / Project', example: 'e.g. The Cascades' },
  { field: 'location', label: '📍 Preferred Location', example: 'e.g. Neopolis, Kokapet' },
  { field: 'budget', label: '💰 Budget / Investment', example: 'e.g. ₹2.5 - 3.5 Cr' },
  { field: 'bhk', label: '🛏️ BHK Configuration', example: 'e.g. 3 BHK' },
  { field: 'leadSource', label: '🏷️ Lead Source', example: 'e.g. Website' },
];

export const VariableMapperCard: React.FC<VariableMapperCardProps> = ({
  components,
  mappings,
  onChangeMappings,
}) => {
  const placeholders = getTemplatePlaceholders(components);

  // Helper to update a specific placeholder mapping
  const handleUpdate = (
    placeholder: string,
    componentType: 'HEADER' | 'BODY',
    updates: Partial<VariableMapping>
  ) => {
    const existingIdx = mappings.findIndex(
      (m) => m.placeholder === placeholder && m.componentType === componentType
    );

    let updated: VariableMapping[];
    if (existingIdx >= 0) {
      updated = [...mappings];
      updated[existingIdx] = { ...updated[existingIdx], ...updates };
    } else {
      updated = [
        ...mappings,
        {
          placeholder,
          componentType,
          sourceType: 'field',
          sourceField: 'name',
          fallbackValue: '',
          ...updates,
        },
      ];
    }

    onChangeMappings(updated);
  };

  if (placeholders.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-2">
        <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
        <h4 className="text-sm font-bold text-slate-200">No Dynamic Variables Required</h4>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          This template contains purely static approved text. No variable mapping is needed.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Template Dynamic Variable Mapping
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Connect Meta WhatsApp template placeholders to CRM recipient fields or static project constants.
          </p>
        </div>
        <div className="text-xs text-slate-400 flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
          <AlertCircle className="w-4 h-4 text-amber-400" />
          <span>Fallback value required for every variable</span>
        </div>
      </div>

      {/* Placeholders Mapping List */}
      <div className="space-y-4">
        {placeholders.map(({ placeholder, componentType }, index) => {
          const current = mappings.find(
            (m) => m.placeholder === placeholder && m.componentType === componentType
          ) || {
            placeholder,
            componentType,
            sourceType: 'field' as const,
            sourceField: (index === 0 ? 'name' : index === 1 ? 'propertyInterest' : 'location') as StandardField,
            fallbackValue: index === 0 ? 'Valued Buyer' : index === 1 ? 'our premier project' : 'Hyderabad',
          };

          const isMissingFallback =
            current.sourceType === 'field'
              ? !current.fallbackValue || !current.fallbackValue.trim()
              : !current.staticValue || !current.staticValue.trim();

          return (
            <div
              key={`${componentType}_${placeholder}`}
              className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 space-y-3"
            >
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded-md">
                    {placeholder}
                  </span>
                  <span className="text-xs font-medium text-slate-300">
                    in {componentType === 'HEADER' ? 'Header Title' : 'Message Body'}
                  </span>
                </div>

                {/* Source Type Toggle */}
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
                  <button
                    type="button"
                    onClick={() => handleUpdate(placeholder, componentType, { sourceType: 'field' })}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1 ${
                      current.sourceType === 'field'
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Database className="w-3 h-3" />
                    Contact Field
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdate(placeholder, componentType, { sourceType: 'static' })}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1 ${
                      current.sourceType === 'static'
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Type className="w-3 h-3" />
                    Static Text
                  </button>
                </div>
              </div>

              {/* Source Config Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {current.sourceType === 'field' ? (
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Source CRM Field
                    </label>
                    <select
                      value={current.sourceField || 'name'}
                      onChange={(e) =>
                        handleUpdate(placeholder, componentType, {
                          sourceField: e.target.value as StandardField,
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                    >
                      {AVAILABLE_FIELDS.map((f) => (
                        <option key={f.field} value={f.field}>
                          {f.label} ({f.example})
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Static Text Value
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. The Cascades"
                      value={current.staticValue || ''}
                      onChange={(e) =>
                        handleUpdate(placeholder, componentType, {
                          staticValue: e.target.value,
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                )}

                {/* Fallback Value Input */}
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Fallback Value <span className="text-red-400">*</span> (Used if field is empty)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Valued Buyer"
                    value={current.fallbackValue || ''}
                    onChange={(e) =>
                      handleUpdate(placeholder, componentType, {
                        fallbackValue: e.target.value,
                      })
                    }
                    className={`w-full bg-slate-900 border rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none ${
                      isMissingFallback
                        ? 'border-red-500/50 focus:border-red-500'
                        : 'border-slate-800 focus:border-amber-500'
                    }`}
                  />
                </div>
              </div>

              {isMissingFallback && (
                <div className="text-[11px] text-red-400 flex items-center gap-1.5 pt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Meta requires a non-empty fallback value to prevent template delivery failures.</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
