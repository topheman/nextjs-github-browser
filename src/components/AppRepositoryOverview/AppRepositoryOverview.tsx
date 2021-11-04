import clsx from "clsx";

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
      className={clsx(className)}
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
    </div>
  );
}
