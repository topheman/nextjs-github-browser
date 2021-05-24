import { User } from "../../libs/graphql";
import AppUserProfileInfos from "../AppUserProfileInfos/AppUserProfileInfos";
import AppUserProfileOverview from "../AppUserProfileOverview/AppUserProfileOverview";
import AppProfileNavTab from "../AppProfileNavTab/AppProfileNavTab";

export type AppUserProfileProps = {
  user?: User;
  profileReadme: string | null;
  mode: "default" | "repositories";
};

AppUserProfile.defaultProps = {
  user: null,
  profileReadme: "",
};

export default function AppUserProfile({
  user,
  profileReadme,
  mode,
}: AppUserProfileProps): JSX.Element | null {
  if (!user) {
    return null;
  }
  return (
    <>
      <AppProfileNavTab />
      <AppUserProfileInfos user={user} />
      <AppUserProfileOverview
        user={user}
        profileReadme={profileReadme}
        mode={mode}
      />
    </>
  );
}
