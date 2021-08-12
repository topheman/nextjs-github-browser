export function encodeBase64(str: string): string {
  if (typeof window === "undefined") {
    return Buffer.from(str, "utf-8").toString("base64");
  }
  return btoa(str);
}

export function decodeBase64(str: string): string {
  if (typeof window === "undefined") {
    return Buffer.from(str, "base64").toString();
  }
  return atob(str);
}
