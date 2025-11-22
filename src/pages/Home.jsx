import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main id="main" className="container py-24 md:py-32 text-white">
      {/* HERO */}
      <section className="mb-24 grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        {/* Left: Core pitch */}
        <div className="space-y-8">
          <header className="space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-1 text-xs font-medium text-white/70">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
              Student-led Cyber Security Society · Birmingham City University
            </p>

            <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
              Cybersoc
            </h1>

            <h2 className="text-2xl text-white/80 md:text-3xl">
              Learn. Build. Secure.
            </h2>
          </header>

          <p className="max-w-xl text-lg leading-relaxed text-white/80">
            Cybersoc is BCU&apos;s technical cyber security society. We focus on
            applied security, practical programming, and collaborative projects
            that help you build a portfolio, not just collect lecture notes.
          </p>

          {/* CTA Row */}
          <div className="flex flex-wrap gap-4">
            <CTAButton
              to="https://www.bcusu.com/organisation/24254/"
              label="Join via BCUSU (Free)"
              variant="primary"
            />
            <CTAButton
              to="https://discord.com/invite/3HcCg7sCqz"
              label="Join Discord"
              variant="secondary"
            />
            <CTAButton to="/events" label="View Events" variant="ghost" />
          </div>

          {/* Stats */}
          <dl className="mt-4 grid gap-4 text-sm text-white/65 sm:flex sm:flex-row">
            <Stat label="Members" value="100+" />
            <Stat label="Society collabs." value="1" />
            <Stat label="CTF duration" value="14-week series" />
            <Stat
              label="Flagship projects"
              value="P4sspl01t, Game Off & more"
            />
          </dl>
        </div>

        {/* Right: Current semester activity */}
        <aside className="space-y-4">
          <div className="rounded-smooth border border-cyan-400/30 bg-linear-to-br from-cyan-500/10 to-slate-900/70 p-6 shadow-card">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
              This semester
            </p>
            <ul className="space-y-3 text-sm text-white/85">
              <li>
                <strong className="block text-white">
                  Semester-long TryHackMe CTF series
                </strong>
                Weekly room selections growing skills in OSINT, forensics,
                reverse engineering, malware, and web security.
              </li>
              <li>
                <strong className="block text-white">
                  Game Off 2025 collaboration
                </strong>
                Joint work with Computer Science and Data Science societies:
                they build games, we reverse engineer and secure them.
              </li>
              <li>
                <strong className="block text-white">
                  Weekly meets & study support
                </strong>
                In-person sessions for CTFs, projects, and help with modules in
                a friendly setting.
              </li>
            </ul>

            <div className="mt-4 flex gap-3">
              <InlineLink to="/projects">View projects</InlineLink>
              <InlineLink to="/events">View events</InlineLink>
            </div>
          </div>
        </aside>
      </section>

      {/* WHY JOIN */}
      <section className="mb-24">
        <h2 className="mb-3 text-3xl font-bold">Why join?</h2>
        <p className="mb-8 max-w-2xl text-white/70">
          Cybersoc is for students who want a concrete path from{" "}
          <span className="text-white">"curious about cyber"</span> to{" "}
          <span className="text-white">
            "confident with tools, challenges, and projects"
          </span>
          . We focus on three pillars:
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <InfoCard
            title="Applied security"
            text="CTFs, labs, OSINT, forensics, and reverse engineering instead of purely theoretical slides."
          />
          <InfoCard
            title="Real projects"
            text="Contribute to projects like P4sspl01t, the Cybersoc website, and Game Off security work."
          />
          <InfoCard
            title="Supportive community"
            text="Study groups, assignment guidance, and a space where it's normal to ask 'basic' questions."
          />
        </div>
      </section>

      {/* WHAT YOU'LL DO */}
      <section className="mb-24">
        <h2 className="mb-3 text-3xl font-bold">
          What you&apos;ll actually do
        </h2>
        <p className="mb-8 max-w-2xl text-white/70">
          Across a typical semester, members pick a mix of challenges, projects,
          and events that match their level.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <ActivityCard
            label="01"
            title="Solve structured CTFs"
            text="Work through curated TryHackMe paths and tracked challenge sets. Share progress and get unstuck together."
          />
          <ActivityCard
            label="02"
            title="Build and break things"
            text="Develop tools, scripts, and small systems in Python and other languages, then test and secure them."
          />
          <ActivityCard
            label="03"
            title="Explore careers"
            text="Hear about cyber roles, SOC work, and blue-team tooling. Learn how to present projects to employers."
          />
        </div>
      </section>

      {/* HOW TO JOIN */}
      <section className="mb-16">
        <h2 className="mb-3 text-3xl font-bold">How to get started</h2>
        <p className="mb-8 max-w-2xl text-white/70">
          Follow this flow and you&apos;ll be in the loop for projects, events,
          and support.
        </p>

        <ol className="grid gap-6 md:grid-cols-4 text-sm">
          <StepCard
            step="01"
            title="Join on BCUSU"
            body="Become an official member via the Students' Union page."
            href="https://www.bcusu.com/organisation/24254/"
            linkText="Open BCUSU page"
          />
          <StepCard
            step="02"
            title="Join Discord"
            body="Use the invite after membership. All announcements, help, and projects happen there."
            href="https://discord.com/invite/3HcCg7sCqz"
            linkText="Open Discord"
          />
          <StepCard
            step="03"
            title="Attend a meet"
            body="Come to weekly sessions for CTFs, projects, or module help. Introduce yourself, ask questions."
            href="/events"
            linkText="See events"
          />
          <StepCard
            step="04"
            title="Pick a track"
            body="Choose a CTF path, project, or resource track that fits your level and interests."
            href="/resources"
            linkText="Browse resources"
          />
        </ol>
      </section>

      {/* HIGHLIGHT */}
      <section className="mb-4">
        <HighlightCard />
      </section>
    </main>
  );
};

