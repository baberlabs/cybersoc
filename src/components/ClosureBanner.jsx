import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

const STORAGE_KEY = "cybersoc_closure_banner_closed_at";
const REAPPEAR_AFTER_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

const ClosureBanner = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closedAt = localStorage.getItem(STORAGE_KEY);

    if (!closedAt) {
      setOpen(true);
      return;
    }

    const elapsed = Date.now() - Number(closedAt);

    if (elapsed >= REAPPEAR_AFTER_MS) {
      setOpen(true);
    }
  }, []);

  const close = () => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="bg-yellow-400 text-black">
      <div className="container flex items-center justify-between gap-4 py-2 text-xs sm:text-sm">
        <p className="leading-relaxed">
          Cybersoc is closing and evolving into{" "}
          <a
            href="https://bcusca.com/"
            target="_blank"
            rel="noopener"
            className="underline font-semibold"
          >
            BCU Student Computing Association (SCA)
          </a>
          . This transition expands opportunities across all computing
          disciplines.{" "}
          <a
            href="https://www.linkedin.com/posts/profile-mmartinak_as-i-look-back-on-an-incredible-12-months-activity-7452708677733773312-I0wV"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-semibold"
          >
            Read announcement
          </a>
          .
        </p>
        <button
          onClick={close}
          className="shrink-0 p-1 hover:bg-black/10 cursor-pointer"
          aria-label="Close notification"
        >
          <RxCross2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default ClosureBanner;
