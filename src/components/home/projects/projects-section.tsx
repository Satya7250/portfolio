import { getProjects } from '@/lib/projects';
import { FeaturedProject } from './featured-project';

// Server Component
export async function ProjectsSection() {
  const projects = await getProjects();

  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div>
          {projects.map((project, index) => (
            <FeaturedProject key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
