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
      <div className="hidden md:flex sticky top-0 border-b border-light">
        <div className="w-0 md:w-1/4" />
        <div className="pt-3 pb-3 w-full md:w-3/4 bg-primary">
          <AppProfileNavTab
            owner={user.login}
            currentTab={currentTab}
            reposTotalCount={user.repositories.totalCount}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="z-10 pr-4 pl-4 mt-0 md:-mt-8 w-full md:w-1/4">
          <AppUserProfileInfos user={user} />
        </div>
        <div className="m-3 w-full md:w-3/4">
          <div className="md:hidden">
            <AppProfileNavTab
              owner={user.login}
              currentTab={currentTab}
              reposTotalCount={user.repositories.totalCount}
            />
          </div>
          {currentTab === "default" ? (
            <AppUserProfileOverview user={user} profileReadme={profileReadme} />
          ) : null}
        </div>
      </div>
    </>
  );
}
