import Link from "next/link";
import { TagIcon } from "@primer/octicons-react";
import clsx from "clsx";

import AppRepositoryInfosAbout from "../AppRepositoryInfosAbout/AppRepositoryInfosAbout";
import AppLanguagesGraph from "../AppLanguagesGraph/AppLanguagesGraph";
import AppLanguagesList from "../AppLanguagesList/AppLanguagesList";
import { GetRepositoryInfosOverviewQuery } from "../../libs/graphql";
import BaseBadge from "../BaseBadge/BaseBadge";
import { formatDate } from "../../utils/date";

export type AppRepositoryInfosProps = {
  repository?: GetRepositoryInfosOverviewQuery["repository"];
  className?: string;
};

export default function AppRepositoryInfos({
  repository,
  className,
}: AppRepositoryInfosProps): JSX.Element | null {
  if (!repository) {
    return null;
  }
  return (
    <div
      itemScope
      itemType="http://schema.org/SoftwareSourceCode"
      className={clsx(className)}
    >
      <div className="flex flex-col">
        <AppRepositoryInfosAbout
          repository={repository}
          className="hidden md:block"
        />
        <div className="py-4 border-t border-light">
          <div>
            <h2 className="mb-2 font-bold">
              <Link href={`/${repository.nameWithOwner}/releases`}>
                <a>
                  Releases
                  {repository.releases.totalCount ? (
                    <BaseBadge
                      badgeContent={repository.releases.totalCount}
                      className="ml-1"
                    />
                  ) : null}
                </a>
              </Link>
            </h2>
            {repository.releases &&
            repository.releases.edges &&
            repository.releases.edges.length > 0 ? (
              <>
                <Link
                  href={`/${repository.nameWithOwner}/releases/${repository.releases?.edges[0]?.node?.tag?.name}`}
                >
                  <a className="flex mb-2">
                    <TagIcon fill="green" className="mr-1" />
                    <div>
                      <div className="font-bold">
                        {repository.releases?.edges[0]?.node?.name}
                        <span
                          className="px-2 ml-1 text-sm rounded-full border"
                          style={{ color: "green" }}
                        >
                          Latest
                        </span>
                      </div>
                      <div className="text-sm text-secondary">
                        {
                          formatDate(
                            new Date(
                              repository.releases?.edges[0]?.node?.createdAt
                            )
                          ).formattedDate
                        }
                      </div>
                    </div>
                  </a>
                </Link>
                {repository.releases.totalCount > 1 ? (
                  <Link href={`/${repository.nameWithOwner}/releases`}>
                    <a className="text-sm text-brand-primary hover:underline">
                      + {repository.releases.totalCount - 1} Releases
                    </a>
                  </Link>
                ) : null}
              </>
            ) : null}
            {(!repository.releases || !repository.releases.totalCount) &&
            repository.tags &&
            repository.tags.totalCount > 0 ? (
              <Link href={`/${repository.nameWithOwner}/releases`}>
                <a className="text-sm hover:text-brand-primary">
                  <TagIcon className="mr-1" />
                  <span className="font-bold">
                    {repository.tags.totalCount}
                  </span>{" "}
                  tags
                </a>
              </Link>
            ) : null}
          </div>
        </div>
        {repository.languages?.edges ? (
          <div className="py-4 border-t border-light">
            <div>
              <h2 className="mb-2 font-bold">Languages</h2>
              <AppLanguagesGraph languages={repository.languages?.edges} />
              <AppLanguagesList
                languages={repository.languages?.edges}
                className="mt-2 text-sm"
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
