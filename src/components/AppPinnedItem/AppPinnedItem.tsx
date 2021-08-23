import { RepoIcon } from "@primer/octicons-react";

import AppTag from "../AppTag/AppTag";
import { PinnedItemInfosFragment } from "../../libs/graphql";
import { isRepository } from "../../utils/type-guards";

export type AppPinnedItemProps = {
  repository: PinnedItemInfosFragment;
};

export default function AppPinnedItem({
  repository,
}: AppPinnedItemProps): JSX.Element {
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <RepoIcon className="mr-1" />
        <a
          href={`/${repository.nameWithOwner}`}
          className="font-medium text-brand-primary hover:underline"
        >
          {repository.name}
        </a>
      </div>
      <p className="mt-1 mb-1 h-[32px] text-xs text-secondary">
        {repository.description ||
          (repository.parent?.nameWithOwner &&
            `Forked from ${repository.parent?.nameWithOwner}`)}
      </p>
      <p>
        <AppTag
          nameWithOwner={repository.nameWithOwner}
          type="stargazers"
          count={repository.stargazerCount}
        />
        {isRepository(repository) ? (
          <AppTag
            nameWithOwner={repository.nameWithOwner}
            type="forks"
            count={repository.forkCount}
            className="ml-2"
          />
        ) : null}
      </p>
    </div>
  );
}
