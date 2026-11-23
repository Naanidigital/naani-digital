import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { crmSupabase } from "@/integrations/supabase/crmClient";
import type { CrmConversation, CrmMessage, CrmLead } from "@/types/crm";
import { ConversationList } from "@/components/crm/inbox/ConversationList";
import { ConversationViewer } from "@/components/crm/inbox/ConversationViewer";
import { CustomerInfoPanel } from "@/components/crm/inbox/CustomerInfoPanel";
import { MessageSquare, RefreshCw, AlertCircle } from "lucide-react";

// Demo mock data exclusively for DEV verification (?demo=true)
const DEMO_CONVERSATIONS: CrmConversation[] = [
  {
    id: "demo-conv-1",
    lead_id: "demo-lead-1",
    wa_id: "919876543210",
    customer_name: "Vikram Sharma",
    channel: "whatsapp",
    status: "open",
    unread_count: 1,
    last_message_text: "Can we schedule a site visit this Saturday for Pavani Mirai?",
    last_message_at: new Date().toISOString(),
    assigned_to: null,
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-conv-2",
    lead_id: null,
    wa_id: "919123456789",
    customer_name: "Pooja Reddy",
    channel: "whatsapp",
    status: "resolved",
    unread_count: 0,
    last_message_text: "Thank you for sharing the floor plan!",
    last_message_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    assigned_to: null,
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const DEMO_MESSAGES: CrmMessage[] = [
  {
    id: "demo-m-1",
    conversation_id: "demo-conv-1",
    wa_message_id: "wamid-demo-1",
    direction: "inbound",
    sender_type: "customer",
    sender_id: "919876543210",
    message_type: "text",
    content: "Hi Naani Team, I saw the Pavani Mirai project on your website. What is the starting price for 3 BHK?",
    media_url: null,
    status: "received",
    error_message: null,
    created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: "demo-m-2",
    conversation_id: "demo-conv-1",
    wa_message_id: "wamid-demo-2",
    direction: "outbound",
    sender_type: "agent",
    sender_id: "naaniprojects@gmail.com",
    message_type: "text",
    content: "Hello Vikram! Pavani Mirai 3 BHK units start from ₹2.45 Cr onwards. Would you like us to arrange a dedicated site visit with the project manager?",
    media_url: null,
    status: "read",
    error_message: null,
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "demo-m-3",
    conversation_id: "demo-conv-1",
    wa_message_id: "wamid-demo-3",
    direction: "inbound",
    sender_type: "customer",
    sender_id: "919876543210",
    message_type: "text",
    content: "Can we schedule a site visit this Saturday for Pavani Mirai?",
    media_url: null,
    status: "received",
    error_message: null,
    created_at: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
];

const DEMO_LEAD: CrmLead = {
  id: "demo-lead-1",
  full_name: "Vikram Sharma",
  phone: "+91 98765 43210",
  email: "vikram.sharma@example.com",
  looking_for: "Pavani Mirai (3 BHK)",
  budget: "₹2.2 Cr - ₹2.6 Cr",
  preferred_location: "Financial District / Gachibowli",
  status: "site_visit_scheduled",
  source: "whatsapp",
  notes: "Interested in higher floor east-facing unit. Available on weekends only.",
  assigned_to: null,
  last_contacted_at: new Date().toISOString(),
  created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  updated_at: new Date().toISOString(),
};

export const CrmInboxPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialConvId = searchParams.get("id");
  const isDemo = import.meta.env.DEV && searchParams.get("demo") === "true";

  // State
  const [conversations, setConversations] = useState<CrmConversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(initialConvId);
  const [activeConversation, setActiveConversation] = useState<CrmConversation | null>(null);
  const [activeLead, setActiveLead] = useState<CrmLead | null>(null);
  const [messages, setMessages] = useState<CrmMessage[]>([]);

  // UI state
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "unread" | "open" | "closed">("all");
  const [mobileShowChat, setMobileShowChat] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [isRealtimeConnected, setIsRealtimeConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Active conversation ref to avoid stale closures in realtime handlers
  const activeConvIdRef = useRef<string | null>(activeConversationId);
  useEffect(() => {
    activeConvIdRef.current = activeConversationId;
  }, [activeConversationId]);

  // 1. Fetch Conversations
  const fetchConversations = useCallback(async () => {
    setIsLoadingConversations(true);
    setErrorMessage(null);

    if (isDemo) {
      setConversations(DEMO_CONVERSATIONS);
      const target = DEMO_CONVERSATIONS[0];
      setActiveConversationId(target.id);
      setActiveConversation(target);
      setMessages(DEMO_MESSAGES);
      setActiveLead(DEMO_LEAD);
      setShowInfoPanel(true);
      setIsLoadingConversations(false);
      return;
    }

    try {
      const { data, error } = await crmSupabase
        .from("crm_conversations")
        .select("*")
        .order("last_message_at", { ascending: false });

      if (error) {
        console.warn("[CRM Inbox] Failed to fetch conversations:", error.message);
        if (error.message.includes("permission denied")) {
          // Expected when viewing without an active authenticated staff JWT session
          setErrorMessage(null);
        } else {
          setErrorMessage(error.message);
        }
      } else {
        const convList = (data as CrmConversation[]) || [];
        setConversations(convList);

        // Auto-select conversation if none or if query param provided
        if (convList.length > 0) {
          const matched = initialConvId
            ? convList.find((c) => c.id === initialConvId)
            : null;
          const target = matched || convList[0];
          setActiveConversationId(target.id);
          setActiveConversation(target);
          if (initialConvId) setMobileShowChat(true);
        }
      }
    } catch (err: any) {
      console.warn("[CRM Inbox] Exception loading conversations:", err.message);
      setErrorMessage(err.message);
    } finally {
      setIsLoadingConversations(false);
    }
  }, [initialConvId]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // 2. Fetch Messages for Active Conversation
  const fetchMessages = useCallback(async (convId: string) => {
    setIsLoadingMessages(true);
    if (isDemo && convId.startsWith("demo-")) {
      const demoList = DEMO_MESSAGES.filter((m) => m.conversation_id === convId);
      setMessages(demoList);
      setHasMoreMessages(false);
      setIsLoadingMessages(false);
      return;
    }

    try {
      const { data, error } = await crmSupabase
        .from("crm_messages")
        .select("*")
        .eq("conversation_id", convId)
        .order("created_at", { ascending: false })
        .limit(30);

      if (error) {
        console.warn("[CRM Inbox] Failed to fetch messages:", error.message);
      } else {
        const rawMessages = (data as CrmMessage[]) || [];
        // Reverse to display chronologically (oldest at top, newest at bottom)
        const chronological = [...rawMessages].reverse();
        setMessages(chronological);
        setHasMoreMessages(rawMessages.length === 30);
      }
    } catch (err: any) {
      console.warn("[CRM Inbox] Error fetching messages:", err.message);
    } finally {
      setIsLoadingMessages(false);
    }
  }, []);

  // 3. Load Earlier Messages (Pagination)
  const loadEarlierMessages = async () => {
    if (!activeConversationId || messages.length === 0 || isLoadingMessages) return;

    const oldest = messages[0].created_at;
    setIsLoadingMessages(true);
    try {
      const { data, error } = await crmSupabase
        .from("crm_messages")
        .select("*")
        .eq("conversation_id", activeConversationId)
        .lt("created_at", oldest)
        .order("created_at", { ascending: false })
        .limit(30);

      if (error) {
        console.warn("[CRM Inbox] Error loading earlier messages:", error.message);
      } else {
        const earlierRaw = (data as CrmMessage[]) || [];
        if (earlierRaw.length > 0) {
          const earlierChronological = [...earlierRaw].reverse();
          setMessages((prev) => [...earlierChronological, ...prev]);
        }
        setHasMoreMessages(earlierRaw.length === 30);
      }
    } catch (err: any) {
      console.warn("[CRM Inbox] Pagination error:", err.message);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  // 4. Fetch Associated Lead Information
  const fetchLeadInfo = useCallback(async (conv: CrmConversation) => {
    if (isDemo && conv.id.startsWith("demo-")) {
      setActiveLead(conv.id === "demo-conv-1" ? DEMO_LEAD : null);
      return;
    }

    try {
      if (conv.lead_id) {
        const { data, error } = await crmSupabase
          .from("crm_leads")
          .select("*")
          .eq("id", conv.lead_id)
          .maybeSingle();

        if (!error && data) {
          setActiveLead(data as CrmLead);
          return;
        }
      }

      // Fallback: match by phone number
      const phoneDigits = conv.wa_id.replace(/[^0-9]/g, "");
      const searchSuffix = phoneDigits.slice(-10);

      const { data, error } = await crmSupabase
        .from("crm_leads")
        .select("*")
        .ilike("phone", `%${searchSuffix}%`)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        setActiveLead(data as CrmLead);
      } else {
        setActiveLead(null);
      }
    } catch (e: any) {
      console.warn("[CRM Inbox] Lead lookup error:", e.message);
      setActiveLead(null);
    }
  }, []);

  // 5. Select a conversation
  const handleSelectConversation = (conv: CrmConversation) => {
    setActiveConversationId(conv.id);
    setActiveConversation(conv);
    setMobileShowChat(true);
    setSearchParams({ id: conv.id });

    // Mark as read in DB if unread_count > 0
    if (conv.unread_count > 0) {
      crmSupabase
        .from("crm_conversations")
        .update({ unread_count: 0 })
        .eq("id", conv.id)
        .then(() => {
          setConversations((prev) =>
            prev.map((c) => (c.id === conv.id ? { ...c, unread_count: 0 } : c))
          );
        });
    }

    fetchMessages(conv.id);
    fetchLeadInfo(conv);
  };

  // Sync active conversation when activeConversationId changes
  useEffect(() => {
    if (activeConversationId) {
      const found = conversations.find((c) => c.id === activeConversationId);
      if (found) {
        setActiveConversation(found);
        fetchMessages(found.id);
        fetchLeadInfo(found);
      }
    }
  }, [activeConversationId]);

  // 6. Toggle Status (Open / Resolved)
  const handleToggleStatus = async (newStatus: "open" | "resolved") => {
    if (!activeConversation) return;

    try {
      const { error } = await crmSupabase
        .from("crm_conversations")
        .update({ status: newStatus })
        .eq("id", activeConversation.id);

      if (error) {
        console.warn("[CRM Inbox] Failed to update status:", error.message);
      } else {
        const updated = { ...activeConversation, status: newStatus };
        setActiveConversation(updated);
        setConversations((prev) =>
          prev.map((c) => (c.id === activeConversation.id ? updated : c))
        );
      }
    } catch (err: any) {
      console.warn("[CRM Inbox] Status update exception:", err.message);
    }
  };

  // 7. Supabase Realtime Subscription
  useEffect(() => {
    const channel = crmSupabase
      .channel("crm-inbox-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "crm_conversations" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newConv = payload.new as CrmConversation;
            setConversations((prev) => [newConv, ...prev.filter((c) => c.id !== newConv.id)]);
          } else if (payload.eventType === "UPDATE") {
            const updated = payload.new as CrmConversation;
            setConversations((prev) =>
              prev.map((c) => (c.id === updated.id ? { ...c, ...updated } : c))
            );
            if (activeConvIdRef.current === updated.id) {
              setActiveConversation((curr) => (curr ? { ...curr, ...updated } : curr));
            }
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "crm_messages" },
        (payload) => {
          const newMsg = payload.new as CrmMessage;
          if (activeConvIdRef.current === newMsg.conversation_id) {
            setMessages((prev) => {
              if (prev.some((m) => m.id === newMsg.id)) return prev;
              return [...prev, newMsg];
            });
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "crm_messages" },
        (payload) => {
          const updatedMsg = payload.new as CrmMessage;
          if (activeConvIdRef.current === updatedMsg.conversation_id) {
            setMessages((prev) =>
              prev.map((m) => (m.id === updatedMsg.id ? { ...m, ...updatedMsg } : m))
            );
          }
        }
      )
      .subscribe((status) => {
        setIsRealtimeConnected(status === "SUBSCRIBED");
      });

    return () => {
      crmSupabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
      {errorMessage && (
        <div className="p-3 bg-red-950/80 border-b border-red-500/30 text-red-300 text-xs flex items-center gap-2 px-4 shrink-0">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>Error loading WhatsApp data: {errorMessage}</span>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Conversation List */}
        <div
          className={`w-full md:w-80 lg:w-96 shrink-0 h-full ${
            mobileShowChat ? "hidden md:block" : "block"
          }`}
        >
          <ConversationList
            conversations={conversations}
            activeId={activeConversationId}
            onSelect={handleSelectConversation}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            isLoading={isLoadingConversations}
            onRefresh={fetchConversations}
            isRealtimeConnected={isRealtimeConnected}
          />
        </div>

        {/* Center Column: Conversation Viewer (Chat Stream + Composer) */}
        <div
          className={`flex-1 h-full min-w-0 ${
            !mobileShowChat ? "hidden md:flex" : "flex"
          } flex-col`}
        >
          {activeConversation ? (
            <ConversationViewer
              conversation={activeConversation}
              messages={messages}
              isLoadingMessages={isLoadingMessages}
              hasMoreMessages={hasMoreMessages}
              onLoadEarlier={loadEarlierMessages}
              onBackMobile={() => setMobileShowChat(false)}
              onToggleStatus={handleToggleStatus}
              onToggleInfoPanel={() => setShowInfoPanel(!showInfoPanel)}
              showInfoPanel={showInfoPanel}
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500 bg-slate-950">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center mb-4 shadow-xl">
                <MessageSquare className="w-8 h-8 text-emerald-400/80" />
              </div>
              <h3 className="text-base font-bold text-slate-200 mb-1">
                Select a WhatsApp Thread
              </h3>
              <p className="text-xs text-slate-400 max-w-sm">
                Choose a customer conversation from the list to view chat bubbles, reply to inquiries, and inspect lead details.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Customer Info Panel (Collapsible or 3rd column) */}
        {activeConversation && showInfoPanel && (
          <CustomerInfoPanel
            conversation={activeConversation}
            lead={activeLead}
            onClose={() => setShowInfoPanel(false)}
          />
        )}
      </div>
    </div>
  );
};
