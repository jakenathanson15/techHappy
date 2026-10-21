# techHappy

> **A high-density editorial broadsheet and impact terminal for constructive technology.** Real-time peer-reviewed research wires meet verified capital allocation matrices for public technical goods.

[![Production](https://img.shields.io/badge/Production-techhappynews.com-080c12?style=flat&logo=vercel)](https://www.techhappynews.com)
[![Next.js](https://img.shields.io/badge/Next.js-15_(App_Router)-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS_v3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## System Architecture

```
                  ┌──────────────────────────────────────────────┐
                  │          techhappynews.com Client            │
                  │  (Newsreader Serif + Monospaced Telemetry)   │
                  └───────────────────────┬──────────────────────┘
                                          │
                  ┌───────────────────────┴──────────────────────┐
                  │        Next.js 15 App Router Edge Layer      │
                  └───────────┬──────────────────────┬───────────┘
                              │                      │
                 GET /api/news│         POST /api/match
                              ▼                      ▼
               ┌──────────────────────┐    ┌──────────────────────┐
               │ Multi-Source Wire    │    │ Decision Terminal    │
               │ Parallel Aggregator  │    │ Impact Matrix Engine │
               │ (13 Scientific RSS)  │    │ (Category & Scoring) │
               └──────────┬───────────┘    └──────────┬───────────┘
                          │                           │
            ┌─────────────┴─────────────┐             ▼
            │ MIT News, Nature, NASA,   │    ┌───────────────────┐
            │ Our World in Data, EFF,   │    │ Curated Registry  │
            │ CleanTechnica, ScienceD.  │    │ of Vetted 501(c)3 │
            └───────────────────────────┘    └───────────────────┘
```

---

## Key Modules

### `01 // WIRE FEED` — Real-Time Research Ingestion
An automated, high-density wire feed streaming peer-reviewed breakthroughs across:
- **Clean Energy & Climate Computation**: Grid decarbonization, satellite emissions telemetry, and carbon capture.
- **Biotech & Neural Accessibility**: Assistive hardware, open prosthetic blueprints, and open biomedical data.
- **AI for Good & Open Systems**: Interpretable models, decentralized protocol resilience, and safety research.
- **Digital Commons & Rights**: Cryptographic civil liberties, open web standards, and public software archives.

**Wire Pipeline Highlights:**
- Ingests **13 academic and institutional feeds** (MIT News, Nature, ScienceDaily, NASA, EFF, Our World in Data, CleanTechnica, UC Berkeley, Mozilla, etc.) in parallel via `Promise.allSettled`.
- **Two-Pass XML Sanitization**: Cleans escaped entities, HTML tags, and raw CDATA blocks into crisp editorial briefs.
- **SHA-256 Content Hashing**: Deterministic dispatch IDs prevent duplicates across syndication feeds.

### `02 // REGISTRY & DECISION TERMINAL` — Impact Allocation Matrix
A 3-stage decision terminal helping technologists and engineers deploy capital, code reviews, and hardware to verified 501(c)(3) initiatives:
- **Stage 01 — Cause Domain**: Digital Privacy, Engineering Access, Earth Science, Public Goods, or Neural Access.
- **Stage 02 — Deployment Mode**: Direct Capital Allocation, Code & Architecture Review, Hardware Provisioning, or Policy Advocacy.
- **Stage 03 — Reach Scope**: Transnational, Internet Protocol Commons, or Regional Grassroots Labs.

---

## Design System

Designed to eliminate generic "AI-generated" tropes (floating gradient orbs, blurred neon halos, uniform pill containers, and buzzwords) in favor of a typography-first engineering broadsheet:

- **Typography**:
  - **Headlines & Editorial**: `Newsreader` (Character-rich display serif)
  - **UI & Reading Flow**: `Plus Jakarta Sans` (Readable grotesque sans-serif)
  - **Data, Metadata & Telemetry**: `JetBrains Mono` (Monospaced metrics & section indices)
- **Palette**: Deep carbon and ink tones (`#080c12`, `#0c1017`, `#111827`), hairline neutral borders (`border-neutral-800`), and restrained emerald telemetry accents (`#10b981`).
- **Privacy & Storage**: 100% stateless client architecture. Bookmarks and preferences persist strictly in local browser storage (`localStorage`) with zero server tracking or cookies.

---

## Development

### Prerequisites
- Node.js (v20+)
- npm, pnpm, or yarn

### Setup
```bash
# Clone the repository
git clone git@github.com:jakenathanson15/techHappy.git
cd techHappy

# Install dependencies
npm install

# Run the local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to inspect the local interface.

### Build & Typecheck
```bash
# Clean cache & run Next.js production build
npm run clean
npm run build
```

---

## Production Deployment

Production is deployed automatically via Vercel at:
- **Canonical URL**: [https://www.techhappynews.com](https://www.techhappynews.com)
- **Wire Feed**: [https://www.techhappynews.com/feed](https://www.techhappynews.com/feed)
- **Impact Terminal**: [https://www.techhappynews.com/match](https://www.techhappynews.com/match)

---

## License
MIT © [Jake Nathanson](https://github.com/jakenathanson15)
