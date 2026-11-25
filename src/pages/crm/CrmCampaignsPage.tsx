// ==============================================================================
// CRM WhatsApp Campaign Manager — Stage 5D Integration
// Route: /crm/campaigns
// Dedicated Navigation:
// 1. Campaign Dashboard
// 2. Create Campaign (7-Step Wizard)
// 3. Campaign History
// 4. Templates (Approved Meta Library)
// 5. Contact Imports (CSV/Excel Ingestion)
// 6. Suppression List
// 7. Campaign Settings
// ==============================================================================

import React, { useState, useEffect } from 'react';
import {
  Activity,
  Send,
  Plus,
  History,
  BookOpen,
  FileSpreadsheet,
  ShieldAlert,
  Settings,
  Users,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  Download,
  RotateCw,
  Receipt
} from 'lucide-react';
import { Button } from '@/components/ui/button';

import { CampaignDashboardView } from '@/components/crm/campaigns/CampaignDashboardView';
import { CampaignHistoryView } from '@/components/crm/campaigns/CampaignHistoryView';
import { SuppressionListView } from '@/components/crm/campaigns/SuppressionListView';
import { CampaignSettingsView } from '@/components/crm/campaigns/CampaignSettingsView';
import { CampaignBillingView } from '@/components/crm/campaigns/CampaignBillingView';
import { TemplateLibraryTab } from '@/components/crm/campaigns/TemplateLibraryTab';
import { CampaignComposerWizard } from '@/components/crm/campaigns/CampaignComposerWizard';
import { CampaignMonitoringDashboard } from '@/components/crm/campaigns/CampaignMonitoringDashboard';
import { FileDropzone } from '@/components/crm/campaigns/FileDropzone';
import { ColumnMapper } from '@/components/crm/campaigns/ColumnMapper';
import { ConsentConfigCard } from '@/components/crm/campaigns/ConsentConfigCard';
import { ImportProgressModal } from '@/components/crm/campaigns/ImportProgressModal';
import { ImportSummaryCard } from '@/components/crm/campaigns/ImportSummaryCard';
import { AudienceFilterPanel } from '@/components/crm/campaigns/AudienceFilterPanel';
import { AudiencePreviewTable } from '@/components/crm/campaigns/AudiencePreviewTable';

import { parseSpreadsheetFile } from '@/lib/campaignImport/fileParser';
import { autoDetectColumnMappings } from '@/lib/campaignImport/columnMapper';
import { processSpreadsheetImport } from '@/lib/campaignImport/importEngine';
import { filterCampaignAudience } from '@/lib/campaignImport/audienceFilter';
import {
  fetchExistingCrmLeadPhones,
  getSuppressedPhones,
  getImportHistory,
  saveImportRecord,
  getStagedContacts,
  saveStagedContacts
} from '@/lib/campaignImport/importStorage';

import {
  RawParsedRow,
  ColumnMapping,
  NormalizedContact,
  ImportValidationReport,
  ConsentMetadata,
  StandardField,
  AudienceFilterCriteria,
  ImportHistoryRecord
} from '@/lib/campaignImport/types';

import {
  CampaignDraft,
  WhatsAppTemplate,
} from '@/lib/campaignComposer/types';
import {
  getCampaignDrafts,
  deleteCampaignDraft,
} from '@/lib/campaignComposer/campaignStorage';
import {
  StagingCampaignRecord,
} from '@/lib/campaignStagingService';

type CampaignTab =
  | 'dashboard'
  | 'create'
  | 'history'
  | 'templates'
  | 'imports'
  | 'suppression'
  | 'billing'
  | 'settings';

