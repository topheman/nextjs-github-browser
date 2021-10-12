import Link from "next/link";

import { OrganizationInfosFragment } from "../../libs/graphql";
import AppAvatarImage from "../AppAvatarImage/AppAvatarImage";

export type AppUserProfileInfosProps = {
  organization?: OrganizationInfosFragment;
};

export default function AppOrganizationProfileInfos({
  organization,
}: AppUserProfileInfosProps): JSX.Element | null {
  if (!organization) {
    return null;
  }
  return (
    <div className="flex flex-col">
      <div>
        <Link href={`/orgs/${organization.login}/people`}>
          <a className="mb-1">
            <h4>People</h4>
          </a>
        </Link>
        <div>
          {organization.people.edges?.map((member) => {
            return (
              <Link
                key={member?.node?.avatarUrl}
                href={`/${member?.node?.login}`}
              >
                <a className="float-left m-[1px]">
                  <AppAvatarImage
                    avatarUrl={`${member?.node?.avatarUrl}&s=70`}
                    alt={member?.node?.login || "Avatar"}
                    rounded="full"
                    className="w-[35px]"
                  />
                </a>
              </Link>
            );
          })}
        </div>
        <div className="block clear-left text-sm text-brand-primary hover:underline">
          <Link href={`/orgs/${organization.login}/people`}>
            <a>View all</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
