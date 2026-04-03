---
id: cybersoc-platform
title: "BCU Cybersoc Website: Design, Architecture, and Philosophy"
author: "Baber Khan"
date: "2025-11-25"
reading_time: "7 min read"
banner: "/images/blog/cybersoc-platform-banner.png"
excerpt: "A concise breakdown of the engineering and design decisions behind the official BCU Cybersoc website."
---

The Cybersoc website started because our old setup made simple updates harder than they should have been. Committee details changed, events moved around, and project info went out of date quickly.

We wanted a site that students could trust and committee members could actually maintain during a busy semester.

---

## 1. What we needed

At minimum, the site had to do five things well:

- Show events, projects, and resources without extra clicks
- Keep committee information accurate
- Stay easy to update year after year
- Avoid backend complexity
- Be simple enough for new student contributors to pick up quickly

---

## 2. Architecture choices

### 1. One source of truth

People, roles, projects, and assignments are all mapped from shared data. That means fewer mismatches and fewer copy-paste errors.

### 2. JSON-first content

Most content lives in JSON, so committee updates do not require editing React components.

### 3. Readability and accessibility

We focused on clear structure, semantic markup, and readable spacing/contrast on both desktop and mobile.

### 4. Navigation that behaves properly

Route transitions, scroll reset, and hash links were treated as core UX, not extras.

### 5. Different audiences, one structure

The site needs to make sense to new students, returning members, staff, and external visitors without becoming cluttered.

---

## 3. Data model

The platform runs on a small set of JSON files with clear responsibilities.

### people.json

Stores every person associated with the society.

```json
{
  "id": "baber",
  "name": "Baber Khan",
  "linkedin": "https://www.linkedin.com/in/baberr/",
  "committee_roles": ["web-platform-engineer"]
}
```

### roles.json

Defines every possible committee role.

### committee.json

Maps each role to the person currently holding it.

### projects.json

Each project defines:

- `description_short`
- `description_long`
- `contributors` (by personId)
- Start/end dates
- Skills, difficulty, outcomes
- Status: active, upcoming, completed

### contacts.json

Stores all official platforms: BCUSU, Discord, Instagram, LinkedIn.

#### Why this helped

- Update a person once and the change appears everywhere
- Reassign a role and the committee view updates instantly
- Change project status and related sections follow automatically

---

## 4. Projects section

The projects page had to work for both quick scanning and deeper reading.

### Key features:

- **Table of Contents** for fast navigation
- **Three logical groups:** Active, Upcoming, Completed
- **Month-based grouping** for completed projects
- **Expandable contributor lists**
- **Skill and difficulty indicators**
- **Automatic semester relevance** based on dates

This makes it easier for students to understand what is active and where they can contribute.

---

## 5. Events section

Events follow a similar structure, but tuned for dates and urgency.

### Features:

- **Happening Now** detection
- **Upcoming / Past** automatic sorting
- **Month grouping**
- **Compact TOC**
- **Status-based styling**
  - Cyan → ongoing
  - Yellow → upcoming

Most ordering happens automatically from event dates.

---

## 6. Homepage approach

The homepage is intentionally practical.

### Sections:

1. **Hero**
   - Clear identity statement
   - Two core CTAs
   - Live stats pulled from JSON

2. **This Semester**
   - Real-time summaries of active and upcoming projects/events

3. **What You’ll Actually Do**
   - Simple breakdown for new students
   - Tiered activities
   - No jargon, no pressure

We kept it lightweight so new visitors can understand the society quickly.

---

## 7. Contact page

This was one of the trickiest pages to get right.

### Needs addressed:

- Clear platform links
- Role-based responsibilities
- Full committee list
- Vacancies
- Special notices (elections, nominations)
- Separation of SU and society responsibilities

The final design uses a hybrid layout:

1. Platforms
2. Role lookup
3. Committee list
4. Vacancies
5. Notices

The final layout avoids duplication and keeps responsibilities clear.

---

## 8. Header and navigation

We iterated several times on spacing, mobile behavior, and clarity so navigation feels stable and predictable.

---

---

## 9. Lessons learned

1. **Systems matter more than pages**  
   Good architecture simplifies everything long-term.

2. **Avoid duplication**  
   Every repeated string eventually becomes a bug.

3. **Design for multiple user types**  
   A society platform cannot assume one audience.

4. **Navigation quality impacts perception**  
   Scroll behaviour and TOCs significantly improve UX.

5. **Clarity outperforms cleverness**  
   Clean layouts always win over novelty.

---

## Conclusion

This project gave Cybersoc a maintainable platform that can be handed over cleanly between committees. The biggest win is not visual polish, it is that members can keep content current without fighting the codebase.
