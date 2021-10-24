import React from "react";
import { Story, Meta } from "@storybook/react";

import { makeProfileReadMe } from "../../tests/helpers";
import AppProfileOverview, {
  AppProfileOverviewProps,
} from "./AppProfileOverview";

export default {
  title: "AppProfileOverview",
  component: AppProfileOverview,
} as Meta;

const Template: Story<AppProfileOverviewProps> = (args) => (
  <AppProfileOverview {...args} />
);

export const Base = Template.bind({});
Base.parameters = {
  layout: "fullscreen",
};
Base.args = {
  profileReadme: makeProfileReadMe(),
};
