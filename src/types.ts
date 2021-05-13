import type {
  ApolloClient,
  NormalizedCache,
  NormalizedCacheObject,
} from "@apollo/client";

export type AppRenderMode = "PROFILE" | "REPOSITORY";

export type AppGraphQLVariables = Record<string, string>;

export type AppParsedQuery = {
  mode: AppRenderMode;
  variables: AppGraphQLVariables;
  componentName: string;
} | null;

export type AppAppoloClient =
  | ApolloClient<NormalizedCache>
  | ApolloClient<NormalizedCacheObject>;

export type FetchServerSideGraphQLQuery = (
  apolloClient: AppAppoloClient,
  { variables }: { variables: AppGraphQLVariables }
) => Promise<void>;
