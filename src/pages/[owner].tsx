import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";
import { gql, useQuery } from "@apollo/client";

import type { PageBaseProps } from "../types";
import { initializeApollo, addApolloState } from "../libs/apollo-client";
import TheHeader from "../components/TheHeader";

const REPOSITORY_OWNER_QUERY = gql`
  query GetRepositoryOwner($owner: String!) {
    rateLimit {
      limit
      cost
      remaining
      resetAt
    }
    repositoryOwner(login: $owner) {
      ... on User {
        __typename
        id
        name
        login
        bio
        createdAt
        websiteUrl
        twitterUsername
        avatarUrl
        location
        followers {
          totalCount
        }
        following {
          totalCount
        }
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              primaryLanguage {
                name
                color
              }
              stargazerCount
              forkCount
            }
          }
        }
        contributionsCollection {
          totalIssueContributions
          totalCommitContributions
          totalRepositoryContributions
        }
      }
      ... on Organization {
        __typename
        id
        name
        login
        createdAt
        websiteUrl
        twitterUsername
        avatarUrl
        location
        people: membersWithRole(first: 20) {
          totalCount
          edges {
            node {
              avatarUrl
            }
          }
        }
        repositories(first: 30) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          totalCount
          edges {
            node {
              primaryLanguage {
                name
                color
              }
              name
              description
            }
            cursor
          }
        }
      }
    }
  }
`;

const PROFILE_README_QUERY = gql`
  query GetProfileReadme($owner: String!) {
    profileReadme: repository(owner: $owner, name: $owner) {
      object(expression: "master:README.md") {
        ... on Blob {
          text
        }
      }
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { owner } = context.query;
  // bug specific in development
  if (
    process.env.NODE_ENV === "development" &&
    (!owner || owner === "<no source>")
  ) {
    return {
      props: {
        graphQLVariables: {
          owner: null,
        },
      },
    };
  }
  const baseProps = {
    graphQLVariables: {
      owner,
    },
    skipProfileReadme: false,
  };
  // create a new ApolloClient instance on each request server-side
  const apolloClient = initializeApollo();
  let skipProfileReadme = false;
  const repositoryOwnerResult = await apolloClient.query({
    query: REPOSITORY_OWNER_QUERY,
    variables: baseProps.graphQLVariables,
  });
  // this query needs to be done conditionally (not to raise a "NOT FOUND" error) - organizations dont have README profiles
  if (repositoryOwnerResult.data.repositoryOwner.__typename === "User") {
    // if it errors, tell `useQuery` to skip it clientSide (otherwise the query will be played as there won't be anything in cache)
    try {
      await apolloClient.query({
        query: PROFILE_README_QUERY,
        variables: baseProps.graphQLVariables,
      });
    } catch (e) {
      skipProfileReadme = true;
    }
  } else {
    skipProfileReadme = true;
  }
  // extract the cache from the Apollo client and inject it into the base state that will be serialized
  // this slice of state will be used client-side by `useApollo` in order to start from a populated cache
  return addApolloState(apolloClient, {
    props: {
      ...baseProps,
      skipProfileReadme,
    },
  });
};

export default function PageOwner({
  graphQLVariables,
  skipProfileReadme,
}: PageBaseProps<{ skipProfileReadme: boolean }>) {
  const repositoryOwnerResult = useQuery(REPOSITORY_OWNER_QUERY, {
    variables: graphQLVariables,
  });
  const profileReadmeResult = useQuery(PROFILE_README_QUERY, {
    variables: graphQLVariables,
    skip: skipProfileReadme,
  });
  const router = useRouter();
  const { owner } = router.query;
  return (
    <>
      <h1>Owner: "{owner}"</h1>
      <TheHeader />
      <ul>
        <li>{repositoryOwnerResult?.data?.repositoryOwner?.__typename}</li>
        <li>{repositoryOwnerResult?.data?.repositoryOwner?.websiteUrl}</li>
      </ul>
      {profileReadmeResult?.data?.profileReadme.object.text}
    </>
  );
}
