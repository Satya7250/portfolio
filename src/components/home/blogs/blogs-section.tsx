import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { BlogCard } from '@/components/home/blogs/blog-card';
import { getLatestBlogs } from '@/lib/hashnode';

export default async function BlogsSection() {
  const blogs = await getLatestBlogs();

  return (
    <div>
      <div className="mb-8 flex justify-end">
        <Link
          href="https://satyaa.hashnode.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-sm font-medium text-orange-300 transition-colors hover:text-orange-200"
        >
          View All Articles
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.link}
            title={blog.title}
            description={blog.contentSnippet}
            readTime={new Date(blog.pubDate).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
            url={blog.link}
          />
        ))}
      </div>
    </div>
  );
}
