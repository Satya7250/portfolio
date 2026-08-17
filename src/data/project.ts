import { db } from "@/db";
import { projects } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

export async function getProjects() {
  return await db
    .select()
    .from(projects)
    .where(eq(projects.isPublished, true))
    .orderBy(asc(projects.sortOrder));
}

export async function getAllProjects() {
  return await db
    .select()
    .from(projects)
    .orderBy(asc(projects.sortOrder));
}

export async function getProjectById(id: string) {
  return await db.query.projects.findFirst({
    where: (project, { eq }) => eq(project.id, id),
  });
}

export async function getProjectBySlug(slug: string) {
  return await db.query.projects.findFirst({
    where: (project, { eq }) => eq(project.slug, slug),
  });
}