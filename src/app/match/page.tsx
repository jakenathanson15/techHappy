"use client";

import { useEffect, useState } from "react";
import { Charity, CauseCategory, GivingType } from "@/lib/types";
import charitiesData from "@/data/charities.json";
import {
  Shield,
  Heart,
  Globe2,
  Code2,
  GraduationCap,
  DollarSign,
  Laptop,
  Check,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  RefreshCcw,
  Bookmark,
  LucideIcon,
  HeartHandshake,
  Megaphone,
  Compass,
  Layers,
  Sparkles,
  ShieldCheck,
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
    label: "Digital Privacy & Cryptographic Rights",
    desc: "Protect end-to-end encryption, challenge systemic surveillance, and safeguard civil liberties across networks.",
    icon: Shield,
  },
  {
    id: "education-diversity",
    label: "Engineering Education & Access",
    desc: "Fund technical curriculum, hardware labs, and mentorship for historically underrepresented software builders.",
    icon: GraduationCap,
  },
  {
    id: "climate-sustainability",
    label: "Climate Computation & Earth Science",
    desc: "Support open satellite emissions telemetry, renewable grid models, and conservation data infrastructure.",
    icon: Globe2,
  },
  {
    id: "open-source-public-goods",
    label: "Open Source & Public Digital Commons",
    desc: "Sustain foundational open source protocols, decentralized archives, and assistive hardware blueprints.",
    icon: Code2,
  },
  {
    id: "healthcare-accessibility",
    label: "Assistive Technology & Neural Access",
    desc: "Develop open synthetic speech tools, low-cost prosthetics, and accessibility layers for non-verbal users.",
    icon: Heart,
  },
];

const GIVING_OPTIONS: { id: GivingType; label: string; desc: string; icon: LucideIcon }[] = [
  {
    id: "direct-donation",
    label: "Direct Financial Support",
    desc: "Tax-deductible 501(c)(3) donations deployed with verified fiscal transparency and zero overhead.",
    icon: DollarSign,
  },
  {
    id: "mentorship-volunteering",
    label: "Code & Skill Mentorship",
    desc: "Contribute code reviews, architectural advisory, or direct mentorship to non-profit development teams.",
    icon: HeartHandshake,
  },
  {
    id: "equipment-donation",
    label: "Hardware & Device Giving",
    desc: "Donate refurbished developer workstations, microcontrollers, or lab equipment to community workshops.",
    icon: Laptop,
  },
  {
    id: "advocacy",
    label: "Policy Advocacy & Campaigning",
    desc: "Join technical coalitions filing open regulatory comments and defending protocol decentralization.",
    icon: Megaphone,
  },
];

const SCOPE_OPTIONS: { id: "global" | "local-community" | "open-web" | "any"; label: string; desc: string; icon: LucideIcon }[] = [
  {
    id: "global",
    label: "Global Reach",
    desc: "Initiatives operating across continents, developing infrastructure hubs, and international treaties.",
    icon: Globe2,
  },
  {
    id: "open-web",
    label: "The Open Web & Digital Commons",
    desc: "Universal public infrastructure, open internet standards, and decentralized archival repositories.",
    icon: Compass,
  },
  {
    id: "local-community",
    label: "Local Classrooms & Labs",
    desc: "Grassroots engineering bootcamps, municipal repair collectives, and neighborhood STEM programs.",
    icon: GraduationCap,
  },
  {
    id: "any",
    label: "Highest Immediate Need",
    desc: "Route to whichever verified organization has the most acute immediate funding or volunteer deficit.",
    icon: Layers,
  },
];

