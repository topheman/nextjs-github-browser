import clsx from "clsx";
import Link from "next/link";
import { HistoryIcon } from "@primer/octicons-react";
import { TreeEntry, GitInfosType } from "../../libs/graphql";

import { truncate } from "../../utils/string";
import AppAvatarImage from "../AppAvatarImage/AppAvatarImage";

export type AppFilesListProps = {
  repositoryNameWithOwner: string;
  gitInfos: GitInfosType;
  currentPath?: string;
  files: Pick<TreeEntry, "name" | "type" | "extension" | "path" | "oid">[];
  resolvedCurrentRef: {
    name: string;
    prefix: "refs/heads/" | "refs/tags/";
  };
  className?: string;
};

export default function AppFilesList({
  repositoryNameWithOwner,
  gitInfos,
  files,
  currentPath,
  resolvedCurrentRef,
  className,
  ...props
}: AppFilesListProps): JSX.Element | null {
  console.log(resolvedCurrentRef, currentPath, files);
  const author = gitInfos.history.edges?.[0]?.node?.author?.user;
  const lastCommit = gitInfos.history.edges?.[0]?.node;
  return (
    <div
      className={clsx("rounded-md border border-light", className)}
      {...props}
    >
      <h2 className="sr-only">Latest commit</h2>
      <div className="flex flex-1 p-3 bg-brand-secondary">
        <AppAvatarImage
          avatarUrl={`${author?.avatarUrl}&s=48`}
          alt={author?.login || "Avatar"}
          rounded="full"
          className="w-[24px]"
        />
        <Link
          href={`/${repositoryNameWithOwner}/commits?author=${author?.login}`}
        >
          <a className="ml-2 font-bold hover:underline">{author?.login}</a>
        </Link>
        <Link href={`/${repositoryNameWithOwner}/commit/${lastCommit?.oid}`}>
          <a className="ml-2 hover:text-brand-primary">
            {lastCommit?.messageHeadline}
          </a>
        </Link>
        <div className="flex flex-1 justify-end items-baseline">
          <Link href={`/${repositoryNameWithOwner}/commit/${lastCommit?.oid}`}>
            <a className="ml-2 text-sm text-secondary hover:text-brand-primary hover:underline">
              {truncate(lastCommit?.oid, 7, "")}
            </a>
          </Link>
          <Link href={`/${repositoryNameWithOwner}/commit/${lastCommit?.oid}`}>
            <a className="ml-2 text-secondary hover:text-brand-primary hover:underline">
              on {new Date(lastCommit?.committedDate).toLocaleDateString()}
            </a>
          </Link>
        </div>
        <div className="ml-2">
          <Link
            href={`/${repositoryNameWithOwner}/commits/${resolvedCurrentRef.name}`}
          >
            <a className="font-bold hover:text-brand-primary">
              <HistoryIcon className="mr-1" />
              {gitInfos.history.totalCount}{" "}
              <span className="font-normal text-secondary">commits</span>
            </a>
          </Link>
        </div>
      </div>
      <h2 className="sr-only">Files</h2>
      <div className="flex">Body</div>
    </div>
  );
}
