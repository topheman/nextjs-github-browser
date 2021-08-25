import { useEffect, useState } from "react";
import { formatDate } from "../../utils/date";

AppTagDate.defaultProps = {
  mode: "updated",
  reactive: true,
  className: "",
};

const MAPPING_MODE = Object.freeze({
  updated: "Updated",
});

export type AppTagDateProps = {
  mode: "updated";
  date: Date;
} & typeof AppTagDate.defaultProps;

export default function AppTagDate({
  date,
  mode,
  className,
  reactive,
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
    <span className={`${className} text-sm text-secondary`}>
      {MAPPING_MODE[mode]}
      {!isRelative ? " on" : ""} {formattedDate}
    </span>
  );
}
