import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-4">
        <Sparkles className="h-6 w-6" />
      </div>
      <h1 className="text-4xl font-extrabold text-white mb-2">404</h1>
      <p className="text-sm text-slate-400 mb-6">This page could not be found.</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2 text-xs font-bold text-[#080c14] hover:bg-emerald-400 transition"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Return Home
      </Link>
    </div>
  );
}
