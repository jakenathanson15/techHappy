import Link from "next/link";
import {
  ArrowRight,
  Shield,
  ArrowUpRight,
  Calendar,
  Sparkles,
  ExternalLink,
  HeartHandshake,
  Compass,
} from "lucide-react";
import charitiesData from "@/data/charities.json";
import { fetchUpliftNews, RSS_SOURCES } from "@/lib/rss";
import { IconMap } from "@/components/Icons";
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

  // Filter for stories with valid image URLs first
  const withImages = news.filter((item) => item.imageUrl && item.imageUrl.startsWith("http"));
  const pool = withImages.length > 0 ? withImages : news;

  // Simple string hash of the date string (e.g. "10/20/2026")
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
  const featuredCharities = allCharities.slice(0, 6);

  return (
    <div className="relative pb-24 wire-grid-bg min-h-screen">
      {/* 1. Hero & Mission Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pt-12 sm:pt-20 pb-12 sm:pb-16 text-center">
        <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-emerald-400 mb-4 px-3 py-1 rounded-sm bg-emerald-950/40 border border-emerald-800/40">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>AN INDEPENDENT PUBLICATION & DIRECTORY</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-neutral-100 leading-[1.08] max-w-4xl mx-auto">
          Some good news for a change.
        </h1>

        <p className="font-sans text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl mx-auto mt-6">
          Real progress in technology is happening every day. We just rarely hear about it. techHappy curates verified breakthroughs in climate science, medicine, and open digital tools, and helps you find great causes to support.
        </p>

        {/* The Two Clear Doorways */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mt-10 text-left">
          {/* Doorway 1: The Feed */}
          <Link
            href="/feed"
            className="group wire-card rounded-sm p-6 flex flex-col justify-between hover:border-emerald-500/50 transition duration-150"
          >
            <div>
              <div className="flex items-center justify-between mb-3 font-mono text-xs text-emerald-400 font-semibold">
                <span>01 // YOUR GOOD NEWS FEED</span>
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition" />
              </div>
              <h2 className="font-serif text-2xl font-normal text-neutral-100 mb-2 group-hover:text-emerald-300 transition">
                Explore the Feed
              </h2>
              <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Real-time, positive breakthroughs across clean energy, biotech, AI for good, and the open web.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between font-mono text-xs text-neutral-300">
              <span className="text-neutral-500">Updated Hourly</span>
              <span className="font-semibold text-emerald-400 group-hover:underline inline-flex items-center gap-1">
                Browse the Feed <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>

          {/* Doorway 2: Find a Cause */}
          <Link
            href="/match"
            className="group wire-card rounded-sm p-6 flex flex-col justify-between hover:border-teal-500/50 transition duration-150"
          >
            <div>
              <div className="flex items-center justify-between mb-3 font-mono text-xs text-teal-400 font-semibold">
                <span>02 // FIND A CAUSE</span>
                <HeartHandshake className="h-4 w-4 transform group-hover:scale-110 transition" />
              </div>
              <h2 className="font-serif text-2xl font-normal text-neutral-100 mb-2 group-hover:text-teal-300 transition">
                Take the Matcher
              </h2>
              <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
                A quick 3-step guide to connect your skills, time, or donations with vetted non-profits making a real difference.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between font-mono text-xs text-neutral-300">
              <span className="text-neutral-500">100% Vetted Non-Profits</span>
              <span className="font-semibold text-teal-400 group-hover:underline inline-flex items-center gap-1">
                Find Your Cause <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 2. Story of the Day (EST Midnight Spotlight) */}
      {storyOfTheDay && (
        <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12 border-t border-neutral-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold">
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

          <div className="wire-card rounded-sm overflow-hidden p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {storyOfTheDay.imageUrl && (
              <div className="lg:col-span-5 relative aspect-[16/10] sm:aspect-[4/3] rounded-sm overflow-hidden bg-neutral-900 border border-neutral-800">
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
                <span className="text-emerald-400 font-semibold">{storyOfTheDay.source}</span>
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

      {/* 3. Our Causes Section (Vetted Non-Profit Index) */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12 border-t border-neutral-800/80">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-3 border-b border-neutral-800">
          <div>
            <div className="font-mono text-xs text-teal-400 font-semibold mb-1">
              OUR CAUSES // VETTED DIRECTORY
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-neutral-100">
              Vetted Non-Profit Index
            </h2>
            <p className="font-sans text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
              Featured organizations evaluated for transparent governance, 4-star Charity Navigator ratings, and direct technical impact.
            </p>
          </div>

          <Link
            href="/match"
            className="font-mono text-xs text-teal-400 hover:text-teal-300 transition inline-flex items-center gap-1 font-semibold"
          >
            <span>Explore All {allCharities.length} Causes</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredCharities.map((charity) => {
            const IconComp = IconMap[charity.iconName] || Shield;
            return (
              <div
                key={charity.id}
                className="wire-card rounded-sm p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-neutral-800">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-neutral-900 border border-neutral-800 text-teal-400">
                        <IconComp className="h-3.5 w-3.5" />
                      </div>
                      <span className="font-mono text-[11px] text-neutral-400 font-semibold">
                        {charity.shortName}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded-sm">
                      {charity.rating}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-normal text-neutral-100 mb-1">
                    {charity.name}
                  </h3>
                  <p className="font-sans text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-3">
                    {charity.tagline}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-neutral-800/80 flex items-center justify-between font-mono text-xs">
                  <span className="text-[10px] text-neutral-500 uppercase">
                    {charity.category.replace(/-/g, " ")}
                  </span>
                  <a
                    href={charity.donateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-teal-400 hover:text-teal-300 font-semibold"
                  >
                    <span>Direct Action</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Our Sources Section (Scientific & Open Source Wires) */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12 border-t border-neutral-800/80">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-3 border-b border-neutral-800">
          <div>
            <div className="font-mono text-xs text-emerald-400 font-semibold mb-1">
              OUR SOURCES // SCIENTIFIC & OPEN COMMONS
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-neutral-100">
              The Research Wires
            </h2>
            <p className="font-sans text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
              Sourced directly from {RSS_SOURCES.length} peer-reviewed research labs, journals, and open-source foundations.
            </p>
          </div>

          <Link
            href="/feed"
            className="font-mono text-xs text-emerald-400 hover:text-emerald-300 transition inline-flex items-center gap-1 font-semibold"
          >
            <span>Live Stream</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {RSS_SOURCES.map((source) => (
            <a
              key={source.name}
              href={source.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="wire-card rounded-sm p-3.5 hover:border-neutral-700 transition flex flex-col justify-between group"
            >
              <div>
                <div className="font-mono text-[10px] text-neutral-500 uppercase mb-1">
                  {source.defaultCategory}
                </div>
                <div className="font-sans font-semibold text-xs sm:text-sm text-neutral-200 group-hover:text-emerald-300 transition">
                  {source.name}
                </div>
              </div>
              <div className="pt-2 mt-2 border-t border-neutral-800/60 flex items-center justify-between font-mono text-[10px] text-neutral-500">
                <span>Research Desk</span>
                <ArrowUpRight className="h-2.5 w-2.5 text-neutral-400 group-hover:text-emerald-400" />
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
