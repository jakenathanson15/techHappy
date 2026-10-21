"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Github } from "lucide-react";
import { TechHappyEmblem } from "./Logo";

export function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center border border-white/20 bg-[#181818] text-[#f5e642] transition duration-100 group-hover:border-[#f5e642]/60">
            <TechHappyEmblem className="h-4 w-4" />
          </div>
          <span className="font-sans font-bold text-sm tracking-tight text-white">
            techHappy
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/feed"
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium transition duration-100 ${
              isActive("/feed")
                ? "bg-[#1a1a1a] text-white border border-white/20 font-semibold"
                : "text-neutral-400 hover:text-white hover:bg-[#161616]"
            }`}
          >
            <span className="font-mono text-[10px] text-[#f5e642] font-semibold">01</span>
            <span>Feed</span>
          </Link>

          <Link
            href="/causes"
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium transition duration-100 ${
              isActive("/causes")
                ? "bg-[#1a1a1a] text-white border border-white/20 font-semibold"
                : "text-neutral-400 hover:text-white hover:bg-[#161616]"
            }`}
          >
            <span className="font-mono text-[10px] text-[#f5e642] font-semibold">02</span>
            <span>Causes</span>
          </Link>

          <Link
            href="/sources"
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium transition duration-100 ${
              isActive("/sources")
                ? "bg-[#1a1a1a] text-white border border-white/20 font-semibold"
                : "text-neutral-400 hover:text-white hover:bg-[#161616]"
            }`}
          >
            <span className="font-mono text-[10px] text-[#f5e642] font-semibold">03</span>
            <span>Sources</span>
          </Link>

          <Link
            href="/match"
            className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium transition duration-100 ${
              isActive("/match")
                ? "bg-[#1a1a1a] text-white border border-white/20 font-semibold"
                : "text-neutral-400 hover:text-white hover:bg-[#161616]"
            }`}
          >
            <span className="font-mono text-[10px] text-[#f5e642] font-semibold">04</span>
            <span>Matcher</span>
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <a
            href="https://github.com/jakenathanson15/techHappy"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center h-8 w-8 border border-white/10 bg-[#181818] text-neutral-400 hover:text-white hover:border-white/25 transition duration-100"
            title="GitHub Repository"
          >
            <Github className="h-3.5 w-3.5" />
          </a>

          <Link
            href="/match"
            className="inline-flex items-center gap-1.5 bg-[#f5e642] px-3.5 py-1.5 text-xs font-bold text-[#0a0a0a] transition duration-100 hover:bg-[#faf080] active:bg-[#e8d600]"
          >
            <span>Match Causes</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </header>
  );
}
