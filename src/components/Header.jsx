import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/events", label: "Events" },
  { to: "/blog", label: "Blog" },
  { to: "/resources", label: "Resources" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((o) => !o), []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (!open) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Close on ESC (only when open)
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") {
        close();
        buttonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  // Close on outside click (pointer-safe, only when open)
  useEffect(() => {
    if (!open) return;

    const onPointer = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        close();
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open, close]);

  // Keep keyboard focus inside the mobile menu while it is open.
  useEffect(() => {
    if (!open || !menuRef.current) return;

    const focusable = menuRef.current.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first.focus();

    const onTrap = (e) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    menuRef.current.addEventListener("keydown", onTrap);

    return () => {
      menuRef.current?.removeEventListener("keydown", onTrap);
    };
  }, [open]);

  const linkClass = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition-colors
     after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform
     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70
     hover:text-white hover:after:scale-x-100
     ${
       isActive ? "text-white after:scale-x-100 font-semibold" : "text-white/70"
     }`;

  return (
    <header className="ui-chrome-surface sticky top-0 z-50 mb-24 border-b border-(--site-border) md:mb-32">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
      >
        Skip to main content
      </a>
      <div className="container flex h-20 md:h-24 items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          onClick={close}
          className="group flex items-center gap-2 select-none"
        >
          <img
            src="/images/logo.svg"
            alt="BCU Cybersoc logo"
            className="h-8 w-auto opacity-90 transition duration-300 group-hover:-rotate-2 group-hover:opacity-100"
          />
          <span className="block text-sm font-semibold tracking-[0.12em] text-white/88 transition group-hover:text-white">
            CYBERSOC
          </span>
        </NavLink>

        {/* Mobile toggle */}
        <button
          ref={buttonRef}
          type="button"
          onClick={toggle}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="primary-navigation"
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-md border border-white/20 bg-white/2 text-white/80 transition hover:border-cyan-300/55 hover:bg-cyan-200/8 hover:text-white"
        >
          <span className="flex h-4 w-5 flex-col justify-between">
            <span className="h-0.5 w-full bg-current" />
            <span className="h-0.5 w-full bg-current" />
            <span className="h-0.5 w-full bg-current" />
          </span>
        </button>

        {/* Navigation */}
        <nav
          id="primary-navigation"
          ref={menuRef}
          aria-label="Primary"
          className={`${
            open ? "flex" : "hidden"
          } absolute left-0 top-full w-full flex-col gap-4 border-b border-(--site-border) bg-[linear-gradient(165deg,rgba(10,19,33,0.95),rgba(8,14,25,0.9))] px-6 py-6 backdrop-blur-2xl
              md:static md:flex md:w-auto md:flex-row md:items-center md:gap-6 md:bg-none md:bg-transparent md:backdrop-blur-none md:p-0 md:border-none`}
        >
          {/* Links */}
          <div className="flex flex-col gap-2 md:flex-row md:gap-2 lg:gap-6">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink key={to} to={to} onClick={close} className={linkClass}>
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