export default function MatcherPage() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);
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

  useEffect(() => {
    setMounted(true);
    const introSeen = sessionStorage.getItem("techhappy_matcher_intro_seen");
    if (introSeen) {
      setShowIntro(false);
    }
  }, []);

  const handleStartQuiz = () => {
    sessionStorage.setItem("techhappy_matcher_intro_seen", "true");
    setShowIntro(false);
    setStep(1);
  };

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
    setShowIntro(false);
    setStep(1);
  };

  const allCharities = charitiesData as Charity[];
  const savedCharitiesList = allCharities.filter((c) => bookmarkedCharityIds.includes(c.id));

  return (
    <div className="relative min-h-screen pb-24">
      {/* Background wire grid */}
      <div className="wire-grid-bg fixed inset-0 opacity-40 -z-10 pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-10 sm:pt-14">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-800 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-[11px] uppercase tracking-widest text-teal-400">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-400" />
              <span>FIND A CAUSE // 3-STEP IMPACT MATCHER</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-neutral-100">
              Impact Matcher
            </h1>
            <p className="mt-2 font-sans text-xs sm:text-sm text-neutral-400 max-w-xl leading-relaxed">
              Answer 3 simple questions to connect your skills, time, or donations with vetted 501(c)(3) initiatives making a tangible difference.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/causes"
              className="inline-flex items-center gap-1.5 rounded-sm border border-neutral-800 bg-[#0c1017] px-3 py-1.5 font-mono text-xs text-neutral-300 hover:border-neutral-700 hover:text-white transition"
            >
              <span>View All Causes</span>
              <ArrowRight className="h-3 w-3" />
            </Link>

            {bookmarkedCharityIds.length > 0 && (
              <button
                onClick={() => {
                  setShowIntro(false);
                  setViewSavedOnly(!viewSavedOnly);
                  if (!viewSavedOnly) setStep(4);
                }}
                className={`inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 font-mono text-xs border transition ${
                  viewSavedOnly
                    ? "bg-amber-400/10 border-amber-400/40 text-amber-300"
                    : "border-neutral-800 bg-[#0c1017] text-neutral-300 hover:border-neutral-700 hover:text-white"
                }`}
              >
                <Bookmark className={`h-3 w-3 ${viewSavedOnly ? "fill-amber-400 text-amber-400" : "text-neutral-400"}`} />
                <span>Saved ({bookmarkedCharityIds.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* First Time Intro Card with Animated TH Eyes-Smile */}
        {mounted && showIntro && !viewSavedOnly ? (
          <div className="wire-card rounded-sm p-8 sm:p-12 text-center max-w-2xl mx-auto animate-matcher-header">
            {/* Animated TH Eyes Smile SVG */}
            <div className="relative mb-6 flex items-center justify-center">
              <div className="absolute h-24 w-24 rounded-full border border-teal-500/30 bg-teal-950/20 animate-pulse pointer-events-none" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#0a0e14] border border-neutral-800">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-neutral-100"
                >
                  {/* Left Eye: 'T' */}
                  <path
                    d="M4.5 6.5H10.5"
                    stroke="#f8fafc"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="splash-stroke-draw"
                    style={{ strokeDasharray: 30, animationDelay: "50ms" }}
                  />
                  <path
                    d="M7.5 6.5V12"
                    stroke="#f8fafc"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="splash-stroke-draw"
                    style={{ strokeDasharray: 30, animationDelay: "150ms" }}
                  />

                  {/* Right Eye: 'H' */}
                  <path
                    d="M14 6.5V12"
                    stroke="#f8fafc"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="splash-stroke-draw"
                    style={{ strokeDasharray: 30, animationDelay: "200ms" }}
                  />
                  <path
                    d="M19.5 6.5V12"
                    stroke="#f8fafc"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="splash-stroke-draw"
                    style={{ strokeDasharray: 30, animationDelay: "250ms" }}
                  />
                  <path
                    d="M14 9.25H19.5"
                    stroke="#f8fafc"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="splash-stroke-draw"
                    style={{ strokeDasharray: 30, animationDelay: "300ms" }}
                  />

                  {/* Smile Arc in Vibrant Teal/Emerald */}
                  <path
                    d="M5 16C7.5 19.5 16.5 19.5 19 16"
                    stroke="#14b8a6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="splash-stroke-draw"
                    style={{ strokeDasharray: 40, animationDelay: "400ms" }}
                  />
                </svg>
              </div>
            </div>

            <div className="font-mono text-xs text-teal-400 font-semibold uppercase tracking-wider mb-2">
              ALIGNED PHILANTHROPY // 3-STEP QUIZ
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-neutral-100 mb-3">
              Let&apos;s find you the right cause.
            </h2>

            <p className="font-sans text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed mb-8">
              Answer 3 quick questions about your skills, interests, and preferred way to give back. We&apos;ll connect you directly with vetted, high-impact non-profits.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left mb-8 max-w-xl mx-auto font-mono text-[11px]">
              <div className="p-3 rounded-sm border border-neutral-800 bg-[#080c12]/80">
                <span className="text-teal-400 block font-semibold mb-1">01 // VETTED</span>
                <span className="text-neutral-400">100% 4-Star Charity Navigator</span>
              </div>
              <div className="p-3 rounded-sm border border-neutral-800 bg-[#080c12]/80">
                <span className="text-teal-400 block font-semibold mb-1">02 // TAILORED</span>
                <span className="text-neutral-400">Code, Hardware, or Giving</span>
              </div>
              <div className="p-3 rounded-sm border border-neutral-800 bg-[#080c12]/80">
                <span className="text-teal-400 block font-semibold mb-1">03 // PRIVATE</span>
                <span className="text-neutral-400">Zero tracking or sign-ups</span>
              </div>
            </div>

            <button
              onClick={handleStartQuiz}
              className="inline-flex items-center gap-2 rounded-sm bg-teal-400 px-6 py-2.5 font-mono text-xs font-semibold text-neutral-950 hover:bg-teal-300 active:scale-[0.98] transition shadow-md"
            >
              <span>Start 3-Step Matcher</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            {/* Step Matrix Header */}
            {step < 4 && !viewSavedOnly && (
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8 font-mono text-[11px]">
                <div
                  className={`p-3 border rounded-sm transition ${
                    step === 1
                      ? "border-teal-500/80 bg-teal-950/30 text-teal-300"
                      : step > 1
                      ? "border-neutral-800 bg-[#0c1017] text-neutral-400"
                      : "border-neutral-800/60 bg-neutral-900/20 text-neutral-600"
                  }`}
                >
                  <div className="text-[10px] text-neutral-500">STEP 01</div>
                  <div className="font-semibold text-neutral-200 mt-0.5 truncate">CHOOSE CAUSE</div>
                </div>

                <div
                  className={`p-3 border rounded-sm transition ${
                    step === 2
                      ? "border-teal-500/80 bg-teal-950/30 text-teal-300"
                      : step > 2
                      ? "border-neutral-800 bg-[#0c1017] text-neutral-400"
                      : "border-neutral-800/60 bg-neutral-900/20 text-neutral-600"
                  }`}
                >
                  <div className="text-[10px] text-neutral-500">STEP 02</div>
                  <div className="font-semibold text-neutral-200 mt-0.5 truncate">HOW TO HELP</div>
                </div>

                <div
                  className={`p-3 border rounded-sm transition ${
                    step === 3
                      ? "border-teal-500/80 bg-teal-950/30 text-teal-300"
                      : "border-neutral-800/60 bg-neutral-900/20 text-neutral-600"
                  }`}
                >
                  <div className="text-[10px] text-neutral-500">STEP 03</div>
                  <div className="font-semibold text-neutral-200 mt-0.5 truncate">IMPACT SCOPE</div>
                </div>
              </div>
            )}

            {/* Main Terminal Frame */}
            <div className="rounded-sm border border-neutral-800 bg-[#0c1017] p-6 sm:p-8">
              {step < 4 && !viewSavedOnly ? (
                <div key={`step-container-${step}`}>
                  {/* Step 1: Cause */}
                  {step === 1 && (
                    <div>
                      <div className="animate-matcher-header">
                        <div className="flex items-center gap-2 mb-2 font-mono text-[10px] uppercase tracking-wider text-teal-400">
                          <span>QUESTION 1 OF 3</span>
                        </div>
                        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-neutral-100 mb-2">
                          What tech cause inspires you most?
                        </h2>
                        <p className="font-sans text-xs sm:text-sm text-neutral-400 mb-6">
                          Select the mission area where you would like your support to make a difference.
                        </p>
                      </div>

                      <div className="space-y-2.5">
                        {CAUSE_OPTIONS.map((opt, idx) => {
                          const Icon = opt.icon;
                          const isSelected = answers.primaryCause === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => setAnswers({ ...answers, primaryCause: opt.id })}
                              style={{ animationDelay: `${idx * 110 + 380}ms` }}
                              className={`animate-matcher-choice w-full flex items-start gap-3.5 p-4 rounded-sm border text-left transition duration-150 active:scale-[0.99] ${
                                isSelected
                                  ? "border-teal-500/80 bg-teal-950/20 shadow-sm ring-1 ring-teal-500/30"
                                  : "border-neutral-800 bg-[#080c12]/80 hover:border-neutral-700 hover:bg-[#0f141e]"
                              }`}
                            >
                              <div
                                className={`p-2 rounded-sm border mt-0.5 flex-shrink-0 transition-colors ${
                                  isSelected
                                    ? "border-teal-500/50 bg-teal-500/20 text-teal-300"
                                    : "border-neutral-800 bg-neutral-900 text-neutral-400"
                                }`}
                              >
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-sans font-semibold text-neutral-200 text-sm">{opt.label}</div>
                                <div className="font-sans text-xs text-neutral-400 mt-1 leading-relaxed font-normal">
                                  {opt.desc}
                                </div>
                              </div>
                              <div className="flex-shrink-0 pt-1">
                                <div
                                  className={`h-4 w-4 rounded-sm border flex items-center justify-center transition-colors ${
                                    isSelected
                                      ? "border-teal-400 bg-teal-400 text-neutral-950"
                                      : "border-neutral-700 bg-neutral-900"
                                  }`}
                                >
                                  {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Giving Style */}
                  {step === 2 && (
                    <div>
                      <div className="animate-matcher-header">
                        <div className="flex items-center gap-2 mb-2 font-mono text-[10px] uppercase tracking-wider text-teal-400">
                          <span>QUESTION 2 OF 3</span>
                        </div>
                        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-neutral-100 mb-2">
                          How would you prefer to contribute?
                        </h2>
                        <p className="font-sans text-xs sm:text-sm text-neutral-400 mb-6">
                          Choose whether you want to donate directly, volunteer engineering skills, or donate equipment.
                        </p>
                      </div>

                      <div className="space-y-2.5">
                        {GIVING_OPTIONS.map((opt, idx) => {
                          const Icon = opt.icon;
                          const isSelected = answers.givingPreference === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => setAnswers({ ...answers, givingPreference: opt.id })}
                              style={{ animationDelay: `${idx * 110 + 380}ms` }}
                              className={`animate-matcher-choice w-full flex items-start gap-3.5 p-4 rounded-sm border text-left transition duration-150 active:scale-[0.99] ${
                                isSelected
                                  ? "border-teal-500/80 bg-teal-950/20 shadow-sm ring-1 ring-teal-500/30"
                                  : "border-neutral-800 bg-[#080c12]/80 hover:border-neutral-700 hover:bg-[#0f141e]"
                              }`}
                            >
                              <div
                                className={`p-2 rounded-sm border mt-0.5 flex-shrink-0 transition-colors ${
                                  isSelected
                                    ? "border-teal-500/50 bg-teal-500/20 text-teal-300"
                                    : "border-neutral-800 bg-neutral-900 text-neutral-400"
                                }`}
                              >
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-sans font-semibold text-neutral-200 text-sm">{opt.label}</div>
                                <div className="font-sans text-xs text-neutral-400 mt-1 leading-relaxed font-normal">
                                  {opt.desc}
                                </div>
                              </div>
                              <div className="flex-shrink-0 pt-1">
                                <div
                                  className={`h-4 w-4 rounded-sm border flex items-center justify-center transition-colors ${
                                    isSelected
                                      ? "border-teal-400 bg-teal-400 text-neutral-950"
                                      : "border-neutral-700 bg-neutral-900"
                                  }`}
                                >
                                  {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Scope */}
                  {step === 3 && (
                    <div>
                      <div className="animate-matcher-header">
                        <div className="flex items-center gap-2 mb-2 font-mono text-[10px] uppercase tracking-wider text-teal-400">
                          <span>QUESTION 3 OF 3</span>
                        </div>
                        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-neutral-100 mb-2">
                          What scope of impact matters most?
                        </h2>
                        <p className="font-sans text-xs sm:text-sm text-neutral-400 mb-6">
                          Specify whether your support should target global initiatives, open web protocols, or local community classrooms.
                        </p>
                      </div>

                      <div className="space-y-2.5">
                        {SCOPE_OPTIONS.map((opt, idx) => {
                          const Icon = opt.icon;
                          const isSelected = answers.impactScope === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => setAnswers({ ...answers, impactScope: opt.id })}
                              style={{ animationDelay: `${idx * 110 + 380}ms` }}
                              className={`animate-matcher-choice w-full flex items-start gap-3.5 p-4 rounded-sm border text-left transition duration-150 active:scale-[0.99] ${
                                isSelected
                                  ? "border-teal-500/80 bg-teal-950/20 shadow-sm ring-1 ring-teal-500/30"
                                  : "border-neutral-800 bg-[#080c12]/80 hover:border-neutral-700 hover:bg-[#0f141e]"
                              }`}
                            >
                              <div
                                className={`p-2 rounded-sm border mt-0.5 flex-shrink-0 transition-colors ${
                                  isSelected
                                    ? "border-teal-500/50 bg-teal-500/20 text-teal-300"
                                    : "border-neutral-800 bg-neutral-900 text-neutral-400"
                                }`}
                              >
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-sans font-semibold text-neutral-200 text-sm">{opt.label}</div>
                                <div className="font-sans text-xs text-neutral-400 mt-1 leading-relaxed font-normal">
                                  {opt.desc}
                                </div>
                              </div>
                              <div className="flex-shrink-0 pt-1">
                                <div
                                  className={`h-4 w-4 rounded-sm border flex items-center justify-center transition-colors ${
                                    isSelected
                                      ? "border-teal-400 bg-teal-400 text-neutral-950"
                                      : "border-neutral-700 bg-neutral-900"
                                  }`}
                                >
                                  {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Navigation controls */}
                  <div className="flex items-center justify-between border-t border-neutral-800 pt-6 mt-8 font-mono text-xs">
                    {step > 1 ? (
                      <button
                        onClick={() => setStep(step - 1)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-sm border border-neutral-800 bg-[#080c12] text-neutral-300 hover:border-neutral-700 hover:text-white transition"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" /> Back
                      </button>
                    ) : (
                      <div />
                    )}

                    {step < 3 ? (
                      <button
                        onClick={() => setStep(step + 1)}
                        className="inline-flex items-center gap-2 rounded-sm bg-neutral-100 px-5 py-2 font-semibold text-neutral-950 hover:bg-white transition active:scale-[0.98]"
                      >
                        <span>Continue</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 rounded-sm bg-teal-400 px-5 py-2 font-semibold text-neutral-950 hover:bg-teal-300 transition active:scale-[0.98] disabled:opacity-50"
                      >
                        <span>{isSubmitting ? "Finding Matches..." : "View Recommendations"}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Results View */
                <div key="results-view-container">
                  <div className="animate-matcher-header border-b border-neutral-800 pb-6 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-mono text-[11px] uppercase tracking-wider text-teal-400">
                        {viewSavedOnly ? "SAVED CAUSES LEDGER" : "RECOMMENDED FOR YOU"}
                      </div>
                      <button
                        onClick={restartQuiz}
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-neutral-400 hover:text-white transition"
                      >
                        <RefreshCcw className="h-3 w-3" /> Retake Quiz
                      </button>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-normal text-neutral-100">
                      {viewSavedOnly ? "Saved Causes" : "Matched Organizations"}
                    </h2>
                    <p className="font-sans text-xs sm:text-sm text-neutral-400 mt-1">
                      {viewSavedOnly
                        ? "Locally saved organizations from your evaluation history."
                        : `High-impact non-profits aligned with your preferences in ${answers.primaryCause.replace(
                            /-/g,
                            " "
                          )}.`}
                    </p>
                  </div>

                  {((viewSavedOnly ? savedCharitiesList : results) || []).length === 0 ? (
                    <div className="p-8 text-center border border-dashed border-neutral-800 rounded-sm animate-matcher-choice">
                      <p className="font-mono text-xs text-neutral-400">No organizations found matching this query.</p>
                      <button
                        onClick={restartQuiz}
                        className="mt-4 inline-flex items-center gap-1.5 rounded-sm bg-neutral-100 px-4 py-2 font-mono text-xs font-semibold text-neutral-950 hover:bg-white transition"
                      >
                        Take Quiz Again
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4 mb-8">
                      {(viewSavedOnly ? savedCharitiesList : results || []).map((charity, idx) => {
                        const bookmarked = isCharityBookmarked(charity.id);
                        const IconComp = IconMap[charity.iconName] || Shield;
    
                        return (
                          <div
                            key={charity.id}
                            style={{ animationDelay: `${idx * 120 + 380}ms` }}
                            className="animate-matcher-choice rounded-sm border border-neutral-800 bg-[#080c12] p-5 sm:p-6 transition hover:border-neutral-700"
                          >
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-neutral-900 border border-neutral-800 text-teal-400">
                                  <IconComp className="h-4 w-4" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-serif text-lg font-normal text-neutral-100 leading-tight">
                                      {charity.name}
                                    </h3>
                                    <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-1.5 py-0.5 rounded-sm">
                                      {charity.rating}
                                    </span>
                                  </div>
                                  <div className="font-mono text-[11px] text-neutral-500 mt-0.5">
                                    {charity.category.replace(/-/g, " ")}
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={() => toggleCharityBookmark(charity.id)}
                                title={bookmarked ? "Remove bookmark" : "Save cause"}
                                className={`p-1.5 rounded-sm border transition ${
                                  bookmarked
                                    ? "bg-amber-400/10 border-amber-400/40 text-amber-300"
                                    : "border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-700"
                                }`}
                              >
                                <Bookmark className={`h-3.5 w-3.5 ${bookmarked ? "fill-amber-400 text-amber-400" : "text-neutral-400"}`} />
                              </button>
                            </div>

                            <p className="font-sans text-xs italic text-neutral-300 mb-2">
                              &ldquo;{charity.tagline}&rdquo;
                            </p>

                            <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4">
                              {charity.description}
                            </p>

                            {/* Verified Impact Ledger Box */}
                            <div className="rounded-sm border border-neutral-800/80 bg-neutral-900/40 p-3 mb-4 font-mono text-xs">
                              <span className="text-neutral-400 uppercase tracking-wider text-[10px] block mb-1">
                                VERIFIED IMPACT LEDGER
                              </span>
                              <span className="text-neutral-200 font-sans text-xs leading-relaxed block">
                                {charity.impactMetrics}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-800/80 pt-4">
                              <div className="flex flex-wrap gap-1.5">
                                {charity.tags.map((t) => (
                                  <span
                                    key={t}
                                    className="font-mono text-[10px] rounded-sm border border-neutral-800 bg-neutral-900/60 px-2 py-0.5 text-neutral-400"
                                  >
                                    #{t}
                                  </span>
                                ))}
                              </div>

                              <div className="flex items-center gap-2 font-mono text-xs">
                                {charity.volunteerUrl && (
                                  <a
                                    href={charity.volunteerUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 rounded-sm border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-neutral-300 hover:bg-neutral-800 hover:text-white transition"
                                  >
                                    Volunteer
                                    <ArrowUpRight className="h-3 w-3" />
                                  </a>
                                )}
                                <a
                                  href={charity.donateUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 rounded-sm bg-neutral-100 px-3 py-1.5 font-semibold text-neutral-950 hover:bg-white transition"
                                >
                                  Direct Support
                                  <ArrowUpRight className="h-3 w-3 text-neutral-950" />
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="border-t border-neutral-800 pt-6 flex items-center justify-between font-mono text-xs">
                    <Link
                      href="/causes"
                      className="inline-flex items-center gap-1.5 text-teal-400 hover:text-teal-300 transition"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" /> Browse All Causes Directory
                    </Link>
                    <button
                      onClick={restartQuiz}
                      className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white transition"
                    >
                      <RefreshCcw className="h-3.5 w-3.5" /> Retake Quiz
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
