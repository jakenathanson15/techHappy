"use client";

import { useEffect, useState } from "react";
import { NewsItem } from "@/lib/types";
import { NewsCard } from "@/components/NewsCard";
import {
  RefreshCw,
  Bookmark,
  Search,
  X,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useBookmarks } from "@/lib/useBookmarks";
import Link from "next/link";

const CATEGORIES = [
  "All",
  "Climate Tech",
  "Healthcare & Bio",
  "AI for Good",
  "Open Access & Web",
  "Social Impact",
];

const WIRE_DESKS = [
  "MIT News",
  "Nature",
  "NASA Climate",
  "ScienceDaily",
  "EFF Rights",
  "Our World in Data",
  "Berkeley Lab",
  "CleanTechnica",
  "Mozilla Commons",
  "Ars Technica",
  "IEEE Spectrum",
  "Mongabay",
  "Stanford Earth",
];

export default function FeedPage() {
  const [loadingStream, setLoadingStream] = useState(true);
  const [streamStatus, setStreamStatus] = useState("SYNCHRONIZING 13 WIRE DESK NODES");
  const [mounted, setMounted] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [sourcesList, setSourcesList] = useState<Array<{ name: string; url: string; category: string; description?: string }>>([]);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshNotice, setRefreshNotice] = useState<string | null>(null);

  const {
    isStoryBookmarked,
    toggleStoryBookmark,
    bookmarkedStoryIds,
  } = useBookmarks();

  useEffect(() => {
    setMounted(true);
    setLoadingStream(true);
    setStreamStatus("SYNCHRONIZING 13 WIRE DESK NODES");

    const timers: NodeJS.Timeout[] = [];

    timers.push(
      setTimeout(() => {
        setStreamStatus("PHOTON TELEMETRY STREAMS CONVERGING");
      }, 500)
    );

    timers.push(
      setTimeout(() => {
        setStreamStatus("ILLUMINATING BROADCAST NODE");
      }, 1100)
    );

    timers.push(
      setTimeout(() => {
        setStreamStatus("ALL CHANNELS ACTIVE // WIRE STREAMING");
      }, 1650)
    );

    timers.push(
      setTimeout(() => {
        finishStreamIntro();
      }, 2150)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  const finishStreamIntro = () => {
    setLoadingStream(false);
  };

  const fetchNews = async (cat: string, forceRefresh: boolean = false) => {
    if (forceRefresh) {
      setIsRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const baseUrl = cat === "All" ? "/api/news" : `/api/news?category=${encodeURIComponent(cat)}`;
      const url = forceRefresh
        ? `${baseUrl}${cat === "All" ? "?" : "&"}refresh=true&_t=${Date.now()}`
        : baseUrl;

      const res = await fetch(url);
      const json = await res.json();
      if (json.success && json.items) {
        setNews(json.items);
        if (json.sources) {
          setSourcesList(json.sources);
        }
        if (forceRefresh) {
          setRefreshNotice(`Updated: ${json.items.length} dispatches synchronized across active wires.`);
          setTimeout(() => setRefreshNotice(null), 3000);
        }
      }
    } catch (err) {
      console.error("Failed to load news:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews(selectedCategory, false);
  }, [selectedCategory]);

  const handleManualRefresh = () => {
    fetchNews(selectedCategory, true);
  };

  const filteredNews = news
    .filter((item) => (showSavedOnly ? bookmarkedStoryIds.includes(item.id) : true))
    .filter((item) => (selectedSource ? item.source.toLowerCase() === selectedSource.toLowerCase() : true))
    .filter((item) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.whyItMatters.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q)
      );
    });

  return (
    <div className="relative min-h-screen pb-20 wire-grid-bg">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 sm:pt-14">
        {/* Header Section */}
        <div className="mb-8 pb-6 border-b border-neutral-800">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5 font-mono text-xs text-emerald-400 font-semibold tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>THE WIRE // PEER-REVIEWED RESEARCH STREAM</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-100">
                The Wire Feed
              </h1>
              <p className="font-sans text-xs sm:text-sm text-neutral-300 font-normal max-w-2xl leading-relaxed mt-2">
                Real-time breakthroughs streamed directly from 13 scientific research desks, university laboratories, and open source foundations.
              </p>
            </div>

            {/* Quick Status Bar & Manual Sync CTA */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleManualRefresh}
                disabled={isRefreshing || loading}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-neutral-100 text-xs font-mono font-semibold text-neutral-950 hover:bg-white active:scale-[0.98] transition disabled:opacity-60"
                title="Fetch latest breakthroughs from live sources"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
                <span>{isRefreshing ? "Synchronizing..." : "Update Wire"}</span>
              </button>

              <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 bg-[#0c1017] border border-neutral-800 px-3 py-1.5 rounded-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>13 Feeds Connected</span>
              </div>
            </div>
          </div>

          {/* Ephemeral Refresh Success Badge */}
          {refreshNotice && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-sm bg-neutral-900 border border-emerald-500/50 px-3 py-1 text-xs font-mono text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>{refreshNotice}</span>
            </div>
          )}
        </div>

        {/* Wire Stream Calibration / Photon Convergence on Navigation */}
        {mounted && loadingStream ? (
          <div
            onClick={finishStreamIntro}
            className="wire-card rounded-sm p-8 sm:p-14 text-center max-w-2xl mx-auto cursor-pointer animate-matcher-header relative overflow-hidden shadow-2xl bg-[#0c1017] border border-neutral-800 my-6"
          >
            {/* Luminous emerald aura background glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[32rem] h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-matcher-aura" />

            {/* Animated Wiring & Light Beams Shooting into Central Logo */}
            <div className="relative mb-6 flex items-center justify-center">
              <svg
                viewBox="0 0 500 150"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full max-w-xl h-auto overflow-visible"
              >
                {/* Background circuit base lines */}
                <path d="M 40 25 L 140 25 L 218 64" stroke="#1f2937" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 20 75 L 218 75" stroke="#1f2937" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 40 125 L 140 125 L 218 86" stroke="#1f2937" strokeWidth="1.5" strokeDasharray="3 3" />

                <path d="M 460 25 L 360 25 L 282 64" stroke="#1f2937" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 480 75 L 282 75" stroke="#1f2937" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 460 125 L 360 125 L 282 86" stroke="#1f2937" strokeWidth="1.5" strokeDasharray="3 3" />

                <path d="M 250 10 L 250 44" stroke="#1f2937" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 250 140 L 250 106" stroke="#1f2937" strokeWidth="1.5" strokeDasharray="3 3" />

                {/* Animated Light Photons Shooting Towards the Central Logo */}
                {/* Left side streams */}
                <path
                  d="M 40 25 L 140 25 L 218 64"
                  stroke="#34d399"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="animate-wire-photon"
                  style={{ animationDelay: "0ms" }}
                />
                <path
                  d="M 20 75 L 218 75"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="animate-wire-photon"
                  style={{ animationDelay: "250ms" }}
                />
                <path
                  d="M 40 125 L 140 125 L 218 86"
                  stroke="#059669"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="animate-wire-photon"
                  style={{ animationDelay: "500ms" }}
                />

                {/* Right side streams */}
                <path
                  d="M 460 25 L 360 25 L 282 64"
                  stroke="#34d399"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="animate-wire-photon"
                  style={{ animationDelay: "150ms" }}
                />
                <path
                  d="M 480 75 L 282 75"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="animate-wire-photon"
                  style={{ animationDelay: "400ms" }}
                />
                <path
                  d="M 460 125 L 360 125 L 282 86"
                  stroke="#059669"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="animate-wire-photon"
                  style={{ animationDelay: "650ms" }}
                />

                {/* Vertical streams */}
                <path
                  d="M 250 10 L 250 44"
                  stroke="#34d399"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="animate-wire-photon"
                  style={{ animationDelay: "300ms" }}
                />
                <path
                  d="M 250 140 L 250 106"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="animate-wire-photon"
                  style={{ animationDelay: "550ms" }}
                />

                {/* Outer Node Source Labels & LEDs */}
                <g>
                  <circle cx="40" cy="25" r="3.5" fill="#10b981" className="animate-wire-pulse" />
                  <text x="50" y="28" fill="#9ca3af" fontSize="9" fontFamily="monospace">MIT</text>

                  <circle cx="20" cy="75" r="3.5" fill="#34d399" className="animate-wire-pulse" style={{ animationDelay: "200ms" }} />
                  <text x="30" y="78" fill="#9ca3af" fontSize="9" fontFamily="monospace">NATURE</text>

                  <circle cx="40" cy="125" r="3.5" fill="#10b981" className="animate-wire-pulse" style={{ animationDelay: "400ms" }} />
                  <text x="50" y="128" fill="#9ca3af" fontSize="9" fontFamily="monospace">NASA</text>
                </g>

                <g>
                  <circle cx="460" cy="25" r="3.5" fill="#10b981" className="animate-wire-pulse" style={{ animationDelay: "300ms" }} />
                  <text x="415" y="28" fill="#9ca3af" fontSize="9" fontFamily="monospace">BERKELEY</text>

                  <circle cx="480" cy="75" r="3.5" fill="#34d399" className="animate-wire-pulse" style={{ animationDelay: "500ms" }} />
                  <text x="455" y="78" fill="#9ca3af" fontSize="9" fontFamily="monospace">EFF</text>

                  <circle cx="460" cy="125" r="3.5" fill="#10b981" className="animate-wire-pulse" style={{ animationDelay: "700ms" }} />
                  <text x="428" y="128" fill="#9ca3af" fontSize="9" fontFamily="monospace">OWID</text>
                </g>

                {/* CENTRAL TECHHAPPY LOGO // ILLUMINATING POWER CORE */}
                <g transform="translate(250, 75)" className="animate-logo-charge">
                  {/* Outer Concentric Energy Rings */}
                  <circle cx="0" cy="0" r="38" fill="none" stroke="#064e3b" strokeWidth="1.5" strokeDasharray="4 4" />
                  <circle cx="0" cy="0" r="32" fill="#0a0e14" stroke="#10b981" strokeWidth="2" />

                  {/* TH Eyes + Smile Vector Icon */}
                  {/* Left Eye: 'T' */}
                  <path d="M -16 -13 H -5" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M -10.5 -13 V -3" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Right Eye: 'H' */}
                  <path d="M 5 -13 V -3" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 16 -13 V -3" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 5 -8 H 16" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Radiant Smile Arc */}
                  <path
                    d="M -15 6 C -8 16 8 16 15 6"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="animate-smile-ignite"
                  />
                </g>
              </svg>
            </div>

            <div className="inline-flex items-center gap-2 mb-3 px-2.5 py-1 rounded-sm bg-emerald-950/40 border border-emerald-500/30 font-mono text-[11px] text-emerald-300 uppercase tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>THE WIRE // {streamStatus}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-4xl font-normal text-neutral-100 mb-3 tracking-tight">
              Illuminating the research wire.
            </h2>

            <p className="font-sans text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto leading-relaxed mb-8">
              Live photon telemetry streaming from 13 institutional labs, open journals, and earth satellites directly into your feed.
            </p>

            {/* 13 Connected Feeds Matrix */}
            <div className="pt-4 border-t border-neutral-800/80 max-w-lg mx-auto">
              <div className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider mb-2.5 text-left flex items-center justify-between">
                <span>ACTIVE WIRE NODES (13/13)</span>
                <span className="text-emerald-400">CHANNELS SYNCHRONIZED</span>
              </div>
              <div className="flex flex-wrap gap-1.5 justify-start">
                {WIRE_DESKS.map((desk, idx) => (
                  <span
                    key={desk}
                    style={{ animationDelay: `${idx * 40}ms` }}
                    className="font-mono text-[10px] px-2 py-0.5 rounded-sm bg-[#080c12] border border-neutral-800/90 text-neutral-300 inline-flex items-center gap-1.5"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{desk}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Stream Toolbar (Category Filter Strip + Search) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 p-2 rounded-sm bg-[#0c1017] border border-neutral-800">
              {/* Category Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setShowSavedOnly(false);
                      setSelectedCategory(cat);
                    }}
                    className={`rounded-sm px-3 py-1 font-mono text-xs transition duration-150 ${
                      !showSavedOnly && selectedCategory === cat
                        ? "bg-neutral-800 text-white font-semibold border border-neutral-700"
                        : "text-neutral-400 hover:text-white hover:bg-neutral-900 border border-transparent"
                    }`}
                  >
                    {cat}
                  </button>
                ))}

                <button
                  onClick={() => setShowSavedOnly(!showSavedOnly)}
                  className={`inline-flex items-center gap-1 rounded-sm px-3 py-1 font-mono text-xs transition duration-150 ${
                    showSavedOnly
                      ? "bg-amber-400/10 border-amber-400/40 text-amber-300 font-semibold"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-900 border border-transparent"
                  }`}
                >
                  <Bookmark className={`h-3 w-3 ${showSavedOnly ? "fill-amber-400 text-amber-400" : ""}`} />
                  <span>Saved ({bookmarkedStoryIds.length})</span>
                </button>
              </div>

              {/* Search Box */}
              <div className="relative min-w-[220px]">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Search dispatches..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-sm border border-neutral-800 bg-[#080c12] pl-8 pr-7 py-1 text-xs text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-700 focus:ring-1 focus:ring-emerald-500/40 transition font-sans"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Main Grid Layout (Feed on Left, Sidebar on Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Feed Column (lg:col-span-8) */}
          <div className="lg:col-span-8">
            {/* Stream Status Bar */}
            <div className="flex items-center justify-between mb-4 text-xs font-mono text-neutral-400 pb-2 border-b border-neutral-800/60">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-neutral-200">
                  {showSavedOnly
                    ? "SAVED DISPATCHES"
                    : selectedSource
                    ? `SOURCE: ${selectedSource.toUpperCase()}`
                    : `SECTOR: ${selectedCategory.toUpperCase()}`}
                </span>
                <span>•</span>
                <span>{filteredNews.length} DISPATCHES</span>
                {selectedSource && (
                  <button
                    onClick={() => setSelectedSource(null)}
                    className="inline-flex items-center gap-1 rounded-sm bg-neutral-800 border border-neutral-700 px-2 py-0.5 text-[11px] text-neutral-300 hover:text-white"
                  >
                    <span>Clear Filter</span>
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Content Stream (Feed Cards) */}
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="wire-card rounded-sm p-6 animate-pulse space-y-3"
                  >
                    <div className="h-4 bg-neutral-800 rounded-sm w-1/3" />
                    <div className="h-6 bg-neutral-800 rounded-sm w-3/4" />
                    <div className="h-4 bg-neutral-800 rounded-sm w-full" />
                    <div className="h-4 bg-neutral-800 rounded-sm w-2/3" />
                  </div>
                ))}
              </div>
            ) : filteredNews.length === 0 ? (
              <div className="text-center py-16 rounded-sm border border-dashed border-neutral-800 bg-[#0c1017] p-8">
                <Bookmark className="h-6 w-6 mx-auto text-neutral-400 mb-2" />
                <h3 className="font-serif text-lg font-normal text-white mb-1">
                  {showSavedOnly ? "No saved stories" : "No matching dispatches"}
                </h3>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto mb-4">
                  {showSavedOnly
                    ? "Click the bookmark icon on any dispatch to save it to your local index."
                    : "Try adjusting your query or selecting another sector."}
                </p>
                {showSavedOnly ? (
                  <button
                    onClick={() => setShowSavedOnly(false)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-neutral-100 text-xs font-mono font-semibold text-neutral-950 hover:bg-white transition"
                  >
                    View All Dispatches
                  </button>
                ) : (
                  <button
                    onClick={handleManualRefresh}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-neutral-100 text-xs font-mono font-semibold text-neutral-950 hover:bg-white transition"
                  >
                    <RefreshCw className="h-3 w-3" /> Synchronize Stream
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNews.map((item) => (
                  <NewsCard
                    key={item.id}
                    news={item}
                    isBookmarked={isStoryBookmarked(item.id)}
                    onToggleBookmark={toggleStoryBookmark}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Sticky Sidebar (lg:col-span-4) */}
          <aside className="lg:col-span-4 sticky top-20 space-y-4">
            {/* 1. Live Sources Wire Registry */}
            <div className="wire-card rounded-sm p-5">
              <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-neutral-800">
                <div className="font-mono text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  RESEARCH DESKS ({sourcesList.length || 13})
                </div>
                {selectedSource && (
                  <button
                    onClick={() => setSelectedSource(null)}
                    className="text-[11px] font-mono text-neutral-400 hover:text-white underline"
                  >
                    Reset
                  </button>
                )}
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed mb-3">
                Filter stream by institutional research desk:
              </p>
              <div className="flex flex-wrap gap-1.5 max-h-56 overflow-y-auto pr-1">
                {sourcesList.map((s) => {
                  const isSelected = selectedSource?.toLowerCase() === s.name.toLowerCase();
                  return (
                    <button
                      key={s.name}
                      onClick={() =>
                        setSelectedSource(isSelected ? null : s.name)
                      }
                      title={s.description || s.name}
                      className={`inline-flex items-center gap-1.5 text-[11px] font-mono px-2 py-1 rounded-sm border transition ${
                        isSelected
                          ? "bg-emerald-500/15 border-emerald-500/60 text-emerald-300 font-semibold"
                          : "bg-[#080c12] border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span>{s.name}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 mt-3 border-t border-neutral-800/80">
                <Link
                  href="/sources"
                  className="font-mono text-[11px] text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1"
                >
                  <span>View All Sources & Editorial Standards</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* 2. Causes & Matcher Doorway */}
            <div className="wire-card rounded-sm p-5 border-l-2 border-l-teal-500 space-y-3">
              <div className="font-mono text-xs font-semibold text-teal-400 uppercase tracking-wider">
                VETTED GIVING & ACTION
              </div>
              <h3 className="font-serif text-lg font-normal text-neutral-100 leading-snug">
                Support Non-Profits in Tech
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Connect your engineering skills, code reviews, or donations with vetted 501(c)(3) initiatives.
              </p>

              <div className="space-y-2 pt-1 font-mono text-xs">
                <Link
                  href="/causes"
                  className="w-full inline-flex items-center justify-between rounded-sm bg-[#080c12] border border-neutral-800 py-1.5 px-3 text-neutral-300 hover:text-white hover:border-neutral-700 transition"
                >
                  <span>Browse Causes Directory</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>

                <Link
                  href="/match"
                  className="w-full inline-flex items-center justify-between rounded-sm bg-teal-500 text-neutral-950 font-semibold py-1.5 px-3 hover:bg-teal-400 transition"
                >
                  <span>Take 3-Step Matcher</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* 3. Curation Standards */}
            <div className="wire-card rounded-sm p-5 space-y-2.5">
              <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-neutral-300 pb-2 border-b border-neutral-800">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span className="uppercase tracking-wider">EDITORIAL PROMISE</span>
              </div>
              <ul className="text-xs text-neutral-400 space-y-1.5 font-sans">
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-emerald-400" />
                  <span>Peer-reviewed scientific discoveries</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-emerald-400" />
                  <span>Zero sponsored crypto or paywalled links</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-emerald-400" />
                  <span>Zero trackers or surveillance advertising</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
          </>
        )}
      </div>
    </div>
  );
}
