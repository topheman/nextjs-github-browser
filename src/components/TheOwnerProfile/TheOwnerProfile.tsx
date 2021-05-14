import { gql, useQuery } from "@apollo/client";

export const REPOSITORY_OWNER_QUERY = gql`
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

export const PROFILE_README_QUERY = gql`
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

export default function TheOwnerProfile({
  owner,
  skipProfileReadme,
}: {
  owner: string;
  skipProfileReadme: boolean;
}) {
  const repositoryOwnerResult = useQuery(REPOSITORY_OWNER_QUERY, {
    variables: { owner },
  });
  const profileReadmeResult = useQuery(PROFILE_README_QUERY, {
    variables: { owner },
    skip: skipProfileReadme,
  });
  return (
    <>
      <p>TheOwnerProfile</p>
      <ul>
        <li>{repositoryOwnerResult?.data?.repositoryOwner?.__typename}</li>
        <li>{repositoryOwnerResult?.data?.repositoryOwner?.websiteUrl}</li>
      </ul>
      {profileReadmeResult?.data?.profileReadme.object.text}
    </>
  );
}
