import { gql, useQuery } from "@apollo/client";

import type {
  FetchServerSideGraphQLQuery,
  AppGraphQLVariables,
} from "../types";

const REPOSITORY_OWNER_QUERY = gql`
  query GetRepositoryOwner($login: String!) {
    repositoryOwner(login: $login) {
      ... on User {
        __typename
        login
        bio
        websiteUrl
      }
      ... on Organization {
        __typename
        login
        description
        websiteUrl
      }
    }
  }
`;

const PROFILE_README_QUERY = gql`
  query GetProfileReadme($login: String!) {
    profileReadme: repository(owner: $login, name: $login) {
      object(expression: "master:README.md") {
        ... on Blob {
          text
        }
      }
    }
  }
`;

/**
 * Fetch GraphQL server-side
 * todo: Should be at a page level inside getServerSideProps so that it wont be part of client bundle
 */
export const fetchServerSideGraphQLQuery: FetchServerSideGraphQLQuery = async (
  apolloClient,
  { variables }
) => {
  let profileReadmeResult = null;
  const repositoryOwnerResult = await apolloClient.query({
    query: REPOSITORY_OWNER_QUERY,
    variables,
  });
  if (repositoryOwnerResult.data.user) {
    profileReadmeResult = await apolloClient.query({
      query: PROFILE_README_QUERY,
      variables,
    });
  }
};

export default function PageRootProfile({
  graphqlVariables,
}: {
  graphqlVariables: AppGraphQLVariables;
}) {
  const repositoryOwnerResult = useQuery(REPOSITORY_OWNER_QUERY, {
    variables: graphqlVariables,
  });
  // const profileReadmeResult = useQuery(PROFILE_README_QUERY, {
  //   variables: graphqlVariables,
  // });
  // console.log("userResult", userResult);
  // console.log("organizationResult", organizationResult);
  return (
    <div>
      <h1>
        Is <strong>{graphqlVariables.login}</strong> a User or an Organization
        or Nothing ?
      </h1>
      <ul>
        <li>{repositoryOwnerResult?.data?.repositoryOwner?.__typename}</li>
        <li>{repositoryOwnerResult?.data?.repositoryOwner?.websiteUrl}</li>
      </ul>
    </div>
  );
}
