/* eslint-disable no-underscore-dangle */
import {
  useGetRepositoryOwnerWithPinnedItemsQuery,
  useGetRepositoryOwnerWithRepositoriesQuery,
  useGetProfileReadmeQuery,
  Blob,
} from "../../libs/graphql";
import { isUser, isOrganization } from "../../utils/type-guards";
import {
  getSearchRepoGraphqlVariables,
  SearchUrlParamsType,
} from "../../utils/github";
import AppUserProfile from "../AppUserProfile/AppUserProfile";
import AppProfileNavTab from "../AppProfileNavTab/AppProfileNavTab";
import AppOrganizationProfile from "../AppOrganizationProfile/AppOrganizationProfile";
import AppUserProfileOverview from "../AppUserProfileOverview/AppUserProfileOverview";
import AppUserProfileInfos from "../AppUserProfileInfos/AppUserProfileInfos";
import AppUserProfileRepositories from "../AppUserProfileRepositories/AppUserProfileRepositories";

export type TheOwnerProfileProps = {
  owner: string;
  tab: "default" | "repositories";
  skipProfileReadme: boolean;
  searchUrlParams: SearchUrlParamsType;
};

export default function TheOwnerProfile({
  owner,
  tab,
  skipProfileReadme,
  searchUrlParams,
}: TheOwnerProfileProps): JSX.Element | null {
  const repositoryOwnerDefaultModeResult = useGetRepositoryOwnerWithPinnedItemsQuery(
    {
      variables: { owner },
      skip: tab === "repositories",
    }
  );
  const repositoryOwnerRepositoriesModeResult = useGetRepositoryOwnerWithRepositoriesQuery(
    {
      variables: {
        owner,
        ...getSearchRepoGraphqlVariables(owner, searchUrlParams),
      },
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
    repositoryOwnerRepositoriesModeResult &&
    repositoryOwnerRepositoriesModeResult.data &&
    repositoryOwnerRepositoriesModeResult.data.repositoryOwner &&
    isUser(repositoryOwnerRepositoriesModeResult.data.repositoryOwner)
  ) {
    const user = repositoryOwnerRepositoriesModeResult.data.repositoryOwner;
    return (
      <AppUserProfile user={user}>
        {() => ({
          nav: (
            <AppProfileNavTab
              owner={owner}
              currentTab={tab}
              reposTotalCount={user.allRepos.totalCount}
            />
          ),
          sidebar: <AppUserProfileInfos user={user} />,
          main: <AppUserProfileRepositories />,
        })}
      </AppUserProfile>
    );
  }
  if (
    tab === "default" &&
    repositoryOwnerDefaultModeResult &&
    repositoryOwnerDefaultModeResult.data &&
    repositoryOwnerDefaultModeResult.data.repositoryOwner &&
    isUser(repositoryOwnerDefaultModeResult.data.repositoryOwner)
  ) {
    const user = repositoryOwnerDefaultModeResult.data.repositoryOwner;
    return (
      <AppUserProfile user={user}>
        {() => ({
          nav: (
            <AppProfileNavTab
              owner={owner}
              currentTab={tab}
              reposTotalCount={user.allRepos.totalCount}
            />
          ),
          sidebar: <AppUserProfileInfos user={user} />,
          main: (
            <AppUserProfileOverview
              user={user}
              profileReadme={
                // README.md for profile might be on a main or master branch
                ((profileReadmeResult?.data?.profileReadme?.main ||
                  profileReadmeResult?.data?.profileReadme?.master) as Blob)
                  ?.text
              }
            />
          ),
        })}
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
