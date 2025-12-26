// app/api/analyze-chart/route.ts
import { NextRequest, NextResponse } from "next/server";
import { openai, VISION_MODEL } from "@/lib/openai";
import type { TradingXbertAnalysis, Market, Style } from "@/lib/tradingTypes";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const market = formData.get("market") as Market;
    const style = formData.get("style") as Style;
    const emotionText = formData.get("emotionText") as string | null;
    const accountSize = formData.get("accountSize") ? parseFloat(formData.get("accountSize") as string) : null;
    const riskPercent = formData.get("riskPercent") ? parseFloat(formData.get("riskPercent") as string) : null;

    if (!file || !market || !style) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Dev-only: return a realistic mock analysis when mocking is enabled
    const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "1" || !process.env.OPENAI_API_KEY;
    if (useMock) {
      const mock: TradingXbertAnalysis = {
        signal: "LONG",
        confidence: 78,
        trendSummary: "BULLISH: Higher highs and higher lows on the visible timeframe with clear demand zone at recent swing lows. Institutional buying visible via long wick absorption and follow-through volume.",
        patternSummary: "Bullish engulfing near support and a breakout of a short-term ascending triangle; volume spike confirms breakout. No signs of liquidity sweep in the immediate area.",
        keyLevels: "Support: 1.100-1.105; Resistance: 1.140-1.145; Order block (bullish) 1.095-1.100; Fair value gap 1.110-1.112.",
        noTradeZone: false,
        smartMoneyBias: "Smart Money Bullish",
        riskLevel: "MEDIUM",
        styleNotes: `Default Day Trade plan: Enter on pullback to 1.110 with a tight stop below 1.104 (12 pips). Target first partial at 1.135, full exit at 1.145. Use 1:2 R:R on initial position.`,
        emotionSummary: null,
        riskPlan: null,
        teachingTips: "(1) Confirm breakouts with volume spikes. (2) Use EMA 21/50 cross for momentum confirmation. (3) Watch for liquidity hunts at equal lows. (4) Manage risk with fixed % of account. (5) Use limit entries into pullbacks near order blocks. (6) Prefer higher time frame confluence.",
        confidenceBreakdown: {
          trend: 80,
          pattern: 75,
          momentum: 70,
          volume: 85,
        },
      };

      return NextResponse.json(mock, { status: 200 });
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");
    const mimeType = file.type || "image/png";
    const dataUrl = `data:${mimeType};base64,${base64Image}`;

    // Build context for the prompt
    let contextParts = [
      `Market: ${market}`,
      `Trading Style: ${style}`,
    ];

    if (emotionText) {
      contextParts.push(`Trader's emotional state: "${emotionText}"`);
    }

    if (accountSize && riskPercent) {
      contextParts.push(`Account size: $${accountSize}, Risk per trade: ${riskPercent}%`);
    }

    const systemPrompt = `You are TradingXbert, an elite institutional trading analyst with 15+ years experience. You speak with conviction and authority—no hedging, no "might be" language. You give DEFINITIVE calls.

Analyze this chart image and return ONLY valid JSON with ALL these fields:

{
  "signal": "LONG" | "SHORT" | "WAIT",
  "confidence": number (0-100),
  "trendSummary": "Clear directional call (BULLISH/BEARISH/CHOPPY) + market structure + timeframe analysis + institutional order flow",
  "patternSummary": "Specific candlestick patterns (engulfing, pin bars, doji, hammers) + chart patterns (H&S, double top/bottom, wedges, triangles, flags) + liquidity sweeps + fakeout detection + what smart money is doing",
  "keyLevels": "Exact support/resistance zones with confluence + order blocks + fair value gaps + liquidity pools + equal highs/lows where stop hunts occur + institutional entry/exit zones",
  "noTradeZone": boolean (true if choppy, low volume, mid-breakout, unclear setup, or high risk),
  "smartMoneyBias": "Smart Money Bullish" | "Smart Money Bearish" | "Neutral" | "Liquidity Grab Scenario" | "Possible Trap Zone",
  "riskLevel": "LOW" | "MEDIUM" | "HIGH",
  "styleNotes": "Precise ${style}-specific execution plan: exact entry triggers, stop placement, profit targets, and timeframe-appropriate tactics",
  "emotionSummary": ${emotionText ? '"Direct psychological coaching based on their emotional state—call out FOMO, revenge trading, fear, overconfidence. Be tough but supportive."' : 'null'},
  "riskPlan": ${accountSize && riskPercent ? '"Calculate max dollar loss, suggest position sizing strategy, and explain R:R ratio for this specific setup"' : 'null'},
  "teachingTips": "4-6 educational points explaining: (1) Why this pattern works, (2) What indicators confirm it (RSI, MACD, volume profile, EMA crossovers, Fibonacci, etc.), (3) How professionals trade it, (4) Common mistakes to avoid, (5) How to spot similar setups in future, (6) Which technical indicators give highest accuracy for THIS pattern",
  "confidenceBreakdown": {
    "trend": number (0-100),
    "pattern": number (0-100),
    "momentum": number (0-100),
    "volume": number (0-100)
  }
}

Context:
${contextParts.join("\n")}

CRITICAL RULES:
1. Be AFFIRMATIVE and DECISIVE - use "This IS a LONG setup" not "This could be bullish"
2. If noTradeZone is true, make signal "WAIT" and clearly explain why
3. smartMoneyBias MUST analyze: liquidity grabs, stop hunts, order blocks, institutional footprints, manipulation
4. teachingTips MUST recommend specific indicators (RSI, MACD, Bollinger Bands, Volume Profile, Fibonacci, EMAs, etc.) that work BEST for this exact pattern
5. Explain chart dynamics like you're teaching a masterclass—be detailed, insightful, and unique
6. Never give generic ChatGPT responses—think like a pro trader with institutional knowledge
7. confidenceBreakdown must roughly match overall confidence score
8. Return ONLY the JSON object, no markdown, no extra text`;

    const response = await openai.chat.completions.create({
      model: VISION_MODEL,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: systemPrompt },
            {
              type: "image_url",
              image_url: {
                url: dataUrl,
                detail: "high",
              },
            },
          ],
        },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });

    const content = response.choices[0]?.message?.content?.trim();
    if (!content) {
      throw new Error("No response from AI");
    }

    // Parse JSON response
    let analysis: TradingXbertAnalysis;
    try {
      // Remove markdown code blocks if present
      const cleanedContent = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      analysis = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Invalid AI response format");
    }

    // Validate required fields
    if (!analysis.signal || !analysis.confidence || !analysis.trendSummary) {
      throw new Error("Incomplete analysis from AI");
    }

    return NextResponse.json(analysis, { status: 200 });
  } catch (error: any) {
    console.error("Chart analysis error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to analyze chart" },
      { status: 500 }
    );
  }
}

