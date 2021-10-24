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
  repository: string;
  branchName?: string;
  commitId?: string;
  path?: string;
} => {
  const { owner, repository, branchName, commitId, path } = query;
  return {
    owner: typeof owner === "string" ? owner : "",
    repository: typeof repository === "string" ? repository : "",
    branchName: typeof branchName === "string" ? branchName : undefined,
    commitId: typeof commitId === "string" ? commitId : undefined,
    path: typeof path === "string" ? path : undefined,
  };
};

export function getRepositoryVariables({
  owner,
  repository,
  branchName,
  commitId,
  path,
}: {
  owner: string;
  repository: string;
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
    name: repository,
    branch: branchName ?? "HEAD",
    branchPath: `${branchName ?? "HEAD"}:${path || ""}`,
    commit: commitId,
  };
}
