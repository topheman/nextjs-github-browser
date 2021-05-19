/* eslint-disable no-underscore-dangle */
import {
  useGetRepositoryOwnerWithPinnedItemsQuery,
  useGetRepositoryOwnerWithRepositoriesQuery,
  useGetProfileReadmeQuery,
  Blob,
  User,
  Organization,
} from "../../generated/graphql";
import { isUser, isOrganization } from "../../utils/type-guards";

export type TheOwnerProfileProps = {
  owner: string;
  tab: "default" | "repositories";
  skipProfileReadme: boolean;
};

type AppUserProfileProps = {
  user?: User;
  profileReadme?: string;
  mode: "default" | "repositories";
};
AppUserProfile.defaultProps = {
  user: null,
  profileReadme: "",
};
function AppUserProfile({ user, profileReadme, mode }: AppUserProfileProps) {
  if (!user) {
    return null;
  }
  return (
    <>
      <p>AppUserProfile/{mode}</p>
      <ul>
        {/* eslint-disable-next-line no-underscore-dangle */}
        <li>{user.__typename}</li>
        <li>{user.login}</li>
        <li>{user.name}</li>
        <li>{user.avatarUrl}</li>
      </ul>
      {profileReadme}
    </>
  );
}

type AppOrganizationProfileProps = {
  organization?: Organization;
};
AppOrganizationProfile.defaultProps = {
  organization: null,
};
function AppOrganizationProfile({ organization }: AppOrganizationProfileProps) {
  if (!organization) {
    return null;
  }
  return (
    <>
      <p>AppOrganizationProfile</p>
      <ul>
        {/* eslint-disable-next-line no-underscore-dangle */}
        <li>{organization.__typename}</li>
        <li>{organization.login}</li>
        <li>{organization.name}</li>
        <li>{organization.avatarUrl}</li>
      </ul>
    </>
  );
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
