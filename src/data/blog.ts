import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { blogs } from "@/db/schema";

export type BlogRow = typeof blogs.$inferSelect;

export async function getAllBlogs(): Promise<BlogRow[]> {
  return db
    .select()
    .from(blogs)
    .orderBy(asc(blogs.sortOrder));
}

export async function getVisibleBlogs(): Promise<BlogRow[]> {
  return db
    .select()
    .from(blogs)
    .where(eq(blogs.isVisible, true))
    .orderBy(asc(blogs.sortOrder));
}

export async function getBlogById(
  id: string
): Promise<BlogRow | null> {
  const [blog] = await db
    .select()
    .from(blogs)
    .where(eq(blogs.id, id))
    .limit(1);

  return blog ?? null;
}