/* Components */

const CTAButton = ({ to, label, variant }) => {
  const isExternal = /^https?:\/\//.test(to);

  const base =
    "inline-flex items-center rounded-md px-5 py-2.5 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition-all";

  const styles =
    variant === "primary"
      ? "bg-white text-black hover:bg-neutral-100 shadow-[0_0_16px_rgba(255,255,255,0.25)]"
      : variant === "secondary"
      ? "border border-white/25 text-white/90 hover:bg-white/[0.06]"
      : "text-white/75 hover:text-white";

  const className = `${base} ${styles}`;

  if (isExternal) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {label}
      </a>
    );
  }

  return (
    <Link to={to} className={className}>
      {label}
    </Link>
  );
};

const InlineLink = ({ to, children }) => {
  const isExternal = /^https?:\/\//.test(to);
  const className =
    "text-sm font-semibold text-cyan-300 underline underline-offset-4 decoration-cyan-500/60 hover:text-cyan-100";

  if (isExternal) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
};

const Stat = ({ label, value }) => (
  <div className="space-y-0.5">
    <dt className="text-xs uppercase tracking-[0.18em] text-white/40">
      {label}
    </dt>
    <dd className="text-sm text-white/85">{value}</dd>
  </div>
);

const InfoCard = ({ title, text }) => (
  <article className="rounded-smooth border border-white/10 bg-white/[0.02] p-5 shadow-sm transition-colors hover:bg-white/[0.06]">
    <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
    <p className="text-sm leading-relaxed text-white/70">{text}</p>
  </article>
);

const ActivityCard = ({ label, title, text }) => (
  <article className="rounded-smooth border border-white/10 bg-neutral-900/30 p-5 transition-colors hover:bg-neutral-900/55">
    <p className="mb-1 font-mono text-xs text-cyan-300">{label}</p>
    <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
    <p className="text-sm leading-relaxed text-white/70">{text}</p>
  </article>
);

const StepCard = ({ step, title, body, href, linkText }) => {
  const external = href.startsWith("http");

  return (
    <li className="flex flex-col gap-2 rounded-smooth border border-white/10 bg-white/[0.02] p-4">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-cyan-400/60 text-xs font-semibold text-cyan-200">
        {step}
      </span>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <p className="flex-1 text-xs leading-relaxed text-white/70">{body}</p>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="mt-1 inline-flex text-xs font-semibold text-cyan-300 underline underline-offset-4 decoration-cyan-500/50 hover:text-cyan-100"
      >
        {linkText}
      </a>
    </li>
  );
};

const HighlightCard = () => (
  <section className="rounded-smooth border border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-800/40 p-6 shadow-card">
    <h3 className="mb-2 text-xl font-bold text-white">
      Current focus this semester
    </h3>
    <p className="max-w-3xl text-sm leading-relaxed text-white/75">
      Cybersoc is currently centred on the semester-long TryHackMe CTF series,
      the Game Off 2025 collaboration, and ongoing support for first-year
      modules. To see where you can plug in, explore{" "}
      <Link
        to="/projects"
        className="font-semibold text-cyan-300 underline underline-offset-4 decoration-cyan-500/50 hover:text-cyan-100"
      >
        Projects
      </Link>{" "}
      and{" "}
      <Link
        to="/events"
        className="font-semibold text-cyan-300 underline underline-offset-4 decoration-cyan-500/50 hover:text-cyan-100"
      >
        Events
      </Link>
      .
    </p>
  </section>
);

export default Home;
