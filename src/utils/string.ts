export function formatUrl(url: string): string {
  return url.replace(/https?:\/\//, "");
}

export function truncate(
  str: string,
  maxLength: number,
  ellipsis = "..."
): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + ellipsis;
}
