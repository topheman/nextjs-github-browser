import React from "react";
import { Story, Meta } from "@storybook/react";

import AppRepositoryHeader, {
  AppRepositoryHeaderProps,
} from "./AppRepositoryHeader";

export default {
  title: "AppRepositoryHeader",
  component: AppRepositoryHeader,
} as Meta;

const Template: Story<AppRepositoryHeaderProps> = (args) => (
  <AppRepositoryHeader {...args} />
);

export const Base = Template.bind({});
Base.args = {
  owner: "microsoft",
  repositoryName: "vscode",
  stargazerCount: 123456,
  forkCount: 20654,
};
