import type {
  ApolloClient,
  NormalizedCache,
  NormalizedCacheObject,
} from "@apollo/client";

export type AppGraphQLVariables = Record<string, string>;

export type AppAppoloClient =
  | ApolloClient<NormalizedCache>
  | ApolloClient<NormalizedCacheObject>;

export type PageBaseProps<T> = {
  graphQLVariables: AppGraphQLVariables;
} & T;
