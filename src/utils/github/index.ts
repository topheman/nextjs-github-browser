export function profileReadmeBaseUrl(
  login: string,
  defaultBranchName: string,
  mode: "user" | "organization"
): string {
  const BASE_URL = "https://github.com";
  switch (mode) {
    case "organization":
      return `${BASE_URL}/${login}/.github/raw/${defaultBranchName}`;
    case "user":
      return `${BASE_URL}/${login}/${login}/raw/${defaultBranchName}`;
    default:
      throw new Error(`Only accept "user" or "organization" mode`);
  }
}
