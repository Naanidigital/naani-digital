import React from "react";
import { useCrmAuth } from "@/contexts/CrmAuthContext";
import {
  Settings,
  Database,
  MessageSquare,
  ShieldCheck,
  User,
  Server,
  Zap,
  CheckCircle2,
  Lock
} from "lucide-react";

export const CrmSettingsPage: React.FC = () => {
  const { user, role } = useCrmAuth();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-5">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight">
          System & Staff Settings
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Infrastructure parameters, authorization credentials, and integration status
        </p>
      </div>

      {/* Staff Account Details */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4 mb-5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100">Authenticated Staff Session</h2>
            <p className="text-xs text-slate-400">Current operator profile from Supabase Auth</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-xs text-slate-500 uppercase font-semibold">Operator Email</span>
            <div className="text-slate-200 font-medium mt-0.5">{user?.email || "Unknown"}</div>
          </div>
          <div>
            <span className="text-xs text-slate-500 uppercase font-semibold">Assigned Role</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {role || "staff"}
              </span>
              <span className="text-xs text-slate-400">via public.user_roles</span>
            </div>
          </div>
          <div className="md:col-span-2">
            <span className="text-xs text-slate-500 uppercase font-semibold">User Unique ID (UID)</span>
            <div className="font-mono text-xs text-slate-400 bg-slate-950 p-2.5 rounded-xl border border-slate-800 mt-1">
              {user?.id || "N/A"}
            </div>
          </div>
        </div>
      </div>

      {/* Backend Infrastructure */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4 mb-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100">Supabase Backend Configuration</h2>
            <p className="text-xs text-slate-400">Primary cloud database and edge function environment</p>
          </div>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div>
              <div className="font-semibold text-slate-200">Target Project ID</div>
              <div className="text-xs text-slate-500">Dedicated primary database for Naani Projects</div>
            </div>
            <code className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
              lpbdwmpglwdedqdiovqu
            </code>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div>
              <div className="font-semibold text-slate-200">Property Catalogue Seed</div>
              <div className="text-xs text-slate-500">Master database property listings</div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" /> 236 Verified Projects
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div>
              <div className="font-semibold text-slate-200">Unread Inbound Message Trigger</div>
              <div className="text-xs text-slate-500">Atomic PostgreSQL row-locking counter</div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold font-mono">
              <CheckCircle2 className="w-4 h-4" /> trg_crm_inbound_message
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div>
              <div className="font-semibold text-slate-200">Realtime Pub/Sub Replication</div>
              <div className="text-xs text-slate-500">Live WebSocket sync for conversations and messages</div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <Zap className="w-4 h-4" /> Active on crm_* tables
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Cloud API Webhook Integration */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4 mb-5">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100">Meta WhatsApp Cloud API Integration</h2>
            <p className="text-xs text-slate-400">Webhook ingress and outbound agent response engine</p>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-xs text-slate-500 uppercase font-semibold">Target Webhook Endpoint</div>
            <code className="text-xs font-mono text-slate-300 block mt-1 break-all select-all">
              https://lpbdwmpglwdedqdiovqu.supabase.co/functions/v1/whatsapp-webhook
            </code>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="text-xs text-slate-500 uppercase font-semibold">Signature Validation</div>
              <div className="text-xs font-semibold text-slate-300 mt-1 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                X-Hub-Signature-256 (Fail Closed)
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="text-xs text-slate-500 uppercase font-semibold">Outbound Dispatcher</div>
              <div className="text-xs font-semibold text-slate-300 mt-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                send-whatsapp-message (Staff Protected)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
