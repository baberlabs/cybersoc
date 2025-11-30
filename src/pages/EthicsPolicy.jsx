export default function EthicsPolicy() {
  return (
    <main id="main" className="container text-white max-w-5xl">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.14em] text-white/40 mb-2">
          Ethics
        </p>
        <h1 className="text-4xl font-extrabold">Ethical Use Policy</h1>
      </header>

      <section className="space-y-6 text-white/80">
        <p>
          Cybersoc operates strictly within UK law, including the Computer
          Misuse Act, and in alignment with university acceptable-use and
          disciplinary regulations.
        </p>

        <h2 className="text-2xl font-bold">Permitted Use</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Security research in sandboxed or simulated environments</li>
          <li>Participation in legal capture-the-flag platforms</li>
          <li>Reverse engineering of consented or open-source binaries</li>
        </ul>

        <h2 className="text-2xl font-bold">Prohibited Use</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Real-world unauthorised exploitation</li>
          <li>Attacks against live infrastructure</li>
          <li>Disclosure of vulnerabilities without consent or coordination</li>
        </ul>

        <p className="mt-4">
          Cybersoc does not support real-world hacking, intrusion, or data
          misuse under any circumstances.
        </p>
      </section>
    </main>
  );
}
