import { User } from "../../libs/graphql";

export type AppUserProfileOverviewProps = {
  user?: User;
  profileReadme: string | null;
  mode: "default" | "repositories";
};

export default function AppUserProfileOverview({
  user,
  profileReadme,
  mode,
}: AppUserProfileOverviewProps): JSX.Element | null {
  if (!user) {
    return null;
  }
  return (
    <div>
      {mode === "default" ? (
        <>
          {profileReadme ? <div>{profileReadme}</div> : null}
          <p>Todo list pinned items</p>
        </>
      ) : (
        <>
          <p>List repositories</p>
        </>
      )}
    </div>
  );
}
