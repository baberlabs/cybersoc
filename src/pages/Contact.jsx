import { useEffect, useState, useMemo } from "react";
import { FaDiscord, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { useSocietyData } from "../hooks/useSocietyData";

const ICON_MAP = {
  bcusu: "/icons/bcusu.svg",
  discord: FaDiscord,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
};

const Contact = () => {
  const [contacts, setContacts] = useState([]);

  const { people, roles, committee } = useSocietyData();

  // Load platform links
  useEffect(() => {
    fetch("/data/contacts.json")
      .then((r) => r.json())
      .then((data) => setContacts(data || []))
      .catch(() => setContacts([]));
  }, []);

  // ---------- Derived committee data ----------

  const { members, vacantRoles, futureInternal } = useMemo(() => {
    if (!people || !roles || !committee) {
      return { members: [], vacantRoles: [] };
    }

    const roleById = Object.fromEntries(roles.map((r) => [r.id, r]));
    const personById = Object.fromEntries(people.map((p) => [p.id, p]));

    // personId -> { person, roles: Role[] }
    const personRoleMap = {};

    committee.forEach((assignment) => {
      const person = personById[assignment.person];
      const role = roleById[assignment.role];
      if (!person || !role) return;

      if (!personRoleMap[person.id]) {
        personRoleMap[person.id] = { person, roles: [] };
      }
      personRoleMap[person.id].roles.push(role);
    });

    // Sort roles by priority for each member
    const sortRoles = (roleList) =>
      [...roleList].sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));

    let membersArr = Object.values(personRoleMap).map((entry) => ({
      person: entry.person,
      roles: sortRoles(entry.roles),
    }));

    // Vacant roles = roles that do not appear in any assignment
    const assignedRoleIds = new Set(committee.map((a) => a.role));
    const vacant = roles.filter(
      (r) => !assignedRoleIds.has(r.id) && !r.placeholder
    );

    const futureInternal = roles.filter((r) => r.placeholder);
    return {
      members: membersArr,
      vacantRoles: vacant,
      futureInternal: futureInternal,
    };
  }, [people, roles, committee]);

  return (
    <main id="main" className="container text-white flex flex-col gap-20">
      {/* ------------------------------------------------------------------ */}
      {/* HEADER                                                             */}
      {/* ------------------------------------------------------------------ */}
      <header className="max-w-5xl">
        <p className="mb-2 text-xs uppercase tracking-[0.14em] text-white/40">
          Get in touch
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          Contact
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-white/70">
          Use this page to join the society, find the right channel for your
          question, or see who&apos;s currently running Cybersoc.
        </p>
        <p className="mt-2 text-sm text-white/55">
          If you&apos;re a student, start with{" "}
          <span className="text-white">BCUSU</span> and{" "}
          <span className="text-white">Discord</span>. If you&apos;re staff,
          industry, or a parent, the committee section shows who to contact
          about collaborations, talks, or support.
        </p>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* PLATFORMS                                                          */}
      {/* ------------------------------------------------------------------ */}
      <section className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Platforms</h2>
          <p className="text-sm leading-relaxed text-white/70">
            These are the official communication and membership routes for
            Cybersoc. For most students, the typical flow is:
          </p>
          <ol className="mt-2 space-y-1 text-sm text-white/70 list-decimal list-inside">
            <li>Join as a member via BCUSU.</li>
            <li>Join the Discord server for announcements and help.</li>
            <li>Use LinkedIn and Instagram to keep up with public activity.</li>
          </ol>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {contacts.map((c) => (
            <ContactPlatformCard key={c.label} {...c} />
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* COMMITTEE                                                          */}
      {/* ------------------------------------------------------------------ */}
      <section className="space-y-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Committee</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              The current student-led team running Cybersoc. These are the
              people responsible for events, projects, operations, and
              communication during the academic year.
            </p>
          </div>

          {members.length > 0 && (
            <p className="text-xs text-white/50">
              {members.length} committee member
              {members.length > 1 ? "s" : ""} listed
            </p>
          )}
        </div>

        {/* Members grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {members.map(({ person, roles }) => (
            <CommitteeCard
              key={person.id}
              name={person.name}
              linkedin={person.linkedin}
              roles={roles.map((r) => r.title)}
            />
          ))}
        </div>

        {(vacantRoles.length > 0 || futureInternal.length > 0) && (
          <section className="mt-12 border-t border-white/10 pt-6 space-y-6">
            {vacantRoles.length > 0 && (
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-wide text-white/70">
                  Currently open roles
                </p>

                <div className="flex flex-wrap gap-2">
                  {vacantRoles.map((r) => (
                    <span
                      key={r.id}
                      className="text-[11px] text-white/80 underline underline-offset-4 decoration-white/20"
                    >
                      {r.title}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-[11px] text-white/50">
                  Recruitment notices are shared via Discord and BCUSU.
                </p>
              </div>
            )}

            {futureInternal.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-white/50">
                  Future internal roles
                </p>

                <p className="text-[11px] text-white/45 max-w-prose">
                  Additional internal positions will be defined later in the
                  academic year based on the society’s technical and operational
                  needs.
                </p>
              </div>
            )}
          </section>
        )}

        <p className="text-sm text-white/60">
          Our community standards, safeguarding rules, and ethical policies are
          publicly available under
          <a href="/governance" className="ml-1 text-cyan-300 underline">
            Governance
          </a>
          .
        </p>
      </section>
    </main>
  );
};

/* -------------------------------------------------------------------------- */
/* PLATFORM CARD                                                              */
/* -------------------------------------------------------------------------- */

const ContactPlatformCard = ({ label, href }) => {
  const key = label.toLowerCase();
  const Icon = ICON_MAP[key];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-smooth border border-white/10 bg-neutral-900/40 p-4 text-sm shadow-sm transition hover:bg-neutral-900/70"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-md bg-neutral-800/80 transition group-hover:bg-neutral-700">
        {typeof Icon === "string" ? (
          <img
            src={Icon}
            alt={label}
            className="h-7 w-7 grayscale opacity-90"
            loading="lazy"
          />
        ) : (
          <Icon size={20} className="text-white" aria-hidden="true" />
        )}
      </div>

      <div className="flex flex-col">
        <span className="font-semibold text-white">{label}</span>
        <span className="text-xs text-white/55">
          {getPlatformDescription(label)}
        </span>
      </div>
    </a>
  );
};

function getPlatformDescription(label) {
  switch (label.toLowerCase()) {
    case "discord":
      return "Main community server and announcements";
    case "instagram":
      return "Event highlights and quick updates";
    case "linkedin":
      return "Professional posts and public activity";
    case "bcusu":
      return "Official membership and society admin";
    default:
      return "";
  }
}

/* -------------------------------------------------------------------------- */
/* COMMITTEE CARD                                                             */
/* -------------------------------------------------------------------------- */

const CommitteeCard = ({ name, linkedin, roles }) => {
  const hasLinkedIn = Boolean(linkedin);

  return (
    <article className="flex flex-col rounded-smooth border border-white/10 bg-neutral-900/40 p-4 text-sm shadow-sm transition hover:bg-neutral-900/70">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-white">
          {name || "Vacant position"}
        </h3>

        {hasLinkedIn && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`LinkedIn profile of ${name}`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <FaLinkedin size={18} />
          </a>
        )}
      </div>

      <ul className="mb-2 flex flex-wrap gap-2">
        {roles.map((role) => (
          <li
            key={role}
            className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[11px] text-white/75"
          >
            {role}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default Contact;
