import { getPosts, FormattedPost } from '@shared/get-posts';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import hydrate from 'next-mdx-remote/hydrate';
import { POST_DIR } from 'config';
import PostLayout from '@layouts/post';
import mdxComponents from '@shared/mdx-components'

export default function Post({
  mdxContent,
  frontMatter,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const content = hydrate(mdxContent, { components: mdxComponents });

  return (
    <PostLayout frontMatter={frontMatter}>
      <header>
        <h1>{frontMatter.title}</h1>
      </header>
      <article>{content}</article>
    </PostLayout>
  );
}

// When using getStaticProps within a dynamic route we need to provide this
// to tell nextjs what paths we want to render and the route for each path
// and also creating the props accordingly
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts(POST_DIR);

  const paths = posts.map(({ slug }) => ({
    params: {
      slug,
    },
  }));

  return {
    paths,
    // because fallback is false it returns 404
    fallback: false,
  };
};

// instruct nextjs on build time to render all the posts and have them
// statically ready whenever the user goes to the link, params is from
// getStaticPaths
export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  // have to use as keyword for typescript not to complain
  const { slug: routeSlug } = params as { slug: string };
  // we call getPost here too because we can't pass them from getStaticProps
  // however, can't we just call getPosts once outside of the functions as
  // a variable of this page/component
  const posts = await getPosts(POST_DIR);

  const { mdx, frontMatter } = posts.find(
    ({ slug: postSlug }) => postSlug === routeSlug
  ) as FormattedPost;

  return {
    props: {
      mdxContent: mdx,
      frontMatter,
    },
  };
};
