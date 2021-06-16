import {
  PeopleIcon,
  StarIcon,
  LocationIcon,
  LinkIcon,
} from "@primer/octicons-react";

import { User } from "../../libs/graphql";
import AppAvatarImage from "../AppAvatarImage/AppAvatarImage";
import TwitterIcon from "../icons/TwitterIcon";

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
    <div
      itemScope
      itemType="http://schema.org/Person"
      className="text-primary bg-primary"
    >
      <div className="flex md:block items-center mb-4">
        <div className="mr-2 md:-mr-0 w-20 md:w-auto">
          <a itemProp="image" href={user.avatarUrl}>
            <AppAvatarImage
              avatarUrl={user.avatarUrl}
              alt={user.name || "Avatar"}
              rounded="full"
            />
          </a>
        </div>
        <div className="md:block w-full">
          <h1>
            <span itemProp="name" className="block text-2xl font-medium">
              {user.name}
            </span>
            <span
              itemProp="additionalName"
              className="block font-light text-secondary"
            >
              {user.login}
            </span>
          </h1>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="mb-4">{user.bio}</p>
        <ul className="order-1 md:order-none">
          {user.followers.totalCount ? (
            <li className="inline mr-2">
              <PeopleIcon /> {user.followers.totalCount}{" "}
              <span className="text-secondary">
                follower
                {user.followers.totalCount > 1 ? "s" : ""}
              </span>
            </li>
          ) : null}
          {user.following.totalCount ? (
            <li className="inline mr-2">
              {user.following.totalCount}{" "}
              <span className="text-secondary">following</span>
            </li>
          ) : null}
          {user.starredRepositories.totalCount > 0 ? (
            <li className="inline mr-2">
              <StarIcon /> {user.starredRepositories.totalCount}
            </li>
          ) : null}
        </ul>
        <ul>
          {user.location ? (
            <li className="hidden md:inline-block">
              <LocationIcon /> {user.location}
            </li>
          ) : null}
          {user.websiteUrl ? (
            <li>
              <a rel="nofollow me" href={user.websiteUrl}>
                <LinkIcon /> {user.websiteUrl}
              </a>
            </li>
          ) : null}
          {user.twitterUsername ? (
            <li className="hidden md:inline-block">
              <a
                rel="nofollow me"
                href={`https://twitter.com/${user.twitterUsername}`}
              >
                <TwitterIcon /> @{user.twitterUsername}
              </a>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
