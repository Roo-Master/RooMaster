// Admin session token = SHA-256 of password + secret. Uses Web Crypto so it
// works in both route handlers and Edge middleware.

export const ADMIN_COOKIE = "admin_session";

export async function sessionToken(): Promise<string> {
  const password = process.env.ADMIN_PASSWORD ?? "";
  const secret = process.env.SESSION_SECRET ?? "";
  const data = new TextEncoder().encode(`${password}|${secret}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function isValidSession(cookieValue: string | undefined) {
  if (!process.env.ADMIN_PASSWORD || !cookieValue) return false;
  return cookieValue === (await sessionToken());
}
