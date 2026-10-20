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
  HeartHandshake,
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

export default function FeedPage() {
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
          setRefreshNotice(`Refreshed: ${json.items.length} dispatches synchronized.`);
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
        <div className="mb-8 pb-6 border-b border-neutral-800/80">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-emerald-400 font-semibold mb-1">
                01 // LIVE DISPATCH WIRE
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white">
                The Uplift Feed
              </h1>
              <p className="font-sans text-xs sm:text-sm text-neutral-300 font-normal max-w-2xl leading-relaxed mt-1.5">
                Curated breakthroughs across renewable energy, biotechnology, open source systems, and verified scientific milestones.
              </p>
            </div>

            {/* Quick Status Bar & Manual Sync CTA */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleManualRefresh}
                disabled={isRefreshing || loading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-500 text-xs font-semibold text-neutral-950 hover:bg-emerald-400 active:bg-emerald-600 transition disabled:opacity-60"
                title="Fetch latest breakthroughs from live sources"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
                <span>{isRefreshing ? "Synchronizing..." : "Update Feed"}</span>
              </button>

              <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 px-2.5 py-1.5 rounded-md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>13 Sources Active</span>
              </div>
            </div>
          </div>

          {/* Ephemeral Refresh Success Badge */}
          {refreshNotice && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-sm bg-neutral-900 border border-emerald-500/50 px-3 py-1 text-xs font-mono text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>{refreshNotice}</span>
            </div>
          )}
        </div>

        {/* Stream Toolbar (Category Filter Strip + Search) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 p-2 rounded-md bg-neutral-900/60 border border-neutral-800/80">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setShowSavedOnly(false);
                  setSelectedCategory(cat);
                }}
                className={`rounded-sm px-3 py-1 text-xs font-medium whitespace-nowrap transition duration-150 ${
                  !showSavedOnly && selectedCategory === cat
                    ? "bg-neutral-800 text-white font-semibold border border-neutral-700"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-850 border border-transparent"
                }`}
              >
                {cat}
              </button>
            ))}

            <button
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`inline-flex items-center gap-1 rounded-sm px-3 py-1 text-xs font-medium whitespace-nowrap transition duration-150 ${
                showSavedOnly
                  ? "bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-850 border border-transparent"
              }`}
            >
              <Bookmark className={`h-3 w-3 ${showSavedOnly ? "fill-amber-400 text-amber-400" : ""}`} />
              <span>Saved ({bookmarkedStoryIds.length})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[220px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search dispatches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-sm border border-neutral-800 bg-neutral-950 pl-8 pr-7 py-1 text-xs text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-700 focus:ring-1 focus:ring-emerald-500/50 transition font-sans"
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
            <div className="flex items-center justify-between mb-3 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-white">
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
                    className="wire-card rounded-md p-5 animate-pulse space-y-3"
                  >
                    <div className="h-4 bg-neutral-800 rounded-sm w-1/3" />
                    <div className="h-6 bg-neutral-800 rounded-sm w-3/4" />
                    <div className="h-4 bg-neutral-800 rounded-sm w-full" />
                    <div className="h-4 bg-neutral-800 rounded-sm w-2/3" />
                  </div>
                ))}
              </div>
            ) : filteredNews.length === 0 ? (
              <div className="text-center py-16 rounded-md border border-dashed border-neutral-800 bg-[#0c1017] p-8">
                <Bookmark className="h-6 w-6 mx-auto text-neutral-400 mb-2" />
                <h3 className="font-semibold text-white text-sm mb-1">
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
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-emerald-500 text-xs font-semibold text-neutral-950 hover:bg-emerald-400 transition"
                  >
                    View All Dispatches
                  </button>
                ) : (
                  <button
                    onClick={handleManualRefresh}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-emerald-500 text-xs font-semibold text-neutral-950 hover:bg-emerald-400 transition"
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
            <div className="wire-card rounded-md p-4">
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-neutral-800">
                <div className="font-mono text-xs font-semibold text-emerald-400">
                  02 // WIRE REGISTRY ({sourcesList.length || 13})
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
                Select an institutional feed to filter dispatches:
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
                          : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>{s.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Curation Protocol */}
            <div className="wire-card rounded-md p-4 space-y-2.5">
              <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-teal-400 pb-2 border-b border-neutral-800">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>03 // CURATION PROTOCOL</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Dispatches are collected directly from academic journals and laboratory research desks.
              </p>
              <ul className="text-xs text-neutral-400 space-y-1.5 font-mono">
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 bg-emerald-400" />
                  <span>Peer-reviewed discoveries only</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 bg-emerald-400" />
                  <span>Zero sponsored crypto promotions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 bg-emerald-400" />
                  <span>Zero trackers or surveillance ads</span>
                </li>
              </ul>
            </div>

            {/* 3. Impact Matcher Action Channel */}
            <div className="wire-card rounded-md p-4 border-l-2 border-l-teal-500">
              <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-teal-400 mb-1">
                <HeartHandshake className="h-3.5 w-3.5" />
                <span>04 // ACTION CHANNEL</span>
              </div>
              <h3 className="font-sans font-semibold text-white text-sm mb-1">
                Match with Tech Charities
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-3">
                Discover high-leverage non-profits aligned with your engineering background and cause preferences.
              </p>
              <Link
                href="/match"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-sm bg-neutral-800 border border-neutral-700 py-1.5 px-3 text-xs font-semibold text-white hover:bg-neutral-700 transition"
              >
                <span>Take 3-Step Matcher</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
