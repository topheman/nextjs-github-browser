import { RepoIcon } from "@primer/octicons-react";

import AppTag from "../AppTag/AppTag";
import { PinnableItem } from "../../libs/graphql";
import { isRepository } from "../../utils/type-guards";

export type AppPinnedItemProps = {
  ownerLogin: string;
  item: PinnableItem;
};

export default function AppPinnedItem({
  ownerLogin,
  item,
}: AppPinnedItemProps): JSX.Element {
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <RepoIcon className="mr-1" />
        <a
          href={`/${ownerLogin}/${item.name}`}
          className="font-medium text-brand-primary hover:underline"
        >
          {item.name}
        </a>
      </div>
      <p className="mt-1 mb-1 h-[32px] text-xs text-secondary">
        {item.description}
      </p>
      <p>
        <AppTag
          ownerLogin={ownerLogin}
          repositoryName={item.name}
          type="stargazers"
          count={item.stargazerCount}
        />
        {isRepository(item) ? (
          <AppTag
            ownerLogin={ownerLogin}
            repositoryName={item.name}
            type="forks"
            count={item.forkCount}
            className="ml-2"
          />
        ) : null}
      </p>
    </div>
  );
}
