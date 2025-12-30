"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface TradePost {
  id: string;
  title: string;
  date: string;
  pair: string;
  type: "LONG" | "SHORT";
  entry: string;
  exit: string;
  profit: string;
  profitPercent: number;
  imageUrl: string;
  analysis: string;
  keyLevels: string[];
  lessons: string[];
}

const tradePosts: TradePost[] = [
  {
    id: "1",
    title: "Perfect Breakout Trade on BTC/USD",
    date: "Dec 28, 2024",
    pair: "BTC/USD",
    type: "LONG",
    entry: "$42,150",
    exit: "$44,890",
    profit: "$2,740",
    profitPercent: 6.5,
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
    analysis: "This was a textbook breakout setup. BTC had been consolidating in a tight range for 3 days between $41,800 and $42,300. Volume was declining during consolidation, which is bullish - it shows sellers are exhausted.\n\nI entered when price broke above $42,300 with a strong 5-minute candle accompanied by 3x average volume. This confirmed buyer interest. Stop loss was placed at $41,700 (below consolidation), giving us a risk:reward of 1:5.",
    keyLevels: [
      "Support: $41,700 - Strong buyer interest",
      "Resistance: $42,300 - Breakout level",
      "Target: $44,800 - Previous high from Dec 15"
    ],
    lessons: [
      "Wait for volume confirmation on breakouts",
      "Consolidation = energy building for big move",
      "Always use previous highs/lows as targets",
      "Don't chase - wait for the setup"
    ]
  },
  {
    id: "2",
    title: "Catching the Reversal on EUR/USD",
    date: "Dec 26, 2024",
    pair: "EUR/USD",
    type: "SHORT",
    entry: "1.1045",
    exit: "1.0912",
    profit: "$1,330",
    profitPercent: 1.2,
    imageUrl: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=800",
    analysis: "EUR/USD showed clear signs of exhaustion at the 1.1050 resistance level. Price formed a double top pattern with bearish divergence on RSI - price made higher high but RSI made lower high.\n\nEntry was triggered on the break below the neckline at 1.1000 with a bearish engulfing candle. Stop loss above the double top at 1.1070. Target was the 200 EMA on 4H chart at 1.0910.",
    keyLevels: [
      "Resistance: 1.1050 - Double top formation",
      "Neckline: 1.1000 - Entry trigger",
      "Support: 1.0910 - 200 EMA target"
    ],
    lessons: [
      "Double tops are powerful reversal patterns",
      "RSI divergence confirms weakness",
      "Wait for neckline break before entering",
      "Moving averages make great targets"
    ]
  },
  {
    id: "3",
    title: "Gold Scalp on Momentum Surge",
    date: "Dec 24, 2024",
    pair: "XAU/USD",
    type: "LONG",
    entry: "$2,048",
    exit: "$2,067",
    profit: "$950",
    profitPercent: 0.9,
    imageUrl: "https://images.unsplash.com/photo-1610375461369-d87386c6fe4f?w=800",
    analysis: "Quick scalp on Gold during news release. Fed minutes showed dovish stance, immediately causing dollar weakness. Gold spiked from consolidation with massive volume.\n\nEntered on the second bullish candle after initial spike (don't chase the first candle!). Used tight stop loss at $2,044. Took profit at psychological level $2,067. Held for only 35 minutes.",
    keyLevels: [
      "Entry: $2,048 - After initial spike consolidation",
      "Stop Loss: $2,044 - Below entry candle low",
      "Take Profit: $2,067 - Psychological resistance"
    ],
    lessons: [
      "Never chase the first news candle",
      "Wait for pullback/consolidation",
      "Use psychological levels as targets",
      "Scalps require tight stops and quick profits"
    ]
  },
  {
    id: "4",
    title: "Failed Trade Analysis: S&P 500",
    date: "Dec 22, 2024",
    pair: "SPX",
    type: "LONG",
    entry: "4,720",
    exit: "4,695",
    profit: "-$250",
    profitPercent: -0.5,
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800",
    analysis: "NOT every trade wins, and that's okay! This was a failed long position. I entered too early before confirmation. Price was trending up but I didn't wait for the pullback to support.\n\nThe lesson: My entry was based on FOMO, not on a solid setup. I saw price moving up and jumped in. Within 20 minutes, price reversed and hit my stop loss. The correct play was to wait for price to pull back to 4,700 support level.",
    keyLevels: [
      "Entry: 4,720 - Too early, mid-trend",
      "Should've waited: 4,700 - Support level",
      "Stop Loss: 4,695 - Below recent low"
    ],
    lessons: [
      "NEVER trade on FOMO (Fear Of Missing Out)",
      "Wait for pullbacks to support in uptrends",
      "Entry timing is EVERYTHING",
      "Taking small losses is part of trading",
      "Learn from mistakes, don't repeat them"
    ]
  }
];

