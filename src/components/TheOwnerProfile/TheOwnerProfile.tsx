/* eslint-disable no-underscore-dangle */
import {
  useGetRepositoryOwnerWithPinnedItemsQuery,
  useGetRepositoryOwnerWithRepositoriesQuery,
  useGetProfileReadmeQuery,
  Blob,
  PinnedItemInfosFragment,
} from "../../libs/graphql";
import { isUser, isOrganization } from "../../utils/type-guards";
import {
  getSearchRepoGraphqlVariables,
  SearchUrlParamsType,
} from "../../utils/github";
import AppProfile from "../AppProfile/AppProfile";
import AppProfileNavTab from "../AppProfileNavTab/AppProfileNavTab";
import AppProfileOverview from "../AppProfileOverview/AppProfileOverview";
import AppUserProfileInfos from "../AppUserProfileInfos/AppUserProfileInfos";
import AppOrganizationProfileInfos from "../AppOrganizationProfileInfos/AppOrganizationProfileInfos";
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
      <AppProfile>
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
      </AppProfile>
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
      <AppProfile>
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
            <AppProfileOverview
              profileReadme={
                // README.md for profile might be on a main or master branch
                (profileReadmeResult?.data?.profileReadmeUser?.file as Blob)
                  ?.text
              }
              pinnedRepositories={user.pinnedRepositories?.nodes?.map(
                (repo) => repo as PinnedItemInfosFragment
              )}
              popularRepositories={user.popularRepositories.edges?.map(
                (edge) => edge?.node as PinnedItemInfosFragment
              )}
            />
          ),
        })}
      </AppProfile>
    );
  }
  if (
    repositoryOwnerDefaultModeResult &&
    repositoryOwnerDefaultModeResult.data &&
    repositoryOwnerDefaultModeResult.data.repositoryOwner &&
    isOrganization(repositoryOwnerDefaultModeResult.data.repositoryOwner)
  ) {
    const organisation = repositoryOwnerDefaultModeResult.data.repositoryOwner;
    return (
      <AppProfile reverse>
        {() => ({
          nav: (
            <AppProfileNavTab
              owner={owner}
              currentTab={tab}
              reposTotalCount={organisation.allRepos.totalCount}
              isOrganization
            />
          ),
          sidebar: <AppOrganizationProfileInfos organization={organisation} />,
          main: (
            <AppProfileOverview
              profileReadme={
                // README.md for profile might be on a main or master branch
                (profileReadmeResult?.data?.profileReadmeOrg?.file as Blob)
                  ?.text
              }
              pinnedRepositories={organisation.pinnedRepositories?.nodes?.map(
                (repo) => repo as PinnedItemInfosFragment
              )}
              popularRepositories={organisation.popularRepositories.edges?.map(
                (edge) => edge?.node as PinnedItemInfosFragment
              )}
            />
          ),
        })}
      </AppProfile>
    );
  }
  return null;
}
