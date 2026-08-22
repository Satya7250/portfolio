import { ContactManager } from "@/components/admin/contact/contact";
import { SectionHeadingEditor } from "@/components/admin/section-heading/section-heading-editor";

import { getContact } from "@/data/contact";
import { getHeading } from "@/lib/section-headings";

export default async function ContactDashboardPage() {
  const contact = await getContact();
  const heading = await getHeading("contact");

  return (
    <div className="space-y-8 p-6">
      <div className="mx-auto w-full max-w-3xl">
        <SectionHeadingEditor
          section="contact"
          heading={heading}
          label="Contact Section Heading"
        />
      </div>

      <ContactManager
        initialEmail={contact.email}
      />
    </div>
  );
}
