import Link from "next/link";
import { Github, Shield } from "lucide-react";
import { TechHappyEmblem } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-neutral-800/80 bg-[#06090e] py-12 text-neutral-400">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10 pb-8 border-b border-neutral-800/60">
          {/* Col 1: Identity & Mission */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-neutral-900 border border-neutral-800 text-emerald-400">
                <TechHappyEmblem className="h-3.5 w-3.5" />
              </div>
              <span className="font-sans font-bold text-sm tracking-tight text-white">
                techHappy
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              An independent scientific news wire tracking peer-reviewed breakthroughs across clean energy, biotechnology, and public digital goods — paired with a vetted charity directory.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>13 Live Institutional Feeds Connected</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3 space-y-2.5">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
              Navigation
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/feed" className="text-neutral-400 hover:text-white transition duration-150 flex items-center gap-2">
                  <span className="font-mono text-neutral-400">01</span> Wire Feed
                </Link>
              </li>
              <li>
                <Link href="/match" className="text-neutral-400 hover:text-white transition duration-150 flex items-center gap-2">
                  <span className="font-mono text-neutral-400">02</span> Impact Matcher
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/jakenathanson15/techHappy"
                  target="_blank"
                  rel="noreferrer"
                  className="text-neutral-400 hover:text-white transition duration-150 flex items-center gap-2"
                >
                  <Github className="h-3 w-3" /> Source Repository
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Curation Principles */}
          <div className="md:col-span-4 space-y-2.5">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
              Standards
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Strictly peer-reviewed and lab-verified. No sponsored crypto promotion, no tracking cookies, and zero paywalls.
            </p>
          </div>
        </div>

        {/* Bottom Metadata Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 font-mono gap-4">
          <p>© {new Date().getFullYear()} techHappy. Public interest software.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-neutral-400">
              <Shield className="h-3.5 w-3.5 text-emerald-500" />
              <span>Zero-Tracker Architecture</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
