import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fm from "front-matter";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { LuCalendarDays } from "react-icons/lu";

const formatDate = (iso) => {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadPost = async () => {
      try {
        const indexRes = await fetch("/data/blogs.json");
        if (!indexRes.ok) {
          throw new Error(
            `Failed to load blog index (HTTP ${indexRes.status})`,
          );
        }

        const list = await indexRes.json();
        const entry = list.find((p) => p.id === id);
        if (!entry) {
          if (!cancelled) {
            setPost(null);
          }
          return;
        }

        const postRes = await fetch(`/data/blogs/${entry.file}`);
        if (!postRes.ok) {
          throw new Error(
            `Failed to load ${entry.file} (HTTP ${postRes.status})`,
          );
        }

        const raw = await postRes.text();
        const parsed = fm(raw);
        const htmlContent = marked.parse(parsed.body);
        const safeHtml = DOMPurify.sanitize(htmlContent);

        if (!cancelled) {
          setPost({
            ...parsed.attributes,
            content: parsed.body,
          });
          setHtml(safeHtml);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load post.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadPost();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <main id="main" className="container text-white">
        <p className="opacity-70" role="status" aria-live="polite">
          Loading post…
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main id="main" className="container text-white">
        <h1 className="text-5xl font-bold">Unable to Load Post</h1>
        <p className="mt-4 max-w-3xl text-white/75">{error}</p>
      </main>
    );
  }

  if (!post) {
    return (
      <main id="main" className="container text-white">
        <h1 className="text-5xl font-bold">Post not found</h1>
      </main>
    );
  }

  return (
    <main id="main" className="container text-white">
      <article className="max-w-9xl mx-auto">
        <header className="page-header">
          <p className="page-kicker">Cybersoc Blog</p>

          <h1 className="page-title leading-tight">{post.title}</h1>

          <div className="mt-4 flex items-center gap-5 text-sm text-white/70">
            <span className="flex items-center gap-1">
              <LuCalendarDays className="text-white/60" />
              {formatDate(post.date)}
            </span>
            <span>• {post.reading_time}</span>
            <span>• By {post.author}</span>
          </div>

          {post.banner && (
            <img
              src={post.banner}
              alt={`${post.title} banner image`}
              className="mt-8 w-full max-w-9xl rounded-smooth border border-white/10 object-cover"
            />
          )}
        </header>

        <section
          className="prose prose-invert max-w-9xl"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </main>
  );
}
