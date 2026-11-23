import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useCrmAuth } from "@/contexts/CrmAuthContext";
import { ShieldAlert, LogOut, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CrmGuard: React.FC = () => {
  const { user, isStaff, isLoading, signOut } = useCrmAuth();
  const location = useLocation();

  const isDevPreview =
    import.meta.env.DEV &&
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("preview") === "true";

  if (isDevPreview) {
    return <Outlet />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-300">
        <Loader2 className="w-10 h-10 text-amber-500 animate-spin mb-4" />
        <p className="text-sm font-medium tracking-wide">Authenticating CRM Staff Access...</p>
      </div>
    );
  }

  // 1. Unauthenticated: Redirect to dedicated CRM login screen
  if (!user) {
    const nextPath = location.pathname + location.search;
    return <Navigate to={`/crm/login?next=${encodeURIComponent(nextPath)}`} replace />;
  }

  // 2. Authenticated but unauthorized: User lacks admin or moderator role
  if (!isStaff) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-red-500/30 rounded-2xl p-8 text-center shadow-2xl shadow-red-950/40">
          <div className="w-16 h-16 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto mb-5 border border-red-500/20">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-100 mb-2">Access Denied (403)</h1>
          <p className="text-sm text-slate-400 mb-6">
            You are signed in as <span className="font-semibold text-slate-200">{user.email}</span>, but your account does not have authorization to access the Naani Projects CRM.
          </p>
          <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3 text-xs text-slate-400 mb-6">
            Required Permission: <span className="text-amber-400 font-mono">admin</span> or <span className="text-amber-400 font-mono">moderator</span> in <code className="text-slate-300">public.user_roles</code>.
          </div>
          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              className="w-full border-slate-800 text-slate-300 hover:bg-slate-800"
              onClick={() => signOut()}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out & Switch Account
            </Button>
            <Button
              variant="ghost"
              className="w-full text-slate-400 hover:text-slate-200"
              onClick={() => (window.location.href = "/")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Naani.in
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authorized staff: Render CRM routes
  return <Outlet />;
};
