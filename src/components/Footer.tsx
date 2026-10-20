import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 text-slate-600">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-bold text-slate-900">techHappy</span>
            <span className="text-sm text-slate-400">— Technology for a better world</span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <Link href="/feed" className="hover:text-emerald-600 transition">
              Positive News
            </Link>
            <Link href="/match" className="hover:text-emerald-600 transition">
              Charity Matcher
            </Link>
            <a
              href="https://github.com/jakenathanson15/techHappy"
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-600 transition"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6 text-center text-xs text-slate-400 flex items-center justify-center gap-1">
          <span>Crafted with</span>
          <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 inline" />
          <span>to inspire optimism & giving in technology.</span>
        </div>
      </div>
    </footer>
  );
}
