import type { NextRequest, NextProxy } from "next/server";
import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth";
import { SECURITY_HEADERS, applySecurityHeaders } from "@/lib/security-headers";
import { NOT_FOUND_HTML } from "@/lib/not-found-page";

export const proxy: NextProxy = (request: NextRequest) => {
  const secretPath = process.env.SECRET_ADMIN_PATH;

  if (!secretPath) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  const isAdminRoot = pathname === `/${secretPath}/admin`;
  const isAdminSubRoute = pathname.startsWith(`/${secretPath}/admin/`);

  if (!isAdminRoot && !isAdminSubRoute) {
    return NextResponse.next();
  }

  // Login page is public within the admin route
  if (isAdminRoot) {
    return applySecurityHeaders(NextResponse.next());
  }

  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);

  if (!sessionCookie) {
    return new Response(NOT_FOUND_HTML, {
      status: 404,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        ...SECURITY_HEADERS,
      },
    });
  }

  return applySecurityHeaders(NextResponse.next());
};
