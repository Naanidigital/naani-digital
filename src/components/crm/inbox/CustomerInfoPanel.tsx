import React from "react";
import { Link } from "react-router-dom";
import type { CrmConversation, CrmLead } from "@/types/crm";
import { formatPhone, formatConversationDate } from "@/lib/crmUtils";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Building,
  DollarSign,
  FileText,
  ExternalLink,
  X,
  Copy,
  Check,
  Shield,
  PlusCircle,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CustomerInfoPanelProps {
  conversation: CrmConversation;
  lead: CrmLead | null;
  onClose: () => void;
}

export const CustomerInfoPanel: React.FC<CustomerInfoPanelProps> = ({
  conversation,
  lead,
  onClose,
}) => {
  const [copied, setCopied] = React.useState(false);

  const copyPhone = () => {
    navigator.clipboard.writeText(conversation.wa_id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayName = lead?.full_name || conversation.customer_name || "Unknown Customer";
  const displayPhone = formatPhone(conversation.wa_id);
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex flex-col h-full bg-slate-900 border-l border-slate-800 w-full sm:w-80 md:w-84 shrink-0 overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 backdrop-blur shrink-0">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Customer Profile
        </h4>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800"
          title="Close details panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5 space-y-6">
        {/* Profile Card */}
        <div className="text-center pb-4 border-b border-slate-800">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-emerald-500/20 border border-slate-700 text-slate-200 flex items-center justify-center font-bold text-lg mx-auto mb-3 shadow-inner">
            {initials || <User className="w-8 h-8 text-slate-400" />}
          </div>
          <h3 className="text-base font-bold text-slate-100">{displayName}</h3>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="font-mono text-xs text-slate-400">{displayPhone}</span>
            <button
              onClick={copyPhone}
              className="text-slate-500 hover:text-slate-300 p-0.5"
              title="Copy WhatsApp number"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <div className="mt-3 flex items-center justify-center gap-2">
            <a
              href={`https://wa.me/${conversation.wa_id}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 text-xs font-medium transition-colors"
            >
              Open in WhatsApp Web
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Lead Association Card */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">CRM Lead Status</span>
            {lead ? (
              <Badge
                variant="outline"
                className="text-[10px] px-2 py-0.5 uppercase font-mono border-amber-500/30 text-amber-400 bg-amber-500/10"
              >
                {lead.status.replace(/_/g, " ")}
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="text-[10px] px-2 py-0.5 border-slate-700 text-slate-400 bg-slate-800"
              >
                Unlinked Lead
              </Badge>
            )}
          </div>

          {/* Lead Details if exists */}
          {lead ? (
            <div className="space-y-3 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 text-xs">
              {lead.looking_for && (
                <div className="flex items-start gap-2.5">
                  <Building className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Project of Interest</span>
                    <span className="text-slate-200 font-medium">{lead.looking_for}</span>
                  </div>
                </div>
              )}

              {lead.budget && (
                <div className="flex items-start gap-2.5">
                  <DollarSign className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Budget</span>
                    <span className="text-slate-200 font-medium">{lead.budget}</span>
                  </div>
                </div>
              )}

              {lead.preferred_location && (
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Location</span>
                    <span className="text-slate-200 font-medium">{lead.preferred_location}</span>
                  </div>
                </div>
              )}

              {lead.email && (
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Email</span>
                    <span className="text-slate-200 font-mono text-[11px] truncate block">{lead.email}</span>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Last Activity</span>
                  <span className="text-slate-300 font-mono text-[11px]">
                    {formatConversationDate(lead.last_contacted_at || conversation.last_message_at)}
                  </span>
                </div>
              </div>

              {lead.notes && (
                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] text-slate-500 block uppercase mb-1">Staff Notes</span>
                  <p className="text-slate-300 whitespace-pre-wrap text-[11px] bg-slate-900 p-2 rounded border border-slate-800">
                    {lead.notes}
                  </p>
                </div>
              )}

              <div className="pt-2">
                <Link
                  to={`/crm/leads?search=${encodeURIComponent(lead.phone || lead.full_name || "")}`}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20 text-xs font-semibold transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Open in Leads Pipeline
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-slate-950/60 p-4 rounded-xl border border-dashed border-slate-800 text-center space-y-2">
              <p className="text-xs text-slate-400">
                No CRM lead profile is currently linked with phone <code className="text-slate-200 font-mono">{conversation.wa_id}</code>.
              </p>
              <Link
                to={`/crm/leads?search=${encodeURIComponent(conversation.wa_id)}`}
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium pt-1"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                Check or Create Lead Record
              </Link>
            </div>
          )}
        </div>

        {/* Conversation Metadata */}
        <div className="pt-4 border-t border-slate-800 text-xs space-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block mb-2">
            Conversation Info
          </span>
          <div className="flex justify-between py-1 border-b border-slate-800/40 text-slate-400 text-[11px]">
            <span>Thread Channel:</span>
            <span className="text-slate-200 capitalize font-medium">{conversation.channel}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/40 text-slate-400 text-[11px]">
            <span>Unread Messages:</span>
            <span className="text-slate-200 font-mono font-medium">{conversation.unread_count}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/40 text-slate-400 text-[11px]">
            <span>First Started:</span>
            <span className="text-slate-200 font-mono text-[10px]">
              {formatConversationDate(conversation.created_at)}
            </span>
          </div>
          <div className="flex justify-between py-1 text-slate-400 text-[11px]">
            <span>Conversation ID:</span>
            <span className="text-slate-400 font-mono text-[9px] truncate max-w-[120px]">
              {conversation.id}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
