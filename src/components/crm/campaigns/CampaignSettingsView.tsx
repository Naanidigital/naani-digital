// src/components/crm/campaigns/CampaignSettingsView.tsx
// ==============================================================================
// Campaign Manager Settings & Infrastructure Diagnostics
// Backend connectivity, worker configuration, rate limits, and safety boundaries
// Target Production Backend: lpbdwmpglwdedqdiovqu
// ==============================================================================

import React, { useState } from 'react';
import {
  Settings,
  Server,
  ShieldCheck,
  Zap,
  Clock,
  Lock,
  RotateCw,
  CheckCircle2,
  AlertTriangle,
  Cpu
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CampaignSettingsView: React.FC = () => {
  const [healthStatus, setHealthStatus] = useState<any>(null);
  const [testingHealth, setTestingHealth] = useState<boolean>(false);

  const prodRef = 'lpbdwmpglwdedqdiovqu';
  const prodUrl = `https://${prodRef}.supabase.co`;
  const functionUrl = `${prodUrl}/functions/v1/dispatch-campaign-worker`;

  const handleTestHealth = async () => {
    setTestingHealth(true);
    try {
      const res = await fetch(functionUrl);
      const data = await res.json();
      setHealthStatus({
        status: res.status === 200 ? 'online' : 'degraded',
        statusCode: res.status,
        data,
      });
    } catch (err: any) {
      setHealthStatus({
        status: 'error',
        error: err.message,
      });
    } finally {
      setTestingHealth(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Settings className="w-5 h-5 text-amber-400" />
            Campaign Manager Settings & Edge Worker Config
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Production infrastructure configuration, Meta rate limiter parameters, and strict dispatch safety boundaries.
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={handleTestHealth}
          disabled={testingHealth}
          className="border-slate-700 text-slate-200 hover:bg-slate-800 text-xs h-9"
        >
          <RotateCw className={`w-3.5 h-3.5 mr-1.5 ${testingHealth ? 'animate-spin' : ''}`} />
          Test Worker Health
        </Button>
      </div>

      {/* Grid of Settings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: Production Environment Isolation */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" />
              <h4 className="text-sm font-bold text-slate-100">Production CRM Backend</h4>
            </div>
            <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold uppercase">
              Production Active
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-500 block text-[11px]">Active Production Project Ref:</span>
              <span className="font-mono text-slate-200 font-semibold text-xs">{prodRef}</span>
            </div>

            <div>
              <span className="text-slate-500 block text-[11px]">Production Supabase URL:</span>
              <span className="font-mono text-slate-300 text-xs break-all">{prodUrl}</span>
            </div>

            <div>
              <span className="text-slate-500 block text-[11px]">Protected Environments:</span>
              <ul className="list-disc list-inside text-slate-400 text-[11px] mt-1 space-y-0.5 font-mono">
                <li>hadxpgwzmvxqslcyykyw (Public Website — UNTOUCHED & ISOLATED)</li>
                <li>lpbdwmpglwdedqdiovqu (Dedicated Production CRM Backend)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Card 2: Edge Function Dispatch Worker */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              <h4 className="text-sm font-bold text-slate-100">Dispatch Worker Status</h4>
            </div>
            <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded font-bold uppercase">
              v1 Deployed
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-500 block text-[11px]">Edge Function Endpoint:</span>
              <span className="font-mono text-blue-400 text-[11px] break-all">{functionUrl}</span>
            </div>

            <div>
              <span className="text-slate-500 block text-[11px]">Health-Check Diagnostics:</span>
              {healthStatus ? (
                <div className="mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 font-mono text-[11px]">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Status: {healthStatus.status.toUpperCase()} (HTTP {healthStatus.statusCode})
                  </div>
                  <pre className="text-[10px] text-slate-400 overflow-x-auto">
                    {JSON.stringify(healthStatus.data, null, 2)}
                  </pre>
                </div>
              ) : (
                <span className="text-slate-500 text-[11px] mt-0.5 block italic">
                  Click 'Test Worker Health' to ping the production endpoint.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Card 3: Live Dispatch Safety Guard */}
        <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <h4 className="text-sm font-bold text-slate-100">Live Dispatch Safety Guard</h4>
            </div>
            <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded font-bold uppercase flex items-center gap-1">
              <Lock className="w-3 h-3" />
              DRY-RUN DEFAULT
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <p className="leading-relaxed">
              Worker executions default strictly to <strong>DRY-RUN MOCK MODE</strong> to safeguard marketing quotas.
            </p>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-1.5 text-[11px]">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Dry-run executes full DB queue claiming, consent, and pacing without calling Meta
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Live dispatch requires explicit server secret ALLOW_LIVE_WHATSAPP_DISPATCH=true
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Live dispatches require client confirmation flag liveDispatchConfirmed=true
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Ambiguous network outcomes quarantined in sending_unknown with zero auto-retry
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Rate Limiter & Concurrency Leases */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <h4 className="text-sm font-bold text-slate-100">Rate Limiter & Pacing Cooldowns</h4>
            </div>
            <span className="text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded font-mono">
              Tier 2 Active
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
              <span className="text-slate-500 block text-[10px]">Worker Claim Batch Size:</span>
              <span className="font-mono text-slate-100 font-bold text-sm">20 recipients</span>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
              <span className="text-slate-500 block text-[10px]">Worker Lease Duration:</span>
              <span className="font-mono text-slate-100 font-bold text-sm">60 seconds</span>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
              <span className="text-slate-500 block text-[10px]">Cross-Channel Cooldown:</span>
              <span className="font-mono text-amber-400 font-bold text-sm">60 seconds / phone</span>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
              <span className="text-slate-500 block text-[10px]">Meta Throttle Limit:</span>
              <span className="font-mono text-emerald-400 font-bold text-sm">25 msgs / second</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
