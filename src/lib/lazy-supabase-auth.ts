import { createMiddleware } from "@tanstack/react-start";

/**
 * Same behaviour as `attachSupabaseAuth` (adds the signed-in user's bearer token to serverFn
 * RPCs), but the Supabase browser client is imported on first use instead of being bundled
 * into the entry chunk every visitor downloads.
 */
/** True when a Supabase session may exist (stored token, or a Lovable preview frame with brokered storage). */
function maySignedIn(): boolean {
  try {
    if (window.parent !== window) return true;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("sb-") && key.endsWith("-auth-token")) return true;
    }
    return false;
  } catch {
    return true;
  }
}

export const attachSupabaseAuthLazy = createMiddleware({ type: "function" }).client(
  async ({ next }) => {
    // Anonymous visitors have no token to attach: skip loading the auth client entirely.
    if (!maySignedIn()) return next({ headers: {} });
    const { supabase } = await import("@/integrations/supabase/client");
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    return next({
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },
);
