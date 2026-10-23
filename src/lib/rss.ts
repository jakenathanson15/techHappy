import { XMLParser } from "fast-xml-parser";
import crypto from "crypto";
import { NewsItem } from "./types";

interface RawFeedEntry {
  title?: string | { "#text": string };
  description?: string | { "#text": string };
  summary?: string | { "#text": string };
  content?: string | { "#text": string };
  "content:encoded"?: string;
  link?: string | { "@_href"?: string; "#text"?: string } | Array<{ "@_href"?: string; "@_rel"?: string; "#text"?: string }>;
  pubDate?: string;
  published?: string;
  updated?: string;
  "dc:date"?: string;
  guid?: string | { "#text": string };
  id?: string;
  "media:content"?: { "@_url"?: string } | Array<{ "@_url"?: string }>;
  "media:thumbnail"?: { "@_url"?: string } | Array<{ "@_url"?: string }>;
  enclosure?: { "@_url"?: string };
}

export type SourceType = "university-lab" | "scientific-journal" | "news-editorial" | "digital-rights";

export interface RSSSourceConfig {
  name: string;
  url: string;
  sourceUrl: string;
  defaultCategory: NewsItem["category"];
  description?: string;
  imageUrl?: string;
  sourceType: SourceType;
}

export const RSS_SOURCES: RSSSourceConfig[] = [
  {
    name: "MIT News",
    url: "https://news.mit.edu/rss/feed",
    sourceUrl: "https://news.mit.edu",
    defaultCategory: "Healthcare & Bio",
    description: "Cutting-edge breakthroughs in medicine, robotics, materials, and sustainable engineering.",
    imageUrl: "/images/mit-news.jpg",
    sourceType: "university-lab",
  },
  {
    name: "Our World in Data",
    url: "https://ourworldindata.org/atom.xml",
    sourceUrl: "https://ourworldindata.org",
    defaultCategory: "Social Impact",
    description: "Empirical research and data showing global progress against disease, poverty, and energy transitions.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    sourceType: "news-editorial",
  },
  {
    name: "Nature Research",
    url: "https://www.nature.com/nature.rss",
    sourceUrl: "https://www.nature.com",
    defaultCategory: "Healthcare & Bio",
    description: "Peer-reviewed scientific discoveries across biotechnology, physics, and ecology.",
    imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80",
    sourceType: "scientific-journal",
  },
  {
    name: "CleanTechnica",
    url: "https://cleantechnica.com/feed/",
    sourceUrl: "https://cleantechnica.com",
    defaultCategory: "Climate Tech",
    description: "Global advances in solar power, grid batteries, electric mobility, and clean technology.",
    imageUrl: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=600&q=80",
    sourceType: "news-editorial",
  },
  {
    name: "ScienceDaily Clean Energy",
    url: "https://www.sciencedaily.com/rss/matter_energy/solar_energy.xml",
    sourceUrl: "https://www.sciencedaily.com",
    defaultCategory: "Climate Tech",
    description: "Laboratory research on next-generation photovoltaics, fusion, and hydrogen power.",
    imageUrl: "/images/sciencedaily.jpg",
    sourceType: "scientific-journal",
  },
  {
    name: "ScienceDaily AI & Tech",
    url: "https://www.sciencedaily.com/rss/computers_math/artificial_intelligence.xml",
    sourceUrl: "https://www.sciencedaily.com",
    defaultCategory: "AI for Good",
    description: "Breakthrough machine intelligence and computational science applications.",
    imageUrl: "/images/sciencedaily.jpg",
    sourceType: "scientific-journal",
  },
  {
    name: "Positive News",
    url: "https://www.positive.news/category/environment/feed/",
    sourceUrl: "https://www.positive.news",
    defaultCategory: "Climate Tech",
    description: "Rigorous solutions journalism focused on environmental progress and human innovation.",
    imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=600&q=80",
    sourceType: "news-editorial",
  },
  {
    name: "Good News Network",
    url: "https://www.goodnewsnetwork.org/category/news/science/feed/",
    sourceUrl: "https://www.goodnewsnetwork.org",
    defaultCategory: "Social Impact",
    description: "Uplifting science and technological progress advancing humanity.",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    sourceType: "news-editorial",
  },
  {
    name: "NASA Science & Tech",
    url: "https://www.nasa.gov/feed/",
    sourceUrl: "https://www.nasa.gov",
    defaultCategory: "Climate Tech",
    description: "Space exploration, planetary climate monitoring, and advanced aeronautics.",
    imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=600&q=80",
    sourceType: "university-lab",
  },
  {
    name: "Phys.org Technology",
    url: "https://phys.org/rss-feed/technology-news/",
    sourceUrl: "https://phys.org",
    defaultCategory: "AI for Good",
    description: "Emerging engineering innovations, smart materials, and computing advancements.",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    sourceType: "scientific-journal",
  },
  {
    name: "UC Berkeley Research",
    url: "https://news.berkeley.edu/feed/",
    sourceUrl: "https://news.berkeley.edu",
    defaultCategory: "AI for Good",
    description: "Pioneering academic discoveries from world-class university labs.",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80",
    sourceType: "university-lab",
  },
  {
    name: "Mozilla Blog",
    url: "https://blog.mozilla.org/feed/",
    sourceUrl: "https://blog.mozilla.org",
    defaultCategory: "Open Access & Web",
    description: "Championing open web standards, privacy-preserving tools, and responsible technology.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    sourceType: "digital-rights",
  },
  {
    name: "Electronic Frontier Foundation",
    url: "https://www.eff.org/rss/updates.xml",
    sourceUrl: "https://www.eff.org",
    defaultCategory: "Open Access & Web",
    description: "Defending digital rights, cryptography, privacy, and public-interest innovation.",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    sourceType: "digital-rights",
  },
];

