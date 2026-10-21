"use client";

import { useState } from "react";
import { NewsItem } from "@/lib/types";
import {
  Clock,
  Bookmark,
  Share2,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { getCategoryIcon } from "./Icons";

const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  "Climate Tech": "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80",
  "Healthcare & Bio": "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
  "AI for Good": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  "Open Access & Web": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  "Social Impact": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
};

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
  const [imgSrc, setImgSrc] = useState<string>(
    news.imageUrl || CATEGORY_FALLBACK_IMAGES[news.category] || CATEGORY_FALLBACK_IMAGES["Social Impact"]
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
    const fallback = CATEGORY_FALLBACK_IMAGES[news.category] || CATEGORY_FALLBACK_IMAGES["Social Impact"];
    if (imgSrc !== fallback) {
      setImgSrc(fallback);
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
    <article className="wire-card rounded-md overflow-hidden flex flex-col mb-4">
      {/* 1. Header: Monospaced Source Telemetry Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-800/80 bg-[#0a0e14]">
        <div className="flex items-center gap-2.5">
          <a
            href={news.sourceUrl || news.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Visit ${news.source} website`}
            className="flex items-center gap-1.5 text-xs font-semibold text-neutral-200 hover:text-emerald-400 transition"
          >
            <CategoryIcon className="h-3.5 w-3.5 text-emerald-400" />
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
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-neutral-100 group-hover/title:text-emerald-300 transition duration-150 leading-snug">
              {news.title}
            </h2>
          </a>

          <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed mb-4">
            {news.summary}
          </p>

          {/* Why It Matters: Architectural Ledger Callout */}
          <div className="border-l-2 border-emerald-500 bg-neutral-900/70 pl-3.5 py-2 pr-3 rounded-r-sm">
            <div className="text-[11px] font-mono text-emerald-400 font-medium uppercase tracking-wider mb-0.5">
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
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white hover:border-neutral-700 transition text-[11px] font-medium"
              title="Copy article link"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-300">Copied</span>
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
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border text-[11px] font-medium transition ${
                isBookmarked
                  ? "bg-amber-500/15 border-amber-500/40 text-amber-300"
                  : "border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white hover:border-neutral-700"
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
            className="inline-flex items-center gap-1.5 font-semibold text-xs text-neutral-950 bg-emerald-500 hover:bg-emerald-400 transition px-3 py-1 rounded-sm"
          >
            <span>Read Publication</span>
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </article>
  );
}
