import { createBrowserClient } from "@supabase/ssr";

export const getSupabaseBrowserClient = () => {
  try {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  } catch (e) {
    console.error(e);
  }
};
