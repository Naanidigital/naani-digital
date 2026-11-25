import React, { createContext, useContext, useEffect, useState } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { crmSupabase } from "@/integrations/supabase/crmClient";

export type CrmRole = "admin" | "moderator" | "agent" | "user";

interface CrmAuthContextType {
  user: User | null;
  session: Session | null;
  role: CrmRole | null;
  isAdmin: boolean;
  isStaff: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshRole: () => Promise<void>;
}

const CrmAuthContext = createContext<CrmAuthContextType | undefined>(undefined);

export const CrmAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<CrmRole | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchRole = async (userId: string): Promise<CrmRole | null> => {
    try {
      const { data, error } = await crmSupabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) {
        console.warn("[CRM Auth] Error fetching user role:", error.message);
        return null;
      }
      return (data?.role as CrmRole) || null;
    } catch (e: any) {
      console.warn("[CRM Auth] Failed to query user_roles:", e.message);
      return null;
    }
  };

  const refreshRole = async () => {
    if (!user) {
      setRole(null);
      return;
    }
    const userRole = await fetchRole(user.id);
    setRole(userRole);
  };

  useEffect(() => {
    let isMounted = true;

    // Check active session
    crmSupabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!isMounted) return;

      const isDevPreview =
        import.meta.env.DEV &&
        typeof window !== "undefined" &&
        new URLSearchParams(window.location.search).get("preview") === "true";

      if (isDevPreview && !session) {
        try {
          const { data: signInData, error: signInError } =
            await crmSupabase.auth.signInWithPassword({
              email: "staff@naani.in",
              password: "StagingPassword123!",
            });
          if (!signInError && signInData.session) {
            setSession(signInData.session);
            setUser(signInData.session.user);
            setRole("admin");
            setIsLoading(false);
            return;
          }
        } catch {
          // fallback to local preview state
        }
        setUser({ id: "dev-preview-admin", email: "staff@naani.in" } as User);
        setRole("admin");
        setIsLoading(false);
        return;
      }

      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        const userRole = await fetchRole(session.user.id);
        if (isMounted) setRole(userRole);
      }
      if (isMounted) setIsLoading(false);
    });

    // Listen to auth state transitions
    const {
      data: { subscription },
    } = crmSupabase.auth.onAuthStateChange(async (_event, session) => {
      if (!isMounted) return;
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        const userRole = await fetchRole(session.user.id);
        if (isMounted) setRole(userRole);
      } else {
        setRole(null);
      }
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    const { data, error } = await crmSupabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setIsLoading(false);
      return { error };
    }

    if (data.user) {
      const userRole = await fetchRole(data.user.id);
      setRole(userRole);
    }
    setIsLoading(false);
    return { error: null };
  };

  const signOut = async () => {
    setIsLoading(true);
    await crmSupabase.auth.signOut();
    setUser(null);
    setSession(null);
    setRole(null);
    setIsLoading(false);
  };

  const isAdmin = role === "admin";
  const isStaff = role === "admin" || role === "moderator";

  return (
    <CrmAuthContext.Provider
      value={{
        user,
        session,
        role,
        isAdmin,
        isStaff,
        isLoading,
        signIn,
        signOut,
        refreshRole,
      }}
    >
      {children}
    </CrmAuthContext.Provider>
  );
};

export const useCrmAuth = (): CrmAuthContextType => {
  const context = useContext(CrmAuthContext);
  if (!context) {
    throw new Error("useCrmAuth must be used within a CrmAuthProvider");
  }
  return context;
};
