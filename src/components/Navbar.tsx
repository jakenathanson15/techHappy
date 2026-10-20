import Link from "next/link";
import { Sparkles, HeartHandshake, Newspaper, ArrowRight } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-slate-900 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm transition group-hover:scale-105">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-xl tracking-tight font-extrabold bg-gradient-to-r from-slate-900 via-teal-900 to-emerald-700 bg-clip-text text-transparent">
            techHappy
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-6">
          <Link
            href="/feed"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:text-emerald-600 rounded-lg hover:bg-slate-50"
          >
            <Newspaper className="h-4 w-4 text-emerald-500" />
            <span>Uplift Feed</span>
          </Link>

          <Link
            href="/match"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:text-emerald-600 rounded-lg hover:bg-slate-50"
          >
            <HeartHandshake className="h-4 w-4 text-rose-500" />
            <span>Impact Matcher</span>
          </Link>

          <Link
            href="/match"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 hover:shadow"
          >
            Find a Cause
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
