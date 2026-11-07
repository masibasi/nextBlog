import { baseUrl } from 'app/sitemap'
import { getBlogPosts } from 'app/lib/posts'

export const revalidate = 60

function escapeXml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export async function GET() {
  const allBlogs = await getBlogPosts()

  const itemsXml = allBlogs
    .map(
      (post) =>
        `<item>
          <title>${escapeXml(post.metadata.title)}</title>
          <link>${baseUrl}/posts/${post.slug}</link>
          <description>${escapeXml(post.metadata.summary || '')}</description>
          <pubDate>${new Date(
            post.metadata.publishedAt
          ).toUTCString()}</pubDate>
        </item>`
    )
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>Jimin Lee</title>
        <link>${baseUrl}</link>
        <description>Writing by Jimin Lee — software engineering, AI systems, and life at USC.</description>
        ${itemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
