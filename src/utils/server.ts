import type { ServerResponse } from "http";

import { parseBooleanEnvVar } from "../../utils";

export function addHttpCacheHeader(res: ServerResponse): void {
  const CACHE_PAGES = parseBooleanEnvVar(process.env.CACHE_PAGES, false);
  const CACHE_MAX_AGE = process.env.CACHE_MAX_AGE || "120";
  if (CACHE_PAGES) {
    res.setHeader(
      "Cache-Control",
      `private, max-age=${CACHE_MAX_AGE}, must-revalidate`
    );
  }
}
