# Cybersoc Website Platform

The official web platform for the Birmingham City University **Cyber Security Society** (Cybersoc).

This repository contains the full source code for the society's public website, including events, projects, resources, and publicly available governance documents. The platform is designed to be maintainable across academic years and committee handovers.

Live site: [https://bcucybersoc.com](https://bcucybersoc.com)

---

## Purpose

The website serves as Cybersoc's single authoritative public interface. It is used to:

- Publish events, projects, and learning resources
- Document society activity and outputs
- Provide transparent governance, ethics, and safeguarding information
- Act as a maintained technical platform supporting student-led society activities

The platform prioritises clarity, accessibility, legal compliance, and long-term maintainability over novelty or excessive interactivity.

---

## Architectural Overview

- **Frontend:** React (SPA) with React Router
- **Styling:** Tailwind CSS v4
- **Build tooling:** Vite
- **Content model:** JSON-driven, static data files
- **Deployment:** Static hosting on Netlify (no backend services)

There is intentionally:

- no authentication
- no user tracking or analytics
- no server-side code
- no database

This keeps the platform transparent, auditable, and low-risk.

---

## Content & Data Model

All site content is stored as structured JSON files under `/public/data/`.

Examples include:

- `events.json`
- `projects.json`
- `resources.json`
- `members.json`
- `committee_roles.json`
- `committee_assignments.json`

Pages and components consume these files at runtime. This allows non-developers to update site content without modifying application logic and ensures continuity during committee transitions.

Blog posts are written in Markdown with `front-matter` metadata and rendered client-side.

---

## Governance & Compliance

The platform explicitly reflects Cybersoc's governance and compliance responsibilities.

Included public documents:

- Governance structure
- Code of Conduct
- Ethical Use Policy
- Safeguarding Policy
- Data Protection notice (UK GDPR aligned)

No personal data is collected or processed beyond explicitly consented committee information. Contributors may request removal of their data at any time.

---

## Repository Structure (high-level)

```text
src/
  components/           # Reusable UI components
  pages/                # Route-level pages
  hooks/                # Data and domain hooks
  lib/                  # Domain logic (semester/project rules)
  index.css             # Global styles and typography
  main.jsx              # Application entry point

public/
  data/                 # JSON content files
  images/               # Static assets
```

---

## Local Development

### Requirements

- Node.js (LTS recommended)

### Setup

Clone the repository:

```bash
git clone https://github.com/baberlabs/cybersoc && cd cybersoc
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The site will be available at: `http://localhost:5173`.

---

## Contributions

This repository is maintained by the Cybersoc technical team.

Students may contribute through:

- Society projects
- Approved fixes or enhancements
- Content updates under committee guidance

For access, coordination, or questions, [contact](https://bcucybersoc.com/contact) the current _Web Platform Engineer_ via Cybersoc Discord or LinkedIn.

---

## License & Usage

This repository supports the operations of the Birmingham City University Cyber Security Society (Cybersoc). Source code may be referenced for educational purposes. Society branding, content, and identity are not licensed for reuse.
