/* eslint-disable react/no-danger */
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm"; // github flavour markdown
import raw from "rehype-raw"; // allow html in markdown - https://github.com/remarkjs/react-markdown#appendix-a-html-in-markdown
import sanitize from "rehype-sanitize"; // https://github.com/remarkjs/react-markdown#security
import clsx from "clsx";

import { profileReadmeBaseUrl } from "../../utils/github";
import { makeUriTransformer } from "./uri-transformer";
import styles from "./BaseMarkdown.module.css";

export type BaseMarkdownDisplayProps = {
  markdown: string | null | undefined;
  profileReadmeInfos: {
    login: string;
    defaultBranchName: string | undefined;
    mode: "user" | "organization" | "repository";
  };
  className?: string;
};

export default function BaseMarkdownDisplay({
  markdown,
  profileReadmeInfos,
  className,
  ...props
}: BaseMarkdownDisplayProps): JSX.Element | null {
  if (markdown) {
    let imageUriTransformer;
    let linkUriTransformer;
    if (
      profileReadmeInfos.mode === "repository" &&
      profileReadmeInfos.defaultBranchName
    ) {
      const [login, repositoryName] = profileReadmeInfos.login.split("/");
      imageUriTransformer = makeUriTransformer(
        profileReadmeBaseUrl(
          login,
          profileReadmeInfos.defaultBranchName,
          profileReadmeInfos.mode,
          "image",
          repositoryName
        )
      );
      linkUriTransformer = makeUriTransformer(
        profileReadmeBaseUrl(
          login,
          profileReadmeInfos.defaultBranchName,
          profileReadmeInfos.mode,
          "link",
          repositoryName
        )
      );
    } else if (profileReadmeInfos.defaultBranchName) {
      imageUriTransformer = makeUriTransformer(
        profileReadmeBaseUrl(
          profileReadmeInfos.login,
          profileReadmeInfos.defaultBranchName,
          profileReadmeInfos.mode,
          "image"
        )
      );
      linkUriTransformer = makeUriTransformer(
        profileReadmeBaseUrl(
          profileReadmeInfos.login,
          profileReadmeInfos.defaultBranchName,
          profileReadmeInfos.mode,
          "link"
        )
      );
    }
    return (
      // eslint-disable-next-line tailwindcss/no-custom-classname
      <div {...props} className={clsx("markdown-body")}>
        <ReactMarkdown
          rehypePlugins={[raw, sanitize]}
          remarkPlugins={[gfm]}
          className={clsx(styles.root, className)}
          transformLinkUri={linkUriTransformer}
          transformImageUri={imageUriTransformer}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    );
  }
  return null;
}
