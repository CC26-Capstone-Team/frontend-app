import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const isOnboarded = request.cookies.get("is_onboarded")?.value === "true";
  const { pathname } = request.nextUrl;

  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/career-recommendations");

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && !isOnboarded && isProtectedRoute) {
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  if (
    token &&
    (pathname === "/" || pathname === "/register" || pathname === "/login")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (token && isOnboarded && pathname.startsWith("/onboarding")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/dashboard",
    "/dashboard/:path",
    "/career-recommendations",
    "/career-recommendations/:path*",
    "/onboarding",
  ],
};
