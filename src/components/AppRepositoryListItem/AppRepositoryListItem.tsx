import Link from "next/link";

import { Repository } from "../../libs/graphql";
import AppTagLanguage from "../AppTagLanguage/AppTagLanguage";
import AppTagCount from "../AppTagCount/AppTagCount";
import AppTagLicense from "../AppTagLicense/AppTagLicense";
import AppTagDate from "../AppTagDate/AppTagDate";
import AppTopicsTagList from "../AppTopicsTagList/AppTopicsTagList";

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
            <a
              className="text-xl font-bold text-brand-primary hover:underline"
              data-testid={`repository-item-link:${repository.name}`}
            >
              {repository.name}
            </a>
          </Link>
        </h3>
        <p className="text-sm text-secondary">{repository.description}</p>
        <AppTopicsTagList
          className="my-2 text-sm"
          topics={repository.repositoryTopics?.edges
            ?.filter(Boolean)
            .map(({ node }) => node)}
        />
        <ul className="mt-3 w-full text-sm text-secondary">
          {repository.primaryLanguage ? (
            <li className="inline mr-4">
              <AppTagLanguage primaryLanguage={repository.primaryLanguage} />
            </li>
          ) : null}
          {repository.stargazerCount > 0 ? (
            <li className="inline">
              <AppTagCount
                nameWithOwner={repository.nameWithOwner}
                type="stargazers"
                count={repository.stargazerCount}
                className="mr-4"
              />
            </li>
          ) : null}
          {repository.forkCount > 0 ? (
            <li className="inline">
              <AppTagCount
                nameWithOwner={repository.nameWithOwner}
                type="forks"
                count={repository.forkCount}
                className="mr-4"
              />
            </li>
          ) : null}
          {repository.licenseInfo ? (
            <li className="inline mr-4">
              <AppTagLicense license={repository.licenseInfo} />
            </li>
          ) : null}
          {repository.updatedAt ? (
            <li className="inline mr-4">
              <AppTagDate
                date={new Date(repository.updatedAt)}
                mode="updated"
                className="text-sm text-secondary"
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
