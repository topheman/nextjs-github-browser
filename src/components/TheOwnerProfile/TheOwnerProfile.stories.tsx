import React from "react";
import { Story, Meta } from "@storybook/react";

import TheOwnerProfile, { TheOwnerProfileProps } from "./TheOwnerProfile";

export default {
  title: "TheOwnerProfile",
  component: TheOwnerProfile,
} as Meta;

const Template: Story<TheOwnerProfileProps> = (args) => (
  <TheOwnerProfile {...args} />
);

export const Base = Template.bind({});
