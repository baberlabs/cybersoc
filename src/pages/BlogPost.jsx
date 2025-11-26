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

  useEffect(() => {
    fetch("/data/blogs.json")
      .then((res) => res.json())
      .then((list) => {
        const entry = list.find((p) => p.id === id);
        if (!entry) {
          setLoading(false);
          return;
        }

        return fetch(`/data/blogs/${entry.file}`)
          .then((res) => res.text())
          .then((raw) => {
            const parsed = fm(raw);

            setPost({
              ...parsed.attributes,
              content: parsed.body,
            });

            const htmlContent = marked.parse(parsed.body);
            const safeHtml = DOMPurify.sanitize(htmlContent);

            setHtml(safeHtml);
            setLoading(false);
          });
      });
  }, [id]);

  if (loading) {
    return (
      <main className="container text-white">
        <p className="opacity-70">Loading post…</p>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="container text-white">
        <h1 className="text-5xl font-bold">Post not found</h1>
      </main>
    );
  }

  return (
    <main id="main" className="container text-white">
      <article className="max-w-9xl mx-auto">
        <header className="mb-10">
          <p className="mb-2 text-xs uppercase tracking-[0.14em] text-white/40">
            Cybersoc Blog
          </p>

          <h1 className="text-5xl font-extrabold leading-tight md:text-5xl">
            {post.title}
          </h1>

          <div className="mt-4 flex items-center gap-5 text-sm text-white/60">
            <span className="flex items-center gap-1">
              <LuCalendarDays className="text-white/40" />
              {formatDate(post.date)}
            </span>
            <span>• {post.reading_time}</span>
            <span>• By {post.author}</span>
          </div>

          {post.banner && (
            <img
              src={post.banner}
              alt=""
              className="mt-8 max-w-9xl rounded-smooth border border-white/10"
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
