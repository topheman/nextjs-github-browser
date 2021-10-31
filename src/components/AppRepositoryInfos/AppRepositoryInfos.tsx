import Link from "next/link";
import { LinkIcon, BookIcon, LawIcon, TagIcon } from "@primer/octicons-react";
import clsx from "clsx";

import { GetRepositoryInfosOverviewQuery } from "../../libs/graphql";
import { formatUrl } from "../../utils/string";
import BaseBadge from "../BaseBadge/BaseBadge";
import { formatDate } from "../../utils/date";

export type AppRepositoryInfosProps = {
  repository?: GetRepositoryInfosOverviewQuery["repository"];
  className?: string;
};

export default function AppOrganizationProfileInfos({
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
        <div className="md:pb-4">
          <h2 className="hidden md:block mb-2 font-bold">About</h2>
          <p className="mb-2">{repository.description}</p>
          {repository.homepageUrl ? (
            <div className="mb-1 md:mb-2">
              <LinkIcon className="mr-2" />
              <a
                href={repository.homepageUrl}
                title={repository.homepageUrl}
                target="_blank"
                className="font-bold text-brand-primary hover:underline"
                rel="noreferrer noopener"
              >
                {formatUrl(repository.homepageUrl)}
              </a>
            </div>
          ) : null}
          <h3 className="sr-only">Topics</h3>
          <h3 className="sr-only">Resources</h3>
          {repository.readmeLowercase || repository.readmeUppercase ? (
            <div className="mb-1 md:mb-2 text-secondary hover:text-brand-primary">
              <Link href="#readme">
                <a>
                  <BookIcon className="mr-2" />
                  Readme
                </a>
              </Link>
            </div>
          ) : null}
          <h3 className="sr-only">License</h3>
          {repository.licenseInfo ? (
            <div className="mb-1 md:mb-2 text-secondary hover:text-brand-primary">
              <Link
                href={`/${repository.nameWithOwner}/blob/${repository.defaultBranchRef?.name}/LICENSE.txt`}
              >
                <a>
                  <LawIcon className="mr-2" />
                  {repository.licenseInfo.name}
                </a>
              </Link>
            </div>
          ) : null}
        </div>
        <div className="hidden md:block pt-4 border-t border-light">
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
          </div>
        </div>
      </div>
    </div>
  );
}
