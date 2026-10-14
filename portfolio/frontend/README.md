# Okoth Reagan — Portfolio (Next.js)

A single-page developer portfolio, migrated from static HTML/CSS/JS to
Next.js (App Router + TypeScript), keeping the original dark/blue design.

## Structure

```
.
├── app/
│   ├── layout.tsx        # <head> metadata, fonts, favicon, <Analytics />
│   ├── api/track/         # records each page view
│   ├── api/admin/         # login / logout
│   ├── api/contact/       # contact form endpoint
│   ├── admin/             # login + panel: analytics, projects, skills, experience, messages
│   ├── page.tsx           # assembles all sections
│   └── globals.css        # the original stylesheet, unchanged design
├── components/
│   ├── Header.tsx          # nav, mobile menu, typing effect
│   ├── Reveal.tsx          # scroll-in animation wrapper (IntersectionObserver)
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx        # reads from data/projects.ts
│   ├── Contact.tsx
│   └── Footer.tsx
├── data/
│   └── projects.ts         # <- put your real GitHub repos here
├── lib/                    # prisma client, visitor hashing, admin auth
├── prisma/schema.prisma    # Visit table
├── middleware.ts           # protects /admin
└── .env.example
└── public/
    ├── favicon.svg
    └── robots.txt
```

## Add your real projects

GitHub blocks automated scraping of profile pages, so `data/projects.ts`
currently holds the same four placeholder projects from the original site.
Send over your repo names, one-line descriptions, and (optionally) live
demo links, and update the `projects` array — each entry is:

```ts
{
  title: "Repo name",
  description: "One line on what it does.",
  tech: ["Java", "MySQL"],
  repoUrl: "https://github.com/Roo-Master/repo-name",
  demoUrl: "https://your-demo-url.com", // optional
}
```

The Projects section renders directly from this list, so no other file
needs to change.

## Before you deploy — checklist

- [ ] Fill in `data/projects.ts` with your real repos
- [ ] Update `metadataBase` and Open Graph URL in `app/layout.tsx` once you
      have a real domain
- [ ] Add a real `public/og-image.png` (1200×630) for social previews
- [ ] Uncomment LinkedIn/Twitter links in `components/Footer.tsx` once you
      have those profile URLs

## Job-seeking setup (do this first)

Edit **`data/site.ts`**. It controls the hero, buttons and contact details,
and anything left empty is hidden, so there are never dead links:

- `headline` / `summary`: your one-line pitch; make it specific
- `lookingFor`: the roles you want (pre-filled from your stack, so adjust)
- `availability`, `workPreference`: e.g. "Available immediately", "Open to remote"
- `cvUrl`: put your CV in `/public` (e.g. `public/Okoth-Reagan-CV.pdf`) and set
  `"/Okoth-Reagan-CV.pdf"` to show a **Download CV** button
- `linkedin`, `whatsapp`: fill in to show those buttons

In `/admin/projects`, give each project a real **repo link**, a **live demo**
if you have one, and an **Impact** line (real facts only), and tick
**Feature** on your best two or three. The dashboard's **Recruiter actions**
card counts CV downloads and email / phone / WhatsApp / GitHub / LinkedIn
clicks, so you can see whether the site is working.

After pulling this update run `npm run db:push` again (new `Event` table and
new project fields).

## Managing the portfolio (admin panel)

Log in at `/admin` to edit the site without touching code:

- **Analytics**: visitor stats and the full visit log
- **Projects**: add, edit, reorder, hide or delete projects (title, description,
  tech, GitHub and live-demo links)
- **Skills**: add, rename, reorder or delete skills
- **Experience**: edit entries; wrap words in `**double asterisks**` for bold
- **Messages**: inbox for the contact form on the site, with read/unread and delete

Changes appear on the public site straight away. First time only: open
**Projects** and click **Import starter content** to copy the built-in
projects, skills and experience into the database so you can edit them.
Until the database has content (or if it is unreachable) the site falls back
to the starter data in `/data`, so it never shows blank.

The contact form stores messages in the database (it does not send email),
skips bots with a hidden honeypot field, and limits each visitor to 5
messages per hour. After pulling these changes run `npm install` and
`npm run db:push` again to create the new tables.

## Visitor tracking backend

Every page view is stored in Postgres and shown at `/admin` (password
protected): total views, unique visitors, last 24h, top countries / devices /
browsers / referrers, and a paginated list of every visit.

**What is recorded per visit:** time, page, referrer, country and city (from
the host's geo headers, available on Vercel), device, browser, OS, and a
salted hash of IP + user agent used only to count repeat visitors.
**Not recorded:** raw IP addresses. Bots are skipped, and visitors who send
Do Not Track / Global Privacy Control are not counted.

### Setup

1. Create a free Postgres database at neon.tech, supabase.com, or via
   Vercel Storage. Copy its connection string(s).
2. `cp .env.example .env` and fill in `DATABASE_URL`, `DIRECT_URL`,
   `ADMIN_PASSWORD`, `SESSION_SECRET`, `IP_HASH_SALT`.
3. Create the table: `npm run db:push`
4. Run locally, then visit http://localhost:3000/admin and log in.
5. On Vercel/Netlify, add the same five variables in the project's
   environment settings before deploying.

### Privacy

The footer carries a short notice about the statistics collected. Because
this stores data about visitors (even hashed and approximate), check what
applies to you, for example Kenya's Data Protection Act 2019 and the GDPR
for EU visitors, and consider a fuller privacy policy. This is general
guidance, not legal advice. The `/admin` login is a single shared password,
so use a long random one.

## Running locally

```bash
npm install
cp .env.example .env   # then edit
npm run db:push
npm run dev
```

Open http://localhost:3000.

## Deploying

**Vercel** (recommended — built by the Next.js team, zero config):
push this repo to GitHub, then import it at vercel.com/new. It detects
Next.js automatically; no build settings needed.

**Netlify**: import the repo, framework preset "Next.js" — Netlify's
Next.js runtime handles the rest.

A `ci.yml` GitHub Actions workflow is included to run `next build` on every
push/PR as a safety check; it doesn't deploy anything itself.
