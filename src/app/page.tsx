import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  ExternalLink,
  HeartHandshake,
} from "lucide-react";
import charitiesData from "@/data/charities.json";
import { fetchUpliftNews, RSS_SOURCES } from "@/lib/rss";
import { Charity, NewsItem } from "@/lib/types";

// Helper to get formatted date in America/New_York (EST/EDT)
function getTodayDateEST(): { formattedDate: string; dateSeed: string } {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const seedFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return {
    formattedDate: formatter.format(now),
    dateSeed: seedFormatter.format(now),
  };
}

// Selects the Story of the Day deterministically based on EST date
function selectStoryOfTheDay(news: NewsItem[], dateSeed: string): NewsItem | null {
  if (!news || news.length === 0) return null;

  const withImages = news.filter((item) => item.imageUrl && item.imageUrl.startsWith("http"));
  const pool = withImages.length > 0 ? withImages : news;

  let hash = 0;
  for (let i = 0; i < dateSeed.length; i++) {
    hash = (hash << 5) - hash + dateSeed.charCodeAt(i);
    hash |= 0;
  }

  const positiveIndex = Math.abs(hash) % pool.length;
  return pool[positiveIndex] || news[0];
}

export default async function HomePage() {
  const latestNews = await fetchUpliftNews();
  const { formattedDate, dateSeed } = getTodayDateEST();
  const storyOfTheDay = selectStoryOfTheDay(latestNews, dateSeed);
  const allCharities = charitiesData as Charity[];
  const featuredCharities = allCharities.slice(0, 4);
  const featuredSources = RSS_SOURCES.slice(0, 4);

  return (
    <div className="relative pb-24 wire-grid-bg min-h-screen">
      {/* 1. Hero & Mission Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pt-12 sm:pt-20 pb-12 sm:pb-16 text-center">
        <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#f5e642] mb-4 px-3 py-1 border border-[#f5e642]/30 bg-[#f5e642]/5">
          <span className="h-1.5 w-1.5 bg-[#f5e642]" />
          <span>AN INDEPENDENT PUBLICATION & DIRECTORY</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-neutral-100 leading-[1.08] max-w-4xl mx-auto">
          Some good news for a change.
        </h1>

        <p className="font-sans text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl mx-auto mt-6">
          Real progress in technology is happening every day. We just rarely hear about it. techHappy curates verified breakthroughs in climate science, medicine, and open digital tools, and helps you find great causes to support.
        </p>

        {/* The Two Clear Doorways */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mt-10 text-left">
          {/* Doorway 1: The Feed */}
          <Link
            href="/feed"
            className="group relative wire-card p-8 flex flex-col justify-between transition-colors duration-300 overflow-hidden"
          >
            {/* Yellow top border line — grows in on hover */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#f5e642] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left pointer-events-none" />
            {/* Subtle yellow glow wash on hover */}
            <div className="absolute inset-0 bg-[#f5e642]/0 group-hover:bg-[#f5e642]/[0.03] transition-colors duration-300 pointer-events-none" />

            <div className="relative">
              <div className="flex items-center gap-2 mb-4 font-mono text-[11px] text-neutral-500 font-semibold tracking-widest uppercase">
                <span className="h-1.5 w-1.5 bg-[#f5e642] animate-pulse" />
                <span className="group-hover:text-[#f5e642] transition-colors duration-300">Live Wire</span>
                <span className="ml-auto text-neutral-700">01</span>
              </div>
              <h2 className="font-serif text-4xl font-normal text-neutral-100 mb-3 leading-tight group-hover:text-[#f5e642] transition-colors duration-300">
                Your good<br />news feed.
              </h2>
              <p className="font-sans text-xs text-neutral-500 leading-relaxed mb-5 group-hover:text-neutral-400 transition-colors duration-300">
                ~225 verified dispatches, hourly. Climate breakthroughs, open-source releases, biotech milestones.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["Climate Tech", "AI for Good", "Open Access", "Healthcare"].map((tag) => (
                  <span key={tag} className="font-mono text-[10px] px-2 py-0.5 border border-neutral-800 text-neutral-600 group-hover:border-[#f5e642]/40 group-hover:text-[#f5e642]/70 group-hover:bg-[#f5e642]/5 transition-all duration-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative pt-5 mt-5 border-t border-neutral-800/80 flex items-center justify-between">
              <span className="font-mono text-[11px] text-neutral-600">13 research desks</span>
              <span className="font-mono text-xs font-semibold text-[#f5e642] inline-flex items-center gap-1 group-hover:gap-2.5 transition-all duration-200">
                Read the Wire <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>

          {/* Doorway 2: Find a Cause */}
          <Link
            href="/match"
            className="group relative wire-card p-8 flex flex-col justify-between transition-colors duration-300 overflow-hidden hover:bg-[#161410]"
          >
            {/* Yellow bottom line — grows in on hover */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#f5e642] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right pointer-events-none" />

            <div className="relative">
              <div className="flex items-center gap-2 mb-4 font-mono text-[11px] text-neutral-500 font-semibold tracking-widest uppercase">
                <HeartHandshake className="h-3 w-3 group-hover:text-[#f5e642] transition-colors duration-300" />
                <span className="group-hover:text-[#f5e642] transition-colors duration-300">Impact Matcher</span>
                <span className="ml-auto text-neutral-700">02</span>
              </div>
              <h2 className="font-serif text-4xl font-normal text-neutral-100 mb-3 leading-tight group-hover:text-white transition-colors duration-300">
                Find the<br />right cause.
              </h2>
              <p className="font-sans text-xs text-neutral-500 leading-relaxed mb-5 group-hover:text-neutral-400 transition-colors duration-300">
                3 questions. Matched to vetted 501(c)(3) non-profits by domain, contribution type, and your capacity.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["Code", "Donate", "Mentor", "Advocate"].map((tag) => (
                  <span key={tag} className="font-mono text-[10px] px-2 py-0.5 border border-neutral-800 text-neutral-600 group-hover:border-neutral-700 group-hover:text-neutral-400 transition-all duration-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative pt-5 mt-5 border-t border-neutral-800/80 flex items-center justify-between">
              <span className="font-mono text-[11px] text-neutral-600">4-star rated orgs only</span>
              <span className="inline-flex items-center gap-1.5 bg-[#f5e642] px-3 py-1 font-mono text-[11px] font-bold text-[#0a0a0a] group-hover:bg-[#faf080] transition-colors duration-200">
                Start Matcher <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform duration-200" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 2. Story of the Day (EST Midnight Spotlight) */}
      {storyOfTheDay && (
        <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12 border-t border-neutral-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2 font-mono text-xs text-[#f5e642] font-semibold">
              <Calendar className="h-3.5 w-3.5" />
              <span>STORY OF THE DAY • {formattedDate} (MIDNIGHT EST EDITION)</span>
            </div>

            <Link
              href="/feed"
              className="font-mono text-xs text-neutral-400 hover:text-white transition inline-flex items-center gap-1"
            >
              <span>Explore More Today</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="wire-card overflow-hidden p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {storyOfTheDay.imageUrl && (
              <div className="lg:col-span-5 relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden bg-[#181818] border border-white/10">
                <img
                  src={storyOfTheDay.imageUrl}
                  alt={storyOfTheDay.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="eager"
                />
              </div>
            )}

            <div className={storyOfTheDay.imageUrl ? "lg:col-span-7 space-y-4" : "lg:col-span-12 space-y-4"}>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-[#f5e642] font-semibold">{storyOfTheDay.source}</span>
                <span className="text-neutral-600">•</span>
                <span className="text-neutral-400">{storyOfTheDay.category}</span>
                <span className="text-neutral-600">•</span>
                <span className="text-neutral-500">{storyOfTheDay.readTimeMinutes} min read</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-neutral-100 leading-snug">
                {storyOfTheDay.title}
              </h2>

              <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-3">
                {storyOfTheDay.summary}
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href={storyOfTheDay.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-sm bg-neutral-100 px-4 py-2 font-mono text-xs font-semibold text-neutral-950 hover:bg-white transition"
                >
                  <span>Read Story</span>
                  <ExternalLink className="h-3 w-3 text-neutral-950" />
                </a>

                <Link
                  href="/feed"
                  className="inline-flex items-center gap-1.5 rounded-sm border border-neutral-800 bg-[#0c1017] px-4 py-2 font-mono text-xs font-semibold text-neutral-300 hover:border-neutral-700 hover:text-white transition"
                >
                  <span>Explore More Today</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. The Split Dossier: Our Causes & The Wire Network */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12 border-t border-neutral-800/80">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0 lg:divide-x divide-neutral-800/80">
          
          {/* Column 1: Our Causes */}
          <div className="lg:pr-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="font-mono text-xs text-[#f5e642] font-semibold uppercase tracking-wider">
                  OUR CAUSES // VETTED DIRECTORY
                </div>
                <span className="font-mono text-[11px] text-neutral-500">
                  {allCharities.length} Non-Profits
                </span>
              </div>
              <h2 className="font-serif text-2xl font-normal text-neutral-100 mb-2">
                Featured Non-Profits
              </h2>
              <p className="font-sans text-xs text-neutral-400 mb-6 leading-relaxed">
                Organizations vetted for 100% Charity Navigator ratings, open governance, and direct technical leverage.
              </p>

              {/* Typographic Ruled Ledger */}
              <div className="divide-y divide-neutral-800/60 border-y border-neutral-800/60">
                {featuredCharities.map((charity, idx) => (
                  <div key={charity.id} className="py-4 group">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-[11px] text-neutral-600 font-medium">
                          0{idx + 1}
                        </span>
                        <h3 className="font-serif text-base font-normal text-neutral-100 group-hover:text-[#f5e642] transition">
                          {charity.name}
                        </h3>
                      </div>
                      <a
                        href={charity.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-500 group-hover:text-[#f5e642] transition flex-shrink-0"
                        title="Visit organization website"
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-500 mb-1.5 ml-6">
                      <span className="text-[#f5e642]/80">{charity.category.replace(/-/g, " ")}</span>
                      <span>•</span>
                      <span className="text-neutral-400">{charity.rating}</span>
                    </div>

                    <p className="font-sans text-xs text-neutral-400 leading-relaxed ml-6 line-clamp-2">
                      {charity.tagline}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-neutral-800/80">
              <Link
                href="/causes"
                className="group font-mono text-xs text-[#f5e642] hover:text-[#faf080] font-semibold inline-flex items-center gap-1.5"
              >
                <span>View Complete Causes Directory ({allCharities.length} Organizations)</span>
                <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </div>

          {/* Column 2: The Wire Network (Sources) */}
          <div className="lg:pl-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="font-mono text-xs text-[#f5e642] font-semibold uppercase tracking-wider">
                  THE WIRE NETWORK // RESEARCH DESKS
                </div>
                <span className="font-mono text-[11px] text-neutral-500">
                  {RSS_SOURCES.length} Feeds
                </span>
              </div>
              <h2 className="font-serif text-2xl font-normal text-neutral-100 mb-2">
                Scientific Sources
              </h2>
              <p className="font-sans text-xs text-neutral-400 mb-6 leading-relaxed">
                Ingested directly from peer-reviewed scientific journals, academic labs, and public digital archives.
              </p>

              {/* Typographic Ruled Ledger */}
              <div className="divide-y divide-neutral-800/60 border-y border-neutral-800/60">
                {featuredSources.map((source, idx) => (
                  <div key={source.name} className="py-4 group">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-[11px] text-neutral-600 font-medium">
                          0{idx + 1}
                        </span>
                        <h3 className="font-serif text-base font-normal text-neutral-100 group-hover:text-[#f5e642] transition">
                          {source.name}
                        </h3>
                      </div>
                      <a
                        href={source.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-500 group-hover:text-[#f5e642] transition flex-shrink-0"
                        title="Visit source research desk"
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-500 mb-1.5 ml-6">
                      <span className="text-[#f5e642]/80">{source.defaultCategory}</span>
                      <span>•</span>
                      <span className="text-neutral-400">{source.sourceUrl.replace("https://", "").replace("www.", "")}</span>
                    </div>

                    <p className="font-sans text-xs text-neutral-400 leading-relaxed ml-6 line-clamp-2">
                      {source.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-neutral-800/80">
              <Link
                href="/sources"
                className="group font-mono text-xs text-[#f5e642] hover:text-[#faf080] font-semibold inline-flex items-center gap-1.5"
              >
                <span>View Wire Network & Editorial Standards ({RSS_SOURCES.length} Feeds)</span>
                <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
