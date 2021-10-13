/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { Organization } from "../../libs/graphql";

export type AppOrganizationCardMiniProps = {
  organisation: Pick<Organization, "name" | "login" | "avatarUrl">;
};

export default function AppOrganizationCardMini({
  organisation,
}: AppOrganizationCardMiniProps): JSX.Element | null {
  return (
    <div className="flex">
      <h1 className="text-xl font-bold">
        <Link href={`/${organisation.login}`}>
          <a>
            <img
              src={`${organisation.avatarUrl}&s=60`}
              alt={`@${organisation.login}`}
              width="30"
              height="30"
              className="float-left mr-2 rounded border border-light"
              itemProp="image"
            />
            {organisation.name}
          </a>
        </Link>
      </h1>
    </div>
  );
}
