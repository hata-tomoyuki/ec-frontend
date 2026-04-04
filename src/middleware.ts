import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/account", "/admin", "/checkout", "/cart"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const needsAuth = protectedPaths.some((p) => pathname.startsWith(p));
  if (!needsAuth) return NextResponse.next();

  const token = request.cookies.get("access_token")?.value;
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/admin/:path*", "/checkout/:path*", "/cart/:path*"],
};
