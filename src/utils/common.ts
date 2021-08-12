export function encodeBase64(str?: string | null): string {
  if (!str) {
    return "";
  }
  if (typeof window === "undefined") {
    return Buffer.from(str, "utf-8").toString("base64");
  }
  return btoa(str);
}

export function decodeBase64(str?: string | null): string {
  if (!str) {
    return "";
  }
  if (typeof window === "undefined") {
    return Buffer.from(str, "base64").toString();
  }
  return atob(str);
}
