"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { techStack } from "@/db/schema";

type TechStackInput = {
  name: string;
  icon: string;
  category: string;
  brandColor?: string | null;
  sortOrder: number;
};

function parseInput(formData: FormData): TechStackInput {
  const name = formData.get("name")?.toString().trim();
  const icon = formData.get("icon")?.toString().trim();
  const category = formData.get("category")?.toString().trim();
  const brandColor = formData.get("brandColor")?.toString().trim();
  const sortOrderRaw = formData.get("sortOrder")?.toString().trim();

  if (!name) throw new Error("Name is required.");
  if (!icon) throw new Error("Icon is required.");
  if (!category) throw new Error("Category is required.");

  const sortOrder = sortOrderRaw ? parseInt(sortOrderRaw, 10) : 0;
  if (Number.isNaN(sortOrder)) throw new Error("Sort order must be a number.");

  return {
    name,
    icon,
    category,
    brandColor: brandColor || null,
    sortOrder,
  };
}

export async function createTechStackItem(formData: FormData) {
  const values = parseInput(formData);

  await db.insert(techStack).values(values);

  revalidatePath("/admin/dashboard/skills");
  revalidatePath("/");

  return { success: true };
}

export async function updateTechStackItem(id: string, formData: FormData) {
  if (!id) throw new Error("Missing item id.");

  const values = parseInput(formData);

  await db
    .update(techStack)
    .set({ ...values, updatedAt: new Date() })
    .where(eq(techStack.id, id));

  revalidatePath("/admin/dashboard/skills");
  revalidatePath("/");

  return { success: true };
}

export async function deleteTechStackItem(id: string) {
  if (!id) throw new Error("Missing item id.");

  await db.delete(techStack).where(eq(techStack.id, id));

  revalidatePath("/admin/dashboard/skills");
  revalidatePath("/");

  return { success: true };
}