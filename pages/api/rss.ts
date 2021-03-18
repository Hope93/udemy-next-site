import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getPosts } from '@shared/get-posts';
import RSS from 'rss';
import { metadata } from 'config';

const POSTS_PATH = `${process.cwd()}/posts`;

export default async (req: VercelRequest, res: VercelResponse) => {
  const mdxList = await getPosts(POSTS_PATH);

  const feed = new RSS({
    feed_url: `${metadata.siteUrl}/api/rss`,
    title: 'devlog',
    site_url: metadata.siteUrl,
    managingEditor: metadata.rssEditor,
    webMaster: metadata.rssEditor,
    copyright: `${(new Date()).getFullYear()} - ${metadata.author.name}`,
    pubDate: new Date(),
    ttl: 60
  });
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/xml');

  res.send(
    mdxList
      .reduce((feed, { frontMatter, mdx }) => {
        const { title, date, path, description } = frontMatter;
        feed.item({
          title,
          description,
          date,
          url: `${metadata.siteUrl}${path}`,
          guid: `${metadata.siteUrl}${path}`,
          categories: [],
          custom_elements: [
            {
              'content:encoded': mdx.renderedOutput
            }
          ]
        });
        return feed;
      }, feed)
      .xml()
  );
};
