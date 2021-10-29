import React from "react";
import { Story, Meta } from "@storybook/react";

import { StarIcon } from "@primer/octicons-react";
import BaseButton, { BaseButtonProps } from "./BaseButton";

export default {
  title: "BaseButton",
  component: BaseButton,
} as Meta;

const Template: Story<BaseButtonProps> = (args) => <BaseButton {...args} />;

export const Base = Template.bind({});
Base.args = {
  children: "Star",
  hasMenu: false,
  size: "medium",
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  children: "Star",
  hasMenu: false,
  size: "medium",
  icon: <StarIcon />,
};

export const WithBadge = Template.bind({});
WithBadge.args = {
  children: "Stars",
  hasMenu: false,
  size: "small",
  badge: {
    label: 10500,
    href: "/topheman/docker-experiments/stargazers",
  },
};
