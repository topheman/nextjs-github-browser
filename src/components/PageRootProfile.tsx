import { gql, useQuery } from "@apollo/client";

import { fetchMultipleGraphQLQuery } from "../utils/graphql";
import type { GetServerSideGraphQLProps, AppGraphQLVariables } from "../types";

const FULL_USER_QUERY = gql`
  query GetFullUser($login: String!) {
    user(login: $login) {
      websiteUrl
    }
  }
`;

const FULL_ORGANIZATION_QUERY = gql`
  query GetFullOrganization($login: String!) {
    organization(login: $login) {
      websiteUrl
    }
  }
`;

// @todo what about lazy-loading ? require on the fly
// is codesplitting possible ?

// @warn what about when import client-side ?
export const getServerSideGraphQLProps: GetServerSideGraphQLProps = async (
  apolloClient,
  { variables }
) => {
  return fetchMultipleGraphQLQuery(apolloClient, [
    {
      query: FULL_USER_QUERY,
      variables,
    },
    {
      query: FULL_ORGANIZATION_QUERY,
      variables,
    },
  ]);
};

export default function PageRootProfile({
  graphqlVariables,
}: {
  graphqlVariables: AppGraphQLVariables;
}) {
  const userResult = useQuery(FULL_USER_QUERY, {
    variables: graphqlVariables,
    errorPolicy: "ignore", // store null when not found
  });
  const organizationResult = useQuery(FULL_ORGANIZATION_QUERY, {
    variables: graphqlVariables,
    errorPolicy: "ignore", // store null when not found
  });
  // console.log("userResult", userResult);
  // console.log("organizationResult", organizationResult);
  return (
    <div>
      <h1>
        Is <strong>{graphqlVariables.login}</strong> a User or an Organization
        or Nothing ?
      </h1>
      <ul>
        <li>
          {organizationResult?.data?.organization?.websiteUrl ||
            userResult?.data?.user?.websiteUrl}
        </li>
      </ul>
    </div>
  );
}
