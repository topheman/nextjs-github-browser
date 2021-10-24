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
    branchName: typeof branchName === "string" ? branchName : undefined,
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
  branch: string;
  branchPath: string;
  commit?: string;
} {
  return {
    owner,
    name: repositoryName,
    branch: branchName ?? "HEAD",
    branchPath: `${branchName ?? "HEAD"}:${path || ""}`,
    commit: commitId,
  };
}
