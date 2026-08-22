import { getTechStack } from '@/data/tech-stack';
import { getHeading } from '@/lib/section-headings';
import { TechStackManager } from '@/components/admin/techStack/tech-stack-manager';
import { SectionHeadingEditor } from '@/components/admin/section-heading/section-heading-editor';

export default async function SkillsDashboardPage() {
  const items = await getTechStack();
  const heading = await getHeading('stack');

  return (
    <div className="space-y-8 p-6">
      <div className="mx-auto w-full max-w-4xl">
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
