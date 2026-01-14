import { useState } from "react";
import { LuCalendarDays, LuMapPin } from "react-icons/lu";
import { useSocietyData } from "../hooks/useSocietyData";
import { FaGlobe, FaLinkedin, FaSquareGithub } from "react-icons/fa6";

const formatDate = (iso) => {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const StatusBadge = ({ status }) => {
  const map = {
    "in-progress": {
      label: "In Progress",
      className: "border-cyan-400/40 bg-cyan-400/10 text-cyan-200",
    },
    completed: {
      label: "Completed",
      className: "border-green-400/40 bg-green-400/10 text-green-200",
    },
    dropped: {
      label: "Archived",
      className: "border-red-400/40 bg-red-400/10 text-red-200",
    },
    "not-started": {
      label: "Not started",
      className: "border-yellow-400/40 bg-yellow-400/10 text-yellow-200",
    },
    pending: {
      label: "Planned",
      className: "border-white/25 bg-white/10 text-white/70",
    },
  };

  const cfg = map[status] || map.pending;

  return (
    <span
      className={`inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-semibold ${cfg.className}`}
    >
      {cfg.label}
    </span>
  );
};

const ProjectCard = ({ project, people }) => {
  const {
    id,
    title,
    description_long,
    date_start,
    date_end,
    status,
    repo,
    linkedin,
    live,
    contributors = [],
    location,
    difficulty,
    skills = [],
    learning_outcomes = [],
  } = project;

  const resolve = (id) => people.find((p) => p.id === id);

  return (
    <article
      id={id}
      className="rounded-smooth border border-white/10 bg-white/2 p-6 shadow-sm transition hover:border-white/25 hover:bg-white/5 hover:shadow-hover"
    >
      {/* Status + difficulty */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <StatusBadge status={status} />
        {difficulty && (
          <span className="inline-flex items-center rounded-sm border border-white/20 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/70">
            {difficulty}
          </span>
        )}
      </div>

      <h3 className="mb-3 text-xl font-bold tracking-tight text-white">
        {title}
      </h3>

      <div className="mb-4 space-y-1 text-sm text-white/70">
        <p className="flex items-center gap-2">
          <LuCalendarDays className="text-white/40" />
          {date_end
            ? `${formatDate(date_start)} – ${formatDate(date_end)}`
            : `Started ${formatDate(date_start)}`}
        </p>
        {location && (
          <p className="flex items-center gap-2">
            <LuMapPin className="text-white/40" />
            {location}
          </p>
        )}
      </div>

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] text-white/70"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Main description */}
      <p className="mb-4 text-sm leading-relaxed text-white/80">
        {description_long}
      </p>

      {/* Learning outcomes */}
      {learning_outcomes.length > 0 && (
        <div className="mb-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
            Learning outcomes
          </p>
          <ul className="ml-4 list-disc space-y-0.5 text-sm text-white/70">
            {learning_outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Contributors */}
      {contributors.length > 0 && (
        <div className="mt-5 mb-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
            Contributors
          </p>
          <ContributorsList contributors={contributors} resolve={resolve} />
        </div>
      )}

      {(repo?.trim() || linkedin?.trim() || live?.trim()) && (
        <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-white/50">
          {repo?.trim() && (
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-cyan-300 underline underline-offset-4 decoration-cyan-500/40 hover:text-cyan-100"
            >
              <FaSquareGithub size={12} />
              <span>Source Code</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}

          {live?.trim() && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-cyan-300 underline underline-offset-4 decoration-cyan-500/40 hover:text-cyan-100"
            >
              <FaGlobe size={12} />
              <span>Live View</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}

          {linkedin?.trim() && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-cyan-300 underline underline-offset-4 decoration-cyan-500/40 hover:text-cyan-100"
            >
              <FaLinkedin size={12} />
              <span>Project Post</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      )}
    </article>
  );
};

const Projects = () => {
  const { projects, people } = useSocietyData();

  // Sort newest first by start date
  const sorted = [...projects].sort(
    (a, b) => new Date(b.date_start) - new Date(a.date_start)
  );

  const now = new Date();

  const active = sorted.filter((p) => p.status === "in-progress");

  const upcoming = sorted.filter((p) => {
    if (p.status === "not-started" || p.status === "pending") return true;
    const start = new Date(p.date_start + "T00:00:00");
    return start > now;
  });

  const completed = sorted.filter((p) => p.status === "completed");
  const archived = sorted.filter((p) => p.status === "dropped");

  // Group completed by month/year of end date
  const groupedCompleted = (() => {
    const groups = {};
    completed.forEach((p) => {
      if (!p.date_end) return;
      const end = new Date(p.date_end + "T00:00:00");
      const label = end.toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
      });
      if (!groups[label]) groups[label] = [];
      groups[label].push(p);
    });
    return Object.entries(groups).sort(([a], [b]) => new Date(b) - new Date(a));
  })();

  const resolve = (id) => people.find((p) => p.id === id);

  return (
    <main id="main" className="container">
      <header className="mb-12">
        <p className="mb-2 text-xs uppercase tracking-[0.14em] text-white/40">
          Builds & tooling
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          Projects
        </h1>
        <p className="mt-4 max-w-5xl text-lg leading-relaxed text-white/70">
          Software and tooling engineered by Cybersoc — including password
          security systems, game reverse engineering work, the society website,
          and teaching projects that introduce core security ideas safely.
        </p>
      </header>

      <article className="mb-12 rounded-smooth border border-white/10 bg-white/4 px-6 py-4 text-sm text-white/70">
        <p>
          If you participated in a project and would like to be added as a
          contributor, please contact the Web Platform Engineer (Baber Khan) via
          LinkedIn or Discord (see the Contact page).
        </p>

        <p className="mt-2">
          If your name appears in the contributors list and you would like it
          removed, you may also request removal at any time. No reason is
          required for the removal of any data related to you.
        </p>
      </article>

      {/* MOBILE TOC */}
      <MobileProjectsTOC
        active={active}
        upcoming={upcoming}
        groupedCompleted={groupedCompleted}
        archived={archived}
      />

      <div className="flex">
        {/* DESKTOP TOC */}
        <ProjectsTOC
          active={active}
          upcoming={upcoming}
          groupedCompleted={groupedCompleted}
          archived={archived}
        />

        <div className="flex-1 space-y-20">
          {/* Active */}
          <section className="mb-20">
            <h2 className="mb-3 text-2xl font-bold text-white">
              Active projects
            </h2>
            <p className="mb-6 text-sm text-white/65">
              Ongoing work you can still join this semester: projects with
              regular sessions, clear tasks, and room for new contributors.
            </p>

            {active.length === 0 ? (
              <p className="text-white/60">No active projects at the moment.</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {active.map((p) => (
                  <ProjectCard key={p.id} project={p} people={people} />
                ))}
              </div>
            )}
          </section>

          {/* Upcoming */}
          <section className="mb-20">
            <h2 className="mb-3 text-2xl font-bold text-white">
              Upcoming projects
            </h2>
            <p className="mb-6 text-sm text-white/65">
              Planned and not-yet-started projects. These are good entry points
              if you want to join from the very beginning of a build.
            </p>

            {upcoming.length === 0 ? (
              <p className="text-white/60">
                No upcoming projects currently listed.
              </p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {upcoming.map((p) => (
                  <ProjectCard key={p.id} project={p} people={people} />
                ))}
              </div>
            )}
          </section>

          {/* Completed */}
          <section className="mb-20">
            <h2 className="mb-4 text-2xl font-bold text-white">
              Completed projects
            </h2>
            <p className="mb-6 text-sm text-white/65">
              Finished projects that members can reference on CVs, portfolios,
              and applications. They also act as examples for future work.
            </p>

            {groupedCompleted.length === 0 ? (
              <p className="text-white/60">No completed projects yet.</p>
            ) : (
              <div className="space-y-12">
                {groupedCompleted.map(([month, items]) => (
                  <div key={month}>
                    <h3 className="mb-3 text-base font-semibold text-white/75">
                      {month}
                    </h3>
                    <div className="grid gap-6 md:grid-cols-2">
                      {items.map((p) => (
                        <ProjectCard key={p.id} project={p} people={people} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Archived */}
          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">Archived</h2>
            <p className="mb-6 text-sm text-white/65">
              Historical or paused projects kept for reference and inspiration.
              They show how the society experiments and iterates over time.
            </p>

            {archived.length === 0 ? (
              <p className="text-white/60">No archived projects.</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {archived.map((p) => (
                  <ProjectCard key={p.id} project={p} people={people} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

const ContributorsList = ({ contributors, resolve }) => {
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? contributors : contributors.slice(0, 3);
  const remaining = contributors.length - 3;

  return (
    <>
      <ul className="ml-4 list-disc space-y-0.5 text-sm text-white/65">
        {visible.map((c, idx) => {
          const p = resolve(c.person);
          if (!p) return null;

          return (
            <li key={idx}>
              {p.name}
              {c.project_role && ` — ${c.project_role}`}
              {p.linkedin && (
                <a
                  href={p.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 hover:text-white"
                >
                  <FaLinkedin size={24} className="inline-block pb-1.5" />
                </a>
              )}
            </li>
          );
        })}
      </ul>

      {contributors.length > 3 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 ml-4 text-xs font-semibold text-cyan-300 underline underline-offset-4 decoration-cyan-500/60 hover:text-cyan-100"
        >
          {expanded ? "Show less" : `+${remaining} more`}
        </button>
      )}
    </>
  );
};

const ProjectsTOC = ({ active, upcoming, groupedCompleted, archived }) => {
  return (
    <aside className="hidden lg:block w-64 sticky top-28 mr-12 border-r border-white/10 pr-8">
      <p className="mb-3 text-xs uppercase tracking-[0.14em] text-white/40">
        Quick navigation
      </p>

      <nav className="space-y-6 text-sm">
        {/* ACTIVE */}
        {active.length > 0 && (
          <div>
            <p className="mb-1 font-semibold text-white/70">Active</p>
            <ul className="space-y-1">
              {active.map((p) => (
                <li key={p.id}>
                  <a
                    href={`#${p.id}`}
                    className="block border-l border-transparent pl-3 hover:border-cyan-400/60 hover:text-cyan-300 transition overflow-hidden whitespace-nowrap text-ellipsis"
                  >
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* UPCOMING */}
        {upcoming.length > 0 && (
          <div>
            <p className="mb-1 font-semibold text-white/70">Upcoming</p>
            <ul className="space-y-1">
              {upcoming.map((p) => (
                <li key={p.id}>
                  <a
                    href={`#${p.id}`}
                    className="block pl-3 border-l border-transparent hover:text-cyan-300 hover:border-cyan-400/60 transition overflow-hidden whitespace-nowrap text-ellipsis"
                  >
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* COMPLETED */}
        {groupedCompleted.length > 0 && (
          <div>
            <p className="mb-1 font-semibold text-white/70">Completed</p>
            <ul className="space-y-2">
              {groupedCompleted.map(([month, items]) => (
                <li key={month}>
                  <p className="text-white/40 text-xs mb-1">{month}</p>
                  <ul className="space-y-1">
                    {items.map((p) => (
                      <li key={p.id}>
                        <a
                          href={`#${p.id}`}
                          className="block pl-3 border-l border-transparent hover:text-cyan-300 hover:border-cyan-400/60 transition overflow-hidden whitespace-nowrap text-ellipsis"
                        >
                          {p.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ARCHIVED */}
        {archived.length > 0 && (
          <div>
            <p className="mb-1 font-semibold text-white/70">Archived</p>
            <ul className="space-y-1">
              {archived.map((p) => (
                <li key={p.id}>
                  <a
                    href={`#${p.id}`}
                    className="block pl-3 border-l border-transparent hover:text-cyan-300 hover:border-cyan-400/60 transition overflow-hidden whitespace-nowrap text-ellipsis"
                  >
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </aside>
  );
};

const MobileProjectsTOC = ({
  active,
  upcoming,
  groupedCompleted,
  archived,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden mb-10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full rounded-smooth border border-white/10 bg-white/4 px-4 py-3 text-sm font-semibold text-white flex justify-between"
      >
        Jump to project
        <span>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="mt-3 rounded-smooth border border-white/10 bg-white/3 p-4 space-y-6 text-sm">
          {/* ACTIVE */}
          {active.length > 0 && (
            <div>
              <p className="font-semibold text-white/70 mb-1">Active</p>
              <ul className="space-y-1">
                {active.map((p) => (
                  <li key={p.id}>
                    <a
                      href={`#${p.id}`}
                      onClick={() => setOpen(false)}
                      className="block py-1 text-white/80 hover:text-cyan-300"
                    >
                      {p.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* UPCOMING */}
          {upcoming.length > 0 && (
            <div>
              <p className="font-semibold text-white/70 mb-1">Upcoming</p>
              <ul className="space-y-1">
                {upcoming.map((p) => (
                  <li key={p.id}>
                    <a
                      href={`#${p.id}`}
                      onClick={() => setOpen(false)}
                      className="block py-1 text-white/80 hover:text-cyan-300"
                    >
                      {p.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* COMPLETED */}
          {groupedCompleted.length > 0 && (
            <div>
              <p className="font-semibold text-white/70 mb-1">Completed</p>

              {groupedCompleted.map(([month, items]) => (
                <div key={month} className="mb-2">
                  <p className="text-white/40 text-xs mb-1">{month}</p>
                  <ul className="space-y-1">
                    {items.map((p) => (
                      <li key={p.id}>
                        <a
                          href={`#${p.id}`}
                          onClick={() => setOpen(false)}
                          className="block py-1 text-white/80 hover:text-cyan-300"
                        >
                          {p.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* ARCHIVED */}
          {archived.length > 0 && (
            <div>
              <p className="font-semibold text-white/70 mb-1">Archived</p>
              <ul className="space-y-1">
                {archived.map((p) => (
                  <li key={p.id}>
                    <a
                      href={`#${p.id}`}
                      onClick={() => setOpen(false)}
                      className="block py-1 text-white/80 hover:text-cyan-300"
                    >
                      {p.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Projects;
