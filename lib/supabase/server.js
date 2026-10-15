import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createServerClient as createSupabaseSsrClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  const url = (process.env.SUPABASE_URL || "")
    .replace(/\/rest\/v1\/?$/, "")
    .replace(/\/+$/, "");
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error(
      "SUPABASE_URL atau SUPABASE_SECRET_KEY belum diatur di environment variable."
    );
  }

  return createSupabaseClient(url, secretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function createSessionClient() {
  const cookieStore = await cookies();
  const url = (process.env.SUPABASE_URL || "")
    .replace(/\/rest\/v1\/?$/, "")
    .replace(/\/+$/, "");
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error(
      "SUPABASE_URL atau SUPABASE_PUBLISHABLE_KEY belum diatur di environment variable."
    );
  }

  return createSupabaseSsrClient(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Method setAll dipanggil dari Server Component
        }
      },
    },
  });
}

export const getSupabaseServer = createClient;
export const buatClientServer = createClient;
export const createServerClient = createClient;

export const createAdminClient = createSessionClient;
export const buatClientAdmin = createSessionClient;

export default createClient;
