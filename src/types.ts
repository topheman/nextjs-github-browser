import type {
  ApolloClient,
  NormalizedCache,
  NormalizedCacheObject,
} from "@apollo/client";

import type { ParsedUrlQuery } from "querystring";

export type AppAppoloClient =
  | ApolloClient<NormalizedCache>
  | ApolloClient<NormalizedCacheObject>;

// export type ParseQuery = (query: ParsedUrlQuery) => Record<string, string>;

export type ParseQuery<T> = (
  query: ParsedUrlQuery
) => Record<string, string> & T;

export type PageProps = {
  __APOLLO_STATE__?: { [key: string]: unknown };
  [key: string]: unknown;
};
