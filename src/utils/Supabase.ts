import { SupabaseClient, createClient } from "@supabase/supabase-js";

if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
  throw new Error(
    "ENV NOT PROVIDED: Requires SUPABASE_URL and SUPABASE_ANON_KEY"
  );

const globalForSupabase = global as unknown as {
  supabase: SupabaseClient;
};

const supabase =
  globalForSupabase.supabase ??
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
if (process.env.NODE_ENV !== "production")
  globalForSupabase.supabase = supabase;

export default supabase;
