import { prisma } from "@/lib/prisma";
import { toggleMessageRead, deleteMessage } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Messages", robots: { index: false, follow: false } };

export default async function MessagesAdmin() {
  const messages = await prisma.message.findMany({ orderBy: { createdAt: "desc" }, take: 200 });

  return (
    <main className="admin-dashboard">
      <h1 className="admin-title">Messages</h1>
      {messages.length === 0 && <p className="admin-note">No messages yet.</p>}

      {messages.map((m) => (
        <div className={`admin-card${m.read ? "" : " unread"}`} key={m.id}>
          <h2>
            {m.name} <small>&lt;<a href={`mailto:${m.email}`}>{m.email}</a>&gt;</small>
          </h2>
          <small>{m.createdAt.toISOString().replace("T", " ").slice(0, 16)} UTC</small>
          <p className="admin-msg">{m.body}</p>
          <div className="admin-inline">
            <form action={toggleMessageRead}>
              <input type="hidden" name="id" value={m.id} />
              <button type="submit" className="admin-btn">{m.read ? "Mark unread" : "Mark read"}</button>
            </form>
            <form action={deleteMessage}>
              <input type="hidden" name="id" value={m.id} />
              <button type="submit" className="admin-btn danger">Delete</button>
            </form>
          </div>
        </div>
      ))}
    </main>
  );
}
