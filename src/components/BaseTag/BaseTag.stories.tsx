import React from "react";
import { Story, Meta } from "@storybook/react";

import BaseTag, { BaseTagProps } from "./BaseTag";

export default {
  title: "BaseTag",
  component: BaseTag,
} as Meta;

const Template: Story<BaseTagProps> = (args) => <BaseTag {...args} />;

export const Base = Template.bind({});
Base.args = {
  children: "some-tag-with-no-link",
  color: "brand-primary",
};

export const WithHref = Template.bind({});
WithHref.args = {
  children: "some-tag-with-link",
  color: "brand-primary",
  href: "/some-link",
  title: "Some description of the link",
};
