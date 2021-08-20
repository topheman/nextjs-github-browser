import React from "react";
import { Story, Meta } from "@storybook/react";

import AppLoadingSpinner, { AppLoadingSpinnerProps } from "./AppLoadingSpinner";

export default {
  title: "AppLoadingSpinner",
  component: AppLoadingSpinner,
} as Meta;

const Template: Story<AppLoadingSpinnerProps> = (args) => (
  <AppLoadingSpinner {...args} />
);

export const Base = Template.bind({});
Base.parameters = {};
Base.args = {
  width: 100,
  color: "#900000",
};
