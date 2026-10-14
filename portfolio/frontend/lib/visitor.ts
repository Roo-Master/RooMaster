import { createHash } from "crypto";

export function parseUserAgent(ua: string) {
  const s = ua.toLowerCase();

  const isBot = /bot|crawler|spider|crawling|headless|lighthouse|preview|curl|wget/.test(s);
  const device = isBot
    ? "bot"
    : /ipad|tablet/.test(s)
    ? "tablet"
    : /mobi|android|iphone/.test(s)
    ? "mobile"
    : "desktop";

  const browser = /edg\//.test(s)
    ? "Edge"
    : /opr\/|opera/.test(s)
    ? "Opera"
    : /chrome|crios/.test(s)
    ? "Chrome"
    : /firefox|fxios/.test(s)
    ? "Firefox"
    : /safari/.test(s)
    ? "Safari"
    : "Other";

  const os = /windows/.test(s)
    ? "Windows"
    : /android/.test(s)
    ? "Android"
    : /iphone|ipad|ios/.test(s)
    ? "iOS"
    : /mac os/.test(s)
    ? "macOS"
    : /linux/.test(s)
    ? "Linux"
    : "Other";

  return { device, browser, os };
}

// The raw IP is never stored. We keep a salted hash so repeat visits from the
// same person can be counted without being able to recover who they are.
export function hashVisitor(ip: string, ua: string) {
  const salt = process.env.IP_HASH_SALT ?? "change-me";
  return createHash("sha256").update(`${salt}|${ip}|${ua}`).digest("hex").slice(0, 32);
}
