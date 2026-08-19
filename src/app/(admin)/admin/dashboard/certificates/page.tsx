import { getAllCertifications } from "@/data/certificate";
import { getHeading } from "@/lib/section-headings";

import CertificationManager from "@/components/admin/certificates/certificate-manager";
import { SectionHeadingEditor } from "@/components/admin/section-heading/section-heading-editor";

export default async function CertificationDashboardPage() {
  const certifications = await getAllCertifications();

  const heading = await getHeading("certifications");

  return (
    <div className="space-y-8 p-6">
      <div className="mx-auto w-full max-w-4xl">
        <SectionHeadingEditor
          section="certifications"
          heading={heading}
          label="Certifications Section Heading"
        />
      </div>

      <CertificationManager
        initialCertifications={certifications}
      />
    </div>
  );
}
