import Link from "next/link";

import { Repository } from "../../libs/graphql";
import AppTagLanguage from "../AppTagLanguage/AppTagLanguage";
import AppTagCount from "../AppTagCount/AppTagCount";

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
        <ul className="flex text-sm text-secondary">
          {repository.primaryLanguage ? (
            <li className="mr-3">
              <AppTagLanguage primaryLanguage={repository.primaryLanguage} />
            </li>
          ) : null}
          {repository.stargazerCount > 0 ? (
            <li>
              <AppTagCount
                nameWithOwner={repository.nameWithOwner}
                type="stargazers"
                count={repository.stargazerCount}
                className="mr-3"
              />
            </li>
          ) : null}
          {repository.forkCount > 0 ? (
            <li>
              <AppTagCount
                nameWithOwner={repository.nameWithOwner}
                type="forks"
                count={repository.forkCount}
                className="mr-3"
              />
            </li>
          ) : null}
        </ul>
      </div>
      <div className="col-span-2">
        <div>some graph</div>
      </div>
    </div>
  );
}
