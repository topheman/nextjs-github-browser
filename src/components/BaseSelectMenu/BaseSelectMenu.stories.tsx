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

const SHORT_LIST = ["Red", "Blue", "Orange"];
const LONG_LIST = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
  "gray",
  "grey",
  "d-black",
  "d-red",
  "d-green",
  "d-yellow",
  "d-blue",
  "d-magenta",
  "d-cyan",
  "d-white",
  "d-gray",
  "d-grey",
];

export const Base = Template.bind({});
Base.args = {
  buttonLabel: "Type",
  menuLabel: "Select Type",
  alignMenu: "right",
  children: (
    <div>
      <ul className="p-2">
        {SHORT_LIST.map((color) => (
          <li key={color}>{color}</li>
        ))}
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
        {SHORT_LIST.map((color) => (
          <li key={color}>{color}</li>
        ))}
      </ul>
    </div>
  ),
};

export const MultipleData = Template.bind({});
MultipleData.args = {
  buttonLabel: "Type",
  menuLabel: "Select Type",
  alignMenu: "right",
  children: (
    <div>
      <ul className="p-2">
        {LONG_LIST.map((color) => (
          <li key={color}>{color}</li>
        ))}
      </ul>
    </div>
  ),
};

export const MultipleDataWithoutMenuLabel = Template.bind({});
MultipleDataWithoutMenuLabel.args = {
  buttonLabel: "Type",
  alignMenu: "right",
  children: (
    <div>
      <ul className="p-2">
        {LONG_LIST.map((color) => (
          <li key={color}>{color}</li>
        ))}
      </ul>
    </div>
  ),
};
