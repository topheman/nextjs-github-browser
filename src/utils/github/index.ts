export function profileReadmeBaseUrl(
  login: string,
  defaultBranchName: string,
  mode: "user" | "organization" | "repository",
  uriType: "link" | "image",
  repositoryName?: string
): string {
  const BASE_URL = "https://github.com";
  switch (mode) {
    case "organization":
      return `${BASE_URL}/${login}/.github/raw/${defaultBranchName}`;
    case "user":
      return `${BASE_URL}/${login}/${login}/raw/${defaultBranchName}`;
    case "repository":
      if (uriType === "link") {
        // todo might be a link to a blob or a tree - do a redirect ?
        return `/${login}/${repositoryName}/blob/${defaultBranchName}?path=`;
      }
      return `${BASE_URL}/${login}/${repositoryName}/raw/${defaultBranchName}`;
    default:
      throw new Error(`Only accept "user" or "organization" mode`);
  }
}
