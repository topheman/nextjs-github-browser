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
      <div className="flex sticky top-0 border-b border-light">
        <div className="w-1/4" />
        <div className="pt-3 pb-3 w-3/4 bg-primary">
          <AppProfileNavTab
            owner={user.login}
            currentTab={currentTab}
            reposTotalCount={user.repositories.totalCount}
          />
        </div>
      </div>
      <div className="flex">
        <div className="z-10 pr-4 pl-4 -mt-8 w-1/4">
          <AppUserProfileInfos user={user} />
        </div>
        <div className="m-3 w-3/4">
          {currentTab === "default" ? (
            <AppUserProfileOverview user={user} profileReadme={profileReadme} />
          ) : null}
        </div>
      </div>
    </>
  );
}
