import { NextResponse } from "next/server";
import { matchCharities } from "@/lib/matcher";
import { QuizAnswers } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as QuizAnswers;

    if (!body || !body.primaryCause || !body.givingPreference) {
      return NextResponse.json(
        { error: "Missing required quiz parameters" },
        { status: 400 }
      );
    }

    const results = matchCharities(body);
    return NextResponse.json(results);
  } catch (error) {
    console.error("Match error:", error);
    return NextResponse.json(
      { error: "Failed to process recommendations" },
      { status: 500 }
    );
  }
}
