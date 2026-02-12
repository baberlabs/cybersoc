export const getCurrentMonthYear = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  year: "numeric",
}).format(new Date());
