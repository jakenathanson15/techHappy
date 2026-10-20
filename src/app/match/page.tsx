"use client";

import { useState } from "react";
import { Charity, CauseCategory, GivingType } from "@/lib/types";
import charitiesData from "@/data/charities.json";
import {
  Sparkles,
  Shield,
  Heart,
  Globe2,
  Code2,
  GraduationCap,
  Library,
  DollarSign,
  Laptop,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  RefreshCcw,
  Bookmark,
  LucideIcon,
  Activity,
  HeartHandshake,
  Megaphone,
  Compass,
} from "lucide-react";
import { useBookmarks } from "@/lib/useBookmarks";
import { IconMap } from "@/components/Icons";
import Link from "next/link";

interface QuizState {
  primaryCause: CauseCategory | "any";
  givingPreference: GivingType | "any";
  impactScope: "global" | "local-community" | "open-web" | "any";
}

const CAUSE_OPTIONS: { id: CauseCategory; label: string; desc: string; icon: LucideIcon }[] = [
  {
    id: "digital-rights-privacy",
    label: "Digital Privacy & Human Rights",
    desc: "Protect encryption, fight surveillance, and defend free speech online.",
    icon: Shield,
  },
  {
    id: "education-diversity",
    label: "Tech Diversity & Education",
    desc: "Empower underrepresented groups with high-quality coding and tech training.",
    icon: GraduationCap,
  },
  {
    id: "climate-sustainability",
    label: "Climate Tech & Clean Earth",
    desc: "Support clean-energy modeling, satellite emissions tracking, and ocean cleanup.",
    icon: Globe2,
  },
  {
    id: "open-source-public-goods",
    label: "Open Source & Public Goods",
    desc: "Support public digital infrastructure, open-hardware prosthetics, and digital libraries.",
    icon: Code2,
  },
  {
    id: "healthcare-accessibility",
    label: "Assistive Tech & Accessibility",
    desc: "Build accessible open-source tools and speech devices for non-verbal and disabled users.",
    icon: Heart,
  },
];

const GIVING_OPTIONS: { id: GivingType; label: string; desc: string; icon: LucideIcon }[] = [
  {
    id: "direct-donation",
    label: "Direct Financial Support",
    desc: "Tax-deductible 501(c)(3) donations with 100% Charity Navigator ratings.",
    icon: DollarSign,
  },
  {
    id: "mentorship-volunteering",
    label: "Code & Skill Mentorship",
    desc: "Contribute to open repositories, code reviews, or mentor emerging engineers.",
    icon: HeartHandshake,
  },
  {
    id: "equipment-donation",
    label: "Device & Hardware Giving",
    desc: "Donate working laptops, tablets, or fabrication tools to students and refugees.",
    icon: Laptop,
  },
  {
    id: "advocacy",
    label: "Policy Advocacy & Campaigning",
    desc: "Sign amicus briefs, organize developer coalitions, and educate policymakers.",
    icon: Megaphone,
  },
];

