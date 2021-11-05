/* eslint-disable no-restricted-imports */

/**
 * src/generated/graphql.tsx is generated with `npm run graphql-codegen`
 * we don't import directly from the generated file in order to be able to make any overrides
 */
import {
  Maybe,
  Commit,
  CommitHistoryConnection,
  User,
} from "../generated/graphql";

export * from "../generated/graphql";

// GetRepositoryInfosOverviewQuery["repository"]["gitInfos"]
export type GitInfosType = {
  history: { __typename?: "CommitHistoryConnection" } & Pick<
    CommitHistoryConnection,
    "totalCount"
  > & {
      edges?: Maybe<
        Array<
          Maybe<
            { __typename?: "CommitEdge" } & {
              node?: Maybe<
                { __typename?: "Commit" } & Pick<
                  Commit,
                  "oid" | "messageHeadline" | "committedDate"
                > & {
                    author?: Maybe<
                      { __typename?: "GitActor" } & {
                        user?: Maybe<
                          { __typename?: "User" } & Pick<
                            User,
                            "login" | "avatarUrl"
                          >
                        >;
                      }
                    >;
                  }
              >;
            }
          >
        >
      >;
    };
};
