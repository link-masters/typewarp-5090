import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // We only want to intercept /blog and /blog/* paths
  if (url.pathname.startsWith("/blog")) {
    // If the URL has 'tag' or 'category' query parameters, we force noindex
    // to prevent Semrush and Google from crawling filtered/duplicate views
    if (url.searchParams.has("tag") || url.searchParams.has("category")) {
      const response = NextResponse.next();
      response.headers.set("X-Robots-Tag", "noindex, nofollow");
      return response;
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/blog", "/blog/:path*"],
};