export const CrmCampaignsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CampaignTab>('dashboard');

  // Composer & Monitoring State
  const [drafts, setDrafts] = useState<CampaignDraft[]>([]);
  const [editingDraft, setEditingDraft] = useState<CampaignDraft | null>(null);
  const [monitoredDraft, setMonitoredDraft] = useState<CampaignDraft | null>(null);

  // Import State Machine: 'idle' | 'mapped' | 'processing' | 'completed'
  const [importStep, setImportStep] = useState<'idle' | 'mapped' | 'processing' | 'completed'>('idle');
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [parsedRows, setParsedRows] = useState<RawParsedRow[]>([]);
  const [columnMappings, setColumnMappings] = useState<ColumnMapping[]>([]);

  // Consent Metadata (Strict compliance: defaults to unverified)
  const [consentConfig, setConsentConfig] = useState<ConsentMetadata>({
    status: 'unverified',
    source: 'unverified_import',
    capturedAt: new Date().toISOString(),
  });

  // Progress & Report State
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedCount, setProcessedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [validationReport, setValidationReport] = useState<ImportValidationReport | null>(null);
  const [processingTimeMs, setProcessingTimeMs] = useState<number>(0);

  // Audience & Staged Contacts
  const [allContacts, setAllContacts] = useState<NormalizedContact[]>([]);
  const [filterCriteria, setFilterCriteria] = useState<AudienceFilterCriteria>({
    sourceType: 'all',
  });
  const [importHistory, setImportHistory] = useState<ImportHistoryRecord[]>([]);

  // Load initial contacts, history & campaign drafts
  useEffect(() => {
    const history = getImportHistory();
    setImportHistory(history);
    const staged = getStagedContacts();
    if (staged.length > 0) {
      setAllContacts(staged);
    }
    const loadedDrafts = getCampaignDrafts();
    setDrafts(loadedDrafts);
  }, []);

  // Convert Staging Record to Draft for Monitoring
  const convertStagingToDraft = (camp: StagingCampaignRecord): CampaignDraft => {
    return {
      id: camp.id,
      name: camp.name,
      objective: (camp.campaign_type as any) || 'project_launch',
      templateId: camp.template_name,
      templateName: camp.template_name,
      languageCode: camp.template_language,
      variableMappings: [],
      audienceFilters: { sourceType: 'all' },
      audienceStats: {
        totalContacts: camp.total_recipients,
        validContacts: camp.eligible_recipients,
        verifiedOptInContacts: camp.eligible_recipients,
        unverifiedContacts: camp.excluded_count,
        suppressedContacts: camp.opted_out_count,
        duplicateContacts: 0,
        eligibleAudience: camp.eligible_recipients,
      },
      status: (camp.status as any) || 'draft',
      createdAt: camp.created_at,
      updatedAt: camp.updated_at,
      auditTrail: [
        {
          timestamp: camp.created_at,
          action: 'Loaded from Staging Database',
          actor: 'Staff Admin',
          details: `Campaign ID: ${camp.id}`,
        },
      ],
    };
  };

  // 1. Handle File Upload
  const handleFileSelected = async (file: File) => {
    try {
      setCurrentFile(file);
      setIsProcessing(true);
      const parsed = await parseSpreadsheetFile(file);
      setParsedRows(parsed.rows);
      const mappings = autoDetectColumnMappings(parsed.headers, parsed.rows);
      setColumnMappings(mappings);
      setImportStep('mapped');
    } catch (err: any) {
      alert(`Error reading file: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // 2. Handle Mapping Updates
  const handleMappingChange = (fileHeader: string, newTarget: StandardField) => {
    setColumnMappings((prev) =>
      prev.map((m) => (m.fileHeader === fileHeader ? { ...m, targetField: newTarget } : m))
    );
  };

  // 3. Execute Processing & Validation
  const handleStartImport = async () => {
    if (!currentFile || parsedRows.length === 0) return;

    setIsProcessing(true);
    setImportStep('processing');
    setTotalCount(parsedRows.length);
    setProcessedCount(0);

    try {
      const crmPhones = await fetchExistingCrmLeadPhones();
      const suppressedPhones = getSuppressedPhones();

      const result = await processSpreadsheetImport({
        rows: parsedRows,
        columnMappings,
        defaultConsent: consentConfig,
        existingCrmPhones: crmPhones,
        suppressedPhones,
        chunkSize: 500,
        onProgress: (done, total) => {
          setProcessedCount(done);
          setTotalCount(total);
        },
      });

      setValidationReport(result.report);
      setProcessingTimeMs(result.processingTimeMs);

      const updatedContacts = [...result.contacts, ...allContacts];
      setAllContacts(updatedContacts);
      saveStagedContacts(updatedContacts);

      const historyRec: ImportHistoryRecord = {
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        originalFilename: currentFile.name,
        fileSizeBytes: currentFile.size,
        totalRows: result.report.totalRows,
        validRows: result.report.validRows,
        invalidRows: result.report.invalidRows,
        duplicateRows: result.report.duplicateInFileRows,
        excludedRows: result.report.suppressedRows,
        consentEligibleRows: result.report.consentEligibleRows,
        columnMapping: columnMappings.reduce((acc, m) => {
          acc[m.fileHeader] = m.targetField;
          return acc;
        }, {} as Record<string, StandardField>),
        errorReport: result.report.errors.slice(0, 100),
        importedBy: 'Staff Admin',
        createdAt: new Date().toISOString(),
      };
      saveImportRecord(historyRec);
      setImportHistory(getImportHistory());

      setImportStep('completed');
    } catch (err: any) {
      alert(`Import validation failed: ${err.message}`);
      setImportStep('mapped');
    } finally {
      setIsProcessing(false);
    }
  };

  // Load Fixture Test Data for quick verification
  const loadDemoFixture = (fixtureType: 'sample' | 'large_stress') => {
    const isStress = fixtureType === 'large_stress';
    const rowCount = isStress ? 10000 : 25;

    const mockHeaders = ['Full Name', 'Mobile Number', 'Preferred Location', 'Budget', 'Property Interest', 'BHK'];
    const locations = ['Neopolis, Kokapet', 'Gachibowli', 'Financial District', 'Tellapur', 'Miyapur', 'Bachupally'];
    const budgets = ['₹1.5 - 2.5 Cr', '₹2.5 - 4 Cr', '₹4 - 7 Cr', '₹7 Cr+'];
    const properties = ['The Cascades', 'Rise with 9', 'Pavani Mirai', 'Aparna Serenity', 'Urbanrise On Cloud 33'];
    const bhks = ['2 BHK', '3 BHK', '4 BHK'];

    const rows: RawParsedRow[] = [];
    for (let i = 1; i <= rowCount; i++) {
      let phone = `9198${String(i).padStart(8, '0')}`;
      if (i === 3) phone = '9999999999'; // suppressed fixture
      if (i === 5) phone = '12345'; // invalid fixture
      if (i === 10) phone = '919800000001'; // duplicate
      if (i === 15) phone = '919000000001';

      rows.push({
        rowIndex: i,
        data: {
          'Full Name': `Lead ${i} Kumar`,
          'Mobile Number': phone,
          'Preferred Location': locations[i % locations.length],
          'Budget': budgets[i % budgets.length],
          'Property Interest': properties[i % properties.length],
          'BHK': bhks[i % bhks.length],
        },
      });
    }

    setParsedRows(rows);
    const mappings = autoDetectColumnMappings(mockHeaders, rows);
    setColumnMappings(mappings);
    setCurrentFile(new File([''], isStress ? '10k_recipients_stress_test.csv' : 'hyderabad_buyers_sample.xlsx'));
    setImportStep('mapped');
    setActiveTab('imports');
  };

  const handleResetImport = () => {
    setImportStep('idle');
    setCurrentFile(null);
    setParsedRows([]);
    setColumnMappings([]);
    setValidationReport(null);
  };

  // Composer Handlers
  const handleOpenComposer = (draft?: CampaignDraft | null) => {
    setEditingDraft(draft || null);
    setActiveTab('create');
  };

  const handleSelectTemplateForCampaign = (template: WhatsAppTemplate, languageCode: string) => {
    setEditingDraft({
      id: `draft_${Date.now()}`,
      name: `${template.name.replace(/_/g, ' ')} Campaign`,
      objective: template.category === 'MARKETING' ? 'project_launch' : 'lead_reengagement',
      templateId: template.id,
      templateName: template.name,
      languageCode,
      variableMappings: [],
      audienceFilters: { sourceType: 'all' },
      audienceStats: {
        totalContacts: allContacts.length,
        validContacts: allContacts.filter((c) => c.isValid).length,
        verifiedOptInContacts: allContacts.filter((c) => c.consent.status === 'opted_in').length,
        unverifiedContacts: allContacts.filter((c) => c.consent.status === 'unverified').length,
        suppressedContacts: allContacts.filter((c) => c.isSuppressed).length,
        duplicateContacts: 0,
        eligibleAudience: allContacts.filter(
          (c) => c.isValid && c.consent.status === 'opted_in' && !c.isSuppressed
        ).length,
      },
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      auditTrail: [
        {
          timestamp: new Date().toISOString(),
          action: 'Created draft from Template Library',
          actor: 'Staff Admin',
          details: `Selected template: ${template.name} (${languageCode})`,
        },
      ],
    });
    setActiveTab('create');
  };

  const handleDraftSaved = (savedDraft: CampaignDraft) => {
    setDrafts(getCampaignDrafts());
    setEditingDraft(null);
    setActiveTab('history');
  };

  const filteredAudience = filterCampaignAudience(allContacts, filterCriteria);

  // If currently monitoring a campaign, render the live dispatch telemetry view
  if (monitoredDraft) {
    return (
      <CampaignMonitoringDashboard
        draft={monitoredDraft}
        allContacts={allContacts}
        onBack={() => setMonitoredDraft(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Main Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <Send className="w-5 h-5 text-amber-400" />
              WhatsApp Campaign Manager
            </h1>
            <span className="text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono uppercase font-bold">
              Production: lpbdwmpglwdedqdiovqu
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Enterprise WhatsApp campaign manager connected to production Supabase backend (<code className="text-emerald-400">lpbdwmpglwdedqdiovqu</code>) with dry-run safety lock and Meta Cloud API observability.
          </p>
        </div>

        {/* Global Quick Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => loadDemoFixture('sample')}
            className="border-slate-700 bg-slate-800/80 text-slate-200 hover:bg-slate-700 text-xs h-8"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
            Load Sample CSV
          </Button>

          <Button
            size="sm"
            onClick={() => handleOpenComposer()}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs h-8 px-3.5 rounded-lg shadow flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Create Campaign
          </Button>
        </div>
      </div>

      {/* 7 Dedicated Sub-Navigation Tabs (Section 3 Requirement) */}
      <div className="flex border-b border-slate-800 gap-1 sm:gap-4 text-xs font-medium overflow-x-auto pb-px">
        {/* 1. Campaign Dashboard */}
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`pb-3 px-2 flex items-center gap-1.5 transition-colors relative whitespace-nowrap ${
            activeTab === 'dashboard' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Campaign Dashboard</span>
          {activeTab === 'dashboard' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-t-full" />
          )}
        </button>

        {/* 2. Create Campaign */}
        <button
          onClick={() => handleOpenComposer()}
          className={`pb-3 px-2 flex items-center gap-1.5 transition-colors relative whitespace-nowrap ${
            activeTab === 'create' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Create Campaign</span>
          {activeTab === 'create' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-t-full" />
          )}
        </button>

        {/* 3. Campaign History */}
        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 px-2 flex items-center gap-1.5 transition-colors relative whitespace-nowrap ${
            activeTab === 'history' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Campaign History</span>
          {activeTab === 'history' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-t-full" />
          )}
        </button>

        {/* 4. Templates */}
        <button
          onClick={() => setActiveTab('templates')}
          className={`pb-3 px-2 flex items-center gap-1.5 transition-colors relative whitespace-nowrap ${
            activeTab === 'templates' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Templates</span>
          {activeTab === 'templates' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-t-full" />
          )}
        </button>

        {/* 5. Contact Imports */}
        <button
          onClick={() => setActiveTab('imports')}
          className={`pb-3 px-2 flex items-center gap-1.5 transition-colors relative whitespace-nowrap ${
            activeTab === 'imports' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Contact Imports</span>
          {activeTab === 'imports' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-t-full" />
          )}
        </button>

        {/* 6. Suppression List */}
        <button
          onClick={() => setActiveTab('suppression')}
          className={`pb-3 px-2 flex items-center gap-1.5 transition-colors relative whitespace-nowrap ${
            activeTab === 'suppression' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Suppression List</span>
          {activeTab === 'suppression' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-t-full" />
          )}
        </button>

        {/* 7. Billing & Observability */}
        <button
          onClick={() => setActiveTab('billing')}
          className={`pb-3 px-2 flex items-center gap-1.5 transition-colors relative whitespace-nowrap ${
            activeTab === 'billing' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>Billing & Observability</span>
          {activeTab === 'billing' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-t-full" />
          )}
        </button>

        {/* 8. Campaign Settings */}
        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 px-2 flex items-center gap-1.5 transition-colors relative whitespace-nowrap ${
            activeTab === 'settings' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Campaign Settings</span>
          {activeTab === 'settings' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-t-full" />
          )}
        </button>
      </div>

      {/* TAB 1: CAMPAIGN DASHBOARD */}
      {activeTab === 'dashboard' && (
        <CampaignDashboardView
          onNavigateToTab={(t) => setActiveTab(t as CampaignTab)}
          onMonitorCampaign={(camp) => setMonitoredDraft(convertStagingToDraft(camp))}
        />
      )}

      {/* TAB 2: CREATE CAMPAIGN WIZARD */}
      {activeTab === 'create' && (
        <CampaignComposerWizard
          initialDraft={editingDraft}
          allContacts={allContacts}
          onCancel={() => {
            setEditingDraft(null);
            setActiveTab('dashboard');
          }}
          onSaved={handleDraftSaved}
        />
      )}

      {/* TAB 3: CAMPAIGN HISTORY */}
      {activeTab === 'history' && (
        <CampaignHistoryView
          onNewCampaign={() => handleOpenComposer()}
          onMonitorCampaign={(camp) => setMonitoredDraft(convertStagingToDraft(camp))}
        />
      )}

      {/* TAB 4: META TEMPLATES */}
      {activeTab === 'templates' && (
        <TemplateLibraryTab onSelectTemplate={handleSelectTemplateForCampaign} />
      )}

      {/* TAB 5: CONTACT IMPORTS & AUDIENCE INGESTION */}
      {activeTab === 'imports' && (
        <div className="space-y-6">
          {/* Top Audience Metric Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <span className="text-[10px] font-mono uppercase text-slate-400">Total Filtered Audience</span>
              <p className="text-xl font-bold text-slate-100 font-mono mt-0.5">
                {filteredAudience.totalAudience.toLocaleString()}
              </p>
              <span className="text-[11px] text-slate-500">From CRM and imports</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <span className="text-[10px] font-mono uppercase text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Sendable (Opted-In)
              </span>
              <p className="text-xl font-bold text-emerald-400 font-mono mt-0.5">
                {filteredAudience.sendableCount.toLocaleString()}
              </p>
              <span className="text-[11px] text-slate-500">Eligible for campaign dispatch</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <span className="text-[10px] font-mono uppercase text-amber-400 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Quarantined (Unverified)
              </span>
              <p className="text-xl font-bold text-amber-400 font-mono mt-0.5">
                {filteredAudience.unverifiedCount.toLocaleString()}
              </p>
              <span className="text-[11px] text-slate-500">Requires verified opt-in proof</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <span className="text-[10px] font-mono uppercase text-red-400">Suppressed / Duplicates</span>
              <p className="text-xl font-bold text-red-400 font-mono mt-0.5">
                {(filteredAudience.suppressedCount + filteredAudience.duplicateCount).toLocaleString()}
              </p>
              <span className="text-[11px] text-slate-500">Excluded from all sends</span>
            </div>
          </div>

          {/* Import Flow Area */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-amber-400" />
                  Import Spreadsheet (CSV / Excel)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Upload contacts up to 10,000 rows. E.164 normalization, deduplication, and unverified consent quarantine will be applied.
                </p>
              </div>

              {importStep !== 'idle' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetImport}
                  className="border-slate-700 text-slate-300 text-xs"
                >
                  Upload Another File
                </Button>
              )}
            </div>

            {importStep === 'idle' && (
              <FileDropzone onFileSelected={handleFileSelected} isProcessing={isProcessing} />
            )}

            {importStep === 'mapped' && (
              <div className="space-y-6">
                <ColumnMapper
                  mappings={columnMappings}
                  onMappingChange={handleMappingChange}
                />

                <ConsentConfigCard
                  consent={consentConfig}
                  onChange={setConsentConfig}
                />

                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={handleResetImport}
                    className="border-slate-700 text-slate-300 text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleStartImport}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4"
                  >
                    Run Ingestion & Validation
                  </Button>
                </div>
              </div>
            )}

            {importStep === 'processing' && (
              <ImportProgressModal
                isOpen={true}
                processedRows={processedCount}
                totalRows={totalCount}
                current={processedCount}
                total={totalCount}
                filename={currentFile?.name || 'spreadsheet.csv'}
              />
            )}

            {importStep === 'completed' && validationReport && (
              <ImportSummaryCard
                report={validationReport}
                processingTimeMs={processingTimeMs}
                filename={currentFile?.name || 'spreadsheet.csv'}
                onReset={handleResetImport}
                onViewAudience={() => setActiveTab('imports')}
              />
            )}
          </div>

          {/* Staged Audience Filtering & Preview */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" />
                Audience Filter & Verification Table
              </h3>
            </div>

            <AudienceFilterPanel
              criteria={filterCriteria}
              onChange={setFilterCriteria}
              availableLocations={['Neopolis, Kokapet', 'Gachibowli', 'Financial District', 'Tellapur', 'Miyapur', 'Bachupally']}
              availableProperties={['The Cascades', 'Rise with 9', 'Pavani Mirai', 'Aparna Serenity', 'Urbanrise On Cloud 33']}
              availableBudgets={['₹1.5 - 2.5 Cr', '₹2.5 - 4 Cr', '₹4 - 7 Cr', '₹7 Cr+']}
              availableBhkTypes={['2 BHK', '3 BHK', '4 BHK']}
              availableSources={['all', 'crm_lead', 'csv_import', 'web_form', 'walk_in']}
              onReset={() => setFilterCriteria({ sourceType: 'all' })}
            />

            <AudiencePreviewTable contacts={filteredAudience.contacts} />
          </div>
        </div>
      )}

      {/* TAB 6: SUPPRESSION LIST */}
      {activeTab === 'suppression' && (
        <SuppressionListView />
      )}

      {/* TAB 7: BILLING & OBSERVABILITY */}
      {activeTab === 'billing' && (
        <CampaignBillingView />
      )}

      {/* TAB 8: CAMPAIGN SETTINGS */}
      {activeTab === 'settings' && (
        <CampaignSettingsView />
      )}
    </div>
  );
};
