// ==============================================================================
// WhatsApp Template Library Browser, Author & Previewer (Gate 7)
// Full template lifecycle: Create, Edit Draft, Meta Submission, Approval Sync
// ==============================================================================

import React, { useState, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  PauseCircle,
  Smartphone,
  Sparkles,
  ArrowRight,
  Globe,
  Tag,
  ShieldCheck,
  AlertCircle,
  Plus,
  RotateCw,
  Edit3,
  Send,
  FileCode,
  Image as ImageIcon,
  HelpCircle,
  Phone,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  CrmWhatsAppTemplate,
  WhatsAppTemplateCategory,
  WhatsAppTemplateStatus,
  getTemplates,
  syncTemplatesWithMeta,
  submitTemplateToMeta
} from '@/lib/templateManagementService';
import { TemplateCreationModal } from './TemplateCreationModal';

interface TemplateLibraryTabProps {
  onSelectTemplate?: (template: CrmWhatsAppTemplate) => void;
}

export const TemplateLibraryTab: React.FC<TemplateLibraryTabProps> = ({
  onSelectTemplate,
}) => {
  const [templates, setTemplates] = useState<CrmWhatsAppTemplate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('ALL');

  // Preview & Modal State
  const [previewTemplate, setPreviewTemplate] = useState<CrmWhatsAppTemplate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<CrmWhatsAppTemplate | null>(null);

  // Load templates on mount
  const loadTemplateData = async () => {
    setLoading(true);
    try {
      const data = await getTemplates();
      setTemplates(data);
      if (data.length > 0 && !previewTemplate) {
        setPreviewTemplate(data[0]);
      }
    } catch (err) {
      console.error('Failed to load templates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTemplateData();
  }, []);

  // Sync with Meta handler
  const handleSyncMeta = async () => {
    setSyncing(true);
    setSyncNotice(null);
    try {
      const res = await syncTemplatesWithMeta();
      if (res.success) {
        setSyncNotice(`Synchronized ${res.count} templates from Meta WhatsApp Business Account.`);
        await loadTemplateData();
      } else {
        setSyncNotice(`Meta sync notice: ${res.error || 'Awaiting API connection'}`);
      }
    } catch (err: any) {
      setSyncNotice(`Sync exception: ${err.message}`);
    } finally {
      setSyncing(false);
      setTimeout(() => setSyncNotice(null), 5000);
    }
  };

  // Submit template directly from card
  const handleSubmitCard = async (tmpl: CrmWhatsAppTemplate) => {
    const res = await submitTemplateToMeta(tmpl);
    if (res.success) {
      setSyncNotice(`Template "${tmpl.template_name}" submitted to Meta. Status: ${res.status || 'PENDING'}`);
      await loadTemplateData();
    } else {
      setSyncNotice(`Submission failed: ${res.error}`);
    }
  };

  // Filtering
  const filteredTemplates = templates.filter((tmpl) => {
    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = tmpl.template_name.toLowerCase().includes(q);
      const matchBody = tmpl.components.some((c) => c.text?.toLowerCase().includes(q));
      if (!matchName && !matchBody) return false;
    }

    // Category
    if (selectedCategory !== 'ALL' && tmpl.category !== selectedCategory) {
      return false;
    }

    // Status
    if (selectedStatus !== 'ALL' && tmpl.status !== selectedStatus) {
      return false;
    }

    // Language
    if (selectedLanguage !== 'ALL' && tmpl.language !== selectedLanguage) {
      return false;
    }

    return true;
  });

  const getStatusBadge = (status: WhatsAppTemplateStatus) => {
    switch (status) {
      case 'APPROVED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" />
            Approved
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Clock className="w-3 h-3" />
            Pending Review
          </span>
        );
      case 'SUBMITTED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30">
            <Send className="w-3 h-3" />
            Submitted
          </span>
        );
      case 'DRAFT':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-500/15 text-slate-300 border border-slate-600">
            <FileCode className="w-3 h-3" />
            Draft
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/30">
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        );
      case 'PAUSED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-700/20 text-amber-300 border border-amber-600/40">
            <PauseCircle className="w-3 h-3" />
            Paused
          </span>
        );
      case 'DISABLED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-500 border border-slate-700">
            Disabled
          </span>
        );
      default:
        return null;
    }
  };

  const getCategoryBadge = (category: WhatsAppTemplateCategory) => {
    switch (category) {
      case 'MARKETING':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-purple-500/15 text-purple-300 border border-purple-500/30">
            Marketing
          </span>
        );
      case 'UTILITY':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-500/15 text-blue-300 border border-blue-500/30">
            Utility
          </span>
        );
      case 'AUTHENTICATION':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            Authentication
          </span>
        );
    }
  };

  // Preview component extraction
  const previewHeader = previewTemplate?.components.find((c) => c.type === 'HEADER');
  const previewBody = previewTemplate?.components.find((c) => c.type === 'BODY');
  const previewFooter = previewTemplate?.components.find((c) => c.type === 'FOOTER');
  const previewButtons = previewTemplate?.components.find((c) => c.type === 'BUTTONS')?.buttons || [];

  return (
    <div className="space-y-6">
      {/* Top Banner, Actions & Search Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Meta WhatsApp Template Lifecycle Manager
              </h3>
              <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold uppercase">
                v21.0 API
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Author, test, and submit templates directly to Meta WhatsApp Business API for approval.
              Approved templates automatically synchronize and power targeted campaign dispatches.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto">
            <Button
              size="sm"
              variant="outline"
              onClick={handleSyncMeta}
              disabled={syncing || loading}
              className="border-slate-700 text-slate-200 hover:bg-slate-800 text-xs h-9 flex-1 sm:flex-initial"
            >
              <RotateCw className={`w-3.5 h-3.5 mr-1.5 ${syncing ? 'animate-spin' : ''}`} />
              Refresh Meta Status
            </Button>

            <Button
              size="sm"
              onClick={() => {
                setEditingTemplate(null);
                setIsModalOpen(true);
              }}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs h-9 px-3.5 shadow-sm flex-1 sm:flex-initial"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Create Template
            </Button>
          </div>
        </div>

        {syncNotice && (
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-amber-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            {syncNotice}
          </div>
        )}

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-800/80">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="Search template name or text..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="ALL">All Categories</option>
              <option value="MARKETING">Marketing Only</option>
              <option value="UTILITY">Utility Only</option>
              <option value="AUTHENTICATION">Authentication Only</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="APPROVED">Approved Only</option>
              <option value="PENDING">Pending Review</option>
              <option value="DRAFT">Drafts Only</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="REJECTED">Rejected</option>
              <option value="PAUSED">Paused</option>
            </select>
          </div>

          {/* Language Filter */}
          <div>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="ALL">All Languages</option>
              <option value="en">English (en)</option>
              <option value="en_US">English US (en_US)</option>
              <option value="te">Telugu (te)</option>
              <option value="hi">Hindi (hi)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content: Left Template Cards List, Right Live WhatsApp Phone Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Template Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>
              Showing {filteredTemplates.length} of {templates.length} templates
            </span>
            <span className="font-mono text-slate-500">WABA: 1017083661443186</span>
          </div>

          <div className="space-y-3">
            {filteredTemplates.map((tmpl) => {
              const isSelected = previewTemplate?.id === tmpl.id;
              const isApproved = tmpl.status === 'APPROVED';
              const isDraft = tmpl.status === 'DRAFT';
              const isRejected = tmpl.status === 'REJECTED';
              const bodyComp = tmpl.components.find((c) => c.type === 'BODY');

              return (
                <div
                  key={tmpl.id}
                  onClick={() => setPreviewTemplate(tmpl)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900/90 border-amber-500/60 shadow-lg shadow-amber-950/20 ring-1 ring-amber-500/40'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono font-bold text-slate-100 text-sm">
                          {tmpl.template_name}
                        </span>
                        {getCategoryBadge(tmpl.category)}
                        {getStatusBadge(tmpl.status)}
                      </div>

                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                        {bodyComp?.text || 'No body text'}
                      </p>

                      {tmpl.description && (
                        <p className="text-[11px] text-slate-500 italic">
                          {tmpl.description}
                        </p>
                      )}
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] uppercase font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-400">
                        {tmpl.language}
                      </span>
                    </div>
                  </div>

                  {/* Rejection Banner */}
                  {isRejected && tmpl.rejection_reason && (
                    <div className="mt-3 p-2.5 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300 space-y-0.5">
                      <span className="font-bold flex items-center gap-1.5 text-red-400">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Meta Rejection Reason:
                      </span>
                      <p className="text-[11px] leading-relaxed">{tmpl.rejection_reason}</p>
                    </div>
                  )}

                  {/* Badges & Actions Footer */}
                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      {tmpl.variable_placeholders && tmpl.variable_placeholders.length > 0 ? (
                        <span className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 font-mono">
                          {tmpl.variable_placeholders.length} Variable{tmpl.variable_placeholders.length > 1 ? 's' : ''} ({tmpl.variable_placeholders.join(', ')})
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          Static Template (No Variables)
                        </span>
                      )}

                      {tmpl.header_type !== 'NONE' && (
                        <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 font-mono">
                          {tmpl.header_type} HEADER
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {(isDraft || isRejected) && (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditingTemplate(tmpl);
                              setIsModalOpen(true);
                            }}
                            className="h-7 text-[11px] text-slate-300 hover:text-amber-400 hover:bg-slate-800 px-2"
                          >
                            <Edit3 className="w-3 h-3 mr-1" />
                            Edit
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSubmitCard(tmpl)}
                            className="h-7 text-[11px] border-amber-500/30 text-amber-400 hover:bg-amber-500/10 px-2"
                          >
                            <Send className="w-3 h-3 mr-1" />
                            Submit
                          </Button>
                        </>
                      )}

                      {isApproved && onSelectTemplate && (
                        <Button
                          size="sm"
                          onClick={() => onSelectTemplate(tmpl)}
                          className="h-7 text-[11px] bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-2.5"
                        >
                          Select for Campaign
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Live WhatsApp Phone Simulator (5 cols) */}
        <div className="lg:col-span-5 sticky top-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  Live Phone Preview
                </h4>
                <p className="text-[11px] text-slate-500">
                  Exact rendering on customer WhatsApp handset
                </p>
              </div>

              {previewTemplate && getStatusBadge(previewTemplate.status)}
            </div>

            {previewTemplate ? (
              <div className="space-y-4">
                {/* Phone Frame */}
                <div className="bg-[#0b141a] rounded-3xl p-3 shadow-inner border-4 border-slate-800 space-y-2">
                  {/* Simulated Chat Header */}
                  <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800/80 px-1">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-slate-950 font-bold flex items-center justify-center text-xs shadow-sm">
                      N
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-100 block">Naani Projects</span>
                      <span className="text-[9px] text-emerald-400 block font-mono">Official WhatsApp</span>
                    </div>
                  </div>

                  {/* Chat Message Bubble */}
                  <div className="bg-[#1f2c34] rounded-2xl rounded-tl-none p-3.5 space-y-2.5 text-slate-100 shadow-md">
                    {/* Header Component */}
                    {previewHeader?.format === 'TEXT' && previewHeader.text && (
                      <div className="font-bold text-xs text-slate-100 pb-1 border-b border-slate-700/40">
                        {previewHeader.text}
                      </div>
                    )}

                    {previewHeader?.format === 'IMAGE' && (
                      <div className="rounded-xl overflow-hidden bg-slate-900 border border-slate-700/60 aspect-video flex items-center justify-center">
                        {previewHeader.example?.header_text?.[0] ? (
                          <img
                            src={previewHeader.example.header_text[0]}
                            alt="Header Media"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center p-3 text-slate-500 text-[10px]">
                            <ImageIcon className="w-6 h-6 mx-auto mb-1 text-slate-600" />
                            Image Header Preview
                          </div>
                        )}
                      </div>
                    )}

                    {/* Body Text */}
                    <div className="text-xs text-slate-200 whitespace-pre-line leading-relaxed">
                      {previewBody?.text || 'No body text configured.'}
                    </div>

                    {/* Footer Component */}
                    {previewFooter?.text && (
                      <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-700/30">
                        {previewFooter.text}
                      </div>
                    )}
                  </div>

                  {/* Buttons Component */}
                  {previewButtons.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      {previewButtons.map((btn, i) => (
                        <div
                          key={i}
                          className="bg-[#1f2c34] py-2 px-3 rounded-xl text-center text-xs text-emerald-400 font-semibold flex items-center justify-center gap-1.5 border border-slate-800"
                        >
                          {btn.type === 'PHONE_NUMBER' && <Phone className="w-3.5 h-3.5" />}
                          {btn.type === 'URL' && <ExternalLink className="w-3.5 h-3.5" />}
                          {btn.type === 'QUICK_REPLY' && <MessageSquare className="w-3.5 h-3.5" />}
                          <span>{btn.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Template Specifications Table */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-400">
                    <span>Meta Template ID:</span>
                    <span className="font-mono text-slate-200">
                      {previewTemplate.meta_template_id || 'Not Yet Submitted'}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Language:</span>
                    <span className="text-slate-200 font-mono">{previewTemplate.language}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Header Format:</span>
                    <span className="text-slate-200">{previewTemplate.header_type}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Quality Rating:</span>
                    <span className="text-emerald-400 font-bold">{previewTemplate.quality_score || 'HIGH'}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 text-xs">
                Select a template from the list to preview
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Template Creation / Editing Modal */}
      <TemplateCreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTemplate={editingTemplate}
        onSaved={async (saved) => {
          await loadTemplateData();
          setPreviewTemplate(saved);
        }}
      />
    </div>
  );
};
