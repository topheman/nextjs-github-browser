import React from "react";
import { Story, Meta } from "@storybook/react";

import AppTopicsTagList, { AppTopicsTagListProps } from "./AppTopicsTagList";

export default {
  title: "AppTopicsTagList",
  component: AppTopicsTagList,
} as Meta;

const Template: Story<AppTopicsTagListProps> = (args) => (
  <AppTopicsTagList {...args} />
);

export const Base = Template.bind({});
Base.parameters = {};
Base.args = {
  topics: [
    { topic: { name: "react" } },
    { topic: { name: "JavaScript" } },
    { topic: { name: "TypeScript" } },
    { topic: { name: "jest" } },
    { topic: { name: "react-router" } },
    { topic: { name: "cypress" } },
    { topic: { name: "e2e-tests" } },
  ],
};
