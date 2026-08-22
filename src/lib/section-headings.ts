import { getSectionHeading } from '@/data/section-heading';

const DEFAULTS = {
  about: {
    eyebrow: 'Get To Know Me',
    title: 'About Me',
    description:
      'A passionate developer building modern, scalable, and user-focused digital experiences.',
  },
  stack: {
    eyebrow: 'Technologies I Use',
    title: 'My Tech Stack',
    description: 'Explore the tools and technologies I leverage to build modern web applications.',
  },
  projects: {
    eyebrow: 'FEATURED WORK',
    title: 'Featured Projects',
    description:
      'A collection of projects that showcase my skills in building scalable, responsive, and user-focused applications.',
  },
  blogs: {
    eyebrow: 'WRITING',
    title: 'Latest Articles',
    description:
      'Insights, tutorials, and development notes covering web development, JavaScript, React, and modern software engineering.',
  },
  certifications: {
    eyebrow: 'CREDENTIALS',
    title: 'Certifications & Achievements',
    description:
      'Certifications and achievements that showcase my technical expertise and continuous learning.',
  },
  contact: {
    eyebrow: "LET'S CONNECT",
    title: 'Get In Touch',
    description:
      "Have a project in mind, an internship opportunity, or just want to connect? I'd love to hear from you.",
  },
} as const;

export type SectionKey = keyof typeof DEFAULTS;

export async function getHeading(section: SectionKey) {
  const saved = await getSectionHeading(section);
  return {
    eyebrow: saved?.eyebrow ?? DEFAULTS[section].eyebrow,
    title: saved?.title ?? DEFAULTS[section].title,
    description: saved?.description ?? DEFAULTS[section].description,
  };
}
