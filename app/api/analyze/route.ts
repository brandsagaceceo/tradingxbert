// /app/api/analyze/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fetchTokenData } from "@/lib/fetchToken";
import { buildPrompt } from "@/lib/prompt";
import { safeJsonParse, clampScores } from "@/lib/sanitize";
import type { AnalyzeResponse, Market, AiVerdict } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Missing query" }, { status: 400 });
    }
    const market: Market = await fetchTokenData(query);
    const prompt = buildPrompt(market);
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.2,
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });
    if (!openaiRes.ok) {
      const errorData = await openaiRes.json().catch(() => ({}));
      console.error("OpenAI API error:", openaiRes.status, errorData);
      return NextResponse.json({ 
        error: `AI error: ${errorData?.error?.message || openaiRes.statusText || "Unknown"}` 
      }, { status: 500 });
    }
    const aiRaw = await openaiRes.json();
    const aiText = aiRaw.choices?.[0]?.message?.content || "";
    let aiParsed: AiVerdict | null = safeJsonParse(aiText);
    let ai: AiVerdict = aiParsed ? clampScores(aiParsed) : clampScores({
      risk_score: 1,
      hype_score: 1,
      liquidity: "Unknown",
      verdict_bullets: ["N/A", "N/A", "N/A"],
      long_context: "If LONG: N/A",
      short_context: "If SHORT: N/A"
    });
    const resp: AnalyzeResponse = { market, ai };
    return NextResponse.json(resp, { status: 200 });
  } catch (e: any) {
    console.error("API error:", e);
    return NextResponse.json({ error: `Internal error: ${e?.message || e}` }, { status: 500 });
  }
}
