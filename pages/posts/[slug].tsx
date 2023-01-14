import Container from "../../components/container";
import Layout from "../../components/layout";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";
import type PostType from "../../interfaces/post";
import { useState } from "react";
import { Loading } from "../../components/Loading";
import { useEffect } from "react";
import PostHeader from "../../components/post-header";
import { getPlaiceholder } from "plaiceholder";
import LazyLoad from "react-lazy-load";
import PostBody from "../../components/post-body";
import Githubintro from "../../components/githubintro";
type Props = {
  post: PostType;
  preview?: boolean;
};

import { useWait } from "react-wait";

export default function Post({ post }: Props) {
  const [loading, setLoading] = useState(true);
  const { startWaiting, endWaiting, Wait } = useWait();
  useEffect(() => {
    startWaiting("fullPageLoad");
    // set a timeout for the loading message to be displayed for a certain period of time
    setTimeout(() => {
      endWaiting("fullPageLoad");
      setLoading(false);
    }, 1100);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Wait on="fullPageLoad">
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
          <div className="max-w-4xl mx-auto mt-2 mb-16">
            <LazyLoad height={900}>
              <Githubintro />
            </LazyLoad>
          </div>
        </Container>
      </Layout>
    </Wait>
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
