// /lib/sanitize.ts
// Utility functions for safe JSON parsing and AI response sanitization

/**
 * Safely parses a JSON string. Returns null if invalid.
 */
export function safeJsonParse(s: string): any | null {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}

/**
 * Clamps risk/hype scores to 1..10, ensures arrays length 3, trims strings, defaults liquidity.
 * Mutates and returns the object.
 */
export function clampScores(obj: any): any {
  if (!obj || typeof obj !== 'object') return {};
  // Clamp risk/hype
  if (typeof obj.risk_score === 'number') {
    obj.risk_score = Math.max(1, Math.min(10, Math.round(obj.risk_score)));
  } else {
    obj.risk_score = 1;
  }
  if (typeof obj.hype_score === 'number') {
    obj.hype_score = Math.max(1, Math.min(10, Math.round(obj.hype_score)));
  } else {
    obj.hype_score = 1;
  }
  // Liquidity
  if (typeof obj.liquidity !== 'string' || !obj.liquidity.trim()) {
    obj.liquidity = 'Unknown';
  } else {
    obj.liquidity = obj.liquidity.slice(0, 24);
  }
  // Bullets
  if (!Array.isArray(obj.verdict_bullets)) obj.verdict_bullets = [];
  obj.verdict_bullets = obj.verdict_bullets.slice(0, 3).map((s: any) =>
    typeof s === 'string' ? s.slice(0, 120) : ''
  );
  while (obj.verdict_bullets.length < 3) obj.verdict_bullets.push('N/A');
  // Long/Short
  if (typeof obj.long_line !== 'string') obj.long_line = 'N/A';
  else obj.long_line = obj.long_line.slice(0, 160);
  if (typeof obj.short_line !== 'string') obj.short_line = 'N/A';
  else obj.short_line = obj.short_line.slice(0, 160);
  return obj;
}
