import {
  GetRepositoryOwnerWithPinnedItemsQueryResult,
  useGetRepositoryOwnerWithPinnedItemsQuery,
  GetRepositoryOwnerWithRepositoriesQueryResult,
  useGetRepositoryOwnerWithRepositoriesQuery,
  useGetProfileReadmeQuery,
  Blob,
} from "../../generated/graphql";

export type TheOwnerProfileProps = {
  owner: string;
  tab: "default" | "repositories";
  skipProfileReadme: boolean;
};

/**
 * Typeguard since we have two requests we need to chose and cast
 */
function extractResult(
  result: {
    default: GetRepositoryOwnerWithPinnedItemsQueryResult;
    repositories: GetRepositoryOwnerWithRepositoriesQueryResult;
  },
  mode: TheOwnerProfileProps["tab"]
) {
  if (mode === "repositories") {
    return result.default;
  }
  return result.repositories;
}

export default function TheOwnerProfile({
  owner,
  tab,
  skipProfileReadme,
}: TheOwnerProfileProps): JSX.Element {
  const repositoryOwnerDefaultModeResult = useGetRepositoryOwnerWithPinnedItemsQuery(
    {
      variables: { owner },
      skip: tab === "repositories",
    }
  );
  const repositoryOwnerRepositoriesModeResult = useGetRepositoryOwnerWithRepositoriesQuery(
    {
      variables: { owner },
      skip: tab === "default",
    }
  );
  const result = extractResult(
    {
      default: repositoryOwnerDefaultModeResult,
      repositories: repositoryOwnerRepositoriesModeResult,
    },
    tab
  );
  const profileReadmeResult = useGetProfileReadmeQuery({
    variables: { owner },
    // skip this request for the default tab anyway - or if the getServerSideProps found out there wasn't any profile
    skip: tab === "repositories" || skipProfileReadme,
  });
  return (
    <>
      <p>TheOwnerProfile</p>
      <ul>
        {/* eslint-disable-next-line no-underscore-dangle */}
        <li>{result?.data?.repositoryOwner?.__typename}</li>
        <li>{result?.data?.repositoryOwner?.websiteUrl}</li>
      </ul>
      {(profileReadmeResult?.data?.profileReadme?.object as Blob)?.text}
    </>
  );
}
