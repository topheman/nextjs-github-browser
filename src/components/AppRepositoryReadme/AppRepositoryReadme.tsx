import React from "react";
import clsx from "clsx";
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
    <div
      className={clsx("rounded-md border border-light", className)}
      {...props}
    >
      <h2 className="sr-only">Readme</h2>
      <div className="p-3 rounded-tl rounded-tr bg-brand-secondary">
        {letterCase === "upper" ? "README.md" : "readme.md"}
      </div>
      <div className="p-3">
        <BaseMarkdownDisplay
          markdown={markdown}
          profileReadmeInfos={{
            defaultBranchName: currentRefName,
            login: nameWithOwner,
            mode: "repository",
          }}
        />
      </div>
    </div>
  );
}
