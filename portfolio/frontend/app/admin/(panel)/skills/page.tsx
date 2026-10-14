import { prisma } from "@/lib/prisma";
import { saveSkill, deleteSkill } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Manage Skills", robots: { index: false, follow: false } };

export default async function SkillsAdmin() {
  const skills = await prisma.skill.findMany({ orderBy: [{ sortOrder: "asc" }, { id: "asc" }] });

  return (
    <main className="admin-dashboard">
      <h1 className="admin-title">Skills</h1>
      {skills.length === 0 && (
        <p className="admin-note">Empty. Use &quot;Import starter content&quot; on the Projects page to load the default skills, or add your own below.</p>
      )}

      <div className="admin-card">
        <h2>Add a skill</h2>
        <form action={saveSkill} className="admin-inline">
          <input name="name" placeholder="e.g. TypeScript" required maxLength={60} />
          <input name="sortOrder" type="number" defaultValue={skills.length} aria-label="Order" />
          <button type="submit" className="admin-btn">Add</button>
        </form>
      </div>

      <div className="admin-card">
        {skills.map((s) => (
          <div className="admin-inline admin-row" key={s.id}>
            <form action={saveSkill} className="admin-inline">
              <input type="hidden" name="id" value={s.id} />
              <input name="name" defaultValue={s.name} required maxLength={60} />
              <input name="sortOrder" type="number" defaultValue={s.sortOrder} aria-label="Order" />
              <button type="submit" className="admin-btn">Save</button>
            </form>
            <form action={deleteSkill}>
              <input type="hidden" name="id" value={s.id} />
              <button type="submit" className="admin-btn danger">Delete</button>
            </form>
          </div>
        ))}
      </div>
    </main>
  );
}
