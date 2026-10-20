import {
  Shield,
  Code2,
  Globe2,
  Library,
  Cpu,
  Compass,
  Terminal,
  GraduationCap,
  Eye,
  Sparkles,
  HeartHandshake,
  Zap,
  Bookmark,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  RefreshCw,
  Clock,
  Layers,
  Leaf,
  Activity,
  Heart,
  Share2,
  MessageCircle,
  Search,
  Filter,
  DollarSign,
  Laptop,
  Megaphone,
  ArrowUpRight,
  TrendingUp,
  LucideIcon
} from "lucide-react";

export const IconMap: Record<string, LucideIcon> = {
  Shield,
  Code: Code2,
  Code2,
  Globe: Globe2,
  Globe2,
  Library,
  Cpu,
  Compass,
  Terminal,
  GraduationCap,
  Eye,
  Sparkles,
  HeartHandshake,
  Zap,
  Bookmark,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  RefreshCw,
  Clock,
  Layers,
  Leaf,
  Activity,
  Heart,
  Share2,
  MessageCircle,
  Search,
  Filter,
  DollarSign,
  Laptop,
  Megaphone,
  ArrowUpRight,
  TrendingUp
};

export function getCategoryIcon(category: string): LucideIcon {
  switch (category) {
    case "Climate Tech":
    case "climate-sustainability":
      return Leaf;
    case "Healthcare & Bio":
    case "healthcare-accessibility":
      return Activity;
    case "AI for Good":
      return Sparkles;
    case "Open Access & Web":
    case "open-source-public-goods":
      return Globe2;
    case "education-diversity":
      return GraduationCap;
    case "digital-rights-privacy":
      return Shield;
    default:
      return Layers;
  }
}
