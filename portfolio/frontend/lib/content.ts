import { prisma } from "@/lib/prisma";
import { projects as defaultProjects, type Project } from "@/data/projects";
import { defaultSkills } from "@/data/skills";
import { defaultExperience, type ExperienceItem } from "@/data/experience";

// The public site reads from the database. If the database is unreachable or
// still empty, it falls back to the starter content in /data so the site never
// shows a blank page.

export async function getProjects(): Promise<Project[]> {
  try {
    const rows = await prisma.project.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { id: "asc" }],
    });
    if (rows.length === 0) return defaultProjects;
    return rows.map((r) => ({
      title: r.title,
      description: r.description,
      tech: r.tech,
      impact: r.impact ?? undefined,
      featured: r.featured,
      repoUrl: r.repoUrl ?? undefined,
      demoUrl: r.demoUrl ?? undefined,
    }));
  } catch {
    return defaultProjects;
  }
}

export async function getSkills(): Promise<string[]> {
  try {
    const rows = await prisma.skill.findMany({ orderBy: [{ sortOrder: "asc" }, { id: "asc" }] });
    return rows.length ? rows.map((r) => r.name) : defaultSkills;
  } catch {
    return defaultSkills;
  }
}

export async function getExperience(): Promise<ExperienceItem[]> {
  try {
    const rows = await prisma.experience.findMany({ orderBy: [{ sortOrder: "asc" }, { id: "asc" }] });
    return rows.length ? rows.map((r) => ({ title: r.title, body: r.body })) : defaultExperience;
  } catch {
    return defaultExperience;
  }
}
