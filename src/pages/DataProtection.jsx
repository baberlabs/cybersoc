export default function DataProtection() {
  return (
    <main id="main" className="container text-white max-w-5xl">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.14em] text-white/40 mb-2">
          Privacy
        </p>
        <h1 className="text-4xl font-extrabold">Data Protection</h1>
      </header>

      <section className="space-y-6 text-white/80">
        <p>
          Cybersoc is committed to protecting personal data in accordance with
          UK GDPR and Birmingham City University Students’ Union policy.
        </p>

        <ul className="list-disc ml-6 space-y-1">
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
