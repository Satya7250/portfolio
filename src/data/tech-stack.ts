import { db } from '@/db';
import { techStack } from '@/db/schema';
import { asc } from 'drizzle-orm';

export async function getTechStack() {
  return await db
    .select()
    .from(techStack)
    .orderBy(asc(techStack.category), asc(techStack.sortOrder), asc(techStack.name));
}

export async function getTechStackById(id: string) {
  return await db.query.techStack.findFirst({
    where: (stack, { eq }) => eq(stack.id, id),
  });
}
