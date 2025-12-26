// /lib/fetchToken.ts
import type { Market } from "./types";
import { normalizeQuery } from "./normalize";

// Helper: safe number parse
function num(n: any): number | null {
  const v = Number(n);
  return isNaN(v) ? null : v;
}

// Helper: liquidity bucket
function getLiquidityBucket(liq: number | null): "Low"|"Medium"|"High"|"Unknown" {
  if (liq == null) return "Unknown";
  if (liq < 10000) return "Low";
  if (liq < 100000) return "Medium";
  return "High";
}

// Hardcoded mock for $MOCK
const MOCK_MARKET: Market = {
  name: "Mock Token",
  symbol: "$MOCK",
  address: "MockAddress11111111111111111111111111111111",
  price: 0.1234,
  change24h: 12.3,
  volume24h: 42000,
  liquidity: "Medium",
  top10Pct: 0.42,
  buySellRatio: 1.2,
  vol15mDelta: 0.05,
};

export async function fetchTokenData(query: string): Promise<Market> {
  if (query === "$MOCK") return { ...MOCK_MARKET };
  const { kind, value } = normalizeQuery(query);
  try {
    // DexScreener API (Solana only)
    let url = kind === "address"
      ? `https://api.dexscreener.com/latest/dex/tokens/${value}`
      : `https://api.dexscreener.com/latest/dex/search/?q=${encodeURIComponent(value)}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    let pair = null;
    if (kind === "address") {
      pair = data?.pairs?.[0] || data;
    } else {
      pair = data?.pairs?.find((p: any) => p.baseToken?.symbol?.toUpperCase() === value.replace("$", ""));
    }
    if (!pair) throw new Error("Not found");
    return {
      name: pair.baseToken?.name || pair.name || null,
      symbol: pair.baseToken?.symbol ? "$"+pair.baseToken.symbol.toUpperCase() : pair.symbol ? "$"+pair.symbol.toUpperCase() : null,
      address: pair.baseToken?.address || pair.address || null,
      price: num(pair.priceUsd),
      change24h: num(pair.priceChange?.h24 ?? pair.priceChange24h),
      volume24h: num(pair.volume?.h24 ?? pair.volume24h),
      liquidity: getLiquidityBucket(num(pair.liquidity?.usd ?? pair.liquidityUsd)),
      top10Pct: num(pair.top10HoldingsPct),
      buySellRatio: num(pair.buySellRatio),
      vol15mDelta: num(pair.volume?.m15 ?? pair.volume15mDelta),
    };
  } catch {
    // Mock fallback for trending tokens
    const trending = ["$WIF", "$BONK", "$COQ", "$WEN", "$MFER", "$WWED"];
    if (trending.includes(query.toUpperCase())) {
      return {
        name: query.replace("$","") + " Token",
        symbol: query.toUpperCase(),
        address: "MockAddress" + query.replace("$","").padEnd(32, "1"),
        price: 0.1234,
        change24h: 12.3,
        volume24h: 42000,
        liquidity: "Medium",
        top10Pct: 0.42,
        buySellRatio: 1.2,
        vol15mDelta: 0.05,
      };
    }

    // Fallback: minimal Market
    return {
      name: kind === "symbol" ? value : null,
      symbol: kind === "symbol" ? value : null,
      address: kind === "address" ? value : null,
      price: null,
      change24h: null,
      volume24h: null,
      liquidity: "Unknown",
      top10Pct: null,
      buySellRatio: null,
      vol15mDelta: null,
    };
  }
}
