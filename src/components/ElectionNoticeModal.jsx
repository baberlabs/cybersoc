import { useEffect, useState } from "react";

const ElectionNoticeModal = () => {
  const [open, setOpen] = useState(false);

  // Show once per user (per browser)
  useEffect(() => {
    const seen = localStorage.getItem("cybersoc_election_notice");
    if (!seen) setOpen(true);
  }, []);

  const close = () => {
    localStorage.setItem("cybersoc_election_notice", "true");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="max-w-md rounded-smooth border border-white/10 bg-neutral-900/90 p-6 shadow-xl animate-fadeIn">
        <h2 className="text-xl font-bold text-white mb-4">
          Committee Elections Update
        </h2>

        <p className="text-white/80 text-sm mb-3">
          Two Cybersoc members are standing in the current BCUSU elections:
        </p>

        <ul className="mb-4 space-y-2 text-sm text-white/90">
          <li>
            <span className="font-semibold">Al Tahsin Rafi</span> — running for{" "}
            <span className="text-cyan-300">
              Participation & Inclusion Officer
            </span>
          </li>
          <li>
            <span className="font-semibold">Shakayat Ali Bhuiyan</span> —
            running for <span className="text-cyan-300">Vice President</span>
          </li>
        </ul>

        <p className="text-white/70 text-sm mb-6">
          BCUSU will email all registered members with a ballot link.{" "}
          <span className="text-white">
            Please check your inbox and vote when your ballot arrives.
          </span>
        </p>

        <button
          onClick={close}
          className="w-full rounded-md bg-white text-black font-semibold py-2 hover:bg-neutral-200 transition"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default ElectionNoticeModal;
