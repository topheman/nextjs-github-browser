/* eslint-disable react/no-danger */
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm"; // github flavour markdown
import raw from "rehype-raw"; // allow html in markdown - https://github.com/remarkjs/react-markdown#appendix-a-html-in-markdown
import sanitize from "rehype-sanitize"; // https://github.com/remarkjs/react-markdown#security

import { Maybe } from "../../libs/graphql";

export type AppUserProfileCustomDescriptionProps = {
  profileReadme: Maybe<string> | undefined;
};

export default function AppUserProfileCustomDescription({
  profileReadme,
}: AppUserProfileCustomDescriptionProps): JSX.Element | null {
  if (profileReadme) {
    return (
      // eslint-disable-next-line tailwindcss/no-custom-classname
      <div className="markdown-body">
        <ReactMarkdown rehypePlugins={[raw, sanitize]} remarkPlugins={[gfm]}>
          {profileReadme}
        </ReactMarkdown>
      </div>
    );
  }
  return null;
}
