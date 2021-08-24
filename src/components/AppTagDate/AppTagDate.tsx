import { formatDate } from "../../utils/date";

AppTagDate.defaultProps = {
  mode: "updated",
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
}: AppTagDateProps): JSX.Element | null {
  if (!date) {
    return null;
  }
  const { formattedDate, isRelative } = formatDate(date);
  return (
    <span className={`${className} text-sm text-secondary`}>
      {MAPPING_MODE[mode]}
      {!isRelative ? " on" : ""} {formattedDate}
    </span>
  );
}
