import React from "react";
import { Story, Meta } from "@storybook/react";

import AppTagDate, { AppTagDateProps } from "./AppTagDate";

export default {
  title: "AppTagDate",
  component: AppTagDate,
} as Meta;

const Template: Story<AppTagDateProps> = (args) => <AppTagDate {...args} />;

export const Base = Template.bind({});
Base.parameters = {};
Base.args = {
  date: new Date(),
};
