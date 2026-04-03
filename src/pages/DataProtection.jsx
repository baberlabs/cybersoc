export default function DataProtection() {
  return (
    <main id="main" className="container text-white max-w-5xl">
      <header className="page-header">
        <p className="page-kicker">Privacy</p>
        <h1 className="page-title">Data Protection</h1>
        <p className="page-intro max-w-3xl text-white/85">
          This page explains what personal data is shown, what is never stored,
          and how members can request corrections or removal.
        </p>
      </header>

      <section className="space-y-6 text-white/85 leading-relaxed">
        <p>
          Cybersoc is committed to protecting personal data in accordance with
          UK GDPR and Birmingham City University Students’ Union policy.
        </p>

        <h2 className="text-2xl font-bold">Our Data Principles</h2>

        <ul className="list-disc ml-6 space-y-2">
          <li>Only publicly consented committee information is displayed.</li>
          <li>
            Names, roles, and LinkedIn profiles appear with explicit permission.
          </li>
          <li>
            Members may request removal of their personal data at any time.
          </li>
          <li>No tracking, analytics, or marketing cookies are used.</li>
          <li>No personal student records are stored on this platform.</li>
        </ul>

        <p>
          Requests for data removal or correction may be made through the
          committee or via the Contact page.
        </p>
      </section>
    </main>
  );
}
