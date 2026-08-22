import { getTechStack } from '@/data/tech-stack';
import type { StackCategory } from '@/lib/techStackData';

const CATEGORY_ORDER = [
  'Languages',
  'Frontend',
  'Backend',
  'Database',
  'Tools & DevOps',
  'AI & ML',
  'Data Structures & Algorithms',
];

export async function getTechStackSection(): Promise<StackCategory[]> {
  const items = await getTechStack();

  const grouped = new Map<string, StackCategory>();

  for (const item of items) {
    const categoryId = item.category.toLowerCase().replace(/\s+/g, '-');

    if (!grouped.has(categoryId)) {
      grouped.set(categoryId, {
        id: categoryId,
        title: item.category,
        technologies: [],
      });
    }

    grouped.get(categoryId)!.technologies.push({
      id: item.id,
      name: item.name,
      icon: item.icon ?? undefined,
      brandColor: item.brandColor ?? undefined,
    });
  }

  return Array.from(grouped.values()).sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a.title);
    const bi = CATEGORY_ORDER.indexOf(b.title);

    if (ai === -1 && bi === -1) {
      return a.title.localeCompare(b.title);
    }

    if (ai === -1) return 1;
    if (bi === -1) return -1;

    return ai - bi;
  });
}
