import React from "react";
import { Story, Meta } from "@storybook/react";

import TheHome, { TheHomeProps } from "./TheHome";

export default {
  title: "TheHome",
  component: TheHome,
} as Meta;

const Template: Story<TheHomeProps> = (args) => <TheHome {...args} />;

export const Base = Template.bind({});
