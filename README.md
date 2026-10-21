# techHappy

> **A high-density editorial broadsheet and impact terminal for constructive technology.** Real-time peer-reviewed research wires meet verified capital allocation matrices for public technical goods.

[![Production](https://img.shields.io/badge/Production-techhappynews.com-080c12?style=flat&logo=vercel)](https://www.techhappynews.com)
[![Next.js](https://img.shields.io/badge/Next.js-15_(App_Router)-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS_v3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zero Trackers](https://img.shields.io/badge/Privacy-Zero_Trackers-10b981?style=flat)](https://www.techhappynews.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## Overview

**techHappy** is an independent, open-source publication and philanthropy directory designed to counteract media cynicism in technology. It streams verified breakthroughs from peer-reviewed scientific journals, research universities, and open-source foundations — paired with a curated directory and decision engine connecting technical workers to vetted 501(c)(3) initiatives.

### Core Principles
- **Primary Research Only**: Sourced directly from laboratory desks (MIT, Berkeley, NASA) and academic journals (Nature, ScienceDaily) rather than speculative secondary commentary.
- **Constructive Focus**: Highlights tangible progress across clean energy, biotechnology, neural accessibility, open web standards, and public digital goods.
- **Zero Surveillance**: 100% stateless client architecture. Bookmarks and preferences persist strictly in local browser storage (`localStorage`) with zero tracking cookies or analytics pixels.

---

## System Architecture

```
                               ┌────────────────────────────────────────────────┐
                               │           techhappynews.com Client             │
                               │   (Newsreader Serif + JetBrains Telemetry)     │
                               └───────────────────────┬────────────────────────┘
                                                       │
                               ┌───────────────────────┴────────────────────────┐
                               │       Next.js 15 App Router Edge Layer         │
                               └───────────┬────────────────────────┬───────────┘
                                           │                        │
                              GET /api/news│           POST /api/match
                                           ▼                        ▼
                            ┌──────────────────────┐ ┌──────────────────────┐
                            │ Multi-Source Wire    │ │ Decision Terminal    │
                            │ Parallel Aggregator  │ │ Impact Matrix Engine │
                            │ (13 Scientific RSS)  │ │ (Category & Scoring) │
                            └──────────┬───────────┘ └──────────┬───────────┘
                                       │                        │
                         ┌─────────────┴─────────────┐          ▼
                         │ MIT News, Nature, NASA,   │ ┌───────────────────┐
                         │ Our World in Data, EFF,   │ │ Curated Registry  │
                         │ CleanTechnica, ScienceD.  │ │ of Vetted 501(c)3 │
                         └───────────────────────────┘ └───────────────────┘
```

---

## Key Modules & Routes

| Route | Name | Description |
| :--- | :--- | :--- |
| **`/`** | **Broadsheet Front** | Asymmetric editorial landing page featuring the midnight EST *Story of the Day*, two clear pathways, and the *Split Dossier* index. |
| **`/feed`** | **The Wire Feed** | Real-time multi-source research stream with category filters, source toggles, live search, and local bookmarking. |
| **`/causes`** | **Causes Directory** | Searchable registry of vetted 501(c)(3) technical non-profits with verified impact metrics and direct action channels. |
| **`/sources`** | **Sources & Standards** | Transparent masthead indexing all 13 research wires alongside editorial criteria and ingestion telemetry. |
| **`/match`** | **Impact Matcher** | A 3-step decision terminal helping technologists allocate capital, code reviews, and hardware to aligned non-profits. |

---

## Technical Highlights

### 1. Ingestion & Sanitization Pipeline ([`src/lib/rss.ts`](src/lib/rss.ts))
- **Parallel Dispatch**: Ingests 13 academic feeds in parallel using `Promise.allSettled`, preventing slow endpoints from blocking the edge stream.
- **Two-Pass XML Sanitization**: Decodes escaped HTML entities (`&lt;p&gt;`, `&amp;`), strips raw tags, and normalizes descriptions into concise editorial abstracts.
- **Deterministic Content Hashing**: Generates unique SHA-256 hashes (`sha256(source + ":" + link + ":" + title)`) to deduplicate syndicated articles across multiple categories.

### 2. Midnight EST Spotlight Engine
- Calculates a deterministic daily seed based on Eastern Standard Time (`America/New_York`), automatically rotating the featured *Story of the Day* every midnight EST without requiring server restarts.

### 3. Design System & Typography
Designed to eliminate generic "AI-generated" tropes (floating gradient orbs, blurred neon halos, uniform pill containers, and buzzwords) in favor of a typography-first engineering broadsheet:
- **Display Headlines**: `Newsreader` (Variable serif)
- **UI & Reading Flow**: `Plus Jakarta Sans` (Grotesque sans-serif)
- **Telemetry & Section Indices**: `JetBrains Mono` (Monospaced metrics)
- **Palette**: Deep carbon and ink tones (`#080c12`, `#0c1017`, `#111827`), hairline neutral borders (`border-neutral-800`), and restrained emerald accents (`#10b981`).

---

## Directory Structure

```text
techHappy/
├── src/
│   ├── app/                        # Next.js 15 App Router
│   │   ├── api/
│   │   │   ├── news/route.ts       # Parallel scientific wire fetcher & deduplication
│   │   │   └── match/route.ts      # Impact terminal scoring engine
│   │   ├── causes/page.tsx         # Vetted 501(c)(3) causes directory
│   │   ├── feed/page.tsx           # Live wire feed with filter ribbons & wire registry
│   │   ├── match/page.tsx          # 3-stage impact allocation terminal
│   │   ├── sources/page.tsx        # Scientific wire masthead & editorial standards
│   │   ├── globals.css             # Wire grid pattern, font definitions, dark scrollbars
│   │   ├── layout.tsx              # Root shell with typography variables and entrance splash
│   │   └── page.tsx                # Broadsheet homepage with split dossier
│   ├── components/                 # UI components
│   │   ├── Logo.tsx                # Bespoke geometric TH eyes-smile emblem
│   │   ├── Navbar.tsx              # Architectural header with numbered section routes
│   │   ├── Footer.tsx              # 4-column engineering footer
│   │   ├── NewsCard.tsx            # Broadsheet dispatch card with significance ledger
│   │   ├── SplashEntrance.tsx      # Animated TH geometric entrance splash
│   │   └── Icons.tsx               # Vector icon mapping helpers
│   ├── data/
│   │   └── charities.json          # Curated database of vetted non-profits & impact metrics
│   └── lib/
│       ├── types.ts                # TypeScript interfaces (NewsItem, Charity, QuizState)
│       ├── rss.ts                  # Multi-source RSS aggregation & two-pass XML sanitization
│       ├── matcher.ts              # Weighted cause scoring engine
│       └── useBookmarks.ts         # LocalStorage hook for saved causes & dispatches
├── tailwind.config.ts              # Font families & dark ink color configuration
├── AGENTS.md                       # Comprehensive architecture and developer context
├── README.md                       # Public documentation & quickstart
└── package.json                    # Scripts and dependencies
```

---

## Getting Started

### Prerequisites
- Node.js (v20+)
- npm, pnpm, or yarn

### Installation
```bash
# Clone repository
git clone git@github.com:jakenathanson15/techHappy.git
cd techHappy

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application locally.

### Production Build
```bash
# Clean cache and build for production
npm run clean
npm run build
```

---

## Production Deployment

Production is deployed automatically via Vercel at:
* **Canonical Domain**: [https://www.techhappynews.com](https://www.techhappynews.com)
* **Wire Feed**: [https://www.techhappynews.com/feed](https://www.techhappynews.com/feed)
* **Causes Directory**: [https://www.techhappynews.com/causes](https://www.techhappynews.com/causes)
* **Sources & Standards**: [https://www.techhappynews.com/sources](https://www.techhappynews.com/sources)
* **Impact Matcher**: [https://www.techhappynews.com/match](https://www.techhappynews.com/match)

---

## License

MIT © [Jake Nathanson](https://github.com/jakenathanson15)
