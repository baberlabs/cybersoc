import { useEffect, useMemo, useState } from "react";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/data/resources.json");
        if (!res.ok) throw new Error("Failed to load resources");
        const data = await res.json();
        if (!cancelled) {
          setResources(Array.isArray(data) ? data : []);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError("Unable to load resources right now.");
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set();
    resources.forEach((r) => {
      if (r.category) set.add(r.category);
    });
    return Array.from(set);
  }, [resources]);

  const filtered = useMemo(() => {
    if (selectedCategory === "all") return resources;
    return resources.filter((r) => r.category === selectedCategory);
  }, [resources, selectedCategory]);

  return (
    <main className="container py-24 md:py-32 text-white">
      {/* Header */}
      <header className="mb-12 md:mb-16">
        <p className="mb-2 text-xs uppercase tracking-[0.14em] text-white/40">
          Learning hub
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          Resources
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/70">
          Curated material used across Cybersoc CTFs, workshops, and projects.
          Start with the beginner-friendly items, then branch into specialised
          areas such as web hacking, OSINT, reverse engineering, and blue-team
          operations.
        </p>
      </header>

      {/* Category filter */}
      {resources.length > 0 && categories.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold text-white/60">
            Filter by category
          </h2>
          <div className="flex flex-wrap gap-2">
            <FilterPill
              label="All"
              active={selectedCategory === "all"}
              onClick={() => setSelectedCategory("all")}
            />
            {categories.map((cat) => (
              <FilterPill
                key={cat}
                label={cat}
                active={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Content states */}
      {loading && <p className="text-lg text-white/60">Loading resources...</p>}

      {!loading && error && (
        <p className="inline-block rounded-md border border-red-500/30 bg-red-900/40 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      )}

      {!loading && !error && filtered.length === 0 && (
        <p className="text-lg text-white/60">
          No resources available yet in this category.
        </p>
      )}

      {!loading && !error && filtered.length > 0 && (
        <section aria-label="Resource list">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, index) => (
              <ResourceCard key={index} {...item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

/* Filter pill */

const FilterPill = ({ label, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide border transition ${
      active
        ? "border-white bg-white text-black"
        : "border-white/20 text-white/70 hover:bg-white/[0.06]"
    }`}
  >
    {label}
  </button>
);

/* Resource card */

const ResourceCard = ({
  title,
  description,
  link,
  linkText,
  category,
  level,
  kind,
}) => {
  return (
    <article className="flex flex-col justify-between rounded-smooth border border-white/10 bg-neutral-900/20 p-5 text-sm shadow-sm transition hover:bg-neutral-900/35">
      <div>
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-white/50">
          {category && (
            <span className="rounded-full border border-white/14 bg-white/5 px-2 py-0.5">
              {category}
            </span>
          )}
          {level && (
            <span className="rounded-full border border-white/14 px-2 py-0.5">
              {level}
            </span>
          )}
          {kind && (
            <span className="rounded-full border border-white/14 px-2 py-0.5">
              {kind}
            </span>
          )}
        </div>

        <h3 className="mb-2 text-base font-semibold text-white">{title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-white/70">
          {description}
        </p>
      </div>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-300 underline underline-offset-4 decoration-cyan-500/60 hover:text-cyan-100"
        >
          {linkText || "Open resource"}
          <span aria-hidden="true">↗</span>
        </a>
      )}
    </article>
  );
};

export default Resources;
