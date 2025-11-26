import { FaDotCircle, FaHome } from "react-icons/fa";
import {
  FaBolt,
  FaBook,
  FaCalendar,
  FaCube,
  FaDiscord,
  FaEnvelope,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaShield,
} from "react-icons/fa6";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-28 border-t border-white/10 bg-black/60 backdrop-blur-sm text-sm">
      {/* Subtle top accent */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />

      <div className="container">
        <div className="grid gap-12 md:grid-cols-4 p-8 md:px-0">
          {/* LEFT: Branding */}
          <div className="space-y-5 col-span-2">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.svg"
                alt="BCU Cybersoc logo"
                className="h-9 w-auto opacity-90"
              />
              <span className="text-base font-semibold tracking-wide text-white/90">
                BCU Cybersoc
              </span>
            </div>

            <p className="max-w-xl leading-relaxed text-white/65">
              Technical Cyber Security Society of Birmingham City University.
              Helping students learn, build, and explore applied security.
            </p>

            <div className="flex items-center gap-3 text-xs text-white/50">
              <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-black/30 px-2 py-1">
                <FaDotCircle /> Est. 2025
              </span>
              <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-black/30 px-2 py-1">
                <FaShield /> Community-first
              </span>
            </div>

            <p className="pt-2 text-xs text-white/40">
              © {year} BCU Cybersoc. All rights reserved.
            </p>
          </div>

          {/* MIDDLE: Site Nav */}
          <div>
            <SectionHeading>Site</SectionHeading>
            <ul className="space-y-2 text-white/70">
              <FooterLink href="/" icon={<FaHome />}>
                Home
              </FooterLink>
              <FooterLink href="/projects" icon={<FaCube />}>
                Projects
              </FooterLink>
              <FooterLink href="/events" icon={<FaCalendar />}>
                Events
              </FooterLink>
              <FooterLink href="/resources" icon={<FaBook />}>
                Resources
              </FooterLink>
              <FooterLink href="/contact" icon={<FaEnvelope />}>
                Contact
              </FooterLink>
            </ul>
          </div>

          {/* RIGHT: External */}
          <div>
            <SectionHeading>Connect</SectionHeading>
            <ul className="space-y-2 text-white/70">
              <FooterLink
                href="https://www.bcusu.com/organisation/24254/"
                icon={<FaGlobe />}
              >
                BCUSU Page
              </FooterLink>
              <FooterLink
                href="https://discord.com/invite/3HcCg7sCqz"
                icon={<FaDiscord />}
              >
                Discord
              </FooterLink>
              <FooterLink
                href="https://www.linkedin.com/company/bcu-cybersecurity-society/"
                icon={<FaLinkedin />}
              >
                LinkedIn
              </FooterLink>
              <FooterLink
                href="https://instagram.com/bcucybersoc"
                icon={<FaInstagram />}
              >
                Instagram
              </FooterLink>
            </ul>

            {/* CTA strip */}
            <div className="mt-6 rounded-lg border border-white/10 bg-black/30 p-3">
              <p className="text-xs text-white/60">
                Join our Discord to meet members, get updates, and find
                resources.
              </p>
              <a
                href="https://discord.com/invite/3HcCg7sCqz"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/15"
              >
                <FaBolt /> Join Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom divider glow */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
    </footer>
  );
};

const SectionHeading = ({ children }) => (
  <h3 className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
    {children}
    <span className="h-px w-10 bg-white/15" />
  </h3>
);

const FooterLink = ({ href, children, icon }) => (
  <li>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:text-white"
    >
      <span className="text-white/50">{icon}</span>
      <span>{children}</span>
    </a>
  </li>
);

export default Footer;
