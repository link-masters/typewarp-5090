import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Redirect /blog?category=... or /blog?tag=... to /blog (301)
  // These query params create duplicate views that conflict with the canonical
  if (url.pathname === "/blog") {
    if (url.searchParams.has("tag") || url.searchParams.has("category")) {
      const cleanUrl = new URL("/blog", request.url);
      return NextResponse.redirect(cleanUrl, 301);
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/blog", "/blog/:path*"],
};
