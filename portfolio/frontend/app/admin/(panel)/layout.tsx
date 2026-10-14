import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const unread = await prisma.message.count({ where: { read: false } }).catch(() => 0);

  return (
    <div className="admin-shell">
      <nav className="admin-nav" aria-label="Admin">
        <Link href="/admin">Analytics</Link>
        <Link href="/admin/projects">Projects</Link>
        <Link href="/admin/skills">Skills</Link>
        <Link href="/admin/experience">Experience</Link>
        <Link href="/admin/messages">Messages{unread > 0 && <b className="admin-badge">{unread}</b>}</Link>
        <Link href="/" target="_blank">View site ↗</Link>
      </nav>
      {children}
    </div>
  );
}
