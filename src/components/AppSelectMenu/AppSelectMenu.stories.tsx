import React from "react";
import { Story, Meta } from "@storybook/react";

import AppSelectMenu, { AppSelectMenuProps } from "./AppSelectMenu";

export default {
  title: "AppSelectMenu",
  component: AppSelectMenu,
} as Meta;

const Template: Story<AppSelectMenuProps<string>> = () => {
  const [type, setType] = React.useState("");
  const [sort, setSort] = React.useState("");
  const updateType = (newType: string) => {
    setType(newType);
  };
  const updateSort = (newSort: string) => {
    setSort(newSort);
  };
  return (
    <div className="flex flex-row">
      <input
        type="text"
        placeholder="Find a repository..."
        style={{
          width: 300,
          border: "1px solid black",
          paddingLeft: 10,
          marginRight: 10,
        }}
      />
      <AppSelectMenu
        value={type}
        onChange={updateType}
        options={[
          { value: "", label: "All" },
          { value: "source", label: "Sources" },
          { value: "fork", label: "Forks" },
          { value: "archived", label: "Archived" },
          { value: "mirror", label: "Mirrors" },
        ]}
        buttonLabel="Type"
        menuLabel="Select type"
      />
      <AppSelectMenu
        value={sort}
        onChange={updateSort}
        options={[
          { value: "", label: "Last updated" },
          { value: "name", label: "Name" },
          { value: "stargazers", label: "Stars" },
        ]}
        buttonLabel="Sort"
        menuLabel="Select order"
      />
    </div>
  );
};

export const Base = Template.bind({});
Base.parameters = {};
Base.args = {};
