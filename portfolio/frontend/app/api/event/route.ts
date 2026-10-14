import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashVisitor, parseUserAgent } from "@/lib/visitor";

export const runtime = "nodejs";

const ALLOWED = new Set(["cv_download", "email_click", "phone_click", "whatsapp_click", "github_click", "linkedin_click"]);

export async function POST(req: NextRequest) {
  try {
    if (req.headers.get("dnt") === "1" || req.headers.get("sec-gpc") === "1") {
      return NextResponse.json({ ok: true });
    }
    const body = await req.json().catch(() => ({}));
    const type = String(body.type ?? "");
    if (!ALLOWED.has(type)) return NextResponse.json({ ok: false }, { status: 400 });

    const ua = req.headers.get("user-agent") ?? "";
    if (parseUserAgent(ua).device === "bot") return NextResponse.json({ ok: true });

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? req.headers.get("x-real-ip") ?? "unknown";
    await prisma.event.create({ data: { type, visitorHash: hashVisitor(ip, ua) } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("event error", err);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
