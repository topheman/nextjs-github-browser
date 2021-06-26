import { User, Maybe } from "../../libs/graphql";
import BaseBox from "../BaseBox/BaseBox";
import BaseMarkdownDisplay from "../BaseMarkdownDisplay/BaseMarkdownDisplay";

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
      <BaseBox className="p-4">
        <BaseMarkdownDisplay markdown={profileReadme} />
      </BaseBox>
    </div>
  );
}
