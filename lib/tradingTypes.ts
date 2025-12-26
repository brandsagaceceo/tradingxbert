// lib/tradingTypes.ts
export type Signal = "LONG" | "SHORT" | "WAIT";
export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";
export type Market = "Crypto" | "Forex" | "Stocks" | "Indices";
export type Style = "Scalp" | "Day Trade" | "Swing";
export type SmartMoneyBias = 
  | "Smart Money Bullish" 
  | "Smart Money Bearish" 
  | "Neutral" 
  | "Liquidity Grab Scenario" 
  | "Possible Trap Zone";

export interface ConfidenceBreakdown {
  trend: number;
  pattern: number;
  momentum: number;
  volume: number;
}

export interface TradingXbertAnalysis {
  signal: Signal;
  confidence: number;
  trendSummary: string;
  patternSummary: string;
  keyLevels: string;
  noTradeZone: boolean;
  smartMoneyBias: SmartMoneyBias;
  riskLevel: RiskLevel;
  styleNotes: string;
  emotionSummary: string | null;
  riskPlan: string | null;
  teachingTips: string;
  confidenceBreakdown: ConfidenceBreakdown;
}

export interface JournalEntry {
  id: string;
  timestamp: number;
  imageData: string;
  analysis: TradingXbertAnalysis;
  market: Market;
  style: Style;
}

export interface AnalyzeChartRequest {
  file: File;
  market: Market;
  style: Style;
  emotionText?: string;
  accountSize?: number;
  riskPercent?: number;
}
