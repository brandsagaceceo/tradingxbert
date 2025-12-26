import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface MarketData {
  pair: string;
  price: number;
  change24h: number;
  volume24h: number;
  high24h: number;
  low24h: number;
}

interface AISignal {
  signal: 'LONG' | 'SHORT' | 'NEUTRAL';
  confidence: number;
  reasoning: string;
  keyLevels: string;
  shouldAlert: boolean;
}

export async function analyzeMarketData(data: MarketData): Promise<AISignal> {
  const prompt = `You are an expert trading AI analyzing real-time market data. Analyze this data and determine if there's a high-probability trading opportunity.

Market Data:
- Pair: ${data.pair}
- Current Price: $${data.price}
- 24h Change: ${data.change24h.toFixed(2)}%
- 24h Volume: $${data.volume24h.toLocaleString()}
- 24h High: $${data.high24h}
- 24h Low: $${data.low24h}

Analyze for:
1. Strong momentum signals (>3% moves)
2. Volume confirmation
3. Key support/resistance levels
4. Risk/reward ratio

Respond in JSON format:
{
  "signal": "LONG" | "SHORT" | "NEUTRAL",
  "confidence": 0-100,
  "reasoning": "Brief explanation (2-3 sentences)",
  "keyLevels": "Key support/resistance levels",
  "shouldAlert": true/false (only true if confidence > 75 and clear setup)
}`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return result as AISignal;
  } catch (error) {
    console.error('Error analyzing market:', error);
    return {
      signal: 'NEUTRAL',
      confidence: 0,
      reasoning: 'Analysis failed',
      keyLevels: '',
      shouldAlert: false,
    };
  }
}

// Top crypto pairs to monitor
export const MONITORED_PAIRS = [
  'BTC/USD',
  'ETH/USD',
  'SOL/USD',
  'BNB/USD',
  'XRP/USD',
  'ADA/USD',
  'DOGE/USD',
  'AVAX/USD',
];

// Mock function - replace with real exchange API
export async function fetchMarketData(pair: string): Promise<MarketData> {
  // TODO: Replace with real API call (Binance, CoinGecko, etc.)
  // For now, returning mock data
  const basePrice = Math.random() * 50000 + 1000;
  return {
    pair,
    price: basePrice,
    change24h: (Math.random() - 0.5) * 10,
    volume24h: Math.random() * 1000000000,
    high24h: basePrice * 1.05,
    low24h: basePrice * 0.95,
  };
}
