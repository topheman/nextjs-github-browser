import React from "react";
import { Story, Meta } from "@storybook/react";

import AppSelectMenu, { AppSelectMenuProps } from "./AppSelectMenu";

export default {
  title: "AppSelectMenu",
  component: AppSelectMenu,
} as Meta;

const Template: Story<AppSelectMenuProps<string>> = (...args) => {
  const [type, setType] = React.useState("");
  const updateType = (newType: string) => {
    setType(newType);
  };
  return (
    <div className="flex justify-center">
      <AppSelectMenu
        {...args[0]}
        value={type}
        onChange={updateType}
        options={[
          { value: "", label: "All" },
          { value: "source", label: "Sources" },
          { value: "fork", label: "Forks" },
          { value: "archived", label: "Archived" },
          { value: "mirror", label: "Mirrors" },
        ]}
      />
    </div>
  );
};

export const Base = Template.bind({});
// Base.parameters = {};
Base.args = {
  alignMenu: "right",
  menuLabel: "Select type",
  buttonLabel: "Type",
};
Base.argTypes = {
  alignMenu: {
    options: ["right", "left"],
    control: { type: "radio" },
  },
};
