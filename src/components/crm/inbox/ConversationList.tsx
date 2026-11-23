import React from "react";
import type { CrmConversation } from "@/types/crm";
import { formatPhone, formatConversationDate } from "@/lib/crmUtils";
import {
  Search,
  RefreshCw,
  MessageSquare,
  CheckCheck,
  Check,
  CircleDot,
  X,
  User,
  Radio
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface ConversationListProps {
  conversations: CrmConversation[];
  activeId: string | null;
  onSelect: (conv: CrmConversation) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  statusFilter: "all" | "unread" | "open" | "closed";
  setStatusFilter: (f: "all" | "unread" | "open" | "closed") => void;
  isLoading: boolean;
  onRefresh: () => void;
  isRealtimeConnected: boolean;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeId,
  onSelect,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  isLoading,
  onRefresh,
  isRealtimeConnected,
}) => {
  // Filter conversations
  const filteredConversations = conversations.filter((conv) => {
    // 1. Status Filter
    if (statusFilter === "unread" && conv.unread_count === 0) return false;
    if (statusFilter === "open" && conv.status !== "open") return false;
    if (statusFilter === "closed" && conv.status === "open") return false;

    // 2. Search Query (name or phone)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = conv.customer_name?.toLowerCase().includes(q) || false;
      const matchPhone = conv.wa_id.includes(q) || formatPhone(conv.wa_id).toLowerCase().includes(q);
      const matchMsg = conv.last_message_text?.toLowerCase().includes(q) || false;
      if (!matchName && !matchPhone && !matchMsg) return false;
    }

    return true;
  });

  const unreadTotal = conversations.reduce((acc, c) => acc + (c.unread_count > 0 ? 1 : 0), 0);
  const openTotal = conversations.filter((c) => c.status === "open").length;

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/90 backdrop-blur shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                WhatsApp Inbox
                {isRealtimeConnected && (
                  <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full font-mono font-normal">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live
                  </span>
                )}
              </h2>
              <p className="text-[11px] text-slate-400">
                {conversations.length} {conversations.length === 1 ? "thread" : "threads"} &bull; {unreadTotal} unread
              </p>
            </div>
          </div>
          <button
            onClick={onRefresh}
            disabled={isLoading}
            title="Refresh conversations"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-amber-400" : ""}`} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, phone or message..."
            className="pl-9 pr-8 bg-slate-950/70 border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 rounded-lg h-9 focus-visible:ring-1 focus-visible:ring-emerald-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              statusFilter === "all"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            }`}
          >
            All ({conversations.length})
          </button>
          <button
            onClick={() => setStatusFilter("unread")}
            className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1.5 ${
              statusFilter === "unread"
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30 font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            }`}
          >
            Unread
            {unreadTotal > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                {unreadTotal}
              </span>
            )}
          </button>
          <button
            onClick={() => setStatusFilter("open")}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              statusFilter === "open"
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            }`}
          >
            Open ({openTotal})
          </button>
          <button
            onClick={() => setStatusFilter("closed")}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              statusFilter === "closed"
                ? "bg-slate-800 text-slate-200 border border-slate-700 font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            }`}
          >
            Closed ({conversations.length - openTotal})
          </button>
        </div>
      </div>

      {/* Conversation Thread List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
        {isLoading && conversations.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-emerald-500" />
            Loading conversations...
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="p-8 text-center">
            {conversations.length === 0 ? (
              <div className="max-w-[260px] mx-auto text-slate-400">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-semibold text-slate-200 mb-1">
                  No WhatsApp Conversations Yet
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Inbound customer messages will appear here automatically when WhatsApp webhook events arrive.
                </p>
              </div>
            ) : (
              <div className="text-slate-500 text-xs">
                No conversations match &ldquo;{searchQuery}&rdquo; in this view.
              </div>
            )}
          </div>
        ) : (
          filteredConversations.map((conv) => {
            const isSelected = conv.id === activeId;
            const hasUnread = conv.unread_count > 0;
            const initials = (conv.customer_name || "W")
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <button
                key={conv.id}
                onClick={() => onSelect(conv)}
                className={`w-full text-left p-3.5 transition-colors flex items-start gap-3 relative ${
                  isSelected
                    ? "bg-slate-800/90 border-l-4 border-emerald-500"
                    : "hover:bg-slate-800/40"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                    hasUnread
                      ? "bg-gradient-to-tr from-emerald-600 to-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20"
                      : "bg-slate-800 text-slate-300 border border-slate-700"
                  }`}
                >
                  {initials || <User className="w-4 h-4" />}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-1 mb-0.5">
                    <span
                      className={`text-xs truncate ${
                        hasUnread
                          ? "font-bold text-slate-100"
                          : "font-medium text-slate-200"
                      }`}
                    >
                      {conv.customer_name || formatPhone(conv.wa_id)}
                    </span>
                    <span className="text-[10px] text-slate-500 shrink-0 font-mono">
                      {formatConversationDate(conv.last_message_at)}
                    </span>
                  </div>

                  {/* Phone & Status Badge */}
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
                    <span className="font-mono text-[10px]">{formatPhone(conv.wa_id)}</span>
                    {conv.status !== "open" && (
                      <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        {conv.status}
                      </span>
                    )}
                  </div>

                  {/* Last message preview & unread badge */}
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={`text-xs truncate ${
                        hasUnread
                          ? "text-slate-200 font-medium"
                          : "text-slate-400"
                      }`}
                    >
                      {conv.last_message_text || (
                        <span className="italic text-slate-500">No message content</span>
                      )}
                    </p>

                    {hasUnread && (
                      <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/40 animate-in zoom-in">
                        {conv.unread_count}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
