import { useEffect, useState } from "react";

export const useBadge = ({ awardId }) => {
  const [badge, setBadge] = useState(null);
  const [award, setAward] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);

        const [badgesRes, awardsRes] = await Promise.all([
          fetch("/data/badges/badges.json"),
          fetch("/data/badges/awards.json"),
        ]);

        if (!badgesRes.ok || !awardsRes.ok) {
          throw new Error("Failed to load badge data");
        }

        const badges = await badgesRes.json();
        const awards = await awardsRes.json();

        const awardEntry = awards.find((award) => award.id == awardId);

        if (!awardEntry) {
          throw new Error("Award not found");
        }

        const badgeDef = badges[awardEntry.badge_id];

        if (!badgeDef) {
          throw new Error("Badge definition not found");
        }

        if (!cancelled) {
          setBadge(badgeDef);
          setAward(awardEntry);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load badge.");
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [awardId]);

  return {
    badge,
    award,
    error,
    loading,
  };
};
