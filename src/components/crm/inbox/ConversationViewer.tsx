import React, { useEffect, useRef, useState } from "react";
import type { CrmConversation, CrmMessage } from "@/types/crm";
import { formatPhone, formatMessageTime, getMessageDateDivider } from "@/lib/crmUtils";
import {
  Send,
  ArrowLeft,
  Check,
  CheckCheck,
  AlertCircle,
  Info,
  Phone,
  Clock,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  Lock,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

interface ConversationViewerProps {
  conversation: CrmConversation;
  messages: CrmMessage[];
  isLoadingMessages: boolean;
  hasMoreMessages: boolean;
  onLoadEarlier: () => void;
  onBackMobile: () => void;
  onToggleStatus: (newStatus: "open" | "resolved") => Promise<void>;
  onToggleInfoPanel: () => void;
  showInfoPanel: boolean;
}

export const ConversationViewer: React.FC<ConversationViewerProps> = ({
  conversation,
  messages,
  isLoadingMessages,
  hasMoreMessages,
  onLoadEarlier,
  onBackMobile,
  onToggleStatus,
  onToggleInfoPanel,
  showInfoPanel,
}) => {
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages or conversation change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation.id, messages.length]);

  // Handle composer submission
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = draft.trim();
    if (!text || isSending) return;

    setIsSending(true);
    // Explicit Stage 3 constraint check: Do NOT send via real API yet.
    setTimeout(() => {
      setFeedbackNotice(
        "Stage 3 Preview: Outbound WhatsApp Cloud API sending activates in Stage 3. Outbound dispatch is held in preview mode."
      );
      setIsSending(false);
      setDraft("");
      setTimeout(() => setFeedbackNotice(null), 5000);
    }, 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Group messages by day
  const groupedMessages: { dateDivider: string; items: CrmMessage[] }[] = [];
  messages.forEach((msg) => {
    const divider = getMessageDateDivider(msg.created_at);
    const lastGroup = groupedMessages[groupedMessages.length - 1];
    if (lastGroup && lastGroup.dateDivider === divider) {
      lastGroup.items.push(msg);
    } else {
      groupedMessages.push({ dateDivider: divider, items: [msg] });
    }
  });

  return (
    <div className="flex flex-col h-full bg-slate-950 min-w-0">
      {/* 1. Conversation Header */}
      <div className="p-3.5 md:px-5 md:py-3 border-b border-slate-800 bg-slate-900/90 backdrop-blur flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onBackMobile}
            className="md:hidden p-1.5 -ml-1 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg"
            title="Back to conversation list"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-sm shrink-0">
            {(conversation.customer_name || "W")[0].toUpperCase()}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-100 truncate">
                {conversation.customer_name || "WhatsApp Customer"}
              </h3>
              <Badge
                variant="outline"
                className={`text-[10px] px-1.5 py-0 uppercase font-mono ${
                  conversation.status === "open"
                    ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                    : "border-slate-700 text-slate-400 bg-slate-800"
                }`}
              >
                {conversation.status}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-mono">{formatPhone(conversation.wa_id)}</span>
              <span>&bull;</span>
              <a
                href={`https://wa.me/${conversation.wa_id}`}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400/80 hover:text-emerald-300 flex items-center gap-1 text-[11px]"
              >
                Direct WhatsApp
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {conversation.status === "open" ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onToggleStatus("resolved")}
              className="text-xs h-8 border-slate-700 hover:bg-slate-800 text-slate-300"
            >
              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
              <span className="hidden sm:inline">Mark</span> Resolved
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onToggleStatus("open")}
              className="text-xs h-8 border-slate-700 hover:bg-slate-800 text-slate-300"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
              Reopen
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleInfoPanel}
            className={`h-8 w-8 p-0 text-slate-400 hover:text-slate-100 hover:bg-slate-800 ${
              showInfoPanel ? "bg-slate-800 text-slate-100" : ""
            }`}
            title="Toggle customer details"
          >
            <Info className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* 2. Chat Stream / Message Bubbles */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-slate-950/60"
      >
        {/* Load Earlier Messages Button */}
        {hasMoreMessages && (
          <div className="text-center py-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onLoadEarlier}
              disabled={isLoadingMessages}
              className="text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-800"
            >
              <ChevronUp className="w-3.5 h-3.5 mr-1" />
              {isLoadingMessages ? "Loading messages..." : "Load earlier messages"}
            </Button>
          </div>
        )}

        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 py-12">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center mb-3">
              <Clock className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-slate-300">No message history yet</p>
            <p className="text-xs text-slate-500 max-w-sm mt-1">
              Customer messages received via the WhatsApp webhook will appear here in chronological order.
            </p>
          </div>
        ) : (
          groupedMessages.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-3">
              {/* Date Header */}
              <div className="flex items-center justify-center my-4">
                <span className="text-[11px] font-medium bg-slate-900/90 text-slate-400 border border-slate-800 px-3 py-1 rounded-full shadow-sm">
                  {group.dateDivider}
                </span>
              </div>

              {/* Message Items in this date */}
              {group.items.map((msg) => {
                const isInbound = msg.direction === "inbound";

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      isInbound ? "items-start" : "items-end"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-2.5 shadow-md relative text-sm ${
                        isInbound
                          ? "bg-slate-900 text-slate-100 border border-slate-800 rounded-tl-sm"
                          : "bg-emerald-950/80 text-emerald-50 border border-emerald-600/30 rounded-tr-sm"
                      }`}
                    >
                      {/* Sender Tag */}
                      <div className="flex items-center justify-between gap-3 text-[10px] mb-1">
                        <span
                          className={`font-semibold tracking-wide ${
                            isInbound ? "text-slate-400" : "text-emerald-300"
                          }`}
                        >
                          {isInbound
                            ? conversation.customer_name || "Customer"
                            : "Staff / Agent"}
                        </span>
                        {msg.message_type !== "text" && (
                          <span className="uppercase text-[9px] px-1 py-0.2 rounded bg-slate-800/80 text-slate-400">
                            {msg.message_type}
                          </span>
                        )}
                      </div>

                      {/* Content rendering */}
                      {msg.media_url && msg.message_type === "image" && (
                        <div className="mb-2 rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
                          <img
                            src={msg.media_url}
                            alt="WhatsApp Attachment"
                            className="max-h-60 w-auto object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}

                      {msg.media_url && msg.message_type === "document" && (
                        <a
                          href={msg.media_url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800 mb-2 text-xs text-emerald-400 hover:underline"
                        >
                          <FileText className="w-4 h-4 shrink-0" />
                          <span className="truncate">Download Document</span>
                        </a>
                      )}

                      <p className="whitespace-pre-wrap break-words leading-relaxed text-[13px]">
                        {msg.content}
                      </p>

                      {/* Footer: Timestamp and Status Ticks */}
                      <div className="flex items-center justify-end gap-1.5 mt-1.5 text-[10px] text-slate-400 font-mono">
                        <span>{formatMessageTime(msg.created_at)}</span>

                        {!isInbound && (
                          <span title={`Status: ${msg.status}`}>
                            {msg.status === "read" ? (
                              <CheckCheck className="w-3.5 h-3.5 text-blue-400" />
                            ) : msg.status === "delivered" ? (
                              <CheckCheck className="w-3.5 h-3.5 text-slate-400" />
                            ) : msg.status === "sent" ? (
                              <Check className="w-3.5 h-3.5 text-slate-400" />
                            ) : msg.status === "failed" ? (
                              <AlertCircle
                                className="w-3.5 h-3.5 text-red-400"
                                title={msg.error_message || "Message delivery failed"}
                              />
                            ) : (
                              <Clock className="w-3 h-3 text-slate-500" />
                            )}
                          </span>
                        )}
                      </div>
                    </div>

                    {msg.status === "failed" && msg.error_message && (
                      <span className="text-[10px] text-red-400 mt-1 max-w-[70%] text-right font-mono">
                        {msg.error_message}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. Stage 3 Integration Feedback Notice */}
      {feedbackNotice && (
        <div className="px-4 py-2 bg-amber-950/70 border-t border-amber-500/30 text-amber-200 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{feedbackNotice}</span>
          </div>
          <button
            onClick={() => setFeedbackNotice(null)}
            className="text-amber-400 hover:text-amber-100 text-xs font-bold px-2 py-0.5"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 4. Message Composer */}
      <div className="p-3 md:p-4 border-t border-slate-800 bg-slate-900/90 backdrop-blur shrink-0">
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
          <span className="flex items-center gap-1.5 text-amber-400 font-mono text-[10px]">
            <Lock className="w-3 h-3" />
            Awaiting Stage 3: WhatsApp Cloud API Sending
          </span>
          <span className="text-[10px] text-slate-500 hidden sm:inline">
            <kbd className="px-1 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">Enter</kbd> to send &bull; <kbd className="px-1 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">Shift+Enter</kbd> for new line
          </span>
        </div>

        <form onSubmit={handleSendMessage} className="flex items-end gap-2">
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a WhatsApp reply to customer..."
            rows={2}
            className="flex-1 bg-slate-950/80 border-slate-800 focus-visible:ring-emerald-500 text-slate-100 placeholder:text-slate-500 text-xs rounded-xl resize-none py-2 px-3 min-h-[46px] max-h-32"
          />

          <Button
            type="submit"
            disabled={!draft.trim() || isSending}
            className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold h-11 px-4 rounded-xl shadow-lg shadow-emerald-500/20 disabled:opacity-40 disabled:hover:bg-emerald-600 transition-all shrink-0"
            title="Send WhatsApp message (Stage 3 preview)"
          >
            <Send className="w-4 h-4 mr-1.5" />
            <span className="hidden sm:inline">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
};
