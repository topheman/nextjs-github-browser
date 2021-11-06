import clsx from "clsx";
import React, { useState } from "react";
import { CheckIcon, TagIcon, GitBranchIcon } from "@primer/octicons-react";
import Link from "next/link";

import { resolveCurrentRef } from "../../utils/github/repository";
import { truncate } from "../../utils/string";
import BaseSelectMenu from "../BaseSelectMenu/BaseSelectMenu";
import BaseTag from "../BaseTag/BaseTag";

type GitRef = {
  name: string;
  prefix: "refs/heads/" | "refs/tags/";
};

export type AppGitRefSwitchProps = {
  nameWithOwner: string;
  currentRef: GitRef | null;
  defaultBranchName: string;
  branches: string[];
  tags: string[];
  branchesTotalCount: number;
  tagsTotalCount: number;
  currentPath?: string;
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
  currentPath,
}: AppGitRefSwitchProps): JSX.Element | null {
  const [currentTab, setCurrentTab] = useState<"branches" | "tags">("branches");
  const resolvedBranches = [
    ...new Set(
      [
        defaultBranchName,
        currentRef?.prefix === "refs/heads/" ? currentRef?.name : null,
        ...branches,
      ].filter(Boolean)
    ),
  ];
  const resolvedTags = [
    ...new Set(
      [
        currentRef?.prefix === "refs/tags/" ? currentRef?.name : null,
        ...tags,
      ].filter(Boolean)
    ),
  ];
  const resolvedCurrentRef = resolveCurrentRef({
    currentRef,
    defaultBranchName,
  });
  return (
    <BaseSelectMenu
      alignMenu="left"
      icon={
        currentRef?.prefix === "refs/tags/" ? (
          <TagIcon className="mr-1" />
        ) : (
          <GitBranchIcon className="mr-1" />
        )
      }
      buttonLabel={truncate(resolvedCurrentRef.name, 15)}
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
          {(currentTab === "branches" ? resolvedBranches : resolvedTags).map(
            (ref) => {
              const isChecked =
                resolvedCurrentRef.prefix === prefixMapping[currentTab] &&
                resolvedCurrentRef.name === ref;
              return (
                <li
                  key={ref}
                  className={clsx(
                    "flex hover:bg-brand-secondary border-b border-light"
                  )}
                >
                  <Link
                    href={{
                      pathname: `/${nameWithOwner}/tree/${ref}`,
                      query: currentPath
                        ? {
                            path: currentPath,
                          }
                        : null,
                    }}
                  >
                    <a
                      className=" flex py-2 px-2 w-full"
                      aria-checked={isChecked}
                    >
                      {(isChecked && <CheckIcon className="w-[20px]" />) || (
                        <span className="inline-block w-[20px]" />
                      )}
                      <span className="overflow-hidden flex-1 overflow-ellipsis whitespace-nowrap">
                        {ref}
                      </span>
                      {currentTab === "branches" &&
                      ref === defaultBranchName ? (
                        <BaseTag className="text-xs" color="secondary">
                          default
                        </BaseTag>
                      ) : null}
                    </a>
                  </Link>
                </li>
              );
            }
          )}
        </ul>
        {currentTab === "branches" &&
        branchesTotalCount > resolvedBranches.length ? (
          <div className="py-2 text-center">
            {branchesTotalCount - resolvedBranches.length} more branches ...
          </div>
        ) : null}
        {currentTab === "tags" && tagsTotalCount > resolvedTags.length ? (
          <div className="py-2 text-center">
            {tagsTotalCount - resolvedTags.length} more tags ...
          </div>
        ) : null}
      </div>
    </BaseSelectMenu>
  );
}
