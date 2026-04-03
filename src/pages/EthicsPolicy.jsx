export default function EthicsPolicy() {
  return (
    <main id="main" className="container text-white max-w-5xl">
      <header className="page-header">
        <p className="page-kicker">Ethics</p>
        <h1 className="page-title">Ethical Use Policy</h1>
        <p className="page-intro max-w-3xl text-white/85">
          Cybersoc activity is for legal learning and defensive security work
          only. This policy sets the boundaries clearly.
        </p>
      </header>

      <section className="space-y-6 text-white/85 leading-relaxed">
        <p>
          We follow UK law, including the Computer Misuse Act, alongside BCU and
          BCUSU acceptable-use and disciplinary rules.
        </p>

        <h2 className="text-2xl font-bold">Permitted Use</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Security research in sandboxed or simulated environments</li>
          <li>Participation in legal capture-the-flag platforms</li>
          <li>Reverse engineering of consented or open-source binaries</li>
        </ul>

        <h2 className="text-2xl font-bold">Prohibited Use</h2>
        <ul className="list-disc ml-6 space-y-2">
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
