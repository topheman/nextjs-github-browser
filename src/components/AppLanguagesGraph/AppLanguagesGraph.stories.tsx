import React from "react";
import { Story, Meta } from "@storybook/react";

import AppLanguagesGraph, { AppLanguagesGraphProps } from "./AppLanguagesGraph";

export default {
  title: "AppLanguagesGraph",
  component: AppLanguagesGraph,
} as Meta;

const Template: Story<AppLanguagesGraphProps> = (args) => (
  <AppLanguagesGraph {...args} />
);

export const Base = Template.bind({});
Base.args = {
  // from topheman/docker-experiments
  languages: [
    {
      size: 7929,
      node: {
        name: "JavaScript",
        color: "#f1e05a",
      },
    },
    {
      size: 4963,
      node: {
        name: "Makefile",
        color: "#427819",
      },
    },
    {
      size: 4098,
      node: {
        name: "Go",
        color: "#00ADD8",
      },
    },
    {
      size: 1942,
      node: {
        name: "Dockerfile",
        color: "#384d54",
      },
    },
    {
      size: 1686,
      node: {
        name: "Shell",
        color: "#89e051",
      },
    },
    {
      size: 1590,
      node: {
        name: "HTML",
        color: "#e34c26",
      },
    },
    {
      size: 850,
      node: {
        name: "CSS",
        color: "#563d7c",
      },
    },
  ],
};
