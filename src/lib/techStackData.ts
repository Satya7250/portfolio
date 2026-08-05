export interface Technology {
  id?: string;
  name: string;
  icon?: string;
  brandColor?: string;
}

export interface StackCategory {
  id: string;
  title: string;
  technologies: Technology[];
}

export const techStackData: StackCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    technologies: [
      {
        id: 'c',
        name: 'C',
        icon: 'c',
        brandColor: '#00599C',
      },
      {
        id: 'cpp',
        name: 'C++',
        icon: 'cpp',
        brandColor: '#00599C',
      },
      {
        id: 'java',
        name: 'Java',
        icon: 'java',
        brandColor: '#E51F24',
      },
      {
        id: 'javascript',
        name: 'JavaScript (ES6+)',
        icon: 'javascript',
        brandColor: '#F7DF1E',
      },
    ],
  },

  {
    id: 'frontend',
    title: 'Frontend',
    technologies: [
      { id: 'html', name: 'HTML5', brandColor: '#E34F26' },
      { id: 'css', name: 'CSS3', brandColor: '#1572B6' },
      { id: 'tailwind', name: 'Tailwind CSS', brandColor: '#06B6D4' },
      { id: 'react', name: 'React', brandColor: '#61DAFB' },
      { id: 'nextjs', name: 'Next.js', brandColor: '#FFFFFF' },
      {
        id: 'shadcn',
        name: 'shadcn/ui',
        icon: 'shadcn',
        brandColor: '#FFFFFF',
      },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    technologies: [
      { id: 'nodejs', name: 'Node.js', brandColor: '#5FA04E' },
      { id: 'express', name: 'Express', brandColor: '#FFFFFF' },
      // { id: "springboot", name: "Spring Boot", brandColor: "#6DB33F" },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    technologies: [
      {
        id: 'mysql',
        name: 'MySQL',
        icon: 'mysql',
        brandColor: '#4479A1',
      },
      {
        id: 'postgresql',
        name: 'PostgreSQL',
        icon: 'postgresql',
        brandColor: '#4169E1',
      },
      {
        id: 'mongodb',
        name: 'MongoDB',
        icon: 'mongodb',
        brandColor: '#47A248',
      },
    ],
  },
  // {
  //   id: "ai",
  //   title: "AI & ML",
  //   technologies: [
  //     { id: "openai", name: "OpenAI", brandColor: "#10A37F" },
  //     { id: "langchain", name: "LangChain", brandColor: "#2F9E82" },
  //     { id: "vercel-ai", name: "Vercel AI SDK", brandColor: "#FFFFFF" },
  //     { id: "pinecone", name: "Pinecone", brandColor: "#2B5278" },
  //   ],
  // },
  {
    id: 'tools',
    title: 'Tools & DevOps',
    technologies: [
      {
        id: 'git',
        name: 'Git',
        icon: 'git',
        brandColor: '#F05032',
      },
      {
        id: 'github',
        name: 'GitHub',
        icon: 'github',
        brandColor: '#FFFFFF',
      },
      {
        id: 'docker',
        name: 'Docker',
        icon: 'docker',
        brandColor: '#2496ED',
      },
      {
        id: 'vercel',
        name: 'Vercel',
        icon: 'vercel',
        brandColor: '#FFFFFF',
      },
      {
        id: 'netlify',
        name: 'Netlify',
        icon: 'netlify',
        brandColor: '#00C7B7',
      },
      {
        id: 'postman',
        name: 'Postman',
        icon: 'postman',
        brandColor: '#FF6C37',
      },
      {
        id: 'vscode',
        name: 'VS Code',
        icon: 'vscode',
        brandColor: '#007ACC',
      },
    ],
  },
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    technologies: [
      { id: 'dsa-arrays', name: 'Arrays & Strings', brandColor: '#EAB308' },
      { id: 'dsa-trees', name: 'Trees & Graphs', brandColor: '#3B82F6' },
      { id: 'dsa-dp', name: 'Dynamic Programming', brandColor: '#EC4899' },
    ],
  },
];
