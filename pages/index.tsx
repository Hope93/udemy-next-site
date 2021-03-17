import { InferGetStaticPropsType } from 'next';
import PostIndex from '@components/post-index'
import Page from '@layouts/page';
import { getPosts } from '@shared/get-posts';
import { POST_DIR } from 'config'
import ShortBio from '@components/short-bio'

// home/index will just show the title and link to the post
export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Page>
      <ShortBio />
      <PostIndex list={posts} />
    </Page>
  );
}

// we only want the front matter and slug in index page
export const getStaticProps = async () => {
  const posts = await getPosts(POST_DIR);
  const allMdx = posts.map(({ slug, frontMatter }) => ({
    slug,
    frontMatter,
  }));
  return {
    props: {
      posts: allMdx,
    },
  };
};
