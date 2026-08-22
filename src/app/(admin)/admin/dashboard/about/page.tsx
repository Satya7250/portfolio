import { getAbout } from '@/data/about';
import { AboutManager } from '@/components/admin/about/about';
import { getHeading } from '@/lib/section-headings';
import { SectionHeadingEditor } from '@/components/admin/section-heading/section-heading-editor';

export default async function AboutDashboardPage() {
  const about = await getAbout();
  const heading = await getHeading('about');

  return (
    <div className="space-y-8 p-6">
      <div className="mx-auto w-full max-w-3xl">
        <SectionHeadingEditor section="about" heading={heading} label="About Section Heading" />
      </div>

      <AboutManager about={about ?? null} />
    </div>
  );
}
