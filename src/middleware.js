import { getSupabaseReqResClient } from "@/supabase-utils/reqResClient";

export async function middleware(request) {
  const { supabase, response } = getSupabaseReqResClient({ request });

  console.log("request.url", request.url);

  return response.value;
}

export const config = {
  matcher: ["/((?!.*\\.).*)"],
};
