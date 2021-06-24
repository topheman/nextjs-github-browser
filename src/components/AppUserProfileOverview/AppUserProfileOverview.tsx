import { User, Maybe } from "../../libs/graphql";
import AppUserProfileCustomDescription from "../AppUserProfileCustomDescription/AppUserProfileCustomDescription";

export type AppUserProfileOverviewProps = {
  user?: User;
  profileReadme: Maybe<string> | undefined;
};

export default function AppUserProfileOverview({
  user,
  profileReadme,
}: AppUserProfileOverviewProps): JSX.Element | null {
  if (!user) {
    return null;
  }
  return (
    <div>
      <p>Profile overview / list repo pinned items</p>
      <AppUserProfileCustomDescription profileReadme={profileReadme} />
    </div>
  );
}
