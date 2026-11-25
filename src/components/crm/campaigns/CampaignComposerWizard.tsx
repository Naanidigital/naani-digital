// ==============================================================================
// Guided Step-by-Step Campaign Composer Wizard (Stage 3)
// Strictly draft persistence, approved template gating, and live simulation
// ==============================================================================

import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Smartphone,
  Users,
  ShieldCheck,
  Save,
  Globe,
  Tag,
  Eye,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  CampaignDraft,
  CampaignObjective,
  VariableMapping,
  WhatsAppTemplate,
  TemplateTranslation,
  CampaignAudienceStats,
} from '@/lib/campaignComposer/types';
import {
  NormalizedContact,
  AudienceFilterCriteria,
  StandardField,
} from '@/lib/campaignImport/types';
import {
  getApprovedTemplates,
  getTemplateById,
  getTemplatePlaceholders,
  interpolateComponentText,
} from '@/lib/campaignComposer/templateService';
import {
  calculateAudienceEligibility,
  validateCampaignDraft,
  saveCampaignDraft,
} from '@/lib/campaignComposer/campaignStorage';
import { createStagingCampaignDraft } from '@/lib/campaignStagingService';
import { VariableMapperCard } from './VariableMapperCard';
import { AudienceSelectionCard } from './AudienceSelectionCard';
import { WhatsAppPhonePreview } from './WhatsAppPhonePreview';

interface CampaignComposerWizardProps {
  initialDraft?: CampaignDraft | null;
  allContacts: NormalizedContact[];
  onCancel: () => void;
  onSaved: (savedDraft: CampaignDraft) => void;
}

const STEPS = [
  { id: 1, title: 'Details', desc: 'Name & Objective' },
  { id: 2, title: 'Template', desc: 'Approved Meta Template' },
  { id: 3, title: 'Language', desc: 'Select Translation' },
  { id: 4, title: 'Variables', desc: 'Map Placeholders' },
  { id: 5, title: 'Audience', desc: 'Filter Recipients' },
  { id: 6, title: 'Preview', desc: 'Live Simulation' },
  { id: 7, title: 'Summary', desc: 'Validation & Save' },
];

const OBJECTIVES: Array<{ id: CampaignObjective; label: string; desc: string }> = [
  { id: 'project_launch', label: '🚀 Project Launch', desc: 'Announce new towers, luxury phases, or project kickoffs' },
  { id: 'lead_reengagement', label: '🔄 Lead Re-engagement', desc: 'Re-ignite inactive buyers with fresh updates' },
  { id: 'open_house', label: '🏡 Open House / Site Visit', desc: 'Drive weekend visits to experience centers' },
  { id: 'price_alert', label: '💰 Price Advantage Alert', desc: 'Time-sensitive pricing or pre-launch incentives' },
  { id: 'event_invitation', label: '🎟️ VIP Event Invitation', desc: 'Private showcases, groundbreakings, or cocktail previews' },
  { id: 'general_promotional', label: '📢 General Promotional', desc: 'Quarterly newsletters or brand campaigns' },
];

