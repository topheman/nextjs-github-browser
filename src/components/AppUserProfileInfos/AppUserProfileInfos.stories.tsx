import React from "react";
import { Story, Meta } from "@storybook/react";

import { User } from "../../libs/graphql";
import AppUserProfileInfos, {
  AppUserProfileInfosProps,
} from "./AppUserProfileInfos";

export default {
  title: "AppUserProfileInfos",
  component: AppUserProfileInfos,
} as Meta;

const Template: Story<AppUserProfileInfosProps> = (args) => (
  <AppUserProfileInfos {...args} />
);

export const Base = Template.bind({});
Base.parameters = {
  layout: "fullscreen",
};
Base.args = {
  user: ({
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
  } as Partial<User>) as never,
};
