import { Organization, Maybe } from "../../libs/graphql";

import BaseBox from "../BaseBox/BaseBox";
import BaseMarkdownDisplay from "../BaseMarkdownDisplay/BaseMarkdownDisplay";

export type AppOrganizationProfileProps = {
  organization?: Organization;
  profileReadme: Maybe<string> | undefined;
};

AppOrganizationProfile.defaultProps = {
  organization: null,
};

export default function AppOrganizationProfile({
  organization,
  profileReadme,
}: AppOrganizationProfileProps): JSX.Element | null {
  if (!organization) {
    return null;
  }
  return (
    <>
      <p>AppOrganizationProfile</p>
      <ul>
        {/* eslint-disable-next-line no-underscore-dangle */}
        <li>{organization.__typename}</li>
        <li>{organization.login}</li>
        <li>{organization.name}</li>
        <li>{organization.avatarUrl}</li>
      </ul>
      {profileReadme ? (
        <BaseBox className="p-4 mb-4">
          <BaseMarkdownDisplay markdown={profileReadme} />
        </BaseBox>
      ) : null}
    </>
  );
}
