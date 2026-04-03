const HowToAddBadgeToLinkedInProfile = () => {
  return (
    <main id="main" className="container text-white max-w-5xl">
      <header className="page-header">
        <p className="page-kicker">Guide</p>
        <h1 className="page-title">Add Your Digital Badge to LinkedIn</h1>
        <p className="page-intro max-w-3xl">
          Your badge can be added under "Licenses & Certifications" on LinkedIn.
          Employers can verify it using the Credential URL in your award email.
        </p>
      </header>

      <section className="space-y-8 text-white/80">
        <div>
          <h2 className="text-xl font-semibold mb-3">Before you begin</h2>
          <ul className="list-disc ml-5 space-y-1 text-sm">
            <li>Locate the award email sent after the hackathon.</li>
            <li>Copy your unique Credential URL from that email.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Steps</h2>
          <ol className="list-decimal ml-5 space-y-3 text-sm">
            <li>Log in to LinkedIn and open your profile.</li>
            <li>
              Click <strong>Add section</strong> →{" "}
              <strong>Licenses & Certifications</strong>.
            </li>
            <li>
              <strong>Name:</strong> Use the exact badge title from your email.
            </li>
            <li>
              <strong>Issuing Organisation:</strong> BCU Cybersoc (select from
              dropdown when it appears).
            </li>
            <li>
              <strong>Issue Date:</strong> February 2026.
            </li>
            <li>Leave expiration date empty.</li>
            <li>
              Paste your <strong>Credential ID</strong>. Leave empty if none
              provided.
            </li>
            <li>
              Paste your <strong>Credential URL</strong>.
            </li>
            <li>Click Save.</li>
          </ol>
        </div>

        <div className="ui-note">
          <p className="font-semibold mb-1">Verification</p>
          <p>
            The Credential URL links to an official Cybersoc verification page.
            This ensures recruiters can confirm the badge is authentic.
          </p>
        </div>
      </section>
    </main>
  );
};

export default HowToAddBadgeToLinkedInProfile;
