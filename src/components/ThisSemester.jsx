import { LuCalendarDays, LuClock3, LuMapPin } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useSocietyData } from "../hooks/useSocietyData";
import { useSemester } from "../hooks/useSemester";
import { deriveEventStatus } from "../lib/deriveEventStatus";
import {
  projectOverlapsSemester,
  getProjectSemesterStatus,
} from "../lib/semesterDomain";

const STATE_META = {
  ongoing: {
    className: "border-emerald-400/35 text-emerald-300",
  },
  urgent: {
    className: "border-rose-400/40 text-rose-300",
  },
  warning: {
    className: "border-orange-400/40 text-orange-300",
  },
  upcoming: {
    className: "border-amber-400/40 text-amber-300",
  },
  past: {
    className: "border-slate-300/30 text-slate-300",
  },
};

const EVENT_STATUS_META = {
  ongoing: {
    label: "Ongoing",
    order: 0,
  },
  upcoming: {
    label: "Upcoming",
    order: 1,
  },
  past: {
    label: "Completed",
    order: 2,
  },
};

const SemesterItem = ({ title, description, link, statusLabel, tone }) => {
  const badgeStyle =
    STATE_META[tone]?.className || STATE_META.ongoing.className;

  return (
    <li className="group rounded-xl border border-white/10 bg-white/3 p-4 transition hover:border-cyan-400/30 hover:bg-white/6 flex flex-col gap-2">
      <Link
        to={link}
        className="text-xs font-semibold leading-tight text-cyan-300 underline underline-offset-4 decoration-cyan-500/60 group-hover:text-cyan-100"
      >
        {title}
      </Link>

      <p className="text-sm leading-relaxed text-white/80">{description}</p>

      <p
        className={`rounded-full border px-2.5 py-0.5 text-xs font-medium w-fit self-end mt-2 ${badgeStyle}`}
      >
        {statusLabel}
      </p>
    </li>
  );
};

const EventItem = ({ event }) => {
  const start = new Date(event.date_start + "T00:00:00");
  const end = event.date_end
    ? new Date(event.date_end + "T00:00:00")
    : new Date(event.date_start + "T00:00:00");
  const status = EVENT_STATUS_META[event.status] || EVENT_STATUS_META.past;
  const badgeStyle =
    STATE_META[event.status]?.className || STATE_META.past.className;

  const formatDate = (d) =>
    d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const dateLabel =
    event.date_end && event.date_end !== event.date_start
      ? `${formatDate(start)} - ${formatDate(end)}`
      : formatDate(start);

  return (
    <li className="group rounded-xl border border-white/10 bg-white/3 p-4 transition hover:border-cyan-400/30 hover:bg-white/6">
      <div className="mb-2">
        <span
          className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${badgeStyle}`}
        >
          {status.label}
        </span>
      </div>

      <Link
        to={`/events#${event.id}`}
        className="text-xs font-semibold leading-tight text-cyan-300 underline underline-offset-4 decoration-cyan-500/60 group-hover:text-cyan-100"
      >
        {event.title}
      </Link>

      <div className="mt-2 space-y-1 text-[12px] leading-relaxed text-white/68">
        <p className="inline-flex items-center gap-1.5">
          <LuCalendarDays className="text-white/55" />
          {dateLabel}
        </p>
        {event.location && (
          <p className="inline-flex items-center gap-1.5">
            <LuMapPin className="text-white/55" />
            {event.location}
          </p>
        )}
      </div>
    </li>
  );
};

const overlapsSemester = (item, semStart, semEnd) => {
  const start = new Date(item.date_start);
  const end = item.date_end
    ? new Date(item.date_end)
    : new Date(item.date_start);

  return start <= semEnd && end >= semStart;
};

const ThisSemester = () => {
  const { projects, events } = useSocietyData();
  const { semester, error } = useSemester();

  if (error) {
    return <p className="text-red-400 text-sm">{error}</p>;
  }

  if (!semester) return null;

  const semStart = new Date(semester.start);
  const semEnd = new Date(semester.end);
  const now = new Date();

  const semesterProjects = projects
    .filter((p) => projectOverlapsSemester(p, semStart, semEnd))
    .sort((a, b) => new Date(a.date_start) - new Date(b.date_start))
    .map((p) => ({
      ...p,
      ...getProjectSemesterStatus(p, semEnd, now),
    }));

  const semesterEvents = events
    .filter((event) => overlapsSemester(event, semStart, semEnd))
    .map((event) => ({
      ...event,
      status: deriveEventStatus(event),
    }))
    .sort((a, b) => {
      const statusOrder =
        EVENT_STATUS_META[a.status].order - EVENT_STATUS_META[b.status].order;
      if (statusOrder !== 0) return statusOrder;

      const dateDiff = new Date(a.date_start) - new Date(b.date_start);
      return a.status === "past" ? -dateDiff : dateDiff;
    })
    .slice(0, 4);

  if (semesterProjects.length === 0 && semesterEvents.length === 0) {
    return (
      <aside className="max-w-xl">
        <div className="rounded-2xl border border-white/10 p-6 text-sm text-white/60">
          No semester projects or events are listed right now.
        </div>
      </aside>
    );
  }

  const semesterActive = now <= semEnd;

  return (
    <aside className="max-w-xl">
      <div className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-linear-to-br from-cyan-500/10 via-slate-900/80 to-slate-950 p-6 shadow-card">
        <div className="mb-5 flex items-center justify-between">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
            <LuClock3 className="text-cyan-300" />
            {semester.label}
          </p>

          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-200">
            {semesterActive ? "Active term" : "Semester concluded"}
          </span>
        </div>

        <section>
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/85">
              Projects
            </p>
            <Link
              to="/projects"
              className="text-[11px] font-semibold text-cyan-300 underline underline-offset-4 decoration-cyan-500/60 hover:text-cyan-100"
            >
              View all projects
            </Link>
          </div>

          {semesterProjects.length > 0 ? (
            <ul className="space-y-4">
              {semesterProjects.map((item) => (
                <SemesterItem
                  key={item.id}
                  title={item.title}
                  description={item.description_short}
                  link={`/projects#${item.id}`}
                  statusLabel={item.statusLabel}
                  tone={item.tone}
                />
              ))}
            </ul>
          ) : (
            <p className="rounded-xl border border-white/10 bg-white/3 p-4 text-sm text-white/65">
              No project work is currently scheduled for this semester.
            </p>
          )}
        </section>

        <section className="mt-8 border-t border-white/10 pt-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/85">
              Events
            </p>
            <Link
              to="/events"
              className="text-[11px] font-semibold text-cyan-300 underline underline-offset-4 decoration-cyan-500/60 hover:text-cyan-100"
            >
              View all events
            </Link>
          </div>

          {semesterEvents.length > 0 ? (
            <ul className="space-y-3">
              {semesterEvents.map((event) => (
                <EventItem key={event.id} event={event} />
              ))}
            </ul>
          ) : (
            <p className="rounded-xl border border-white/10 bg-white/3 p-4 text-sm text-white/65">
              No events are currently scheduled for this semester.
            </p>
          )}
        </section>
      </div>
    </aside>
  );
};

export default ThisSemester;
