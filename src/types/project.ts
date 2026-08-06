export interface ProjectGradient {
  /** e.g. "from-orange-500/10" */
  from: string;
  /** e.g. "via-orange-400/5" */
  via: string;
  /** e.g. "to-transparent" */
  to: string;
  /** e.g. "border-orange-500/20" */
  border: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  repoUrl: string;
  demoUrl: string;
  gradient: ProjectGradient;
}
