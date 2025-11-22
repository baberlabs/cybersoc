import { useEffect, useState } from "react";
import { LuCalendarDays, LuClock3, LuMapPin } from "react-icons/lu";

const formatDate = (iso) => {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const Badge = ({ variant, children }) => {
  const style =
    variant === "ongoing"
      ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
      : variant === "upcoming"
      ? "border-yellow-400/30 bg-yellow-400/10 text-yellow-200"
      : "border-white/20 bg-white/5 text-white/60";

  return (
    <span
      className={`inline-block rounded-md border px-2 py-0.5 text-xs font-semibold ${style}`}
    >
      {children}
    </span>
  );
};

const EventCard = ({
  title,
  description,
  date,
  location,
  link,
  linkText,
  variant,
}) => {
  const colorClasses =
    variant === "ongoing"
      ? "border-cyan-400/25 bg-cyan-400/[0.03]"
      : variant === "upcoming"
      ? "border-yellow-400/25 bg-yellow-400/[0.03]"
      : "border-white/10 bg-white/[0.02]";

  const badgeLabel =
    variant === "ongoing"
      ? "Happening now"
      : variant === "upcoming"
      ? "Upcoming"
      : "Completed";

  const badgeVariant =
    variant === "ongoing"
      ? "ongoing"
      : variant === "upcoming"
      ? "upcoming"
      : "past";

  return (
    <article
      className={`rounded-smooth border p-5 text-sm shadow-sm transition hover:-translate-y-[1px] hover:border-white/25 ${colorClasses}`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <Badge variant={badgeVariant}>{badgeLabel}</Badge>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-white">{title}</h3>

      <div className="mb-4 space-y-1 text-white/70">
        <p className="flex items-center gap-2">
          <LuCalendarDays className="text-white/40" />
          {date}
        </p>
        <p className="flex items-center gap-2">
          <LuMapPin className="text-white/40" />
          {location}
        </p>
      </div>

      <p className="mb-4 text-white/80">{description}</p>

      {link && link.trim() !== "" && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-cyan-300 underline underline-offset-4 decoration-cyan-500/60 hover:text-cyan-100"
        >
          {linkText || "Learn more"}
        </a>
      )}
    </article>
  );
};

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/data/events.json")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  const now = new Date();

  const ongoing = events.filter((e) => e.ongoing);
  const upcoming = events.filter(
    (e) => !e.ongoing && new Date(e.date + "T00:00:00") > now
  );
  const past = events.filter(
    (e) => !e.ongoing && new Date(e.date + "T00:00:00") < now
  );

  const nextEvent =
    upcoming.length > 0
      ? upcoming.reduce((soonest, e) => {
          const d = new Date(e.date + "T00:00:00");
          const s = new Date(soonest.date + "T00:00:00");
          return d < s ? e : soonest;
        })
      : null;

  const upcomingWithoutNext = upcoming.filter(
    (e) => e.title !== nextEvent?.title
  );

  const groupedPast = (() => {
    const groups = {};
    past.forEach((e) => {
      const d = new Date(e.date + "T00:00:00");
      const label = d.toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
      });
      if (!groups[label]) groups[label] = [];
      groups[label].push(e);
    });
    return Object.entries(groups).sort(([a], [b]) => new Date(b) - new Date(a));
  })();

  return (
    <main className="container py-24 md:py-32">
      <header className="mb-10">
        <p className="mb-2 text-xs uppercase tracking-[0.14em] text-white/40">
          Calendar
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          Events
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/70">
          A mix of workshops, CTFs, meetups, collaborations, and awareness days
          across the academic year. Use this page to see what&apos;s running
          now, what&apos;s next, and what we&apos;ve already delivered.
        </p>
      </header>

      {/* Next Event */}
      {nextEvent && (
        <section className="mb-20">
          <h2 className="mb-3 flex items-center gap-2 text-2xl font-bold text-white">
            <LuClock3 className="text-yellow-300" />
            Next event
          </h2>
          <EventCard
            {...nextEvent}
            date={formatDate(nextEvent.date)}
            variant="upcoming"
          />
        </section>
      )}

      {/* Ongoing */}
      <section className="mb-20">
        <h2 className="mb-3 text-2xl font-bold text-white">Happening now</h2>
        <p className="mb-6 max-w-2xl text-sm text-white/65">
          Long-running streams such as semester-long CTF series or recurring
          meets that you can join at almost any point.
        </p>

        {ongoing.length === 0 ? (
          <p className="text-white/60">No ongoing activities at the moment.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {ongoing.map((e) => (
              <EventCard
                key={e.title}
                {...e}
                date={formatDate(e.date)}
                variant="ongoing"
              />
            ))}
          </div>
        )}
      </section>

      {/* Upcoming (excluding next) */}
      <section className="mb-20">
        <h2 className="mb-3 text-2xl font-bold text-white">Upcoming events</h2>
        <p className="mb-6 max-w-2xl text-sm text-white/65">
          One-off events, sessions, or collaborations scheduled later in the
          term.
        </p>

        {upcomingWithoutNext.length === 0 ? (
          <p className="text-white/60">No additional upcoming events.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {upcomingWithoutNext.map((e) => (
              <EventCard
                key={e.title}
                {...e}
                date={formatDate(e.date)}
                variant="upcoming"
              />
            ))}
          </div>
        )}
      </section>

      {/* Past events */}
      <section>
        <h2 className="mb-4 text-2xl font-bold text-white">Past events</h2>
        <p className="mb-6 max-w-2xl text-sm text-white/65">
          Previous stalls, awareness days, and event series. Useful for showing
          history and impact to new members and partners.
        </p>

        <div className="space-y-10">
          {groupedPast.map(([month, items]) => (
            <div key={month}>
              <h3 className="mb-3 text-base font-semibold text-white/75">
                {month}
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                {items.map((e) => (
                  <EventCard
                    key={e.title}
                    {...e}
                    date={formatDate(e.date)}
                    variant="past"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Events;
