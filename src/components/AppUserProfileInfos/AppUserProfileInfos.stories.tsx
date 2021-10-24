import React from "react";
import { Story, Meta } from "@storybook/react";

import { makeUser } from "../../tests/helpers";
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
  user: makeUser(),
};
