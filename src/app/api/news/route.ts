import { NextRequest, NextResponse } from "next/server";
import { fetchUpliftNews, RSS_SOURCES } from "@/lib/rss";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const source = searchParams.get("source");
    const refresh = searchParams.get("refresh") === "true";

    let news = await fetchUpliftNews(refresh);

    if (category && category !== "all" && category !== "All") {
      news = news.filter((item) => item.category.toLowerCase() === category.toLowerCase());
    }

    if (source && source !== "all" && source !== "All") {
      news = news.filter((item) => item.source.toLowerCase() === source.toLowerCase());
    }

    return NextResponse.json(
      {
        success: true,
        count: news.length,
        items: news,
        sources: RSS_SOURCES.map((s) => ({
          name: s.name,
          url: s.sourceUrl,
          category: s.defaultCategory,
          description: s.description,
        })),
        lastUpdated: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": refresh
            ? "no-cache, no-store, must-revalidate"
            : "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      }
    );
  } catch (error) {
    console.error("News API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch positive news" },
      { status: 500 }
    );
  }
}