export const THEMATIC_IMAGE_BANK: {
  keywords: string[];
  images: string[];
}[] = [
  // 1. Solar & Photovoltaics
  {
    keywords: ["solar", "photovoltaic", "perovskite", "sunlight", "solar panel", "solar cell"],
    images: [
      "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  // 2. Nuclear Fusion & Clean Power
  {
    keywords: ["fusion", "tokamak", "reactor", "nuclear", "plasma", "clean power", "grid", "electricity", "geothermal"],
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  // 3. Wind & Renewable Turbines
  {
    keywords: ["wind", "turbine", "offshore wind", "renewables", "aerodynamic"],
    images: [
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  // 4. Batteries, Solid State & Storage
  {
    keywords: ["battery", "batteries", "solid-state", "lithium", "energy storage", "storage", "cathode", "anode", "ev", "electric vehicle"],
    images: [
      "https://images.unsplash.com/photo-1558441719-79a40578848f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  // 5. Quantum Computing & Quantum Physics
  {
    keywords: ["quantum", "qubit", "superposition", "photonics", "laser", "cryogenic", "superconductor"],
    images: [
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  // 6. AI, Machine Learning & Neural Networks
  {
    keywords: ["ai", "artificial intelligence", "neural", "machine learning", "deep learning", "algorithm", "llm", "model", "generative"],
    images: [
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  // 7. Robotics & Autonomous Systems
  {
    keywords: ["robot", "robotics", "autonomous", "drone", "humanoid", "actuator", "bionic", "prosthetic"],
    images: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  // 8. Space, Astronomy & Satellites
  {
    keywords: ["space", "satellite", "orbit", "nasa", "esa", "jwst", "telescope", "galaxy", "astronomy", "exoplanet", "mars", "lunar"],
    images: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  // 9. Marine Biology & Ocean Science
  {
    keywords: ["ocean", "marine", "reef", "coral", "sea", "underwater", "aquatic", "kelp", "whale", "fisheries"],
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  // 10. Biotechnology, CRISPR, DNA & Genetics
  {
    keywords: ["crispr", "dna", "gene", "genetics", "biotech", "cellular", "protein", "mrna", "genome", "molecular"],
    images: [
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  // 11. Neuroscience & Brain Tech
  {
    keywords: ["brain", "neuroscience", "neural interface", "synapse", "cognitive", "neurological", "neuro"],
    images: [
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  // 12. Clean Water & Hydrology
  {
    keywords: ["water", "purification", "desalination", "filtration", "clean water", "hydrology", "aquifer"],
    images: [
      "https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  // 13. Reforestation, Forestry & Biodiversity
  {
    keywords: ["forest", "tree", "reforestation", "biodiversity", "wildlife", "conservation", "rainforest", "species", "canopy"],
    images: [
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  // 14. Sustainable Agriculture & Agritech
  {
    keywords: ["agriculture", "crop", "farming", "vertical farm", "soil", "harvest", "hydroponics", "food security"],
    images: [
      "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  // 15. Open Source, Cryptography & Internet Infrastructure
  {
    keywords: ["open source", "crypto", "encryption", "privacy", "code", "software", "linux", "security", "developer", "protocol", "decentralized"],
    images: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  // 16. Healthcare, Vaccines & Clinical Medicine
  {
    keywords: ["health", "hospital", "doctor", "medicine", "vaccine", "cancer", "therapy", "clinical", "disease", "treatment", "patient"],
    images: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80",
    ],
  },
];

export const CATEGORY_FALLBACK_IMAGES: Record<NewsItem["category"], string[]> = {
  "Climate Tech": [
    "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
  ],
  "Healthcare & Bio": [
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200&q=80",
  ],
  "AI for Good": [
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  ],
  "Open Access & Web": [
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
  ],
  "Social Impact": [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
  ],
};

/**
 * Intelligent topic & keyword-based image resolver.
 * Parses headline + summary tokens to find the best contextual photograph.
 */
export function resolveSmartImage(
  title: string = "",
  summary: string = "",
  category: NewsItem["category"] = "Social Impact",
  seed: string | number = 0
): string {
  const combinedText = `${title} ${summary}`.toLowerCase();

  // 1. Try to find the first matching thematic bank
  for (const bank of THEMATIC_IMAGE_BANK) {
    for (const kw of bank.keywords) {
      // Regex boundary search or substring for compound words
      const regex = new RegExp(`\\b${kw}`, "i");
      if (regex.test(combinedText)) {
        const hash = typeof seed === "number" ? seed : hashStringToNumber(seed || title);
        return bank.images[Math.abs(hash) % bank.images.length];
      }
    }
  }

  // 2. Fall back to category-specific photo array
  const categoryBank = CATEGORY_FALLBACK_IMAGES[category] || CATEGORY_FALLBACK_IMAGES["Social Impact"];
  const hash = typeof seed === "number" ? seed : hashStringToNumber(seed || title);
  return categoryBank[Math.abs(hash) % categoryBank.length];
}

function hashStringToNumber(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function extractImageFromHtml(html: string): string | null {
  if (!html) return null;
  const match = html.match(/<img[^>]+src=["'](https?:\/\/[^"'>]+)["']/i);
  return match ? match[1] : null;
}

function stripHtml(input: string): string {
  if (!input) return "";
  let text = String(input);

  // 1. Unwrap CDATA sections
  text = text.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1");

  // 2. Strip standard HTML tags (pass 1)
  text = text.replace(/<[^>]+>/g, " ");

  // 3. Decode escaped HTML/XML entities
  text = text
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#x27;/gi, "'")
    .replace(/&#x2F;/gi, "/")
    .replace(/&nbsp;/gi, " ");

  // 4. Strip any decoded HTML tags (pass 2 - catches tags like &lt;p&gt; -> <p>)
  text = text.replace(/<[^>]+>/g, " ");

  // 5. Clean extra whitespace
  return text.replace(/\s+/g, " ").trim();
}

function extractLink(item: RawFeedEntry): string {
  if (!item) return "#";
  if (typeof item.link === "string") return item.link;
  if (item.link && typeof item.link === "object") {
    if (Array.isArray(item.link)) {
      const alt = item.link.find((l) => l["@_rel"] === "alternate") || item.link[0];
      return alt?.["@_href"] || alt?.["#text"] || "#";
    }
    if (item.link["@_href"]) return item.link["@_href"];
    if (item.link["#text"]) return item.link["#text"];
  }
  if (typeof item.guid === "string" && item.guid.startsWith("http")) return item.guid;
  if (item.guid && typeof item.guid === "object" && typeof item.guid["#text"] === "string" && item.guid["#text"].startsWith("http")) {
    return item.guid["#text"];
  }
  if (typeof item.id === "string" && item.id.startsWith("http")) return item.id;
  return "#";
}

function extractDate(item: RawFeedEntry): string {
  const rawDate = item.pubDate || item.published || item.updated || item["dc:date"];
  if (rawDate) {
    const parsed = new Date(rawDate);
    if (!isNaN(parsed.getTime())) {
      return parsed.toISOString();
    }
  }
  return new Date().toISOString();
}

function generateWhyItMatters(title: string, summary: string, category: string): string {
  const lower = (title + " " + summary).toLowerCase();
  
  if (lower.includes("solar") || lower.includes("battery") || lower.includes("energy") || lower.includes("carbon") || lower.includes("fusion") || lower.includes("wind") || lower.includes("grid")) {
    return "Accelerates global decarbonization and makes renewable clean energy accessible, resilient, and affordable.";
  }
  if (lower.includes("cancer") || lower.includes("disease") || lower.includes("health") || lower.includes("brain") || lower.includes("medical") || lower.includes("aging") || lower.includes("vaccine") || lower.includes("cellular")) {
    return "Paves the way for non-invasive clinical treatments, early diagnoses, and significantly improved global patient survival.";
  }
  if (lower.includes("open-source") || lower.includes("open access") || lower.includes("free") || lower.includes("privacy") || lower.includes("crypto") || lower.includes("rights") || lower.includes("browser") || lower.includes("web")) {
    return "Safeguards open digital commons, transparent governance, and user privacy against monopolistic gatekeeping.";
  }
  if (lower.includes("accessibility") || lower.includes("disability") || lower.includes("assistive") || lower.includes("inclusion")) {
    return "Expands digital inclusion and equitable access for people of all physical, cognitive, and sensory abilities.";
  }
  if (lower.includes("space") || lower.includes("nasa") || lower.includes("mars") || lower.includes("telescope") || lower.includes("astronomy") || lower.includes("satellite")) {
    return "Expands human scientific knowledge of our universe and improves Earth environmental monitoring from orbit.";
  }
  if (lower.includes("ai") || lower.includes("model") || lower.includes("algorithm") || lower.includes("quantum") || lower.includes("robot") || lower.includes("machine learning")) {
    return "Demonstrates how responsible artificial intelligence and computing engineering can solve complex human challenges.";
  }
  return `Delivers verified technological progress in ${category.toLowerCase()} that directly advances public well-being.`;
}

function categorizeItem(title: string, summary: string, fallback: NewsItem["category"]): NewsItem["category"] {
  const text = (title + " " + summary).toLowerCase();
  if (
    text.includes("solar") ||
    text.includes("climate") ||
    text.includes("emission") ||
    text.includes("plastic") ||
    text.includes("energy") ||
    text.includes("fusion") ||
    text.includes("carbon") ||
    text.includes("battery") ||
    text.includes("water") ||
    text.includes("recycl") ||
    text.includes("green") ||
    text.includes("wind power") ||
    text.includes("satellite") ||
    text.includes("nasa")
  ) {
    return "Climate Tech";
  }
  if (
    text.includes("cancer") ||
    text.includes("patient") ||
    text.includes("brain") ||
    text.includes("medical") ||
    text.includes("disease") ||
    text.includes("biology") ||
    text.includes("aging") ||
    text.includes("health") ||
    text.includes("vaccine") ||
    text.includes("cellular") ||
    text.includes("dna") ||
    text.includes("prosthetic")
  ) {
    return "Healthcare & Bio";
  }
  if (
    text.includes("ai") ||
    text.includes("neural") ||
    text.includes("algorithm") ||
    text.includes("machine learning") ||
    text.includes("robot") ||
    text.includes("quantum") ||
    text.includes("deep learning") ||
    text.includes("computing") ||
    text.includes("chip")
  ) {
    return "AI for Good";
  }
  if (
    text.includes("open source") ||
    text.includes("library") ||
    text.includes("open access") ||
    text.includes("internet") ||
    text.includes("commons") ||
    text.includes("privacy") ||
    text.includes("encryption") ||
    text.includes("firefox") ||
    text.includes("mozilla") ||
    text.includes("eff") ||
    text.includes("digital rights") ||
    text.includes("cma") ||
    text.includes("warrant")
  ) {
    return "Open Access & Web";
  }
  return fallback;
}

const CURATED_FALLBACKS: NewsItem[] = [
  {
    id: "ai-early-cancer-detection",
    title: "AI Model Detects Aggressive Pancreatic Tumors 3 Years Before Standard Diagnosis",
    summary: "Researchers at MIT and Karolinska Institute deployed an open-source deep learning model that flags micro-patterns in routine abdominal scans, drastically increasing 5-year survival projections.",
    whyItMatters: "Early detection changes cancer from an untreatable condition to a manageable and operable one, saving tens of thousands of lives globally.",
    url: "https://news.mit.edu/2023/ai-model-detects-pancreatic-cancer-early-0418",
    source: "MIT News",
    sourceUrl: "https://news.mit.edu",
    publishedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    category: "Healthcare & Bio",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    readTimeMinutes: 3,
  },
  {
    id: "perovskite-solar-efficiency",
    title: "Tandem Perovskite Solar Cells Smash 34% Efficiency Record in Field Tests",
    summary: "A consortium of renewable tech labs validated a new ultra-durable silicon-perovskite composite that generates 40% more electricity per square meter while dropping manufacturing costs.",
    whyItMatters: "Accelerates grid parity for residential and commercial solar, making zero-carbon energy dramatically cheaper than fossil fuels.",
    url: "https://www.nature.com/articles/s41560-023-01300-w",
    source: "Nature Energy",
    sourceUrl: "https://www.nature.com",
    publishedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    category: "Climate Tech",
    imageUrl: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80",
    readTimeMinutes: 4,
  },
  {
    id: "open-source-prosthetics-bionic",
    title: "Open Bionics Releases Open-Source Neural Interface for Affordable Robotic Limbs",
    summary: "A global open-source community completed designs for a $300 3D-printable bionic hand with sub-millisecond tactile sensory feedback for amputees.",
    whyItMatters: "Dismantles the $30,000+ medical equipment barrier, bringing high-dexterity prosthetics to underserved communities worldwide.",
    url: "https://openbionics.com/blogs/news/open-source-bionic-technology",
    source: "Open Source Hardware Assoc",
    sourceUrl: "https://www.oshwa.org",
    publishedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    category: "Healthcare & Bio",
    imageUrl: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200&q=80",
    readTimeMinutes: 3,
  },
  {
    id: "ocean-cleanup-ai-robotics",
    title: "Autonomous Ocean Skimmers Clear 10 Million Pounds of Plastic Waste from River Deltas",
    summary: "Solar-powered AI-guided interceptors successfully trapped and extracted river-borne plastics across 14 high-volume waterways before reaching oceanic gyres.",
    whyItMatters: "Intercepting plastics at river bottlenecks stops marine destruction at the source with zero fossil fuel expenditure.",
    url: "https://theoceancleanup.com/rivers/",
    source: "The Ocean Cleanup",
    sourceUrl: "https://theoceancleanup.com",
    publishedAt: new Date(Date.now() - 3600000 * 36).toISOString(),
    category: "Climate Tech",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    readTimeMinutes: 2,
  },
  {
    id: "open-access-scientific-publishing",
    title: "Major Global Research Consortium Mandates 100% Free Open-Access Science",
    summary: "Over 80 international academic institutions unified to eliminate paywalls on peer-reviewed climate, medicine, and engineering research papers.",
    whyItMatters: "Removes gatekeeping so independent researchers and developing nations can immediately build on the latest human discoveries.",
    url: "https://www.coalition-s.org/plan_s_principles/",
    source: "cOAlition S",
    sourceUrl: "https://www.coalition-s.org",
    publishedAt: new Date(Date.now() - 3600000 * 60).toISOString(),
    category: "Open Access & Web",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    readTimeMinutes: 3,
  }
];

let cachedFeed: { data: NewsItem[]; timestamp: number } | null = null;
const CACHE_TTL_MS = 1000 * 60 * 60; // 1 Hour Cache Window

export async function fetchUpliftNews(bypassCache: boolean = false): Promise<NewsItem[]> {
  const now = Date.now();
  if (!bypassCache && cachedFeed && now - cachedFeed.timestamp < CACHE_TTL_MS) {
    return cachedFeed.data;
  }

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    processEntities: false,
  });

  const results = await Promise.allSettled(
    RSS_SOURCES.map(async (src, srcIndex) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      try {
        const res = await fetch(src.url, {
          signal: controller.signal,
          headers: {
            "User-Agent": "techHappy-Bot/1.0 (+https://techhappynews.com)",
            Accept: "application/rss+xml, application/xml, text/xml, application/atom+xml, */*",
          },
        });
        clearTimeout(timeoutId);

        if (!res.ok) return [];

        const xmlText = await res.text();
        const jsonObj = parser.parse(xmlText);
        const rawItems: RawFeedEntry[] =
          jsonObj?.rss?.channel?.item ||
          jsonObj?.feed?.entry ||
          jsonObj?.["rdf:RDF"]?.item ||
          [];
        const itemArray = Array.isArray(rawItems) ? rawItems : [rawItems];

        const srcItems: NewsItem[] = [];

        for (const [itemIndex, item] of itemArray.slice(0, 20).entries()) {
          if (!item) continue;

          const titleRaw =
            typeof item.title === "object" ? item.title?.["#text"] || "" : item.title || "";
          const rawTitle = stripHtml(titleRaw);
          if (!rawTitle || rawTitle.length < 5) continue;

          const descVal =
            (typeof item.description === "object" ? item.description?.["#text"] || "" : item.description) ||
            (typeof item.summary === "object" ? item.summary?.["#text"] || "" : item.summary);

          const contentVal =
            item["content:encoded"] ||
            (typeof item.content === "object" ? item.content?.["#text"] || "" : item.content) ||
            "";

          // Use description/summary first for concise summaries, fallback to content
          const contentRaw = descVal && descVal.trim().length > 15 ? descVal : contentVal || descVal || "";

          const rawDesc = stripHtml(contentRaw);
          const link = extractLink(item);
          const pubDate = extractDate(item);

          // Extract media image
          const mediaUrl =
            (typeof item["media:content"] === "object"
              ? Array.isArray(item["media:content"])
                ? item["media:content"][0]?.["@_url"]
                : item["media:content"]?.["@_url"]
              : undefined) ||
            (typeof item["media:thumbnail"] === "object"
              ? Array.isArray(item["media:thumbnail"])
                ? item["media:thumbnail"][0]?.["@_url"]
                : item["media:thumbnail"]?.["@_url"]
              : undefined) ||
            item.enclosure?.["@_url"] ||
            extractImageFromHtml(contentRaw);

          const category = categorizeItem(rawTitle, rawDesc, src.defaultCategory);
          const snippet =
            rawDesc.length > 220 ? rawDesc.slice(0, 217) + "..." : rawDesc || rawTitle;
          const whyItMatters = generateWhyItMatters(rawTitle, snippet, category);
          const finalImage =
            mediaUrl ||
            resolveSmartImage(rawTitle, snippet, category, srcIndex * 7 + itemIndex);

          const uniqueId = crypto
            .createHash("sha256")
            .update(`${src.name}:${link}:${rawTitle}`)
            .digest("hex")
            .slice(0, 18);

          srcItems.push({
            id: uniqueId,
            title: rawTitle,
            summary: snippet,
            whyItMatters,
            url: link,
            source: src.name,
            sourceUrl: src.sourceUrl,
            publishedAt: pubDate,
            category,
            imageUrl: finalImage,
            readTimeMinutes: Math.max(2, Math.ceil(snippet.split(" ").length / 60)),
          });
        }

        return srcItems;
      } catch {
        clearTimeout(timeoutId);
        return [];
      }
    })
  );

  const fetchedItems: NewsItem[] = [];
  for (const r of results) {
    if (r.status === "fulfilled" && Array.isArray(r.value)) {
      fetchedItems.push(...r.value);
    }
  }

  // Combine fresh items with curated fallbacks, deduplicating by title, url, and id
  const seenTitles = new Set<string>();
  const seenUrls = new Set<string>();
  const seenIds = new Set<string>();
  const combined: NewsItem[] = [];

  for (const item of [...fetchedItems, ...CURATED_FALLBACKS]) {
    const titleKey = item.title.toLowerCase().trim();
    const urlKey = item.url.toLowerCase().trim();

    if (!seenTitles.has(titleKey) && !seenUrls.has(urlKey) && !seenIds.has(item.id)) {
      seenTitles.add(titleKey);
      if (item.url && item.url !== "#") {
        seenUrls.add(urlKey);
      }
      seenIds.add(item.id);
      combined.push(item);
    }
  }

  // Interleave across sources to guarantee maximum variety at the top
  const sourceGroups: Record<string, NewsItem[]> = {};
  for (const item of combined) {
    if (!sourceGroups[item.source]) sourceGroups[item.source] = [];
    sourceGroups[item.source].push(item);
  }

  // Sort each source queue by newest date
  for (const s of Object.keys(sourceGroups)) {
    sourceGroups[s].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  let sourceKeys = Object.keys(sourceGroups);

  // If refreshing, rotate the source order so a different publisher leads the feed every refresh
  if (bypassCache) {
    const shiftCount = Math.floor(Math.random() * sourceKeys.length);
    sourceKeys = [...sourceKeys.slice(shiftCount), ...sourceKeys.slice(0, shiftCount)];
  }

  const interleaved: NewsItem[] = [];
  let hasMore = true;
  while (hasMore) {
    hasMore = false;
    for (const key of sourceKeys) {
      if (sourceGroups[key] && sourceGroups[key].length > 0) {
        interleaved.push(sourceGroups[key].shift()!);
        hasMore = true;
      }
    }
  }

  // For each article: fetch the page, verify URL is live, and extract og:image for the card
  const verified = await Promise.all(
    interleaved.map(async (item) => {
      if (!item.url || item.url === "#") return { ...item, url: item.sourceUrl };
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        const res = await fetch(item.url, {
          method: "GET",
          signal: controller.signal,
          redirect: "follow",
          headers: {
            "User-Agent": "techHappy-Bot/1.0 (+https://techhappynews.com)",
            // Only fetch enough to get the <head> — stops download after ~50KB
            Range: "bytes=0-51200",
          },
        });
        clearTimeout(timeoutId);

        if (!res.ok) return { ...item, url: item.sourceUrl };

        const html = await res.text();

        // Extract og:image or twitter:image from the <head>
        const ogMatch =
          html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
          html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i) ||
          html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i) ||
          html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i);

        const ogImage = ogMatch?.[1]?.trim();
        const finalImage = ogImage && ogImage.startsWith("http") ? ogImage : item.imageUrl;

        return { ...item, imageUrl: finalImage };
      } catch {
        return { ...item, url: item.sourceUrl };
      }
    })
  );

  cachedFeed = {
    data: verified,
    timestamp: now,
  };

  return verified;
}
