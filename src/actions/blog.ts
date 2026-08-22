'use server';

import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { blogs } from '@/db/schema';

export async function createBlog(data: { slug: string }) {
  await db.insert(blogs).values({
    slug: data.slug,
  });

  revalidatePath('/');
  revalidatePath('/admin/dashboard/blogs');
}

export async function deleteBlog(id: string) {
  await db.delete(blogs).where(eq(blogs.id, id));

  revalidatePath('/');
  revalidatePath('/admin/dashboard/blogs');
}

export async function toggleBlogVisibility(id: string, isVisible: boolean) {
  await db
    .update(blogs)
    .set({
      isVisible,
    })
    .where(eq(blogs.id, id));

  revalidatePath('/');
  revalidatePath('/admin/dashboard/blogs');
}

export async function reorderBlogs(orderedIds: string[]) {
  for (let index = 0; index < orderedIds.length; index++) {
    await db
      .update(blogs)
      .set({
        sortOrder: index,
      })
      .where(eq(blogs.id, orderedIds[index]));
  }

  revalidatePath('/');
  revalidatePath('/admin/dashboard/blogs');
}
