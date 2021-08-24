import human from "human-time";

const ONE_DAY_IN_SECONDS = 86400000;

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dev",
];

export const formatDate = (
  date: Date
): { formattedDate: string; isRelative: boolean } => {
  const originalDate = new Date(date); // do not mutate `date`
  const now = new Date().setHours(0, 0, 0, 0);
  const then = originalDate.setHours(0, 0, 0, 0);
  const days = (then - now) / ONE_DAY_IN_SECONDS;
  if (days < 30 && days > -30) {
    return {
      isRelative: true,
      formattedDate: human(originalDate),
    };
  }
  return {
    isRelative: false,
    formattedDate: `${originalDate.getDate()} ${
      MONTHS[originalDate.getMonth()]
    } ${originalDate.getFullYear()}`,
  };
};
