'use server';

import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { certifications } from '@/db/schema';
import { getCloudinaryPublicId, removeCloudinaryImage } from '@/lib/cloudinary';
import cloudinary from '@/lib/cloudinary';

const MAX_CERTIFICATE_FILE_SIZE = 10 * 1024 * 1024;

type CreateCertificateInput = {
  title: string;
  issuer: string;
  issueDate?: string;
  certificateImage: string;
  verifyUrl?: string;
};

export async function uploadCertificate(formData: FormData) {
  const file = formData.get('file');

  if (!(file instanceof File)) {
    throw new Error('Please choose an image or PDF file.');
  }

  const isPdf = file.type === 'application/pdf';
  if (!file.type.startsWith('image/') && !isPdf) {
    throw new Error('Only image and PDF files are allowed.');
  }

  if (file.size > MAX_CERTIFICATE_FILE_SIZE) {
    throw new Error('Certificate files must be less than 10MB.');
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'portfolio/certificates',
        resource_type: 'auto',
        public_id: `certificate_${Date.now()}`,
      },
      (error, uploadResult) => {
        if (error || !uploadResult) {
          reject(error || new Error('Cloudinary upload failed.'));
          return;
        }
        resolve({
          secure_url: uploadResult.secure_url,
          public_id: uploadResult.public_id,
        });
      },
    );

    stream.end(buffer);
  });

  return { success: true, ...result };
}

export async function createCertificate(data: CreateCertificateInput) {
  if (!data.certificateImage) {
    throw new Error('A certificate image is required.');
  }

  await db.insert(certifications).values({
    title: data.title,
    issuer: data.issuer,
    issueDate: data.issueDate,
    certificateImage: data.certificateImage,
    verifyUrl: data.verifyUrl,
  });

  revalidatePath('/');
  revalidatePath('/admin/dashboard/certificates');

  return {
    success: true,
  };
}

type UpdateCertificateInput = {
  id: string;
  title: string;
  issuer: string;
  issueDate?: string;
  certificateImage: string;
  verifyUrl?: string;
  isPublished: boolean;
};

export async function updateCertificate(data: UpdateCertificateInput) {
  if (!data.certificateImage) {
    throw new Error('A certificate image is required.');
  }

  const existing = await db.query.certifications.findFirst({
    where: eq(certifications.id, data.id),
  });

  await db
    .update(certifications)
    .set({
      title: data.title,
      issuer: data.issuer,
      issueDate: data.issueDate,
      certificateImage: data.certificateImage,
      verifyUrl: data.verifyUrl,
      isPublished: data.isPublished,
      updatedAt: new Date(),
    })
    .where(eq(certifications.id, data.id));

  revalidatePath('/');
  revalidatePath('/admin/dashboard/certificates');

  const previousPublicId = getCloudinaryPublicId(existing?.certificateImage);
  const nextPublicId = getCloudinaryPublicId(data.certificateImage);
  if (previousPublicId && previousPublicId !== nextPublicId) {
    try {
      await removeCloudinaryImage(previousPublicId);
    } catch {
      // A stale Cloudinary asset does not invalidate a successful database update.
    }
  }

  return {
    success: true,
  };
}

export async function deleteCertificate(id: string) {
  const existing = await db.query.certifications.findFirst({
    where: eq(certifications.id, id),
  });

  await db.delete(certifications).where(eq(certifications.id, id));

  revalidatePath('/');
  revalidatePath('/admin/dashboard/certificates');

  const publicId = getCloudinaryPublicId(existing?.certificateImage);
  if (publicId) {
    try {
      await removeCloudinaryImage(publicId);
    } catch {
      // A stale Cloudinary asset does not invalidate a successful database delete.
    }
  }

  return {
    success: true,
  };
}

export async function togglePublish(id: string, isPublished: boolean) {
  await db
    .update(certifications)
    .set({
      isPublished,
      updatedAt: new Date(),
    })
    .where(eq(certifications.id, id));

  revalidatePath('/');
  revalidatePath('/admin/dashboard/certificates');

  return {
    success: true,
  };
}

export const toggleCertificatePublished = togglePublish;

export async function updateCertificateOrder(
  items: {
    id: string;
    sortOrder: number;
  }[],
) {
  await Promise.all(
    items.map((item) =>
      db
        .update(certifications)
        .set({
          sortOrder: item.sortOrder,
          updatedAt: new Date(),
        })
        .where(eq(certifications.id, item.id)),
    ),
  );

  revalidatePath('/');
  revalidatePath('/admin/dashboard/certificates');

  return {
    success: true,
  };
}

export async function deleteCertificateImage(publicId: string) {
  if (!publicId.startsWith('portfolio/certificates/')) {
    throw new Error('Invalid certificate image.');
  }

  await removeCloudinaryImage(publicId);
  return { success: true };
}
