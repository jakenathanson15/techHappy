"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, HeartHandshake, Newspaper, ArrowRight, Github } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-[#080c14]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-400 text-slate-950 font-black shadow-[0_0_20px_rgba(52,211,153,0.3)] transition duration-300 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(52,211,153,0.5)]">
            <Sparkles className="h-5 w-5 fill-current" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold tracking-tight text-white">
              techHappy
            </span>
            <span className="hidden sm:inline-block text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded border border-emerald-500/40 bg-emerald-950/60 text-emerald-300">
              Optimism
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="flex items-center gap-1 sm:gap-2 rounded-full border border-slate-800 bg-[#0d1424] p-1 shadow-sm">
          <Link
            href="/feed"
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition duration-200 ${
              isActive("/feed")
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold"
                : "text-slate-200 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Newspaper className="h-3.5 w-3.5" />
            <span>Feed</span>
          </Link>

          <Link
            href="/match"
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition duration-200 ${
              isActive("/match")
                ? "bg-teal-500/20 text-teal-300 border border-teal-500/40 font-bold"
                : "text-slate-200 hover:text-white hover:bg-slate-800"
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
            className="hidden md:flex items-center justify-center h-8 w-8 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition"
            title="GitHub Repository"
          >
            <Github className="h-4 w-4" />
          </a>

          <Link
            href="/match"
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400 px-4 py-1.5 text-xs sm:text-sm font-extrabold text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition hover:bg-emerald-300 hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] active:scale-95"
          >
            Find a Cause
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
