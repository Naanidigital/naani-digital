import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { crmSupabase } from "@/integrations/supabase/crmClient";
import {
  Users,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  Calendar,
  MessageSquare,
  RefreshCw,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Lead {
  id: string;
  full_name: string | null;
  phone: string;
  email: string | null;
  looking_for: string | null;
  budget: string | null;
  preferred_location: string | null;
  status: string;
  source: string;
  notes: string | null;
  created_at: string;
  last_contacted_at: string | null;
}

const STATUS_FILTERS = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "Contacted", value: "contacted" },
  { label: "Qualified", value: "qualified" },
  { label: "Site Visit", value: "site_visit_scheduled" },
  { label: "Negotiation", value: "negotiation" },
  { label: "Closed Won", value: "closed_won" },
  { label: "Closed Lost", value: "closed_lost" },
];

export const CrmLeadsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const q = searchParams.get("search");
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      let query = crmSupabase
        .from("crm_leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data, error } = await query;
      if (error) {
        console.warn("[CRM Leads] Query error:", error.message);
      } else {
        setLeads(data || []);
      }
    } catch (err: any) {
      console.warn("[CRM Leads] Exception:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const handleStatusUpdate = async (leadId: string, newStatus: string) => {
    setUpdatingId(leadId);
    try {
      const { error } = await crmSupabase
        .from("crm_leads")
        .update({ status: newStatus, last_contacted_at: new Date().toISOString() })
        .eq("id", leadId);

      if (!error) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
        );
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredLeads = leads.filter((l) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const nameMatch = (l.full_name || "").toLowerCase().includes(q);
    const phoneMatch = l.phone.includes(q);
    const locMatch = (l.preferred_location || "").toLowerCase().includes(q);
    return nameMatch || phoneMatch || locMatch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight">
            Lead Management
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Capture, qualify, and advance real estate prospects in the sales pipeline
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchLeads}
          disabled={loading}
          className="border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800"
        >
          <RefreshCw className={`w-3.5 h-3.5 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh Leads
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <Input
            placeholder="Search by name, phone, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-900 border-slate-800 text-slate-100 rounded-xl"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === f.value
                  ? "bg-amber-500 text-slate-950 shadow-sm"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-20 text-center text-slate-500 text-sm">
            <RefreshCw className="w-6 h-6 text-amber-500 animate-spin mx-auto mb-2" />
            Loading prospects from database...
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-20 text-center text-slate-500 text-sm">
            <Users className="w-10 h-10 text-slate-700 mx-auto mb-3" />
            <p className="font-semibold text-slate-400">No leads match your criteria</p>
            <p className="text-xs text-slate-600 mt-1">
              New website submissions and WhatsApp contacts will populate this table automatically.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/70 border-b border-slate-800 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-3.5 px-4">Lead Name & Phone</th>
                  <th className="py-3.5 px-4">Interest & Budget</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-850/50 transition-colors">
                    {/* Name & Contact */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-100">
                        {lead.full_name || "Unnamed Prospect"}
                      </div>
                      <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <Phone className="w-3 h-3 text-slate-500" /> {lead.phone}
                      </div>
                      {lead.email && (
                        <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3" /> {lead.email}
                        </div>
                      )}
                    </td>

                    {/* Interest & Budget */}
                    <td className="py-3.5 px-4">
                      <div className="text-xs font-medium text-slate-200">
                        {lead.looking_for || "Not specified"}
                      </div>
                      <div className="text-xs text-amber-400/90 font-semibold mt-0.5">
                        {lead.budget ? `Budget: ${lead.budget}` : "Flexible"}
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-4">
                      <div className="text-xs text-slate-300 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {lead.preferred_location || "Hyderabad (General)"}
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase mt-0.5 font-mono">
                        Source: {lead.source}
                      </div>
                    </td>

                    {/* Status Select */}
                    <td className="py-3.5 px-4">
                      <select
                        value={lead.status}
                        disabled={updatingId === lead.id}
                        onChange={(e) => handleStatusUpdate(lead.id, e.target.value)}
                        className="bg-slate-950 border border-slate-700 text-xs rounded-lg px-2.5 py-1 text-slate-200 font-medium focus:border-amber-500"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="site_visit_scheduled">Site Visit</option>
                        <option value="negotiation">Negotiation</option>
                        <option value="closed_won">Closed Won</option>
                        <option value="closed_lost">Closed Lost</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-xs text-slate-400 whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>

                    {/* Quick WhatsApp Action */}
                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={`https://wa.me/${lead.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                          `Hi ${lead.full_name || "there"}, this is Naani Projects following up regarding your property inquiry.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1.5 rounded-lg transition-colors font-medium"
                      >
                        <MessageSquare className="w-3 h-3" /> WhatsApp
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
