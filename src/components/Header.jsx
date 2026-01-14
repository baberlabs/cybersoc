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

  const linkClass = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition-colors
     after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform
     hover:text-white hover:after:scale-x-100
     ${
       isActive ? "text-white after:scale-x-100 font-semibold" : "text-white/70"
     }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-xl mb-24 md:mb-32">
      <div className="container flex h-20 md:h-24 items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          onClick={close}
          className="flex items-center gap-2 select-none"
        >
          <img
            src="/images/logo.svg"
            alt="BCU Cybersoc logo"
            className="h-8 w-auto opacity-90 transition hover:opacity-100"
          />
          <span className="block text-sm font-semibold tracking-[0.12em] text-white/85">
            CYBERSOC
          </span>
        </NavLink>

        {/* Mobile toggle */}
        <button
          ref={buttonRef}
          type="button"
          onClick={toggle}
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="primary-navigation"
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-md border border-white/20 text-white/80 transition hover:border-white/40 hover:text-white"
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
          } absolute left-0 top-full w-full flex-col gap-4 bg-black/95 backdrop-blur-xl px-6 py-6 border-b border-white/10
              md:static md:flex md:w-auto md:flex-row md:items-center md:gap-6 md:bg-transparent md:p-0 md:border-none`}
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
