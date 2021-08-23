import Link from "next/link";
import { DotFillIcon } from "@primer/octicons-react";

import { Repository } from "../../libs/graphql";

export type AppRepositoryListItemProps = {
  repository: Repository;
};

export default function AppRepositoryListItem({
  repository,
}: AppRepositoryListItemProps): JSX.Element {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-10">
        <h3>
          <Link href={`/${repository.nameWithOwner}`}>
            <a className="text-lg font-bold text-brand-primary hover:underline">
              {repository.name}
            </a>
          </Link>
        </h3>
        <p className="text-sm text-secondary">{repository.description}</p>
        {(repository.repositoryTopics?.edges?.length || 0) > 0 ? (
          <ul className="my-2 text-sm text-brand-primary">
            {repository.repositoryTopics?.edges?.filter(Boolean).map((edge) => {
              return (
                <div
                  className="inline-block px-2 mr-1 rounded-lg border border-brand-primary"
                  key={edge.node?.topic.name}
                >
                  {edge.node?.topic.name}
                </div>
              );
            })}
          </ul>
        ) : null}
        <ul>
          {repository.primaryLanguage?.name ? (
            <li className="text-sm text-secondary">
              <DotFillIcon
                fill={repository.primaryLanguage.color || "#900000"}
                size={24}
                className="-mr-1 -mb-1"
              />
              {repository.primaryLanguage?.name}
            </li>
          ) : null}
          {repository.stargazerCount > 0 ? (
            <li>{repository.stargazerCount}</li>
          ) : null}
        </ul>
      </div>
      <div className="col-span-2">
        <div>some graph</div>
      </div>
    </div>
  );
}
