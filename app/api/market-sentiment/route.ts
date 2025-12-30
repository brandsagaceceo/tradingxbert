import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Fetch real Fear & Greed Index from Alternative.me API (crypto market)
    const response = await fetch('https://api.alternative.me/fng/?limit=1', {
      next: { revalidate: 300 } // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Fear & Greed Index");
    }

    const data = await response.json();
    const value = parseInt(data.data[0].value);
    const classification = data.data[0].value_classification;

    // Validate the value is within range
    if (isNaN(value) || value < 0 || value > 100) {
      throw new Error("Invalid sentiment value");
    }

    return NextResponse.json({ 
      value,
      classification,
      timestamp: new Date().toISOString(),
      source: "Alternative.me Crypto Fear & Greed Index"
    });

  } catch (error: any) {
    console.error("Market sentiment error:", error);
    
    // Return a reasonable default (neutral) if API fails
    return NextResponse.json({ 
      value: 52, // Neutral default
      timestamp: new Date().toISOString(),
      source: "default",
      error: "Using default value"
    });
  }
}
