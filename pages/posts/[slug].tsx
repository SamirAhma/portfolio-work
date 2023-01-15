import Container from "../../components/container";
import Layout from "../../components/layout";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";
import type PostType from "../../interfaces/post";
import PostHeader from "../../components/post-header";
import { getPlaiceholder } from "plaiceholder";
import LazyLoad from "react-lazy-load";
import PostBody from "../../components/post-body";
import Githubintro from "../../components/githubintro";
type Props = {
  post: PostType;
  preview?: boolean;
};

export default function Post({ post }: Props) {
  return (
    <Layout>
      <Container>
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
        <div className="max-w-4xl pb-12 mx-auto mt-2 mb-16">
          <LazyLoad height={900}>
            <Githubintro />
          </LazyLoad>
        </div>
      </Container>
    </Layout>
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
