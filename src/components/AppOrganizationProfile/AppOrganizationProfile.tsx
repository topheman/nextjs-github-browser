import { Organization } from "../../libs/graphql";

export type AppOrganizationProfileProps = {
  organization?: Organization;
};

AppOrganizationProfile.defaultProps = {
  organization: null,
};

export default function AppOrganizationProfile({
  organization,
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
    </>
  );
}
