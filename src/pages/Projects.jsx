import { useEffect, useState } from "react";
import { LuCalendarDays, LuMapPin } from "react-icons/lu";

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
    pending: {
      label: "Pending",
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

const ProjectCard = ({
  title,
  description,
  date_start,
  date_end,
  status,
  repo,
  contributors = [],
  location,
}) => (
  <article className="rounded-smooth border border-white/10 bg-white/[0.02] p-6 shadow-sm transition hover:border-white/25 hover:bg-white/[0.05] hover:shadow-hover">
    <div className="mb-3 flex items-center justify-between gap-3">
      <StatusBadge status={status} />
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
      <p className="flex items-center gap-2">
        <LuMapPin className="text-white/40" />
        {location}
      </p>
    </div>

    <p className="mb-4 text-sm leading-relaxed text-white/80">{description}</p>

    {repo && repo.trim() !== "" && (
      <a
        href={repo}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-semibold text-cyan-300 underline underline-offset-4 decoration-cyan-500/60 hover:text-cyan-100"
      >
        View repository
      </a>
    )}

    {contributors.length > 0 && (
      <div className="mt-5">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
          Contributors
        </p>
        <ul className="ml-4 list-disc space-y-0.5 text-sm text-white/65">
          {contributors.slice(0, 4).map((name) => (
            <li key={name}>{name}</li>
          ))}
          {contributors.length > 4 && (
            <li className="italic text-white/45">
              +{contributors.length - 4} more
            </li>
          )}
        </ul>
      </div>
    )}
  </article>
);

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) => new Date(b.date_start) - new Date(a.date_start)
        );
        setProjects(sorted);
      });
  }, []);

  const active = projects.filter((p) => p.status === "in-progress");
  const completed = projects.filter((p) => p.status === "completed");
  const archived = projects.filter((p) => p.status === "dropped");

  const featured = active[0] || completed[0] || null;
  const excludeFeatured = (arr) =>
    featured ? arr.filter((p) => p.title !== featured.title) : arr;

  return (
    <main className="container py-24 md:py-32">
      <header className="mb-10">
        <p className="mb-2 text-xs uppercase tracking-[0.14em] text-white/40">
          Builds & tooling
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          Projects
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/70">
          Software, tooling, and collaborative systems engineered by Cybersoc.
          These projects span password security, game reverse engineering,
          society infrastructure, and experimentation.
        </p>
      </header>

      {/* Featured */}
      {featured && (
        <section className="mb-20">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-4 w-1 rounded-sm bg-cyan-400" />
            <h2 className="text-2xl font-bold text-white">Featured project</h2>
          </div>
          <ProjectCard {...featured} />
        </section>
      )}

      {/* Active */}
      <section className="mb-20">
        <h2 className="mb-3 text-2xl font-bold text-white">Active projects</h2>
        <p className="mb-6 max-w-2xl text-sm text-white/65">
          Ongoing work you can still join this semester: long-running efforts
          with regular touchpoints and room for new contributors.
        </p>

        {active.length === 0 ? (
          <p className="text-white/60">No active projects at the moment.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {excludeFeatured(active).map((p) => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </div>
        )}
      </section>

      {/* Completed */}
      <section className="mb-20">
        <h2 className="mb-3 text-2xl font-bold text-white">
          Completed projects
        </h2>
        <p className="mb-6 max-w-2xl text-sm text-white/65">
          Work that has wrapped up, useful to reference on CVs, portfolios, and
          future society planning.
        </p>

        {completed.length === 0 ? (
          <p className="text-white/60">No completed projects yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {excludeFeatured(completed).map((p) => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </div>
        )}
      </section>

      {/* Archived */}
      <section>
        <h2 className="mb-3 text-2xl font-bold text-white">Archived</h2>
        <p className="mb-6 max-w-2xl text-sm text-white/65">
          Experiments, short-lived initiatives, or parked ideas kept here for
          historical context.
        </p>

        {archived.length === 0 ? (
          <p className="text-white/60">No archived projects listed.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {archived.map((p) => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Projects;
