"use client";

import { useEffect, useState } from "react";
import { NewsItem } from "@/lib/types";
import { NewsCard } from "@/components/NewsCard";
import { Newspaper, Sparkles, Filter, RefreshCw } from "lucide-react";

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
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-800 mb-3">
          <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
          <span>Automated Good News Stream</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          The Uplift Feed
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Curated breakthroughs, scientific discoveries, and open-source victories proving technology is actively making our world healthier, cleaner, and more equitable.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              selectedCategory === cat
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Articles */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
          <RefreshCw className="h-6 w-6 animate-spin text-emerald-600" />
          <p className="text-sm font-medium">Gathering optimistic breakthroughs...</p>
        </div>
      ) : news.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <p>No stories found for this category yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      )}
    </div>
  );
}
