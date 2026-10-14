import { prisma } from "@/lib/prisma";
import { saveProject, deleteProject, importStarterContent } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Manage Projects", robots: { index: false, follow: false } };

export default async function ProjectsAdmin() {
  const projects = await prisma.project.findMany({ orderBy: [{ sortOrder: "asc" }, { id: "asc" }] });

  return (
    <main className="admin-dashboard">
      <h1 className="admin-title">Projects</h1>

      {projects.length === 0 && (
        <div className="admin-card">
          <p>No projects in the database yet. The public site is showing the built-in starter projects.</p>
          <form action={importStarterContent}>
            <button type="submit" className="admin-btn">Import starter content (projects, skills, experience)</button>
          </form>
        </div>
      )}

      <div className="admin-card">
        <h2>Add a project</h2>
        <ProjectForm />
      </div>

      {projects.map((p) => (
        <div className="admin-card" key={p.id}>
          <h2>{p.title} {!p.published && <small>(hidden)</small>}</h2>
          <ProjectForm project={p} />
          <form action={deleteProject}>
            <input type="hidden" name="id" value={p.id} />
            <button type="submit" className="admin-btn danger">Delete</button>
          </form>
        </div>
      ))}
    </main>
  );
}

function ProjectForm({ project }: { project?: {
  id: number; title: string; description: string; tech: string[];
  repoUrl: string | null; demoUrl: string | null; impact: string | null; featured: boolean; sortOrder: number; published: boolean;
} }) {
  return (
    <form action={saveProject} className="admin-form">
      {project && <input type="hidden" name="id" value={project.id} />}
      <label>Title<input name="title" defaultValue={project?.title} required maxLength={120} /></label>
      <label>Description<textarea name="description" defaultValue={project?.description} required maxLength={600} rows={3} /></label>
      <label>Tech (comma separated)<input name="tech" defaultValue={project?.tech.join(", ")} /></label>
      <label>GitHub repo URL<input name="repoUrl" type="url" defaultValue={project?.repoUrl ?? ""} placeholder="https://github.com/Roo-Master/..." /></label>
      <label>Live demo URL<input name="demoUrl" type="url" defaultValue={project?.demoUrl ?? ""} /></label>
      <label>Impact / what it proves (real facts only)<input name="impact" defaultValue={project?.impact ?? ""} maxLength={200} placeholder="e.g. Handles student, course and exam records for one university" /></label>
      <label className="admin-check"><input name="featured" type="checkbox" defaultChecked={project?.featured ?? false} /> Feature this project (pinned first)</label>
      <label>Order<input name="sortOrder" type="number" defaultValue={project?.sortOrder ?? 0} /></label>
      <label className="admin-check"><input name="published" type="checkbox" defaultChecked={project?.published ?? true} /> Visible on site</label>
      <button type="submit" className="admin-btn">{project ? "Save changes" : "Add project"}</button>
    </form>
  );
}
