import React, { useEffect, useState } from "react";
import { crmSupabase } from "@/integrations/supabase/crmClient";
import {
  Users,
  UserPlus,
  CheckCircle2,
  CalendarCheck,
  TrendingUp,
  Award,
  MessageSquare,
  Clock,
  RefreshCw,
  ExternalLink,
  Phone,
  ShieldCheck,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface LeadStats {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  siteVisits: number;
  negotiations: number;
  closedDeals: number;
  totalConversations: number;
  unreadCount: number;
}

interface RecentLead {
  id: string;
  full_name: string | null;
  phone: string;
  status: string;
  looking_for: string | null;
  created_at: string;
}

interface RecentConversation {
  id: string;
  wa_id: string;
  customer_name: string | null;
  last_message_text: string | null;
  last_message_at: string;
  unread_count: number;
}

export const CrmOverviewPage: React.FC = () => {
  const [stats, setStats] = useState<LeadStats>({
    totalLeads: 0,
    newLeads: 0,
    qualifiedLeads: 0,
    siteVisits: 0,
    negotiations: 0,
    closedDeals: 0,
    totalConversations: 0,
    unreadCount: 0,
  });

  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);
  const [recentConversations, setRecentConversations] = useState<RecentConversation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [fetchError, setFetchError] = useState<string | null>(null);

  const loadDashboardData = async () => {
    setLoading(true);
    setFetchError(null);

    try {
      // 1. Query Real CRM Leads
      const { data: leadsData, error: leadsError } = await crmSupabase
        .from("crm_leads")
        .select("id, full_name, phone, status, looking_for, created_at")
        .order("created_at", { ascending: false });

      if (leadsError) {
        throw new Error(`Leads query error: ${leadsError.message}`);
      }

      const allLeads = leadsData || [];
      const total = allLeads.length;
      const countByStatus = (st: string) => allLeads.filter((l) => l.status === st).length;

      // 2. Query Real CRM Conversations
      const { data: convData, error: convError } = await crmSupabase
        .from("crm_conversations")
        .select("id, wa_id, customer_name, last_message_text, last_message_at, unread_count")
        .order("last_message_at", { ascending: false });

      if (convError) {
        throw new Error(`Conversations query error: ${convError.message}`);
      }

      const allConvs = convData || [];
      const totalUnread = allConvs.reduce((acc, c) => acc + (c.unread_count || 0), 0);

      setStats({
        totalLeads: total,
        newLeads: countByStatus("new"),
        qualifiedLeads: countByStatus("qualified"),
        siteVisits: countByStatus("site_visit_scheduled"),
        negotiations: countByStatus("negotiation"),
        closedDeals: countByStatus("closed_won"),
        totalConversations: allConvs.length,
        unreadCount: totalUnread,
      });

      setRecentLeads(allLeads.slice(0, 5));
      setRecentConversations(allConvs.slice(0, 5));
      setLastRefreshed(new Date());
    } catch (err: any) {
      console.warn("[CRM Overview] Data load warning:", err.message);
      setFetchError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();

    // Subscribe to Realtime changes on crm_conversations and crm_leads
    const convChannel = crmSupabase
      .channel("crm-overview-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "crm_conversations" },
        () => loadDashboardData()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "crm_leads" },
        () => loadDashboardData()
      )
      .subscribe();

    return () => {
      crmSupabase.removeChannel(convChannel);
    };
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header & Refresh Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight">
            Executive CRM Overview
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time pipeline metrics and WhatsApp engagement for Naani Projects
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-500 hidden sm:block">
            Last synced: {lastRefreshed.toLocaleTimeString()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={loadDashboardData}
            disabled={loading}
            className="border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-slate-100"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh Data
          </Button>
        </div>
      </div>

      {fetchError && (
        <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-start gap-3 text-amber-300 text-sm">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Notice: Database Connection Status</p>
            <p className="text-xs text-amber-400/90 mt-1">{fetchError}</p>
            <p className="text-xs text-slate-400 mt-1">
              Ensure <code className="text-slate-200">VITE_CRM_SUPABASE_ANON_KEY</code> is configured for target backend <code className="text-slate-200">lpbdwmpglwdedqdiovqu</code>.
            </p>
          </div>
        </div>
      )}

      {/* Primary KPI Grid: 6 Real Estate Pipeline Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {/* 1. Total Leads */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Leads</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl md:text-3xl font-black text-slate-100">
            {stats.totalLeads}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">All captured prospects</div>
        </div>

        {/* 2. New Leads */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-blue-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">New</span>
            <UserPlus className="w-4 h-4" />
          </div>
          <div className="text-2xl md:text-3xl font-black text-blue-400">
            {stats.newLeads}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Pending first contact</div>
        </div>

        {/* 3. Qualified Leads */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Qualified</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-2xl md:text-3xl font-black text-amber-400">
            {stats.qualifiedLeads}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Budget & timeline verified</div>
        </div>

        {/* 4. Site Visits */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-purple-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Site Visits</span>
            <CalendarCheck className="w-4 h-4" />
          </div>
          <div className="text-2xl md:text-3xl font-black text-purple-400">
            {stats.siteVisits}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Scheduled or completed</div>
        </div>

        {/* 5. Negotiations */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Negotiation</span>
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-2xl md:text-3xl font-black text-emerald-400">
            {stats.negotiations}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Active pricing discussions</div>
        </div>

        {/* 6. Closed Deals */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-300 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Closed Won</span>
            <Award className="w-4 h-4" />
          </div>
          <div className="text-2xl md:text-3xl font-black text-emerald-300">
            {stats.closedDeals}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Successful transactions</div>
        </div>
      </div>

      {/* Secondary Highlights: WhatsApp Activity & Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 uppercase font-semibold">Active WhatsApp Threads</div>
            <div className="text-2xl font-bold text-slate-100 mt-1">{stats.totalConversations}</div>
            <div className="text-xs text-slate-500 mt-0.5">Total linked customer conversations</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 uppercase font-semibold">Unread Inbound Messages</div>
            <div className="text-2xl font-bold text-amber-400 mt-1">{stats.unreadCount}</div>
            <div className="text-xs text-slate-500 mt-0.5">Managed by database trigger</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 uppercase font-semibold">Primary Target Backend</div>
            <div className="text-lg font-bold text-emerald-400 mt-1 font-mono">lpbdwmpglwdedqdiovqu</div>
            <div className="text-xs text-slate-500 mt-0.5">236 Catalogue Projects Seeded</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Dual Activity Lists: Recent Leads & Recent WhatsApp Conversations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Recent Leads */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              <h2 className="text-base font-bold text-slate-100">Recent Leads</h2>
            </div>
            <Link
              to="/crm/leads"
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              View All <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          {recentLeads.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-sm">
              <p>No leads recorded in <code className="text-slate-400">public.crm_leads</code> yet.</p>
              <p className="text-xs text-slate-600 mt-1">
                Inbound WhatsApp chats and website captures will populate this table automatically.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800/60">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm text-slate-200">
                      {lead.full_name || "Anonymous Contact"}
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1 font-mono text-slate-300">
                        <Phone className="w-3 h-3 text-slate-500" /> {lead.phone}
                      </span>
                      {lead.looking_for && (
                        <span className="text-[11px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded">
                          {lead.looking_for}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium capitalize bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {lead.status.replace(/_/g, " ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Recent WhatsApp Conversations */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <h2 className="text-base font-bold text-slate-100">Live WhatsApp Conversations</h2>
            </div>
            <Link
              to="/crm/inbox"
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              Open Inbox <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          {recentConversations.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-sm">
              <p>No conversations recorded in <code className="text-slate-400">public.crm_conversations</code> yet.</p>
              <p className="text-xs text-slate-600 mt-1">
                Once the WhatsApp webhook receives messages, live conversation threads will show here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800/60">
              {recentConversations.map((conv) => (
                <div key={conv.id} className="py-3 flex items-center justify-between">
                  <div className="overflow-hidden pr-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-200">
                        {conv.customer_name || `+${conv.wa_id}`}
                      </span>
                      {conv.unread_count > 0 && (
                        <span className="bg-amber-500 text-slate-950 font-extrabold text-[10px] px-1.5 py-0.2 rounded-full">
                          {conv.unread_count} new
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 truncate mt-0.5">
                      {conv.last_message_text || "[No message content]"}
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 whitespace-nowrap">
                    {new Date(conv.last_message_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
