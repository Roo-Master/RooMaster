# Okoth Reagan — Portfolio (Next.js)

A single-page developer portfolio, migrated from static HTML/CSS/JS to
Next.js (App Router + TypeScript), keeping the original dark/blue design.

## Structure

```
.
├── app/
│   ├── layout.tsx        # <head> metadata, fonts, favicon
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

## Running locally

```bash
npm install
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
