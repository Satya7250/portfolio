'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db } from '@/db';
import { contactInfo } from '@/db/schema';

export async function updateContact(email: string) {
  const existing = await db.query.contactInfo.findFirst();

  if (existing) {
    await db
      .update(contactInfo)
      .set({
        email,
        updatedAt: new Date(),
      })
      .where(eq(contactInfo.id, existing.id));
  } else {
    await db.insert(contactInfo).values({
      email,
    });
  }

  revalidatePath('/');
  revalidatePath('/admin/dashboard/contact');

  return {
    success: true,
  };
}
