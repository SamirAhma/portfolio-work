import markdownStyles from "./markdown-styles.module.css";
import github from "../assets/github.svg";
import Image from "next/image";
import external from "../assets/external.svg";
import desktop from "../assets/desktop.svg";
type Props = {
  content: string;
  githubLink: string;
  demoLink: string;
};

const PostBody = ({ content, githubLink, demoLink }: Props) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex">
        {demoLink && (
          <a
            href={demoLink}
            className="flex px-4 py-2 mr-4 font-medium text-white bg-green-500 rounded-lg hover:bg-green-600"
            rel="noopener noreferrer"
          >
            <div className="flex items-center justify-center mr-2">
              <Image src={desktop} width={20} height={20} alt="new tab" />
            </div>
            Demo
          </a>
        )}
        {demoLink && (
          <a
            href={demoLink}
            className="flex px-4 py-2 mr-4 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center justify-center mr-2">
              <Image src={external} width={20} height={20} alt="new tab" />
            </div>
            Open Demo in new tab
          </a>
        )}
        {githubLink && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={githubLink}
            className="flex px-4 py-2 font-medium text-white bg-black rounded-lg hover:bg-gray-700"
          >
            <div className="flex items-center justify-center mr-2">
              <Image
                src={github}
                width={20}
                height={20}
                color="white"
                alt="github"
              />
            </div>
            GitHub
          </a>
        )}
      </div>
      <div
        className={`${markdownStyles["markdown"]}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default PostBody;
