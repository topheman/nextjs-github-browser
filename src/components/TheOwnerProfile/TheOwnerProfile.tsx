/* eslint-disable no-underscore-dangle */
import {
  useGetRepositoryOwnerWithPinnedItemsQuery,
  useGetRepositoryOwnerWithRepositoriesQuery,
  useGetProfileReadmeQuery,
  Blob,
} from "../../generated/graphql";
import { isUser, isOrganization } from "../../utils/type-guards";
import AppUserProfile from "../AppUserProfile/AppUserProfile";
import AppOrganizationProfile from "../AppOrganizationProfile/AppOrganizationProfile";

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
  const profileReadmeResult = useGetProfileReadmeQuery({
    variables: { owner },
    // skip this request for the default tab anyway - or if the getServerSideProps found out there wasn't any profile
    skip: tab === "repositories" || skipProfileReadme,
  });
  return (
    <>
      <h2>TheOwnerProfile</h2>
      {tab === "repositories" &&
        isUser(
          repositoryOwnerRepositoriesModeResult?.data?.repositoryOwner
        ) && (
          <AppUserProfile
            user={repositoryOwnerRepositoriesModeResult?.data?.repositoryOwner}
            profileReadme={
              (profileReadmeResult?.data?.profileReadme?.object as Blob)?.text
            }
            mode={tab}
          />
        )}
      {tab === "default" &&
        isUser(repositoryOwnerDefaultModeResult?.data?.repositoryOwner) && (
          <AppUserProfile
            user={repositoryOwnerDefaultModeResult?.data?.repositoryOwner}
            profileReadme={
              (profileReadmeResult?.data?.profileReadme?.object as Blob)?.text
            }
            mode={tab}
          />
        )}
      {tab === "default" &&
        isOrganization(
          repositoryOwnerDefaultModeResult?.data?.repositoryOwner
        ) && (
          <AppOrganizationProfile
            organization={
              repositoryOwnerDefaultModeResult?.data?.repositoryOwner
            }
          />
        )}
    </>
  );
}
