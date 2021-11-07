/* eslint-disable react/no-danger */
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm"; // github flavour markdown
import raw from "rehype-raw"; // allow html in markdown - https://github.com/remarkjs/react-markdown#appendix-a-html-in-markdown
import sanitize from "rehype-sanitize"; // https://github.com/remarkjs/react-markdown#security
import clsx from "clsx";

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
    let uriTransformer;
    if (
      profileReadmeInfos.mode === "repository" &&
      profileReadmeInfos.defaultBranchName
    ) {
      const [login, repositoryName] = profileReadmeInfos.login.split("/");
      uriTransformer = makeUriTransformer(
        login,
        profileReadmeInfos.defaultBranchName,
        profileReadmeInfos.mode,
        repositoryName
      );
    } else if (profileReadmeInfos.defaultBranchName) {
      uriTransformer = makeUriTransformer(
        profileReadmeInfos.login,
        profileReadmeInfos.defaultBranchName,
        profileReadmeInfos.mode
      );
    }
    return (
      // eslint-disable-next-line tailwindcss/no-custom-classname
      <div {...props} className={clsx("markdown-body")}>
        <ReactMarkdown
          rehypePlugins={[raw, sanitize]}
          remarkPlugins={[gfm]}
          className={clsx(styles.root, className)}
          transformLinkUri={uriTransformer}
          transformImageUri={uriTransformer}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    );
  }
  return null;
}
