import { getAllBlogs } from "@/data/blog";
import BlogManager from "@/components/admin/blog/blog-manager";
import { getHeading } from "@/lib/section-headings";
import { SectionHeadingEditor } from "@/components/admin/section-heading/section-heading-editor";

export default async function BlogDashboardPage() {
  const blogs = await getAllBlogs();
  const heading = await getHeading("blogs");

  return (
    <div className="space-y-8 p-6">
      <div className="mx-auto w-full max-w-4xl">
        <SectionHeadingEditor
          section="blogs"
          heading={heading}
          label="Blogs Section Heading"
        />
      </div>

      <BlogManager initialBlogs={blogs} />
    </div>
  );
}