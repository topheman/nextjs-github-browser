import React from "react";
import { Story, Meta } from "@storybook/react";

import AppSearchSummary, { AppSearchSummaryProps } from "./AppSearchSummary";
import { getSearchFieldOptions } from "../../utils/github/searchRepos";

export default {
  title: "AppSearchSummary",
  component: AppSearchSummary,
} as Meta;

const Template: Story<AppSearchSummaryProps> = (args) => (
  <AppSearchSummary {...args} />
);

export const Base = Template.bind({});
Base.args = {
  count: 78,
  pageInfo: {
    startCursor: "Y3Vyc29yOjE=",
    endCursor: "Y3Vyc29yOjMw",
  },
  sort: "",
  type: "",
};
Base.argTypes = {
  type: {
    name: "type",
    options: getSearchFieldOptions("type").map(({ value }) => value),
    control: { type: "select" },
  },
  sort: {
    name: "sort",
    options: getSearchFieldOptions("sort").map(({ value }) => value),
    control: { type: "select" },
  },
};
