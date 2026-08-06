import type { Project } from '@/types/project';

/**
 * Static seed data. This is what renders today.
 *
 * When you build an admin panel, replace the body of `getProjects()`
 * below with a real query (Prisma, Supabase, a CMS fetch, etc.) and
 * return data shaped like `Project[]`. Nothing in the components needs
 * to change — they only ever call `getProjects()`, never this array
 * directly.
 */
const projects: Project[] = [
  {
    id: 'topdo',
    title: 'TopDo',
    description:
      'A modern productivity platform for organizing tasks, managing projects, and staying productive with real-time collaboration.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Drizzle ORM', 'PostgreSQL', 'Clerk'],
    image: '/images/topdo.png',
    repoUrl: 'https://github.com/Satya7250/Todo-List',
    demoUrl: 'https://topdo.in',
    gradient: {
      from: 'from-purple-500/10',
      via: 'via-purple-500/5',
      to: 'to-transparent',
      border: 'border-purple-500/20',
    },
  },
  {
    id: 'briefly-ai',
    title: 'Briefly AI',
    description:
      'An AI productivity assistant that automates Gmail and Google Calendar, prioritizing emails, scheduling tasks, and organizing your day.',
    tags: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Google Gmail API',
      'Google Calendar API',
      'OpenAI',
    ],
    image: '/images/briefly.png',
    repoUrl: 'https://github.com/Satya7250/Briefly-AI',
    demoUrl: 'https://briiefly-ai.vercel.app/',
    gradient: {
      from: 'from-amber-500/10',
      via: 'via-orange-400/5',
      to: 'to-transparent',
      border: 'border-amber-500/20',
    },
  },
];

/**
 * Fetches the projects to display.
 *
 * Today: returns the static array above.
 * Later (once you have an admin panel + database): make this `async`,
 * e.g.
 *
 *   export async function getProjects(): Promise<Project[]> {
 *     return prisma.project.findMany({ orderBy: { order: "asc" } });
 *   }
 *
 * or fetch from your CMS/API route. Because it's already async-shaped
 * on the calling side (see projects-section.tsx), swapping the
 * implementation here is the only change you'll need to make.
 */
export async function getProjects(): Promise<Project[]> {
  return projects;
}
