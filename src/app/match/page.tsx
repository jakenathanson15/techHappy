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
  const [loadingIntro, setLoadingIntro] = useState<boolean>(true);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [loadStatus, setLoadStatus] = useState<string>("CALIBRATING 501(c)(3) INDEX");
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
    setLoadingIntro(true);
    setLoadProgress(15);
    setLoadStatus("CALIBRATING 501(c)(3) REPOSITORY INDEX");

    // Run the automatic loading animation sequence on every navigation
    const timers: NodeJS.Timeout[] = [];

    timers.push(
      setTimeout(() => {
        setLoadProgress(48);
        setLoadStatus("INDEXING VETTED CHARITY NAVIGATOR DATA");
      }, 500)
    );

    timers.push(
      setTimeout(() => {
        setLoadProgress(82);
        setLoadStatus("SYNTHESIZING MULTI-CRITERIA DECISION MATRIX");
      }, 1100)
    );

    timers.push(
      setTimeout(() => {
        setLoadProgress(100);
        setLoadStatus("ALIGNING PHILANTHROPIC PROTOCOLS");
      }, 1650)
    );

    timers.push(
      setTimeout(() => {
        finishIntro();
      }, 2250)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  const finishIntro = () => {
    setLoadingIntro(false);
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
                  setLoadingIntro(false);
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

        {/* Loading Screen Animation on Every Navigation to Matcher */}
        {mounted && loadingIntro && !viewSavedOnly ? (
          <div
            onClick={finishIntro}
            className="wire-card rounded-sm p-8 sm:p-14 text-center max-w-xl mx-auto cursor-pointer animate-matcher-header relative overflow-hidden shadow-2xl bg-[#0c1017] border border-neutral-800"
          >
            {/* Luminous aura background glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none animate-matcher-aura" />

            {/* Top skip affordance */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                finishIntro();
              }}
              className="absolute top-4 right-4 font-mono text-[11px] text-neutral-400 hover:text-teal-300 transition-colors border border-neutral-800/80 bg-neutral-900/60 px-2.5 py-1 rounded-sm flex items-center gap-1.5"
            >
              <span>SKIP</span>
              <ArrowRight className="h-3 w-3" />
            </button>

            {/* Animated TH Eyes Smile SVG */}
            <div className="relative mb-6 flex items-center justify-center">
              <div className="absolute h-28 w-28 rounded-2xl border border-teal-500/20 bg-teal-950/20 animate-matcher-aura pointer-events-none" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-neutral-900 border border-neutral-700/80 shadow-[0_0_24px_rgba(20,184,166,0.15)]">
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

                  {/* Smile Arc in Radiant Teal */}
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

            <div className="inline-flex items-center gap-2 mb-3 px-2.5 py-1 rounded-sm bg-teal-950/40 border border-teal-500/30 font-mono text-[11px] text-teal-300 uppercase tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-ping" />
              <span>IMPACT TERMINAL // CALIBRATING</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-4xl font-normal text-neutral-100 mb-3 tracking-tight">
              Let&apos;s find you the right cause.
            </h2>

            <p className="font-sans text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed mb-7">
              Synthesizing high-impact climate, privacy, and public goods initiatives tailored to your skills and giving preferences.
            </p>

            {/* Progress Bar & Telemetry Section */}
            <div className="max-w-md mx-auto mb-6">
              <div className="flex items-center justify-between text-xs font-mono mb-2 text-neutral-400 px-1">
                <span className="flex items-center gap-1.5 text-neutral-300 truncate">
                  <span className="text-teal-400">&gt;</span>
                  <span className="truncate">{loadStatus}</span>
                </span>
                <span className="text-teal-400 font-semibold ml-2">{loadProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#080c12] border border-neutral-800 rounded-sm overflow-hidden p-[1px]">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 via-teal-400 to-emerald-300 rounded-sm transition-all duration-500 ease-out shadow-[0_0_12px_rgba(20,184,166,0.5)]"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
            </div>

            {/* 3 Telemetry Pillars */}
            <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-neutral-800/80 max-w-md mx-auto text-left font-mono text-[10px]">
              <div>
                <span className="text-teal-400 font-semibold block">01 // VETTED</span>
                <span className="text-neutral-500 block">4-Star Navigator</span>
              </div>
              <div>
                <span className="text-teal-400 font-semibold block">02 // DIRECT</span>
                <span className="text-neutral-500 block">Zero Overhead</span>
              </div>
              <div>
                <span className="text-teal-400 font-semibold block">03 // PRIVATE</span>
                <span className="text-neutral-500 block">Zero Trackers</span>
              </div>
            </div>
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

            {/* Main Questionnaire Frame */}
            <div className="rounded-sm border border-neutral-800 bg-[#0c1017] p-6 sm:p-8 relative overflow-hidden">
              {/* Subtle top progress bar */}
              {step < 4 && !viewSavedOnly && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-neutral-800">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-teal-300 transition-all duration-700 ease-out"
                    style={{ width: `${(step / 3) * 100}%` }}
                  />
                </div>
              )}

              {step < 4 && !viewSavedOnly ? (
                <div key={`step-container-${step}`}>
                  {/* Step 1: Cause */}
                  {step === 1 && (
                    <div>
                      <div className="animate-matcher-header">
                        <div className="flex items-center gap-2 mb-2 font-mono text-[10px] uppercase tracking-wider text-teal-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
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
                              style={{ animationDelay: `${idx * 60 + 70}ms` }}
                              className={`animate-matcher-choice w-full flex items-start gap-3.5 p-4 rounded-sm border text-left transition-all duration-300 ease-out active:scale-[0.995] ${
                                isSelected
                                  ? "border-teal-500/80 bg-teal-950/25 shadow-[0_0_20px_rgba(20,184,166,0.06)] ring-1 ring-teal-500/30"
                                  : "border-neutral-800/90 bg-[#080c12]/90 hover:border-neutral-700 hover:bg-[#0f141e] hover:-translate-y-0.5"
                              }`}
                            >
                              <div
                                className={`p-2 rounded-sm border mt-0.5 flex-shrink-0 transition-all duration-300 ${
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
                                  className={`h-4 w-4 rounded-sm border flex items-center justify-center transition-all duration-300 ${
                                    isSelected
                                      ? "border-teal-400 bg-teal-400 text-neutral-950 shadow-[0_0_8px_rgba(20,184,166,0.4)]"
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
                          <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
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
                              style={{ animationDelay: `${idx * 60 + 70}ms` }}
                              className={`animate-matcher-choice w-full flex items-start gap-3.5 p-4 rounded-sm border text-left transition-all duration-300 ease-out active:scale-[0.995] ${
                                isSelected
                                  ? "border-teal-500/80 bg-teal-950/25 shadow-[0_0_20px_rgba(20,184,166,0.06)] ring-1 ring-teal-500/30"
                                  : "border-neutral-800/90 bg-[#080c12]/90 hover:border-neutral-700 hover:bg-[#0f141e] hover:-translate-y-0.5"
                              }`}
                            >
                              <div
                                className={`p-2 rounded-sm border mt-0.5 flex-shrink-0 transition-all duration-300 ${
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
                                  className={`h-4 w-4 rounded-sm border flex items-center justify-center transition-all duration-300 ${
                                    isSelected
                                      ? "border-teal-400 bg-teal-400 text-neutral-950 shadow-[0_0_8px_rgba(20,184,166,0.4)]"
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
                          <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
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
                              style={{ animationDelay: `${idx * 60 + 70}ms` }}
                              className={`animate-matcher-choice w-full flex items-start gap-3.5 p-4 rounded-sm border text-left transition-all duration-300 ease-out active:scale-[0.995] ${
                                isSelected
                                  ? "border-teal-500/80 bg-teal-950/25 shadow-[0_0_20px_rgba(20,184,166,0.06)] ring-1 ring-teal-500/30"
                                  : "border-neutral-800/90 bg-[#080c12]/90 hover:border-neutral-700 hover:bg-[#0f141e] hover:-translate-y-0.5"
                              }`}
                            >
                              <div
                                className={`p-2 rounded-sm border mt-0.5 flex-shrink-0 transition-all duration-300 ${
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
                                  className={`h-4 w-4 rounded-sm border flex items-center justify-center transition-all duration-300 ${
                                    isSelected
                                      ? "border-teal-400 bg-teal-400 text-neutral-950 shadow-[0_0_8px_rgba(20,184,166,0.4)]"
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
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm border border-neutral-800 bg-[#080c12] text-neutral-300 hover:border-neutral-700 hover:text-white transition-all duration-200"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" /> Back
                      </button>
                    ) : (
                      <div />
                    )}

                    {step < 3 ? (
                      <button
                        onClick={() => setStep(step + 1)}
                        className="inline-flex items-center gap-2 rounded-sm bg-neutral-100 px-5 py-2 font-semibold text-neutral-950 hover:bg-white transition-all duration-200 active:scale-[0.98]"
                      >
                        <span>Continue</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 rounded-sm bg-teal-400 px-5 py-2 font-semibold text-neutral-950 hover:bg-teal-300 transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
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
                            style={{ animationDelay: `${idx * 70 + 80}ms` }}
                            className="animate-matcher-choice rounded-sm border border-neutral-800 bg-[#080c12] overflow-hidden transition-all duration-300 hover:border-neutral-700 hover:bg-[#0c111a] flex flex-col md:flex-row"
                          >
                            {/* Visual Imagery Panel */}
                            {charity.imageUrl && (
                              <div className="md:w-52 lg:w-56 relative aspect-[16/9] md:aspect-auto flex-shrink-0 bg-neutral-950 border-b md:border-b-0 md:border-r border-neutral-800/80 overflow-hidden group">
                                <img
                                  src={charity.imageUrl}
                                  alt={charity.name}
                                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
                                <div className="absolute top-3 left-3 flex items-center gap-2">
                                  <span className="font-mono text-[10px] text-emerald-400 bg-neutral-950/80 border border-emerald-800/60 px-2 py-0.5 rounded-sm backdrop-blur-sm">
                                    {charity.rating}
                                  </span>
                                </div>
                              </div>
                            )}

                            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                              <div>
                                <div className="flex items-start justify-between gap-4 mb-3">
                                  <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-neutral-900 border border-neutral-800 text-teal-400 flex-shrink-0">
                                      <IconComp className="h-4 w-4" />
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <h3 className="font-serif text-lg font-normal text-neutral-100 leading-tight">
                                          {charity.name}
                                        </h3>
                                      </div>
                                      <div className="font-mono text-[11px] text-neutral-500 mt-0.5">
                                        {charity.category.replace(/-/g, " ")} • {charity.shortName}
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
                              </div>

                              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-800/80 pt-4 mt-2">
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
