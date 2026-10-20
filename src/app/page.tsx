import Link from "next/link";
import {
  Sparkles,
  HeartHandshake,
  Newspaper,
  ArrowRight,
  Shield,
  Zap,
  Globe2,
  Lock,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import charitiesData from "@/data/charities.json";
import { fetchUpliftNews } from "@/lib/rss";
import { NewsCard } from "@/components/NewsCard";
import { IconMap } from "@/components/Icons";

export default async function HomePage() {
  const latestNews = (await fetchUpliftNews()).slice(0, 2);
  const featuredCharities = charitiesData.slice(0, 3);

  return (
    <div className="relative overflow-hidden pb-24">
      {/* Ambient background glows */}
      <div className="ambient-glow-emerald pointer-events-none absolute inset-0 -z-10 h-[650px] w-full" />
      <div className="ambient-glow-cyan pointer-events-none absolute right-0 top-40 -z-10 h-[500px] w-1/2" />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-5xl px-4 pt-14 sm:pt-20 pb-16 text-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)] mb-8">
          <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
          <span>Real Engineering Breakthroughs & Tech Giving</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
          Technology for <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
            Human Progress.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-300/90 leading-relaxed mb-10">
          Reclaim your optimism. techHappy curates automated, verified breakthroughs across clean energy, biotech, and open access — and connects technologists directly with vetted non-profits.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/match"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-7 py-3.5 text-sm font-bold text-[#080c14] shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] active:scale-95"
          >
            <HeartHandshake className="h-4 w-4" />
            Take Impact Matcher Quiz
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/feed"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-200 hover:bg-white/[0.08] hover:border-white/20 active:scale-95"
          >
            <Newspaper className="h-4 w-4 text-emerald-400" />
            Explore Live Feed
          </Link>
        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto border-t border-white/[0.06] pt-10 text-left">
          <div className="flex items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] p-3.5">
            <Zap className="h-5 w-5 text-emerald-400 flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Auto-Refreshing</div>
              <div className="text-[11px] text-slate-300">Hourly RSS ingestion</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] p-3.5">
            <Shield className="h-5 w-5 text-teal-400 flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Vetted Non-Profits</div>
              <div className="text-[11px] text-slate-300">Charity Navigator 100%</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] p-3.5">
            <Lock className="h-5 w-5 text-cyan-400 flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Zero Tracking</div>
              <div className="text-[11px] text-slate-300">100% private & open</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] p-3.5">
            <Globe2 className="h-5 w-5 text-indigo-400 flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Global Reach</div>
              <div className="text-[11px] text-slate-300">High-impact causes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Pillars Grid */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 mb-20">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Pillar 1 */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#111a2d] to-[#0b101c] p-8 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-6">
              <Newspaper className="h-6 w-6" />
            </div>

            <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-400 mb-1 block">
              Autonomous Stream
            </span>
            <h2 className="text-2xl font-bold text-white mb-3">
              The Uplift Feed
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Algorithmic curation of verified scientific milestones, renewable energy records, cancer detection breakthroughs, and open-source victories.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              <span className="rounded-lg bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 text-xs text-slate-300">
                Climate Tech
              </span>
              <span className="rounded-lg bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 text-xs text-slate-300">
                Biotech & Health
              </span>
              <span className="rounded-lg bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 text-xs text-slate-300">
                Open Web
              </span>
            </div>

            <Link
              href="/feed"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition group/link"
            >
              Browse live feed
              <ArrowRight className="h-4 w-4 transition group-hover/link:translate-x-1" />
            </Link>
          </div>

          {/* Pillar 2 */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#111a2d] to-[#0b101c] p-8 transition-all duration-300 hover:border-teal-500/40 hover:shadow-[0_0_30px_rgba(20,184,166,0.15)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 mb-6">
              <HeartHandshake className="h-6 w-6" />
            </div>

            <span className="text-[11px] font-bold tracking-wider uppercase text-teal-400 mb-1 block">
              Direct Social Action
            </span>
            <h2 className="text-2xl font-bold text-white mb-3">
              Impact Matcher
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Direct your time, skills, or financial resources toward verified non-profits protecting privacy, closing the diversity gap, and building accessible software.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              <span className="rounded-lg bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 text-xs text-slate-300">
                Code Mentorship
              </span>
              <span className="rounded-lg bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 text-xs text-slate-300">
                Hardware Giving
              </span>
              <span className="rounded-lg bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 text-xs text-slate-300">
                Direct Giving
              </span>
            </div>

            <Link
              href="/match"
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300 transition group/link"
            >
              Start 3-step questionnaire
              <ArrowRight className="h-4 w-4 transition group-hover/link:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Feed Preview */}
      <section className="mx-auto max-w-2xl px-4 sm:px-6 mb-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
              <TrendingUp className="h-3.5 w-3.5" /> Live Stream
            </div>
            <h2 className="text-2xl font-bold text-white">Recent Uplift Stories</h2>
          </div>
          <Link
            href="/feed"
            className="text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 transition"
          >
            View full stream <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="space-y-6">
          {latestNews.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      </section>

      {/* Featured Vetted Causes */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="rounded-3xl border border-white/[0.08] bg-[#0b101c] p-8 sm:p-10">
          <div className="max-w-xl mb-8">
            <span className="text-xs font-bold tracking-wider uppercase text-teal-400 mb-1 block">
              Curated Directory
            </span>
            <h2 className="text-2xl font-bold text-white mb-2">Featured Tech Non-Profits</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Vetted organizations using engineering and policy to protect fundamental human rights and empower global communities.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredCharities.map((charity) => {
              const IconComp = IconMap[charity.iconName] || Shield;
              return (
                <div
                  key={charity.id}
                  className="rounded-2xl border border-white/[0.06] bg-[#111a2d] p-6 flex flex-col justify-between transition duration-200 hover:border-emerald-500/30"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                        <IconComp className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        {charity.rating}
                      </span>
                    </div>

                    <h3 className="font-bold text-white text-base mb-1.5">{charity.name}</h3>
                    <p className="text-xs text-slate-300 mb-4 line-clamp-2 leading-relaxed">
                      {charity.tagline}
                    </p>
                  </div>

                  <div className="border-t border-white/[0.06] pt-4 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400 font-medium">{charity.shortName}</span>
                    <a
                      href={charity.donateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300 transition"
                    >
                      Support
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
