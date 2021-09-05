import React from "react";
import { Story, Meta } from "@storybook/react";

import { makeUser, makeProfileReadMe } from "../../msw/helpers";
import AppUserProfileOverview, {
  AppUserProfileOverviewProps,
} from "./AppUserProfileOverview";

export default {
  title: "AppUserProfileOverview",
  component: AppUserProfileOverview,
} as Meta;

const Template: Story<AppUserProfileOverviewProps> = (args) => (
  <AppUserProfileOverview {...args} />
);

export const Base = Template.bind({});
Base.parameters = {
  layout: "fullscreen",
};
Base.args = {
  user: makeUser(),
  profileReadme: makeProfileReadMe(),
};
