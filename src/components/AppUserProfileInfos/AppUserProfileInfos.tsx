import React from "react";
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
    <div itemScope itemType="http://schema.org/Person">
      <div className="flex md:block items-center mb-4">
        <div className="mr-2 md:-mr-0 w-20 md:w-auto max-w-[260px]">
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
            <span itemProp="name" className="block text-2xl">
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
        <ul className="order-1 md:order-none mb-4">
          {user.followers.totalCount ? (
            <li className="inline">
              <span className="whitespace-nowrap">
                <PeopleIcon className="mr-1" />
                {user.followers.totalCount}{" "}
                <span className="text-secondary">
                  follower
                  {user.followers.totalCount > 1 ? "s" : ""}
                </span>
              </span>
              {" · "}
            </li>
          ) : null}
          {user.following.totalCount ? (
            <li className="inline">
              <span className="whitespace-nowrap">
                {user.following.totalCount}{" "}
                <span className="text-secondary">following</span>
              </span>
              {" · "}
            </li>
          ) : null}
          {user.starredRepositories.totalCount > 0 ? (
            <li className="inline">
              <span className="whitespace-nowrap">
                <StarIcon className="mr-1" />
                {user.starredRepositories.totalCount}
              </span>
            </li>
          ) : null}
        </ul>
        <ul>
          {user.location ? (
            <li className="inline-block overflow-hidden w-full overflow-ellipsis whitespace-nowrap">
              <LocationIcon className="mr-1" />
              {user.location}
            </li>
          ) : null}
          {user.websiteUrl ? (
            <li className="hidden md:inline-block overflow-hidden w-full overflow-ellipsis whitespace-nowrap">
              <LinkIcon className="mr-1" />
              <a rel="nofollow me" href={user.websiteUrl}>
                {user.websiteUrl}
              </a>
            </li>
          ) : null}
          {user.twitterUsername ? (
            <li className="hidden md:inline-block overflow-hidden w-full overflow-ellipsis whitespace-nowrap">
              <a
                rel="nofollow me"
                href={`https://twitter.com/${user.twitterUsername}`}
              >
                <TwitterIcon className="mr-1" />@{user.twitterUsername}
              </a>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
