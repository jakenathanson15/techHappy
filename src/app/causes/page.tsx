"use client";

import { useState } from "react";
import Link from "next/link";
import charitiesData from "@/data/charities.json";
import { Charity, CauseCategory } from "@/lib/types";
import { useBookmarks } from "@/lib/useBookmarks";
import { IconMap } from "@/components/Icons";
import {
  Shield,
  Search,
  X,
  Bookmark,
  ArrowUpRight,
  ArrowRight,
  HeartHandshake,
  CheckCircle2,
  ExternalLink,
  Filter,
} from "lucide-react";

const CATEGORIES: { id: string; label: string }[] = [
  { id: "all", label: "All Causes" },
  { id: "digital-rights-privacy", label: "Digital Privacy & Rights" },
  { id: "education-diversity", label: "Diversity & Education" },
  { id: "climate-sustainability", label: "Climate & Earth Tech" },
  { id: "open-source-public-goods", label: "Open Source & Public Commons" },
  { id: "healthcare-accessibility", label: "Assistive Tech & Healthcare" },
];

export default function CausesDirectoryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const { isCharityBookmarked, toggleCharityBookmark, bookmarkedCharityIds } = useBookmarks();
  const allCharities = charitiesData as Charity[];

  const filteredCharities = allCharities.filter((charity) => {
    if (showSavedOnly && !bookmarkedCharityIds.includes(charity.id)) {
      return false;
    }

    if (selectedCategory !== "all" && charity.category !== selectedCategory) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = charity.name.toLowerCase().includes(q);
      const matchTagline = charity.tagline.toLowerCase().includes(q);
      const matchDesc = charity.description.toLowerCase().includes(q);
      const matchTags = charity.tags.some((t) => t.toLowerCase().includes(q));
      return matchName || matchTagline || matchDesc || matchTags;
    }

    return true;
  });

  return (
    <div className="relative min-h-screen pb-24">
      {/* Background wire grid */}
      <div className="wire-grid-bg fixed inset-0 opacity-40 -z-10 pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-10 sm:pt-14">
        {/* Header Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-800 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-[11px] uppercase tracking-widest text-[#f5e642]">
              <span className="inline-block h-1.5 w-1.5 bg-[#f5e642]" />
              <span>DIRECTORY // VETTED TECH NON-PROFITS</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-neutral-100">
              Our Causes Directory
            </h1>
            <p className="mt-2 font-sans text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
              Exhaustive index of vetted 501(c)(3) initiatives evaluated for 4-star Charity Navigator governance, public transparency, and direct engineering impact.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/match"
              className="inline-flex items-center gap-1.5 bg-[#f5e642] px-3.5 py-2 font-mono text-xs font-bold text-[#0a0a0a] hover:bg-[#faf080] transition"
            >
              <HeartHandshake className="h-3.5 w-3.5" />
              <span>Take Impact Matcher</span>
            </Link>
          </div>
        </div>

        {/* Filter and Search Ribbon */}
        <div className="space-y-4 mb-8">
          {/* Search bar */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
              <input
                type="text"
                placeholder="Search causes by name, mission, or tags (e.g. privacy, open source, education)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-white/10 bg-[#111] pl-9 pr-8 py-2 font-sans text-xs text-neutral-200 placeholder:text-neutral-500 focus:border-[#f5e642]/50 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {bookmarkedCharityIds.length > 0 && (
              <button
                onClick={() => setShowSavedOnly(!showSavedOnly)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 font-mono text-xs border transition ${
                  showSavedOnly
                    ? "bg-amber-400/10 border-amber-400/40 text-amber-300"
                    : "border-white/10 bg-[#111] text-neutral-400 hover:text-white hover:border-white/20"
                }`}
              >
                <Bookmark className={`h-3 w-3 ${showSavedOnly ? "fill-amber-400 text-amber-400" : ""}`} />
                <span>Saved ({bookmarkedCharityIds.length})</span>
              </button>
            )}
          </div>

          {/* Category Ribbon */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 font-mono text-[11px] border transition ${
                    isSelected
                      ? "border-[#f5e642]/60 bg-[#f5e642]/10 text-[#f5e642]"
                      : "border-white/10 bg-[#111] text-neutral-400 hover:border-white/20 hover:text-neutral-200"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Directory Counter */}
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-neutral-800/80 font-mono text-xs text-neutral-500">
          <span>
            SHOWING {filteredCharities.length} OF {allCharities.length} VETTED ORGANIZATIONS
          </span>
          {showSavedOnly && <span className="text-amber-400">FILTER: BOOKMARKED ONLY</span>}
        </div>

        {/* Causes Ruled Ledger Cards */}
        {filteredCharities.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-neutral-800 rounded-sm">
            <p className="font-mono text-xs text-neutral-400">No organizations found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
                setShowSavedOnly(false);
              }}
              className="mt-4 inline-flex items-center gap-1.5 rounded-sm bg-neutral-100 px-3 py-1.5 font-mono text-xs font-semibold text-neutral-950 hover:bg-white transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCharities.map((charity) => {
              const bookmarked = isCharityBookmarked(charity.id);
              const IconComp = IconMap[charity.iconName] || Shield;

              return (
                <div
                  key={charity.id}
                  className="wire-card overflow-hidden transition flex flex-col md:flex-row"
                >
                  {/* Visual Imagery Panel */}
                  {charity.imageUrl && (
                    <div className="md:w-56 lg:w-64 relative aspect-[16/9] md:aspect-auto flex-shrink-0 bg-[#0a0a0a] border-b md:border-b-0 md:border-r border-white/10 overflow-hidden group">
                      <img
                        src={charity.imageUrl}
                        alt={charity.name}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="font-mono text-[10px] text-[#f5e642] bg-black/80 border border-[#f5e642]/30 px-2 py-0.5 backdrop-blur-sm">
                          {charity.rating}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center bg-[#181818] border border-white/10 text-[#f5e642] flex-shrink-0">
                            <IconComp className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h2 className="font-serif text-xl font-normal text-neutral-100 leading-tight">
                                {charity.name}
                              </h2>
                            </div>
                            <div className="font-mono text-[11px] text-neutral-500 mt-0.5">
                              {charity.category.replace(/-/g, " ")} • {charity.shortName}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <a
                            href={charity.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 border border-white/10 bg-[#181818] text-neutral-400 hover:text-white hover:border-white/20 transition"
                            title="Visit official website"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                          <button
                            onClick={() => toggleCharityBookmark(charity.id)}
                            title={bookmarked ? "Remove bookmark" : "Save cause"}
                            className={`p-1.5 border transition ${
                              bookmarked
                                ? "bg-amber-400/10 border-amber-400/40 text-amber-300"
                                : "border-white/10 bg-[#181818] text-neutral-400 hover:text-white hover:border-white/20"
                            }`}
                          >
                            <Bookmark className={`h-3.5 w-3.5 ${bookmarked ? "fill-amber-400 text-amber-400" : ""}`} />
                          </button>
                        </div>
                      </div>

                      <p className="font-sans text-xs italic text-neutral-300 mb-2">
                        &ldquo;{charity.tagline}&rdquo;
                      </p>

                      <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4">
                        {charity.description}
                      </p>

                      {/* Impact Ledger Callout */}
                      <div className="border border-white/10 bg-[#181818]/60 p-3 mb-4 font-mono text-xs">
                        <span className="text-neutral-500 uppercase tracking-wider text-[10px] block mb-1">
                          VERIFIED IMPACT LEDGER
                        </span>
                        <span className="text-neutral-200 font-sans text-xs leading-relaxed block">
                          {charity.impactMetrics}
                        </span>
                      </div>
                    </div>

                    {/* Tags and Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-800/80 pt-4 mt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {charity.tags.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[10px] border border-white/10 bg-[#181818]/60 px-2 py-0.5 text-neutral-400"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 font-mono text-xs">
                        {charity.volunteerUrl && (
                          <a
                            href={charity.volunteerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 border border-white/10 bg-[#181818] px-3 py-1.5 text-neutral-300 hover:bg-[#222] hover:text-white transition"
                          >
                            Volunteer
                            <ArrowUpRight className="h-3 w-3" />
                          </a>
                        )}
                        <a
                          href={charity.donateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 bg-[#f5e642] px-3 py-1.5 font-bold text-[#0a0a0a] hover:bg-[#faf080] transition"
                        >
                          Direct Support
                          <ArrowUpRight className="h-3 w-3 text-neutral-950" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Matcher CTA Banner */}
        <div className="mt-12 border border-[#f5e642]/20 bg-[#f5e642]/5 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="font-mono text-xs text-[#f5e642] font-semibold uppercase tracking-wider mb-1">
              DECISION ENGINE // PERSONALIZED ALIGNMENT
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-neutral-100">
              Not sure where to allocate your support?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-neutral-400 mt-1 max-w-lg">
              Take our interactive 3-step Impact Matcher to find non-profits specifically tailored to your technical skills, preferred contribution method, and target domain.
            </p>
          </div>

          <Link
            href="/match"
            className="inline-flex items-center gap-1.5 bg-[#f5e642] px-4 py-2 font-mono text-xs font-bold text-[#0a0a0a] hover:bg-[#faf080] transition flex-shrink-0"
          >
            <span>Launch Matcher</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
