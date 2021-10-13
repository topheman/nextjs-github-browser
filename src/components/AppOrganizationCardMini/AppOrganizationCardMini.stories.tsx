import React from "react";
import { Story, Meta } from "@storybook/react";

import { makeOrganization } from "../../msw/helpers";
import AppOrganizationCardMini, {
  AppOrganizationCardMiniProps,
} from "./AppOrganizationCardMini";

export default {
  title: "AppOrganizationCardMini",
  component: AppOrganizationCardMini,
} as Meta;

const Template: Story<AppOrganizationCardMiniProps> = (args) => (
  <AppOrganizationCardMini {...args} />
);

export const Base = Template.bind({});
Base.args = {
  organisation: makeOrganization(),
};
