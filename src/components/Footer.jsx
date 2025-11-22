const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="container flex flex-col gap-6 py-10 text-sm text-white/70 sm:flex-row sm:justify-between">
        {/* Left */}
        <div className="space-y-1">
          <p className="font-semibold text-white/90">BCU Cybersoc</p>
          <p>Cyber Security Society · Birmingham City University</p>
          <p className="text-white/40">
            © {year} Cybersoc. All rights reserved.
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-1">
          <FooterLink href="https://www.bcusu.com/organisation/24254/">
            BCUSU Page
          </FooterLink>
          <FooterLink href="https://discord.com/invite/3HcCg7sCqz">
            Discord
          </FooterLink>
          <FooterLink href="https://www.linkedin.com/company/bcu-cybersecurity-society/">
            LinkedIn
          </FooterLink>
          <FooterLink href="https://instagram.com/bcucybersoc">
            Instagram
          </FooterLink>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="transition-colors hover:text-white"
  >
    {children}
  </a>
);

export default Footer;
