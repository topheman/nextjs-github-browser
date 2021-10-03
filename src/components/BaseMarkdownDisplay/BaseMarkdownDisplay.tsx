/* eslint-disable react/no-danger */
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm"; // github flavour markdown
import raw from "rehype-raw"; // allow html in markdown - https://github.com/remarkjs/react-markdown#appendix-a-html-in-markdown
import sanitize from "rehype-sanitize"; // https://github.com/remarkjs/react-markdown#security

import { Maybe } from "../../libs/graphql";

export type BaseMarkdownDisplayProps = {
  markdown: Maybe<string> | undefined;
};

export default function BaseMarkdownDisplay({
  markdown,
  ...props
}: BaseMarkdownDisplayProps): JSX.Element | null {
  if (markdown) {
    return (
      // eslint-disable-next-line tailwindcss/no-custom-classname
      <div {...props} className="markdown-body">
        <ReactMarkdown rehypePlugins={[raw, sanitize]} remarkPlugins={[gfm]}>
          {markdown}
        </ReactMarkdown>
      </div>
    );
  }
  return null;
}
