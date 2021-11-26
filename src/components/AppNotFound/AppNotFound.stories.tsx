import React from "react";
import { Story, Meta } from "@storybook/react";

import AppNotFound, { AppNotFoundProps } from "./AppNotFound";

export default {
  title: "AppNotFound",
  component: AppNotFound,
} as Meta;

const Template: Story<AppNotFoundProps> = (args) => {
  return <AppNotFound {...args} />;
};

export const Base = Template.bind({});
Base.args = {
  type: "user",
};
