'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db } from '@/db';
import { resume } from '@/db/schema';
import cloudinary from '@/lib/cloudinary';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function uploadResume(formData: FormData) {
  const file = formData.get('file');

  if (!(file instanceof File)) {
    throw new Error('Please select a PDF file');
  }

  if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
    throw new Error('Only PDF files are allowed');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size must be less than 10MB');
  }

  const existingResume = await db.query.resume.findFirst();

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const publicIdWithoutExt = `resume_${Date.now()}`;

  const uploadResult = await new Promise<{
    secure_url: string;
    public_id: string;
  }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'portfolio/resume',
        resource_type: 'image',
        format: 'pdf',
        public_id: publicIdWithoutExt,
        flags: 'attachment:false',
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error('Failed to upload to Cloudinary'));
          return;
        }

        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      },
    );

    stream.end(buffer);
  });

  if (existingResume) {
    try {
      await cloudinary.uploader.destroy(existingResume.publicId, {
        resource_type: 'image',
      });
    } catch (_) {}
    try {
      await cloudinary.uploader.destroy(existingResume.publicId, {
        resource_type: 'raw',
      });
    } catch (_) {}

    await db
      .update(resume)
      .set({
        fileName: cleanFileName,
        fileUrl: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        updatedAt: new Date(),
      })
      .where(eq(resume.id, existingResume.id));

    revalidatePath('/admin/dashboard/resume');
    revalidatePath('/');

    return {
      success: true,
      fileUrl: uploadResult.secure_url,
    };
  }

  await db.insert(resume).values({
    fileName: cleanFileName,
    fileUrl: uploadResult.secure_url,
    publicId: uploadResult.public_id,
  });

  revalidatePath('/admin/dashboard/resume');
  revalidatePath('/');

  return {
    success: true,
    fileUrl: uploadResult.secure_url,
  };
}
