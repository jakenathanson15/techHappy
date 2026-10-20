# AGENTS.md — techHappy

## Overview
**techHappy** is a web application designed to counteract tech cynicism and doom-and-gloom media by highlighting positive, high-impact breakthroughs in technology and connecting tech professionals directly with vetted tech-adjacent non-profits and causes.

### Core Value Pillars
1. **The Uplift Feed**: An automated, curated stream of positive technology, AI for good, climate-tech, healthcare, and open-source breakthroughs with concise "Why This Matters" summaries.
2. **Tech Impact Matcher**: An interactive questionnaire that guides users to tech-adjacent charities and volunteer initiatives based on causes they care about (digital literacy, open access, ethical AI, humanitarian tech, accessibility).

---

## Architecture & Technology Stack
- **Framework**: [Next.js (App Router)](https://nextjs.org/) + TypeScript
- **Styling & UI**: Tailwind CSS + Lucide React Icons
- **AI / Curation**: Server-side lightweight LLM sentiment extraction & summarization (OpenAI / Claude API) with fallback heuristic curation
- **Data & Caching**: Curated JSON database for charities; in-memory server cache for RSS feeds and news summaries
- **Deployment**: Vercel (connected to `jakenathanson15/techHappy`)

---

## Repository Structure
```text
techHappy/
├── .bob/                           # Bob workspace rules and MCP configs
│   ├── rules/project.md            # Coding standards and guidelines
│   └── mcp.json                    # GitHub MCP config
├── src/
│   ├── app/                        # Next.js App Router pages and API routes
│   │   ├── api/
│   │   │   ├── news/route.ts       # Positive news fetcher & AI summarizer
│   │   │   └── match/route.ts      # Impact matcher recommendation logic
│   │   ├── feed/page.tsx           # Uplift feed page
│   │   ├── match/page.tsx          # Questionnaire & results UI
│   │   ├── layout.tsx              # Root layout & navigation
│   │   └── page.tsx                # Hero landing page
│   ├── components/                 # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── NewsCard.tsx
│   │   └── QuizStep.tsx
│   ├── data/
│   │   └── charities.json          # Curated database of tech non-profits
│   └── lib/
│       ├── ai.ts                   # Lightweight LLM client helper
│       └── rss.ts                  # RSS parser and feed aggregators
├── AGENTS.md                       # Agent orientation & context
├── README.md                       # User documentation
└── .gitignore                      # Git ignore patterns
```

---

## Conventions & Standards
- **Strict TypeScript**: No `any` types; define clear interfaces for charities, news items, and quiz states.
- **Server/Client Separation**: Keep server actions and API keys isolated to Server Components and API routes; use Client Components only for interactivity (`"use client"`).
- **Graceful Fallbacks**: If external AI APIs or RSS feeds are temporarily unavailable, always serve cached / fallback curated positive tech stories so the app is always fast and resilient.

---

## Key Decisions Log
- **2026-10-19**: Chose Next.js App Router + TypeScript + Tailwind CSS for a single-repo, zero-backend-server architecture.
- **2026-10-19**: Structured charity data into curated static JSON with categories, donation URLs, and volunteer opportunities to avoid database complexity in MVP.
