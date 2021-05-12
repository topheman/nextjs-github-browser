import type { NextPageContext } from "next";

import type { AppParsedQuery } from "../types";

export function parseQuery(query: NextPageContext["query"]): AppParsedQuery {
  const { slug } = query;
  if (slug && slug.length === 1) {
    return {
      mode: "PROFILE",
      componentName: "PageRootProfile",
      variables: {
        login: slug[0],
      },
    };
  }
  if (slug && slug.length === 2) {
    return {
      mode: "REPOSITORY",
      componentName: "PageRootProfile",
      variables: {
        owner: slug[0],
        name: slug[1],
      },
    };
  }
  return null;
}
