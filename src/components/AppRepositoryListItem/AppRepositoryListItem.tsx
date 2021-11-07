import Link from "next/link";

import { Repository } from "../../libs/graphql";
import AppTagLanguage from "../AppTagLanguage/AppTagLanguage";
import AppTagCount from "../AppTagCount/AppTagCount";
import AppTagLicense from "../AppTagLicense/AppTagLicense";
import AppTagDate from "../AppTagDate/AppTagDate";
import BaseTag from "../BaseTag/BaseTag";

export type AppRepositoryListItemProps = {
  repository: Repository;
};

export default function AppRepositoryListItem({
  repository,
  ...props
}: AppRepositoryListItemProps): JSX.Element {
  return (
    <div
      {...props}
      className="grid grid-cols-12 pb-5 mb-5 border-b border-light"
    >
      <div className="col-span-12 md:col-span-10">
        <h3>
          <Link href={`/${repository.nameWithOwner}`}>
            <a className="text-xl font-bold text-brand-primary hover:underline">
              {repository.name}
            </a>
          </Link>
        </h3>
        <p className="text-sm text-secondary">{repository.description}</p>
        {(repository.repositoryTopics?.edges?.length || 0) > 0 ? (
          <ul className="my-2 text-sm text-brand-primary">
            {repository.repositoryTopics?.edges?.filter(Boolean).map((edge) => {
              return (
                <BaseTag
                  key={edge.node?.topic.name}
                  color="brand-primary"
                  className="mr-1"
                >
                  {edge.node?.topic.name}
                </BaseTag>
              );
            })}
          </ul>
        ) : null}
        <ul className="flex mt-3 text-sm text-secondary">
          {repository.primaryLanguage ? (
            <li className="mr-4">
              <AppTagLanguage primaryLanguage={repository.primaryLanguage} />
            </li>
          ) : null}
          {repository.stargazerCount > 0 ? (
            <li>
              <AppTagCount
                nameWithOwner={repository.nameWithOwner}
                type="stargazers"
                count={repository.stargazerCount}
                className="mr-4"
              />
            </li>
          ) : null}
          {repository.forkCount > 0 ? (
            <li>
              <AppTagCount
                nameWithOwner={repository.nameWithOwner}
                type="forks"
                count={repository.forkCount}
                className="mr-4"
              />
            </li>
          ) : null}
          {repository.licenseInfo ? (
            <li className="mr-4">
              <AppTagLicense license={repository.licenseInfo} />
            </li>
          ) : null}
          {repository.updatedAt ? (
            <li className="mr-4">
              <AppTagDate
                date={new Date(repository.updatedAt)}
                mode="updated"
              />
            </li>
          ) : null}
        </ul>
      </div>
      <div className="hidden md:col-span-2">
        <div>{/* some graph */}</div>
      </div>
    </div>
  );
}
