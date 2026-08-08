import Parser from "rss-parser";

export interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
}

const parser = new Parser();

const FEED_URL = "https://satyaa.hashnode.dev/rss.xml";

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

    return feed.items.slice(0, 3).map((item: any) => ({
      title: item.title ?? "",
      link: item.link ?? "",
      pubDate: item.pubDate ?? "",
      contentSnippet:
        (
          item.description ||
          item.contentSnippet ||
          item.content ||
          ""
        )
          .replace(/<[^>]*>/g, "")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 100) + "...",
    }));
  } catch (error) {
    console.error("Error fetching Hashnode blogs:", error);
    return [];
  }
}