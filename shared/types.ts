import type { MdxRemote } from 'next-mdx-remote/types'

// sort of like a link with a domain name and the part that comes after the
// domain name
export type PostFile = {
  filepath: string;
  slug: string;
};

export type FrontMatter = {
  path: string
  date: string;
  title: string;
  description: string
};

export type FormattedPost = {
  filepath: string;
  slug: string;
  content: string;
  frontMatter: FrontMatter;
  mdx: MdxRemote.Source;
};