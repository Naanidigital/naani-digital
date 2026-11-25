// ==============================================================================
// WhatsApp Template Library Browser & Previewer (Stage 3)
// ==============================================================================

import React, { useState } from 'react';
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  PauseCircle,
  Smartphone,
  Layers,
  Sparkles,
  ArrowRight,
  Globe,
  Tag,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  WhatsAppTemplate,
  WhatsAppTemplateCategory,
  WhatsAppTemplateStatus,
  TemplateTranslation
} from '@/lib/campaignComposer/types';
import {
  getAllWhatsAppTemplates,
  getTemplatePlaceholders
} from '@/lib/campaignComposer/templateService';
import { WhatsAppPhonePreview } from './WhatsAppPhonePreview';

interface TemplateLibraryTabProps {
  onSelectTemplate?: (template: WhatsAppTemplate, languageCode: string) => void;
}

export const TemplateLibraryTab: React.FC<TemplateLibraryTabProps> = ({
  onSelectTemplate,
}) => {
  const [templates] = useState<WhatsAppTemplate[]>(getAllWhatsAppTemplates());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('ALL');

  // Preview Modal / Pane State
  const [previewTemplate, setPreviewTemplate] = useState<WhatsAppTemplate | null>(templates[0] || null);
  const [previewLangCode, setPreviewLangCode] = useState<string>(templates[0]?.defaultLanguage || 'en_US');

  // Get active translation for preview
  const activeTranslation = previewTemplate?.translations.find((t) => t.code === previewLangCode) ||
    previewTemplate?.translations[0];

  // Filtering
  const filteredTemplates = templates.filter((tmpl) => {
    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = tmpl.name.toLowerCase().includes(q);
      const matchBody = tmpl.translations.some((t) =>
        t.components.some((c) => c.text?.toLowerCase().includes(q))
      );
      if (!matchName && !matchBody) return false;
    }

    // Category
    if (selectedCategory !== 'ALL' && tmpl.category !== selectedCategory) {
      return false;
    }

    // Status
    if (selectedStatus !== 'ALL') {
      const hasStatus = tmpl.translations.some((t) => t.status === selectedStatus);
      if (!hasStatus) return false;
    }

    // Language
    if (selectedLanguage !== 'ALL') {
      const hasLang = tmpl.translations.some((t) => t.code === selectedLanguage);
      if (!hasLang) return false;
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
      case 'REJECTED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/30">
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        );
      case 'PAUSED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-500/15 text-slate-400 border border-slate-500/30">
            <PauseCircle className="w-3 h-3" />
            Paused
          </span>
        );
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

  return (
    <div className="space-y-6">
      {/* Top Banner & Search Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Meta WhatsApp Template Library
            </h3>
            <p className="text-xs text-slate-400">
              Browse approved templates synced with WhatsApp Cloud API. Only approved marketing templates can be used in campaigns.
            </p>
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Read-only sync with Meta WABA Account</span>
          </div>
        </div>

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
              <option value="REJECTED">Rejected</option>
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
              <option value="en_US">English (US)</option>
              <option value="te">Telugu (తెలుగు)</option>
              <option value="hi">Hindi (हिन्दी)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content: Left Template Cards List, Right Live WhatsApp Phone Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Template Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Showing {filteredTemplates.length} of {templates.length} templates</span>
            <span>Meta API v21.0 Connected</span>
          </div>

          <div className="space-y-3">
            {filteredTemplates.map((tmpl) => {
              const defaultTrans = tmpl.translations.find((t) => t.code === tmpl.defaultLanguage) ||
                tmpl.translations[0];
              const isSelected = previewTemplate?.id === tmpl.id;
              const isApproved = tmpl.translations.some((t) => t.status === 'APPROVED');
              const placeholders = getTemplatePlaceholders(defaultTrans.components);

              return (
                <div
                  key={tmpl.id}
                  onClick={() => {
                    setPreviewTemplate(tmpl);
                    setPreviewLangCode(tmpl.defaultLanguage);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900/90 border-amber-500/60 shadow-lg shadow-amber-950/20 ring-1 ring-amber-500/40'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h4 className="text-sm font-bold text-slate-100 font-mono">
                          {tmpl.name}
                        </h4>
                        {getCategoryBadge(tmpl.category)}
                        {getStatusBadge(defaultTrans.status)}
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Updated {new Date(tmpl.lastUpdated).toLocaleDateString()}
                      </p>
                    </div>

                    {isApproved && onSelectTemplate && (
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectTemplate(tmpl, tmpl.defaultLanguage);
                        }}
                        className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-xs px-3 py-1 h-8 rounded-lg shadow"
                      >
                        Use in Campaign
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    )}
                  </div>

                  {/* Body Snippet */}
                  <div className="bg-slate-950/60 rounded-xl p-2.5 border border-slate-800/80 mb-3 text-xs text-slate-300 font-sans line-clamp-2">
                    {defaultTrans.components.find((c) => c.type === 'BODY')?.text}
                  </div>

                  {/* Metadata Chips */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 flex-wrap gap-2 pt-1 border-t border-slate-800/60">
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-slate-300">Languages:</span>
                      {tmpl.translations.map((t) => (
                        <span
                          key={t.code}
                          className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded text-[10px] font-mono"
                        >
                          {t.code}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-slate-300">
                        {placeholders.length} Dynamic Placeholder{placeholders.length === 1 ? '' : 's'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredTemplates.length === 0 && (
              <div className="text-center py-12 bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl p-6">
                <AlertCircle className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <h4 className="text-sm font-semibold text-slate-300">No templates match filter</h4>
                <p className="text-xs text-slate-500 mt-1">Try adjusting your category, status, or search keywords.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Live WhatsApp Phone Simulator & Translation Selector (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 lg:sticky lg:top-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                Live Message Simulator
              </h4>
              <p className="text-[11px] text-slate-400">
                {previewTemplate ? previewTemplate.name : 'Select a template'}
              </p>
            </div>

            {/* Language Switcher for Preview */}
            {previewTemplate && previewTemplate.translations.length > 1 && (
              <select
                value={previewLangCode}
                onChange={(e) => setPreviewLangCode(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-200 focus:outline-none"
              >
                {previewTemplate.translations.map((t) => (
                  <option key={t.code} value={t.code}>
                    {t.languageName}
                  </option>
                ))}
              </select>
            )}
          </div>

          {previewTemplate && activeTranslation ? (
            <div className="space-y-4">
              {/* Approval status banner for selected preview */}
              <div className="flex items-center justify-between text-xs px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Translation Status:</span>
                {getStatusBadge(activeTranslation.status)}
              </div>

              {/* Realistic Phone Shell */}
              <WhatsAppPhonePreview
                components={activeTranslation.components}
                highlightVariables={true}
                businessName="Naani Projects"
                senderPhone="+91 94939 43946"
              />

              {activeTranslation.status !== 'APPROVED' && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-xs text-amber-300 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Compliance Note:</span> This template is currently {activeTranslation.status}. Meta policies require templates to be APPROVED before launching promotional or utility campaigns.
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-500 text-xs">
              Select any template from the left to preview it on mobile
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
