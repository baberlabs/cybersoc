import { useEffect, useState } from "react";
import { LuClock3 } from "react-icons/lu";
import { useSocietyData } from "../hooks/useSocietyData";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const ThisSemester = () => {
  const { projects } = useSocietyData();
  const [semester, setSemester] = useState(null);

  useEffect(() => {
    fetch("/data/semesters.json")
      .then((r) => r.json())
      .then((all) => {
        if (!Array.isArray(all) || all.length === 0) return;
        const current = all.find((s) => s.current) || all[0];
        setSemester(current);
      });
  }, []);

  if (!semester) return null;

  const semStart = new Date(semester.start + "T00:00:00");
  const semEnd = new Date(semester.end + "T23:59:59");
  const now = new Date();

  // Projects overlapping this semester
  const semesterProjects = projects
    .filter((p) => {
      const ps = new Date(p.date_start + "T00:00:00");
      const pe = p.date_end ? new Date(p.date_end + "T23:59:59") : semEnd; // open-ended defaults to semester end

      return ps <= semEnd && pe >= semStart;
    })
    .sort(
      (a, b) =>
        new Date(a.date_start + "T00:00:00") -
        new Date(b.date_start + "T00:00:00")
    );

  const items = semesterProjects.map((p) => {
    const meta = getSemesterMeta(p, semEnd, now);
    return {
      id: p.id,
      title: p.title,
      link: `/projects#${p.id}`,
      description: p.description_short,
      ...meta,
    };
  });

  if (items.length === 0) return null;

  return (
    <aside className="space-y-4 max-w-xl">
      <div className="rounded-smooth border border-cyan-400/30 bg-linear-to-br from-cyan-500/10 to-slate-900/70 p-6 shadow-card">
        <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
          <LuClock3 className="text-cyan-300" />
          {semester.label} · This semester
        </p>

        <p className="mb-4 text-sm text-white/75">
          Key long-running projects you can join or follow during this semester.
          Use this as a quick overview; details live on the{" "}
          <a
            href="/projects"
            className="font-bold text-cyan-300 underline underline-offset-4 decoration-cyan-500/60 hover:text-cyan-100"
          >
            Projects
          </a>{" "}
          page.
        </p>

        <ul className="space-y-4 text-sm">
          {items.map((item) => (
            <SemesterItem key={item.id} {...item} />
          ))}
        </ul>
      </div>
    </aside>
  );
};

const STATUS_STYLES = {
  ongoing: "border-cyan-500/30 text-cyan-300",
  urgent: "border-red-500/30 text-red-400",
  warning: "border-orange-500/30 text-orange-400",
  upcoming: "border-yellow-400/30 text-yellow-300",
  past: "border-white/20 text-white/60",
};

const SemesterItem = ({ title, description, link, statusLabel, tone }) => {
  const badgeStyle = STATUS_STYLES[tone] || STATUS_STYLES.ongoing;

  return (
    <li className="space-y-1">
      <div>
        <a
          href={link}
          className="font-bold text-cyan-300 underline underline-offset-4 decoration-cyan-500/60 hover:text-cyan-100"
        >
          {title}
        </a>
        <span
          className={`ml-2 rounded-xl border px-2 py-0.5 text-xs ${badgeStyle}`}
        >
          {statusLabel}
        </span>
      </div>
      <p className="text-white/85 text-sm">{description}</p>
    </li>
  );
};

function getSemesterMeta(project, semEnd, now) {
  const status = project.status;
  const start = new Date(project.date_start + "T00:00:00");
  const end = project.date_end
    ? new Date(project.date_end + "T23:59:59")
    : semEnd;

  // Completed / past
  if (status === "completed" || end < now) {
    return {
      statusLabel: "Completed this semester",
      tone: "past",
    };
  }

  // Not started yet
  if (status === "not-started" || start > now) {
    const daysUntil = Math.round((start - now) / MS_PER_DAY);

    if (daysUntil <= 7) {
      return {
        statusLabel: `Starts in ${daysUntil} day${daysUntil === 1 ? "" : "s"}`,
        tone: "upcoming",
      };
    }

    const weeks = Math.round(daysUntil / 7);
    return {
      statusLabel: `Starts in ${weeks} week${weeks === 1 ? "" : "s"}`,
      tone: "upcoming",
    };
  }

  // In progress
  if (status === "in-progress") {
    const daysLeft = Math.round((end - now) / MS_PER_DAY);

    if (daysLeft <= 7) {
      return {
        statusLabel: `Ends in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`,
        tone: "urgent",
      };
    }

    if (daysLeft <= 28) {
      const weeks = Math.round(daysLeft / 7);
      return {
        statusLabel: `Ends in ${weeks} week${weeks === 1 ? "" : "s"}`,
        tone: "warning",
      };
    }

    return {
      statusLabel: "Ongoing this semester",
      tone: "ongoing",
    };
  }

  // Fallback
  return {
    statusLabel: "Part of this semester",
    tone: "ongoing",
  };
}

export default ThisSemester;
