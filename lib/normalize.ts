// /lib/normalize.ts
// Query normalization utilities for Solana tokens

export function isSolAddress(s: string): boolean {
  // Simple base58 check: 32-44 chars, alphanumeric (no 0, O, I, l)
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(s);
}

export function normalizeQuery(q: string): { kind: "address"|"symbol"; value: string } {
  const s = q.trim();
  if (isSolAddress(s)) return { kind: "address", value: s };
  if (s.startsWith("$") && s.length > 1) return { kind: "symbol", value: s.toUpperCase() };
  return { kind: "symbol", value: s.toUpperCase() };
}
