import { LuClock3 } from "react-icons/lu";
import { useSocietyData } from "../hooks/useSocietyData";
import { useSemester } from "../hooks/useSemester";
import { useSemesterNotice } from "../hooks/useSemesterNotice";
import {
  projectOverlapsSemester,
  getProjectSemesterStatus,
} from "../lib/semesterDomain";

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
    <li className="group rounded-xl border border-white/10 bg-white/3 p-4 transition hover:border-cyan-400/30 hover:bg-white/6 flex flex-col gap-2">
      <a
        href={link}
        className="text-xs font-semibold leading-tight text-cyan-300 underline underline-offset-4 decoration-cyan-500/60 group-hover:text-cyan-100"
      >
        {title}
      </a>

      <p className="text-sm leading-relaxed text-white/80">{description}</p>

      <p
        className={`rounded-full border px-2.5 py-0.5 text-xs font-medium w-fit self-end mt-2 ${badgeStyle}`}
      >
        {statusLabel}
      </p>
    </li>
  );
};

const ThisSemester = () => {
  const { projects } = useSocietyData();
  const { semester, error } = useSemester();
  const notice = useSemesterNotice();

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

  if (semesterProjects.length === 0) {
    return (
      <aside className="max-w-xl">
        <div className="rounded-2xl border border-white/10 p-6 text-sm text-white/60">
          No long-running projects are scheduled for this semester.
        </div>
      </aside>
    );
  }

  const semesterActive = now <= semEnd;

  return (
    <aside className="max-w-xl">
      <div className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-slate-900/80 to-slate-950 p-6 shadow-card">
        <div className="mb-5 flex items-center justify-between">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
            <LuClock3 className="text-cyan-300" />
            {semester.label}
          </p>

          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-200">
            {semesterActive ? "Active term" : "Semester concluded"}
          </span>
        </div>

        {notice && (
          <div className="mb-6 rounded-xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/90">
                {notice.heading}
              </p>
              <p className="text-sm text-white/70">{notice.subtitle}</p>
            </div>

            <p className="mt-3 text-[13px] leading-relaxed text-white/55 max-w-prose">
              {notice.description}
            </p>
          </div>
        )}

        <p className="mb-6 max-w-prose text-sm leading-relaxed text-white/75">
          Join in, follow progress, or explore the details on the{" "}
          <a
            href="/projects"
            className="font-semibold text-cyan-300 underline underline-offset-4 decoration-cyan-500/60 hover:text-cyan-100"
          >
            Projects
          </a>{" "}
          page.
        </p>

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
      </div>
    </aside>
  );
};

export default ThisSemester;
