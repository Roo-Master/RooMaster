import { cookies } from "next/headers";
import { ADMIN_COOKIE, isValidSession } from "@/lib/auth";

// Middleware already protects /admin pages; server actions re-check here so
// they stay safe even if the route config changes.
export async function requireAdmin() {
  const ok = await isValidSession(cookies().get(ADMIN_COOKIE)?.value);
  if (!ok) throw new Error("Unauthorized");
}
