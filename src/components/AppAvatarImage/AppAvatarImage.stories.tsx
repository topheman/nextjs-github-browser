import React from "react";
import { Story, Meta } from "@storybook/react";

import AppAvatarImage, { AppAvatarImageProps } from "./AppAvatarImage";

export default {
  title: "AppAvatarImage",
  component: AppAvatarImage,
} as Meta;

const Template: Story<AppAvatarImageProps> = (args) => (
  <AppAvatarImage {...args} />
);

export const Base = Template.bind({});
Base.parameters = {
  layout: "fullscreen",
};
Base.args = {
  avatarUrl: "https://avatars.githubusercontent.com/u/985982?v=4",
};
