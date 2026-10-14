import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, isValidSession } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/admin/login") return NextResponse.next();

  const ok = await isValidSession(req.cookies.get(ADMIN_COOKIE)?.value);
  if (!ok) return NextResponse.redirect(new URL("/admin/login", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
