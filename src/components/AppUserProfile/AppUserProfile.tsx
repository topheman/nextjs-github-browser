import { User } from "../../libs/graphql";

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
