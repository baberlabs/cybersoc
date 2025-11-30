export default function CodeOfConduct() {
  return (
    <main id="main" className="container text-white max-w-5xl">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.14em] text-white/40 mb-2">
          Standards
        </p>
        <h1 className="text-4xl font-extrabold">Code of Conduct</h1>
      </header>

      <section className="space-y-6 text-white/80">
        <p>
          This Code of Conduct applies to all members, attendees, contributors,
          and guests participating in Cybersoc activities, both online and in
          person.
        </p>

        <h2 className="text-2xl font-bold">Expected Conduct</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Respectful, professional communication at all times</li>
          <li>
            Zero tolerance for harassment, discrimination, or intimidation
          </li>
          <li>Ethical and lawful use of security tools and techniques</li>
          <li>Constructive collaboration and mutual support</li>
        </ul>

        <h2 className="text-2xl font-bold">Prohibited Behaviour</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Unauthorised system or network access</li>
          <li>Doxxing, data misuse, or identity targeting</li>
          <li>Creation or distribution of malware outside approved contexts</li>
          <li>Threatening, abusive, coercive, or exploitative behaviour</li>
        </ul>

        <h2 className="text-2xl font-bold">Enforcement</h2>
        <p>
          Breaches of this Code may result in a warning, suspension, permanent
          removal from the society, and escalation to BCUSU or the University,
          depending on severity.
        </p>
      </section>
    </main>
  );
}
