"use client";

import { useState } from "react";
import { NewsItem } from "@/lib/types";
import { resolveSmartImage } from "@/lib/rss";
import {
  Clock,
  Bookmark,
  Share2,
  Check,
  ArrowUpRight,
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
  const smartFallback = resolveSmartImage(
    news.title,
    news.summary,
    news.category,
    news.id
  );
  const [imgSrc, setImgSrc] = useState<string>(
    news.imageUrl || smartFallback
  );
  const [imgFailed, setImgFailed] = useState(false);

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

  const handleImageError = () => {
    if (imgSrc !== smartFallback) {
      setImgSrc(smartFallback);
    } else {
      setImgFailed(true);
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
    <article className="wire-card overflow-hidden flex flex-col mb-4">
      {/* 1. Header: Monospaced Source Telemetry Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#111]">
        <div className="flex items-center gap-2.5">
          <a
            href={news.sourceUrl || news.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Visit ${news.source} website`}
            className="flex items-center gap-1.5 text-xs font-semibold text-neutral-200 hover:text-[#f5e642] transition"
          >
            <CategoryIcon className="h-3.5 w-3.5 text-[#f5e642]" />
            <span>{news.source}</span>
            <ArrowUpRight className="h-3 w-3 text-neutral-400" />
          </a>
          <span className="text-neutral-400 font-mono text-xs">/</span>
          <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
            {news.category}
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-[11px] text-neutral-400">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-neutral-400" />
            {formatDate(news.publishedAt)}
          </span>
          <span className="text-neutral-400">•</span>
          <span>{news.readTimeMinutes}m read</span>
        </div>
      </div>

      {/* 2. Media Image / Banner */}
      {!imgFailed ? (
        <a
          href={news.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-full aspect-[21/9] sm:aspect-[2.4/1] overflow-hidden bg-neutral-950 block group/img border-b border-neutral-800/80"
        >
          <img
            src={imgSrc}
            alt={news.title}
            onError={handleImageError}
            className="w-full h-full object-cover transition-transform duration-200 group-hover/img:scale-[1.02]"
            loading="lazy"
          />
        </a>
      ) : null}

      {/* 3. Post Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/title block mb-2.5"
          >
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-neutral-100 group-hover/title:text-[#f5e642] transition duration-150 leading-snug">
              {news.title}
            </h2>
          </a>

          <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed mb-4">
            {news.summary}
          </p>

          {/* Why It Matters: Architectural Ledger Callout */}
          <div className="border-l-2 border-[#f5e642] bg-[#181818]/70 pl-3.5 py-2 pr-3">
            <div className="text-[11px] font-mono text-[#f5e642] font-medium uppercase tracking-wider mb-0.5">
              Significance & Impact
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed font-sans">
              {news.whyItMatters}
            </p>
          </div>
        </div>

        {/* 4. Action Bar */}
        <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-white/10 bg-[#181818]/60 text-neutral-400 hover:text-white hover:border-white/20 transition text-[11px] font-medium"
              title="Copy article link"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-[#f5e642]" />
                  <span className="text-[#f5e642]">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3 w-3" />
                  <span>Share</span>
                </>
              )}
            </button>

            <button
              onClick={() => onToggleBookmark && onToggleBookmark(news.id)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 border text-[11px] font-medium transition ${
                isBookmarked
                  ? "bg-amber-500/15 border-amber-500/40 text-amber-300"
                  : "border-white/10 bg-[#181818]/60 text-neutral-400 hover:text-white hover:border-white/20"
              }`}
              title={isBookmarked ? "Remove bookmark" : "Save story"}
            >
              <Bookmark className={`h-3 w-3 ${isBookmarked ? "fill-amber-400 text-amber-400" : ""}`} />
              <span>{isBookmarked ? "Saved" : "Save"}</span>
            </button>
          </div>

          <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-bold text-xs text-[#0a0a0a] bg-[#f5e642] hover:bg-[#faf080] transition px-3 py-1"
          >
            <span>Read Publication</span>
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </article>
  );
}
