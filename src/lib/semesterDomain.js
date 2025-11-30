const MS_PER_DAY = 1000 * 60 * 60 * 24;

function daysBetween(a, b) {
  return Math.ceil((b - a) / MS_PER_DAY);
}

export function projectOverlapsSemester(project, semStart, semEnd) {
  const start = new Date(project.date_start);
  const end = project.date_end ? new Date(project.date_end) : semEnd;

  return start <= semEnd && end >= semStart;
}

export function getProjectSemesterStatus(project, semEnd, now) {
  const start = new Date(project.date_start);
  const end = project.date_end ? new Date(project.date_end) : semEnd;

  if (project.status === "completed" || end < now) {
    return { statusLabel: "Completed this semester", tone: "past" };
  }

  if (start > now) {
    const daysUntil = daysBetween(now, start);
    if (daysUntil <= 7) {
      return { statusLabel: `Starts in ${daysUntil} days`, tone: "upcoming" };
    }

    const weeks = Math.ceil(daysUntil / 7);
    return { statusLabel: `Starts in ${weeks} weeks`, tone: "upcoming" };
  }

  if (project.status === "in-progress") {
    const daysLeft = daysBetween(now, end);

    if (daysLeft <= 7) {
      return { statusLabel: `Ends in ${daysLeft} days`, tone: "urgent" };
    }

    if (daysLeft <= 28) {
      const weeks = Math.ceil(daysLeft / 7);
      return { statusLabel: `Ends in ${weeks} weeks`, tone: "warning" };
    }

    return { statusLabel: "Ongoing this semester", tone: "ongoing" };
  }

  return { statusLabel: "Part of this semester", tone: "ongoing" };
}
