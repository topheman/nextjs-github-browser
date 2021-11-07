import clsx from "clsx";
import { FileDirectoryFillIcon, FileIcon } from "@primer/octicons-react";
import Link from "next/link";
import { TreeEntry, GitInfosType, GitRefType } from "../../libs/graphql";

import AppFilesHeader from "../AppFileHeader/AppFilesHeader";

export type AppFilesListProps = {
  repositoryNameWithOwner: string;
  gitInfos: GitInfosType;
  currentPath?: string;
  files: Pick<TreeEntry, "name" | "type" | "extension" | "path" | "oid">[];
  currentRef: GitRefType;
  className?: string;
};

export default function AppFilesList({
  repositoryNameWithOwner,
  gitInfos,
  files,
  currentPath,
  currentRef,
  className,
  ...props
}: AppFilesListProps): JSX.Element | null {
  const author = gitInfos.history.edges?.[0]?.node?.author?.user;
  const lastCommit = gitInfos.history.edges?.[0]?.node;
  const sortedFiles = [...files].sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === "blob" ? 1 : -1;
    }
    return a.name > b.name ? 1 : -1;
  });
  const parentPath = currentPath?.split("/").slice(0, -1).join("/");
  return (
    <div
      className={clsx("rounded-md border border-light", className)}
      {...props}
    >
      <AppFilesHeader
        repositoryNameWithOwner={repositoryNameWithOwner}
        author={!currentPath ? author : undefined}
        lastCommit={!currentPath ? lastCommit : undefined}
        commitsTotalCount={
          !currentPath ? gitInfos.history.totalCount : undefined
        }
        className="p-3"
        currentRef={currentRef}
      />
      <h2 className="sr-only" id="files" aria-labelledby="files">
        Files
      </h2>
      <div className="" role="grid">
        <div className="sr-only" role="row">
          <div role="columnheader">Type</div>
          <div role="columnheader">Name</div>
        </div>
        {currentPath ? (
          <div className="py-2 px-3" role="row">
            <div role="rowheader">
              <Link
                href={{
                  pathname: `/${repositoryNameWithOwner}/tree/${currentRef.name}`,
                  query: parentPath
                    ? {
                        path: parentPath,
                      }
                    : null,
                }}
              >
                <a className="hover:text-brand-primary">..</a>
              </Link>
            </div>
            <div role="gridcell" />
          </div>
        ) : null}
        {sortedFiles.map((file) => (
          <div
            className="flex hover:bg-primary-hover"
            key={file.name}
            role="row"
          >
            <div role="gridcell" className="p-2">
              {file.type === "tree" ? <FileDirectoryFillIcon /> : <FileIcon />}
            </div>
            <div role="rowheader" className="p-2">
              <Link
                href={{
                  pathname: `/${repositoryNameWithOwner}/${file.type}/${currentRef.name}`,
                  query: {
                    path: file.path,
                  },
                }}
              >
                <a className="hover:text-brand-primary hover:underline">
                  {file.name}
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
