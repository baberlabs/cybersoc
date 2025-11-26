import { useEffect, useState } from "react";
import fm from "front-matter";
import { Link } from "react-router-dom";
import { LuCalendarDays } from "react-icons/lu";

const formatDate = (iso) => {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function Blogs() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/blogs.json")
      .then((res) => res.json())
      .then(async (list) => {
        const loaded = await Promise.all(
          list.map(async (entry) => {
            const raw = await fetch(`/data/blogs/${entry.file}`).then((r) =>
              r.text()
            );
            const parsed = fm(raw);

            return {
              id: entry.id,
              ...parsed.attributes,
            };
          })
        );

        loaded.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(loaded);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="container text-white">
        <p className="opacity-70">Loading posts…</p>
      </main>
    );
  }

  return (
    <main id="main" className="container text-white">
      {/* HEADER */}
      <header className="mb-16">
        <p className="mb-3 text-xs uppercase tracking-[0.16em] text-white/40">
          Cybersoc Blog
        </p>

        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          Articles & Write-ups
        </h1>

        <p className="mt-5 max-w-5xl text-lg text-white/70 leading-relaxed">
          Technical deep dives, project documentation, architecture decisions,
          and student engineering workflows from the BCU Cyber Security Society.
        </p>
      </header>

      {/* GRID */}
      <section className="grid gap-10 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.id}`}
            className="
              group block overflow-hidden rounded-xl 
              bg-white/5 border border-white/10 
              hover:bg-white/10 hover:border-white/20 
              transition-all duration-200 
              hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30
            "
          >
            {/* BANNER */}
            {post.banner && (
              <div className="overflow-hidden">
                <img
                  src={post.banner}
                  alt=""
                  className="
                    h-48 w-full object-cover 
                    border-b border-white/10 
                    transition-transform duration-300 
                    group-hover:scale-[1.03]
                  "
                />
              </div>
            )}

            {/* CONTENT */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-white/90">
                {post.title}
              </h2>

              <div className="mb-3 flex items-center gap-4 text-xs text-white/50">
                <span className="flex items-center gap-1">
                  <LuCalendarDays className="text-white/40" />
                  {formatDate(post.date)}
                </span>
                <span>{post.reading_time}</span>
              </div>

              <p className="text-white/70 text-sm leading-relaxed">
                {post.excerpt || "A Cybersoc blog post."}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
