import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TechHappyEmblem } from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-12 w-12 items-center justify-center bg-[#181818] border border-white/10 mb-4">
        <TechHappyEmblem className="h-6 w-6" />
      </div>
      <h1 className="text-4xl font-extrabold text-white mb-2">404</h1>
      <p className="text-sm text-slate-400 mb-6">This page could not be found.</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-[#f5e642] px-5 py-2 text-xs font-bold text-[#0a0a0a] hover:bg-[#faf080] transition"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Return Home
      </Link>
    </div>
  );
}
