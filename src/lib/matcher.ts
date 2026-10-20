import charitiesData from "@/data/charities.json";
import { Charity, QuizAnswers } from "./types";

export function matchCharities(answers: QuizAnswers): { matches: Charity[]; scoreExplanation: string } {
  const charities = charitiesData as Charity[];

  const scored = charities.map((charity) => {
    let score = 0;

    // Cause match
    if (answers.primaryCause === "any" || charity.category === answers.primaryCause) {
      score += 40;
    }

    // Giving type match
    if (answers.givingPreference === "any" || charity.givingTypes.includes(answers.givingPreference)) {
      score += 30;
    }

    // Impact scope alignment
    if (answers.impactScope === "any") {
      score += 20;
    } else if (answers.impactScope === "global" && (charity.tags.includes("Global Impact") || charity.impactMetrics.includes("global") || charity.impactMetrics.includes("billion"))) {
      score += 20;
    } else if (answers.impactScope === "open-web" && (charity.category === "open-source-public-goods" || charity.category === "digital-rights-privacy")) {
      score += 20;
    } else if (answers.impactScope === "local-community" && charity.category === "education-diversity") {
      score += 20;
    } else {
      score += 10;
    }

    return { charity, score };
  });

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  const topMatches = scored.slice(0, 3).map((item) => item.charity);

  return {
    matches: topMatches,
    scoreExplanation: `Matched based on your interest in ${answers.primaryCause.replace(/-/g, " ")} and ${answers.givingPreference.replace(/-/g, " ")}.`,
  };
}
