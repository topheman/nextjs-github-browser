import type { QueryOptions } from "@apollo/client/core/watchQueryOptions";

import type { AppAppoloClient } from "../types";

type MyQueryOptions = {
  query: QueryOptions["query"];
  variables: QueryOptions["variables"];
};

/**
 * You might need to do parallel call for some edge cases.
 * @todo remove in no use cases
 */
export async function fetchMultipleGraphQLQuery(
  apolloClient: AppAppoloClient,
  queriesOptions: MyQueryOptions[]
): Promise<Record<string, unknown>> {
  const promises = queriesOptions.map((queryOptions) => {
    return apolloClient.query(queryOptions);
  });
  const allResults = await Promise.allSettled(promises);
  const successResults = allResults.reduce((acc, result) => {
    if (result.status === "fulfilled" && result.value) {
      // eslint-disable-next-line no-param-reassign
      acc = {
        ...acc,
        ...result.value.data,
      };
    }
    return acc;
  }, {});
  return successResults;
}
