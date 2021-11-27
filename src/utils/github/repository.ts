import type { ParsedUrlQuery } from "querystring";
/**
 * Parse query from urls like :
 * - `[owner]/[repository]/tree/[branchName]`
 * - `[owner]/[repository]/commit/[commitId]`
 * - `[owner]/[repository]/blob/[branchName]?path=[path]`
 */
export const parseQuery = (
  query: ParsedUrlQuery
): {
  owner: string;
  repositoryName: string;
  branchName?: string;
  commitId?: string;
  path?: string;
} => {
  const { owner, repositoryName, branchName, commitId, path } = query;
  return {
    owner: typeof owner === "string" ? owner : "",
    repositoryName: typeof repositoryName === "string" ? repositoryName : "",
    branchName:
      // eslint-disable-next-line no-nested-ternary
      typeof branchName === "string"
        ? branchName
        : Array.isArray(branchName)
        ? branchName.join("/")
        : undefined,
    commitId: typeof commitId === "string" ? commitId : undefined,
    path: typeof path === "string" ? path : undefined,
  };
};

export function getRepositoryVariables({
  owner,
  repositoryName,
  branchName,
  commitId,
  path,
}: {
  owner: string;
  repositoryName: string;
  branchName?: string;
  commitId?: string;
  path?: string;
}): {
  owner: string;
  name: string;
  ref: string;
  refPath: string;
  upperCaseReadmeRefPath: string;
  lowerCaseReadmeRefPath: string;
  commit?: string;
  path?: string;
} {
  return {
    owner,
    name: repositoryName,
    ref: branchName ?? "HEAD",
    refPath: `${branchName ?? "HEAD"}:${path || ""}`,
    upperCaseReadmeRefPath: `${branchName ?? "HEAD"}:README.md`,
    lowerCaseReadmeRefPath: `${branchName ?? "HEAD"}:readme.md`,
    commit: commitId,
    path,
  };
}

type ResolveCurrentRefType = {
  currentRef: {
    name: string;
    prefix: "refs/heads/" | "refs/tags/";
  } | null;
  defaultBranchName: string;
};

export function resolveCurrentRef({
  currentRef,
  defaultBranchName,
}: ResolveCurrentRefType): {
  name: string;
  prefix: "refs/heads/" | "refs/tags/";
} {
  return (
    currentRef || {
      name: defaultBranchName,
      prefix: "refs/heads/",
    }
  );
}
