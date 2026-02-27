import { getBlogPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/config";

export async function GET() {
  const posts = await getBlogPosts();
  const baseUrl = SITE_URL;

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>TypeWarp Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Technical guides on text manipulation, typography trends, and digital entropy</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .slice(0, 20)
      .map(
        (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>community@typewarp.com (${post.author})</author>
      <category>${escapeXml(post.category)}</category>
      ${post.tags?.map((tag) => `<category>${escapeXml(tag)}</category>`).join("") || ""}
      <content:encoded><![CDATA[${post.description}]]></content:encoded>
    </item>`,
      )
      .join("")}
  </channel>
</rss>`.trim();

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
