import React from "react";
import { Story, Meta } from "@storybook/react";

import { makeOrganization } from "../../tests/helpers";
import AppOrganizationCard, {
  AppOrganizationCardProps,
} from "./AppOrganizationCard";

export default {
  title: "AppOrganizationCard",
  component: AppOrganizationCard,
} as Meta;

const Template: Story<AppOrganizationCardProps> = (args) => (
  <AppOrganizationCard {...args} />
);

export const Base = Template.bind({});
Base.args = {
  organisation: makeOrganization(),
};
