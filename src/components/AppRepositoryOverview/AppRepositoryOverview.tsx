import clsx from "clsx";
import Link from "next/link";
import { GitBranchIcon, TagIcon } from "@primer/octicons-react";

import AppGitRefSwitch, {
  AppGitRefSwitchProps,
} from "../AppGitRefSwitch/AppGitRefSwitch";
import { GetRepositoryInfosOverviewQuery } from "../../libs/graphql";

export type AppRepositoryOverviewProps = {
  repository?: GetRepositoryInfosOverviewQuery["repository"];
  className?: string;
};

export default function AppRepositoryOverview({
  repository,
  className,
}: AppRepositoryOverviewProps): JSX.Element | null {
  if (!repository) {
    return null;
  }
  return (
    <div
      itemScope
      itemType="http://schema.org/SoftwareSourceCode"
      className={clsx("flex", className)}
    >
      <AppGitRefSwitch
        defaultBranchName={repository.defaultBranchRef?.name as string}
        currentRef={repository.currentRef as AppGitRefSwitchProps["currentRef"]}
        nameWithOwner={repository.nameWithOwner}
        branches={(repository.branches?.edges || [])
          .map((edge) => edge?.node?.name)
          .filter(Boolean)}
        tags={(repository.tags?.edges || [])
          .map((edge) => edge?.node?.name)
          .filter(Boolean)}
        branchesTotalCount={repository.branches?.totalCount || 0}
        tagsTotalCount={repository.tags?.totalCount || 0}
      />
      <div>
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
                <span className="font-bold">
                  {repository.tags?.totalCount}
                </span>{" "}
                tags
              </a>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
