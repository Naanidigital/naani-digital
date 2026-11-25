import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useCrmAuth } from "@/contexts/CrmAuthContext";
import { crmSupabase } from "@/integrations/supabase/crmClient";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  CalendarCheck,
  BarChart3,
  Settings,
  LogOut,
  Building2,
  Menu,
  X,
  ExternalLink,
  Shield,
  CircleDot,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Overview", path: "/crm", icon: LayoutDashboard },
  { label: "WhatsApp Inbox", path: "/crm/inbox", icon: MessageSquare },
  { label: "Campaigns", path: "/crm/campaigns", icon: Send },
  { label: "Leads", path: "/crm/leads", icon: Users },
  { label: "Follow-ups", path: "/crm/follow-ups", icon: CalendarCheck },
  { label: "Analytics", path: "/crm/analytics", icon: BarChart3 },
  { label: "Settings", path: "/crm/settings", icon: Settings },
];

export const CrmLayout: React.FC = () => {
  const { user, role, signOut } = useCrmAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();
  const isInbox = location.pathname.startsWith("/crm/inbox");

  // Fetch total unread conversations count
  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const { count } = await crmSupabase
          .from("crm_conversations")
          .select("*", { count: "exact", head: true })
          .gt("unread_count", 0);
        if (typeof count === "number") setUnreadCount(count);
      } catch (e) {
        // Silent catch
      }
    };
    fetchUnread();

    const channel = crmSupabase
      .channel("crm-layout-unread")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "crm_conversations" },
        () => fetchUnread()
      )
      .subscribe();

    return () => {
      crmSupabase.removeChannel(channel);
    };
  }, []);

  // Highlight exact match for /crm, and prefix match for sub-routes
  const isActive = (path: string) => {
    if (path === "/crm") return location.pathname === "/crm";
    return location.pathname.startsWith(path);
  };

  const crmUrl = import.meta.env.VITE_CRM_SUPABASE_URL || "https://lpbdwmpglwdedqdiovqu.supabase.co";
  const isStaging = crmUrl.includes("bhwoenqfxbgkbrsmahjt");
  const projectRef = isStaging ? "bhwoenqfxbgkbrsmahjt" : "lpbdwmpglwdedqdiovqu";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
        <Link to="/crm" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-slate-100 text-sm">Naani CRM</span>
            {isStaging ? (
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded ml-1.5 uppercase font-mono font-bold">
                STAGING
              </span>
            ) : (
              <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.2 rounded ml-1.5 uppercase font-mono">
                Staff
              </span>
            )}
          </div>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation (Desktop Persistent & Mobile Slide) */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-slate-900/95 md:bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <Link to="/crm" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-100 text-base leading-tight flex items-center gap-1.5">
                  Naani CRM
                  {isStaging && (
                    <span className="text-[9px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                      STAGING
                    </span>
                  )}
                </div>
                <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <span className={`w-1.5 h-1.5 rounded-full inline-block animate-pulse ${isStaging ? "bg-amber-400" : "bg-emerald-400"}`}></span>
                  {projectRef}
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-sm shadow-amber-500/5 font-semibold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-amber-400" : "text-slate-400"}`} />
                  <span className="flex-1">{item.label}</span>
                  {item.path === "/crm/inbox" && unreadCount > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px]">
                      {unreadCount}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Footer Profile & Sign Out */}
        <div className="p-3 border-t border-slate-800/80 space-y-2">
          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
            <div className="overflow-hidden">
              <div className="text-xs font-semibold text-slate-200 truncate">
                {user?.email || "Staff Operator"}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Shield className="w-3 h-3 text-amber-400" />
                <span className="text-[10px] font-mono text-amber-400/90 uppercase font-bold tracking-wider">
                  {role || "staff"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center py-1.5 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              Public Site <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={() => signOut()}
              className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors flex items-center gap-1"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay Background */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-30 md:hidden"
        />
      )}

      {/* Main Content Viewport */}
      <main
        className={`flex-1 min-w-0 bg-slate-950 ${
          isInbox
            ? "h-[calc(100vh-65px)] md:h-screen overflow-hidden flex flex-col"
            : "p-4 md:p-8 overflow-y-auto"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};
