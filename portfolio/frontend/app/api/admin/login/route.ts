import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, sessionToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const password = String(form.get("password") ?? "");

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || password !== expected) {
    return NextResponse.redirect(new URL("/admin/login?error=1", req.url), 303);
  }

  const res = NextResponse.redirect(new URL("/admin", req.url), 303);
  res.cookies.set(ADMIN_COOKIE, await sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}
