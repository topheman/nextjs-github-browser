import { DocumentNode, gql, useQuery } from "@apollo/client";

export const makeRepositoryOwnerQuery = (
  tab: "default" | "repositories"
): DocumentNode => gql`
  query GetRepositoryOwner${
    tab === "repositories" ? "WithRepositories" : ""
  }($owner: String!) {
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
        ${((_tab) => {
          switch (_tab) {
            case "default":
              return `
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
        `;
            case "repositories":
              return `
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
        `;
            default:
              throw new Error(
                `makeRepositoryOwnerQuery only accepts "default" or "repositories", you passed "${_tab}"`
              );
          }
        })(tab)}
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

export type TheOwnerProfileProps = {
  owner: string;
  tab: "default" | "repositories";
  skipProfileReadme: boolean;
};

export default function TheOwnerProfile({
  owner,
  tab,
  skipProfileReadme,
}: TheOwnerProfileProps): JSX.Element {
  const repositoryOwnerResult = useQuery(makeRepositoryOwnerQuery(tab), {
    variables: { owner },
  });
  const profileReadmeResult = useQuery(PROFILE_README_QUERY, {
    variables: { owner },
    // skip this request for the default tab anyway - or if the getServerSideProps found out there wasn't any profile
    skip: tab === "repositories" || skipProfileReadme,
  });
  return (
    <>
      <p>TheOwnerProfile</p>
      <ul>
        {/* eslint-disable-next-line no-underscore-dangle */}
        <li>{repositoryOwnerResult?.data?.repositoryOwner?.__typename}</li>
        <li>{repositoryOwnerResult?.data?.repositoryOwner?.websiteUrl}</li>
      </ul>
      {profileReadmeResult?.data?.profileReadme.object.text}
    </>
  );
}
