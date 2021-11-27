import React from "react";
import { Story, Meta } from "@storybook/react";

import AppListRoutePatterns, {
  AppListRoutePatternsProps,
} from "./AppListRoutePatterns";

export default {
  title: "AppListRoutePatterns",
  component: AppListRoutePatterns,
} as Meta;

const Template: Story<AppListRoutePatternsProps> = (args) => (
  <AppListRoutePatterns {...args} />
);

export const Base = Template.bind({});
