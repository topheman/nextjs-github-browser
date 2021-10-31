import Link from "next/link";
import { LinkIcon, BookIcon, LawIcon } from "@primer/octicons-react";
import clsx from "clsx";

import { GetRepositoryInfosOverviewQuery } from "../../libs/graphql";
import { formatUrl } from "../../utils/string";

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
      itemType="http://schema.org/Organization"
      className={clsx(className)}
    >
      <div className="flex flex-col">
        <div>
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
        <div className="hidden md:block">
          <h2>Releases</h2>
        </div>
      </div>
    </div>
  );
}
