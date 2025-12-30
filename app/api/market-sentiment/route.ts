import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(req: NextRequest) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a market sentiment analyzer. Based on current market conditions in December 2025, analyze the overall market sentiment across crypto, stocks, forex, and commodities.

Current Market Context (December 2025):
- Bitcoin: $96,000+ (near all-time highs, strong ETF inflows)
- NVIDIA: $870+ (AI chip dominance)
- Ethereum: $3,400+ (successful Dencun upgrade)
- S&P 500: 5,800+ (new all-time high)
- Gold: $2,600+ (safe-haven demand)
- Apple: $194 (strong iPhone 16 sales)
- Oil: $71 (OPEC+ production cuts)
- Fed: Rates steady, inflation near 2% target
- Tech sector: Strong AI-driven growth
- Crypto sector: Institutional adoption accelerating

Return ONLY a JSON object with a single "value" field containing a number between 0-100 representing the Fear & Greed Index:
- 0-25: Extreme Fear (panic selling, blood in streets)
- 26-45: Fear (cautious, risk-off sentiment)
- 46-55: Neutral (balanced market)
- 56-75: Greed (optimistic, buying pressure)
- 76-100: Extreme Greed (euphoria, FOMO, bubble concerns)

Consider: price levels, institutional flows, economic data, volatility, and overall market momentum.

Respond with ONLY the JSON, no other text: {"value": X}`
        }
      ],
      temperature: 0.3,
      max_tokens: 50,
    });

    const content = completion.choices[0]?.message?.content?.trim();
    
    if (!content) {
      throw new Error("No response from OpenAI");
    }

    // Parse the JSON response
    const parsed = JSON.parse(content);
    const value = parseInt(parsed.value);

    // Validate the value is within range
    if (isNaN(value) || value < 0 || value > 100) {
      throw new Error("Invalid sentiment value");
    }

    return NextResponse.json({ 
      value,
      timestamp: new Date().toISOString(),
      source: "AI-powered analysis"
    });

  } catch (error: any) {
    console.error("Market sentiment error:", error);
    
    // Return a reasonable default (neutral) if AI fails
    return NextResponse.json({ 
      value: 52, // Neutral default
      timestamp: new Date().toISOString(),
      source: "default",
      error: "Using default value"
    });
  }
}
