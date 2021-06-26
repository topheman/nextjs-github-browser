import React from "react";
import { Story, Meta } from "@storybook/react";

import { makeProfileReadMe } from "../../mocks/helpers";
import AppUserProfileCustomDescription, {
  AppUserProfileCustomDescriptionProps,
} from "./AppUserProfileCustomDescription";

export default {
  title: "AppUserProfileCustomDescription",
  component: AppUserProfileCustomDescription,
} as Meta;

const Template: Story<AppUserProfileCustomDescriptionProps> = (args) => (
  <AppUserProfileCustomDescription {...args} />
);

export const Base = Template.bind({});
Base.parameters = {
  // layout: "fullscreen",
};
Base.args = {
  profileReadme: makeProfileReadMe(),
};
