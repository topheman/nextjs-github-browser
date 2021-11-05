import clsx from "clsx";

import AppRepositoryMainHeader from "../AppRepositoryMainHeader/AppRepositoryMainHeader";
import { GetRepositoryInfosOverviewQuery } from "../../libs/graphql";

export type AppRepositoryOverviewProps = {
  repository?: GetRepositoryInfosOverviewQuery["repository"];
  currentPath?: string;
  className?: string;
};

export default function AppRepositoryOverview({
  repository,
  currentPath,
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
      <AppRepositoryMainHeader
        repository={repository}
        currentPath={currentPath}
      />
    </div>
  );
}
