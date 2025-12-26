"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function UsingAI() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0A0F] via-[#1a1a2e] to-[#0A0A0F]">
      {/* Hero */}
      <div className="relative h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=400&fit=crop"
          alt="Using AI for Trading"
          width={1200}
          height={400}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-[#0A0A0F]/50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-bold mb-4"
          >
            Course 4 • All Levels • 40 min
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4"
          >
            Using AI for Trading
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-neutral-300 max-w-2xl"
          >
            Leverage TradingXbert AI to 10x your trading accuracy
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Overview */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-[#6366F1]/10 to-[#3B82F6]/10 p-8 rounded-2xl border border-[#6366F1]/20">
            <h2 className="text-3xl font-bold text-white mb-6">🤖 What You'll Learn</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "How TradingXbert AI analyzes charts",
                "Optimal indicators for maximum AI accuracy",
                "Uploading charts for instant analysis",
                "Interpreting AI-generated insights",
                "Combining AI with your strategy"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-neutral-300">
                  <span className="text-[#6366F1] text-xl">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Lesson 1 */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">How TradingXbert AI Works</h2>
          <div className="mb-8">
            <Image
              src="https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?w=800&h=400&fit=crop"
              alt="AI Analysis"
              width={800}
              height={400}
              className="w-full rounded-xl"
            />
          </div>
          <div className="space-y-6 text-neutral-300 text-lg leading-relaxed">
            <p>
              TradingXbert uses advanced machine learning algorithms trained on millions of historical charts to identify patterns, support/resistance levels, and high-probability trade setups in seconds.
            </p>
            <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 p-8 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-2xl mb-4">⚡ AI Analysis Process</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">1️⃣</span>
                  <div>
                    <p className="text-white font-bold mb-1">Chart Recognition</p>
                    <p>AI scans your chart and identifies candlestick patterns, trends, and key levels</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-3xl">2️⃣</span>
                  <div>
                    <p className="text-white font-bold mb-1">Indicator Analysis</p>
                    <p>Processes RSI, MACD, volume, and other technical indicators</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-3xl">3️⃣</span>
                  <div>
                    <p className="text-white font-bold mb-1">Pattern Matching</p>
                    <p>Compares current setup against 1M+ historical winning trades</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-3xl">4️⃣</span>
                  <div>
                    <p className="text-white font-bold mb-1">Risk Assessment</p>
                    <p>Calculates optimal entry, stop loss, and take profit levels</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CRITICAL LESSON: Best Indicators for AI */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-8 rounded-2xl border border-yellow-500/40 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <span className="text-5xl">🎯</span>
              <div>
                <h2 className="text-4xl font-bold text-white mb-3">Best Indicators for Maximum AI Accuracy</h2>
                <p className="text-xl text-yellow-200">Use these indicators on your charts for the BEST TradingXbert AI results</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Essential Indicators */}
            <div>
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-emerald-400">✓</span> Essential Indicators (Must Have)
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    name: "RSI (Relative Strength Index)",
                    settings: "Period: 14",
                    why: "Shows overbought/oversold conditions. AI uses this to identify reversals.",
                    accuracy: "+25% accuracy boost"
                  },
                  {
                    name: "MACD (Moving Average Convergence Divergence)",
                    settings: "12, 26, 9 (default)",
                    why: "Reveals momentum and trend strength. Critical for AI trend analysis.",
                    accuracy: "+20% accuracy boost"
                  },
                  {
                    name: "Volume",
                    settings: "Standard bars",
                    why: "Confirms breakouts and trend strength. AI needs volume to validate signals.",
                    accuracy: "+30% accuracy boost"
                  },
                  {
                    name: "EMA 9 & 21",
                    settings: "9-period and 21-period",
                    why: "Dynamic support/resistance levels. AI uses crossovers for entries.",
                    accuracy: "+18% accuracy boost"
                  }
                ].map((indicator, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/5 p-6 rounded-xl border border-emerald-500/30"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-emerald-400 font-bold text-xl">{indicator.name}</h4>
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold">{indicator.accuracy}</span>
                    </div>
                    <p className="text-neutral-400 text-sm mb-3"><span className="text-white font-bold">Settings:</span> {indicator.settings}</p>
                    <p className="text-neutral-300 text-sm">{indicator.why}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recommended Indicators */}
            <div>
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-[#6366F1]">+</span> Recommended Indicators (High Value)
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    name: "Bollinger Bands",
                    settings: "20-period, 2 std dev",
                    why: "Shows volatility and price extremes",
                    accuracy: "+15% accuracy"
                  },
                  {
                    name: "Support & Resistance Lines",
                    settings: "Manual or auto-drawn",
                    why: "Key levels for entries and exits",
                    accuracy: "+22% accuracy"
                  },
                  {
                    name: "Fibonacci Retracement",
                    settings: "0.382, 0.5, 0.618 levels",
                    why: "Predicts pullback levels accurately",
                    accuracy: "+12% accuracy"
                  },
                  {
                    name: "Stochastic Oscillator",
                    settings: "14, 3, 3",
                    why: "Confirms RSI signals and momentum",
                    accuracy: "+10% accuracy"
                  }
                ].map((indicator, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/5 p-6 rounded-xl border border-[#6366F1]/30"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-[#6366F1] font-bold text-xl">{indicator.name}</h4>
                      <span className="px-3 py-1 bg-[#6366F1]/20 text-[#6366F1] rounded-full text-xs font-bold">{indicator.accuracy}</span>
                    </div>
                    <p className="text-neutral-400 text-sm mb-3"><span className="text-white font-bold">Settings:</span> {indicator.settings}</p>
                    <p className="text-neutral-300 text-sm">{indicator.why}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Optimal Chart Setup */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#6366F1]/10 to-[#3B82F6]/10 p-8 rounded-2xl border border-[#6366F1]/30"
            >
              <h3 className="text-3xl font-bold text-white mb-6">🔥 The Perfect TradingXbert Chart Setup</h3>
              <div className="space-y-4 text-neutral-300">
                <p className="text-lg">
                  <span className="text-white font-bold">For MAXIMUM AI accuracy, use this exact setup:</span>
                </p>
                <div className="bg-white/5 p-6 rounded-xl space-y-3">
                  <p>✅ <span className="text-white font-bold">Timeframe:</span> 15-min or 1-hour charts work best</p>
                  <p>✅ <span className="text-white font-bold">Candlestick Type:</span> Standard Japanese candlesticks</p>
                  <p>✅ <span className="text-white font-bold">Essential Indicators:</span> RSI (14) + MACD + Volume + EMA 9/21</p>
                  <p>✅ <span className="text-white font-bold">Recommended Additions:</span> Bollinger Bands + S/R lines</p>
                  <p>✅ <span className="text-white font-bold">Clean Chart:</span> Remove unnecessary indicators (max 6 total)</p>
                  <p>✅ <span className="text-white font-bold">Screenshot:</span> Include last 50-100 candles for context</p>
                </div>
                <p className="text-emerald-400 font-bold text-lg mt-6">
                  → This setup gives TradingXbert AI the BEST data to provide you with 85%+ accurate trade signals
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* How to Upload Charts */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">How to Upload Charts for Analysis</h2>
          <div className="space-y-6">
            <div className="mb-8">
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop"
                alt="Chart Upload"
                width={800}
                height={400}
                className="w-full rounded-xl"
              />
            </div>
            <div className="space-y-4 text-neutral-300 text-lg">
              <div className="flex items-start gap-4">
                <span className="text-3xl">1️⃣</span>
                <div>
                  <p className="text-white font-bold mb-2">Take a Clean Screenshot</p>
                  <p>Capture your chart with indicators visible. Make sure price action is clear.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-3xl">2️⃣</span>
                <div>
                  <p className="text-white font-bold mb-2">Go to TradingXbert Homepage</p>
                  <p>Click "Upload Chart Image" and select your screenshot.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-3xl">3️⃣</span>
                <div>
                  <p className="text-white font-bold mb-2">Select Market Type</p>
                  <p>Choose Crypto, Forex, Stocks, or Indices for optimized analysis.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-3xl">4️⃣</span>
                <div>
                  <p className="text-white font-bold mb-2">Get Instant AI Analysis</p>
                  <p>Receive trade direction, entry points, stop loss, take profit, and confidence level.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#6366F1]/20 to-[#3B82F6]/20 p-8 rounded-2xl border border-[#6366F1]/30 text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Try TradingXbert AI?</h2>
          <p className="text-xl text-neutral-300 mb-6">Upload your first chart and get instant professional analysis</p>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#6366F1] to-[#3B82F6] text-white font-bold rounded-xl text-lg hover:shadow-xl hover:shadow-[#6366F1]/50 transition-all"
            >
              Analyze Chart Now →
            </motion.button>
          </Link>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-center pt-12 border-t border-white/10"
        >
          <Link href="/how-to-trade/risk-management">
            <motion.button
              whileHover={{ x: -5 }}
              className="px-6 py-3 bg-white/5 text-white rounded-xl border border-white/10 hover:border-[#6366F1]/50 transition-all"
            >
              ← Previous: Risk Management
            </motion.button>
          </Link>
          <Link href="/how-to-trade">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-white/5 text-white rounded-xl border border-white/10 hover:border-[#6366F1]/50 transition-all"
            >
              Back to Courses
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
