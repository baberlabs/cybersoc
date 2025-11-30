import { useEffect, useState } from "react";

export function useSemester() {
  const [semester, setSemester] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/semesters.json")
      .then((r) => r.json())
      .then((all) => {
        const current = all.filter((s) => s.current);

        if (current.length !== 1) {
          setError("Invalid semester configuration");
          return;
        }

        setSemester(current[0]);
      })
      .catch(() => setError("Failed to load semester"));
  }, []);

  return { semester, error };
}
