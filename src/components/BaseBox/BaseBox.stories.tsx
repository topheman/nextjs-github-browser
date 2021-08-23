import React from "react";
import { Story, Meta } from "@storybook/react";

import BaseBox, { BaseBoxProps } from "./BaseBox";

export default {
  title: "BaseBox",
  component: BaseBox,
} as Meta;

const Template: Story<BaseBoxProps> = (args) => <BaseBox {...args} />;

export const Base = Template.bind({});
Base.parameters = {};
Base.args = {
  children: "Hello",
  className: "text-primary",
};

export const OverrideClassName = Template.bind({});
OverrideClassName.parameters = {};
OverrideClassName.args = {
  children: "Hello",
  className: "text-primary p-4",
};
