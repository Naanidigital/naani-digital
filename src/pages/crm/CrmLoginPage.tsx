import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCrmAuth } from "@/contexts/CrmAuthContext";
import { Building2, Lock, Mail, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const CrmLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get("next") || "/crm";
  const { signIn, user, isStaff } = useCrmAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If already logged in as staff, immediately redirect
  React.useEffect(() => {
    if (user && isStaff) {
      navigate(next, { replace: true });
    }
  }, [user, isStaff, navigate, next]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const { error } = await signIn(email.trim(), password);
      if (error) {
        setErrorMessage(error.message || "Failed to sign in. Please verify your credentials.");
      } else {
        navigate(next, { replace: true });
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred during sign-in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 shadow-xl shadow-amber-500/20 mb-4">
          <Building2 className="w-8 h-8 stroke-[2.2]" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-100">
          Naani Projects CRM
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Authorized Staff & Real Estate Operator Portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl py-8 px-6 sm:px-10 shadow-2xl shadow-slate-950/80 backdrop-blur-xl">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/50 border border-red-500/30 flex items-start gap-3 text-red-300 text-sm">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="crm-email" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Staff Email
              </Label>
              <div className="mt-1.5 relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="h-4 w-4" />
                </div>
                <Input
                  id="crm-email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="name@naani.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-slate-950/80 border-slate-800 focus:border-amber-500 text-slate-100 placeholder:text-slate-600 rounded-xl py-2.5"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="crm-password" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Password
              </Label>
              <div className="mt-1.5 relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="h-4 w-4" />
                </div>
                <Input
                  id="crm-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-slate-950/80 border-slate-800 focus:border-amber-500 text-slate-100 placeholder:text-slate-600 rounded-xl py-2.5"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-xl py-2.5 shadow-lg shadow-amber-500/25 transition-all mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verifying Credentials...
                </>
              ) : (
                <>
                  Sign In to CRM
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800/80 text-center">
            <p className="text-xs text-slate-500">
              Connected Backend: <code className="text-slate-400 font-mono">lpbdwmpglwdedqdiovqu</code>
            </p>
            <p className="text-xs text-slate-600 mt-1">
              Public visitors may return to{" "}
              <a href="/" className="text-amber-500/80 hover:text-amber-400 underline">
                naani.in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
