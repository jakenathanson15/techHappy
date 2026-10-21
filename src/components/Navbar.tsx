"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Github } from "lucide-react";
import { TechHappyEmblem } from "./Logo";

export function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800/80 bg-[#080c12]/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo & Wordmark */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-900 border border-neutral-700/80 text-emerald-400 transition duration-150 group-hover:border-emerald-500/50 group-hover:bg-neutral-850">
            <TechHappyEmblem className="h-4 w-4" />
          </div>
          <span className="font-sans font-bold text-sm tracking-tight text-white">
            techHappy
          </span>
        </Link>

        {/* Center Nav Links with Monospaced Section Markers */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/feed"
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition duration-150 ${
              isActive("/feed")
                ? "bg-neutral-800/90 text-white border border-neutral-700 font-semibold"
                : "text-neutral-400 hover:text-white hover:bg-neutral-900/60"
            }`}
          >
            <span className="font-mono text-[10px] text-emerald-400 font-semibold">01</span>
            <span>Feed</span>
          </Link>

          <Link
            href="/causes"
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition duration-150 ${
              isActive("/causes")
                ? "bg-neutral-800/90 text-white border border-neutral-700 font-semibold"
                : "text-neutral-400 hover:text-white hover:bg-neutral-900/60"
            }`}
          >
            <span className="font-mono text-[10px] text-teal-400 font-semibold">02</span>
            <span>Causes</span>
          </Link>

          <Link
            href="/sources"
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition duration-150 ${
              isActive("/sources")
                ? "bg-neutral-800/90 text-white border border-neutral-700 font-semibold"
                : "text-neutral-400 hover:text-white hover:bg-neutral-900/60"
            }`}
          >
            <span className="font-mono text-[10px] text-emerald-400 font-semibold">03</span>
            <span>Sources</span>
          </Link>

          <Link
            href="/match"
            className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition duration-150 ${
              isActive("/match")
                ? "bg-neutral-800/90 text-white border border-neutral-700 font-semibold"
                : "text-neutral-400 hover:text-white hover:bg-neutral-900/60"
            }`}
          >
            <span className="font-mono text-[10px] text-teal-400 font-semibold">04</span>
            <span>Matcher</span>
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <a
            href="https://github.com/jakenathanson15/techHappy"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center h-8 w-8 rounded-md border border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-white hover:border-neutral-700 transition duration-150"
            title="GitHub Repository"
          >
            <Github className="h-3.5 w-3.5" />
          </a>

          <Link
            href="/match"
            className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500 px-3.5 py-1.5 text-xs font-semibold text-neutral-950 transition duration-150 hover:bg-emerald-400 active:bg-emerald-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400"
          >
            <span>Match Causes</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </header>
  );
}
