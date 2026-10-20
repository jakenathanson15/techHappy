import Link from "next/link";
import { Github, Shield } from "lucide-react";
import { TechHappyEmblem } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#060910] py-12 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-400">
              <TechHappyEmblem className="h-4 w-4" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">techHappy</div>
              <div className="text-xs text-slate-300 font-medium">Curated positive technology stream & giving matcher</div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs sm:text-sm font-semibold">
            <Link href="/feed" className="text-slate-200 hover:text-emerald-300 transition">
              Feed
            </Link>
            <Link href="/match" className="text-slate-200 hover:text-emerald-300 transition">
              Impact Matcher
            </Link>
            <a
              href="https://github.com/jakenathanson15/techHappy"
              target="_blank"
              rel="noreferrer"
              className="text-slate-200 hover:text-emerald-300 transition flex items-center gap-1.5"
            >
              <Github className="h-4 w-4" />
              Source Code
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 font-medium gap-4">
          <p>© {new Date().getFullYear()} techHappy. Zero tracking, zero ads, zero cost.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-300 font-semibold">
              <Shield className="h-4 w-4 text-emerald-400" /> 100% Private & Open
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
