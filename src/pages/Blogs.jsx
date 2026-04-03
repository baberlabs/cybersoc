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
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadPosts = async () => {
      try {
        const res = await fetch("/data/blogs.json");
        if (!res.ok) {
          throw new Error(`Failed to load blog index (HTTP ${res.status})`);
        }

        const list = await res.json();
        const loaded = await Promise.all(
          list.map(async (entry) => {
            const blogRes = await fetch(`/data/blogs/${entry.file}`);
            if (!blogRes.ok) {
              throw new Error(
                `Failed to load ${entry.file} (HTTP ${blogRes.status})`,
              );
            }

            const raw = await blogRes.text();
            const parsed = fm(raw);

            return {
              id: entry.id,
              ...parsed.attributes,
            };
          }),
        );

        loaded.sort((a, b) => new Date(b.date) - new Date(a.date));

        if (!cancelled) {
          setPosts(loaded);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load posts right now.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadPosts();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <main id="main" className="container text-white">
        <p className="opacity-70" role="status" aria-live="polite">
          Loading posts…
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main id="main" className="container text-white">
        <h1 className="text-4xl font-extrabold">Unable to Load Blog Posts</h1>
        <p className="mt-4 max-w-3xl text-white/75">{error}</p>
      </main>
    );
  }

  return (
    <main id="main" className="container text-white">
      {/* HEADER */}
      <header className="page-header mb-16">
        <p className="page-kicker">Cybersoc Blog</p>

        <h1 className="page-title">Articles & Write-ups</h1>

        <p className="page-intro mt-5">
          Notes from our builds, lessons learned, and technical write-ups from
          students in the BCU Cyber Security Society.
        </p>
      </header>

      {/* GRID */}
      <section className="grid gap-10 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.id}`}
            className="
              ui-card ui-card-hover group block overflow-hidden rounded-xl
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
                  alt={`${post.title} banner image`}
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

              <div className="mb-3 flex items-center gap-4 text-xs text-white/60">
                <span className="flex items-center gap-1">
                  <LuCalendarDays className="text-white/60" />
                  {formatDate(post.date)}
                </span>
                <span>{post.reading_time}</span>
              </div>

              <p className="text-sm leading-relaxed text-white/75">
                {post.excerpt || "A Cybersoc blog post."}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
