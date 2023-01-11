import type Author from "./author";

type PostType = {
  slug: string;
  title: string;

  coverImage: string;

  // excerpt: string;
  // ogImage: {
  //   url: string;
  // };
  content: string;
  // intro: any;
};

export default PostType;
