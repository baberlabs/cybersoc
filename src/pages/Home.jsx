import { Link } from "react-router-dom";
import ThisSemester from "../components/ThisSemester";
import { useEffect, useState } from "react";

const Home = () => {
  const [stats, setStats] = useState({
    active: 0,
    completed: 0,
  });

  useEffect(() => {
    let cancelled = false;

    fetch("/data/projects.json")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load projects");
        return r.json();
      })
      .then((projects) => {
        if (cancelled || !Array.isArray(projects)) return;

        const counts = projects.reduce(
          (acc, p) => {
            const status = p.status ?? "unknown";

            if (status === "in-progress") acc.active += 1;
            else if (status === "completed") acc.completed += 1;

            return acc;
          },
          { active: 0, completed: 0 }
        );

        setStats(counts);
      })
      .catch((err) => {
        console.error("Project stats failed:", err);
        setStats({ active: 0, completed: 0 });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main id="main" className="container text-white flex flex-col gap-20">
      {/* HERO */}
      <section className="flex flex-col lg:flex-row justify-between space-y-10 lg:space-y-0 lg:space-x-20">
        {/* Left: Core pitch */}
        <div className="space-y-8 max-w-xl">
          {/* Badge & Headings */}
          <header className="space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Student-led Cyber Security Society · Birmingham City University
            </p>

            <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
              Cybersoc
            </h1>

            <h2 className="text-2xl text-white/80 md:text-3xl">
              Do cyber security, not just hear about it.
            </h2>
          </header>

          {/* Main pitch */}
          <p className="max-w-xl text-lg leading-relaxed text-white/80">
            Cybersoc is BCU&apos;s technical cyber security society. Each week
            you work on real security tasks, practical projects, and structured
            support that fit your level — from first year to master&apos;s and
            placement students. You leave with skills, evidence, and people who
            can vouch for you.
          </p>

          {/* CTAs */}
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
            <CTAButton to="/events" label="View events" variant="ghost" />
          </div>

          {/* Stats */}
          <dl className="mt-6 flex flex-row gap-2">
            <StatCard label="Total members (as of Nov 2025)" value="125+" />
            <StatCard label="Active projects" value={stats.active} />
            <StatCard label="Completed projects" value={stats.completed} />
          </dl>
        </div>

        {/* Right: Semester activity */}
        <ThisSemester />
      </section>

      {/* CMA & Ethics Banner (RecNine) */}
      <section className="rounded-md border border-red-400/20 bg-red-500/5 p-4 text-sm text-red-200">
        <strong className="font-semibold text-red-300">
          Legal & Ethical Notice:
        </strong>{" "}
        All security tasks, CTF challenges, and tools used in Cybersoc sessions
        must be performed only on systems you own or have explicit permission to
        test. Activities follow the Computer Misuse Act 1990 and BCU/BCUSU
        policies.
      </section>

      {/* WHAT YOU'LL DO */}
      <section>
        <h2 className="mb-3 text-3xl font-bold">
          What you&apos;ll actually do
        </h2>

        <p className="mb-8 text-white/70 max-w-5xl">
          Sessions feel like a quiet, focused workshop. You pick a task that
          fits your level, work through it at your own pace, and get help when
          you need it. No spotlight, no performance — just steady progress in
          real security work.
        </p>

        {/* Core weekly experience */}
        <div className="grid gap-6 md:grid-cols-3">
          <InfoCard
            title="Solve real security tasks"
            text="Work through structured CTF-style exercises in OSINT, forensics, web security, reverse engineering, and blue/red team basics. Everything is explained, tiered by difficulty, and designed so first years and advanced students both have something useful to do."
          />
          <InfoCard
            title="Build and ship useful things"
            text="Contribute to real projects like the Cybersoc website, P4sspl01t, and Game Off security work. You help design tools, scripts, and features that the society actively uses, and you leave with clean, portfolio-ready GitHub contributions."
          />
          <InfoCard
            title="Improve faster with peer support"
            text="You work alongside people solving similar problems, trading ideas, and helping each other debug. Committee members and experienced students circulate, unblock you, and show how they think through problems step by step."
          />
        </div>

        {/* Stages */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <InfoCard
            title="If you're just starting"
            text="You get clear beginner tracks with guided tasks, simple language, and no assumption of prior experience. You can focus on understanding the basics, asking questions, and building confidence."
          />
          <InfoCard
            title="If you're more advanced"
            text="You take on harder RE, debugging, and secure-coding work, help shape projects, and mentor others. The society becomes a place to deepen your toolkit, prepare for placements and grad roles, and practise explaining complex ideas clearly."
          />
          <InfoCard
            title="If you're on placement or postgrad"
            text="You stay sharp by contributing to ongoing tools and security analysis, drop into sessions when you can, and help steer more realistic workflows."
          />
        </div>
      </section>

      {/* HOW TO JOIN */}
      <section>
        <h2 className="mb-3 text-3xl font-bold">How to get started</h2>
        <p className="mb-8 text-white/70">
          Follow these steps and you&apos;ll be connected to events, projects,
          and support.
        </p>

        <ol className="grid gap-6 md:grid-cols-4 text-sm">
          <StepCard
            step="01"
            title="Join on BCUSU"
            body="Become an official member through the Students’ Union page. This keeps the society recognised and funded."
            href="https://www.bcusu.com/organisation/24254/"
            linkText="Open BCUSU page"
          />
          <StepCard
            step="02"
            title="Join Discord"
            body="Use the invite after you sign up. All announcements, help, and project coordination run through the server."
            href="https://discord.com/invite/3HcCg7sCqz"
            linkText="Open Discord"
          />
          <StepCard
            step="03"
            title="Come to a session"
            body="Turn up to a weekly meet, pick a beginner or advanced task, and settle in."
            href="/events"
            linkText="See events"
          />
          <StepCard
            step="04"
            title="Pick your track"
            body="Choose a mix of CTF paths, projects, and resources that match your goals: stronger grades, better CV, or deeper security skills."
            href="/resources"
            linkText="Browse resources"
          />
        </ol>
      </section>

      {/* STAFF / PARENTS / PARTNERS */}
      <section>
        <h2 className="mb-3 text-3xl font-bold">
          For staff, parents, and partners
        </h2>
        <p className="mb-6 text-white/70">
          Cybersoc is run to be safe, structured, and useful alongside academic
          study — not in competition with it.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <InfoCard
            title="Academic alignment"
            text="Activities reinforce core computing skills: problem-solving, programming practice, and security thinking. Sessions are designed to sit alongside modules without adding pressure."
          />
          <InfoCard
            title="Professional development"
            text="Students build tangible artefacts: tools, write-ups, documentation, and repositories. This gives employers concrete evidence of skill beyond grades."
          />
          <InfoCard
            title="Safe, inclusive environment"
            text="Events follow BCUSU policies and are managed by an elected committee. Communication runs through monitored channels, with a focus on learning, collaboration, and respectful behaviour."
          />
        </div>
      </section>
    </main>
  );
};

/* Helper Components */

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

const StatCard = ({ label, value }) => (
  <div className="rounded-md border border-white/10 bg-white/3 p-3 shadow-sm w-fit">
    <dd className="text-xl font-semibold text-white/70">{value}</dd>
    <dt className="text-[10px] uppercase tracking-widest text-white/50 mt-0.5">
      {label}
    </dt>
  </div>
);

const InfoCard = ({ title, text }) => (
  <article className="rounded-smooth border border-white/10 bg-white/[0.02] p-5 shadow-sm transition-colors hover:bg-white/[0.06]">
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
      <p className="flex-1 text-sm leading-relaxed text-white/70">{body}</p>
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

export default Home;
