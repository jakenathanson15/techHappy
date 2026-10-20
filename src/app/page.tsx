import Link from "next/link";
import {
  HeartHandshake,
  ArrowRight,
  Shield,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import charitiesData from "@/data/charities.json";
import { fetchUpliftNews } from "@/lib/rss";
import { NewsCard } from "@/components/NewsCard";
import { IconMap } from "@/components/Icons";

export default async function HomePage() {
  const latestNews = await fetchUpliftNews();
  const topDispatches = latestNews.slice(0, 3);
  const featuredCharities = charitiesData.slice(0, 6);

  return (
    <div className="relative pb-20 wire-grid-bg min-h-screen">
      {/* 1. Asymmetric Hero Section */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-12 sm:pt-16 pb-12 border-b border-neutral-800/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Hero (Col 7 / 60%) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>01 // INDEPENDENT NEWS WIRE & PHILANTHROPY REGISTRY</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-100 leading-[1.08]">
              Engineering for human flourishing.
            </h1>

            <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl">
              An independent news wire tracking peer-reviewed breakthroughs across clean energy, biotechnology, and public digital goods — paired with a vetted charity directory for technical workers.
            </p>

            {/* Action Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/feed"
                className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-4 py-2.5 text-xs font-semibold text-neutral-950 transition duration-150 hover:bg-emerald-400 active:bg-emerald-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400"
              >
                <span className="font-mono text-[10px] text-neutral-950/70 font-bold">[01]</span>
                <span>Explore Wire Feed</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <Link
                href="/match"
                className="inline-flex items-center gap-2 rounded-md border border-neutral-700 bg-neutral-900/80 px-4 py-2.5 text-xs font-semibold text-neutral-200 transition duration-150 hover:bg-neutral-800 hover:text-white hover:border-neutral-600"
              >
                <span className="font-mono text-[10px] text-teal-400 font-bold">[02]</span>
                <span>Take Matcher Quiz</span>
                <HeartHandshake className="h-3.5 w-3.5 text-teal-400" />
              </Link>
            </div>

            {/* Key Specs Telemetry Strip */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-neutral-800/80 max-w-lg">
              <div>
                <div className="font-mono text-base font-bold text-white">13 Wires</div>
                <div className="font-mono text-[11px] text-neutral-400">Institutional RSS Feeds</div>
              </div>
              <div>
                <div className="font-mono text-base font-bold text-white">100% Vetted</div>
                <div className="font-mono text-[11px] text-neutral-400">4-Star Charity Navigator</div>
              </div>
              <div>
                <div className="font-mono text-base font-bold text-white">Zero Trackers</div>
                <div className="font-mono text-[11px] text-neutral-400">Privacy Preserved</div>
              </div>
            </div>
          </div>

          {/* Right Hero (Col 5 / 40%): Live Ledger Terminal */}
          <div className="lg:col-span-5 wire-card rounded-md p-4 sm:p-5">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-neutral-300">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>LIVE WIRE INGESTION</span>
              </div>
              <span className="font-mono text-[11px] text-neutral-400">225 Stories Stored</span>
            </div>

            <div className="space-y-3">
              {latestNews.slice(0, 4).map((item, idx) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2.5 rounded-sm bg-neutral-900/60 border border-neutral-800/70 hover:border-neutral-700 hover:bg-neutral-850 transition duration-150 group"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1">
                    <span className="text-emerald-400 font-semibold">{item.source}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" />
                      #{idx + 1}
                    </span>
                  </div>
                  <h2 className="font-sans text-xs font-semibold text-neutral-200 group-hover:text-emerald-300 transition line-clamp-2 leading-snug">
                    {item.title}
                  </h2>
                </a>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-400">Protocol: Fast-XML Multi-Feed</span>
              <Link
                href="/feed"
                className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
              >
                <span>View Full Stream</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Structured Section: Vetted Charity Registry Matrix */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 border-b border-neutral-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="font-mono text-xs text-teal-400 font-semibold mb-1">
              02 // HIGH-LEVERAGE CHARITY REGISTRY
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-white">
              Vetted Non-Profit Index
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
              Strictly selected for transparent governance, 4-star Charity Navigator evaluation, and direct technical leverage.
            </p>
          </div>

          <Link
            href="/match"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 hover:text-teal-300 transition font-mono"
          >
            <span>Match by Skills or Cause</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* High-Density Registry Table / Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredCharities.map((charity) => {
            const IconComp = IconMap[charity.iconName] || Shield;
            return (
              <div
                key={charity.id}
                className="wire-card rounded-md p-4 flex flex-col justify-between"
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

                  <h3 className="font-sans font-bold text-sm text-neutral-100 mb-1">
                    {charity.name}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-3">
                    {charity.tagline}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-neutral-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-[11px] text-neutral-400">
                    {charity.category.replace("-", " ")}
                  </span>
                  <a
                    href={charity.donateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold"
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

      {/* 3. Section: Recent Wire Dispatches Preview */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-12">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-800">
          <div>
            <div className="font-mono text-xs text-emerald-400 font-semibold mb-1">
              03 // RECENT DISPATCHES
            </div>
            <h2 className="font-display text-2xl font-medium text-white">
              Selected Breakthrough Stream
            </h2>
          </div>

          <Link
            href="/feed"
            className="text-xs font-mono text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
          >
            <span>Full Wire (225 items)</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="space-y-4">
          {topDispatches.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
