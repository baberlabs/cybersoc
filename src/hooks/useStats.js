import { useEffect, useState } from "react";

export const useStats = () => {
  const [stats, setStats] = useState({
    active: 0,
    completed: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/data/projects.json");
        if (!res.ok) throw new Error("Failed to load projects.");

        const projects = await res.json();
        if (!Array.isArray(projects) || cancelled) return;

        const count = projects.reduce(
          (acc, p) => {
            const status = p.status ?? "unknown";
            if (status === "in-progress") acc.active += 1;
            else if (status === "completed") acc.completed += 1;
            return acc;
          },
          { active: 0, completed: 0 },
        );

        setStats(count);
      } catch (err) {
        console.error("Projects stat failed:", err);
        setStats({ active: 0, completed: 0 });
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, loading };
};
