export function deriveEventStatus({ date_start, date_end, time }) {
  const now = new Date();

  // Default end date to start date if not provided
  const endDateStr = date_end || date_start;

  // Parse time range
  let startTime = "00:00";
  let endTime = "23:59";

  if (time && time.includes("–")) {
    const [start, end] = time.split("–").map((t) => t.trim());
    if (start) startTime = start;
    if (end) endTime = end;
  }

  // Construct full Date objects
  const startDateTime = new Date(`${date_start}T${startTime}:00`);
  const endDateTime = new Date(`${endDateStr}T${endTime}:00`);

  if (now < startDateTime) {
    return "upcoming";
  }

  if (now >= startDateTime && now <= endDateTime) {
    return "ongoing";
  }

  return "past";
}
