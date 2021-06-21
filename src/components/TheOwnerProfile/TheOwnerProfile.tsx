/* eslint-disable no-underscore-dangle */
import {
  useGetRepositoryOwnerWithPinnedItemsQuery,
  useGetRepositoryOwnerWithRepositoriesQuery,
  useGetProfileReadmeQuery,
  Blob,
} from "../../libs/graphql";
import { isUser, isOrganization } from "../../utils/type-guards";
import AppUserProfile from "../AppUserProfile/AppUserProfile";
import AppProfileNavTab from "../AppProfileNavTab/AppProfileNavTab";
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
}: TheOwnerProfileProps): JSX.Element | null {
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
  if (
    tab === "repositories" &&
    isUser(repositoryOwnerRepositoriesModeResult?.data?.repositoryOwner)
  ) {
    return (
      <AppUserProfile
        user={repositoryOwnerRepositoriesModeResult?.data?.repositoryOwner}
        currentTab={tab}
        profileReadme={
          (profileReadmeResult?.data?.profileReadme?.object as Blob)?.text
        }
      >
        <AppProfileNavTab
          owner={owner}
          currentTab={tab}
          reposTotalCount={
            repositoryOwnerRepositoriesModeResult?.data?.repositoryOwner
              .repositories.totalCount
          }
        />
      </AppUserProfile>
    );
  }
  if (
    tab === "default" &&
    isUser(repositoryOwnerDefaultModeResult?.data?.repositoryOwner)
  ) {
    return (
      <AppUserProfile
        user={repositoryOwnerDefaultModeResult?.data?.repositoryOwner}
        currentTab={tab}
        profileReadme={
          (profileReadmeResult?.data?.profileReadme?.object as Blob)?.text
        }
      >
        <AppProfileNavTab
          owner={owner}
          currentTab={tab}
          reposTotalCount={
            repositoryOwnerDefaultModeResult?.data?.repositoryOwner.repositories
              .totalCount
          }
        />
      </AppUserProfile>
    );
  }
  if (
    tab === "default" &&
    isOrganization(repositoryOwnerDefaultModeResult?.data?.repositoryOwner)
  ) {
    return (
      <AppOrganizationProfile
        organization={repositoryOwnerDefaultModeResult?.data?.repositoryOwner}
      />
    );
  }
  return null;
}
