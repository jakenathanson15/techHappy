"use client";

import { useEffect, useState } from "react";
import { NewsItem } from "@/lib/types";
import { NewsCard } from "@/components/NewsCard";
import { Sparkles, RefreshCw, Bookmark, Search } from "lucide-react";
import { useBookmarks } from "@/lib/useBookmarks";

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
  const [loading, setLoading] = useState(true);

  const {
    isStoryBookmarked,
    toggleStoryBookmark,
    isStoryLiked,
    toggleStoryLike,
    bookmarkedStoryIds,
  } = useBookmarks();

  const fetchNews = async (cat: string) => {
    setLoading(true);
    try {
      const url = cat === "All" ? "/api/news" : `/api/news?category=${encodeURIComponent(cat)}`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.success && json.items) {
        setNews(json.items);
      }
    } catch (err) {
      console.error("Failed to load news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(selectedCategory);
  }, [selectedCategory]);

  const filteredNews = news
    .filter((item) => (showSavedOnly ? bookmarkedStoryIds.includes(item.id) : true))
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

      <div className="mx-auto max-w-2xl px-4 sm:px-6 pt-10 sm:pt-14">
        {/* Header Section */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Autonomous Intelligence Stream</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            The Uplift Feed
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Real-time breakthroughs in clean energy, biotechnology, open source, and public scientific discoveries.
          </p>
        </div>

        {/* Filter & Search Controls */}
        <div className="sticky top-20 z-40 rounded-2xl border border-white/[0.08] bg-[#0c1220]/90 p-3 backdrop-blur-xl shadow-xl mb-8">
          {/* Search Input */}
          <div className="relative mb-3">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search breakthroughs (e.g. solar, cancer, open-source)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition"
            />
          </div>

          {/* Categories Pill Bar */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
            <div className="flex items-center gap-1.5 flex-nowrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setShowSavedOnly(false);
                    setSelectedCategory(cat);
                  }}
                  className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    !showSavedOnly && selectedCategory === cat
                      ? "bg-emerald-500 text-[#080c14] font-bold shadow-[0_0_12px_rgba(16,185,129,0.35)]"
                      : "border border-white/[0.06] bg-white/[0.02] text-slate-400 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap border transition-all duration-200 ${
                showSavedOnly
                  ? "bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                  : "border-white/[0.06] bg-white/[0.02] text-slate-400 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <Bookmark className={`h-3 w-3 ${showSavedOnly ? "fill-amber-400" : ""}`} />
              <span>Saved ({bookmarkedStoryIds.length})</span>
            </button>
          </div>
        </div>

        {/* Content Stream (Feed Cards) */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-3">
            <RefreshCw className="h-6 w-6 animate-spin text-emerald-400" />
            <p className="text-xs font-semibold tracking-wide uppercase text-slate-500">
              Gathering fresh breakthroughs...
            </p>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border border-dashed border-white/[0.08] bg-[#0c1220] p-8">
            <Bookmark className="h-8 w-8 mx-auto text-slate-600 mb-2" />
            <h3 className="font-bold text-white text-base mb-1">
              {showSavedOnly ? "No saved stories yet" : "No stories found"}
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {showSavedOnly
                ? "Click the bookmark button on any story to save it to your local feed."
                : "Try adjusting your search query or choosing another category."}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredNews.map((item) => (
              <NewsCard
                key={item.id}
                news={item}
                isBookmarked={isStoryBookmarked(item.id)}
                isLiked={isStoryLiked(item.id)}
                onToggleBookmark={toggleStoryBookmark}
                onToggleLike={toggleStoryLike}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
