import { User, Maybe, PinnedItemInfosFragment } from "../../libs/graphql";
import BaseBox from "../BaseBox/BaseBox";
import BaseMarkdownDisplay from "../BaseMarkdownDisplay/BaseMarkdownDisplay";
import AppPinnedItem from "../AppPinnedItem/AppPinnedItem";

export type AppUserProfileOverviewProps = {
  user?: User;
  profileReadme: Maybe<string> | undefined;
  pinnedRepositories?: PinnedItemInfosFragment[];
  popularRepositories?: PinnedItemInfosFragment[];
};

export default function AppUserProfileOverview({
  user,
  profileReadme,
  pinnedRepositories,
  popularRepositories,
}: AppUserProfileOverviewProps): JSX.Element | null {
  if (!user) {
    return null;
  }
  return (
    <div>
      {profileReadme ? (
        <BaseBox className="p-4 mb-4 text-primary">
          <BaseMarkdownDisplay markdown={profileReadme} />
        </BaseBox>
      ) : null}
      <div className="mb-4">
        <h2 className="text-primary">
          {pinnedRepositories && pinnedRepositories.length > 0
            ? "Pinned"
            : "Popular repositories"}
        </h2>
        <ol className="flex flex-wrap -mr-2 -ml-2">
          {(
            (pinnedRepositories && pinnedRepositories.length > 0
              ? pinnedRepositories
              : popularRepositories) || []
          ).map((item) => (
            <li className="flex p-2 w-full md:w-1/2" key={item.name}>
              <BaseBox className="px-4 pt-4 pb-2 w-full">
                <AppPinnedItem repository={item} key={item.name} />
              </BaseBox>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
