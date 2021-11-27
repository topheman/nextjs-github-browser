import React, { useRef, useEffect } from "react";
import { Story, Meta } from "@storybook/react";

import BaseSearchInput, { BaseSearchInputProps } from "./BaseSearchInput";

export default {
  title: "BaseSearchInput",
  component: BaseSearchInput,
} as Meta;

const Template: Story<BaseSearchInputProps> = (args) => {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);
  return <BaseSearchInput {...args} ref={ref} />;
};

export const Base = Template.bind({});
Base.args = {
  onSearch(value) {
    console.log(value);
  },
  placeholder: "Type a username ...",
};
