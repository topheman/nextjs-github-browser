import clsx from "clsx";
import Link from "next/link";
import { HistoryIcon } from "@primer/octicons-react";
import { Actor, Commit } from "../../libs/graphql";

import { truncate } from "../../utils/string";
import AppAvatarImage from "../AppAvatarImage/AppAvatarImage";

export type AppFilesHeaderProps = {
  repositoryNameWithOwner: string;
  author?: Pick<Actor, "avatarUrl" | "login"> | null;
  lastCommit?: Pick<Commit, "oid" | "messageHeadline" | "committedDate"> | null;
  commitsTotalCount: number;
  resolvedCurrentRef: {
    name: string;
    prefix: "refs/heads/" | "refs/tags/";
  };
  className?: string;
};

export default function AppFilesHeader({
  repositoryNameWithOwner,
  author,
  lastCommit,
  commitsTotalCount,
  resolvedCurrentRef,
  className,
  ...props
}: AppFilesHeaderProps): JSX.Element | null {
  return (
    <>
      <h2 className="sr-only">Latest commit</h2>
      <div
        className={clsx("flex flex-1 bg-brand-secondary", className)}
        {...props}
      >
        <div className="flex flex-1">
          {author && lastCommit ? (
            <>
              <AppAvatarImage
                avatarUrl={`${author?.avatarUrl}&s=48`}
                alt={author?.login || "Avatar"}
                rounded="full"
                className="w-[24px]"
              />
              <Link
                href={`/${repositoryNameWithOwner}/commits?author=${author?.login}`}
              >
                <a className="ml-2 font-bold hover:underline">
                  {author?.login}
                </a>
              </Link>
              <Link
                href={`/${repositoryNameWithOwner}/commit/${lastCommit?.oid}`}
              >
                <a className="ml-2 hover:text-brand-primary">
                  {lastCommit?.messageHeadline}
                </a>
              </Link>
              <div className="flex flex-1 justify-end items-baseline">
                <Link
                  href={`/${repositoryNameWithOwner}/commit/${lastCommit?.oid}`}
                >
                  <a className="ml-2 text-sm text-secondary hover:text-brand-primary hover:underline">
                    {truncate(lastCommit?.oid, 7, "")}
                  </a>
                </Link>
                <Link
                  href={`/${repositoryNameWithOwner}/commit/${lastCommit?.oid}`}
                >
                  <a className="ml-2 text-secondary hover:text-brand-primary hover:underline">
                    on{" "}
                    {new Date(lastCommit?.committedDate).toLocaleDateString()}
                  </a>
                </Link>
              </div>
            </>
          ) : (
            <div className="flex flex-1" />
          )}
          <Link
            href={`/${repositoryNameWithOwner}/commits/${resolvedCurrentRef.name}`}
          >
            <a className="ml-3 font-bold hover:text-brand-primary">
              <HistoryIcon className="mr-1" />
              {commitsTotalCount}{" "}
              <span className="font-normal text-secondary">commits</span>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
