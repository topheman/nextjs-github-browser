import { User } from "../../libs/graphql";
import AppUserProfileInfos from "../AppUserProfileInfos/AppUserProfileInfos";
import AppUserProfileOverview from "../AppUserProfileOverview/AppUserProfileOverview";
import AppProfileNavTab from "../AppProfileNavTab/AppProfileNavTab";

export type AppUserProfileProps = {
  user?: User;
  profileReadme: string | null;
  currentTab: "default" | "repositories";
};

AppUserProfile.defaultProps = {
  user: null,
  profileReadme: "",
};

export default function AppUserProfile({
  user,
  profileReadme,
  currentTab,
}: AppUserProfileProps): JSX.Element | null {
  if (!user) {
    return null;
  }
  return (
    <>
      <AppProfileNavTab
        owner={user.login}
        currentTab={currentTab}
        reposTotalCount={user.repositories.totalCount}
      />
      <AppUserProfileInfos user={user} />
      {currentTab === "default" ? (
        <AppUserProfileOverview user={user} profileReadme={profileReadme} />
      ) : null}
    </>
  );
}
