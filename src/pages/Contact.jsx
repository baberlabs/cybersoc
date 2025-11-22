import { useEffect, useState } from "react";
import { FaDiscord, FaInstagram, FaLinkedin } from "react-icons/fa6";

const ICON_MAP = {
  bcusu: "/icons/bcusu.svg",
  discord: FaDiscord,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
};

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [committee, setCommittee] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("/data/contacts.json").then((r) => r.json()),
      fetch("/data/committee.json").then((r) => r.json()),
    ]).then(([contactsData, committeeData]) => {
      setContacts(contactsData);
      setCommittee(committeeData);
    });
  }, []);

  return (
    <main className="container py-24 md:py-32 text-white">
      {/* Header */}
      <header className="mb-16">
        <p className="mb-2 text-xs uppercase tracking-[0.14em] text-white/40">
          Get in touch
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          Contact
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/70">
          Use these channels to join the society, access the community, and
          reach the committee. All official membership and most communication
          run through BCUSU and Discord.
        </p>
      </header>

      {/* Platforms */}
      <section className="mb-20 space-y-6">
        <h2 className="text-2xl font-bold text-white">Platforms</h2>
        <p className="max-w-xl text-sm leading-relaxed text-white/70">
          These are the official communication and membership routes for
          Cybersoc. Start with BCUSU for membership, then move into Discord for
          day-to-day activity.
        </p>

        <div className="grid gap-6 pt-2 sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((c) => (
            <ContactPlatformCard key={c.label} {...c} />
          ))}
        </div>
      </section>

      {/* Committee */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Committee</h2>
        <p className="max-w-xl text-sm leading-relaxed text-white/70">
          Current Cybersoc committee roles. Direct personal contact details and
          handles are intentionally kept within the Discord server for member
          privacy and safety.
        </p>

        <div className="grid gap-4 pt-2 sm:grid-cols-2 md:grid-cols-3">
          {committee.map((m) => (
            <CommitteeCard key={`${m.role}-${m.name}`} {...m} />
          ))}
        </div>
      </section>
    </main>
  );
};

/* Platform Card */

const ContactPlatformCard = ({ label, href }) => {
  const key = label.toLowerCase();
  const Icon = ICON_MAP[key];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-smooth border border-white/10 bg-neutral-900/20 p-5 text-sm shadow-sm transition hover:bg-neutral-900/40"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-neutral-800 transition group-hover:bg-neutral-700">
        {typeof Icon === "string" ? (
          <img
            src={Icon}
            alt={label}
            className="h-7 w-7 grayscale opacity-90"
            loading="lazy"
          />
        ) : (
          <Icon size={22} className="text-white" aria-hidden="true" />
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
      return "Main community server";
    case "instagram":
      return "Updates & events";
    case "linkedin":
      return "Professional posts";
    case "bcusu":
      return "Official membership";
    default:
      return "";
  }
}

/* Committee Card */

const CommitteeCard = ({ role, name }) => (
  <article className="rounded-smooth border border-white/10 bg-neutral-900/20 p-4 text-sm shadow-sm transition hover:bg-neutral-900/30">
    <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
      {role}
    </p>
    <p className="mt-1 text-sm font-medium text-white">{name}</p>
  </article>
);

export default Contact;
