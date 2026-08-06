import type { Project } from '@/types/project';
import { ProjectContent } from './project-content';
import { ProjectPreview } from './project-preview';

interface FeaturedProjectProps {
  project: Project;
  index: number;
}

export function FeaturedProject({ project, index }: FeaturedProjectProps) {
  const isReversed = index % 2 === 1;

  return (
    <div className="border-border grid grid-cols-1 items-center gap-12 border-b py-16 last:border-b-0 md:gap-12 lg:grid-cols-2 lg:gap-20 lg:py-20">
      <div className={isReversed ? 'lg:order-2' : 'lg:order-1'}>
        <ProjectContent project={project} />
      </div>
      <div className={isReversed ? 'lg:order-1' : 'lg:order-2'}>
        <ProjectPreview project={project} />
      </div>
    </div>
  );
}
