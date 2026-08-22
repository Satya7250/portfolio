import Parser from 'rss-parser';

import { getVisibleBlogs } from '@/data/blog';

export interface BlogPost {
  title: string;
  link: string;
  slug: string;
  pubDate: string;
  contentSnippet: string;
}

const parser = new Parser();

const FEED_URL = 'https://satyaa.hashnode.dev/rss.xml';

export async function getLatestBlogs(): Promise<BlogPost[]> {
  try {
    const res = await fetch(FEED_URL, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch RSS feed: ${res.status}`);
    }

    const xml = await res.text();
    const feed = await parser.parseString(xml);

    const rssPosts: BlogPost[] = feed.items.map((item: any) => ({
      title: item.title ?? '',
      link: item.link ?? '',
      slug: item.link?.split('/').filter(Boolean).pop() ?? '',
      pubDate: item.pubDate ?? '',
      contentSnippet:
        (item.description || item.contentSnippet || item.content || '')
          .replace(/<[^>]*>/g, '')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 100) + '...',
    }));

    const visibleBlogs = await getVisibleBlogs();

    const visibleSlugSet = new Set(visibleBlogs.map((blog) => blog.slug));

    const orderMap = new Map(visibleBlogs.map((blog) => [blog.slug, blog.sortOrder]));

    return rssPosts
      .filter((post) => visibleSlugSet.has(post.slug))
      .sort((a, b) => (orderMap.get(a.slug) ?? 999) - (orderMap.get(b.slug) ?? 999));
  } catch (error) {
    console.error('Error fetching Hashnode blogs:', error);
    return [];
  }
}
