import { NewsItem } from "@/lib/types";
import { ExternalLink, Sparkles, Clock, Tag } from "lucide-react";

interface NewsCardProps {
  news: NewsItem;
}

export function NewsCard({ news }: NewsCardProps) {
  const getBadgeColor = (category: string) => {
    switch (category) {
      case "Climate Tech":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Healthcare & Bio":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "AI for Good":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Open Access & Web":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
      return "Recent";
    }
  };

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition hover:border-emerald-300 hover:shadow-md">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getBadgeColor(
              news.category
            )}`}
          >
            <Tag className="h-3 w-3" />
            {news.category}
          </span>

          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Clock className="h-3 w-3" />
            <span>{formatDate(news.publishedAt)}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition leading-snug mb-2.5">
          {news.title}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          {news.summary}
        </p>

        {/* Why it matters highlight box */}
        <div className="rounded-xl bg-gradient-to-r from-emerald-50/80 to-teal-50/50 border border-emerald-100 p-3.5 mb-4">
          <div className="flex items-start gap-2">
            <Sparkles className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs font-medium text-emerald-900 leading-relaxed">
              <span className="font-bold text-emerald-950">Why This Matters: </span>
              {news.whyItMatters}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
        <span className="font-medium text-slate-700">{news.source}</span>
        <a
          href={news.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-emerald-600 hover:text-emerald-800 transition"
        >
          Read Story
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}
