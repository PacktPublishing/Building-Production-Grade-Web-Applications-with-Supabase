import { createServerClient, serializeCookieHeader } from "@supabase/ssr";
import { NextResponse } from "next/server";

export const getSupabaseReqResClient = ({ request, response }) => {
  let _response = {
    value: response ?? NextResponse.next({ request: request }),
  };

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          if ("getAll" in request.cookies) {
            return request.cookies.getAll();
          } else {
            // pages router / not middleware
            return Object.keys(request.cookies).map((name) => ({
              name,
              value: request.cookies[name],
            }));
          }
        },

        setAll(cookiesToSet) {
          if ("getAll" in request.cookies) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value);
            });

            response.value = NextResponse.next({
              request,
            });

            cookiesToSet.forEach(({ name, value, options }) => {
              response.value.cookies.set(name, value, options);
            });
          } else {
            // pages router / not middleware
            response.setHeader(
              "Set-Cookie",
              cookiesToSet.map(({ name, value, options }) =>
                serializeCookieHeader(name, value, options)
              )
            );
          }
        },
      },
    }
  );

  return { supabase, response: _response };
};
