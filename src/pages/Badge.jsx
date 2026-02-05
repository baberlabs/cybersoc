import { Link, useParams } from "react-router-dom";
import { useBadge } from "../hooks/useBadge";
import { formatMonthYear } from "../lib/formatMonthYear";

const Badge = () => {
  const { badgeId, recipientSlug } = useParams();
  const { badge, award, error } = useBadge({ badgeId, recipientSlug });

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

  const theadCellClass = "font-semibold p-4 text-xs border border-white/15";
  const tbodyCellClass = "p-4 text-xs border border-white/15";

  return (
    <main id="main" className="container text-white max-w-5xl">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.14em] text-white/40 mb-2">
          Badge
        </p>
        <h1 className="text-4xl font-extrabold">{badge.name}</h1>
      </header>

      {/* 
      
      - Recipient name
      - Recipient linkedin

      - Badge Name
      - Badge Issuer
      - Badge Description
      - Badge Criteria
      - Badge Image

      - Event
      - Issue date
      - Event URL
      
      */}

      <section className="space-y-6 text-white/80">
        <p>
          This is to confirm that <strong>{award.recipient.name}</strong> has
          been awarded the <strong>{badge.name}</strong> badge.
        </p>

        <p className="p-2 bg-cyan-700">{badge.description}</p>

        {/* <table className="border border-white/15 border-collapse">
        <thead>
          <tr>
            <td className={theadCellClass}>Recipient</td>
            <td className={theadCellClass}>Badge</td>
            <td className={theadCellClass}>Issuer</td>
            <td className={theadCellClass}>Description</td>
            <td className={theadCellClass}>Criteria</td>
            <td className={theadCellClass}>Event</td>
            <td className={theadCellClass}>Issue Date</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={tbodyCellClass}>{award.recipient.name}</td>
            <td className={tbodyCellClass}>{badge.name}</td>
            <td className={tbodyCellClass}>{badge.issuer}</td>
            <td className={tbodyCellClass}>{badge.description}</td>
            <td className={tbodyCellClass}>{badge.criteria}</td>
            <td className={tbodyCellClass}><Link to={award.event_url} className="text-xs font-semibold text-cyan-300 underline underline-offset-4 decoration-cyan-500/60 hover:text-cyan-100">{award.event}</Link></td>
            <td className={tbodyCellClass}>{formatMonthYear(award.issue_date)}</td>
          </tr>
        </tbody>
      </table> */}

        <article className="flex flex-col border border-white/15">
          {[
            { field: "Recipient", value: award.recipient.name },
            { field: "Badge", value: badge.name },
            { field: "Issuer", value: badge.issuer },
            { field: "Description", value: badge.description },
            { field: "Criteria", value: badge.criteria },
            {
              field: "Event",
              value: { event: award.event, url: award.event_url },
            },
            { field: "Issue Date", value: formatMonthYear(award.issue_date) },
          ].map(({ field, value }) => (
            <BadgeInfoRow key={field} field={field} value={value} />
          ))}
        </article>

        <div className="flex justify-center">
          <img
            src={badge.badge_image}
            alt={`Badge image for ${badge.name}`}
            className="size-100 select-none pointer-events-none"
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
