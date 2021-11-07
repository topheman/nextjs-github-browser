import clsx from "clsx";
import Link from "next/link";
import { GitBranchIcon, TagIcon } from "@primer/octicons-react";

import AppGitRefSwitch from "../AppGitRefSwitch/AppGitRefSwitch";
import AppRepositoryBreadcrumb from "../AppRepositoryBreadcrumb/AppRepositoryBreadcrumb";
import {
  GetRepositoryInfosOverviewQuery,
  GitRefType,
} from "../../libs/graphql";

export type AppRepositoryMainHeaderProps = {
  repository?: GetRepositoryInfosOverviewQuery["repository"];
  className?: string;
  currentRef: GitRefType;
  currentPath?: string;
};

export default function AppRepositoryMainHeader({
  repository,
  currentPath,
  currentRef,
  className,
}: AppRepositoryMainHeaderProps): JSX.Element | null {
  if (!repository) {
    return null;
  }
  return (
    <div className={clsx("flex", className)}>
      <AppGitRefSwitch
        defaultBranchName={repository.defaultBranchRef?.name as string}
        currentRef={currentRef}
        nameWithOwner={repository.nameWithOwner}
        branches={(repository.branches?.edges || [])
          .map((edge) => edge?.node?.name)
          .filter(Boolean)}
        tags={(repository.tags?.edges || [])
          .map((edge) => edge?.node?.name)
          .filter(Boolean)}
        branchesTotalCount={repository.branches?.totalCount || 0}
        tagsTotalCount={repository.tags?.totalCount || 0}
        currentPath={currentPath}
      />
      {!currentPath ? (
        <div className="hidden md:block">
          <div className="flex py-1 ml-3">
            {(repository.branches?.totalCount || 0) > 0 ? (
              <Link href={`/${repository.nameWithOwner}/branches`}>
                <a className="hover:text-brand-primary">
                  <GitBranchIcon />
                  <span className="font-bold">
                    {repository.branches?.totalCount}
                  </span>{" "}
                  branches
                </a>
              </Link>
            ) : null}
            {(repository.tags?.totalCount || 0) > 0 ? (
              <Link href={`/${repository.nameWithOwner}/tags`}>
                <a className="ml-3 hover:text-brand-primary">
                  <TagIcon />
                  <span className="ml-1 font-bold">
                    {repository.tags?.totalCount}
                  </span>{" "}
                  tags
                </a>
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}
      {currentPath ? (
        <AppRepositoryBreadcrumb
          nameWithOwner={repository.nameWithOwner}
          currentPath={currentPath}
          currentRef={currentRef}
          defaultBranchName={repository.defaultBranchRef?.name as string}
          className="py-1 ml-3 text-lg"
        />
      ) : null}
    </div>
  );
}
