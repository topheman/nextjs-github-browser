import React from "react";
import { Story, Meta } from "@storybook/react";

import App404, { App404Props } from "./App404";

export default {
  title: "App404",
  component: App404,
} as Meta;

const Template: Story<App404Props> = (args) => <App404 {...args} />;

export const Base = Template.bind({});
