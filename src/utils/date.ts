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
  const now = new Date();
  const secondsLapsed = date.getTime() - now.getTime();
  const daysLapsed = secondsLapsed / ONE_DAY_IN_SECONDS;
  if (Math.abs(daysLapsed) < 30) {
    return {
      isRelative: true,
      formattedDate: human(date),
    };
  }
  return {
    isRelative: false,
    formattedDate: `${date.getDate()} ${
      MONTHS[date.getMonth()]
    } ${date.getFullYear()}`,
  };
};
