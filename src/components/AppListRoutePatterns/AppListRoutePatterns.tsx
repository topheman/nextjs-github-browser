import { Fragment } from "react";
import Link, { LinkProps } from "next/link";

const LinkPattern = ({
  hrefPattern,
  queryPattern,
  href,
}: {
  hrefPattern: string[];
  queryPattern?: (
    | [string, string, { disableHighLight: boolean }]
    | [string, string]
  )[];
  href?: LinkProps["href"];
}): JSX.Element => {
  const content = (
    <>
      <span className="font-mono">/</span>
      {hrefPattern.map((fragment, index, array) => (
        <Fragment key={fragment}>
          {fragment.startsWith(":") ? (
            <code className="px-1 text-brand-primary rounded border border-brand-primary">
              {fragment}
            </code>
          ) : (
            <span>{fragment}</span>
          )}
          {index !== array.length - 1 ? (
            <span className="font-mono">/</span>
          ) : null}
        </Fragment>
      ))}
      {queryPattern ? (
        <>
          <span>?</span>
          {queryPattern.map(
            ([queryVarName, queryVarValue, disableHighLight]) => {
              return (
                <Fragment key={`${queryVarName}${queryVarValue}`}>
                  <span>{queryVarName}</span>=
                  {disableHighLight ? (
                    <span>{queryVarValue}</span>
                  ) : (
                    <code className="px-1 text-brand-primary rounded border border-brand-primary">
                      {queryVarValue}
                    </code>
                  )}
                </Fragment>
              );
            }
          )}
        </>
      ) : null}
    </>
  );
  if (href) {
    return (
      <Link href={href}>
        <a title={typeof href === "string" ? href : (href.href as string)}>
          {content}
        </a>
      </Link>
    );
  }
  return content;
};

export type AppListRoutePatternsProps = React.HTMLProps<HTMLDivElement>;

export default function AppListRoutePatterns({
  ...props
}: AppListRoutePatternsProps): JSX.Element | null {
  return (
    <div {...props}>
      <p>The following routes are supported (exact same pattern as github):</p>
      <ul className="ml-10 list-disc">
        <li>
          <LinkPattern hrefPattern={[":owner"]} href="/topheman" />
        </li>
        <li>
          <LinkPattern
            hrefPattern={[":owner"]}
            queryPattern={[["tab", "repositories", { disableHighLight: true }]]}
            href={{
              pathname: "/topheman",
              query: "tab=repositories",
            }}
          />
        </li>
        <li>
          <LinkPattern
            hrefPattern={["orgs", ":owner", "repositories"]}
            href="/orgs/twitter/repositories"
          />
        </li>
        <li>
          <LinkPattern
            hrefPattern={[":owner", ":repository"]}
            href="/topheman/nextjs-github-browser"
          />
        </li>
        <li>
          <LinkPattern
            hrefPattern={[":owner", ":repository", "tree", ":branch"]}
            href="/topheman/npm-registry-browser/tree/gh-pages"
          />
        </li>
        <li>
          <LinkPattern
            hrefPattern={[":owner", ":repository", "tree", ":tag"]}
            href="/topheman/docker-experiments/tree/v1.0.0"
          />
        </li>
        {/* <li>
          <LinkPattern
            hrefPattern={[":owner", ":repository", "commit", ":sha"]}
            href="/topheman/webrtc-experiments/commit/6d6b7cac7aca332a36ad7fc0918da3dd40496d"
          />
        </li> */}
      </ul>
      <p>
        The routes relating to file pathnames were changed to querystring
        because the pathname couldn't be matched directly:
      </p>
      <ul className="ml-10 list-disc">
        <li>
          <LinkPattern
            hrefPattern={[":owner", ":repository", "blob", ":branchOrTag"]}
            queryPattern={[["path", "filePathName"]]}
            href={{
              pathname: "/topheman/deno-weather/blob/master",
              query: "path=README.md",
            }}
          />
        </li>
      </ul>
    </div>
  );
}