const SCOPE_OPTIONS: { id: "global" | "local-community" | "open-web" | "any"; label: string; desc: string; icon: LucideIcon }[] = [
  {
    id: "global",
    label: "Global Reach",
    desc: "Worldwide initiatives spanning across continents, developing nations, and crisis zones.",
    icon: Globe2,
  },
  {
    id: "open-web",
    label: "The Open Web & Digital Commons",
    desc: "Preserving decentralized internet infrastructure and free public digital archives.",
    icon: Compass,
  },
  {
    id: "local-community",
    label: "Local Communities & Classrooms",
    desc: "Direct grassroots impact in schools, bootcamps, and local community tech centers.",
    icon: GraduationCap,
  },
  {
    id: "any",
    label: "Any / Highest Need",
    desc: "Prioritize organizations where funding or technical help is most critically needed.",
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
        <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
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
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold border transition-all duration-200 ${
                viewSavedOnly
                  ? "bg-amber-500/25 border-amber-500/60 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                  : "border-slate-700 bg-[#111a2e] text-slate-200 hover:text-white hover:bg-[#18233d]"
              }`}
            >
              <Bookmark className={`h-3.5 w-3.5 ${viewSavedOnly ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} />
              <span>Saved Causes ({bookmarkedCharityIds.length})</span>
            </button>
          )}
        </div>

        {/* Questionnaire Glass Card */}
        <div className="rounded-3xl border border-slate-800 bg-[#0c1220] p-6 sm:p-10 shadow-2xl">
          {step < 4 && !viewSavedOnly ? (
            <div>
              {/* Step Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-200 mb-2.5">
                  <span className="uppercase tracking-wider text-xs text-emerald-300 font-bold">
                    Step {step} of 3
                  </span>
                  <span className="text-white font-medium">
                    {step === 1 ? "Cause Selection" : step === 2 ? "Contribution Type" : "Impact Target"}
                  </span>
                </div>
                <div className="h-2 w-full bg-[#111a2e] border border-slate-700/60 rounded-full overflow-hidden">
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
                  <p className="text-xs sm:text-sm text-slate-200 mb-6 font-medium">
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
                              ? "border-emerald-500/60 bg-emerald-500/15 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/40"
                              : "border-slate-800 bg-[#111a2e]/60 hover:border-slate-700 hover:bg-[#111a2e]"
                          }`}
                        >
                          <div className={`p-2.5 rounded-xl border mt-0.5 ${
                            isSelected ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-300" : "border-slate-700 bg-slate-900 text-slate-300"
                          }`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-white text-sm sm:text-base">{opt.label}</div>
                            <div className="text-xs text-slate-200 mt-0.5 leading-relaxed font-normal">{opt.desc}</div>
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
                  <p className="text-xs sm:text-sm text-slate-200 mb-6 font-medium">
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
                              ? "border-teal-500/60 bg-teal-500/15 shadow-[0_0_20px_rgba(20,184,166,0.15)] ring-1 ring-teal-500/40"
                              : "border-slate-800 bg-[#111a2e]/60 hover:border-slate-700 hover:bg-[#111a2e]"
                          }`}
                        >
                          <div className={`p-2.5 rounded-xl border mt-0.5 ${
                            isSelected ? "border-teal-500/50 bg-teal-500/20 text-teal-300" : "border-slate-700 bg-slate-900 text-slate-300"
                          }`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-white text-sm sm:text-base">{opt.label}</div>
                            <div className="text-xs text-slate-200 mt-0.5 leading-relaxed font-normal">{opt.desc}</div>
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
                  <p className="text-xs sm:text-sm text-slate-200 mb-6 font-medium">
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
                              ? "border-emerald-500/60 bg-emerald-500/15 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/40"
                              : "border-slate-800 bg-[#111a2e]/60 hover:border-slate-700 hover:bg-[#111a2e]"
                          }`}
                        >
                          <div className={`p-2.5 rounded-xl border mt-0.5 ${
                            isSelected ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-300" : "border-slate-700 bg-slate-900 text-slate-300"
                          }`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-white text-sm sm:text-base">{opt.label}</div>
                            <div className="text-xs text-slate-200 mt-0.5 leading-relaxed font-normal">{opt.desc}</div>
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
              <div className="flex items-center justify-between border-t border-slate-800 pt-6 mt-8">
                {step > 1 ? (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-6 py-2.5 text-xs sm:text-sm font-extrabold text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:bg-emerald-300 transition active:scale-95"
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 px-6 py-2.5 text-xs sm:text-sm font-extrabold text-slate-950 shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:scale-[1.02] transition active:scale-95 disabled:opacity-50"
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
                <p className="text-xs sm:text-sm text-slate-200 max-w-lg mx-auto font-medium">
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
                      className="relative rounded-2xl border border-slate-800 bg-[#111a2d] p-6 flex flex-col justify-between transition-all duration-300 hover:border-emerald-500/50 shadow-lg"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400">
                              <IconComp className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-bold text-white text-base sm:text-lg leading-tight">
                                {charity.name}
                              </h3>
                              <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full mt-1 inline-block">
                                {charity.rating}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => toggleCharityBookmark(charity.id)}
                            title={bookmarked ? "Remove bookmark" : "Save cause"}
                            className={`p-1.5 rounded-lg border transition ${
                              bookmarked
                                ? "bg-amber-500/25 border-amber-500/60 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                                : "border-slate-700 bg-slate-900 text-slate-200 hover:text-white hover:border-slate-500"
                            }`}
                          >
                            <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} />
                          </button>
                        </div>

                        <p className="text-xs font-semibold text-emerald-300 italic mb-2">
                          &ldquo;{charity.tagline}&rdquo;
                        </p>

                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4 font-normal">
                          {charity.description}
                        </p>

                        <div className="rounded-xl border border-slate-700/80 bg-slate-900/80 p-3 mb-4 text-xs">
                          <span className="font-bold text-white">Verified Impact: </span>
                          <span className="text-slate-200">{charity.impactMetrics}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">
                        <div className="flex flex-wrap gap-1.5">
                          {charity.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-md border border-slate-700 bg-slate-900/90 px-2 py-0.5 text-[10px] font-semibold text-slate-200"
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
                              className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-200 hover:bg-slate-800 hover:text-white transition"
                            >
                              Volunteer
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                          )}
                          <a
                            href={charity.donateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg bg-emerald-400 px-3.5 py-1.5 text-xs font-extrabold text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:bg-emerald-300 transition"
                          >
                            Support Directly
                            <ArrowUpRight className="h-3.5 w-3.5 text-slate-950" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center pt-4 border-t border-slate-800 flex items-center justify-center gap-4">
                <button
                  onClick={restartQuiz}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition"
                >
                  <RefreshCcw className="h-3.5 w-3.5" /> Retake Questionnaire
                </button>
                <span className="text-slate-600">|</span>
                <Link
                  href="/feed"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 transition"
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
