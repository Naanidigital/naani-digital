import { useEffect, useState } from "react";
import NoIndex from "@/components/NoIndex";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

/**
 * OAuth 2.1 consent screen. Reached at /.lovable/oauth/consent when an
 * external MCP client (ChatGPT, Claude, etc.) asks the user to authorize it
 * against this app's managed Supabase OAuth server.
 */

// The Supabase JS `auth.oauth` namespace is beta; declare a small local shape
// so TypeScript doesn't complain while we call it through the runtime client.
type OAuthClient = { name?: string; client_uri?: string };
type AuthorizationDetails = {
  client?: OAuthClient;
  redirect_url?: string;
  redirect_to?: string;
  scopes?: string[] | string;
  redirect_uri?: string;
};
type OAuthResult<T> = { data: T | null; error: { message: string } | null };
type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<OAuthResult<AuthorizationDetails>>;
  approveAuthorization: (id: string) => Promise<OAuthResult<AuthorizationDetails>>;
  denyAuthorization: (id: string) => Promise<OAuthResult<AuthorizationDetails>>;
};

const oauthApi = () =>
  (supabase.auth as unknown as { oauth: OAuthApi }).oauth;

const OAuthConsentPage = () => {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<AuthorizationDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Missing authorization_id in the request.");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/login?next=" + encodeURIComponent(next);
        return;
      }
      setAccount(sess.session.user.email ?? sess.session.user.id);
      const { data, error } = await oauthApi().getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) {
        setError(error.message);
        return;
      }
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  const decide = async (approve: boolean) => {
    setBusy(true);
    setError(null);
    const api = oauthApi();
    const { data, error } = approve
      ? await api.approveAuthorization(authorizationId)
      : await api.denyAuthorization(authorizationId);
    if (error) {
      setError(error.message);
      setBusy(false);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setError("No redirect returned by the authorization server.");
      setBusy(false);
      return;
    }
    window.location.href = target;
  };

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 text-center">
          <h1 className="text-xl font-semibold mb-2">Authorization error</h1>
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          <Link to="/" className="text-primary underline text-sm">Return to Naani Projects</Link>
        </div>
      </main>
    );
  }

  if (!details) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background p-4">
        <p className="text-sm text-muted-foreground">Loading authorization…</p>
      </main>
    );
  }

  const clientName = details.client?.name || "an external app";
  const scopes = Array.isArray(details.scopes)
    ? details.scopes
    : typeof details.scopes === "string"
    ? details.scopes.split(/\s+/).filter(Boolean)
    : [];

  return (
    <>
    <NoIndex title="Authorize Access | Naani Projects" />
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xl">
        <div className="text-center mb-5">
          <Link to="/" className="text-lg font-semibold text-primary">Naani Projects</Link>
        </div>
        <h1 className="text-xl md:text-2xl font-bold mb-2">
          Connect {clientName} to your account
        </h1>
        <p className="text-sm text-muted-foreground mb-4">
          This lets {clientName} use Naani Projects as you and call the app's enabled tools while you're signed in.
        </p>

        <div className="rounded-lg border border-border p-3 text-sm space-y-1 mb-4">
          <div>
            <span className="text-muted-foreground">Signed in as: </span>
            <span className="font-medium">{account}</span>
          </div>
          {details.redirect_uri && (
            <div className="break-all">
              <span className="text-muted-foreground">Redirect: </span>
              <span className="font-mono text-xs">{details.redirect_uri}</span>
            </div>
          )}
          {scopes.length > 0 && (
            <div>
              <span className="text-muted-foreground">Requested access: </span>
              <span>{scopes.join(", ")}</span>
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground mb-5">
          This does not bypass Naani Projects' permissions or backend policies.
        </p>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => decide(false)}
            disabled={busy}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="flex-1"
            onClick={() => decide(true)}
            disabled={busy}
          >
            {busy ? "Working…" : "Approve"}
          </Button>
        </div>
      </div>
    </main>
    </>
  );
};

export default OAuthConsentPage;
