// /lib/prompt.ts
import type { Market } from "./types";

/**
 * Builds a strict JSON prompt for the OpenAI model.
 * The model must ONLY return a valid JSON object matching the AiVerdict type.
 */
export function buildPrompt(market: Market): string {
  return `You are an expert Solana meme coin analyst. Given the following token market data, output ONLY a valid JSON object matching this TypeScript type (no prose, no explanation):\n\ninterface AiVerdict {\n  risk_score: number; // 1-10\n  hype_score: number; // 1-10\n  liquidity: \"Low\"|\"Medium\"|\"High\"|\"Unknown\";\n  verdict_bullets: string[]; // 3 items, each ≤16 words\n  long_context: string; // ≤20 words, starts with 'If LONG:'\n  short_context: string; // ≤20 words, starts with 'If SHORT:'\n}\n\nMarket data:\n${JSON.stringify(market, null, 2)}\n\nRespond ONLY with valid JSON for AiVerdict.`;
}
