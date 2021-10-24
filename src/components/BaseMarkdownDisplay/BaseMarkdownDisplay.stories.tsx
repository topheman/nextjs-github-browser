import React from "react";
import { Story, Meta } from "@storybook/react";

import { makeProfileReadMe } from "../../tests/helpers";
import BaseMarkdownDisplay, {
  BaseMarkdownDisplayProps,
} from "./BaseMarkdownDisplay";

export default {
  title: "BaseMarkdownDisplay",
  component: BaseMarkdownDisplay,
} as Meta;

const Template: Story<BaseMarkdownDisplayProps> = (args) => (
  <BaseMarkdownDisplay {...args} />
);

export const Base = Template.bind({});
Base.parameters = {
  // layout: "fullscreen",
};
Base.args = {
  markdown: makeProfileReadMe(),
  profileReadmeInfos: {
    defaultBranchName: "master",
    login: "topheman",
    mode: "user",
  },
};
