import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, analysis, chatHistory = [] } = body;

    if (!message || !analysis) {
      return NextResponse.json(
        { error: "Message and analysis are required" },
        { status: 400 }
      );
    }

    // Verify OpenAI API key
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "dummy") {
      console.error("OpenAI API key not configured");
      return NextResponse.json(
        { error: "AI service not configured" },
        { status: 500 }
      );
    }

    // Build concise conversation context (last 3 messages only)
    const recentHistory = chatHistory.slice(-3);
    const conversationContext = recentHistory
      .map((msg: any) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
      .join("\n");

    // Simplified system prompt
    const systemPrompt = `You are TradingXbert, an expert trading assistant.

Chart Analysis:
- Signal: ${analysis.signal} (${analysis.confidence}% confidence)
- Risk: ${analysis.riskLevel}
- Trend: ${analysis.trendSummary || "Not specified"}
${analysis.keyLevels ? `- Levels: ${JSON.stringify(analysis.keyLevels)}` : ""}
${analysis.entry ? `- Entry: ${analysis.entry}` : ""}
${analysis.stopLoss ? `- Stop Loss: ${analysis.stopLoss}` : ""}
${analysis.takeProfit ? `- Take Profit: ${analysis.takeProfit}` : ""}

Recent conversation:
${conversationContext}

Provide concise, actionable trading advice. Keep responses under 3 paragraphs. Use emojis: 📊 💰 ⚠️ 💎 🎯`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 400
    });

    const responseMessage = completion.choices[0]?.message?.content || "I couldn't generate a response.";

    return NextResponse.json({ message: responseMessage });
  } catch (error: any) {
    console.error("Chart chat error:", error);
    
    let errorMessage = "Failed to process chat message";
    if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT') {
      errorMessage = "Connection timeout. Please try again.";
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
