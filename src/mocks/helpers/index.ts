import { User } from "../../libs/graphql";

export const makeUser = (props: Partial<User> = {}): User => {
  return {
    name: "Christophe Rosset",
    login: "topheman",
    bio: "❤️JavaScript",
    websiteUrl: "http://labs.topheman.com/",
    twitterUsername: "topheman",
    avatarUrl: "https://avatars.githubusercontent.com/u/985982?v=4",
    location: "Paris",
    followers: {
      totalCount: 177,
    },
    following: {
      totalCount: 3,
    },
    starredRepositories: {
      totalCount: 363,
    },
    repositories: {
      totalCount: 78,
    },
    ...props,
  } as User;
};
