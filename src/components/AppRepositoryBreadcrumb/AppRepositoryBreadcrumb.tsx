import React, { Fragment } from "react";
import Link from "next/link";

export type AppRepositoryBreadcrumbProps = {
  nameWithOwner: string;
  currentPath: string;
  currentRefName: string;
  className?: string;
};

export default function AppRepositoryBreadCrumb({
  nameWithOwner,
  currentPath,
  currentRefName, // todo take defaultBranchName in account
  className,
  ...props
}: AppRepositoryBreadcrumbProps): JSX.Element | null {
  const repositoryName = nameWithOwner.split("/").splice(-1)[0];
  const separator = <span className="mx-1">/</span>;
  return (
    <h2 className={className} {...props}>
      <Link href={`/${nameWithOwner}`}>
        <a className="font-bold text-brand-primary hover:underline">
          {repositoryName}
        </a>
      </Link>
      {separator}
      {currentPath
        .split("/")
        .reduce<{ path: string; pathFragment: string; isLast: boolean }[]>(
          (acc, pathFragment, index, array) => {
            acc.push({
              path: [`${acc[index - 1]?.path || ""}`, pathFragment]
                .filter(Boolean)
                .join("/"),
              pathFragment,
              isLast: index === array.length - 1,
            });
            return acc;
          },
          []
        )
        .map(({ path, pathFragment, isLast }) => {
          return (
            <Fragment key={path}>
              {isLast ? (
                <span className="font-bold">{pathFragment}</span>
              ) : (
                <Link
                  href={{
                    pathname: `/${nameWithOwner}/tree/${currentRefName}`,
                    query: {
                      path,
                    },
                  }}
                >
                  <a className="text-brand-primary hover:underline">
                    {pathFragment}
                  </a>
                </Link>
              )}
              {separator}
            </Fragment>
          );
        })}
    </h2>
  );
}
