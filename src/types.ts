import type {
  ApolloClient,
  NormalizedCache,
  NormalizedCacheObject,
} from "@apollo/client";

import type { ParsedUrlQuery } from "querystring";

export type AppAppoloClient =
  | ApolloClient<NormalizedCache>
  | ApolloClient<NormalizedCacheObject>;

export type ParseQuery = (query: ParsedUrlQuery) => Record<string, string>;
