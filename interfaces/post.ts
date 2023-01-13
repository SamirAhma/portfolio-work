import type Author from "./author";

type PostType = {
  slug: string;
  title: string;
  coverImage: string;
  content: string;
  linkGithub: string;
  linkDemo: string;
  base64: any;
};

export default PostType;
