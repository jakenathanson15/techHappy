"use client";

import { useState } from "react";
import { CauseCategory, GivingType, Charity } from "@/lib/types";
import { CheckCircle2, ArrowRight, ArrowLeft, ExternalLink, Sparkles, RefreshCcw, Heart, Bookmark } from "lucide-react";
import Link from "next/link";
import { useBookmarks } from "@/lib/useBookmarks";
import charitiesData from "@/data/charities.json";

interface QuizState {
  primaryCause: CauseCategory | "any";
  givingPreference: GivingType | "any";
  impactScope: "global" | "local-community" | "open-web" | "any";
}

const CAUSE_OPTIONS: { id: CauseCategory; label: string; desc: string; emoji: string }[] = [
  {
    id: "education-diversity",
    label: "Education & Diversity in Tech",
    desc: "Closing gender and racial gaps in CS; empowering youth with coding skills.",
    emoji: "👩‍💻",
  },
  {
    id: "climate-sustainability",
    label: "Climate Tech & Clean Earth",
    desc: "Satellite emission tracking, clean energy tech, and ecological preservation.",
    emoji: "🌍",
  },
  {
    id: "digital-rights-privacy",
    label: "Digital Human Rights & Privacy",
    desc: "Fighting mass surveillance, protecting free speech, and open internet laws.",
    emoji: "🛡️",
  },
  {
    id: "open-source-public-goods",
    label: "Open Source & Public Goods",
    desc: "Digital libraries, disaster mapping, and non-profit tech infrastructure.",
    emoji: "🌐",
  },
  {
    id: "healthcare-accessibility",
    label: "Assistive Tech & Accessibility",
    desc: "Building accessible web standards and low-cost prosthetics for all abilities.",
    emoji: "♿",
  },
];

const GIVING_OPTIONS: { id: GivingType; label: string; desc: string; emoji: string }[] = [
  {
    id: "direct-donation",
    label: "Direct Financial Support",
    desc: "Provide tax-deductible donations to fund core mission and engineering work.",
    emoji: "💳",
  },
  {
    id: "mentorship-volunteering",
    label: "Volunteer Coding & Mentorship",
    desc: "Donate developer hours, conduct mock interviews, or contribute code.",
    emoji: "🤝",
  },
  {
    id: "equipment-donation",
    label: "Hardware / Device Donation",
    desc: "Donate laptops, servers, or refurbished devices to underserved schools.",
    emoji: "💻",
  },
  {
    id: "advocacy",
    label: "Advocacy & Awareness",
    desc: "Support open policy letters, spread word, and participate in grassroots action.",
    emoji: "📣",
  },
];

