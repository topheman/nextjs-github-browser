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
    <div className="p-4 rounded-md border border-light">
      <AppUserProfileCustomDescription profileReadme={profileReadme} />
    </div>
  );
}
