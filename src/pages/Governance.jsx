export default function Governance() {
  return (
    <main id="main" className="container text-white max-w-5xl">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.14em] text-white/40 mb-2">
          Governance
        </p>
        <h1 className="text-4xl font-extrabold">Society Governance</h1>
      </header>

      <section className="space-y-6 text-white/80">
        <p>
          BCU Cybersoc is a student-led society operating under Birmingham City
          University Students’ Union (BCUSU). All society activity is subject to
          BCUSU policy, BCU regulations, and UK law.
        </p>

        <h2 className="text-2xl font-bold">Committee Authority</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>
            No officer may act unilaterally in finance, safeguarding, or
            discipline.
          </li>
          <li>Strategic decisions require committee consensus.</li>
          <li>Safeguarding and elections are escalated directly to BCUSU.</li>
        </ul>

        <h2 className="text-2xl font-bold">Elections Integrity</h2>
        <ul className="list-disc ml-6 space-y-1">
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
