# AGENTS.md — techHappy

## Overview
**techHappy** ([https://www.techhappynews.com](https://www.techhappynews.com)) is a high-density, privacy-first editorial broadsheet and impact allocation terminal designed to counteract media cynicism in technology by streaming verified scientific breakthroughs and routing capital and code contributions to vetted public goods non-profits.

### Core Architecture & Modules
1. **`01 // WIRE FEED` ([`src/app/feed/page.tsx`](src/app/feed/page.tsx))**:
   - Automated scientific RSS/Atom wire aggregator pulling ~225 dispatches in parallel from 13 peer-reviewed feeds (MIT News, Nature, ScienceDaily, NASA, EFF, Our World in Data, CleanTechnica, UC Berkeley, Mozilla, etc.).
   - Two-pass XML sanitization pipeline in [`src/lib/rss.ts`](src/lib/rss.ts) to clean encoded HTML entities and strip raw tags.
   - Deterministic SHA-256 dispatch ID hashing and deduplication across multiple category syndications.
2. **`02 // DECISION TERMINAL & CAUSE MATCHER` ([`src/app/match/page.tsx`](src/app/match/page.tsx))**:
   - A 3-stage decision terminal helping technologists allocate capital, code mentorship, hardware, or policy advocacy to vetted 501(c)(3) organizations across digital rights, open source commons, earth science, engineering access, and assistive accessibility.
3. **`03 // CHARITY REGISTRY & TELEMETRY LEDGER` ([`src/app/page.tsx`](src/app/page.tsx))**:
   - Asymmetric 60/40 broadsheet homepage with live wire telemetry, interactive dispatch ledgers, and a comprehensive organization registry table.

---

## Design System & Token Rules
- **Anti-Trope Aesthetic**: Strictly avoid generic "AI-generated" tropes — no floating neon gradient halos, purple/indigo blur circles (`ambient-glow-*`), or uniform bubble radius values.
- **Color Palette**:
  - Dark ink backgrounds: `#080c12`, `#0c1017`, `#0f141e`
  - Crisp hairline borders: `border-neutral-800`, `border-neutral-700/80`
  - Restrained telemetry accents: Emerald `#10b981`, Amber `#f59e0b`
- **Typography Pairing**:
  - **Headlines & Display**: `Newsreader` (Variable serif)
  - **Body & UI**: `Plus Jakarta Sans`
  - **Telemetry & Section Indices**: `JetBrains Mono` (`01 // WIRE FEED`, `[ 01 CAUSE DOMAIN ]`)
- **Iconography**: Lucide React vector icons strictly (zero emojis across the entire UI).
- **Privacy & Storage**: 100% stateless client architecture. Bookmarks and preferences persist strictly in local browser storage (`localStorage`) via [`src/lib/useBookmarks.ts`](src/lib/useBookmarks.ts) with zero server tracking or cookies.

---

## Directory Layout
```text
techHappy/
├── src/
│   ├── app/                        # Next.js 15 App Router
│   │   ├── api/
│   │   │   ├── news/route.ts       # Parallel scientific wire fetcher & deduplication
│   │   │   └── match/route.ts      # Impact terminal scoring engine
│   │   ├── feed/page.tsx           # Live wire feed with filter ribbons & wire registry
│   │   ├── match/page.tsx          # 3-stage impact allocation terminal
│   │   ├── globals.css             # Wire grid pattern, font definitions, dark scrollbars
│   │   ├── layout.tsx              # Root shell with Newsreader, Plus Jakarta Sans, JetBrains Mono
│   │   └── page.tsx                # Editorial homepage with 60/40 hero and registry ledger
│   ├── components/                 # UI components
│   │   ├── Logo.tsx                # Bespoke geometric TH eyes-smile emblem
│   │   ├── Navbar.tsx              # Architectural header with telemetry status
│   │   ├── Footer.tsx              # 4-column engineering footer
│   │   ├── NewsCard.tsx            # Broadsheet dispatch card with significance ledger
│   │   └── Icons.tsx               # Vector icon mapping helpers
│   ├── data/
│   │   └── charities.json          # Curated database of vetted non-profits & impact metrics
│   └── lib/
│       ├── types.ts                # TypeScript interfaces (NewsItem, Charity, QuizState)
│       ├── rss.ts                  # Multi-source RSS aggregation & two-pass XML sanitization
│       ├── matcher.ts              # Weighted cause scoring engine
│       └── useBookmarks.ts         # LocalStorage hook for saved causes & dispatches
├── tailwind.config.ts              # Font families & dark ink color configuration
├── AGENTS.md                       # Comprehensive architecture and design guidelines
├── README.md                       # Project overview and quickstart
└── package.json                    # Scripts and dependencies
```

---

## Engineering Guidelines
- **Build Verification**: Always run `npm run build` to verify Next.js static generation and TypeScript type safety across all routes.
- **Git Remote**: GitHub repository at `git@github.com:jakenathanson15/techHappy.git`. Automatic production deployment is triggered on push to `main`.
