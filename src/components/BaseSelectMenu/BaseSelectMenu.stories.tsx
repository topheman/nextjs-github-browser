import React from "react";
import { Story, Meta } from "@storybook/react";

import BaseSelectMenu, { BaseSelectMenuProps } from "./BaseSelectMenu";

export default {
  title: "BaseSelectMenu",
  component: BaseSelectMenu,
} as Meta;

const Template: Story<BaseSelectMenuProps> = (args) => {
  return (
    <div className="flex justify-center">
      <BaseSelectMenu {...args} />
    </div>
  );
};

export const Base = Template.bind({});
Base.args = {
  buttonLabel: "Type",
  menuLabel: "Select Type",
  alignMenu: "right",
  children: (
    <div>
      <ul className="p-2">
        <li>Red</li>
        <li>Blue</li>
        <li>Orange</li>
      </ul>
    </div>
  ),
};

export const WithoutMenuLabel = Template.bind({});
WithoutMenuLabel.args = {
  buttonLabel: "Type",
  alignMenu: "right",
  children: (
    <div>
      <ul className="p-2">
        <li>Red</li>
        <li>Blue</li>
        <li>Orange</li>
      </ul>
    </div>
  ),
};
