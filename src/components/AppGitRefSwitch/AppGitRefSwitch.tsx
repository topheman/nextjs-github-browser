import clsx from "clsx";
import React, { useState } from "react";
import { CheckIcon } from "@primer/octicons-react";
import Link from "next/link";

import BaseSelectMenu from "../BaseSelectMenu/BaseSelectMenu";
import BaseTag from "../BaseTag/BaseTag";

export type AppGitRefSwitchProps = {
  nameWithOwner: string;
  currentRef: {
    name: string;
    prefix: "refs/heads/" | "refs/tags/";
  };
  defaultBranchName: string;
  branches: string[];
  tags: string[];
  branchesTotalCount: number;
  tagsTotalCount: number;
};

const prefixMapping = {
  branches: "refs/heads/",
  tags: "refs/tags/",
};

export default function AppGitRefSwitch({
  nameWithOwner,
  currentRef,
  defaultBranchName,
  branches,
  tags,
  branchesTotalCount,
  tagsTotalCount,
}: AppGitRefSwitchProps): JSX.Element | null {
  const [currentTab, setCurrentTab] = useState<"branches" | "tags">("branches");
  const resolvedBranches = [
    ...new Set([defaultBranchName, currentRef.name, ...branches]),
  ];
  return (
    <BaseSelectMenu
      alignMenu="left"
      buttonLabel={currentRef.name}
      menuLabel="Switch branches/tags"
    >
      <div>
        <div role="tablist" className="flex text-sm border-b border-light">
          <button
            role="tab"
            aria-selected={currentTab === "branches"}
            type="button"
            tabIndex={currentTab === "branches" ? 0 : -1}
            className={clsx(
              "py-2 px-4 active:bg-brand-secondary",
              currentTab === "branches" && "font-bold"
            )}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentTab("branches");
            }}
          >
            Branches
          </button>
          <button
            role="tab"
            aria-selected={currentTab === "tags"}
            type="button"
            tabIndex={currentTab === "tags" ? 0 : -1}
            className={clsx(
              "py-2 px-4 active:bg-brand-secondary",
              currentTab === "tags" && "font-bold"
            )}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentTab("tags");
            }}
          >
            Tags
          </button>
        </div>
        <ul>
          {(currentTab === "branches" ? resolvedBranches : tags).map((ref) => {
            const isChecked =
              currentRef.prefix === prefixMapping[currentTab] &&
              currentRef.name === ref;
            return (
              <li
                key={ref}
                className={clsx(
                  "flex hover:bg-brand-secondary border-b border-light"
                )}
              >
                <Link href={`/${nameWithOwner}/tree/${ref}`}>
                  <a className="flex py-2 px-2 w-full" aria-checked={isChecked}>
                    {(isChecked && <CheckIcon className="w-[20px]" />) || (
                      <span className="inline-block w-[20px]" />
                    )}
                    <span className="flex-1">{ref}</span>
                    {currentTab === "branches" && ref === defaultBranchName ? (
                      <BaseTag className="text-xs" color="secondary">
                        default
                      </BaseTag>
                    ) : null}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
        {currentTab === "branches" &&
        branchesTotalCount > resolvedBranches.length ? (
          <div className="py-2 text-center">
            {branchesTotalCount - resolvedBranches.length} more branches ...
          </div>
        ) : null}
        {currentTab === "tags" && tagsTotalCount > tags.length ? (
          <div className="py-2 text-center">
            {tagsTotalCount - tags.length} more tags ...
          </div>
        ) : null}
      </div>
    </BaseSelectMenu>
  );
}
