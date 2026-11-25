// src/components/crm/campaigns/CampaignBillingView.tsx
// ==============================================================================
// WhatsApp Campaign Billing & Delivery Observability View
// Reconciles Meta Cloud API acceptance, carrier delivery, read receipts,
// and delivery failures (e.g. Meta payment eligibility error 131042).
// Strictly does not invent balances — directs users to official Meta Billing Hub.
// ==============================================================================

import React, { useEffect, useState } from 'react';
import {
  Receipt,
  CreditCard,
  ExternalLink,
  RotateCw,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  Send,
  Smartphone,
  XCircle,
  HelpCircle,
  ShieldCheck,
  Info,
  DollarSign,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  getCampaignBillingSummary,
  CampaignBillingSummary
} from '@/lib/campaignStagingService';

export const CampaignBillingView: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<CampaignBillingSummary | null>(null);

  const metaBillingUrl =
    'https://business.facebook.com/billing_hub/accounts/details/?business_id=1044710364058310&asset_id=1017083661443186&wizard_name=ADD_PM&account_type=whatsapp-business-account';

  const loadData = async () => {
    setLoading(true);
    try {
      const summary = await getCampaignBillingSummary();
      setData(summary);
    } catch (err) {
      console.error('Failed to load billing summary:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const totalOutbound = data?.totalOutbound || 0;
  const calcPercent = (val: number) =>
    totalOutbound > 0 ? Math.round((val / totalOutbound) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-amber-400" />
              WhatsApp Campaign Billing & Delivery Observability
            </h3>
            <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold uppercase">
              Production Verified
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Live reconciliation of Meta WhatsApp Cloud API response tokens, carrier handset delivery receipts,
            and conversation-level accounting across project <code className="text-slate-300">lpbdwmpglwdedqdiovqu</code>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={loadData}
            disabled={loading}
            className="border-slate-700 text-slate-200 hover:bg-slate-800 text-xs h-9"
          >
            <RotateCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>

          <a
            href={metaBillingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md text-xs font-semibold h-9 px-3 bg-amber-500 hover:bg-amber-600 text-slate-950 transition-colors shadow-sm"
          >
            <CreditCard className="w-3.5 h-3.5 mr-1.5" />
            Meta Billing Hub
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </div>
      </div>

      {/* 2. Meta Account Configuration & Critical Ledger Advisory */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card A: Account IDs */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Meta Infrastructure
            </span>
            <span className="text-[10px] text-slate-500 font-mono">v21.0 API</span>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <span className="text-[11px] text-slate-500 block">WhatsApp Business Account (WABA):</span>
              <span className="font-mono text-slate-200 font-semibold">1017083661443186</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">Phone Number ID:</span>
              <span className="font-mono text-slate-200 font-semibold">560867040441160</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">Meta Business ID:</span>
              <span className="font-mono text-slate-200 font-semibold">1044710364058310</span>
            </div>
          </div>
        </div>

        {/* Card B: Critical Billing Ledger Distinction (Ad Accounts vs Messaging Accounts) */}
        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-5 space-y-2 md:col-span-2 relative overflow-hidden">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
            <AlertTriangle className="w-4 h-4" />
            Crucial Meta Billing Rule: Ad Accounts vs. Messaging Accounts
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Meta Business Manager isolates balances into two distinct ledgers:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
            <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
              <span className="font-semibold text-slate-200 block text-[11px]">1. Ad Accounts Tab:</span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Funds feed ads & click-to-WhatsApp ads. <strong className="text-slate-300">Cannot</strong> be automatically deducted for WhatsApp Cloud API message delivery unless explicitly linked.
              </p>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded-lg border border-amber-500/20">
              <span className="font-semibold text-amber-300 block text-[11px]">2. Messaging Accounts Tab:</span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Directly finances Cloud API template dispatches. Attach a credit/debit card or select the funded ad account as the primary payment method for WABA 1017083661443186.
              </p>
            </div>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
            <Info className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
            <span>
              Meta does not expose live prepaid balance figures through Cloud API endpoints. Real-time balance must be inspected in Meta Billing Hub.
            </span>
          </div>
        </div>
      </div>

      {/* 3. The 6-Stage Delivery Lifecycle Reconciliation Funnel */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              Delivery Lifecycle Reconciliation Funnel
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Strictly distinguishes synchronous API acceptance from handset delivery, read receipts, and billing failures.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Total Outbound Messages: <strong className="text-slate-100">{totalOutbound}</strong>
          </span>
        </div>

        {/* Funnel Stage Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Stage 1: API Accepted */}
          <div className="bg-slate-950/70 border border-blue-500/30 rounded-xl p-3.5 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-blue-400 flex items-center gap-1">
                <Send className="w-3.5 h-3.5" />
                API Accepted
              </span>
              <span className="text-[10px] font-mono text-slate-400">{calcPercent(data?.apiAcceptedCount || 0)}%</span>
            </div>
            <p className="text-xl font-mono font-bold text-slate-100">{data?.apiAcceptedCount || 0}</p>
            <p className="text-[10px] text-slate-500 leading-tight">
              Meta returned HTTP 200 with valid WAMID.
            </p>
          </div>

          {/* Stage 2: Sent */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Sent
              </span>
              <span className="text-[10px] font-mono text-slate-400">{calcPercent(data?.sentCount || 0)}%</span>
            </div>
            <p className="text-xl font-mono font-bold text-slate-100">{data?.sentCount || 0}</p>
            <p className="text-[10px] text-slate-500 leading-tight">
              Dispatched; in-flight through telecom network.
            </p>
          </div>

          {/* Stage 3: Delivered */}
          <div className="bg-slate-950/70 border border-emerald-500/30 rounded-xl p-3.5 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5" />
                Delivered
              </span>
              <span className="text-[10px] font-mono text-slate-400">{calcPercent(data?.deliveredCount || 0)}%</span>
            </div>
            <p className="text-xl font-mono font-bold text-slate-100">{data?.deliveredCount || 0}</p>
            <p className="text-[10px] text-slate-500 leading-tight">
              Confirmed delivery receipt from recipient handset.
            </p>
          </div>

          {/* Stage 4: Read */}
          <div className="bg-slate-950/70 border border-purple-500/30 rounded-xl p-3.5 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-purple-400 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                Read
              </span>
              <span className="text-[10px] font-mono text-slate-400">{calcPercent(data?.readCount || 0)}%</span>
            </div>
            <p className="text-xl font-mono font-bold text-slate-100">{data?.readCount || 0}</p>
            <p className="text-[10px] text-slate-500 leading-tight">
              Customer opened chat (blue ticks received).
            </p>
          </div>

          {/* Stage 5: Failed */}
          <div className="bg-slate-950/70 border border-rose-500/30 rounded-xl p-3.5 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-rose-400 flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" />
                Failed
              </span>
              <span className="text-[10px] font-mono text-slate-400">{calcPercent(data?.failedCount || 0)}%</span>
            </div>
            <p className="text-xl font-mono font-bold text-slate-100">{data?.failedCount || 0}</p>
            <p className="text-[10px] text-slate-500 leading-tight">
              Payment issue (131042) or 24h expired (131047).
            </p>
          </div>

          {/* Stage 6: Unknown */}
          <div className="bg-slate-950/70 border border-amber-500/30 rounded-xl p-3.5 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" />
                Unknown
              </span>
              <span className="text-[10px] font-mono text-slate-400">{calcPercent(data?.unknownCount || 0)}%</span>
            </div>
            <p className="text-xl font-mono font-bold text-slate-100">{data?.unknownCount || 0}</p>
            <p className="text-[10px] text-slate-500 leading-tight">
              Network timeouts; quarantined without retry.
            </p>
          </div>
        </div>

        {/* Delivery Principle Warning */}
        <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-200">Accounting Principle:</strong> Meta WhatsApp Cloud API bills on a{' '}
            <span className="text-amber-400 font-semibold">24-hour conversation window model</span>. You are billed only when a marketing or utility message is successfully delivered to the recipient handset. Undelivered messages or pipeline rejections (such as Error 131042 payment errors) do{' '}
            <strong className="text-slate-200">not</strong> incur Meta conversation debits.
          </div>
        </div>
      </div>

      {/* 4. Real-Time Failure & Error Diagnostic Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              Real-Time Delivery Failure & Error Audit
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Exact error codes, descriptions, and correlation tokens captured by webhook worker from Meta Cloud API.
            </p>
          </div>
          <span className="text-[11px] font-mono bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded">
            {data?.recentFailures.length || 0} Recorded Failures
          </span>
        </div>

        {data?.recentFailures && data.recentFailures.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Recipient</th>
                  <th className="py-2.5 px-3">Error Code</th>
                  <th className="py-2.5 px-3">Error Title</th>
                  <th className="py-2.5 px-3">Meta Error Details</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {data.recentFailures.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 text-slate-400 whitespace-nowrap text-[11px]">
                      {new Date(f.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                    </td>
                    <td className="py-2.5 px-3 text-slate-200 font-semibold whitespace-nowrap">
                      {f.phone ? `+${f.phone.slice(0, 4)}••••${f.phone.slice(-4)}` : 'Unknown'}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        {f.errorCode || 'N/A'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans font-medium whitespace-nowrap">
                      {f.errorTitle || 'Delivery Failed'}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 font-sans text-[11px] max-w-md truncate">
                      {f.errorMessage || 'No error details provided'}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-rose-400 border border-slate-700">
                        {f.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500 text-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-500/50 mx-auto mb-2" />
            No delivery failures recorded in the database.
          </div>
        )}
      </div>

      {/* 5. Meta WhatsApp Pricing Reference Guide */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
        <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-emerald-400" />
          Meta Conversation Categories & Estimated Billing Rates (India / INR)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] font-bold text-amber-400 block">Marketing Templates</span>
            <p className="text-base font-bold text-slate-200 mt-1 font-mono">~₹0.82 / 24h</p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Promotions, new launches, offers (e.g. canny_aravindham1).
            </p>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] font-bold text-blue-400 block">Utility Templates</span>
            <p className="text-base font-bold text-slate-200 mt-1 font-mono">~₹0.11 / 24h</p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Account updates, order alerts, transactional receipts.
            </p>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] font-bold text-purple-400 block">Authentication (OTP)</span>
            <p className="text-base font-bold text-slate-200 mt-1 font-mono">~₹0.11 / 24h</p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              One-time verification codes with copy-code buttons.
            </p>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] font-bold text-emerald-400 block">Service Conversations</span>
            <p className="text-base font-bold text-slate-200 mt-1 font-mono">Free Tier / ~₹0.35</p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Customer-initiated inquiries inside the 24-hour service window.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
