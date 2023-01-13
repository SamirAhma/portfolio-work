import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import dynamic from "next/dynamic";
import Layout from "../../components/layout";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import PostTitle from "../../components/post-title";
import markdownToHtml from "../../lib/markdownToHtml";
import type PostType from "../../interfaces/post";

type Props = {
  post: PostType;
  preview?: boolean;
};
const Githubintro = dynamic(() => import("../../components/githubintro"), {
  loading: () => <p>Loading...</p>,
});
const PostHeader = dynamic(() => import("../../components/post-header"), {
  loading: () => <p>Loading...</p>,
});
const PostBody = dynamic(() => import("../../components/post-body"), {
  loading: () => <p>Loading...</p>,
});
export default function Post({ post, preview }: Props) {
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
                <PostHeader title={post.title} coverImage={post.coverImage} />
                <PostBody
                  content={post.content}
                  githubLink={post.linkGithub}
                  demoLink={post.linkDemo}
                />
              </article>
              <div className="max-w-4xl mx-auto mt-2 mb-16">
                <Githubintro />
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
  const content = await markdownToHtml(post.content || "");
  return {
    props: {
      post: {
        ...post,
        content,
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
