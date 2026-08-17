"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { projects } from "@/db/schema";
import cloudinary from "@/lib/cloudinary";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * Create or update a project from FormData.
 * If `id` is present in the payload the row is updated, otherwise a new row is
 * inserted.  An optional `image` File field triggers a Cloudinary upload; when
 * updating an existing project the previous image is deleted from Cloudinary
 * after the DB write succeeds.
 */
export async function upsertProject(formData: FormData) {
  const id = formData.get("id")?.toString().trim() || null;
  const slug = formData.get("slug")?.toString().trim();
  const title = formData.get("title")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const tagsRaw = formData.get("tags")?.toString().trim();
  const repoUrl = formData.get("repoUrl")?.toString().trim() || null;
  const demoUrl = formData.get("demoUrl")?.toString().trim() || null;
  const colorTheme = formData.get("colorTheme")?.toString().trim() || "purple";
  const isPublished = formData.get("isPublished")?.toString() === "true";
  const sortOrder = parseInt(
    formData.get("sortOrder")?.toString() ?? "0",
    10
  );
  const imageFile = formData.get("image");

  if (!slug || !title || !description) {
    throw new Error("Slug, title, and description are required.");
  }

  const tags: string[] = tagsRaw ? JSON.parse(tagsRaw) : [];

  // ------------------------------------------------------------------
  // Resolve the image URL
  // ------------------------------------------------------------------
  let imageUrl: string | null = null;
  let previousPublicId: string | null = null;

  // If a new image file was uploaded, push it to Cloudinary
  if (imageFile instanceof File && imageFile.size > 0) {
    if (!imageFile.type.startsWith("image/")) {
      throw new Error("Only image files are allowed.");
    }
    if (imageFile.size > MAX_IMAGE_SIZE) {
      throw new Error("Image size must be less than 10MB.");
    }

    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "portfolio/projects",
          resource_type: "image",
          public_id: `project_${slug}_${Date.now()}`,
        },
        (error, result) => {
          if (error || !result) {
            reject(error || new Error("Failed to upload image"));
            return;
          }
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        }
      );

      stream.end(buffer);
    });

    imageUrl = uploadResult.secure_url;

    // If updating, remember the old image so we can clean it up
    if (id) {
      const existing = await db.query.projects.findFirst({
        where: eq(projects.id, id),
      });
      if (existing?.image) {
        const match = existing.image.match(
          /portfolio\/projects\/[^./]+/
        );
        if (match) previousPublicId = match[0];
      }
    }
  }

  // ------------------------------------------------------------------
  // Persist
  // ------------------------------------------------------------------
  if (id) {
    // UPDATE — keep the current image when no new file was uploaded
    const existing = await db.query.projects.findFirst({
      where: eq(projects.id, id),
    });

    await db
      .update(projects)
      .set({
        slug,
        title,
        description,
        tags,
        image: imageUrl ?? existing?.image ?? "",
        repoUrl,
        demoUrl,
        colorTheme,
        isPublished,
        sortOrder,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, id));
  } else {
    // INSERT — image is required for new projects
    if (!imageUrl) {
      throw new Error("An image is required for new projects.");
    }

    await db.insert(projects).values({
      slug,
      title,
      description,
      tags,
      image: imageUrl,
      repoUrl,
      demoUrl,
      colorTheme,
      isPublished,
      sortOrder,
    });
  }

  // Clean up the old Cloudinary image (non-fatal)
  if (previousPublicId) {
    try {
      await cloudinary.uploader.destroy(previousPublicId, {
        resource_type: "image",
      });
    } catch (_) {
      // stale image left in Cloudinary — safe to ignore
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/dashboard/projects");

  return { success: true };
}

/**
 * Delete a project by ID and remove its image from Cloudinary.
 */
export async function deleteProject(id: string) {
  // Grab the image URL before deleting so we can clean up Cloudinary
  const existing = await db.query.projects.findFirst({
    where: eq(projects.id, id),
  });

  await db.delete(projects).where(eq(projects.id, id));

  if (existing?.image) {
    const match = existing.image.match(/portfolio\/projects\/[^./]+/);
    if (match) {
      try {
        await cloudinary.uploader.destroy(match[0], {
          resource_type: "image",
        });
      } catch (_) {
        // Non-fatal
      }
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/dashboard/projects");

  return { success: true };
}