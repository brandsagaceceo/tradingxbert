"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface TrendingArticle {
  title: string;
  views: string;
  trend: "🔥" | "📈" | "⚡";
  category: string;
}

export default function TrendingNews() {
  const [trending, setTrending] = useState<TrendingArticle[]>([
    { title: "Bitcoin Rallies to $88K", views: "45.2K", trend: "🔥", category: "Crypto" },
    { title: "NVIDIA Hits New ATH", views: "38.5K", trend: "🔥", category: "Stocks" },
    { title: "Fed Holds Rates Steady", views: "32.1K", trend: "📈", category: "Forex" },
    { title: "Gold Breaks $2,600", views: "28.7K", trend: "⚡", category: "Commodities" },
    { title: "S&P 500 Record High", views: "25.3K", trend: "📈", category: "Stocks" }
  ]);

  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-black text-white">🔥 Trending Now</h3>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="px-3 py-1 bg-red-500/20 border border-red-500/50 rounded-full text-xs font-bold text-red-400"
        >
          LIVE
        </motion.div>
      </div>
      
      <div className="space-y-3">
        {trending.map((article, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
            className="bg-black/30 rounded-xl p-4 border border-white/5 hover:border-[#6366F1]/50 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <motion.span 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-2xl"
                >
                  {article.trend}
                </motion.span>
                <div className="flex-1">
                  <h4 className="text-white font-bold mb-1 group-hover:text-[#6366F1] transition-colors">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-400">{article.category}</span>
                    <span className="text-xs text-neutral-600">•</span>
                    <span className="text-xs text-neutral-400">{article.views} views</span>
                  </div>
                </div>
              </div>
              <span className="text-neutral-600 text-sm">#{i + 1}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
