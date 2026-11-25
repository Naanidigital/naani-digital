// ==============================================================================
// Template Creation & Editing Modal with Live WhatsApp Preview (Gate 7)
// ==============================================================================

import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Smartphone,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Loader2,
  FileText,
  Image as ImageIcon,
  Video,
  FileCode,
  Globe,
  Tag,
  Phone,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  CrmWhatsAppTemplate,
  TemplateComponent,
  TemplateButton,
  WhatsAppTemplateCategory,
  HeaderFormat,
  validateTemplate,
  saveDraftTemplate,
  submitTemplateToMeta,
  removeAndRenumberVariable
} from '@/lib/templateManagementService';

interface TemplateCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: (template: CrmWhatsAppTemplate) => void;
  initialTemplate?: CrmWhatsAppTemplate | null;
}

export const TemplateCreationModal: React.FC<TemplateCreationModalProps> = ({
  isOpen,
  onClose,
  onSaved,
  initialTemplate,
}) => {
  const [templateName, setTemplateName] = useState('');
  const [category, setCategory] = useState<WhatsAppTemplateCategory>('MARKETING');
  const [language, setLanguage] = useState('en');
  const [description, setDescription] = useState('');

  // Header State
  const [headerType, setHeaderType] = useState<HeaderFormat>('NONE');
  const [headerText, setHeaderText] = useState('');
  const [headerExampleUrl, setHeaderExampleUrl] = useState('');

  // Body State
  const [bodyText, setBodyText] = useState('');
  const [bodyExamples, setBodyExamples] = useState<string[]>([]);

  // Footer State
  const [footerText, setFooterText] = useState('');

  // Buttons State
  const [buttons, setButtons] = useState<TemplateButton[]>([]);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  // Load initial template if editing
  useEffect(() => {
    if (initialTemplate) {
      setTemplateName(initialTemplate.template_name);
      setCategory(initialTemplate.category);
      setLanguage(initialTemplate.language);
      setDescription(initialTemplate.description || '');

      const h = initialTemplate.components.find((c) => c.type === 'HEADER');
      if (h) {
        setHeaderType(h.format || 'TEXT');
        setHeaderText(h.text || '');
        setHeaderExampleUrl(h.example?.header_text?.[0] || '');
      } else {
        setHeaderType('NONE');
      }

      const b = initialTemplate.components.find((c) => c.type === 'BODY');
      if (b) {
        setBodyText(b.text || '');
        setBodyExamples(b.example?.body_text?.[0] || []);
      }

      const f = initialTemplate.components.find((c) => c.type === 'FOOTER');
      if (f) setFooterText(f.text || '');

      const btn = initialTemplate.components.find((c) => c.type === 'BUTTONS');
      if (btn && btn.buttons) setButtons(btn.buttons);
    } else {
      // Reset form
      setTemplateName('');
      setCategory('MARKETING');
      setLanguage('en');
      setDescription('');
      setHeaderType('NONE');
      setHeaderText('');
      setHeaderExampleUrl('');
      setBodyText('');
      setBodyExamples([]);
      setFooterText('');
      setButtons([]);
    }
    setValidationErrors([]);
    setSuccessMessage(null);
  }, [initialTemplate, isOpen]);

  // Keep variable examples array in sync with body variables count
  useEffect(() => {
    const matches = [...bodyText.matchAll(/\{\{(\d+)\}\}/g)];
    const count = matches.length;
    setBodyExamples((prev) => {
      if (prev.length === count) return prev;
      const next = [...prev];
      while (next.length < count) next.push('');
      return next.slice(0, count);
    });
  }, [bodyText]);

  if (!isOpen) return null;

  // Insert variable into body ensuring strictly next sequential number
  const handleInsertVariable = () => {
    const matches = [...bodyText.matchAll(/\{\{(\d+)\}\}/g)];
    const existingIndices = matches.map((m) => parseInt(m[1], 10));
    const nextNum = existingIndices.length > 0 ? Math.max(...existingIndices) + 1 : 1;
    setBodyText((prev) => (prev ? `${prev} {{${nextNum}}}` : `{{${nextNum}}}`));
  };

  // Delete variable: removes placeholder, renumbers subsequent variables, and removes sample value
  const handleDeleteVariable = (varIdxToDelete: number) => {
    const varNumber = varIdxToDelete + 1; // 1-based index (e.g. 1 for {{1}}, 2 for {{2}})
    
    // 1. Remove and renumber body text
    const updatedBodyText = removeAndRenumberVariable(bodyText, varNumber);
    
    // 2. Remove sample value at index varIdxToDelete
    const updatedExamples = bodyExamples.filter((_, i) => i !== varIdxToDelete);
    
    // 3. Atomically update both bodyText and bodyExamples
    setBodyText(updatedBodyText);
    setBodyExamples(updatedExamples);
  };

  // Add Button
  const handleAddButton = (type: 'QUICK_REPLY' | 'PHONE_NUMBER' | 'URL') => {
    if (buttons.length >= 10) return;
    if (type === 'PHONE_NUMBER' && buttons.some((b) => b.type === 'PHONE_NUMBER')) return;
    if (type === 'URL' && buttons.filter((b) => b.type === 'URL').length >= 2) return;

    const newBtn: TemplateButton = {
      type,
      text: type === 'QUICK_REPLY' ? 'Quick Action' : type === 'PHONE_NUMBER' ? 'Call Now' : 'Visit Site',
      ...(type === 'PHONE_NUMBER' ? { phone_number: '+919493943946' } : {}),
      ...(type === 'URL' ? { url: 'https://naani.in' } : {}),
    };
    setButtons([...buttons, newBtn]);
  };

  const handleRemoveButton = (idx: number) => {
    setButtons(buttons.filter((_, i) => i !== idx));
  };

  // Build template payload
  const buildComponents = (): TemplateComponent[] => {
    const components: TemplateComponent[] = [];

    // Header
    if (headerType !== 'NONE') {
      const h: TemplateComponent = {
        type: 'HEADER',
        format: headerType,
      };
      if (headerType === 'TEXT' && headerText.trim()) {
        h.text = headerText.trim();
      }
      if (['IMAGE', 'VIDEO', 'DOCUMENT'].includes(headerType) && headerExampleUrl.trim()) {
        h.example = { header_text: [headerExampleUrl.trim()] };
      }
      components.push(h);
    }

    // Body
    const b: TemplateComponent = {
      type: 'BODY',
      text: bodyText.trim(),
    };
    if (bodyExamples.length > 0 && bodyExamples.some((v) => v.trim())) {
      b.example = { body_text: [bodyExamples.map((v) => v.trim() || 'Sample')] };
    }
    components.push(b);

    // Footer
    if (footerText.trim()) {
      components.push({
        type: 'FOOTER',
        text: footerText.trim(),
      });
    }

    // Buttons
    if (buttons.length > 0) {
      components.push({
        type: 'BUTTONS',
        buttons,
      });
    }

    return components;
  };

  const constructTemplate = (): Partial<CrmWhatsAppTemplate> => {
    return {
      ...(initialTemplate ? { id: initialTemplate.id } : {}),
      template_name: templateName.trim(),
      category,
      language,
      description: description.trim() || null,
      header_type: headerType,
      components: buildComponents(),
    };
  };

  // Save as Draft
  const handleSaveDraft = async () => {
    setValidationErrors([]);
    setSuccessMessage(null);
    const tmpl = constructTemplate();
    const res = await saveDraftTemplate(tmpl);
    if (!res.success) {
      setValidationErrors([res.error || 'Failed to save draft.']);
      return;
    }
    setSuccessMessage('Draft saved successfully!');
    if (res.template) onSaved(res.template);
    setTimeout(() => onClose(), 1000);
  };

  // Submit to Meta
  const handleSubmitToMeta = async () => {
    setValidationErrors([]);
    setSuccessMessage(null);
    setIsSubmitting(true);

    const tmpl = constructTemplate();
    const validation = validateTemplate(tmpl);
    if (!validation.valid) {
      setValidationErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    // First save draft
    const draftRes = await saveDraftTemplate(tmpl);
    if (!draftRes.success || !draftRes.template) {
      setValidationErrors([draftRes.error || 'Failed to initialize draft before submission.']);
      setIsSubmitting(false);
      return;
    }

    // Submit to Meta
    const metaRes = await submitTemplateToMeta(draftRes.template);
    setIsSubmitting(false);

    if (!metaRes.success) {
      setValidationErrors([metaRes.error || 'Meta API rejected submission.']);
      return;
    }

    setSuccessMessage(`Template successfully submitted to Meta! Status: ${metaRes.status || 'PENDING'}`);
    onSaved({
      ...draftRes.template,
      status: (metaRes.status as any) || 'PENDING',
      meta_template_id: metaRes.metaTemplateId,
    });
    setTimeout(() => onClose(), 1200);
  };

  // Live preview text resolution
  let previewResolvedBody = bodyText;
  bodyExamples.forEach((val, idx) => {
    previewResolvedBody = previewResolvedBody.replace(
      new RegExp(`\\{\\{${idx + 1}\\}\\}`, 'g'),
      val.trim() || `[Var ${idx + 1}]`
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-100">
                {initialTemplate ? 'Edit WhatsApp Template' : 'Create New WhatsApp Template'}
              </h3>
              <p className="text-xs text-slate-400">
                Author Meta-compliant marketing & utility templates with live variable previews
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Tab Switcher */}
            <div className="sm:hidden flex bg-slate-800 p-0.5 rounded-lg text-xs">
              <button
                className={`px-2.5 py-1 rounded-md ${activeTab === 'editor' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                onClick={() => setActiveTab('editor')}
              >
                Editor
              </button>
              <button
                className={`px-2.5 py-1 rounded-md ${activeTab === 'preview' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                onClick={() => setActiveTab('preview')}
              >
                Preview
              </button>
            </div>

            <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-400 hover:text-slate-100">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Modal Body: Split Editor & Preview */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-800">
          {/* Left: Editor Form (7 cols) */}
          <div className={`md:col-span-7 p-5 space-y-5 overflow-y-auto ${activeTab === 'preview' ? 'hidden sm:block' : 'block'}`}>
            {validationErrors.length > 0 && (
              <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3.5 space-y-1">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Meta Validation Requirements:
                </div>
                <ul className="list-disc list-inside text-xs text-rose-300 space-y-0.5">
                  {validationErrors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            {successMessage && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3.5 flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                {successMessage}
              </div>
            )}

            {/* Section 1: Basic Template Information */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                1. Basic Details
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-slate-300 font-semibold">Template Name *</Label>
                  <Input
                    placeholder="e.g. cascades_launch_invitation"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '_'))}
                    className="mt-1 bg-slate-950 border-slate-800 font-mono text-xs text-slate-100"
                  />
                  <span className="text-[10px] text-slate-500">Lowercase, numbers, and underscores only</span>
                </div>

                <div>
                  <Label className="text-xs text-slate-300 font-semibold">Category *</Label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as WhatsAppTemplateCategory)}
                    className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="MARKETING">Marketing (Promotions, Announcements)</option>
                    <option value="UTILITY">Utility (Transactional, Follow-ups)</option>
                    <option value="AUTHENTICATION">Authentication (OTPs, Security)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-slate-300 font-semibold">Language *</Label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="en">English (en)</option>
                    <option value="en_US">English US (en_US)</option>
                    <option value="te">Telugu (te)</option>
                    <option value="hi">Hindi (hi)</option>
                  </select>
                </div>

                <div>
                  <Label className="text-xs text-slate-300 font-semibold">CRM Internal Notes</Label>
                  <Input
                    placeholder="Internal reference description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 bg-slate-950 border-slate-800 text-xs text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Header Component */}
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                2. Header (Optional)
              </h4>

              <div className="grid grid-cols-5 gap-2">
                {(['NONE', 'TEXT', 'IMAGE', 'VIDEO', 'DOCUMENT'] as HeaderFormat[]).map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setHeaderType(fmt)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all ${
                      headerType === fmt
                        ? 'bg-amber-500/15 border-amber-500 text-amber-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-850'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>

              {headerType === 'TEXT' && (
                <div>
                  <Label className="text-xs text-slate-400">Header Text (max 60 chars)</Label>
                  <Input
                    maxLength={60}
                    placeholder="e.g. Exclusive Invitation: {{1}}"
                    value={headerText}
                    onChange={(e) => setHeaderText(e.target.value)}
                    className="mt-1 bg-slate-950 border-slate-800 text-xs text-slate-100"
                  />
                </div>
              )}

              {['IMAGE', 'VIDEO', 'DOCUMENT'].includes(headerType) && (
                <div>
                  <Label className="text-xs text-slate-400">Sample Media URL for Meta Approval</Label>
                  <Input
                    placeholder="https://naani.in/assets/preview.jpg"
                    value={headerExampleUrl}
                    onChange={(e) => setHeaderExampleUrl(e.target.value)}
                    className="mt-1 bg-slate-950 border-slate-800 text-xs text-slate-100"
                  />
                  <span className="text-[10px] text-slate-500">
                    Meta requires an example sample URL to review image/document formatting
                  </span>
                </div>
              )}
            </div>

            {/* Section 3: Message Body Component */}
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  3. Message Body *
                </h4>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleInsertVariable}
                    className="h-7 text-[11px] border-amber-500/40 text-amber-400 hover:bg-amber-500/10 px-2.5"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Insert Variable
                  </Button>
                  <span className="text-[11px] text-slate-500 font-mono">{bodyText.length}/1024</span>
                </div>
              </div>

              <Textarea
                rows={5}
                maxLength={1024}
                placeholder="Hello {{1}}, you are cordially invited to {{2}} at {{3}}..."
                value={bodyText}
                onChange={(e) => setBodyText(e.target.value)}
                className="bg-slate-950 border-slate-800 text-xs text-slate-100 font-sans leading-relaxed"
              />

              {/* Dynamic Sample Values Form for Variables */}
              {bodyExamples.length > 0 && (
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-300 block">
                      Meta Required Sample Values for Variables:
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {bodyExamples.length} variable{bodyExamples.length !== 1 ? 's' : ''} detected
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {bodyExamples.map((val, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 bg-slate-900/60 p-1.5 rounded-lg border border-slate-800/80 hover:border-slate-700/80 transition-colors"
                      >
                        <span className="text-[11px] font-mono text-amber-400 shrink-0 font-bold px-1">
                          {`{{${idx + 1}}}`}:
                        </span>
                        <Input
                          placeholder={`Sample value for var ${idx + 1}`}
                          value={val}
                          onChange={(e) => {
                            const next = [...bodyExamples];
                            next[idx] = e.target.value;
                            setBodyExamples(next);
                          }}
                          className="h-7 text-xs bg-slate-950 border-slate-800 text-slate-200 flex-1 min-w-0"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteVariable(idx)}
                          title="Remove variable"
                          aria-label={`Remove variable {{${idx + 1}}}`}
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Section 4: Footer */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  4. Footer (Optional)
                </h4>
                <span className="text-[11px] text-slate-500 font-mono">{footerText.length}/60</span>
              </div>
              <Input
                maxLength={60}
                placeholder="Naani Projects • TS RERA Approved P02400007890"
                value={footerText}
                onChange={(e) => setFooterText(e.target.value)}
                className="bg-slate-950 border-slate-800 text-xs text-slate-100"
              />
            </div>

            {/* Section 5: Buttons */}
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  5. Interactive Buttons (Max 10)
                </h4>
                <div className="flex flex-wrap items-center gap-1.5">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => handleAddButton('QUICK_REPLY')}
                    className="h-7 text-[10px] border-slate-700 text-slate-300 px-2"
                  >
                    + Quick Reply
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => handleAddButton('URL')}
                    className="h-7 text-[10px] border-slate-700 text-slate-300 px-2"
                  >
                    + Website URL
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => handleAddButton('PHONE_NUMBER')}
                    className="h-7 text-[10px] border-slate-700 text-slate-300 px-2"
                  >
                    + Phone Call
                  </Button>
                </div>
              </div>

              {buttons.map((btn, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                      {btn.type.replace('_', ' ')}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveButton(idx)}
                      className="text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <Label className="text-[10px] text-slate-400">Button Text (max 25 chars)</Label>
                      <Input
                        maxLength={25}
                        value={btn.text}
                        onChange={(e) => {
                          const next = [...buttons];
                          next[idx].text = e.target.value;
                          setButtons(next);
                        }}
                        className="h-7 text-xs bg-slate-900 border-slate-800 text-slate-200"
                      />
                    </div>

                    {btn.type === 'URL' && (
                      <div>
                        <Label className="text-[10px] text-slate-400">Website URL</Label>
                        <Input
                          placeholder="https://naani.in/project"
                          value={btn.url || ''}
                          onChange={(e) => {
                            const next = [...buttons];
                            next[idx].url = e.target.value;
                            setButtons(next);
                          }}
                          className="h-7 text-xs bg-slate-900 border-slate-800 text-slate-200"
                        />
                      </div>
                    )}

                    {btn.type === 'PHONE_NUMBER' && (
                      <div>
                        <Label className="text-[10px] text-slate-400">Phone Number (with country code)</Label>
                        <Input
                          placeholder="+919493943946"
                          value={btn.phone_number || ''}
                          onChange={(e) => {
                            const next = [...buttons];
                            next[idx].phone_number = e.target.value;
                            setButtons(next);
                          }}
                          className="h-7 text-xs bg-slate-900 border-slate-800 text-slate-200"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Live WhatsApp Preview (5 cols) */}
          <div className={`md:col-span-5 p-5 bg-slate-950/40 flex flex-col items-center justify-center ${activeTab === 'editor' ? 'hidden sm:flex' : 'flex'}`}>
            <div className="w-full max-w-[320px]">
              <div className="text-center mb-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  Live WhatsApp Preview
                </span>
                <span className="text-[10px] text-slate-500 block">Sample variables dynamically resolved</span>
              </div>

              {/* Phone Mockup Wrapper */}
              <div className="bg-[#0b141a] rounded-3xl p-3 shadow-2xl border-4 border-slate-800 space-y-2">
                {/* Simulated Chat Header */}
                <div className="flex items-center gap-2 pb-2 border-b border-slate-800/80 px-1">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-slate-950 font-bold flex items-center justify-center text-xs">
                    N
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-200 block">Naani Projects</span>
                    <span className="text-[9px] text-emerald-400 block font-mono">Official WhatsApp</span>
                  </div>
                </div>

                {/* WhatsApp Chat Bubble */}
                <div className="bg-[#1f2c34] rounded-2xl rounded-tl-none p-3.5 space-y-2 text-slate-100 shadow-md">
                  {/* Header Preview */}
                  {headerType === 'TEXT' && headerText && (
                    <div className="font-bold text-xs text-slate-100 pb-1 border-b border-slate-700/40">
                      {headerText}
                    </div>
                  )}

                  {headerType === 'IMAGE' && (
                    <div className="rounded-xl overflow-hidden bg-slate-900 border border-slate-700/60 aspect-video flex items-center justify-center">
                      {headerExampleUrl ? (
                        <img src={headerExampleUrl} alt="Header" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center p-3 text-slate-500 text-[10px]">
                          <ImageIcon className="w-6 h-6 mx-auto mb-1 text-slate-600" />
                          Image Header Preview
                        </div>
                      )}
                    </div>
                  )}

                  {headerType === 'VIDEO' && (
                    <div className="rounded-xl overflow-hidden bg-slate-900 border border-slate-700/60 aspect-video flex items-center justify-center text-slate-500 text-[10px]">
                      <Video className="w-6 h-6 mx-auto mb-1 text-slate-600" />
                      Video Header
                    </div>
                  )}

                  {headerType === 'DOCUMENT' && (
                    <div className="rounded-xl p-2.5 bg-slate-900 border border-slate-700/60 flex items-center gap-2 text-slate-300 text-xs">
                      <FileCode className="w-5 h-5 text-amber-400" />
                      <span>Brochure.pdf</span>
                    </div>
                  )}

                  {/* Body Preview */}
                  <div className="text-xs text-slate-200 whitespace-pre-line leading-relaxed">
                    {previewResolvedBody || (
                      <span className="text-slate-500 italic">Message body text will render here...</span>
                    )}
                  </div>

                  {/* Footer Preview */}
                  {footerText && (
                    <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-700/30">
                      {footerText}
                    </div>
                  )}
                </div>

                {/* Buttons Preview */}
                {buttons.length > 0 && (
                  <div className="space-y-1 pt-1">
                    {buttons.map((btn, i) => (
                      <div
                        key={i}
                        className="bg-[#1f2c34] hover:bg-[#2a3942] transition-colors py-2 px-3 rounded-xl text-center text-xs text-emerald-400 font-semibold flex items-center justify-center gap-1.5 border border-slate-800"
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
            </div>
          </div>
        </div>

        {/* Modal Footer / Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>Target WABA: <code>1017083661443186</code></span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isSubmitting}
              className="border-slate-700 text-slate-200 hover:bg-slate-800 text-xs flex-1 sm:flex-initial"
            >
              Save as Draft
            </Button>

            <Button
              type="button"
              onClick={handleSubmitToMeta}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs flex-1 sm:flex-initial shadow-lg shadow-amber-500/20 whitespace-nowrap"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Submitting to Meta...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  Submit for Meta Approval
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
