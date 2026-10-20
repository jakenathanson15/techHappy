"use client";

import { useState } from "react";
import { NewsItem } from "@/lib/types";
import {
  ExternalLink,
  Sparkles,
  Clock,
  Bookmark,
  Heart,
  Share2,
  Check,
  CheckCircle2,
  ArrowUpRight,
  Layers,
} from "lucide-react";
import { getCategoryIcon } from "./Icons";

interface NewsCardProps {
  news: NewsItem;
  isBookmarked?: boolean;
  isLiked?: boolean;
  onToggleBookmark?: (id: string) => void;
  onToggleLike?: (id: string) => void;
}

export function NewsCard({
  news,
  isBookmarked = false,
  isLiked = false,
  onToggleBookmark,
  onToggleLike,
}: NewsCardProps) {
  const [copied, setCopied] = useState(false);
  const CategoryIcon = getCategoryIcon(news.category);

  const displayLikes = news.likes + (isLiked ? 1 : 0);

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
    <article className="social-card relative rounded-2xl overflow-hidden mb-6 flex flex-col">
      {/* 1. Header: Source Profile & Meta */}
      <div className="flex items-center justify-between p-4 border-b border-white/[0.05]">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-500/20 to-teal-500/30 border border-emerald-500/30 text-emerald-400">
            <CategoryIcon className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white text-sm">{news.source}</span>
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 fill-emerald-400/20" />
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span>{news.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDate(news.publishedAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Read Time Tag */}
        <span className="text-[11px] font-medium text-slate-400 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
          {news.readTimeMinutes} min read
        </span>
      </div>

      {/* 2. Media Image with Subtle Zoom */}
      {news.imageUrl && (
        <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] overflow-hidden bg-slate-950">
          <img
            src={news.imageUrl}
            alt={news.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1524] via-transparent to-transparent opacity-60" />
        </div>
      )}

      {/* 3. Social Interaction Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05]">
        <div className="flex items-center gap-4">
          {/* Like Button */}
          <button
            onClick={() => onToggleLike && onToggleLike(news.id)}
            className={`flex items-center gap-1.5 text-xs font-semibold transition active:scale-90 ${
              isLiked ? "text-rose-400" : "text-slate-400 hover:text-white"
            }`}
          >
            <Heart
              className={`h-5 w-5 ${
                isLiked ? "fill-rose-500 text-rose-500 animate-like" : ""
              }`}
            />
            <span>{displayLikes}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition"
            title="Copy story link"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={() => onToggleBookmark && onToggleBookmark(news.id)}
          className={`p-1.5 rounded-lg border transition ${
            isBookmarked
              ? "bg-amber-500/20 border-amber-500/40 text-amber-400"
              : "border-transparent text-slate-400 hover:text-white hover:bg-white/[0.05]"
          }`}
          title={isBookmarked ? "Remove bookmark" : "Save story"}
        >
          <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-amber-400" : ""}`} />
        </button>
      </div>

      {/* 4. Post Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/title inline-block mb-2"
          >
            <h2 className="text-base sm:text-lg font-bold text-white group-hover/title:text-emerald-300 transition-colors leading-snug">
              {news.title}
            </h2>
          </a>

          <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed mb-4">
            {news.summary}
          </p>

          {/* Why It Matters Impact Callout */}
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-3.5 mb-2">
            <div className="flex items-start gap-2.5">
              <Sparkles className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-emerald-200/90 leading-relaxed">
                <span className="font-bold text-emerald-300">Why It Matters: </span>
                {news.whyItMatters}
              </p>
            </div>
          </div>
        </div>

        {/* Read Full Story Button */}
        <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs">
          <span className="text-slate-500">Verified Positive Impact</span>
          <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300 transition group/link"
          >
            Read Original Source
            <ArrowUpRight className="h-3.5 w-3.5 transition group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
