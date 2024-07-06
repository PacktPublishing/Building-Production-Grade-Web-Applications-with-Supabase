import { NextResponse } from "next/server";
import { getSupabaseReqResClient } from "./supabase-utils/reqResClient";

export async function middleware(req) {
  const { supabase, response } = getSupabaseReqResClient({ request: req });
  const session = await supabase.auth.getSession();

  const requestedPath = req.nextUrl.pathname;
  const sessionUser = session.data?.session?.user;

  console.log("requestedPath", requestedPath);

  if (requestedPath.startsWith("/tickets")) {
    if (!sessionUser) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else if (requestedPath === "/") {
    if (sessionUser) {
      return NextResponse.redirect(new URL("/tickets", req.url));
    }
  }

  return response.value;
}

export const config = {
  matcher: ["/((?!.*\\.).*)"],
};
