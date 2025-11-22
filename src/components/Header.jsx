import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const toggle = () => setOpen((o) => !o);
  const close = () => setOpen(false);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close when clicking outside menu (mobile)
  useEffect(() => {
    const onClick = (e) => {
      if (open && menuRef.current && !menuRef.current.contains(e.target)) {
        close();
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const linkClass = ({ isActive }) =>
    `relative px-2 py-2 text-sm font-medium transition-colors after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform hover:text-white hover:after:scale-x-100 ${
      isActive ? "text-white after:scale-x-100 font-semibold" : "text-white/70"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="container flex items-center justify-between py-3">
        {/* Logo + Wordmark */}
        <NavLink
          to="/"
          onClick={close}
          className="flex items-center gap-3 select-none"
        >
          <img
            src="/images/logo.svg"
            alt="Cybersoc logo"
            className="h-9 w-auto opacity-90 transition-opacity hover:opacity-100"
          />
          <span className="hidden text-[1.05rem] font-semibold tracking-[0.08em] text-white/90 sm:block">
            CYBERSOC
          </span>
        </NavLink>

        {/* Mobile button */}
        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={toggle}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-white/80 transition hover:border-white/40 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 md:hidden"
        >
          <span className="relative flex h-4 w-5 flex-col justify-between">
            <span className="h-[2px] w-full bg-current" />
            <span className="h-[2px] w-full bg-current" />
            <span className="h-[2px] w-full bg-current" />
          </span>
        </button>

        {/* Navigation */}
        <nav
          ref={menuRef}
          aria-label="Primary navigation"
          className={`${
            open ? "flex" : "hidden"
          } absolute left-0 top-full w-full flex-col gap-4 border-b border-white/10 bg-black/95 px-6 py-6 backdrop-blur-md md:static md:flex md:w-auto md:flex-row md:items-center md:gap-6 md:border-none md:bg-transparent md:p-0`}
        >
          <NavLink to="/" onClick={close} className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/projects" onClick={close} className={linkClass}>
            Projects
          </NavLink>
          <NavLink to="/events" onClick={close} className={linkClass}>
            Events
          </NavLink>
          <NavLink to="/resources" onClick={close} className={linkClass}>
            Resources
          </NavLink>
          <NavLink to="/contact" onClick={close} className={linkClass}>
            Contact
          </NavLink>

          <a
            href="https://www.bcusu.com/organisation/24254/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="inline-flex items-center rounded-md bg-white px-4 py-1.5 text-sm font-semibold text-black shadow-sm shadow-white/10 transition hover:bg-neutral-100"
          >
            Join Free
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
