---
id: cybersoc-platform
title: "BCU Cybersoc Website: Design, Architecture, and Philosophy"
author: "Baber Khan"
date: "2025-01-12"
reading_time: "7 min read"
banner: "/images/blog/cybersoc-platform-banner.png"
excerpt: "A concise breakdown of the engineering and design decisions behind the official BCU Cybersoc website."
---

> DISCLAIMER: This blog was prepared with assistance from ChatGPT (November 2025) to test the blog pipeline.

The Cybersoc website was built to solve a simple problem: student societies operate like real organisations, but their platforms rarely reflect that. The goal was to create a system that is maintainable, scalable, and immediately useful for both students and committee members.

This document outlines the core decisions that shaped the platform.

---

## 1. Problem Definition

The website needed to support:

- Clear and immediate access to events, projects, and resources
- Accurate, up-to-date committee information
- A consistent structure across academic years
- Zero backend dependencies
- A codebase simple enough for new contributors to understand within a day

The design approach prioritised clarity, maintainability, and predictable behaviour.

---

## 2. Core Architectural Principles

### **1. Single Source of Truth**

One unified data model defines all people, roles, projects, and committee relationships. No duplication. No repeated strings. No hidden references.

### **2. JSON-Driven Content**

All key sections—projects, events, committee roles, contact links—are fully JSON-powered. Updating JSON updates the platform instantly without touching React.

### **3. Accessibility & Readability**

The UI uses semantic HTML, proper spacing, strong contrast, predictable layout, and mobile-first behaviour.

### **4. Smooth Navigation**

The site supports:

- Automatic scroll-to-top on route change
- Scroll position restoration
- Hash-based navigation (`/events#ctf`)

### **5. Audience-Centered Structure**

The website is designed for nine user groups: first-years, returning students, placement students, master’s students, lecturers, SU staff, employers, parents, and general visitors.

---

## 3. Data Architecture

A structured, minimal set of JSON files powers the entire platform.

### **people.json**

Stores every person associated with the society.

```json
{
  "id": "baber",
  "name": "Baber Khan",
  "linkedin": "https://www.linkedin.com/in/baberr/",
  "committee_roles": ["web-platform-engineer"]
}
```

### **roles.json**

Defines every possible committee role.

### **committee.json**

Maps each role to the person currently holding it.

### **projects.json**

Each project defines:

- `description_short`
- `description_long`
- `contributors` (by personId)
- Start/end dates
- Skills, difficulty, outcomes
- Status: active, upcoming, completed

### **contacts.json**

Stores all official platforms: BCUSU, Discord, Instagram, LinkedIn.

#### Benefits of this structure

- Update a person once → reflected across every page
- Update a role mapping → committee pages update instantly
- Mark a project “completed” → homepage, semester section, archives all update automatically

This model removes 95% of future maintenance overhead.

---

## 4. Projects System

The Projects section is designed for both quick scanning and detailed reading.

### Key features:

- **Table of Contents** for fast navigation
- **Three logical groups:** Active, Upcoming, Completed
- **Month-based grouping** for completed projects
- **Expandable contributor lists**
- **Skill and difficulty indicators**
- **Automatic semester relevance** based on dates

This gives students a clear view of what Cybersoc builds and how to get involved.

---

## 5. Events System

The Events section mirrors the project architecture but is optimised for time-sensitive information.

### Features:

- **Happening Now** detection
- **Upcoming / Past** automatic sorting
- **Month grouping**
- **Compact TOC**
- **Status-based styling**
  - Cyan → ongoing
  - Yellow → upcoming

The system requires no manual sorting or page edits.

---

## 6. Homepage Structure

The homepage is strictly functional and high-signal.

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

The page is intentionally minimal to prioritise speed and immediate clarity.

---

## 7. Contact Page

This was the most structurally sensitive page.

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

It avoids redundancy while remaining intuitive for new visitors.

---

## 8. Header & Navigation

The navigation bar was refined repeatedly for:

- Clean alignment
- Predictable mobile behaviour
- Minimal spacing inconsistencies
- Clear separation of the CTA
- Smooth scroll handling

The result behaves like a production-ready component rather than a student prototype.

---

## 9. Popup System

A lightweight popup system communicates important announcements (e.g., elections). It appears once per session, is dismissible, and avoids disrupting navigation.

---

## 10. Key Lessons

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

The Cybersoc website is built as a long-term, low-maintenance platform with a unified data architecture, predictable navigation, and simple extensibility. The system can grow without redesigns, and future committees can update content without touching the code.

The focus was never on aesthetics alone—it was on structure, clarity, and responsible engineering.
