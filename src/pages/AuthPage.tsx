import { useEffect, useState } from "react";
import NoIndex from "@/components/NoIndex";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Sign-in / sign-up page. Preserves a `?next=<same-origin path>` parameter
 * across every path (password sign-in, sign-up email confirmation, Google
 * OAuth) so the OAuth consent route can send the user back to the
 * authorization request after they authenticate.
 */
const AuthPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const rawNext = params.get("next") || "/";
  // Only allow same-origin relative paths as the return target.
  const next = rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/";
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active && data.session) navigate(next, { replace: true });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate(next, { replace: true });
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate, next]);

  const handleGoogle = async () => {
    setError(null);
    setBusy(true);
    const returnUrl = `${window.location.origin}${next}`;
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: returnUrl,
    });
    if (result.error) {
      setError(result.error.message || "Google sign-in failed.");
      setBusy(false);
      return;
    }
    if (result.redirected) return;
    // Session already set — onAuthStateChange will redirect.
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setBusy(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      // success -> onAuthStateChange redirects
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}${next}` },
      });
      if (error) setError(error.message);
      else setInfo("Check your email to confirm your account, then return here.");
    }
    setBusy(false);
  };

  return (
    <>
    <NoIndex title="Sign In | Naani Projects" />
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xl">
        <div className="text-center mb-6">
          <Link to="/" className="text-2xl font-bold text-primary">Naani Projects</Link>
          <p className="text-sm text-muted-foreground mt-2">
            {mode === "signin" ? "Sign in to continue" : "Create your account"}
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogle}
          disabled={busy}
        >
          Continue with Google
        </Button>

        <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          or
          <span className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={handleEmail} className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          {info && <p className="text-sm text-muted-foreground">{info}</p>}
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-4">
          {mode === "signin" ? (
            <>
              New here?{" "}
              <button className="text-primary underline" onClick={() => setMode("signup")}>
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button className="text-primary underline" onClick={() => setMode("signin")}>
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </main>
    </>
  );
};

export default AuthPage;
