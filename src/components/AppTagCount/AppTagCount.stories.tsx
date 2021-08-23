import React from "react";
import { Story, Meta } from "@storybook/react";

import AppTagCount, { AppTagCountProps } from "./AppTagCount";

export default {
  title: "AppTagCount",
  component: AppTagCount,
} as Meta;

const Template: Story<AppTagCountProps> = (args) => <AppTagCount {...args} />;

export const Base = Template.bind({});
Base.parameters = {};
Base.args = {
  nameWithOwner: "topheman/nextjs-github-browser",
  count: 12,
  type: "stargazers",
};
