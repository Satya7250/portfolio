export interface ProjectGradient {
  from: string;
  via: string;
  to: string;
  border: string;
}

export interface Project {
  id: string;

  slug: string;

  title: string;

  description: string;

  tags: string[];

  image: string;

  repoUrl?: string | null;

  demoUrl?: string | null;

  colorTheme: string;

  gradient?: ProjectGradient;

  sortOrder?: number;

  isPublished?: boolean;

  createdAt?: Date;

  updatedAt?: Date;
}
