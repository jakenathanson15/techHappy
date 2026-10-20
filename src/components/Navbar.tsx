"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, HeartHandshake, Newspaper, ArrowRight, Github } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#080c14]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-[#080c14] font-black shadow-[0_0_20px_rgba(52,211,153,0.3)] transition duration-300 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(52,211,153,0.5)]">
            <Sparkles className="h-5 w-5 fill-current" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold tracking-tight text-white">
              techHappy
            </span>
            <span className="hidden sm:inline-block text-[10px] font-semibold tracking-widest uppercase px-1.5 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              Optimism
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="flex items-center gap-1 sm:gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] p-1 backdrop-blur-md">
          <Link
            href="/feed"
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full transition duration-200 ${
              isActive("/feed")
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            <Newspaper className="h-3.5 w-3.5" />
            <span>Feed</span>
          </Link>

          <Link
            href="/match"
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full transition duration-200 ${
              isActive("/match")
                ? "bg-teal-500/15 text-teal-300 border border-teal-500/30"
                : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            <HeartHandshake className="h-3.5 w-3.5" />
            <span>Impact Matcher</span>
          </Link>
        </nav>

        {/* Right Action */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/jakenathanson15/techHappy"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center justify-center h-8 w-8 rounded-lg border border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20 transition"
            title="GitHub Repository"
          >
            <Github className="h-4 w-4" />
          </a>

          <Link
            href="/match"
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#080c14] shadow-[0_0_20px_rgba(16,185,129,0.3)] transition hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] active:scale-95"
          >
            Find a Cause
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
