"use client";

import { useState } from "react";
import { CauseCategory, GivingType, Charity } from "@/lib/types";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  RefreshCcw,
  Heart,
  Bookmark,
  Shield,
  Code2,
  Globe2,
  GraduationCap,
  Activity,
  HeartHandshake,
  DollarSign,
  Laptop,
  Megaphone,
  Compass,
  ArrowUpRight,
  LucideIcon
} from "lucide-react";
import Link from "next/link";
import { useBookmarks } from "@/lib/useBookmarks";
import charitiesData from "@/data/charities.json";
import { IconMap } from "@/components/Icons";

interface QuizState {
  primaryCause: CauseCategory | "any";
  givingPreference: GivingType | "any";
  impactScope: "global" | "local-community" | "open-web" | "any";
}

const CAUSE_OPTIONS: { id: CauseCategory; label: string; desc: string; icon: LucideIcon }[] = [
  {
    id: "education-diversity",
    label: "Education & Diversity in Tech",
    desc: "Closing gender and racial gaps in CS; empowering youth with coding skills.",
    icon: GraduationCap,
  },
  {
    id: "climate-sustainability",
    label: "Climate Tech & Clean Earth",
    desc: "Satellite emission tracking, clean energy tech, and ecological preservation.",
    icon: Globe2,
  },
  {
    id: "digital-rights-privacy",
    label: "Digital Human Rights & Privacy",
    desc: "Defending privacy, user encryption, open internet laws, and free speech.",
    icon: Shield,
  },
  {
    id: "open-source-public-goods",
    label: "Open Source & Public Goods",
    desc: "Digital libraries, disaster mapping, and non-profit tech infrastructure.",
    icon: Code2,
  },
  {
    id: "healthcare-accessibility",
    label: "Assistive Tech & Accessibility",
    desc: "Building accessible web standards and low-cost assistive tools for all.",
    icon: Activity,
  },
];

const GIVING_OPTIONS: { id: GivingType; label: string; desc: string; icon: LucideIcon }[] = [
  {
    id: "direct-donation",
    label: "Direct Financial Support",
    desc: "Tax-deductible financial contributions to fund core engineering missions.",
    icon: DollarSign,
  },
  {
    id: "mentorship-volunteering",
    label: "Volunteer Coding & Mentorship",
    desc: "Donate developer hours, conduct mock interviews, or contribute code.",
    icon: HeartHandshake,
  },
  {
    id: "equipment-donation",
    label: "Hardware / Device Donation",
    desc: "Donate laptops, servers, or refurbished devices to underserved schools.",
    icon: Laptop,
  },
  {
    id: "advocacy",
    label: "Advocacy & Awareness",
    desc: "Support open policy letters, spread word, and participate in grassroots action.",
    icon: Megaphone,
  },
];

const SCOPE_OPTIONS: { id: "global" | "local-community" | "open-web" | "any"; label: string; desc: string; icon: LucideIcon }[] = [
  {
    id: "global",
    label: "Worldwide & Developing Nations",
    desc: "Initiatives impacting underserved populations globally.",
    icon: Globe2,
  },
  {
    id: "open-web",
    label: "The Open Web & Internet Commons",
    desc: "Preserving shared digital infrastructure and developer tools.",
    icon: Compass,
  },
  {
    id: "local-community",
    label: "Grassroots & Local Students",
    desc: "After-school programs, bootcamps, and local community centers.",
    icon: GraduationCap,
  },
  {
    id: "any",
    label: "Maximum Impact (Any Scope)",
    desc: "Show me whatever vetted non-profit needs help the most.",
    icon: Sparkles,
  },
];

