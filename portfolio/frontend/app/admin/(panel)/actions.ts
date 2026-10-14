"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminGuard";
import { projects as defaultProjects } from "@/data/projects";
import { defaultSkills } from "@/data/skills";
import { defaultExperience } from "@/data/experience";

const str = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();
const optUrl = (fd: FormData, key: string) => {
  const v = str(fd, key);
  if (!v) return null;
  // only allow http(s) links
  return /^https?:\/\//i.test(v) ? v.slice(0, 500) : null;
};
const num = (fd: FormData, key: string) => Number.parseInt(str(fd, key), 10) || 0;

function refresh() {
  revalidatePath("/");
  revalidatePath("/admin/projects");
  revalidatePath("/admin/skills");
  revalidatePath("/admin/experience");
  revalidatePath("/admin/messages");
}

/* ---------- Projects ---------- */

export async function saveProject(fd: FormData) {
  await requireAdmin();
  const id = num(fd, "id");
  const data = {
    title: str(fd, "title").slice(0, 120),
    description: str(fd, "description").slice(0, 600),
    tech: str(fd, "tech")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 12),
    repoUrl: optUrl(fd, "repoUrl"),
    demoUrl: optUrl(fd, "demoUrl"),
    impact: str(fd, "impact").slice(0, 200) || null,
    featured: fd.get("featured") === "on",
    sortOrder: num(fd, "sortOrder"),
    published: fd.get("published") === "on",
  };
  if (!data.title || !data.description) return;

  if (id) await prisma.project.update({ where: { id }, data });
  else await prisma.project.create({ data });
  refresh();
}

export async function deleteProject(fd: FormData) {
  await requireAdmin();
  await prisma.project.delete({ where: { id: num(fd, "id") } }).catch(() => {});
  refresh();
}

/* ---------- Skills ---------- */

export async function saveSkill(fd: FormData) {
  await requireAdmin();
  const id = num(fd, "id");
  const name = str(fd, "name").slice(0, 60);
  if (!name) return;
  const data = { name, sortOrder: num(fd, "sortOrder") };
  if (id) await prisma.skill.update({ where: { id }, data });
  else await prisma.skill.create({ data });
  refresh();
}

export async function deleteSkill(fd: FormData) {
  await requireAdmin();
  await prisma.skill.delete({ where: { id: num(fd, "id") } }).catch(() => {});
  refresh();
}

/* ---------- Experience ---------- */

export async function saveExperience(fd: FormData) {
  await requireAdmin();
  const id = num(fd, "id");
  const data = {
    title: str(fd, "title").slice(0, 150),
    body: str(fd, "body").slice(0, 2000),
    sortOrder: num(fd, "sortOrder"),
  };
  if (!data.title || !data.body) return;
  if (id) await prisma.experience.update({ where: { id }, data });
  else await prisma.experience.create({ data });
  refresh();
}

export async function deleteExperience(fd: FormData) {
  await requireAdmin();
  await prisma.experience.delete({ where: { id: num(fd, "id") } }).catch(() => {});
  refresh();
}

/* ---------- Messages ---------- */

export async function toggleMessageRead(fd: FormData) {
  await requireAdmin();
  const id = num(fd, "id");
  const msg = await prisma.message.findUnique({ where: { id } });
  if (msg) await prisma.message.update({ where: { id }, data: { read: !msg.read } });
  refresh();
}

export async function deleteMessage(fd: FormData) {
  await requireAdmin();
  await prisma.message.delete({ where: { id: num(fd, "id") } }).catch(() => {});
  refresh();
}

/* ---------- Starter content ---------- */

// Copies the built-in starter content into the database (only into empty tables)
// so it can be edited from the admin panel.
export async function importStarterContent() {
  await requireAdmin();

  if ((await prisma.project.count()) === 0) {
    await prisma.project.createMany({
      data: defaultProjects.map((p, i) => ({
        title: p.title,
        description: p.description,
        tech: p.tech,
        repoUrl: p.repoUrl ?? null,
        demoUrl: p.demoUrl ?? null,
        sortOrder: i,
      })),
    });
  }
  if ((await prisma.skill.count()) === 0) {
    await prisma.skill.createMany({
      data: defaultSkills.map((name, i) => ({ name, sortOrder: i })),
    });
  }
  if ((await prisma.experience.count()) === 0) {
    await prisma.experience.createMany({
      data: defaultExperience.map((e, i) => ({ title: e.title, body: e.body, sortOrder: i })),
    });
  }
  refresh();
}
