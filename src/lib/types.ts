export type CauseCategory =
  | "education-diversity"
  | "digital-rights-privacy"
  | "climate-sustainability"
  | "open-source-public-goods"
  | "healthcare-accessibility";

export type GivingType =
  | "direct-donation"
  | "mentorship-volunteering"
  | "equipment-donation"
  | "advocacy";

export interface Charity {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  category: CauseCategory;
  givingTypes: GivingType[];
  websiteUrl: string;
  donateUrl: string;
  volunteerUrl?: string;
  iconName: string;
  impactMetrics: string;
  rating: string;
  tags: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  whyItMatters: string;
  url: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;
  category: "AI for Good" | "Climate Tech" | "Healthcare & Bio" | "Open Access & Web" | "Social Impact";
  imageUrl?: string;
  readTimeMinutes: number;
}

export interface QuizAnswers {
  primaryCause: CauseCategory | "any";
  givingPreference: GivingType | "any";
  impactScope: "global" | "local-community" | "open-web" | "any";
}
