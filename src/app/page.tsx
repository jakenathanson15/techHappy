import Link from "next/link";
import { Sparkles, HeartHandshake, Newspaper, ArrowRight, ShieldCheck, Cpu, Globe2, Leaf } from "lucide-react";
import charitiesData from "@/data/charities.json";
import { fetchUpliftNews } from "@/lib/rss";
import { NewsCard } from "@/components/NewsCard";

export default async function HomePage() {
  const latestNews = (await fetchUpliftNews()).slice(0, 3);
  const featuredCharities = charitiesData.slice(0, 3);

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-slate-50 to-slate-50 pt-16 pb-12 sm:pt-24 sm:pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3.5 py-1 text-xs font-semibold text-emerald-800 shadow-sm mb-6">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
            <span>Reclaiming Technology as a Force for Good</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-6">
            Less Doom & Gloom. <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
              More Impact & Optimism.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-slate-600 leading-relaxed mb-10">
            techHappy curates breakthroughs that genuinely improve human lives and connects tech workers with vetted non-profits working on digital rights, climate tech, and education.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/match"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-emerald-700 hover:shadow-lg"
            >
              <HeartHandshake className="h-5 w-5" />
              Take the Charity Matcher Quiz
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/feed"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 hover:border-slate-400"
            >
              <Newspaper className="h-5 w-5 text-emerald-600" />
              Read the Uplift Feed
            </Link>
          </div>
        </div>
      </section>

      {/* Two Pillars Grid */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Pillar 1 */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 mb-6">
              <Newspaper className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              1. The Uplift Feed
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Break through negative noise with automated, AI-verified positive tech headlines. Learn how real engineering is curing diseases, cleaning oceans, and expanding human access.
            </p>
            <div className="flex flex-wrap gap-2 mb-6 text-xs font-medium text-slate-600">
              <span className="rounded-md bg-slate-100 px-2.5 py-1">🌿 Climate Tech</span>
              <span className="rounded-md bg-slate-100 px-2.5 py-1">🧬 Healthcare AI</span>
              <span className="rounded-md bg-slate-100 px-2.5 py-1">🌐 Open Source</span>
            </div>
            <Link
              href="/feed"
              className="inline-flex items-center gap-1.5 font-semibold text-emerald-600 hover:text-emerald-800 transition"
            >
              Explore all positive stories <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Pillar 2 */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 mb-6">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              2. Tech Impact Matcher
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              People in tech have immense resources, skills, and capital to give. Answer 3 quick questions to discover vetted charities that align with your passions.
            </p>
            <div className="flex flex-wrap gap-2 mb-6 text-xs font-medium text-slate-600">
              <span className="rounded-md bg-slate-100 px-2.5 py-1">💰 Direct Donation</span>
              <span className="rounded-md bg-slate-100 px-2.5 py-1">🤝 Code Mentorship</span>
              <span className="rounded-md bg-slate-100 px-2.5 py-1">💻 Hardware Giving</span>
            </div>
            <Link
              href="/match"
              className="inline-flex items-center gap-1.5 font-semibold text-rose-600 hover:text-rose-800 transition"
            >
              Start 60-second quiz <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Stories Preview */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Latest Optimistic Breakthroughs</h2>
            <p className="text-sm text-slate-500">Real progress happening right now</p>
          </div>
          <Link
            href="/feed"
            className="text-sm font-semibold text-emerald-600 hover:text-emerald-800 inline-flex items-center gap-1"
          >
            View all stories <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {latestNews.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      </section>

      {/* Featured Charities Strip */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Featured Vetted Causes</h2>
            <p className="text-sm text-slate-600">
              High-transparency non-profits leveraging technology to create lasting social impact.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredCharities.map((charity) => (
              <div key={charity.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-5 flex flex-col justify-between">
                <div>
                  <div className="text-3xl mb-3">{charity.logoEmoji}</div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">{charity.name}</h3>
                  <p className="text-xs text-slate-600 mb-4 line-clamp-2">{charity.tagline}</p>
                </div>
                <div className="border-t border-slate-200/60 pt-3 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {charity.rating}
                  </span>
                  <a
                    href={charity.donateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-slate-700 hover:text-emerald-700"
                  >
                    Donate &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
