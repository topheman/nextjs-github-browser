import React, { useEffect, useState } from "react";
import { Story, Meta } from "@storybook/react";

import AppTagDate, { AppTagDateProps } from "./AppTagDate";

export default {
  title: "AppTagDate",
  component: AppTagDate,
} as Meta;

const Template: Story<AppTagDateProps & { dateLabel: string }> = ({
  dateLabel,
  ...ownProps
}) => {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const dateFactory = OPTIONS.find(({ label }) => label === dateLabel) || {
      value: () => new Date(),
    };
    setDate(dateFactory.value());
  }, [dateLabel]);
  return <AppTagDate {...ownProps} date={date} />;
};

const OPTIONS: { label: string; value: () => Date }[] = [
  { label: "now", value: () => new Date() },
  {
    label: "30s ago",
    value: () => {
      const now = new Date();
      return new Date(now.getTime() - 30000);
    },
  },
  {
    label: "1min ago",
    value: () => {
      const now = new Date();
      return new Date(now.getTime() - 60000);
    },
  },
  {
    label: "5min ago",
    value: () => {
      const now = new Date();
      return new Date(now.getTime() - 60000 * 5);
    },
  },
  {
    label: "1day ago",
    value: () => {
      const now = new Date();
      return new Date(now.getTime() - 60000 * 60 * 24);
    },
  },
  {
    label: "1week ago",
    value: () => {
      const now = new Date();
      return new Date(now.getTime() - 60000 * 60 * 24 * 7);
    },
  },
  {
    label: "1month ago",
    value: () => {
      const now = new Date();
      return new Date(now.getTime() - 60000 * 60 * 24 * 31);
    },
  },
  {
    label: "1year ago",
    value: () => {
      const now = new Date();
      return new Date(now.getTime() - 60000 * 60 * 24 * 365);
    },
  },
];

export const Base = Template.bind({});
Base.parameters = {
  controls: { exclude: ["date"] },
};
Base.args = {
  reactive: true,
  mode: "updated",
};
Base.argTypes = {
  mode: {
    options: ["updated"],
  },
  dateLabel: {
    name: "date ", // with a trailing space because `date` is excluded
    options: OPTIONS.map(({ label }) => label),
    control: { type: "select" },
  },
  reactive: {
    options: [true, false],
    control: { type: "boolean" },
  },
};
