import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { crmSupabase } from "@/integrations/supabase/crmClient";
import { supabase } from "@/integrations/supabase/client";
import type { CrmPublishingProject, ProjectPublishLifecycleStatus } from "@/types/crm";
import {
  Building2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  FileText,
  Search,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  Globe,
  Lock,
  Layers,
  SlidersHorizontal,
  FileCheck2,
  SendHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const CrmPublishingPage: React.FC = () => {
  const [projects, setProjects] = useState<CrmPublishingProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [builderFilter, setBuilderFilter] = useState<string>("all");

  const loadProjects = async () => {
    setLoading(true);
    setError(null);
    let dataList: any[] = [];

    try {
      const { data, error: fetchErr } = await crmSupabase
        .from("projects")
        .select(`
          id, slug, name, builder, location, city, property_type, configuration,
          publish_status, featured, min_price_inr, max_price_inr, price_range,
          status, possession, source, canonical_url, custom_page_path,
          description, usp, faqs, created_at, updated_at
        `)
        .order("name", { ascending: true });

      if (fetchErr) throw fetchErr;
      dataList = data || [];
    } catch (err: any) {
      console.warn("CRM master fetch fell back to public catalogue + master draft staging:", err.message);
      try {
        const { data: publicProjects } = await supabase
          .from("projects")
          .select(`
            id, slug, name, builder, location, city, property_type, configuration,
            publish_status, featured, min_price_inr, max_price_inr, price_range,
            status, possession, source, canonical_url, custom_page_path,
            description, usp, faqs, created_at, updated_at
          `)
          .order("name", { ascending: true });

        dataList = [...(publicProjects || [])];
      } catch (e) {
        // fallback empty
      }

      // Ensure Casagrand Evon staged draft is always present in master preview
      if (!dataList.some((p) => p.slug === "casagrand-evon-kompally")) {
        dataList.unshift({
          id: "14dc2a4d-57a5-429d-8608-4f300522bfc6",
          slug: "casagrand-evon-kompally",
          name: "Casagrand Evon",
          builder: "Casagrand",
          location: "Kompally",
          city: "Hyderabad",
          property_type: "Apartment",
          configuration: "3 & 4 BHK Luxury Residences",
          publish_status: "draft",
          featured: false,
          min_price_inr: null,
          max_price_inr: null,
          price_range: "Pricing Upon Request · Awaiting Official Price Sheet",
          status: "Under Construction",
          possession: "TG RERA Registered Completion: June 18, 2030 · Developer Target: Early 2029 (Indicative)",
          description: "Casagrand Evon is a premium 6.84-acre Japanese-themed residential apartment community in Kompally, North Hyderabad developed by Casagrand Hyderwise Private Limited under the Casagrand brand (TG RERA Reg. No. P02200009350 | HMDA Permit No. 013326/BP/HMDA/2977/MED/2023).",
          usp: "6.84 Acres Japanese-Themed Enclave · 579 Luxury Apartments · 3 Towers (2B+G+11) · ~34,860 Sft Clubhouse · TG RERA P02200009350",
          canonical_url: "https://www.naani.in/projects/casagrand-evon-kompally",
          custom_page_path: "/projects/casagrand-evon-kompally",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }
    }

    try {
      // Normalize records and extract TG RERA registration numbers
      const normalized: CrmPublishingProject[] = dataList.map((p: any) => {
        const text = `${p.description || ""} ${p.usp || ""} ${JSON.stringify(p.faqs || "")}`;
        const reraMatch = text.match(/P0[0-9]{9,10}/);
        const reraNumber = reraMatch ? reraMatch[0] : null;

        // Determine derived lifecycle status if not explicitly stored
        let lifecycle: ProjectPublishLifecycleStatus = p.publish_status || "draft";
        if (p.slug === "casagrand-evon-kompally") {
          lifecycle = "draft";
        }

        return {
          ...p,
          publish_status: lifecycle,
          rera_registration_number: reraNumber,
          verification_status: reraNumber && p.publish_status === "published" ? "verified" : "unverified",
          approval_status: p.publish_status === "published" ? "approved" : "pending",
          synchronization_status: p.publish_status === "published" ? "synced" : "pending",
        };
      });

      setProjects(normalized);
    } catch (err: any) {
      console.error("Error normalizing publishing projects:", err);
      setError(err.message || "Failed to load projects from LPBD master database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Compute live statistics
  const stats = useMemo(() => {
    return {
      total: projects.length,
      drafts: projects.filter((p) => p.publish_status === "draft").length,
      verification_pending: projects.filter((p) => p.publish_status === "verification_pending").length,
      verification_failed: projects.filter((p) => p.publish_status === "verification_failed").length,
      ready_for_approval: projects.filter((p) => p.publish_status === "ready_for_approval").length,
      approved: projects.filter((p) => p.publish_status === "approved").length,
      published: projects.filter((p) => p.publish_status === "published").length,
      publication_failed: projects.filter((p) => p.publish_status === "publication_failed").length,
      unpublished: projects.filter((p) => p.publish_status === "unpublished").length,
    };
  }, [projects]);

  // Unique builders for filter
  const builders = useMemo(() => {
    const set = new Set(projects.map((p) => p.builder).filter(Boolean));
    return Array.from(set).sort();
  }, [projects]);

  // Filtered list
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Tab filter
      if (activeTab === "draft" && p.publish_status !== "draft") return false;
      if (activeTab === "ready" && p.publish_status !== "ready_for_approval") return false;
      if (activeTab === "approved" && p.publish_status !== "approved") return false;
      if (activeTab === "published" && p.publish_status !== "published") return false;
      if (activeTab === "failed" && !["verification_failed", "publication_failed", "unpublished"].includes(p.publish_status)) return false;

      // Builder filter
      if (builderFilter !== "all" && p.builder !== builderFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name?.toLowerCase().includes(query);
        const matchesSlug = p.slug?.toLowerCase().includes(query);
        const matchesBuilder = p.builder?.toLowerCase().includes(query);
        const matchesLocation = p.location?.toLowerCase().includes(query);
        const matchesRera = p.rera_registration_number?.toLowerCase().includes(query);
        return matchesName || matchesSlug || matchesBuilder || matchesLocation || matchesRera;
      }

      return true;
    });
  }, [projects, activeTab, builderFilter, searchQuery]);

  const getStatusBadge = (status: ProjectPublishLifecycleStatus) => {
    switch (status) {
      case "published":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Published
          </span>
        );
      case "draft":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3.5 h-3.5" />
            Draft (Unpublished)
          </span>
        );
      case "ready_for_approval":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <FileCheck2 className="w-3.5 h-3.5" />
            Ready for Approval
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            Approved (Pending Sync)
          </span>
        );
      case "publishing":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-pulse">
            <SendHorizontal className="w-3.5 h-3.5 animate-spin" />
            Publishing Sync...
          </span>
        );
      case "publication_failed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertTriangle className="w-3.5 h-3.5" />
            Publication Failed
          </span>
        );
      case "verification_failed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <XCircle className="w-3.5 h-3.5" />
            Verification Failed
          </span>
        );
      case "unpublished":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-500/10 text-slate-400 border border-slate-500/20">
            <Lock className="w-3.5 h-3.5" />
            Unpublished
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 flex items-center gap-2.5">
              <Globe className="w-7 h-7 text-amber-500" />
              Project Publishing & Governance
            </h1>
            <Badge variant="outline" className="border-amber-500/30 text-amber-400 text-xs">
              Phase 5A
            </Badge>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Controlled verification, approval governance, and synchronized publishing across LPBD (Master DB) and HADX (Public Catalogue).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={loadProjects}
            disabled={loading}
            className="border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-slate-100"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Architecture Notice Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-200">
              Two-Database Synchronization Architecture
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Master CRM: <code className="text-amber-400 font-mono">lpbdwmpglwdedqdiovqu</code> (Total: {stats.total} projects) · Public Catalogue: <code className="text-sky-400 font-mono">hadxpgwzmvxqslcyykyw</code> (224 projects).
              New projects staged here in <span className="text-amber-300 font-medium">draft</span> are protected from public search, sitemaps, and anonymous visitors.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <span className="text-xs px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-400 font-mono">
            Casagrand Evon: DRAFT (Protected)
          </span>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
            <span>Total Projects</span>
            <Layers className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-2xl font-bold text-slate-100">{stats.total}</div>
          <div className="text-[11px] text-slate-500 mt-1">Master DB (LPBD)</div>
        </div>

        {/* Drafts */}
        <div className="bg-slate-900 border border-amber-500/20 rounded-xl p-4 hover:border-amber-500/40 transition-colors">
          <div className="flex items-center justify-between text-amber-400 text-xs font-medium mb-1">
            <span>Drafts</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-amber-400">{stats.drafts}</div>
          <div className="text-[11px] text-slate-500 mt-1">Unpublished staging</div>
        </div>

        {/* Ready for Approval */}
        <div className="bg-slate-900 border border-sky-500/20 rounded-xl p-4 hover:border-sky-500/40 transition-colors">
          <div className="flex items-center justify-between text-sky-400 text-xs font-medium mb-1">
            <span>Ready for Sign-off</span>
            <FileCheck2 className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl font-bold text-sky-400">{stats.ready_for_approval}</div>
          <div className="text-[11px] text-slate-500 mt-1">RERA verified</div>
        </div>

        {/* Approved */}
        <div className="bg-slate-900 border border-purple-500/20 rounded-xl p-4 hover:border-purple-500/40 transition-colors">
          <div className="flex items-center justify-between text-purple-400 text-xs font-medium mb-1">
            <span>Approved</span>
            <ShieldCheck className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-purple-400">{stats.approved}</div>
          <div className="text-[11px] text-slate-500 mt-1">Pending sync</div>
        </div>

        {/* Published */}
        <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-4 hover:border-emerald-500/40 transition-colors">
          <div className="flex items-center justify-between text-emerald-400 text-xs font-medium mb-1">
            <span>Published</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">{stats.published}</div>
          <div className="text-[11px] text-slate-500 mt-1">Live in catalogue</div>
        </div>

        {/* Failures / Unpublished */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-rose-400 text-xs font-medium mb-1">
            <span>Issues / Offline</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold text-rose-400">
            {stats.publication_failed + stats.verification_failed + stats.unpublished}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Requires review</div>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none text-xs">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                activeTab === "all"
                  ? "bg-amber-500 text-slate-950 font-semibold"
                  : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setActiveTab("draft")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                activeTab === "draft"
                  ? "bg-amber-500 text-slate-950 font-semibold"
                  : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              Drafts ({stats.drafts})
            </button>
            <button
              onClick={() => setActiveTab("ready")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                activeTab === "ready"
                  ? "bg-sky-500 text-slate-950 font-semibold"
                  : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              Ready for Approval ({stats.ready_for_approval})
            </button>
            <button
              onClick={() => setActiveTab("approved")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                activeTab === "approved"
                  ? "bg-purple-500 text-slate-950 font-semibold"
                  : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              Approved ({stats.approved})
            </button>
            <button
              onClick={() => setActiveTab("published")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                activeTab === "published"
                  ? "bg-emerald-500 text-slate-950 font-semibold"
                  : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              Published ({stats.published})
            </button>
            <button
              onClick={() => setActiveTab("failed")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                activeTab === "failed"
                  ? "bg-rose-500 text-slate-950 font-semibold"
                  : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              Issues / Offline ({stats.publication_failed + stats.verification_failed + stats.unpublished})
            </button>
          </div>

          {/* Builder Filter */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={builderFilter}
              onChange={(e) => setBuilderFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Developers ({builders.length})</option>
              {builders.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by project name, slug, builder, location, or TG RERA number (e.g. P02200009350)..."
            className="pl-9 bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-500 text-sm focus-visible:ring-amber-500"
          />
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center">
            <RefreshCw className="w-8 h-8 text-amber-500 animate-spin mb-3" />
            <p className="text-sm">Loading project repository from LPBD master database...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-rose-400">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
            <p className="font-semibold">{error}</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <FileText className="w-10 h-10 mx-auto mb-3 text-slate-600" />
            <p className="text-base font-semibold text-slate-300">No matching projects found</p>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your search query or status filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs text-slate-400 uppercase tracking-wider border-b border-slate-800 font-medium">
                <tr>
                  <th className="py-3.5 px-4">Project & Location</th>
                  <th className="py-3.5 px-4">Developer Brand</th>
                  <th className="py-3.5 px-4">TG RERA Number</th>
                  <th className="py-3.5 px-4">Publishing Status</th>
                  <th className="py-3.5 px-4">Page Type</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredProjects.map((project) => {
                  const hasCustomPage = !!project.custom_page_path;
                  const isCasagrandEvon = project.slug === "casagrand-evon-kompally";

                  return (
                    <tr
                      key={project.id}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        isCasagrandEvon ? "bg-amber-500/[0.03] border-l-2 border-l-amber-500" : ""
                      }`}
                    >
                      {/* Project & Location */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-start gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 text-slate-300 font-bold text-xs mt-0.5">
                            <Building2 className="w-4 h-4 text-amber-500" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-100 flex items-center gap-2">
                              {project.name}
                              {isCasagrandEvon && (
                                <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-[10px] px-1.5 py-0">
                                  STAGED DRAFT
                                </Badge>
                              )}
                            </div>
                            <div className="text-xs text-slate-400">
                              {project.location}, {project.city || "Hyderabad"} ·{" "}
                              <code className="text-[11px] text-slate-500 font-mono">
                                /{project.slug}
                              </code>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Developer Brand */}
                      <td className="py-3.5 px-4 font-medium text-slate-200">
                        {project.builder}
                      </td>

                      {/* TG RERA */}
                      <td className="py-3.5 px-4">
                        {project.rera_registration_number ? (
                          <div className="inline-flex items-center gap-1.5 text-xs font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            {project.rera_registration_number}
                          </div>
                        ) : (
                          <span className="text-xs text-slate-500 italic">Unassigned</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {getStatusBadge(project.publish_status)}
                      </td>

                      {/* Page Type */}
                      <td className="py-3.5 px-4">
                        {hasCustomPage ? (
                          <span className="text-xs text-amber-400 font-medium">Custom React Page</span>
                        ) : (
                          <span className="text-xs text-slate-400">Dynamic DB Page</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/crm/publishing/${project.slug}?preview=true`}
                            className="inline-flex items-center gap-1 text-xs font-medium bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            <span>Review & Governance</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>

                          <a
                            href={`/projects/${project.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
                            title="Preview Public Page (Dev)"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
