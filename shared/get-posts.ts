// helper that fetches posts and get information from them
import { promises as fs, readdirSync } from 'fs';
import path from 'path';
import renderToString from 'next-mdx-remote/render-to-string';
import matter from 'gray-matter';
import mdxComponents from '@shared/mdx-components';
import type { PostFile, FrontMatter } from './types';

// takes path of posts and returns a list of posts with the filepath and slug
const getDirData = (source: string): PostFile[] =>
  readdirSync(source).map((name) => ({
    filepath: `${source}/${name}`,
    slug: name.replace(new RegExp(path.extname(name) + '$'), ''),
  }));

// takes list of posts with the YAML and mdx and returns an object to pass to
// hydrate to render the mdx
const formatPostList = async ({ filepath, slug }: PostFile) => {
  const mdxSource = await fs.readFile(filepath);
  const { content, data } = matter(mdxSource);
  const frontMatter = data as FrontMatter;

  const mdx = await renderToString(content, {
    components: mdxComponents,
    scope: frontMatter,
  });

  return {
    filepath,
    slug,
    content,
    frontMatter,
    mdx,
  };
};

export async function getPosts(source: string) {
  const files = getDirData(source);

  if (files.length === 0) return [];

  // awaits the result of all the promises, each for a file
  // content is a list of objects: {filepath,slug,content,frontMatter,mdx}
  const content = await Promise.all(files.map(formatPostList));

  content.sort((post1, post2) => {
    const dateMs1 = +new Date(post1.frontMatter.date);
    const dateMs2 = +new Date(post2.frontMatter.date);

    return dateMs2 - dateMs1;
  });

  return content;
}
