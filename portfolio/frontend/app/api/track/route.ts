import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashVisitor, parseUserAgent } from "@/lib/visitor";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    // Honour Do Not Track / Global Privacy Control
    if (req.headers.get("dnt") === "1" || req.headers.get("sec-gpc") === "1") {
      return NextResponse.json({ ok: true, tracked: false });
    }

    const body = await req.json().catch(() => ({}));
    const path = typeof body.path === "string" ? body.path.slice(0, 200) : "/";
    const referrer =
      typeof body.referrer === "string" && body.referrer
        ? body.referrer.slice(0, 300)
        : null;

    const ua = req.headers.get("user-agent") ?? "";
    const { device, browser, os } = parseUserAgent(ua);

    // Skip bots so the numbers reflect real people
    if (device === "bot") {
      return NextResponse.json({ ok: true, tracked: false });
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    // Country/city headers are set automatically when hosted on Vercel
    const country = req.headers.get("x-vercel-ip-country");
    const rawCity = req.headers.get("x-vercel-ip-city");
    const city = rawCity ? decodeURIComponent(rawCity) : null;

    await prisma.visit.create({
      data: {
        path,
        referrer,
        country,
        city,
        device,
        browser,
        os,
        visitorHash: hashVisitor(ip, ua),
        userAgent: ua.slice(0, 300),
      },
    });

    return NextResponse.json({ ok: true, tracked: true });
  } catch (err) {
    console.error("track error", err);
    // Never let analytics break the visitor's experience
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
