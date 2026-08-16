import { getTechStack } from "@/data/tech-stack";
import { getHeading } from "@/lib/section-headings";
import { TechStackManager } from "@/components/admin/techStack/tech-stack-manager";
import { SectionHeadingEditor } from "@/components/admin/section-heading/section-heading-editor";

export default async function SkillsDashboardPage() {
  const items = await getTechStack();
  const heading = await getHeading("stack");

  return (
    <div className="p-6 space-y-8">
      <div className="mx-auto max-w-4xl w-full">
        <SectionHeadingEditor
          section="stack"
          heading={heading}
          label="Tech Stack Section Heading"
        />
      </div>
      <TechStackManager items={items} />
    </div>
  );
}
