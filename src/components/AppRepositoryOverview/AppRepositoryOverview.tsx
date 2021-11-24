import clsx from "clsx";

import AppRepositoryMainHeader from "../AppRepositoryMainHeader/AppRepositoryMainHeader";
import AppFilesList from "../AppFilesList/AppFilesList";
import AppRepositoryReadme from "../AppRepositoryReadme/AppRepositoryReadme";
import { resolveCurrentRef } from "../../utils/github/repository";
import {
  GetRepositoryInfosOverviewQuery,
  GitInfosType,
  TreeEntry,
  Blob,
} from "../../libs/graphql";

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
  const resolvedCurrentRef = resolveCurrentRef({
    currentRef: repository.currentRef as {
      name: string;
      prefix: "refs/heads/" | "refs/tags/";
    },
    defaultBranchName: repository.defaultBranchRef?.name as string,
  });
  return (
    <div
      itemScope
      itemType="http://schema.org/SoftwareSourceCode"
      className={clsx(className)}
    >
      <AppRepositoryMainHeader
        repository={repository}
        currentPath={currentPath}
        currentRef={resolvedCurrentRef}
      />
      {repository.gitInfos ? (
        <AppFilesList
          repositoryNameWithOwner={repository.nameWithOwner}
          gitInfos={repository.gitInfos as GitInfosType}
          files={
            (repository.repositoryFiles as { entries: TreeEntry[] })?.entries ||
            []
          }
          currentPath={currentPath}
          className="mt-2"
          currentRef={resolvedCurrentRef}
        />
      ) : null}
      {!currentPath ? (
        <AppRepositoryReadme
          currentRefName={resolvedCurrentRef.name}
          markdown={
            ((repository.readmeLowercase || repository.readmeUppercase) as Blob)
              ?.text
          }
          letterCase={repository.readmeLowercase ? "lower" : "upper"}
          nameWithOwner={repository.nameWithOwner}
          className="mt-3"
        />
      ) : null}
    </div>
  );
}
