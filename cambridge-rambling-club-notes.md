# Cambridge Rambling Club — Project Notes

## Project Overview
Community website redesign for Cambridge Rambling Club (cambridgeramblingclub.com).
Built by a volunteer using Next.js, TypeScript, and Tailwind CSS.

## Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Supabase (planned — auth + database)

## Design Principles
- Warm, community feel — not corporate
- Welcoming to newcomers
- Simple to maintain by a volunteer
- Mobile first
- No booking system — members contact the leader directly by phone/text
- Colour palette: greens, warm creams and stone tones

---

## Pages
| Route | Description |
|-------|-------------|
| `/` | Home — Hero + FAQ/About content |
| `/walks` | Upcoming and past walks grid |
| `/walks/[id]` | Walk detail page |
| `/calendar` | Full calendar view of walks |
| `/newsletters` | Quarterly newsletter PDFs |
| `/news` | Club news posts |
| `/holidays` | Away trips and weekends |
| `/join` | How to join |

---

## Data Models

### Walk
```ts
type WalkLevel = 'A' | 'B' | 'C';

type Walk = {
  id: number;
  title: string;
  date: string;          // YYYY-MM-DD
  startTime: string;     // e.g. "09:30"
  level: WalkLevel;      // A = hard, B = medium, C = easy
  leader: string;
  phone?: string;        // empty string if not provided
  drivingInstructions?: string;
  parking?: string;
  walkStart?: string;
  description: string;
  image?: string;        // empty string if not provided
};
```

### Newsletter
```ts
type Newsletter = {
  id: number;
  title: string;         // e.g. "2026 Spring Newsletter"
  season: 'Spring' | 'Summer' | 'Autumn' | 'Winter';
  year: number;
  file: string;          // path to PDF in public/newsletters/
};
```

### NewsPost
```ts
type NewsPost = {
  id: number;
  postDate: string;      // DD/MM/YYYY
  author: string;
  title: string;
  content: string;
};
```

### Holiday
```ts
type Holiday = {
  id: number;
  startDate: string;     // DD/MM/YYYY
  endDate: string;       // DD/MM/YYYY
  leader: string;
  title: string;
  content: string;
};
```

---

## Folder Structure
```
cambridge-rambling-club/
  data/
    walks.json
    newsletters.json
    news.json
    holidays.json
  lib/
    walks.ts             # Walk type + walks array + getWalkById()
    newsletters.ts       # Newsletter type + getNewsletters()
    news.ts              # NewsPost type + news array + getNewsPostById()
    holidays.ts          # Holiday type + holidays array + getHolidayById()
  public/
    newsletters/         # PDF files e.g. spring-2026.pdf
    images/
      walk-placeholder.svg     # Matisse-style boots on grass illustration
      newsletter-placeholder.svg  # Matisse-style wildflowers illustration
      hero.jpg
  app/
    page.tsx             # Home page
    walks/
      page.tsx
      [id]/page.tsx
    calendar/
      page.tsx
    newsletters/
      page.tsx
    news/
      page.tsx
      [id]/page.tsx
    holidays/
      page.tsx
      [id]/page.tsx
    join/
      page.tsx
    globals.css
    layout.tsx
    favicon.ico
  components/
    Navbar.tsx
    Hero.tsx
    WalkCard.tsx
    HolidayCard.tsx
    NewsletterCard.tsx
    CTASection.tsx
    AddToCalendar.tsx
  CLAUDE.md
```

---

## Key Decisions

### Data loading
- JSON files at project root in `data/`
- Imported directly in `lib/` files using `import data from '../data/walks.json'`
- Will move to Supabase database in future — only loader functions need changing

### Walk type system
- Level A = challenging, B = moderate, C = easy
- Colour coded: red for A, amber for B, green for C
- No booking system — members text the leader directly

### Images
- Walk placeholder: Matisse-style boots on grass SVG
- Newsletter placeholder: Matisse-style wildflowers SVG
- Use plain `<img>` tag for SVGs (Next.js Image component doesn't handle SVGs well)
- Use Next.js `<Image>` with `fill` for real photos

### Walks page
- Split into Upcoming (sorted ascending) and Past (sorted descending)
- Click card goes to detail page
- Detail page uses `router.back()` so back button works from both walks list and calendar

### Calendar
- Uses `@fullcalendar/react` library
- Click date → shows walk list below
- Click walk in list → navigates to detail page
- Colour coded dots by level

### Add to Calendar
- Uses `add-to-calendar-button-react` library
- Wrapped in dynamic import with `ssr: false` to avoid hydration errors
- Options: Google, Apple, iCal, Microsoft365, Outlook.com

### Dark mode
- Disabled — removed `@media (prefers-color-scheme: dark)` from globals.css
- Community site, always light theme

### Navbar
- Warm cream background (#faf7f2)
- Green circle logo with walking figure
- Pill-shaped nav links
- Green "Join a walk" CTA button
- Links: Home, Walks, Calendar, Holidays, News, Newsletters, Join

---

## Conventions
- All components in `components/`
- Use Next.js `Image` for photos, plain `<img>` for SVGs
- Use server components by default — only add `'use client'` when needed
- For client components with params, use `use(params)` not `async/await`
- Empty strings for optional fields handled with `field && field.trim() !== ''`
- Emails in content auto-linked using regex split
- Content paragraphs split on `\n\n` for proper rendering
- Walk detail footer always shows: "Please text the leader if you want to join. Car sharing is always encouraged."

## What NOT to do
- Do not add booking, payment, or login features (yet)
- Do not use external UI libraries — keep Tailwind only
- Do not hardcode walk data in components — always load from lib/
- Do not add coach trip or holiday fields to the Walk type
- Holidays and away trips are on the Holidays page — not in Walk data

---

## Planned: Supabase Auth
- All members will have accounts
- Roles: admin, leader, member
- Email + password sign in
- Admin: add/edit all content
- Leader: add/edit their own walks and news
- Member: view member-only content

### Profiles table (SQL)
```sql
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  role text not null default 'member' check (role in ('admin', 'leader', 'member')),
  active boolean not null default true,
  joined_at timestamp with time zone default now()
);
```

---

## Useful Commands
```bash
npm run dev          # start dev server
npm run build        # production build
git reset --hard HEAD            # discard all uncommitted changes
git stash                        # save changes temporarily
git stash pop                    # restore stashed changes
git log --oneline                # view commit history
git reset --hard <commit-hash>   # go back to specific commit
```
