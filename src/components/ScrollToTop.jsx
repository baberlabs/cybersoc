import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    // If there is a hash, scroll to the element
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 0);
      }
      return;
    }

    // No hash → scroll to top for normal navigation
    window.scrollTo({ top: 0, behavior: "smooth" });

    // `key` changes for every new navigation except back/forward
  }, [pathname, key]);

  return null;
};

export default ScrollToTop;
