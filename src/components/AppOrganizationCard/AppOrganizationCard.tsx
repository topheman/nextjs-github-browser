/* eslint-disable @next/next/no-img-element */
import { LocationIcon, LinkIcon, MailIcon } from "@primer/octicons-react";
import TwitterIcon from "../icons/TwitterIcon";
import { Organization } from "../../libs/graphql";

export type AppOrganizationCardProps = {
  organisation: Pick<
    Organization,
    | "name"
    | "login"
    | "websiteUrl"
    | "twitterUsername"
    | "avatarUrl"
    | "location"
    | "email"
    | "description"
    | "isVerified"
  >;
};

export default function AppOrganizationCard({
  organisation,
}: AppOrganizationCardProps): JSX.Element | null {
  return (
    <div className="flex">
      <div>
        <img
          src={`${organisation.avatarUrl}&s=200`}
          alt={
            (organisation.twitterUsername &&
              `@${organisation.twitterUsername}`) ||
            organisation.name ||
            "Organization logo"
          }
          width="100"
          height="100"
          className="mr-6 rounded border border-light"
        />
      </div>
      <div className="flex-1">
        <h1 className="text-2xl font-bold leading-10">{organisation.name}</h1>
        {organisation.description ? (
          <p className="text-sm text-secondary">{organisation.description}</p>
        ) : null}
        <ul className="text-sm">
          {organisation.location ? (
            <li className="inline-block my-2 mr-2 whitespace-nowrap">
              <LocationIcon className="mr-1" />
              <span itemProp="location" title={organisation.location}>
                {organisation.location}
              </span>
            </li>
          ) : null}
          {organisation.websiteUrl ? (
            <li className="inline-block my-2 mr-2 whitespace-nowrap">
              <LinkIcon className="mr-1" />
              <a
                className="hover:underline"
                rel="nofollow"
                href={organisation.websiteUrl}
                title={organisation.websiteUrl}
                itemProp="url"
              >
                {organisation.websiteUrl}
              </a>
            </li>
          ) : null}
          {organisation.twitterUsername ? (
            <li className="inline-block my-2 mr-2 whitespace-nowrap">
              <TwitterIcon className="mr-1" />
              <a
                className="hover:underline"
                rel="nofollow"
                href={`https://twitter.com/${organisation.twitterUsername}`}
                title={organisation.twitterUsername}
                itemProp="url"
              >
                @{organisation.twitterUsername}
              </a>
            </li>
          ) : null}
          {organisation.email ? (
            <li className="inline-block my-2 mr-2 whitespace-nowrap">
              <MailIcon className="mr-1" />
              <a
                className="hover:underline"
                href={`mailto:${organisation.email}`}
                itemProp="email"
              >
                {organisation.email}
              </a>
            </li>
          ) : null}
          {organisation.isVerified ? (
            <li className="inline-block my-2 mr-2 whitespace-nowrap">
              <span
                className="px-2 rounded-full border"
                style={{ color: "green" }}
              >
                Verified
              </span>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
