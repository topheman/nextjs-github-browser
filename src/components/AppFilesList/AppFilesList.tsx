import clsx from "clsx";
import Link from "next/link";
import { HistoryIcon } from "@primer/octicons-react";
import { TreeEntry, GitInfosType } from "../../libs/graphql";

import AppFilesHeader from "../AppFileHeader/AppFilesHeader";

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
      <div className="flex flex-1 bg-brand-secondary">
        <AppFilesHeader
          repositoryNameWithOwner={repositoryNameWithOwner}
          author={author}
          lastCommit={lastCommit}
          className="p-3"
        />
        <Link
          href={`/${repositoryNameWithOwner}/commits/${resolvedCurrentRef.name}`}
        >
          <a className="p-3 font-bold hover:text-brand-primary">
            <HistoryIcon className="mr-1" />
            {gitInfos.history.totalCount}{" "}
            <span className="font-normal text-secondary">commits</span>
          </a>
        </Link>
      </div>
      <h2 className="sr-only">Files</h2>
      <div className="flex">Body</div>
    </div>
  );
}
