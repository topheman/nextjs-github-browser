import clsx from "clsx";
import Link from "next/link";
import { HistoryIcon } from "@primer/octicons-react";

import { Actor, Commit, GitRefType } from "../../libs/graphql";
import { truncate } from "../../utils/string";
import AppAvatarImage from "../AppAvatarImage/AppAvatarImage";
import AppTagDate from "../AppTagDate/AppTagDate";

export type AppFilesHeaderProps = {
  repositoryNameWithOwner: string;
  author?: Pick<Actor, "avatarUrl" | "login"> | null;
  lastCommit?: Pick<Commit, "oid" | "messageHeadline" | "committedDate"> | null;
  commitsTotalCount?: number;
  currentRef: GitRefType;
  className?: string;
};

export default function AppFilesHeader({
  repositoryNameWithOwner,
  author,
  lastCommit,
  commitsTotalCount,
  currentRef,
  className,
  ...props
}: AppFilesHeaderProps): JSX.Element | null {
  return (
    <>
      <h2 className="sr-only">Latest commit</h2>
      <div
        className={clsx(
          "flex flex-1 bg-brand-secondary rounded-tl rounded-tr",
          className
        )}
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
                <a className="hidden sm:inline overflow-hidden ml-2 hover:text-brand-primary overflow-ellipsis whitespace-nowrap break-words">
                  {lastCommit?.messageHeadline}
                </a>
              </Link>
              <div className="flex flex-1 justify-end items-baseline">
                <Link
                  href={`/${repositoryNameWithOwner}/commit/${lastCommit?.oid}`}
                >
                  <a className="hidden lg:inline ml-2 text-sm text-secondary hover:text-brand-primary hover:underline">
                    {truncate(lastCommit?.oid, 7, "")}
                  </a>
                </Link>
                <Link
                  href={`/${repositoryNameWithOwner}/commit/${lastCommit?.oid}`}
                >
                  <a className="ml-2 text-secondary hover:text-brand-primary hover:underline whitespace-nowrap">
                    <AppTagDate
                      date={new Date(lastCommit?.committedDate)}
                      mode="default"
                    />
                  </a>
                </Link>
              </div>
            </>
          ) : (
            <div className="flex flex-1" />
          )}
          <Link href={`/${repositoryNameWithOwner}/commits/${currentRef.name}`}>
            <a className="ml-3 font-bold hover:text-brand-primary whitespace-nowrap">
              <HistoryIcon className="mr-1" />
              {commitsTotalCount ? (
                <>
                  <span className="hidden sm:inline">{commitsTotalCount}</span>{" "}
                  <span className="hidden lg:inline font-normal text-secondary">
                    commits
                  </span>
                </>
              ) : (
                <span>History</span>
              )}
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
