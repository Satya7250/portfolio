"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { sectionHeadings } from "@/db/schema";

export async function upsertSectionHeading(formData: FormData) {
  const section = formData.get("section")?.toString().trim();
  const eyebrow = formData.get("eyebrow")?.toString().trim();
  const title = formData.get("title")?.toString().trim();
  const description = formData.get("description")?.toString().trim();

  if (!section || !eyebrow || !title || !description) {
    throw new Error("All fields are required.");
  }

  const existing = await db.query.sectionHeadings.findFirst({
    where: eq(sectionHeadings.section, section),
  });

  if (existing) {
    await db
      .update(sectionHeadings)
      .set({ eyebrow, title, description, updatedAt: new Date() })
      .where(eq(sectionHeadings.id, existing.id));
  } else {
    await db.insert(sectionHeadings).values({ section, eyebrow, title, description });
  }

  revalidatePath("/", "layout");

  return { success: true };
}