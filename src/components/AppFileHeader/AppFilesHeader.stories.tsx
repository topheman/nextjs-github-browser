import React from "react";
import { Story, Meta } from "@storybook/react";

import AppFilesHeader, { AppFilesHeaderProps } from "./AppFilesHeader";

export default {
  title: "AppFilesHeader",
  component: AppFilesHeader,
} as Meta;

const Template: Story<AppFilesHeaderProps> = (args) => {
  return (
    <div className="flex justify-center">
      <AppFilesHeader {...args} />
    </div>
  );
};

export const Base = Template.bind({});
Base.args = {
  repositoryNameWithOwner: "topheman/nextjs-movie-browser",
  author: {
    login: "topheman",
    avatarUrl:
      "https://avatars.githubusercontent.com/u/985982?u=9319a164fa8c3c905b48e00bb554c4243d9c734b&v=4&s=48",
  },
  lastCommit: {
    committedDate: new Date(),
    messageHeadline: "Just commited",
    oid: "azertyuiovbnlkjhgv",
  },
  commitsTotalCount: 123,
  resolvedCurrentRef: {
    name: "v1.2.3",
    prefix: "refs/tags/",
  },
  className: "p-3",
};

export const WithoutCommitInfos = Template.bind({});
WithoutCommitInfos.args = {
  repositoryNameWithOwner: "topheman/nextjs-movie-browser",
  commitsTotalCount: 123,
  resolvedCurrentRef: {
    name: "v1.2.3",
    prefix: "refs/tags/",
  },
  className: "p-3",
};
