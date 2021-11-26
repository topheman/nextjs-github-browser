import React, { Fragment } from "react";
import Link from "next/link";

import { GitRefType } from "../../libs/graphql";

export type AppRepositoryBreadcrumbProps = {
  nameWithOwner: string;
  defaultBranchName: string;
  currentPath: string;
  currentRef: GitRefType;
  className?: string;
} & React.HTMLProps<HTMLHeadingElement>;

export default function AppRepositoryBreadCrumb({
  nameWithOwner,
  defaultBranchName,
  currentPath,
  currentRef,
  className,
  ...props
}: AppRepositoryBreadcrumbProps): JSX.Element | null {
  const repositoryName = nameWithOwner.split("/").splice(-1)[0];
  const separator = <span className="mx-1">/</span>;
  return (
    <h2 className={className} {...props}>
      <Link
        href={
          currentRef.prefix === "refs/heads/" &&
          currentRef.name === defaultBranchName
            ? `/${nameWithOwner}`
            : `/${nameWithOwner}/tree/${currentRef.name}`
        }
      >
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
                    pathname: `/${nameWithOwner}/tree/${currentRef.name}`,
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
