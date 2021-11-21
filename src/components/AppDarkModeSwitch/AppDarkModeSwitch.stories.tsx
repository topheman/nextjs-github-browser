import React from "react";
import { Story, Meta } from "@storybook/react";

import AppDarkModeSwitch, { AppDarkModeSwitchProps } from "./AppDarkModeSwitch";

export default {
  title: "AppDarkModeSwitch",
  component: AppDarkModeSwitch,
} as Meta;

const Template: Story<AppDarkModeSwitchProps> = (args) => {
  return (
    <div className="flex justify-center">
      <AppDarkModeSwitch {...args} />
    </div>
  );
};

export const Base = Template.bind({});
