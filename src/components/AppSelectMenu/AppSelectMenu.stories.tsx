import React from "react";
import { Story, Meta } from "@storybook/react";

import AppSelectMenu, { AppSelectMenuProps } from "./AppSelectMenu";

export default {
  title: "AppSelectMenu",
  component: AppSelectMenu,
} as Meta;

const Template: Story<AppSelectMenuProps<string>> = () => {
  const [type, setType] = React.useState("");
  const updateType = (newType: string) => {
    setType(newType);
  };
  return (
    <div className="flex flex-row-reverse">
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
    </div>
  );
};

export const Base = Template.bind({});
Base.parameters = {};
Base.args = {};
