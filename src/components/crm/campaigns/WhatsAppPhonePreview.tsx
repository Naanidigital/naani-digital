// ==============================================================================
// Realistic WhatsApp Mobile Message Preview Simulator
// Visualizes template text, media headers, variable substitutions, and buttons
// ==============================================================================

import React from 'react';
import {
  CheckCheck,
  ExternalLink,
  Phone,
  CornerDownLeft,
  FileText,
  Image as ImageIcon,
  ShieldCheck,
  Video
} from 'lucide-react';
import { TemplateComponent, VariableMapping } from '@/lib/campaignComposer/types';
import { interpolateComponentText } from '@/lib/campaignComposer/templateService';

interface WhatsAppPhonePreviewProps {
  components: TemplateComponent[];
  variableMappings?: VariableMapping[];
  recipientData?: Record<string, any>;
  highlightVariables?: boolean;
  businessName?: string;
  senderPhone?: string;
}

export const WhatsAppPhonePreview: React.FC<WhatsAppPhonePreviewProps> = ({
  components,
  variableMappings = [],
  recipientData = {},
  highlightVariables = false,
  businessName = 'Naani Projects',
  senderPhone = '+91 94939 43946',
}) => {
  const headerComp = components.find((c) => c.type === 'HEADER');
  const bodyComp = components.find((c) => c.type === 'BODY');
  const footerComp = components.find((c) => c.type === 'FOOTER');
  const buttonsComp = components.find((c) => c.type === 'BUTTONS');

  // Interpolated or raw texts
  const interpolatedHeader = headerComp?.text
    ? interpolateComponentText(headerComp.text, 'HEADER', variableMappings, recipientData)
    : '';

  const interpolatedBody = bodyComp?.text
    ? interpolateComponentText(bodyComp.text, 'BODY', variableMappings, recipientData)
    : '';

  return (
    <div className="w-full max-w-[340px] mx-auto bg-slate-900 border-4 border-slate-700 rounded-[36px] shadow-2xl overflow-hidden flex flex-col font-sans select-none">
      {/* Phone Top Notch / Speaker Bar */}
      <div className="bg-slate-950 px-6 pt-3 pb-2 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-slate-400">10:30</span>
        <div className="w-16 h-3.5 bg-slate-800 rounded-full mx-auto" />
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-slate-400">5G</span>
          <div className="w-4 h-2.5 border border-slate-400 rounded-sm p-[1px]">
            <div className="w-full h-full bg-slate-300 rounded-[1px]" />
          </div>
        </div>
      </div>

      {/* WhatsApp Header Bar */}
      <div className="bg-[#075E54] text-white px-3 py-2.5 flex items-center gap-2.5 shadow-md">
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-emerald-100 text-[#075E54] font-bold flex items-center justify-center text-sm shadow">
            NP
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 rounded-full p-0.5 text-white">
            <ShieldCheck className="w-2.5 h-2.5" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="text-xs font-bold truncate leading-tight">{businessName}</h4>
            <span className="text-[9px] bg-emerald-800/80 text-emerald-200 px-1 py-0.2 rounded font-medium">
              Official
            </span>
          </div>
          <p className="text-[10px] text-emerald-100/80 truncate">{senderPhone}</p>
        </div>
      </div>

      {/* WhatsApp Chat Area Wallpaper */}
      <div className="flex-1 bg-[#0b141a] p-3 space-y-3 min-h-[380px] flex flex-col justify-end relative">
        {/* Subdued End-to-End Encryption Notice */}
        <div className="bg-[#182229] border border-amber-900/30 text-amber-200/80 text-[10px] rounded-lg p-2 text-center shadow-sm">
          🔒 Messages are end-to-end encrypted. No one outside of this chat can read them.
        </div>

        {/* Message Bubble Container */}
        <div className="bg-[#202c33] rounded-2xl rounded-tl-sm p-3 shadow-lg border border-slate-700/50 text-slate-100 max-w-[95%]">
          {/* 1. Header Component */}
          {headerComp && (
            <div className="mb-2 rounded-lg overflow-hidden border border-slate-700/60 bg-slate-800/60">
              {headerComp.format === 'IMAGE' && (
                <div className="h-32 bg-gradient-to-tr from-slate-800 to-slate-700 flex flex-col items-center justify-center text-slate-400 gap-1 p-2 text-center">
                  <ImageIcon className="w-8 h-8 text-emerald-400" />
                  <span className="text-[11px] font-medium text-slate-300">Project Launch Image</span>
                  <span className="text-[9px] text-slate-400">the-cascades-neopolis.jpg</span>
                </div>
              )}
              {headerComp.format === 'VIDEO' && (
                <div className="h-32 bg-slate-800 flex flex-col items-center justify-center text-slate-400 gap-1">
                  <Video className="w-8 h-8 text-blue-400" />
                  <span className="text-[11px] font-medium text-slate-300">Video Walkthrough</span>
                </div>
              )}
              {headerComp.format === 'DOCUMENT' && (
                <div className="p-2.5 bg-slate-800/90 flex items-center gap-2">
                  <FileText className="w-7 h-7 text-red-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-slate-200 truncate">Brochure_Q4_2026.pdf</p>
                    <p className="text-[9px] text-slate-400">PDF Document • 4.2 MB</p>
                  </div>
                </div>
              )}
              {headerComp.format === 'TEXT' && (
                <div className="p-2 bg-slate-800/50">
                  <h5 className="text-xs font-bold text-slate-100">{interpolatedHeader}</h5>
                </div>
              )}
            </div>
          )}

          {/* 2. Body Component */}
          {bodyComp && (
            <div className="text-xs leading-relaxed text-slate-200 whitespace-pre-wrap font-sans">
              {highlightVariables ? (
                <span>
                  {interpolatedBody.split(/(\[.*?\])/g).map((part, i) =>
                    part.startsWith('[') && part.endsWith(']') ? (
                      <span
                        key={i}
                        className="bg-amber-400/20 text-amber-300 font-medium px-1 py-0.5 rounded border border-amber-500/30"
                      >
                        {part}
                      </span>
                    ) : (
                      part
                    )
                  )}
                </span>
              ) : (
                interpolatedBody
              )}
            </div>
          )}

          {/* 3. Footer Component */}
          {footerComp?.text && (
            <p className="text-[10px] text-slate-400 mt-2 border-t border-slate-700/50 pt-1">
              {footerComp.text}
            </p>
          )}

          {/* Timestamp and Read Receipts */}
          <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-400">
            <span>10:32 AM</span>
            <CheckCheck className="w-3.5 h-3.5 text-sky-400" />
          </div>
        </div>

        {/* 4. Action Buttons (Stacked below bubble) */}
        {buttonsComp?.buttons && buttonsComp.buttons.length > 0 && (
          <div className="space-y-1.5 pt-0.5 max-w-[95%]">
            {buttonsComp.buttons.map((btn, idx) => (
              <div
                key={idx}
                className="bg-[#202c33] hover:bg-[#26353d] transition-colors rounded-xl p-2 text-center text-xs font-semibold text-[#00a884] shadow border border-slate-700/50 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {btn.type === 'QUICK_REPLY' && <CornerDownLeft className="w-3.5 h-3.5" />}
                {btn.type === 'URL' && <ExternalLink className="w-3.5 h-3.5" />}
                {btn.type === 'PHONE_NUMBER' && <Phone className="w-3.5 h-3.5" />}
                <span>{btn.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Phone Bottom Home Indicator */}
      <div className="bg-slate-950 py-2.5 flex justify-center">
        <div className="w-28 h-1 bg-slate-600 rounded-full" />
      </div>
    </div>
  );
};
