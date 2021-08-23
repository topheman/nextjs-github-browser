import React from "react";
import { Story, Meta } from "@storybook/react";

import AppTagLanguage, { AppTagLanguageProps } from "./AppTagLanguage";

export default {
  title: "AppTagLanguage",
  component: AppTagLanguage,
} as Meta;

const Template: Story<AppTagLanguageProps> = (args) => (
  <AppTagLanguage {...args} />
);

export const Base = Template.bind({});
Base.parameters = {};
Base.args = {
  primaryLanguage: {
    name: "JavaScript",
    color: "#f1e05a",
  },
};
