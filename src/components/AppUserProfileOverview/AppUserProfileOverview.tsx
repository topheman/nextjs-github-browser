import { User, Maybe } from "../../libs/graphql";
import BaseBox from "../BaseBox/BaseBox";
import BaseMarkdownDisplay from "../BaseMarkdownDisplay/BaseMarkdownDisplay";
import AppPinnedItem from "../AppPinnedItem/AppPinnedItem";

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
      <BaseBox className="p-4 mb-4">
        <BaseMarkdownDisplay markdown={profileReadme} />
      </BaseBox>
      {user.pinnedItems &&
      user.pinnedItems.nodes &&
      user.pinnedItems.nodes.length > 0 ? (
        <div className="mb-4">
          <h2>Pinned</h2>
          <ol className="flex flex-wrap -mr-2 -ml-2">
            {user.pinnedItems.nodes.filter(Boolean).map((item) => (
              <li className="flex p-2 w-full md:w-1/2" key={item.name}>
                <BaseBox className="px-4 pt-4 pb-2 w-full">
                  <AppPinnedItem
                    item={item}
                    key={item.name}
                    ownerLogin={user.login}
                  />
                </BaseBox>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  );
}
