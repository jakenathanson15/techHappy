"use client";

import { useState } from "react";
import { NewsItem } from "@/lib/types";
import {
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

const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  "Climate Tech": "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
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
    <article className="social-card relative rounded-2xl overflow-hidden mb-6 flex flex-col bg-[#0e1524] border border-slate-800 shadow-xl">
      {/* 1. Header: Source Profile & Meta */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-[#0b101d]">
        <div className="flex items-center gap-3">
          <a
            href={news.sourceUrl || news.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Visit ${news.source} website`}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 hover:border-emerald-300 hover:bg-emerald-500/25 hover:scale-105 transition group"
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
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
              </a>
              <CheckCircle2 className="h-4 w-4 text-emerald-400 fill-emerald-400/20" />
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-200">
              <span className="font-bold text-emerald-300">{news.category}</span>
              <span className="text-slate-500">•</span>
              <span className="flex items-center gap-1 text-slate-300 font-medium">
                <Clock className="h-3 w-3 text-slate-400" />
                {formatDate(news.publishedAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Read Time Tag */}
        <span className="text-xs font-semibold text-slate-200 px-3 py-1 rounded-full bg-[#111a2e] border border-slate-700 shadow-sm">
          {news.readTimeMinutes} min read
        </span>
      </div>

      {/* 2. Media Image / Banner */}
      {!imgFailed ? (
        <a
          href={news.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-full aspect-[16/9] sm:aspect-[2/1] overflow-hidden bg-slate-950 block group/img"
        >
          <img
            src={imgSrc}
            alt={news.title}
            onError={handleImageError}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1524] via-transparent to-transparent opacity-60" />
        </a>
      ) : (
        <a
          href={news.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-full h-40 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-[#0e1524] border-b border-slate-800 flex items-center justify-center group/banner"
        >
          <div className="flex items-center gap-3 text-emerald-400/80 group-hover/banner:text-emerald-300 transition">
            <CategoryIcon className="h-8 w-8" />
            <span className="text-sm font-bold tracking-wide uppercase text-slate-300">
              {news.category}
            </span>
          </div>
        </a>
      )}

      {/* 3. Action Bar (Share & Bookmark) */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-[#0c1220]">
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-200 hover:text-white transition px-3 py-1.5 rounded-lg bg-[#111a2e] border border-slate-700 hover:bg-[#18233d]"
          title="Copy article link"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-300 font-bold">Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4 text-slate-300" />
              <span>Share Article</span>
            </>
          )}
        </button>

        <button
          onClick={() => onToggleBookmark && onToggleBookmark(news.id)}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-xs font-bold transition ${
            isBookmarked
              ? "bg-amber-500/25 border-amber-500/60 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.25)]"
              : "border-slate-700 bg-[#111a2e] text-slate-200 hover:text-white hover:bg-[#18233d]"
          }`}
          title={isBookmarked ? "Remove bookmark" : "Save story"}
        >
          <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} />
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

          <p className="text-xs sm:text-sm text-slate-100 font-normal leading-relaxed mb-4">
            {news.summary}
          </p>

          {/* Why It Matters Impact Callout */}
          <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/60 p-3.5 mb-2">
            <div className="flex items-start gap-2.5">
              <Sparkles className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-emerald-100 leading-relaxed font-normal">
                <span className="font-bold text-emerald-300">Why It Matters: </span>
                {news.whyItMatters}
              </p>
            </div>
          </div>
        </div>

        {/* Read Full Story Button */}
        <div className="mt-4 pt-3.5 border-t border-slate-800 flex items-center justify-between text-xs">
          <a
            href={news.sourceUrl || news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-emerald-300 font-semibold transition flex items-center gap-1.5"
          >
            <Globe2 className="h-3.5 w-3.5 text-slate-400" />
            <span>Via {news.source}</span>
          </a>

          <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-extrabold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition group/link px-3.5 py-1.5 rounded-lg shadow-sm"
          >
            Read Story
            <ArrowUpRight className="h-3.5 w-3.5 text-slate-950 transition group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
