import { useEffect, useState } from "react";
import { FaGlobe, FaLinkedin } from "react-icons/fa6";
import { LuCalendarDays, LuClock3, LuMapPin } from "react-icons/lu";

const formatDate = (iso) => {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatRange = (start, end) => {
  if (!end || start === end) return formatDate(start);
  return `${formatDate(start)} – ${formatDate(end)}`;
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
  id,
  description,
  date_start,
  date_end,
  time,
  location,
  linkedin,
  other_link,
  other_link_text,
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
      id={id}
      className={`rounded-smooth border p-5 text-sm shadow-sm transition hover:-translate-y-px hover:border-white/25 ${colorClasses}`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <Badge variant={badgeVariant}>{badgeLabel}</Badge>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-white">{title}</h3>

      <div className="mb-4 space-y-1 text-white/70">
        <p className="flex items-center gap-2">
          <LuCalendarDays className="text-white/40" />
          {formatRange(date_start, date_end)}
        </p>

        {time && (
          <p className="flex items-center gap-2">
            <LuClock3 className="text-white/40" />
            {time}
          </p>
        )}

        <p className="flex items-center gap-2">
          <LuMapPin className="text-white/40" />
          {location}
        </p>
      </div>

      <p className="mb-4 text-white/80">{description}</p>

      {/* External Links */}

      {(linkedin?.trim() || other_link?.trim()) && (
        <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-white/50">
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

          {other_link?.trim() && (
            <a
              href={other_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-cyan-300 underline underline-offset-4 decoration-cyan-500/40 hover:text-cyan-100"
            >
              <FaGlobe size={12} />
              <span>{other_link_text || "Read More"}</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      )}
    </article>
  );
};

const EventsTOC = ({ nextEvent, ongoing, upcoming, groupedPast }) => {
  return (
    <aside className="hidden lg:block w-64 sticky top-28 mr-12 border-r border-white/10 pr-8">
      <p className="mb-3 text-xs uppercase tracking-[0.14em] text-white/40">
        Quick navigation
      </p>

      <nav className="space-y-6 text-sm">
        {/* Next Event */}
        {nextEvent && (
          <div>
            <p className="mb-1 font-semibold text-white/70">Next event</p>
            <ul>
              <li>
                <a
                  href={`#${nextEvent.id}`}
                  className="block pl-3 border-l border-transparent hover:text-cyan-300 hover:border-cyan-400/60 transition overflow-hidden whitespace-nowrap text-ellipsis"
                >
                  {nextEvent.title}
                </a>
              </li>
            </ul>
          </div>
        )}

        {/* Ongoing */}
        {ongoing.length > 0 && (
          <div>
            <p className="mb-1 font-semibold text-white/70">Happening now</p>
            <ul className="space-y-1">
              {ongoing.map((e) => (
                <li key={e.id}>
                  <a
                    href={`#${e.id}`}
                    className="block pl-3 border-l border-transparent hover:text-cyan-300 hover:border-cyan-400/60 transition overflow-hidden whitespace-nowrap text-ellipsis"
                  >
                    {e.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <div>
            <p className="mb-1 font-semibold text-white/70">Upcoming</p>
            <ul className="space-y-1">
              {upcoming.map((e) => (
                <li key={e.id}>
                  <a
                    href={`#${e.id}`}
                    className="block pl-3 border-l border-transparent hover:text-cyan-300 hover:border-cyan-400/60 transition overflow-hidden whitespace-nowrap text-ellipsis"
                  >
                    {e.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Past */}
        {groupedPast.length > 0 && (
          <div>
            <p className="mb-1 font-semibold text-white/70">Past events</p>

            <ul className="space-y-3">
              {groupedPast.map(([month, items]) => (
                <li key={month}>
                  <p className="text-white/40 text-xs mb-1">{month}</p>
                  <ul className="space-y-1">
                    {items.map((e) => (
                      <li key={e.id}>
                        <a
                          href={`#${e.id}`}
                          className="block pl-3 border-l border-transparent hover:text-cyan-300 hover:border-cyan-400/60 transition overflow-hidden whitespace-nowrap text-ellipsis"
                        >
                          {e.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </aside>
  );
};

const MobileEventsTOC = ({ nextEvent, ongoing, upcoming, groupedPast }) => {
  const [open, setOpen] = useState(false);

  const Section = ({ label, children }) =>
    children && (
      <div className="space-y-1">
        <p className="font-semibold text-white/70 mb-1">{label}</p>
        {children}
      </div>
    );

  return (
    <div className="lg:hidden mb-10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full rounded-smooth border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white flex justify-between"
      >
        Jump to event
        <span>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="mt-3 rounded-smooth border border-white/10 bg-white/[0.03] p-4 space-y-6 text-sm">
          {/* Next */}
          {nextEvent && (
            <Section label="Next event">
              <a
                href={`#${nextEvent.id}`}
                onClick={() => setOpen(false)}
                className="block py-1 text-white/80 hover:text-cyan-300"
              >
                {nextEvent.title}
              </a>
            </Section>
          )}

          {/* Ongoing */}
          {ongoing.length > 0 && (
            <Section label="Happening now">
              <ul className="space-y-1">
                {ongoing.map((e) => (
                  <li key={e.id}>
                    <a
                      href={`#${e.id}`}
                      onClick={() => setOpen(false)}
                      className="block py-1 text-white/80 hover:text-cyan-300"
                    >
                      {e.title}
                    </a>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Upcoming */}
          {upcoming.length > 0 && (
            <Section label="Upcoming">
              <ul className="space-y-1">
                {upcoming.map((e) => (
                  <li key={e.id}>
                    <a
                      href={`#${e.id}`}
                      onClick={() => setOpen(false)}
                      className="block py-1 text-white/80 hover:text-cyan-300"
                    >
                      {e.title}
                    </a>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Past */}
          {groupedPast.length > 0 && (
            <Section label="Past events">
              {groupedPast.map(([month, items]) => (
                <div key={month} className="mb-2">
                  <p className="text-white/50 text-xs mb-1">{month}</p>
                  <ul className="space-y-1">
                    {items.map((e) => (
                      <li key={e.id}>
                        <a
                          href={`#${e.id}`}
                          onClick={() => setOpen(false)}
                          className="block py-1 text-white/80 hover:text-cyan-300"
                        >
                          {e.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Section>
          )}
        </div>
      )}
    </div>
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
    (e) => !e.ongoing && new Date(e.date_start + "T00:00:00") > now
  );

  const past = events.filter(
    (e) => !e.ongoing && new Date(e.date_start + "T00:00:00") < now
  );

  const nextEvent =
    upcoming.length > 0
      ? upcoming.reduce((soonest, e) => {
          const d = new Date(e.date_start + "T00:00:00");
          const s = new Date(soonest.date_start + "T00:00:00");
          return d < s ? e : soonest;
        })
      : null;

  const upcomingWithoutNext = upcoming.filter((e) => e.id !== nextEvent?.id);

  const groupedPast = (() => {
    const groups = {};
    past.forEach((e) => {
      const d = new Date(e.date_start + "T00:00:00");
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
    <main id="main" className="container">
      <header className="mb-10">
        <p className="mb-2 text-xs uppercase tracking-[0.14em] text-white/40">
          Calendar
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          Events
        </h1>
        <p className="mt-4 max-w-5xl text-lg leading-relaxed text-white/70">
          A mix of workshops, CTFs, meetups, collaborations, and awareness days
          across the academic year.
        </p>
      </header>

      {/* Mobile TOC */}
      <MobileEventsTOC
        nextEvent={nextEvent}
        ongoing={ongoing}
        upcoming={upcomingWithoutNext}
        groupedPast={groupedPast}
      />

      <div className="flex">
        {/* Desktop TOC */}
        <EventsTOC
          nextEvent={nextEvent}
          ongoing={ongoing}
          upcoming={upcomingWithoutNext}
          groupedPast={groupedPast}
        />

        {/* Main content */}
        <div className="flex-1 space-y-20">
          {/* Next Event */}
          {nextEvent && (
            <section className="mb-20" id={nextEvent.id}>
              <h2 className="mb-3 flex items-center gap-2 text-2xl font-bold text-white">
                <LuClock3 className="text-yellow-300" />
                Next event
              </h2>
              <EventCard {...nextEvent} variant="upcoming" />
            </section>
          )}

          {/* Ongoing */}
          <section className="mb-20">
            <h2 className="mb-3 text-2xl font-bold text-white">
              Happening now
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {ongoing.length === 0 ? (
                <p className="text-white/60">
                  No ongoing activities at the moment.
                </p>
              ) : (
                ongoing.map((e) => (
                  <EventCard key={e.id} {...e} variant="ongoing" />
                ))
              )}
            </div>
          </section>

          {/* Upcoming */}
          <section className="mb-20">
            <h2 className="mb-3 text-2xl font-bold text-white">
              Upcoming events
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {upcomingWithoutNext.length === 0 ? (
                <p className="text-white/60">No additional upcoming events.</p>
              ) : (
                upcomingWithoutNext.map((e) => (
                  <EventCard key={e.id} {...e} variant="upcoming" />
                ))
              )}
            </div>
          </section>

          {/* Past */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-white">Past events</h2>

            <div className="space-y-10">
              {groupedPast.map(([month, items]) => (
                <div key={month}>
                  <h3 className="mb-3 text-base font-semibold text-white/75">
                    {month}
                  </h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    {items.map((e) => (
                      <EventCard key={e.id} {...e} variant="past" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Events;
