import React from "react";
import BaseBoxWithHeader from "../BaseBoxWithHeader/BaseBoxWithHeader";
import BaseMarkdownDisplay from "../BaseMarkdownDisplay/BaseMarkdownDisplay";

export type AppRepositoryReadmeProps = {
  markdown?: string | null;
  nameWithOwner: string;
  currentRefName?: string;
  letterCase: "lower" | "upper";
  className?: string;
};

export default function AppRepositoryReadme({
  markdown,
  nameWithOwner,
  currentRefName, // todo rename to branchName
  letterCase,
  className,
  ...props
}: AppRepositoryReadmeProps): JSX.Element | null {
  if (!markdown) return null;
  return (
    <BaseBoxWithHeader
      header={
        <>
          <h2 className="sr-only">Readme</h2>
          <span>{letterCase === "upper" ? "README.md" : "readme.md"}</span>
        </>
      }
      className={className}
      {...props}
    >
      <BaseMarkdownDisplay
        markdown={markdown}
        profileReadmeInfos={{
          defaultBranchName: currentRefName,
          login: nameWithOwner,
          mode: "repository",
        }}
        className="p-3"
      />
    </BaseBoxWithHeader>
  );
}
