import type { DefaultOptions } from "@apollo/client";

import type { AppAppoloClient } from "../types";

type QueryOptions = {
  query: DefaultOptions["query"]["query"];
  variables: DefaultOptions["query"]["variables"];
};

/**
 * You might need to do parallel call for some edge cases.
 */
export async function fetchMultipleGraphQLQuery(
  apolloClient: AppAppoloClient,
  queriesOptions: QueryOptions[]
) {
  const promises = queriesOptions.map((queryOptions) => {
    return apolloClient.query(queryOptions);
  });
  const allResults = await Promise.allSettled(promises);
  const successResults = allResults.reduce((acc, result) => {
    if (result.status === "fulfilled" && result.value) {
      acc = {
        ...acc,
        ...result.value.data,
      };
    }
    return acc;
  }, {});
  return successResults;
}
