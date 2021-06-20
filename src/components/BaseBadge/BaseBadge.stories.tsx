import React from "react";
import { Story, Meta } from "@storybook/react";

import BaseBadge, { BaseBadgeProps } from "./BaseBadge";

export default {
  title: "BaseBadge",
  component: BaseBadge,
} as Meta;

const Template: Story<BaseBadgeProps> = (args) => <BaseBadge {...args} />;

export const None = Template.bind({});
None.parameters = {};
None.args = {};

export const Some = Template.bind({});
Some.parameters = {};
Some.args = {
  badgeContent: 12,
};
