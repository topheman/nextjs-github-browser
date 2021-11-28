import React from "react";
import { Story, Meta } from "@storybook/react";

import BaseBoxWithHeader, { BaseBoxWithHeaderProps } from "./BaseBoxWithHeader";

export default {
  title: "BaseBoxWithHeader",
  component: BaseBoxWithHeader,
} as Meta;

const Template: Story<BaseBoxWithHeaderProps> = (args) => (
  <BaseBoxWithHeader {...args} />
);

export const Base = Template.bind({});
Base.parameters = {};
Base.args = {
  children: <div className="p-3">I'm a content</div>,
  header: <span>I'm a header</span>,
};
