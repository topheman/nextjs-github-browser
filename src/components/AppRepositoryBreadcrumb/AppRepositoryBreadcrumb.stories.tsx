import React from "react";
import { Story, Meta } from "@storybook/react";

import AppRepositoryBreadcrumb, {
  AppRepositoryBreadcrumbProps,
} from "./AppRepositoryBreadcrumb";

export default {
  title: "AppRepositoryBreadcrumb",
  component: AppRepositoryBreadcrumb,
} as Meta;

const Template: Story<AppRepositoryBreadcrumbProps> = (args) => (
  <AppRepositoryBreadcrumb {...args} />
);

export const Base = Template.bind({});
Base.args = {
  nameWithOwner: "topheman/nextjs-movie-browser",
  currentPath: "src/components/SomeComponent/SomeComponent.tsx",
  resolvedCurrentRefName: "master",
};
