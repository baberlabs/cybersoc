import { Link, useParams } from "react-router-dom";
import { useBadge } from "../hooks/useBadge";
import { formatMonthYear } from "../lib/formatMonthYear";

const Badge = () => {
  const { awardId } = useParams();
  const { badge, award, error } = useBadge({ awardId });

  if (error) {
    return (
      <main id="main" className="container text-white max-w-5xl">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-[0.14em] text-white/40 mb-2">
            Error 404
          </p>
          <h1 className="text-4xl font-extrabold">Badge Not Found</h1>
          <p className="text-white/70 mt-4">{error}</p>
        </header>
      </main>
    );
  }

  if (!badge || !award) {
    return (
      <main id="main" className="container text-white max-w-5xl">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-[0.14em] text-white/40 mb-2">
            Badge Info
          </p>
          <h1 className="text-4xl font-extrabold">Loading...</h1>
          <p className="text-white/70 mt-4">
            Please wait while the badge data is being loaded.
          </p>
        </header>
      </main>
    );
  }

  return (
    <main id="main" className="container text-white max-w-5xl">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.14em] text-white/40 mb-2">
          Badge
        </p>
        <h1 className="text-4xl font-extrabold">{badge.name}</h1>
      </header>

      <section className="space-y-6 text-white/80">
        <p>
          This is to confirm that <strong>{award.recipient.name}</strong> has
          been awarded the <strong>{badge.name}</strong> badge.
        </p>

        <p className="p-2 bg-cyan-700">{badge.description}</p>

        <article className="flex flex-col border border-white/15">
          {[
            { field: "Recipient", value: award.recipient.name },
            { field: "Badge", value: badge.name },
            { field: "Issuer", value: badge.issuer },
            { field: "Description", value: badge.description },
            { field: "Criteria", value: badge.criteria },
            {
              field: "Event",
              value: { event: award.event.name, url: award.event.url },
            },
            { field: "Issue Date", value: formatMonthYear(award.issueDate) },
          ].map(({ field, value }) => (
            <BadgeInfoRow key={field} field={field} value={value} />
          ))}
        </article>

        <div className="mt-6 flex justify-center">
          <img
            src={badge.badge_image}
            alt={`Badge image for ${badge.name}`}
            className="size-50 md:size-60 lg:size-100 select-none pointer-events-none"
            draggable="false"
          />
        </div>
      </section>
    </main>
  );
};

const BadgeInfoRow = ({ field, value }) => {
  return (
    <div className="flex flex-row border-b border-white/15">
      <p className="w-[100px] border-r border-white/15 p-3 text-xs font-bold">
        {field}
      </p>
      <p className="p-3 text-xs">
        {field === "Event" ? (
          <Link
            to={value.url}
            className="text-xs font-semibold text-cyan-300 underline underline-offset-4 decoration-cyan-500/60 hover:text-cyan-100"
          >
            {value.event}
          </Link>
        ) : (
          value
        )}
      </p>
    </div>
  );
};

export default Badge;