export default function TradeAnalysisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            📊
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] bg-clip-text text-transparent">
            Trade Analysis Blog
          </h1>
          <p className="text-xl text-neutral-300">
            Professional trading insights, market analysis, and educational content for traders. 📊
          </p>
        </motion.div>

        {/* Professional Stats Overview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
          {[
            { label: "Published Articles", value: "47", icon: "📊", color: "from-blue-500 to-cyan-500" },
            { label: "Analysis Accuracy", value: "92%", icon: "✓", color: "from-emerald-500 to-green-500" },
            { label: "Educational Content", value: "2,500+", icon: "📚", color: "from-purple-500 to-pink-500" },
            { label: "Trading Insights", value: "150+", icon: "💡", color: "from-amber-500 to-orange-500" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20 relative overflow-hidden"
            >
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10`}
              />
              <div className="relative">
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-neutral-400 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trade Posts */}
        <div className="space-y-12">
          {tradePosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border border-white/20 overflow-hidden hover:border-[#FFD700]/50 transition-all"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <span
                    className={`px-4 py-2 rounded-full font-black text-sm ${
                      post.type === "LONG"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {post.type}
                  </span>
                  <span
                    className={`px-4 py-2 rounded-full font-black text-sm ${
                      post.profitPercent >= 0
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {post.profitPercent >= 0 ? "+" : ""}{post.profitPercent}%
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-black mb-2">{post.title}</h2>
                    <p className="text-neutral-400">{post.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black">{post.pair}</div>
                    <div
                      className={`text-xl font-black ${
                        post.profitPercent >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {post.profit}
                    </div>
                  </div>
                </div>

                {/* Trade Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="text-sm text-neutral-400 mb-1">Entry</div>
                    <div className="text-xl font-black text-green-400">{post.entry}</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="text-sm text-neutral-400 mb-1">Exit</div>
                    <div className={`text-xl font-black ${post.profitPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {post.exit}
                    </div>
                  </div>
                </div>

                {/* Analysis */}
                <div className="mb-6">
                  <h3 className="text-xl font-black mb-3 flex items-center gap-2">
                    🔍 Analysis
                  </h3>
                  <p className="text-neutral-300 leading-relaxed whitespace-pre-line">
                    {post.analysis}
                  </p>
                </div>

                {/* Key Levels */}
                <div className="mb-6">
                  <h3 className="text-xl font-black mb-3 flex items-center gap-2">
                    🎯 Key Levels
                  </h3>
                  <ul className="space-y-2">
                    {post.keyLevels.map((level, i) => (
                      <li key={i} className="flex items-start gap-2 text-neutral-300">
                        <span className="text-[#FFD700]">•</span>
                        {level}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Lessons */}
                <div className="bg-gradient-to-r from-[#FFD700]/10 to-[#FFA500]/10 rounded-xl p-6 border border-[#FFD700]/30">
                  <h3 className="text-xl font-black mb-3 flex items-center gap-2">
                    💡 Key Lessons
                  </h3>
                  <ul className="space-y-2">
                    {post.lessons.map((lesson, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#FFD700] text-xl">✓</span>
                        <span className="text-neutral-200">{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
            <h2 className="text-4xl font-black mb-4">
              Want AI to analyze YOUR trades?
            </h2>
            <p className="text-xl text-neutral-300 mb-8">
              Upload your charts and get instant AI-powered analysis!
            </p>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-black text-xl rounded-full"
              >
                Analyze My Charts 🚀
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
