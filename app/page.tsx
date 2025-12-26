"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ConfidenceMeter from "@/components/ConfidenceMeter";
import SmartMoneyBadge from "@/components/SmartMoneyBadge";
import ShareButtons from "@/components/ShareButtons";
import AnalysisResults from "@/components/AnalysisResults";
import TestimonialsSection from "@/components/TestimonialsSection";
import ChartGuide from "@/components/ChartGuide";
import AlertSignup from "@/components/AlertSignup";
import { saveToJournal } from "@/lib/localStorage";
import { canAnalyze, getRemainingAnalyses, incrementUsage, getFreeLimit, getUsageData } from "@/lib/usageLimit";
import type { TradingXbertAnalysis, Market, Style } from "@/lib/tradingTypes";
import { motion } from "framer-motion";
import axios from "axios";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [market, setMarket] = useState<Market>("Crypto");
  const [style, setStyle] = useState<Style>("Day Trade");
  const [emotionText, setEmotionText] = useState("");
  const [accountSize, setAccountSize] = useState("");
  const [riskPercent, setRiskPercent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<TradingXbertAnalysis | null>(null);
  const [remaining, setRemaining] = useState<number>(10);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showPromoPopup, setShowPromoPopup] = useState(false);

  useEffect(() => {
    setRemaining(getRemainingAnalyses());
  }, [analysis]);

  useEffect(() => {
    const usage = getUsageData();
    const promoDismissed = localStorage.getItem("promoDismissed");

    // Show promo popup after 4 analyses if not dismissed
    if (usage.count >= 4 && promoDismissed !== "true") {
      setShowPromoPopup(true);
    }
  }, [analysis]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setAnalysis(null);
      setError(null);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    
    // Check usage limit
    if (!canAnalyze()) {
      setShowUpgrade(true);
      return;
    }
    
    setError(null);
    setAnalysis(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("market", market);
    formData.append("style", style);
    if (emotionText.trim()) formData.append("emotionText", emotionText.trim());
    if (accountSize) formData.append("accountSize", accountSize);
    if (riskPercent) formData.append("riskPercent", riskPercent);

    try {
      setLoading(true);
      const res = await fetch("/api/analyze-chart", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.error || "Analysis failed");
      }

      const data: TradingXbertAnalysis = await res.json();
      setAnalysis(data);
      incrementUsage();
      setRemaining(getRemainingAnalyses());
      
      // Save analysis to database if user is logged in
      try {
        await axios.post("/api/save-analysis", {
          chartUrl: preview,
          ...data,
        });
      } catch (saveErr) {
        console.log("Failed to save to database (user may not be logged in)");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to analyze chart");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setAnalysis(null);
    setError(null);
    setEmotionText("");
    setAccountSize("");
    setRiskPercent("");
  };

  const handleSaveToJournal = () => {
    if (!analysis || !preview) return;
    
    const entry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      imageData: preview,
      analysis,
      market,
      style,
    };
    
    saveToJournal(entry);
    alert("Saved to your journal!");
  };

  const handleCopyAnalysis = () => {
    if (!analysis) return;
    
    const summary = `
TradingXbert Analysis
═══════════════════════════════════════

SIGNAL: ${analysis.signal} (${analysis.confidence}% confidence)
SMART MONEY: ${analysis.smartMoneyBias}
RISK LEVEL: ${analysis.riskLevel}
${analysis.noTradeZone ? "\n⚠️ THIS IS A NO-TRADE ZONE ⚠️\n" : ""}

TREND & STRUCTURE:
${analysis.trendSummary}

PATTERN SUMMARY:
${analysis.patternSummary}

KEY LEVELS:
${analysis.keyLevels}

STYLE NOTES (${style}):
${analysis.styleNotes}

${analysis.emotionSummary ? `EMOTION CHECK:\n${analysis.emotionSummary}\n\n` : ""}
${analysis.riskPlan ? `RISK PLAN:\n${analysis.riskPlan}\n\n` : ""}
TEACHING TIPS:
${analysis.teachingTips}

CONFIDENCE BREAKDOWN:
- Trend: ${analysis.confidenceBreakdown.trend}%
- Pattern: ${analysis.confidenceBreakdown.pattern}%
- Momentum: ${analysis.confidenceBreakdown.momentum}%
- Volume: ${analysis.confidenceBreakdown.volume}%

Market: ${market} | Style: ${style}
    `.trim();

    navigator.clipboard.writeText(summary);
    alert("Analysis copied to clipboard!");
  };

  const handleClosePromo = () => {
    setShowPromoPopup(false);
    localStorage.setItem("promoDismissed", "true");
  };

  const signalColors = {
    LONG: "bg-emerald-500 text-white",
    SHORT: "bg-red-500 text-white",
    WAIT: "bg-yellow-500 text-black",
  };

  const riskColors = {
    LOW: "text-emerald-400",
    MEDIUM: "text-yellow-400",
    HIGH: "text-red-400",
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-neutral-200">
      {/* Promo Popup */}
      {showPromoPopup && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="card-3d bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-3xl border border-[#6366F1]/30 p-8 md:p-12 max-w-2xl w-full shadow-2xl relative overflow-hidden"
          >
            {/* Animated Background Elements */}
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 w-64 h-64 bg-gradient-to-tr from-[#6366F1] to-[#5558E3] rounded-full blur-3xl"
            ></motion.div>
            <motion.div
              animate={{ 
                y: [0, 20, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 w-64 h-64 bg-gradient-to-tr from-[#8B5CF6] to-[#EC4899] rounded-full blur-3xl"
            ></motion.div>

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.sin(i) * 50, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
                className="absolute w-2 h-2 bg-[#6366F1] rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  bottom: '20%'
                }}
              />
            ))}

            <div className="text-center mb-8 relative z-10">
              <motion.div 
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                🚀
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl font-bold text-white mb-3"
              >
                Limited Time Offer: <motion.span 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-[#6366F1]"
                >
                  $6.99
                </motion.span>/month
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-neutral-300 text-lg"
              >
                Upgrade to Pro and save 30%!
              </motion.p>
            </div>

            <div className="bg-gradient-to-br from-[#6366F1]/20 to-transparent rounded-2xl p-8 mb-8 border border-[#6366F1]/30 relative z-10">
              <div className="space-y-3 text-neutral-200">
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-xl">✓</span>
                  <span><strong>Unlimited</strong> chart analyses per month</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-xl">✓</span>
                  <span><strong>Save analyses</strong> to your journal</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-xl">✓</span>
                  <span><strong>Priority support</strong> and faster processing</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 relative z-10">
              <a
                href="https://buy.stripe.com/aFa28t1LD4yjfqXful0sU00"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 btn-3d bg-[#6366F1] hover:bg-[#5558E3] text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl text-center text-lg"
              >
                🎯 Upgrade Now - $6.99/mo
              </a>
              <button
                onClick={handleClosePromo}
                className="flex-1 sm:flex-initial bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-4 px-6 rounded-xl transition-all"
              >
                Maybe Later
              </button>
            </div>

            <p className="text-xs text-neutral-500 text-center mt-6 relative z-10">
              Cancel anytime • No hidden fees • Instant activation
            </p>
          </motion.div>
        </motion.div>
      )}

      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        {/* Animated Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#6366F1] to-[#8B5CF6] tracking-tight mb-4"
          >
            AI Chart Analysis
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-neutral-300 font-light mb-2"
          >
            Upload. Analyze. Trade Smarter.
          </motion.p>
          {remaining !== Infinity && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-sm text-[#6366F1] font-medium"
            >
              {remaining}/{getFreeLimit()} free analyses remaining this month
            </motion.p>
          )}
        </motion.div>

        {/* Upload Section - Primary */}
        {!analysis && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-lg rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl mb-6 overflow-hidden"
          >
            {/* Multiple Animated background glows */}
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
                x: [0, 50, 0],
                y: [0, -50, 0]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#6366F1]/30 to-[#8B5CF6]/30 rounded-full blur-3xl"
            ></motion.div>
            <motion.div
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.3, 0.2],
                x: [0, -50, 0],
                y: [0, 50, 0]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#EC4899]/20 to-[#8B5CF6]/20 rounded-full blur-3xl"
            ></motion.div>
            
            <ChartGuide />
            
            <label className="block cursor-pointer mb-6 relative z-10">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <motion.div 
                whileHover={{ scale: 1.02, borderColor: "#6366F1" }}
                transition={{ duration: 0.3 }}
                className="border-2 border-dashed border-white/20 rounded-2xl p-8 md:p-12 text-center hover:border-[#6366F1] transition-colors"
              >
                {preview ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img src={preview} alt="Chart" className="max-h-96 mx-auto rounded-xl mb-3 shadow-2xl" />
                    <p className="text-sm text-neutral-400">Click to change image</p>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div 
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-6xl mb-4"
                    >
                      📊
                    </motion.div>
                    <p className="text-3xl font-bold text-white mb-3">Upload Your Chart</p>
                    <p className="text-base text-neutral-400">PNG, JPG, or screenshot — drag & drop or click to browse</p>
                  </motion.div>
                )}
              </motion.div>
            </label>

            {file && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 relative z-10"
              >
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="grid grid-cols-1 gap-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">Market</label>
                    <div className="relative">
                      <select
                        value={market}
                        onChange={(e) => setMarket(e.target.value as Market)}
                        className="w-full bg-gradient-to-r from-neutral-900 to-neutral-800 border-2 border-[#FFD700]/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] hover:border-[#FFD700]/50 transition-all appearance-none cursor-pointer"
                      >
                        <option value="Crypto" className="bg-neutral-900">🪙 Crypto</option>
                        <option value="Forex" className="bg-neutral-900">💱 Forex</option>
                        <option value="Stocks" className="bg-neutral-900">📈 Stocks</option>
                        <option value="Indices" className="bg-neutral-900">📊 Indices</option>
                        <option value="Commodities" className="bg-neutral-900">🛢️ Commodities</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#FFD700]">
                        ▼
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(99, 102, 241, 0.6)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#5558E3] hover:to-[#7C3AED] disabled:from-neutral-700 disabled:to-neutral-700 text-white font-bold py-4 px-6 rounded-xl transition-all disabled:opacity-50 text-lg shadow-lg relative overflow-hidden"
                >
                  {loading && (
                    <motion.div
                      animate={{ x: [-100, 400] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    ></motion.div>
                  )}
                  <span className="relative z-10">{loading ? "Analyzing..." : "🚀 Analyze Chart"}</span>
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Screenshot Instructions */}
        {!analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="mb-8 bg-gradient-to-br from-[#6366F1]/10 to-[#8B5CF6]/10 backdrop-blur-sm rounded-2xl border border-[#6366F1]/20 p-6 md:p-8"
          >
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="text-2xl font-bold text-white mb-6 flex items-center gap-3"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📸
              </motion.span>
              How to Take a Screenshot
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                className="bg-[#0A0A0A]/50 rounded-xl p-6 border border-[#6366F1]/10 hover:border-[#6366F1]/30 transition-all"
              >
                <div className="text-4xl mb-3">💻</div>
                <h3 className="text-xl font-bold text-white mb-3">On PC/Windows</h3>
                <ul className="space-y-2 text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#6366F1] font-bold">1.</span>
                    <span>Press <kbd className="px-2 py-1 bg-white/10 rounded text-xs font-mono">Windows + Shift + S</kbd></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6366F1] font-bold">2.</span>
                    <span>Select the area with your trading chart</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6366F1] font-bold">3.</span>
                    <span>Screenshot saves to clipboard automatically</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="bg-[#0A0A0A]/50 rounded-xl p-6 border border-[#6366F1]/10 hover:border-[#6366F1]/30 transition-all"
              >
                <div className="text-4xl mb-3">📱</div>
                <h3 className="text-xl font-bold text-white mb-3">On Mobile</h3>
                <ul className="space-y-2 text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B5CF6] font-bold">•</span>
                    <span><strong>iPhone:</strong> Press Side + Volume Up buttons</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B5CF6] font-bold">•</span>
                    <span><strong>Android:</strong> Press Power + Volume Down buttons</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B5CF6] font-bold">•</span>
                    <span>Find screenshot in Photos/Gallery</span>
                  </li>
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.7 }}
              className="mt-6 p-4 bg-[#6366F1]/10 rounded-lg border border-[#6366F1]/20"
            >
              <p className="text-sm text-neutral-300 flex items-start gap-2">
                <span className="text-[#6366F1]">💡</span>
                <span><strong>Pro Tip:</strong> Include the full chart with timeframe, price axis, and volume for best AI analysis results!</span>
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Best Indicators Section */}
        {!analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mb-8 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl border border-emerald-500/30 p-6 md:p-8"
          >
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="text-2xl font-bold text-white mb-4 flex items-center gap-3"
            >
              <span className="text-4xl">🎯</span>
              Best Indicators for Maximum AI Accuracy
            </motion.h2>
            
            <p className="text-neutral-300 mb-6">
              Use these indicators on your chart for the BEST TradingXbert AI analysis results:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {[
                { name: "RSI (14)", boost: "+25%", icon: "📊" },
                { name: "MACD", boost: "+20%", icon: "📈" },
                { name: "Volume", boost: "+30%", icon: "📊" },
                { name: "EMA 9/21", boost: "+18%", icon: "📉" },
                { name: "Bollinger Bands", boost: "+15%", icon: "🎯" },
                { name: "Support/Resistance", boost: "+22%", icon: "🔒" }
              ].map((indicator, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.6 + (i * 0.1) }}
                  className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-emerald-500/20 hover:border-emerald-500/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{indicator.icon}</span>
                    <span className="text-white font-bold">{indicator.name}</span>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-bold">
                    {indicator.boost} accuracy
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.2 }}
              className="p-4 bg-[#6366F1]/10 rounded-lg border border-[#6366F1]/30"
            >
              <p className="text-sm text-neutral-300 flex items-start gap-2">
                <span className="text-yellow-400 text-xl">⚡</span>
                <span><strong>Recommended Setup:</strong> RSI (14) + MACD + Volume + EMA 9/21 on 15-min or 1-hour charts = 85%+ AI accuracy! <Link href="/how-to-trade/using-ai" className="text-[#6366F1] hover:underline font-bold">Learn more →</Link></span>
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 text-center mb-6">
            <p className="text-red-400 font-medium">{error}</p>
          </div>
        )}

        {/* Results */}
        {analysis && (
          <AnalysisResults analysis={analysis} onReset={handleReset} />
        )}

        {/* Upgrade Modal */}
        {showUpgrade && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="card-3d bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-3xl border border-[#6366F1]/30 p-8 md:p-12 max-w-2xl w-full shadow-2xl">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🚀</div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  Upgrade to <span className="text-[#6366F1]">Pro</span>
                </h2>
                <p className="text-neutral-300 text-lg">You've used all your free analyses this month</p>
              </div>

              <div className="bg-gradient-to-br from-[#6366F1]/20 to-transparent rounded-2xl p-8 mb-8 border border-[#6366F1]/30">
                <div className="text-center mb-6">
                  <div className="inline-block bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                    LIMITED TIME SALE 🔥
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-3xl text-neutral-500 line-through">$9.99</span>
                    <span className="text-6xl font-bold text-white">$6.99</span>
                    <span className="text-2xl text-neutral-400">/month</span>
                  </div>
                  <p className="text-sm text-[#6366F1] mt-2 font-semibold">Save 30% - Offer ends soon!</p>
                </div>

                <div className="space-y-3 text-neutral-200">
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-400 text-xl">✓</span>
                    <span><strong>Unlimited</strong> chart analyses per month</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-400 text-xl">✓</span>
                    <span><strong>Save analyses</strong> to your journal</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-400 text-xl">✓</span>
                    <span><strong>Priority support</strong> and faster processing</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-400 text-xl">✓</span>
                    <span><strong>Early access</strong> to new features</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://buy.stripe.com/aFa28t1LD4yjfqXful0sU00"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-3d bg-[#6366F1] hover:bg-[#5558E3] text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl text-center text-lg"
                >
                  🎯 Upgrade Now - $6.99/mo
                </a>
                <button
                  onClick={() => setShowUpgrade(false)}
                  className="flex-1 sm:flex-initial bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-4 px-6 rounded-xl transition-all"
                >
                  Maybe Later
                </button>
              </div>

              <p className="text-xs text-neutral-500 text-center mt-6">
                Cancel anytime • No hidden fees • Instant activation
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-neutral-500">
          <p>© TradingXbert</p>
        </footer>
      </div>
      
      {/* Alert Signup Section */}
      {!analysis && (
        <div className="max-w-7xl mx-auto px-6 pb-12">
          <AlertSignup />
        </div>
      )}
      
      {/* Testimonials Section */}
      {!analysis && <TestimonialsSection />}
    </main>
  );
}
