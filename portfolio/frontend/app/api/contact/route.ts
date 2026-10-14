import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashVisitor } from "@/lib/visitor";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));

  // Honeypot: real visitors never fill this hidden field
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim().slice(0, 100);
  const email = String(body.email ?? "").trim().slice(0, 200);
  const message = String(body.message ?? "").trim().slice(0, 3000);

  if (!name || !EMAIL_RE.test(email) || message.length < 5) {
    return NextResponse.json({ ok: false, error: "Please fill in all fields correctly." }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? req.headers.get("x-real-ip") ?? "unknown";
  const ua = req.headers.get("user-agent") ?? "";
  const visitorHash = hashVisitor(ip, ua);

  try {
    // Simple rate limit: 5 messages per hour per visitor
    const recent = await prisma.message.count({
      where: { visitorHash, createdAt: { gte: new Date(Date.now() - 60 * 60 * 1000) } },
    });
    if (recent >= 5) {
      return NextResponse.json({ ok: false, error: "Too many messages. Please try again later." }, { status: 429 });
    }

    await prisma.message.create({ data: { name, email, body: message, visitorHash } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact error", err);
    return NextResponse.json({ ok: false, error: "Could not send your message right now." }, { status: 500 });
  }
}
