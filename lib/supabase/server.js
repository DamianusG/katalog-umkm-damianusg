import { createClient as createSupabaseClient } from "@supabase/supabase-js";

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

export const getSupabaseServer = createClient;
export const buatClientServer = createClient;
export const createServerClient = createClient;

export default createClient;