const SCOPE_OPTIONS: { id: "global" | "local-community" | "open-web" | "any"; label: string; desc: string; emoji: string }[] = [
  {
    id: "global",
    label: "Worldwide & Developing Nations",
    desc: "Initiatives impacting underserved populations globally.",
    emoji: "🌏",
  },
  {
    id: "open-web",
    label: "The Open Web & Internet Commons",
    desc: "Preserving shared digital infrastructure and developer tools.",
    emoji: "🌐",
  },
  {
    id: "local-community",
    label: "Grassroots & Local Students",
    desc: "After-school programs, bootcamps, and local community centers.",
    emoji: "🏘️",
  },
  {
    id: "any",
    label: "Maximum Impact (Any Scope)",
    desc: "Show me whatever vetted non-profit needs help the most.",
    emoji: "✨",
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
        setStep(4); // Results step
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
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      {/* Top Bar with Bookmarks shortcut */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Tech Impact Matcher
        </span>
        {bookmarkedCharityIds.length > 0 && (
          <button
            onClick={() => {
              setViewSavedOnly(!viewSavedOnly);
              if (!viewSavedOnly) setStep(4);
            }}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border transition ${
              viewSavedOnly
                ? "bg-amber-500 border-amber-500 text-white"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Bookmark className={`h-3.5 w-3.5 ${viewSavedOnly ? "fill-white" : ""}`} />
            Saved Causes ({bookmarkedCharityIds.length})
          </button>
        )}
      </div>

      {/* Questionnaire Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
        {step < 4 && !viewSavedOnly ? (
          <div>
            {/* Step Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                <span>Step {step} of 3</span>
                <span>{step === 1 ? "Cause Passion" : step === 2 ? "Contribution Type" : "Impact Target"}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>

            {/* Step 1: Cause */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  What tech cause are you most passionate about?
                </h2>
                <p className="text-sm text-slate-500 mb-6">
                  Select the domain where you want to see tech resources directed.
                </p>

                <div className="space-y-3">
                  {CAUSE_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setAnswers({ ...answers, primaryCause: opt.id })}
                      className={`w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition ${
                        answers.primaryCause === opt.id
                          ? "border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <span className="text-2xl mt-0.5">{opt.emoji}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900 text-sm sm:text-base">{opt.label}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{opt.desc}</div>
                      </div>
                      {answers.primaryCause === opt.id && (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Giving Style */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  How would you prefer to support them?
                </h2>
                <p className="text-sm text-slate-500 mb-6">
                  Choose the giving channel that best fits your time and resources.
                </p>

                <div className="space-y-3">
                  {GIVING_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setAnswers({ ...answers, givingPreference: opt.id })}
                      className={`w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition ${
                        answers.givingPreference === opt.id
                          ? "border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <span className="text-2xl mt-0.5">{opt.emoji}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900 text-sm sm:text-base">{opt.label}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{opt.desc}</div>
                      </div>
                      {answers.givingPreference === opt.id && (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Scope */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  What scope of impact speaks to you?
                </h2>
                <p className="text-sm text-slate-500 mb-6">
                  Determine where you would like the primary benefit to land.
                </p>

                <div className="space-y-3">
                  {SCOPE_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setAnswers({ ...answers, impactScope: opt.id })}
                      className={`w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition ${
                        answers.impactScope === opt.id
                          ? "border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <span className="text-2xl mt-0.5">{opt.emoji}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900 text-sm sm:text-base">{opt.label}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{opt.desc}</div>
                      </div>
                      {answers.impactScope === opt.id && (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-8">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition disabled:opacity-50"
                >
                  {isSubmitting ? "Matching Causes..." : "Find My Matches"}
                  <Sparkles className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Results View / Saved View */
          <div>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 mb-3">
                <Heart className="h-6 w-6 fill-emerald-600" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                {viewSavedOnly ? "Your Bookmarked Causes" : "Your Recommended Causes"}
              </h2>
              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                {viewSavedOnly
                  ? "Causes and non-profits you've saved to your local browser storage."
                  : `High-impact vetted non-profits aligned with your passion for ${answers.primaryCause.replace(
                      /-/g,
                      " "
                    )}.`}
              </p>
            </div>

            <div className="space-y-6 mb-8">
              {(viewSavedOnly ? savedCharitiesList : results || [])?.map((charity) => {
                const bookmarked = isCharityBookmarked(charity.id);
                return (
                  <div
                    key={charity.id}
                    className="relative rounded-2xl border border-slate-200 bg-slate-50/50 p-6 flex flex-col justify-between transition hover:border-emerald-300"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{charity.logoEmoji}</span>
                          <div>
                            <h3 className="font-bold text-slate-900 text-lg leading-tight">
                              {charity.name}
                            </h3>
                            <span className="text-xs font-medium text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                              {charity.rating}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleCharityBookmark(charity.id)}
                          title={bookmarked ? "Remove bookmark" : "Save cause"}
                          className={`p-1.5 rounded-lg border transition ${
                            bookmarked
                              ? "bg-amber-50 border-amber-300 text-amber-600"
                              : "border-slate-200 bg-white text-slate-400 hover:text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-amber-500" : ""}`} />
                        </button>
                      </div>

                      <p className="text-xs font-semibold text-slate-700 italic mb-2 mt-2">
                        &ldquo;{charity.tagline}&rdquo;
                      </p>

                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {charity.description}
                      </p>

                      <div className="rounded-xl bg-white border border-slate-200/80 p-3 mb-4 text-xs">
                        <span className="font-bold text-slate-800">Verified Impact: </span>
                        <span className="text-slate-600">{charity.impactMetrics}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/60 pt-4">
                      <div className="flex flex-wrap gap-1.5">
                        {charity.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[11px] font-medium text-slate-600"
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
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                          >
                            Volunteer / Mentor
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                        <a
                          href={charity.donateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition"
                        >
                          Donate Directly
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center pt-4 border-t border-slate-100 flex items-center justify-center gap-4">
              <button
                onClick={restartQuiz}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                <RefreshCcw className="h-3.5 w-3.5" /> Retake Questionnaire
              </button>
              <span className="text-slate-300">|</span>
              <Link
                href="/feed"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-800"
              >
                Read Positive News Feed <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
