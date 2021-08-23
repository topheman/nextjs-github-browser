import React from "react";
import { Story, Meta } from "@storybook/react";

import AppTagLicense, { AppTagLicenseProps } from "./AppTagLicense";

export default {
  title: "AppTagLicense",
  component: AppTagLicense,
} as Meta;

const Template: Story<AppTagLicenseProps> = (args) => (
  <AppTagLicense {...args} />
);

export const Base = Template.bind({});
Base.parameters = {};
Base.args = {
  license: {
    name: "MIT License",
  },
};
