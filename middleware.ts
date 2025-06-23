// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = ["/login", "/register"];
const privateRoutes = ["/profile", "/notifications", "/messages", "/settings"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt")?.value;
  const pathname = request.nextUrl.pathname;

  if (authRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (privateRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sw.js).*)"],
};
