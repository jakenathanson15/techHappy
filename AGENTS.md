# AGENTS.md — techHappy

## Overview
**techHappy** is a privacy-first, zero-cost, open-source web application designed to counteract media cynicism in tech by highlighting positive, high-impact breakthroughs in technology and connecting technologists directly with vetted non-profits.

### Core Value Pillars
1. **The Uplift Feed**: An automated, curated stream of positive technology, climate-tech, biotech, healthcare, and open-source breakthroughs with concise "Why This Matters" summaries and high-res photography.
2. **Tech Impact Matcher**: A 3-step interactive questionnaire connecting tech workers with vetted 501(c)(3) tech-adjacent non-profits based on cause, preferred contribution method (code mentorship, direct donation, device giving), and scope.

---

## Architecture & Technology Stack
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/) + React 19 + TypeScript
- **Styling & UI**: Tailwind CSS (sleek dark mode `#080c14` with `#0e1524` glass surfaces and emerald/teal glows)
- **Icons**: Lucide React vector icons strictly (zero emojis across the entire UI)
- **Data & Ingestion**: Public RSS feeds from peer-reviewed scientific journals & verified labs parsed with `fast-xml-parser`, ISR hourly caching, and curated fallback datasets
- **Persistence**: Stateless browser `localStorage` hook ([`src/lib/useBookmarks.ts`](src/lib/useBookmarks.ts)) for bookmarks with zero user accounts or server tracking
- **Deployment & Git**: GitHub repository at `git@github.com:jakenathanson15/techHappy.git` configured with personal SSH key `~/.ssh/id_ed25519_techhappy`

---

## Repository Structure
```text
techHappy/
├── .bob/                           # Bob workspace rules and MCP configs
│   ├── rules/project.md            # Coding standards, clean scripts, and guidelines
│   └── mcp.json                    # GitHub MCP config
├── src/
│   ├── app/                        # Next.js App Router pages and API routes
│   │   ├── api/
│   │   │   ├── news/route.ts       # Hourly RSS fetcher & positive heuristics
│   │   │   └── match/route.ts      # Impact matcher recommendation logic
│   │   ├── feed/page.tsx           # Uplift feed page (two-column desktop layout)
│   │   ├── match/page.tsx          # 3-step questionnaire & results UI
│   │   ├── globals.css             # Tailwind theme, glowing gradients, animations
│   │   ├── layout.tsx              # Root layout & navigation shell
│   │   └── page.tsx                # Hero landing page
│   ├── components/                 # Reusable UI components
│   │   ├── Navbar.tsx              # Navigation bar with live links & badge
│   │   ├── Footer.tsx              # Footer with privacy pledge & repository link
│   │   ├── NewsCard.tsx            # Social card layout with dual source links
│   │   └── Icons.tsx               # Lucide icon mapping helpers
│   ├── data/
│   │   └── charities.json          # Curated database of 9 vetted tech non-profits
│   └── lib/
│       ├── types.ts                # TypeScript interfaces (NewsItem, Charity, QuizState)
│       ├── rss.ts                  # Multi-source RSS aggregation & image extractor
│       ├── matcher.ts              # Weighted cause scoring engine
│       └── useBookmarks.ts         # LocalStorage hook for saved causes & stories
├── AGENTS.md                       # Comprehensive project context
├── README.md                       # Public documentation & architecture overview
└── package.json                    # Dependencies & build scripts (clean, dev, build)
```

---

## Key Conventions & Decisions
- **Zero Cost & Zero Database**: Runs completely without paid API keys, external databases, or third-party auth services.
- **Social Feed UX**: News cards formatted as rich social posts with high-res photography, direct root source domain link in header, exact article link in footer, one-click link copying, and local bookmarking.
- **Two-Column Desktop Feed**: Main stream on the left (`lg:col-span-8`) with a right sticky sidebar (`lg:col-span-4`) containing search, category filters, curation standards, and the impact matcher CTA.
- **Zero Emojis**: All UI indicators, tags, and categories use crisp Lucide vector icons (`Shield`, `Code2`, `Globe2`, `Library`, `GraduationCap`, etc.).
- **Build Cleanliness**: Always run `npm run clean` before building to prevent webpack chunk conflicts.
