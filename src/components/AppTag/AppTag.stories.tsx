import React from "react";
import { Story, Meta } from "@storybook/react";

import AppTag, { AppTagProps } from "./AppTag";

export default {
  title: "AppTag",
  component: AppTag,
} as Meta;

const Template: Story<AppTagProps> = (args) => <AppTag {...args} />;

export const Base = Template.bind({});
Base.parameters = {};
Base.args = {
  nameWithOwner: "topheman/nextjs-github-browser",
  count: 12,
  type: "stargazers",
};
