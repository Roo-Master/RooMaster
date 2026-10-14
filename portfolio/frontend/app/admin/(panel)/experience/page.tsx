import { prisma } from "@/lib/prisma";
import { saveExperience, deleteExperience } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Manage Experience", robots: { index: false, follow: false } };

export default async function ExperienceAdmin() {
  const items = await prisma.experience.findMany({ orderBy: [{ sortOrder: "asc" }, { id: "asc" }] });

  return (
    <main className="admin-dashboard">
      <h1 className="admin-title">Experience</h1>
      <p className="admin-note">Tip: wrap words in **double asterisks** to make them bold on the site.</p>

      <div className="admin-card">
        <h2>Add an entry</h2>
        <ExperienceForm />
      </div>

      {items.map((e) => (
        <div className="admin-card" key={e.id}>
          <h2>{e.title}</h2>
          <ExperienceForm item={e} />
          <form action={deleteExperience}>
            <input type="hidden" name="id" value={e.id} />
            <button type="submit" className="admin-btn danger">Delete</button>
          </form>
        </div>
      ))}
    </main>
  );
}

function ExperienceForm({ item }: { item?: { id: number; title: string; body: string; sortOrder: number } }) {
  return (
    <form action={saveExperience} className="admin-form">
      {item && <input type="hidden" name="id" value={item.id} />}
      <label>Title<input name="title" defaultValue={item?.title} required maxLength={150} /></label>
      <label>Description<textarea name="body" defaultValue={item?.body} required maxLength={2000} rows={6} /></label>
      <label>Order<input name="sortOrder" type="number" defaultValue={item?.sortOrder ?? 0} /></label>
      <button type="submit" className="admin-btn">{item ? "Save changes" : "Add entry"}</button>
    </form>
  );
}
