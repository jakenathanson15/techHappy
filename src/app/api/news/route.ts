import { NextRequest, NextResponse } from "next/server";
import { fetchUpliftNews } from "@/lib/rss";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let news = await fetchUpliftNews();

    if (category && category !== "all" && category !== "All") {
      news = news.filter((item) => item.category.toLowerCase() === category.toLowerCase());
    }

    return NextResponse.json(
      {
        success: true,
        count: news.length,
        items: news,
        lastUpdated: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
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
