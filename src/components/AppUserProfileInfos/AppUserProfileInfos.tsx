import { User } from "../../libs/graphql";

export type AppUserProfileInfosProps = {
  user?: User;
};

export default function AppUserProfileInfos({
  user,
}: AppUserProfileInfosProps): JSX.Element | null {
  if (!user) {
    return null;
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <ul>
        <li>{user.login}</li>
        <li>{user.name}</li>
        <li>{user.avatarUrl}</li>
      </ul>
    </div>
  );
}
