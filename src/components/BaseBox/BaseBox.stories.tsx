import React from "react";
import { Story, Meta } from "@storybook/react";

import BaseBox, { BaseBoxProps } from "./BaseBox";

export default {
  title: "BaseBox",
  component: BaseBox,
} as Meta;

const Template: Story<BaseBoxProps<"div">> = (args) => <BaseBox {...args} />;

export const Base = Template.bind({});
Base.parameters = {};
Base.args = {
  children: "Hello",
  className: "text-primary",
};
Base.argTypes = {
  as: {
    name: "as",
    control: { type: "text" },
  },
};

export const OverrideClassName = Template.bind({});
OverrideClassName.parameters = {};
OverrideClassName.args = {
  children: "Hello",
  className: "text-primary p-4",
};
Base.argTypes = {
  as: {
    name: "as",
    control: { type: "text" },
  },
};
