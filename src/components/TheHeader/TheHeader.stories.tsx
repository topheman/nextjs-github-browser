import React from "react";
import { Story, Meta } from "@storybook/react";

import TheHeader from "./TheHeader";

export default {
  title: "TheHeader",
  component: TheHeader,
} as Meta;

const Template: Story<React.HTMLProps<HTMLElement>> = (args) => (
  <TheHeader {...args} />
);

export const Base = Template.bind({});
