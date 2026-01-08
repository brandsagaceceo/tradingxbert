"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function TradingInsights() {
  const [insights, setInsights] = useState([
    {
      title: "Bitcoin Breaking Resistance",
      description: "BTC testing $100K level with strong volume",
      time: "2 min ago",
      sentiment: "bullish",
      icon: "🚀"
    },
    {
      title: "Tech Sector Rally",
      description: "NASDAQ up 2% on AI optimism",
      time: "15 min ago",
      sentiment: "bullish",
      icon: "💻"
    },
    {
      title: "Gold Consolidating",
      description: "Waiting for Fed decision",
      time: "1 hour ago",
      sentiment: "neutral",
      icon: "⚠️"
    },
    {
      title: "Oil Prices Decline",
      description: "OPEC+ supply concerns ease",
      time: "2 hours ago",
      sentiment: "bearish",
      icon: "📉"
    }
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] rounded-2xl border-2 border-[#6366F1]/30 p-6 shadow-xl sticky top-24"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black text-white flex items-center gap-2">
          <span className="text-2xl">💡</span>
          Trading Insights
        </h3>
        <div className="flex items-center gap-1.5 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/50">
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-emerald-500 rounded-full"
          />
          <span className="text-xs font-bold text-emerald-400">LIVE</span>
        </div>
      </div>

      <div className="space-y-3">
        {insights.map((insight, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.02, x: 4 }}
            className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-[#6366F1]/50 transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                className="text-2xl"
              >
                {insight.icon}
              </motion.div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white mb-1 group-hover:text-[#6366F1] transition-colors">
                  {insight.title}
                </h4>
                <p className="text-xs text-neutral-400 mb-2">{insight.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-500">{insight.time}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    insight.sentiment === 'bullish' ? 'bg-emerald-500/20 text-emerald-400' :
                    insight.sentiment === 'bearish' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {insight.sentiment.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Link href="/news">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-4 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all"
        >
          View All Insights →
        </motion.button>
      </Link>
    </motion.div>
  );
}
