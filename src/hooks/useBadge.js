import { useEffect, useState } from "react";
import { useSocietyData } from "./useSocietyData";

export const useBadge = ({ badgeId, recipientSlug }) => {
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

        const badgeDef = badges[badgeId];
        if (!badgeDef) {
          throw new Error("Badge not found");
        }

        const awardEntry = awards.find(
          (a) => a.badge_id === badgeId && a.recipient.slug === recipientSlug,
        );

        if (!awardEntry) {
          throw new Error("Award not found");
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
  }, [badgeId, recipientSlug]);

  return {
    badge,
    award,
    error,
  };
};
