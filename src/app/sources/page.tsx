import Link from "next/link";
import { RSS_SOURCES } from "@/lib/rss";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Radio,
  ExternalLink,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "Sources & Standards",
  description: "Exhaustive index of peer-reviewed scientific journals, research desks, and open web feeds ingested by techHappy.",
};

const EDITORIAL_STANDARDS = [
  {
    title: "Primary Research & Peer Review",
    desc: "We prioritize direct institutional announcements from verified laboratories (e.g. MIT, Berkeley, NASA) and peer-reviewed journals (e.g. Nature, ScienceDaily) rather than speculative secondary commentary.",
  },
  {
    title: "Empirical & Material Impact",
    desc: "Stories must demonstrate tangible physical, environmental, or open-access progress — such as verifiable solar efficiency milestones, clinical trials, or released open-source datasets.",
  },
  {
    title: "Zero Clickbait & Zero Sponsored Hype",
    desc: "We rigorously filter out promotional crypto pumps, paywalled content, and doom-loop engagement loops. Every wire entry is normalized to concise, reader-first summaries.",
  },
];

export default function SourcesPage() {
  return (
    <div className="relative min-h-screen pb-24">
      {/* Background wire grid */}
      <div className="wire-grid-bg fixed inset-0 opacity-40 -z-10 pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-10 sm:pt-14">
        {/* Header Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-800 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-[11px] uppercase tracking-widest text-emerald-400">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>THE WIRE NETWORK // RESEARCH DESKS & STANDARDS</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-neutral-100">
              Our Sources & Wire Registry
            </h1>
            <p className="mt-2 font-sans text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
              Real-time ingestion pipeline streaming directly from {RSS_SOURCES.length} peer-reviewed research institutions, scientific journals, and open-source foundations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/feed"
              className="inline-flex items-center gap-1.5 rounded-sm bg-emerald-500 px-3.5 py-2 font-mono text-xs font-semibold text-neutral-950 hover:bg-emerald-400 transition"
            >
              <Radio className="h-3.5 w-3.5" />
              <span>Explore Live Feed</span>
            </Link>
          </div>
        </div>

        {/* Editorial Standards Dossier */}
        <div className="rounded-sm border border-neutral-800 bg-[#0c1017] p-6 sm:p-8 mb-10">
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="h-4 w-4" />
            <span>EDITORIAL CURATION STANDARDS</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-normal text-neutral-100 mb-4">
            How We Select & Verify Wire Dispatches
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {EDITORIAL_STANDARDS.map((std, idx) => (
              <div key={std.title} className="space-y-1.5">
                <div className="font-mono text-[11px] text-neutral-500">
                  STANDARD 0{idx + 1}
                </div>
                <div className="font-sans font-semibold text-neutral-200 text-sm">
                  {std.title}
                </div>
                <div className="font-sans text-xs text-neutral-400 leading-relaxed">
                  {std.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Ingestion Telemetry Specs */}
          <div className="mt-6 pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Ingestion Frequency: Hourly Edge ISR</span>
            </div>
            <div>Deduplication: SHA-256 Content Hash</div>
            <div>Parser: Fast-XML Multi-Feed Aggregator</div>
          </div>
        </div>

        {/* Sources Ruled Ledger */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800 font-mono text-xs text-neutral-500">
            <span>CONNECTED SCIENTIFIC FEEDS ({RSS_SOURCES.length})</span>
            <span>STATUS: ACTIVE & SYNDICATED</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RSS_SOURCES.map((source, idx) => (
              <div
                key={source.name}
                className="wire-card rounded-sm overflow-hidden flex flex-col justify-between group hover:border-neutral-700 transition"
              >
                <div>
                  {source.imageUrl && (
                    <div className="relative aspect-[21/9] w-full overflow-hidden bg-neutral-950 border-b border-neutral-800/80">
                      <img
                        src={source.imageUrl}
                        alt={source.name}
                        className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080c12] via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-2">
                        <span className="font-mono text-[10px] text-neutral-400 bg-neutral-950/80 border border-neutral-800 px-2 py-0.5 rounded-sm backdrop-blur-sm">
                          DESK 0{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                        </span>
                        <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/90 border border-emerald-800/60 px-2 py-0.5 rounded-sm backdrop-blur-sm">
                          {source.defaultCategory}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-4 sm:p-5">
                    <h3 className="font-serif text-lg font-normal text-neutral-100 group-hover:text-emerald-300 transition mb-2">
                      {source.name}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed mb-3">
                      {source.description}
                    </p>
                    <div className="font-mono text-[10px] text-neutral-500 truncate">
                      Endpoint: <span className="text-neutral-400">{source.url}</span>
                    </div>
                  </div>
                </div>

                <div className="px-4 sm:px-5 py-3 border-t border-neutral-800/80 bg-neutral-900/30 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-emerald-400 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Syndicate
                  </span>
                  <a
                    href={source.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-sm border border-neutral-800 bg-[#0c1017] px-3 py-1 font-mono text-xs text-neutral-300 hover:border-neutral-700 hover:text-white transition"
                  >
                    <span>Visit Desk</span>
                    <ExternalLink className="h-3 w-3 text-neutral-400" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Feed Link */}
        <div className="mt-12 rounded-sm border border-emerald-800/40 bg-emerald-950/20 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="font-mono text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">
              THE WIRE // LIVE STREAM
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-neutral-100">
              Read all dispatches in real time
            </h3>
            <p className="font-sans text-xs sm:text-sm text-neutral-400 mt-1 max-w-lg">
              Stream every incoming dispatch from these {RSS_SOURCES.length} institutions across climate tech, healthcare, open access, and AI for good.
            </p>
          </div>

          <Link
            href="/feed"
            className="inline-flex items-center gap-1.5 rounded-sm bg-emerald-400 px-4 py-2 font-mono text-xs font-semibold text-neutral-950 hover:bg-emerald-300 transition flex-shrink-0"
          >
            <span>Open Wire Feed</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