export const CampaignComposerWizard: React.FC<CampaignComposerWizardProps> = ({
  initialDraft,
  allContacts,
  onCancel,
  onSaved,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const approvedTemplates = getApprovedTemplates();

  // Wizard Form State
  const [name, setName] = useState<string>(initialDraft?.name || '');
  const [objective, setObjective] = useState<CampaignObjective>(
    initialDraft?.objective || 'project_launch'
  );
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    initialDraft?.templateId || approvedTemplates[0]?.id || ''
  );
  const [languageCode, setLanguageCode] = useState<string>(
    initialDraft?.languageCode || approvedTemplates[0]?.defaultLanguage || 'en_US'
  );
  const [variableMappings, setVariableMappings] = useState<VariableMapping[]>(
    initialDraft?.variableMappings || []
  );
  const [filterCriteria, setFilterCriteria] = useState<AudienceFilterCriteria>(
    initialDraft?.audienceFilters || { sourceType: 'all' }
  );

  // Recipient Simulation State
  const [simulatedRecipientIndex, setSimulatedRecipientIndex] = useState<number>(0);

  // Active Template & Translation
  const selectedTemplate = getTemplateById(selectedTemplateId) || approvedTemplates[0];
  const activeTranslation =
    selectedTemplate?.translations.find((t) => t.code === languageCode) ||
    selectedTemplate?.translations[0];

  // Initialize smart default variable mappings when template changes
  useEffect(() => {
    if (!activeTranslation) return;
    const placeholders = getTemplatePlaceholders(activeTranslation.components);

    // Only update if existing mappings don't match
    const newMappings: VariableMapping[] = placeholders.map(({ placeholder, componentType }, idx) => {
      const existing = variableMappings.find(
        (m) => m.placeholder === placeholder && m.componentType === componentType
      );
      if (existing) return existing;

      // Smart defaults based on common patterns
      let sourceField: StandardField = 'name';
      let fallback = 'Valued Buyer';
      let staticVal = '';
      let sourceType: 'field' | 'static' = 'field';

      if (idx === 1) {
        sourceField = 'propertyInterest';
        fallback = 'our premier project';
      } else if (idx === 2) {
        sourceField = 'location';
        fallback = 'Hyderabad';
      } else if (idx === 3) {
        sourceField = 'budget';
        fallback = 'Competitive Market Pricing';
      }

      return {
        placeholder,
        componentType,
        sourceType,
        sourceField,
        staticValue: staticVal,
        fallbackValue: fallback,
      };
    });

    setVariableMappings(newMappings);
  }, [selectedTemplateId, languageCode]);

  // Recalculate audience stats reactively
  const { stats: audienceStats, eligibleContacts } = calculateAudienceEligibility(
    allContacts,
    filterCriteria
  );

  // Current recipient for preview
  const activeRecipient =
    eligibleContacts.length > 0
      ? eligibleContacts[simulatedRecipientIndex % eligibleContacts.length]
      : {
          name: 'Rajesh Kumar',
          propertyInterest: 'The Cascades',
          location: 'Neopolis, Kokapet',
          budget: '₹2.5 - 3.5 Cr',
          bhk: '3 BHK',
        };

  // Draft Validation Check
  const draftToValidate: CampaignDraft = {
    id: initialDraft?.id || `draft_${Date.now()}`,
    name,
    objective,
    templateId: selectedTemplate?.id || '',
    templateName: selectedTemplate?.name || '',
    languageCode,
    variableMappings,
    audienceFilters: filterCriteria,
    audienceStats,
    status: 'draft',
    createdAt: initialDraft?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    auditTrail: initialDraft?.auditTrail || [],
  };

  const validation = validateCampaignDraft(draftToValidate);

  // Handle Save Draft (Persists to Staging PostgreSQL DB & Local State)
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveDraft = async () => {
    if (!validation.isValid) {
      alert(`Please fix validation errors before saving:\n- ${validation.errors.join('\n- ')}`);
      return;
    }

    setIsSaving(true);
    try {
      // 1. Prepare recipients from eligibleContacts
      const audiencePool = eligibleContacts.length > 0 ? eligibleContacts : allContacts;
      const dbRecipients = audiencePool.map((c) => ({
        phone: c.formattedPhone || c.rawPhone || '',
        normalizedPhone: c.normalizedPhone || c.rawPhone.replace(/\D/g, ''),
        name: c.name || 'Valued Buyer',
        variables: variableMappings.reduce((acc, m) => {
          acc[m.placeholder] =
            m.sourceType === 'static'
              ? m.staticValue || m.fallbackValue
              : (c as any)[m.sourceField || 'name'] || m.fallbackValue;
          return acc;
        }, {} as Record<string, string>),
        consentStatus: (c.consent?.status as any) || 'unverified',
        consentSource: c.consent?.source || 'staged_import',
      }));

      // 2. Persist to Staging PostgreSQL Database (status: 'draft')
      let stagingCampaignId = draftToValidate.id;
      try {
        const res = await createStagingCampaignDraft({
          name: draftToValidate.name,
          description: `WhatsApp campaign using ${draftToValidate.templateName}`,
          campaignType: draftToValidate.objective,
          templateName: draftToValidate.templateName,
          templateLanguage: draftToValidate.languageCode,
          templateSnapshot: selectedTemplate,
          variableMappings: draftToValidate.variableMappings,
          audienceSource: 'combined',
          recipients: dbRecipients,
        });
        if (res.success && res.campaignId) {
          stagingCampaignId = res.campaignId;
        }
      } catch (dbErr) {
        console.warn('[Composer] DB insert failed, falling back to local draft state:', dbErr);
      }

      const finalDraftToSave: CampaignDraft = {
        ...draftToValidate,
        id: stagingCampaignId,
      };

      const saved = saveCampaignDraft(
        finalDraftToSave,
        'Staff Admin',
        initialDraft ? 'Updated campaign draft configuration' : 'Created new campaign draft'
      );
      onSaved(saved);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Wizard Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
              Stage 3 Composer
            </span>
            <span className="text-xs text-slate-400">Step {currentStep} of {STEPS.length}</span>
          </div>
          <h2 className="text-lg font-bold text-slate-100">
            {initialDraft ? 'Edit Campaign Draft' : 'Create WhatsApp Campaign Draft'}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            className="border-slate-700 text-slate-300 hover:bg-slate-800 text-xs"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSaveDraft}
            disabled={!name.trim()}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow"
          >
            <Save className="w-3.5 h-3.5" />
            Save as Draft
          </Button>
        </div>
      </div>

      {/* Progress Step Indicator */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[620px] gap-2">
          {STEPS.map((s) => {
            const isDone = currentStep > s.id;
            const isCurrent = currentStep === s.id;
            return (
              <div
                key={s.id}
                onClick={() => setCurrentStep(s.id)}
                className={`flex-1 flex items-center gap-2.5 p-2 rounded-xl cursor-pointer transition-all ${
                  isCurrent
                    ? 'bg-amber-500/15 border border-amber-500/40 text-amber-300'
                    : isDone
                    ? 'text-emerald-400 hover:bg-slate-800/40'
                    : 'text-slate-500 hover:bg-slate-800/20'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isCurrent
                      ? 'bg-amber-500 text-slate-950'
                      : isDone
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isDone ? <Check className="w-3.5 h-3.5" /> : s.id}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate leading-tight">{s.title}</div>
                  <div className="text-[10px] text-slate-400 truncate">{s.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wizard Step Body */}
      <div className="min-h-[420px]">
        {/* STEP 1: Campaign Details */}
        {currentStep === 1 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-100">Step 1: Campaign Name & Strategic Objective</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Define the promotional initiative title and internal classification for reporting.
              </p>
            </div>

            <div className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Campaign Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. The Cascades Neopolis — Q4 Investor Showcase"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Campaign Objective <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {OBJECTIVES.map((obj) => (
                    <div
                      key={obj.id}
                      onClick={() => setObjective(obj.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        objective === obj.id
                          ? 'bg-amber-500/10 border-amber-500 text-slate-100 ring-1 ring-amber-500/30'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-200">{obj.label}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">{obj.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Template Selection */}
        {currentStep === 2 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-100">Step 2: Select Meta WhatsApp Template</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Only templates approved by Meta for marketing or utility can be attached to campaigns.
                </p>
              </div>
              <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                {approvedTemplates.length} Approved Available
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {approvedTemplates.map((tmpl) => {
                const defaultTrans = tmpl.translations.find((t) => t.code === tmpl.defaultLanguage) ||
                  tmpl.translations[0];
                const isSelected = selectedTemplateId === tmpl.id;

                return (
                  <div
                    key={tmpl.id}
                    onClick={() => {
                      setSelectedTemplateId(tmpl.id);
                      setLanguageCode(tmpl.defaultLanguage);
                    }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-slate-950 border-amber-500 ring-1 ring-amber-500/40 shadow-lg shadow-amber-950/20'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950/80'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono text-xs font-bold text-slate-100">{tmpl.name}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        Approved
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 mb-3">
                      {defaultTrans.components.find((c) => c.type === 'BODY')?.text}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                      <span className="text-purple-300 font-medium">{tmpl.category}</span>
                      <span>{tmpl.translations.length} Language{tmpl.translations.length > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Language Selection */}
        {currentStep === 3 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-100">Step 3: Select Template Language</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Choose from approved Meta language translations configured for template <span className="font-mono text-amber-400">{selectedTemplate.name}</span>.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl">
              {selectedTemplate.translations.map((trans) => {
                const isSelected = languageCode === trans.code;
                return (
                  <div
                    key={trans.code}
                    onClick={() => setLanguageCode(trans.code)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500 ring-1 ring-amber-500/30'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold text-slate-200">{trans.code}</span>
                      <span className="text-[10px] font-medium text-emerald-400">{trans.status}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-100">{trans.languageName}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: Variable Mapping */}
        {currentStep === 4 && activeTranslation && (
          <VariableMapperCard
            components={activeTranslation.components}
            mappings={variableMappings}
            onChangeMappings={setVariableMappings}
          />
        )}

        {/* STEP 5: Audience Selection */}
        {currentStep === 5 && (
          <AudienceSelectionCard
            allContacts={allContacts}
            filterCriteria={filterCriteria}
            onChangeFilterCriteria={setFilterCriteria}
            audienceStats={audienceStats}
          />
        )}

        {/* STEP 6: Live Simulation & Preview */}
        {currentStep === 6 && activeTranslation && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-emerald-400" />
                  Live Recipient Personalization Simulator
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Inspect how each verified recipient will view this WhatsApp message with personalized data.
                </p>
              </div>

              {eligibleContacts.length > 0 && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400">
                    Recipient {simulatedRecipientIndex + 1} of {eligibleContacts.length}:
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={simulatedRecipientIndex === 0}
                    onClick={() => setSimulatedRecipientIndex((p) => Math.max(0, p - 1))}
                    className="h-7 px-2 border-slate-700 text-slate-300"
                  >
                    Previous
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={simulatedRecipientIndex >= eligibleContacts.length - 1}
                    onClick={() => setSimulatedRecipientIndex((p) => p + 1)}
                    className="h-7 px-2 border-slate-700 text-slate-300"
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Recipient Card & Variable Inspection (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">Active Simulated Recipient</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      Verified Opt-In
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[11px]">Name:</span>
                      <span className="font-semibold text-slate-200">{activeRecipient.name || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Phone:</span>
                      <span className="font-mono text-slate-200">{activeRecipient.formattedPhone || activeRecipient.rawPhone || '+91 94939 43946'}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Location:</span>
                      <span className="text-slate-200">{activeRecipient.location || 'Neopolis, Kokapet'}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Project:</span>
                      <span className="text-slate-200">{activeRecipient.propertyInterest || 'The Cascades'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                  <h5 className="text-xs font-bold text-slate-200">Interpolated Values Table</h5>
                  <div className="space-y-1.5">
                    {variableMappings.map((m) => {
                      const val =
                        m.sourceType === 'static'
                          ? m.staticValue || m.fallbackValue
                          : (activeRecipient as any)[m.sourceField || 'name'] || m.fallbackValue;

                      return (
                        <div
                          key={`${m.componentType}_${m.placeholder}`}
                          className="flex items-center justify-between text-xs py-1 border-b border-slate-800/60"
                        >
                          <span className="font-mono text-amber-400">{m.placeholder} ({m.componentType})</span>
                          <span className="text-slate-200 font-medium">"{val}"</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Phone Simulator (5 cols) */}
              <div className="lg:col-span-5 flex justify-center">
                <WhatsAppPhonePreview
                  components={activeTranslation.components}
                  variableMappings={variableMappings}
                  recipientData={activeRecipient}
                  highlightVariables={false}
                  businessName="Naani Projects"
                  senderPhone="+91 94939 43946"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: Summary & Validation */}
        {currentStep === 7 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-100">Step 7: Pre-Flight Summary & Validation</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Review all configuration parameters before saving draft. No messages will be dispatched.
              </p>
            </div>

            {/* Validation Alerts */}
            {!validation.isValid ? (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-xs text-red-300 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-red-400">
                  <AlertTriangle className="w-4 h-4" />
                  Configuration Validation Failed
                </div>
                <ul className="list-disc list-inside space-y-0.5 pl-1">
                  {validation.errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>All template variables, language translations, and audience criteria passed validation!</span>
              </div>
            )}

            {validation.warnings.length > 0 && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-xs text-amber-300 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-400">
                  <Info className="w-4 h-4" />
                  Safety & Compliance Warnings
                </div>
                <ul className="list-disc list-inside space-y-0.5 pl-1">
                  {validation.warnings.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Campaign Title</span>
                <span className="text-xs font-bold text-slate-100 mt-0.5 block truncate">{name}</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Template Name</span>
                <span className="text-xs font-bold font-mono text-slate-100 mt-0.5 block truncate">
                  {selectedTemplate.name}
                </span>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Language</span>
                <span className="text-xs font-bold font-mono text-slate-100 mt-0.5 block">
                  {languageCode}
                </span>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30">
                <span className="text-[11px] text-emerald-400 font-bold block">Final Sendable Audience</span>
                <span className="text-base font-extrabold text-emerald-300 mt-0.5 block">
                  {audienceStats.eligibleAudience.toLocaleString()} verified contacts
                </span>
              </div>
            </div>

            {/* Stage 3 Notice */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-400 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-200">Strict Safety Enforcement:</span> Saving this campaign will store it safely in <span className="text-amber-400 font-semibold">draft</span> status. No messages will be dispatched to Meta or recipients until Stage 4 campaign execution is scheduled and explicitly authorized.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Controls Footer */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <Button
          variant="outline"
          size="sm"
          disabled={currentStep === 1}
          onClick={() => setCurrentStep((p) => Math.max(1, p - 1))}
          className="border-slate-700 text-slate-300 hover:bg-slate-800 text-xs flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Previous Step
        </Button>

        <div className="flex items-center gap-2">
          {currentStep < STEPS.length ? (
            <Button
              size="sm"
              onClick={() => setCurrentStep((p) => Math.min(STEPS.length, p + 1))}
              disabled={currentStep === 1 && !name.trim()}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5"
            >
              Next Step
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={handleSaveDraft}
              disabled={!validation.isValid}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs px-5 py-2 rounded-xl flex items-center gap-1.5 shadow-lg shadow-emerald-950/40"
            >
              <CheckCircle2 className="w-4 h-4" />
              Save Campaign Draft
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
