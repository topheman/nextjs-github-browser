import { User } from "../../libs/graphql";
import AppAvatarImage from "../AppAvatarImage/AppAvatarImage";

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
      <div>
        <a itemProp="image" href={user.avatarUrl}>
          <AppAvatarImage
            avatarUrl={user.avatarUrl}
            alt={user.name || "Avatar"}
            rounded="full"
          />
        </a>
      </div>
      <div>
        <h1>
          <span itemProp="name" className="text-2xl font-semibold">
            {user.name}
          </span>
          <span itemProp="additionalName">{user.login}</span>
        </h1>
      </div>
      <div>
        <p>{user.bio}</p>
        <ul>
          {user.followers.totalCount ? (
            <li>
              {user.followers.totalCount} follower
              {user.followers.totalCount > 1 ? "s" : ""}
            </li>
          ) : null}
          {user.following.totalCount ? (
            <li>{user.following.totalCount} following</li>
          ) : null}
          {user.starredRepositories.totalCount > 0 ? (
            <li>
              <span role="img" aria-label="star">
                ⭐️
              </span>{" "}
              {user.starredRepositories.totalCount}
            </li>
          ) : null}
        </ul>
      </div>
      <ul>
        {user.location ? <li>{user.location}</li> : null}
        {user.websiteUrl ? (
          <li>
            <a rel="nofollow me" href={user.websiteUrl}>
              {user.websiteUrl}
            </a>
          </li>
        ) : null}
        {user.twitterUsername ? (
          <li>
            <a
              rel="nofollow me"
              href={`https://twitter.com/${user.twitterUsername}`}
            >
              @{user.twitterUsername}
            </a>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
