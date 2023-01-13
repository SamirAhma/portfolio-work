import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug, base64 = "url" }: any) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-sm w-full", {
        "hover:shadow-lg transition-shadow duration-200": slug,
      })}
      width={1300}
      height={630}
      blurDataURL={base64}
      placeholder="blur"
    />
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;

// export const getStaticProps = async ({ params }) => {
//   const { base64, img } = await getPlaiceholder(params.src);

//   return {
//     props: {
//       ...params,
//       src: img.src,
//       blurDataURL: base64,
//     },
//   };
// };
