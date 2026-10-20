import Link from "next/link";
import { Sparkles, Github, Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#060910] py-12 text-slate-400">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">techHappy</div>
              <div className="text-xs text-slate-500">Autonomous positive technology stream & giving matcher</div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs sm:text-sm font-medium">
            <Link href="/feed" className="hover:text-emerald-400 transition">
              Feed
            </Link>
            <Link href="/match" className="hover:text-emerald-400 transition">
              Impact Matcher
            </Link>
            <a
              href="https://github.com/jakenathanson15/techHappy"
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-400 transition flex items-center gap-1.5"
            >
              <Github className="h-3.5 w-3.5" />
              Source Code
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-white/[0.04] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} techHappy. Zero tracking, zero ads, zero cost.</p>
          <div className="flex items-center gap-4 text-slate-500">
            <span className="flex items-center gap-1 text-emerald-400/80">
              <Shield className="h-3.5 w-3.5" /> 100% Private & Open
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
