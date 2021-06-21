import { User } from "../../libs/graphql";
import AppUserProfileInfos from "../AppUserProfileInfos/AppUserProfileInfos";
import AppUserProfileOverview from "../AppUserProfileOverview/AppUserProfileOverview";

export type AppUserProfileProps = {
  user?: User;
  profileReadme: string | null;
  currentTab: "default" | "repositories";
  children: React.ReactChild;
};

AppUserProfile.defaultProps = {
  user: null,
  profileReadme: "",
};

export default function AppUserProfile({
  user,
  profileReadme,
  currentTab,
  children,
}: AppUserProfileProps): JSX.Element | null {
  if (!user) {
    return null;
  }
  return (
    <>
      <div className="hidden md:flex sticky top-0 border-b border-light">
        <div className="w-0 md:w-1/4" />
        <div className="w-full md:w-3/4 bg-primary">{children}</div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="z-10 px-4 mt-2 md:-mt-8 w-full md:w-1/4">
          <AppUserProfileInfos user={user} />
        </div>
        <div className="md:hidden px-3 border-b border-light">{children}</div>
        <div className="m-3 w-full md:w-3/4">
          {currentTab === "default" ? (
            <AppUserProfileOverview user={user} profileReadme={profileReadme} />
          ) : null}
        </div>
      </div>
    </>
  );
}
