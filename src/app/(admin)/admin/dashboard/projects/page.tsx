import { getAllProjects } from "@/data/project";
import { ProjectManager } from "@/components/admin/projects/project-manager";
import { getHeading } from "@/lib/section-headings";
import { SectionHeadingEditor } from "@/components/admin/section-heading/section-heading-editor";

export default async function ProjectDashboardPage() {
  const projects = await getAllProjects();
  const heading = await getHeading("projects");

  return (
    <div className="space-y-8 p-6">
      <div className="mx-auto max-w-4xl w-full">
        <SectionHeadingEditor
          section="projects"
          heading={heading}
          label="Projects Section Heading"
        />
      </div>

      <ProjectManager projects={projects} />
    </div>
  );
}