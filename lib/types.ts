// /lib/types.ts
export type Market = {
  name: string | null;
  symbol: string | null;
  address: string | null;
  price: number | null;
  change24h: number | null;
  volume24h: number | null;
  liquidity: "Low"|"Medium"|"High"|"Unknown";
  top10Pct: number | null;
  buySellRatio: number | null;
  vol15mDelta: number | null;
};

export type AiVerdict = {
  risk_score: number;
  hype_score: number;
  liquidity: "Low"|"Medium"|"High"|"Unknown";
  verdict_bullets: string[]; // length 3, each ≤16 words
  long_context: string; // ≤20 words, starts with "If LONG:"
  short_context: string; // ≤20 words, starts with "If SHORT:"
};

export type AnalyzeResponse = { market: Market; ai: AiVerdict };
