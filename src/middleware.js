import { NextResponse } from "next/server";
import { getSupabaseReqResClient } from "./supabase-utils/reqResClient";
import { TENANT_MAP } from "./tenant-map";
import { buildUrl, getHostnameAndPort } from "./utils/url-helpers";

export async function middleware(req) {
  const { supabase } = getSupabaseReqResClient({ request: req });
  const session = await supabase.auth.getSession();

  const [hostname] = getHostnameAndPort(req);

  if (hostname in TENANT_MAP === false) {
    return NextResponse.rewrite(new URL("/not-found", req.url));
  }

  const requestedPath = req.nextUrl.pathname;
  const sessionUser = session.data?.session?.user;

  // old way of parsing tenant from path
  // const [tenant, ...restOfPath] = requestedPath.substr(1).split("/");
  // const applicationPath = "/" + restOfPath.join("/");

  const tenant = TENANT_MAP[hostname];
  const applicationPath = requestedPath;

  if (!/[a-z0-9-_]+/.test(tenant)) {
    return NextResponse.rewrite(new URL("/not-found", req.url));
  }

  if (applicationPath.startsWith("/tickets")) {
    if (!sessionUser) {
      return NextResponse.redirect(buildUrl("/", tenant, req));
      // return NextResponse.redirect(new URL(`/${tenant}/`, req.url));
    } else if (!sessionUser.app_metadata.tenants?.includes(tenant)) {
      return NextResponse.error();
    }
  } else if (applicationPath === "/") {
    if (sessionUser) {
      return NextResponse.redirect(buildUrl("/tickets", tenant, req));
      // return NextResponse.redirect(new URL(`/${tenant}/tickets`, req.url));
    }
  }

  return NextResponse.rewrite(
    new URL(`/${tenant}${applicationPath}${req.nextUrl.search}`, req.url)
  );
}

export const config = {
  matcher: ["/((?!.*\\.).*)"],
};
