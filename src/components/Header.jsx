import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const toggle = () => setOpen((o) => !o);
  const close = () => setOpen(false);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close when clicking outside menu
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
    `relative px-3 py-2 text-sm font-medium transition-colors
     after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform
     hover:text-white hover:after:scale-x-100
     ${
       isActive ? "text-white after:scale-x-100 font-semibold" : "text-white/70"
     }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-xl mb-24 md:mb-32">
      <div className="container flex h-20 md:h-24 items-center justify-between">
        {/* Logo block */}
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

        {/* Mobile button */}
        <button
          type="button"
          onClick={toggle}
          aria-label="Toggle navigation"
          aria-expanded={open}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-md border border-white/20 text-white/80 transition hover:border-white/40 hover:text-white"
        >
          <span className="flex h-4 w-5 flex-col justify-between">
            <span className="h-[2px] w-full bg-current" />
            <span className="h-[2px] w-full bg-current" />
            <span className="h-[2px] w-full bg-current" />
          </span>
        </button>

        {/* Nav */}
        <nav
          ref={menuRef}
          aria-label="Primary"
          className={`${
            open ? "flex" : "hidden"
          } absolute left-0 top-full w-full flex-col gap-4 bg-black/95 backdrop-blur-xl px-6 py-6 border-b border-white/10
              md:static md:flex md:w-auto md:flex-row md:items-center md:gap-6 md:bg-transparent md:p-0 md:border-none`}
        >
          {/* Link group */}
          <div className="flex flex-col gap-2 md:flex-row md:gap-2 lg:gap-6">
            <NavLink to="/" onClick={close} className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/projects" onClick={close} className={linkClass}>
              Projects
            </NavLink>
            <NavLink to="/events" onClick={close} className={linkClass}>
              Events
            </NavLink>
            <NavLink to="/blog" onClick={close} className={linkClass}>
              Blog
            </NavLink>
            <NavLink to="/resources" onClick={close} className={linkClass}>
              Resources
            </NavLink>
            <NavLink to="/contact" onClick={close} className={linkClass}>
              Contact
            </NavLink>
          </div>

          {/* CTA */}
          <a
            href="https://www.bcusu.com/organisation/24254/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="inline-flex items-center justify-center rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-black shadow-sm shadow-white/20 transition hover:bg-neutral-100 md:ml-4"
          >
            Join Free
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
