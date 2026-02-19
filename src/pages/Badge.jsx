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
        <p className="text-xs uppercase tracking-[0.14em] text-white/40 mb-2 flex flex-row gap-x-2">
          Badge{" "}
          {award.credential_id && <p>(Credential ID {award.credential_id})</p>}
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

        <Link
          to="/guide/add-badge-to-linkedin-profile"
          className="text-xs font-semibold text-cyan-300 underline underline-offset-4 decoration-cyan-500/60 hover:text-cyan-100"
        >
          Read this guide on how to add a digital badge to your LinkedIn
          profile.
        </Link>

        <BadgeImageDownload badge={badge} />
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

const BadgeImageDownload = ({ badge }) => {
  return (
    <div className="mt-6 w-fit group">
      <div className="relative rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur-sm shadow-lg transition-all duration-300 group-hover:shadow-cyan-400/20 group-hover:border-cyan-400/40">
        {/* Badge Container */}
        <div className="p-6 md:p-8 lg:p-10 flex items-center justify-center">
          <img
            src={badge.badge_image}
            alt={`Badge image for ${badge.name}`}
            className="w-52 md:w-64 lg:w-72 transition-transform duration-300 group-hover:scale-105"
            draggable="false"
          />
        </div>

        {/* Download Button */}
        <a
          href={badge.badge_image}
          download={`${badge.name.replace(/\s+/g, "-").toLowerCase()}.png`}
          className="block text-center rounded-b-2xl bg-cyan-400 text-black font-semibold py-3 text-sm tracking-wide transition-all duration-200 hover:bg-cyan-300 active:scale-[0.98]"
        >
          Download Badge Image
        </a>
      </div>
    </div>
  );
};

export default Badge;
