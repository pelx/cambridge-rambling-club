# Cambridge Rambling Club — CLAUDE.md

## Project
Community website for the Cambridge Rambling Club. Built and maintained by a volunteer.
The goal is a warm, welcoming, modern redesign of the existing site at cambridgeramblingclub.com.

## Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Design Principles
- Warm and community feel — not corporate, not generic
- Welcoming to newcomers
- Simple to maintain by a non-technical volunteer
- Mobile first
- No booking system — members contact the leader directly by phone/text
- Colour palette: greens, warm creams and stone tones

## Pages
- `/` — Home (Hero + upcoming walks preview)
- `/walks` — All upcoming walks (filterable by level A/B/C)
- `/walks/[id]` — Individual walk detail page
- `/newsletters` — List of quarterly newsletters (PDF downloads)
- `/join` — How to join the club

## Data
- Walk data: `data/walks.json`
- Newsletter data: `data/newsletters.json`
- Type definitions and loaders: `lib/walks.ts`, `lib/newsletters.ts`
- JSON files are loaded server-side using `fs.readFileSync`
- JSON will eventually be replaced with a database — only change the loader functions, never the components

## Walk Data Model
```ts
type WalkLevel = 'A' | 'B' | 'C';

type Walk = {
  id: number;
  title: string;
  date: string;          // YYYY-MM-DD
  time: string;          // e.g. "09:30"
  level: WalkLevel;      // A = hard, B = medium, C = easy
  leader: string;
  leaderContact: string; // phone number — members book by text
  description: string;
  parking: string;       // detailed start & parking directions
  distanceMiles: number;
  refreshments: string;
  carSharing: boolean;
};
```

## Newsletter Data Model
```ts
type Newsletter = {
  id: number;
  title: string;         // e.g. "2026 Spring Newsletter"
  season: 'Spring' | 'Summer' | 'Autumn' | 'Winter';
  year: number;
  file: string;          // path to PDF in public/newsletters/
};
```

## Folder Structure
```
cambridge-rambling-club/
  data/
    walks.json
    newsletters.json
  lib/
    walks.ts             # Walk type + getWalks() + getWalkById()
    newsletters.ts       # Newsletter type + getNewsletters()
  public/
    newsletters/         # PDF files e.g. spring-2026.pdf
    images/              # Walk photos
  app/
    page.tsx
    walks/
      page.tsx
      [id]/
        page.tsx
    newsletters/
      page.tsx
    join/
      page.tsx
  components/
    Navbar.tsx
    Hero.tsx
    WalkCard.tsx
    FilterBar.tsx
    PageHeader.tsx
    CTASection.tsx
  CLAUDE.md
```

## Conventions
- All components are in `components/`
- Use Next.js `Image` for all images
- Use server components by default — only add `'use client'` when needed (e.g. Navbar, FilterBar)
- Keep components simple — this is a volunteer-maintained community site
- Walks A/B/C: A is the most challenging, C is the easiest
- Holidays and away trips are handled via the quarterly newsletter only — not on the website
- Car sharing is always encouraged and shown on walk detail pages
- Do not add booking, payment, or login features

## What NOT to do
- Do not add unnecessary complexity
- Do not use external UI libraries (keep Tailwind only)
- Do not hardcode walk or newsletter data in components — always load from lib/
- Do not add coach trip or holiday fields to the Walk type