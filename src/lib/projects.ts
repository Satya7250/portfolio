import { asc, eq } from "drizzle-orm";

import { db } from "@/db";
import { projects as projectsTable } from "@/db/schema";
import type { Project } from "@/types/project";

const fallbackProjects: Project[] = [
  {
    id: "topdo",
    slug: "topdo",
    title: "TopDo",
    description:
      "A modern productivity platform for organizing tasks, managing projects, and staying productive with real-time collaboration.",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Drizzle ORM",
      "PostgreSQL",
      "Clerk",
    ],
    image: "/images/topdo.png",
    repoUrl: "https://github.com/Satya7250/Todo-List",
    demoUrl: "https://topdo.in",
    colorTheme: "purple",
  },
  {
    id: "briefly-ai",
    slug: "briefly-ai",
    title: "Briefly AI",
    description:
      "An AI productivity assistant that automates Gmail and Google Calendar, prioritizing emails, scheduling tasks, and organizing your day.",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Google Gmail API",
      "Google Calendar API",
      "OpenAI",
    ],
    image: "/images/briefly.png",
    repoUrl: "https://github.com/Satya7250/Briefly-AI",
    demoUrl: "https://briiefly-ai.vercel.app/",
    colorTheme: "amber",
  },
];

export async function getProjects(): Promise<Project[]> {
  const projects = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.isPublished, true))
    .orderBy(asc(projectsTable.sortOrder));

  if (projects.length === 0) {
    return fallbackProjects;
  }

  return projects as Project[];
}

export async function getProjectById(id: string) {
  return await db.query.projects.findFirst({
    where: (project, { eq }) => eq(project.id, id),
  });
}