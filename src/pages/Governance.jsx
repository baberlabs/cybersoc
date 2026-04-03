export default function Governance() {
  return (
    <main id="main" className="container text-white max-w-5xl">
      <header className="page-header">
        <p className="page-kicker">Governance</p>
        <h1 className="page-title">Society Governance</h1>
        <p className="page-intro max-w-3xl text-white/85">
          This page defines how Cybersoc decisions are made and where society
          authority sits within BCUSU and University policy.
        </p>
      </header>

      <section className="space-y-6 text-white/85 leading-relaxed">
        <p>
          BCU Cybersoc is a student-led society operating under Birmingham City
          University Students’ Union (BCUSU). All society activity is subject to
          BCUSU policy, BCU regulations, and UK law.
        </p>

        <h2 className="text-2xl font-bold">Committee Authority</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            No officer may act unilaterally in finance, safeguarding, or
            discipline.
          </li>
          <li>Strategic decisions require committee consensus.</li>
          <li>Safeguarding and elections are escalated directly to BCUSU.</li>
        </ul>

        <h2 className="text-2xl font-bold">Elections Integrity</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>All elections are administered exclusively by BCUSU.</li>
          <li>Cybersoc does not host informal or internal voting.</li>
          <li>Society branding may not be used for endorsements.</li>
        </ul>

        <h2 className="text-2xl font-bold">External Partnerships</h2>
        <p>
          Cybersoc does not enter sponsorship or commercial partnerships without
          BCUSU approval. Student data is never shared externally.
        </p>
      </section>
    </main>
  );
}
