import { useEffect, useState } from "react";
import clsx from "clsx";
import { formatDate } from "../../utils/date";

AppTagDate.defaultProps = {
  mode: "updated",
  reactive: true,
};

const MAPPING_MODE = Object.freeze({
  updated: "Updated ",
  default: "",
});

export type AppTagDateProps = {
  mode: "updated" | "default";
  date: Date;
  className?: string;
} & typeof AppTagDate.defaultProps;

export default function AppTagDate({
  date,
  mode,
  className,
  reactive,
  ...props
}: AppTagDateProps): JSX.Element | null {
  const [innerDate, setInnerDate] = useState(date);
  useEffect(() => {
    setInnerDate(date);
    const timer = setTimeout(() => {
      if (reactive) {
        setInnerDate(new Date(innerDate.getTime() + 1000));
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [date, innerDate, reactive]);
  if (!innerDate) {
    return null;
  }
  const { formattedDate, isRelative } = formatDate(innerDate);
  return (
    <span {...props} className={clsx(className)}>
      {MAPPING_MODE[mode]}
      {!isRelative ? "on " : ""}
      <time dateTime={date.toISOString()}>{formattedDate}</time>
    </span>
  );
}
