export function deriveEventStatus({ date_start, date_end }) {
  const now = new Date();

  // Default end date to start date if not provided
  const endDateStr = date_end || date_start;

  // Day-level status: if an event is scheduled for today, treat it as ongoing.
  // This keeps status intuitive in UI summaries regardless of specific start hour.
  const startDay = new Date(`${date_start}T00:00:00`);
  const endDay = new Date(`${endDateStr}T23:59:59`);

  if (now < startDay) {
    return "upcoming";
  }

  if (now > endDay) {
    return "past";
  }

  return "ongoing";
}
