import React from "react";
import { Story, Meta } from "@storybook/react";

import AppSearchBarRepositories, {
  AppSearchBarRepositoriesProps,
} from "./AppSearchBarRepositories";

export default {
  title: "AppSearchBarRepositories",
  component: AppSearchBarRepositories,
} as Meta;

function onUpdate({ type, sort }: { type: string; sort: string }) {
  // eslint-disable-next-line no-console
  console.log({ type, sort });
}

const Template: Story<AppSearchBarRepositoriesProps> = () => {
  return (
    <div style={{ width: 700 }}>
      <AppSearchBarRepositories onUpdate={onUpdate} />
    </div>
  );
};

export const Base = Template.bind({});
Base.parameters = {};
Base.args = {};
