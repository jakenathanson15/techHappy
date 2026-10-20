"use client";

import { useEffect, useState } from "react";
import { NewsItem } from "@/lib/types";
import { NewsCard } from "@/components/NewsCard";
import {
  RefreshCw,
  Bookmark,
  Search,
  X,
  Filter,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useBookmarks } from "@/lib/useBookmarks";
import { getCategoryIcon } from "@/components/Icons";
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
          setRefreshNotice(`Refreshed! Loaded ${json.items.length} breakthroughs from ${json.sources?.length || 13} sources.`);
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
    <div className="relative min-h-screen pb-24">
      {/* Background ambient glow */}
      <div className="ambient-glow-emerald pointer-events-none absolute inset-0 -z-10 h-[500px] w-full" />
      <div className="ambient-glow-cyan pointer-events-none absolute right-0 top-1/3 -z-10 h-[400px] w-1/3" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        {/* Header Section */}
        <div className="mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2">
              The Uplift Feed
            </h1>
            <p className="text-sm sm:text-base text-slate-100 font-medium max-w-2xl leading-relaxed">
              Curated breakthroughs across renewable energy, biotechnology, open source, and public scientific milestones.
            </p>
          </div>

          {/* Ephemeral Refresh Success Badge */}
          {refreshNotice && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-950/80 border border-emerald-500/50 px-4 py-2 text-xs font-bold text-emerald-300 shadow-lg animate-fade-in">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>{refreshNotice}</span>
            </div>
          )}
        </div>

        {/* Mobile Filter & Search Bar (Visible on < lg) */}
        <div className="lg:hidden sticky top-20 z-40 rounded-2xl border border-slate-700/80 bg-[#0c1220]/95 p-3 backdrop-blur-xl shadow-xl mb-6">
          <div className="relative mb-2.5">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
            <input
              type="text"
              placeholder="Search breakthroughs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-[#111a2e] pl-10 pr-9 py-2 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setShowSavedOnly(false);
                  setSelectedCategory(cat);
                }}
                className={`rounded-full px-3.5 py-1 text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  !showSavedOnly && selectedCategory === cat
                    ? "bg-emerald-400 text-slate-950 font-extrabold shadow-[0_0_12px_rgba(16,185,129,0.35)]"
                    : "border border-slate-700 bg-[#111a2e] text-slate-100 hover:text-white hover:bg-[#18233d]"
                }`}
              >
                {cat}
              </button>
            ))}

            <button
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold whitespace-nowrap border transition-all duration-200 ${
                showSavedOnly
                  ? "bg-amber-500/25 border-amber-500/60 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                  : "border-slate-700 bg-[#111a2e] text-slate-100 hover:text-white hover:bg-[#18233d]"
              }`}
            >
              <Bookmark className={`h-3 w-3 ${showSavedOnly ? "fill-amber-400 text-amber-400" : ""}`} />
              <span>Saved ({bookmarkedStoryIds.length})</span>
            </button>
          </div>
        </div>

        {/* Main Grid Layout (Feed on Left, Sticky Sidebar on Right for Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Feed Column (lg:col-span-8) */}
          <div className="lg:col-span-8">
            {/* Stream Status Bar */}
            <div className="flex items-center justify-between mb-4 px-1 text-xs font-semibold text-slate-200">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-white text-sm">
                  {showSavedOnly
                    ? "Saved Breakthroughs"
                    : selectedSource
                    ? `Source: ${selectedSource}`
                    : selectedCategory}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-200">
                  {filteredNews.length} {filteredNews.length === 1 ? "story" : "stories"}
                </span>
                {selectedSource && (
                  <button
                    onClick={() => setSelectedSource(null)}
                    className="inline-flex items-center gap-1 rounded-full bg-slate-800 border border-slate-700 px-2.5 py-0.5 text-xs text-slate-300 hover:text-white"
                  >
                    <span>Clear source filter</span>
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleManualRefresh}
                  disabled={isRefreshing || loading}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition"
                  title="Reload feed"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
                  <span>Update Feed</span>
                </button>

                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-slate-300 hover:text-white font-semibold inline-flex items-center gap-1"
                  >
                    Clear search &ldquo;{searchQuery}&rdquo;
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Content Stream (Feed Cards) */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 text-slate-200 gap-3 rounded-2xl border border-slate-800 bg-[#0c1220]/80">
                <RefreshCw className="h-6 w-6 animate-spin text-emerald-400" />
                <p className="text-xs font-bold tracking-wide uppercase text-slate-200">
                  Gathering fresh breakthroughs...
                </p>
              </div>
            ) : filteredNews.length === 0 ? (
              <div className="text-center py-20 rounded-2xl border border-dashed border-slate-700 bg-[#0c1220] p-8">
                <Bookmark className="h-8 w-8 mx-auto text-slate-400 mb-2" />
                <h3 className="font-bold text-white text-base mb-1">
                  {showSavedOnly ? "No saved stories yet" : "No stories found"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 max-w-sm mx-auto mb-4">
                  {showSavedOnly
                    ? "Click the bookmark button on any story to save it to your local feed."
                    : "Try adjusting your search query or choosing another category."}
                </p>
                {showSavedOnly ? (
                  <button
                    onClick={() => setShowSavedOnly(false)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-400 text-xs font-bold text-slate-950 hover:bg-emerald-300 transition"
                  >
                    View All Stories
                  </button>
                ) : (
                  <button
                    onClick={handleManualRefresh}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-400 text-xs font-bold text-slate-950 hover:bg-emerald-300 transition"
                  >
                    <RefreshCw className="h-3.5 w-3.5" /> Update My Feed
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-6">
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

          {/* Right Sticky Sidebar (lg:col-span-4 - Hidden on mobile) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-6">
            {/* 1. Quick Refresh CTA Card */}
            <div className="rounded-2xl border border-slate-800 bg-[#0c1220] p-4 shadow-xl">
              <button
                onClick={handleManualRefresh}
                disabled={isRefreshing || loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 py-3 px-4 text-xs font-extrabold text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(16,185,129,0.45)] active:scale-95 transition disabled:opacity-70"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                <span>{isRefreshing ? "Updating Feed..." : "Update My Feed"}</span>
              </button>
            </div>

            {/* 2. Search Box */}
            <div className="rounded-2xl border border-slate-800 bg-[#0c1220] p-4 shadow-xl">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-2.5">
                Search Uplift Stories
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                <input
                  type="text"
                  placeholder="E.g. fusion, solar, malaria, AI..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-[#111a2e] pl-10 pr-9 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* 3. Categories Filter Card */}
            <div className="rounded-2xl border border-slate-800 bg-[#0c1220] p-5 shadow-xl">
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Categories
                  </span>
                </div>
                <button
                  onClick={() => setShowSavedOnly(!showSavedOnly)}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border transition ${
                    showSavedOnly
                      ? "bg-amber-500/25 border-amber-500/60 text-amber-200 shadow-[0_0_10px_rgba(245,158,11,0.25)]"
                      : "border-slate-700 bg-[#111a2e] text-slate-100 hover:text-white hover:bg-[#18233d]"
                  }`}
                >
                  <Bookmark className={`h-3 w-3 ${showSavedOnly ? "fill-amber-400 text-amber-400" : ""}`} />
                  <span>Saved ({bookmarkedStoryIds.length})</span>
                </button>
              </div>

              <div className="space-y-1.5">
                {CATEGORIES.map((cat) => {
                  const Icon = getCategoryIcon(cat);
                  const isSelected = !showSavedOnly && selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setShowSavedOnly(false);
                        setSelectedCategory(cat);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                        isSelected
                          ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.15)] font-bold"
                          : "border border-transparent bg-[#111a2e]/50 text-slate-200 hover:text-white hover:bg-[#18233d]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`h-4 w-4 ${isSelected ? "text-emerald-400" : "text-slate-300"}`} />
                        <span>{cat}</span>
                      </div>
                      {isSelected && (
                        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Live Sources Network Card */}
            <div className="rounded-2xl border border-slate-800 bg-[#0c1220] p-5 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Verified Wires ({sourcesList.length || 13})</span>
                </div>
                {selectedSource && (
                  <button
                    onClick={() => setSelectedSource(null)}
                    className="text-xs text-slate-400 hover:text-white font-medium underline"
                  >
                    Reset
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Aggregated in real-time from independent academic labs, peer-reviewed journals, and public science institutions:
              </p>
              <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                {sourcesList.map((s) => {
                  const isSelected = selectedSource?.toLowerCase() === s.name.toLowerCase();
                  return (
                    <button
                      key={s.name}
                      onClick={() =>
                        setSelectedSource(isSelected ? null : s.name)
                      }
                      title={s.description || s.name}
                      className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border transition ${
                        isSelected
                          ? "bg-teal-500/25 border-teal-400 text-teal-200 font-bold shadow-[0_0_8px_rgba(20,184,166,0.3)]"
                          : "bg-[#111a2e] border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-500"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      <span>{s.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Impact Matcher CTA */}
            <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-emerald-950/50 to-[#0c1220] p-5 shadow-xl">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <HeartHandshake className="h-4 w-4" />
                <span>Take Action</span>
              </div>
              <h3 className="font-bold text-white text-sm mb-1.5">
                Match with Tech Non-Profits
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed mb-4">
                Answer 3 quick questions to discover verified charities where your technical skills or donations have maximum leverage.
              </p>
              <Link
                href="/match"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 py-2.5 px-4 text-xs font-extrabold text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:bg-emerald-300 transition active:scale-95"
              >
                Start Quiz
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