export default function MatcherPage() {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<QuizState>({
    primaryCause: "education-diversity",
    givingPreference: "direct-donation",
    impactScope: "global",
  });
  const [results, setResults] = useState<Charity[] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewSavedOnly, setViewSavedOnly] = useState(false);

  const { isCharityBookmarked, toggleCharityBookmark, bookmarkedCharityIds } = useBookmarks();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      const data = await res.json();
      if (data.matches) {
        setResults(data.matches);
        setStep(4);
      }
    } catch (err) {
      console.error("Match error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const restartQuiz = () => {
    setResults(null);
    setViewSavedOnly(false);
    setStep(1);
  };

  const allCharities = charitiesData as Charity[];
  const savedCharitiesList = allCharities.filter((c) => bookmarkedCharityIds.includes(c.id));

  return (
    <div className="relative min-h-screen pb-24">
      {/* Background ambient glow */}
      <div className="ambient-glow-emerald pointer-events-none absolute inset-0 -z-10 h-[500px] w-full" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-12 sm:pt-16">
        {/* Top Bar with Bookmarks shortcut */}
        <div className="flex items-center justify-between mb-8 border-b border-white/[0.06] pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Impact Engine
            </span>
          </div>

          {bookmarkedCharityIds.length > 0 && (
            <button
              onClick={() => {
                setViewSavedOnly(!viewSavedOnly);
                if (!viewSavedOnly) setStep(4);
              }}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold border transition-all duration-200 ${
                viewSavedOnly
                  ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                  : "border-white/[0.08] bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              <Bookmark className={`h-3.5 w-3.5 ${viewSavedOnly ? "fill-amber-400" : ""}`} />
              <span>Saved Causes ({bookmarkedCharityIds.length})</span>
            </button>
          )}
        </div>

        {/* Questionnaire Glass Card */}
        <div className="rounded-3xl border border-white/[0.08] bg-[#0c1220]/90 p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          {step < 4 && !viewSavedOnly ? (
            <div>
              {/* Step Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2.5">
                  <span className="uppercase tracking-wider text-[11px] text-emerald-400 font-bold">
                    Step {step} of 3
                  </span>
                  <span>{step === 1 ? "Cause Selection" : step === 2 ? "Contribution Type" : "Impact Target"}</span>
                </div>
                <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                    style={{ width: `${(step / 3) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step 1: Cause */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                    What tech cause inspires you?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mb-6">
                    Choose the mission area where you want your support to make a difference.
                  </p>

                  <div className="space-y-3">
                    {CAUSE_OPTIONS.map((opt) => {
                      const Icon = opt.icon;
                      const isSelected = answers.primaryCause === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => setAnswers({ ...answers, primaryCause: opt.id })}
                          className={`w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition-all duration-200 ${
                            isSelected
                              ? "border-emerald-500/60 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/30"
                              : "border-white/[0.06] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
                          }`}
                        >
                          <div className={`p-2.5 rounded-xl border mt-0.5 ${
                            isSelected ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-300" : "border-white/[0.06] bg-white/[0.03] text-slate-400"
                          }`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-white text-sm sm:text-base">{opt.label}</div>
                            <div className="text-xs text-slate-300 mt-0.5 leading-relaxed">{opt.desc}</div>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-1 flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Giving Style */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                    How would you prefer to contribute?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mb-6">
                    Select your preferred giving channel.
                  </p>

                  <div className="space-y-3">
                    {GIVING_OPTIONS.map((opt) => {
                      const Icon = opt.icon;
                      const isSelected = answers.givingPreference === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => setAnswers({ ...answers, givingPreference: opt.id })}
                          className={`w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition-all duration-200 ${
                            isSelected
                              ? "border-teal-500/60 bg-teal-500/10 shadow-[0_0_20px_rgba(20,184,166,0.15)] ring-1 ring-teal-500/30"
                              : "border-white/[0.06] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
                          }`}
                        >
                          <div className={`p-2.5 rounded-xl border mt-0.5 ${
                            isSelected ? "border-teal-500/40 bg-teal-500/20 text-teal-300" : "border-white/[0.06] bg-white/[0.03] text-slate-400"
                          }`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-white text-sm sm:text-base">{opt.label}</div>
                            <div className="text-xs text-slate-300 mt-0.5 leading-relaxed">{opt.desc}</div>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="h-5 w-5 text-teal-400 mt-1 flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Scope */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                    What scope of impact matters most?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mb-6">
                    Determine where the primary benefit should land.
                  </p>

                  <div className="space-y-3">
                    {SCOPE_OPTIONS.map((opt) => {
                      const Icon = opt.icon;
                      const isSelected = answers.impactScope === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => setAnswers({ ...answers, impactScope: opt.id })}
                          className={`w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition-all duration-200 ${
                            isSelected
                              ? "border-emerald-500/60 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/30"
                              : "border-white/[0.06] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
                          }`}
                        >
                          <div className={`p-2.5 rounded-xl border mt-0.5 ${
                            isSelected ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-300" : "border-white/[0.06] bg-white/[0.03] text-slate-400"
                          }`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-white text-sm sm:text-base">{opt.label}</div>
                            <div className="text-xs text-slate-300 mt-0.5 leading-relaxed">{opt.desc}</div>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-1 flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between border-t border-white/[0.06] pt-6 mt-8">
                {step > 1 ? (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-2.5 text-xs sm:text-sm font-bold text-[#080c14] shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:bg-emerald-400 transition active:scale-95"
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-6 py-2.5 text-xs sm:text-sm font-bold text-[#080c14] shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:scale-[1.02] transition active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? "Calculating Matches..." : "View Recommendations"}
                    <Sparkles className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Results View */
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-3 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <Heart className="h-6 w-6" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  {viewSavedOnly ? "Saved Causes" : "Recommended Organizations"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                  {viewSavedOnly
                    ? "Your locally bookmarked non-profits and causes."
                    : `High-impact non-profits matching your focus on ${answers.primaryCause.replace(
                        /-/g,
                        " "
                      )}.`}
                </p>
              </div>

              <div className="space-y-5 mb-8">
                {(viewSavedOnly ? savedCharitiesList : results || [])?.map((charity) => {
                  const bookmarked = isCharityBookmarked(charity.id);
                  const IconComp = IconMap[charity.iconName] || Shield;

                  return (
                    <div
                      key={charity.id}
                      className="relative rounded-2xl border border-white/[0.08] bg-[#111a2d]/90 p-6 flex flex-col justify-between transition-all duration-300 hover:border-emerald-500/40"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                              <IconComp className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-bold text-white text-base sm:text-lg leading-tight">
                                {charity.name}
                              </h3>
                              <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full mt-1 inline-block">
                                {charity.rating}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => toggleCharityBookmark(charity.id)}
                            title={bookmarked ? "Remove bookmark" : "Save cause"}
                            className={`p-1.5 rounded-lg border transition ${
                              bookmarked
                                ? "bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                                : "border-white/[0.06] bg-white/[0.02] text-slate-300 hover:text-white hover:border-white/20"
                            }`}
                          >
                            <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-amber-400" : ""}`} />
                          </button>
                        </div>

                        <p className="text-xs font-medium text-emerald-300 italic mb-2">
                          &ldquo;{charity.tagline}&rdquo;
                        </p>

                        <p className="text-xs text-slate-200 leading-relaxed mb-4">
                          {charity.description}
                        </p>

                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 mb-4 text-xs">
                          <span className="font-bold text-slate-200">Verified Impact: </span>
                          <span className="text-slate-300">{charity.impactMetrics}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
                        <div className="flex flex-wrap gap-1.5">
                          {charity.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 text-[10px] font-medium text-slate-300"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          {charity.volunteerUrl && (
                            <a
                              href={charity.volunteerUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/[0.08] hover:text-white transition"
                            >
                              Volunteer
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                          )}
                          <a
                            href={charity.donateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg bg-emerald-500 px-3.5 py-1.5 text-xs font-bold text-[#080c14] shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:bg-emerald-400 transition"
                          >
                            Support Directly
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center pt-4 border-t border-white/[0.06] flex items-center justify-center gap-4">
                <button
                  onClick={restartQuiz}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition"
                >
                  <RefreshCcw className="h-3.5 w-3.5" /> Retake Questionnaire
                </button>
                <span className="text-slate-700">|</span>
                <Link
                  href="/feed"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition"
                >
                  Browse Uplift Feed <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
