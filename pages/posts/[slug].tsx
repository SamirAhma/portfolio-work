import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import dynamic from "next/dynamic";
import Layout from "../../components/layout";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import PostTitle from "../../components/post-title";
import markdownToHtml from "../../lib/markdownToHtml";
import type PostType from "../../interfaces/post";

import LoadingImagePlaceholder from "../../components/Loading";

import PostHeader from "../../components/post-header";
import { getPlaiceholder } from "plaiceholder";
import LazyLoad from "react-lazy-load";
type Props = {
  post: PostType;
  preview?: boolean;
};
const Githubintro = dynamic(() => import("../../components/githubintro"), {
  loading: () => <LoadingImagePlaceholder />,
});
// const PostHeader = dynamic(() => import("../../components/post-header"), {
//   loading: () => <LoadingImagePlaceholder />,
// });
const PostBody = dynamic(() => import("../../components/post-body"), {
  loading: () => <LoadingImagePlaceholder />,
});
export default function Post({ post }: Props) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <>
      <Layout>
        <Container>
          {router.isFallback ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              <article className="mb-16">
                <PostHeader
                  title={post.title}
                  coverImage={post.coverImage}
                  base64={post.base64}
                />
                <PostBody
                  content={post.content}
                  githubLink={post.linkGithub}
                  demoLink={post.linkDemo}
                />
              </article>
              <div className="max-w-4xl mx-auto mt-2 mb-16">
                <LazyLoad height={862}>
                  <Githubintro />
                </LazyLoad>
              </div>
            </>
          )}
        </Container>
      </Layout>
    </>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "slug",
    "content",
    "coverImage",
    "linkGithub",
    "linkDemo",
  ]);
  const { base64, img } = await getPlaiceholder(post.coverImage);
  const content = await markdownToHtml(post.content || "");
  return {
    props: {
      post: {
        ...post,
        content,
        coverImage: img,
        base64,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
