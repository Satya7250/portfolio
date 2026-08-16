"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { about } from "@/db/schema";
import cloudinary from "@/lib/cloudinary";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB

export async function upsertAbout(formData: FormData) {
  const imageAlt = formData.get("imageAlt")?.toString().trim();
  const intro = formData.get("intro")?.toString().trim();
  const name = formData.get("name")?.toString().trim();
  const role = formData.get("role")?.toString().trim();
  const bio = formData.get("bio")?.toString().trim();
  const imageFile = formData.get("image");

  if (!imageAlt || !intro || !name || !role || !bio) {
    throw new Error("All fields are required.");
  }

  const existingAbout = await db.query.about.findFirst();

  let imageSrc = existingAbout?.imageSrc ?? "";
  let previousPublicId: string | null = null;

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
          folder: "portfolio/about",
          resource_type: "image",
          public_id: `about_${Date.now()}`,
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

    // Track old image so we can delete it after a successful DB write
    if (existingAbout?.imageSrc) {
      const match = existingAbout.imageSrc.match(
        /portfolio\/about\/[^./]+/
      );
      if (match) previousPublicId = match[0];
    }

    imageSrc = uploadResult.secure_url;
  }

  if (!imageSrc) {
    throw new Error("Please upload an image.");
  }

  const values = {
    imageSrc,
    imageAlt,
    intro,
    name,
    role,
    bio,
    updatedAt: new Date(),
  };

  if (existingAbout) {
    await db.update(about).set(values).where(eq(about.id, existingAbout.id));
  } else {
    await db.insert(about).values(values);
  }

  if (previousPublicId) {
    try {
      await cloudinary.uploader.destroy(previousPublicId, {
        resource_type: "image",
      });
    } catch (_) {
      // Non-fatal: stale image left in Cloudinary, safe to ignore
    }
  }

  revalidatePath("/dashboard/about");
  revalidatePath("/");

  return { success: true, imageSrc };
}