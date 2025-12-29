import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { message, analysis, chatHistory } = await req.json();

    if (!message || !analysis) {
      return NextResponse.json(
        { error: "Message and analysis are required" },
        { status: 400 }
      );
    }

    // Build context from chat history
    const conversationContext = chatHistory
      .map((msg: any) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
      .join("\n\n");

    // Create detailed system prompt with chart analysis context
    const systemPrompt = `You are TradingXbert, an expert AI trading assistant helping traders analyze charts and make informed decisions. You have deep knowledge of technical analysis, market psychology, risk management, and trading strategies.

CURRENT CHART ANALYSIS:
- Signal: ${analysis.signal}
- Confidence: ${analysis.confidence}%
- Risk Level: ${analysis.riskLevel}
- Trend: ${analysis.trendSummary}
${analysis.patterns ? `- Patterns: ${analysis.patterns.join(", ")}` : ""}
${analysis.keyLevels ? `- Key Levels: Support ${analysis.keyLevels.support}, Resistance ${analysis.keyLevels.resistance}` : ""}
${analysis.entry ? `- Entry: ${analysis.entry}` : ""}
${analysis.stopLoss ? `- Stop Loss: ${analysis.stopLoss}` : ""}
${analysis.takeProfit ? `- Take Profit: ${analysis.takeProfit}` : ""}

CONVERSATION HISTORY:
${conversationContext}

Your role is to:
1. Answer questions about this specific chart analysis
2. Provide actionable trading advice based on the data
3. Explain technical concepts in a clear, educational way
4. Help with risk management and position sizing
5. Discuss alternative scenarios and contingency plans
6. Be honest about uncertainties and risks

Keep responses:
- Concise but thorough (2-4 paragraphs max)
- Practical and actionable
- Educational when explaining concepts
- Honest about risks and limitations
- Use emojis sparingly for emphasis (📊 💰 ⚠️ 💎 🎯)

If the user asks about something not related to trading or the chart, politely redirect them back to the analysis.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const responseMessage = completion.choices[0].message.content || "I'm sorry, I couldn't generate a response.";

    return NextResponse.json({ message: responseMessage });
  } catch (error: any) {
    console.error("Chart chat error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process chat message" },
      { status: 500 }
    );
  }
}
