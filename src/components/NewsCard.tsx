"use client";

import { useState } from "react";
import { NewsItem } from "@/lib/types";
import {
  ExternalLink,
  Sparkles,
  Clock,
  Bookmark,
  Share2,
  Check,
  CheckCircle2,
  ArrowUpRight,
  Globe2,
} from "lucide-react";
import { getCategoryIcon } from "./Icons";

interface NewsCardProps {
  news: NewsItem;
  isBookmarked?: boolean;
  onToggleBookmark?: (id: string) => void;
}

export function NewsCard({
  news,
  isBookmarked = false,
  onToggleBookmark,
}: NewsCardProps) {
  const [copied, setCopied] = useState(false);
  const CategoryIcon = getCategoryIcon(news.category);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(news.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      const diffMs = Date.now() - d.getTime();
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHrs < 24) return `${Math.max(1, diffHrs)}h ago`;
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
      return "Recent";
    }
  };

  return (
    <article className="social-card relative rounded-2xl overflow-hidden mb-6 flex flex-col bg-[#0e1524]/90 border border-white/[0.08]">
      {/* 1. Header: Source Profile & Meta */}
      <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <a
            href={news.sourceUrl || news.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Visit ${news.source} website`}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/30 border border-emerald-500/30 text-emerald-400 hover:border-emerald-400 hover:scale-105 transition group"
          >
            <CategoryIcon className="h-5 w-5" />
          </a>
          <div>
            <div className="flex items-center gap-1.5">
              <a
                href={news.sourceUrl || news.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visit ${news.source} homepage`}
                className="font-bold text-white text-sm hover:text-emerald-300 transition inline-flex items-center gap-1"
              >
                {news.source}
                <ArrowUpRight className="h-3 w-3 text-slate-400" />
              </a>
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 fill-emerald-400/20" />
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="font-medium text-emerald-400">{news.category}</span>
              <span className="text-slate-500">•</span>
              <span className="flex items-center gap-1 text-slate-300">
                <Clock className="h-3 w-3 text-slate-400" />
                {formatDate(news.publishedAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Read Time Tag */}
        <span className="text-xs font-semibold text-slate-300 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
          {news.readTimeMinutes} min read
        </span>
      </div>

      {/* 2. Media Image */}
      {news.imageUrl && (
        <a
          href={news.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-full aspect-[16/9] sm:aspect-[2/1] overflow-hidden bg-slate-950 block group/img"
        >
          <img
            src={news.imageUrl}
            alt={news.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1524] via-transparent to-transparent opacity-60" />
        </a>
      )}

      {/* 3. Action Bar (Share & Bookmark) */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-white/[0.01]">
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition px-2.5 py-1 rounded-lg hover:bg-white/[0.06]"
          title="Copy article link"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-400">Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4" />
              <span>Share Article</span>
            </>
          )}
        </button>

        <button
          onClick={() => onToggleBookmark && onToggleBookmark(news.id)}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-semibold transition ${
            isBookmarked
              ? "bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)]"
              : "border-white/[0.08] bg-white/[0.02] text-slate-300 hover:text-white hover:bg-white/[0.06]"
          }`}
          title={isBookmarked ? "Remove bookmark" : "Save story"}
        >
          <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? "fill-amber-400" : ""}`} />
          <span>{isBookmarked ? "Saved" : "Save"}</span>
        </button>
      </div>

      {/* 4. Post Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/title inline-block mb-3"
          >
            <h2 className="text-base sm:text-lg font-bold text-white group-hover/title:text-emerald-300 transition-colors leading-snug">
              {news.title}
            </h2>
          </a>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
            {news.summary}
          </p>

          {/* Why It Matters Impact Callout */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-3.5 mb-2">
            <div className="flex items-start gap-2.5">
              <Sparkles className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-emerald-100 leading-relaxed">
                <span className="font-bold text-emerald-300">Why It Matters: </span>
                {news.whyItMatters}
              </p>
            </div>
          </div>
        </div>

        {/* Read Full Story Button */}
        <div className="mt-4 pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-xs">
          <a
            href={news.sourceUrl || news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-emerald-300 font-medium transition flex items-center gap-1"
          >
            <Globe2 className="h-3.5 w-3.5 text-slate-400" />
            <span>Via {news.source}</span>
          </a>

          <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-bold text-emerald-400 hover:text-emerald-300 transition group/link bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg hover:bg-emerald-500/20"
          >
            Read Story
            <ArrowUpRight className="h-3.5 w-3.5 transition group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
