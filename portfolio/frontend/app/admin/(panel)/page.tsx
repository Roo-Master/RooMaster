import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata = { title: "Visitor Analytics", robots: { index: false, follow: false } };

const PAGE_SIZE = 50;

function countBy<T>(items: T[], key: (i: T) => string | null | undefined) {
  const map = new Map<string, number>();
  for (const item of items) {
    const k = key(item) || "Unknown";
    map.set(k, (map.get(k) ?? 0) + 1);
  }
  return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8);
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Math.max(1, Number(searchParams.page) || 1);
  const since30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const since1 = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const [total, last24h, uniqueRows, recent30, visits, events, messages30] = await Promise.all([
    prisma.visit.count(),
    prisma.visit.count({ where: { createdAt: { gte: since1 } } }),
    prisma.visit.findMany({ distinct: ["visitorHash"], select: { id: true } }),
    prisma.visit.findMany({
      where: { createdAt: { gte: since30 } },
      select: { country: true, device: true, browser: true, referrer: true, path: true },
    }),
    prisma.visit.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.event.groupBy({ by: ["type"], where: { createdAt: { gte: since30 } }, _count: { _all: true } }),
    prisma.message.count({ where: { createdAt: { gte: since30 } } }),
  ]);

  const eventCount = (type: string) => events.find((e) => e.type === type)?._count._all ?? 0;
  const actions = [
    ["CV downloads", eventCount("cv_download")],
    ["Email clicks", eventCount("email_click")],
    ["Phone clicks", eventCount("phone_click")],
    ["WhatsApp clicks", eventCount("whatsapp_click")],
    ["GitHub clicks", eventCount("github_click")],
    ["LinkedIn clicks", eventCount("linkedin_click")],
    ["Messages received", messages30],
  ] as const;

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const breakdowns = [
    { title: "Countries", rows: countBy(recent30, (v) => v.country) },
    { title: "Devices", rows: countBy(recent30, (v) => v.device) },
    { title: "Browsers", rows: countBy(recent30, (v) => v.browser) },
    {
      title: "Referrers",
      rows: countBy(recent30, (v) => {
        if (!v.referrer) return "Direct";
        try {
          return new URL(v.referrer).hostname;
        } catch {
          return v.referrer;
        }
      }),
    },
  ];

  return (
    <main className="admin-dashboard">
      <div className="admin-top">
        <h1>Visitor Analytics</h1>
        <form method="POST" action="/api/admin/logout">
          <button type="submit">Log out</button>
        </form>
      </div>

      <section className="admin-stats">
        <div className="admin-card"><span>{total}</span>Total views</div>
        <div className="admin-card"><span>{uniqueRows.length}</span>Unique visitors</div>
        <div className="admin-card"><span>{last24h}</span>Views, last 24h</div>
      </section>

      <section className="admin-card">
        <h2>Recruiter actions <small>(30 days)</small></h2>
        <ul className="admin-actions">
          {actions.map(([label, n]) => (
            <li key={label}><span>{label}</span><strong>{n}</strong></li>
          ))}
        </ul>
      </section>

      <section className="admin-breakdowns">
        {breakdowns.map((b) => (
          <div className="admin-card" key={b.title}>
            <h2>{b.title} <small>(30 days)</small></h2>
            <ul>
              {b.rows.length === 0 && <li>No data yet</li>}
              {b.rows.map(([name, n]) => (
                <li key={name}><span>{name}</span><strong>{n}</strong></li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="admin-card admin-table-wrap">
        <h2>All visits</h2>
        <table>
          <thead>
            <tr>
              <th>Time (UTC)</th><th>Page</th><th>Location</th>
              <th>Device</th><th>Browser / OS</th><th>Referrer</th><th>Visitor</th>
            </tr>
          </thead>
          <tbody>
            {visits.map((v) => (
              <tr key={v.id}>
                <td>{v.createdAt.toISOString().replace("T", " ").slice(0, 19)}</td>
                <td>{v.path}</td>
                <td>{[v.city, v.country].filter(Boolean).join(", ") || "—"}</td>
                <td>{v.device}</td>
                <td>{v.browser} / {v.os}</td>
                <td>{v.referrer || "Direct"}</td>
                <td><code>{v.visitorHash.slice(0, 8)}</code></td>
              </tr>
            ))}
            {visits.length === 0 && (
              <tr><td colSpan={7}>No visits recorded yet.</td></tr>
            )}
          </tbody>
        </table>

        <nav className="admin-pager">
          {page > 1 && <a href={`/admin?page=${page - 1}`}>← Newer</a>}
          <span>Page {page} of {totalPages}</span>
          {page < totalPages && <a href={`/admin?page=${page + 1}`}>Older →</a>}
        </nav>
      </section>
    </main>
  );
}
