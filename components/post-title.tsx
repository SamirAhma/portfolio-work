import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const PostTitle = ({ children }: Props) => {
  return (
    <h1 className="mb-12 text-xl font-bold leading-tight tracking-tighter text-center mt-7 md:text-xl lg:text-4xl md:leading-none md:text-left">
      {children}
    </h1>
  );
};

export default PostTitle;
