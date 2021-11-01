import React from "react";
import { Story, Meta } from "@storybook/react";

import AppGitRefSwitch, { AppGitRefSwitchProps } from "./AppGitRefSwitch";

export default {
  title: "AppGitRefSwitch",
  component: AppGitRefSwitch,
} as Meta;

const Template: Story<AppGitRefSwitchProps> = (args) => {
  return (
    <div className="flex justify-center">
      <AppGitRefSwitch {...args} />
    </div>
  );
};

export const Base = Template.bind({});
Base.args = {
  nameWithOwner: "topheman/npm-registry-browser",
  currentRef: {
    name: "master",
    prefix: "refs/heads/",
  },
  defaultBranchName: "master",
  branches: ["master", "develop"],
  tags: ["v0.0.1", "v0.0.2", "v1.0.0"],
  branchesTotalCount: 2,
  tagsTotalCount: 3,
};

export const Advanced = Template.bind({});
Advanced.args = {
  nameWithOwner: "topheman/npm-registry-browser",
  currentRef: {
    name: "feature/specific",
    prefix: "refs/heads/",
  },
  defaultBranchName: "master",
  branches: [
    "develop",
    ...Array(8)
      .fill(1)
      .map((_, i) => `feature/next-${i + 1}`),
  ],
  tags: [
    "v0.0.1",
    "v1.0.0",
    ...Array(8)
      .fill(1)
      .map((_, i) => `v${i + 2}.0.0`),
  ],
  branchesTotalCount: 300,
  tagsTotalCount: 200,
};
