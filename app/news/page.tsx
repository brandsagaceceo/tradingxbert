"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Using mock data since we need a free API key
    // You can replace this with actual API call to NewsAPI, Finnhub, or Alpha Vantage
    const mockNews: NewsArticle[] = [
      {
        title: "Bitcoin Surges Past $45,000 as Institutional Interest Grows",
        description: "Cryptocurrency markets rally as major institutions announce increased Bitcoin exposure and regulatory clarity improves.",
        url: "https://news.google.com/search?q=bitcoin",
        publishedAt: new Date().toISOString(),
        source: "Crypto Daily"
      },
      {
        title: "Federal Reserve Signals Potential Rate Cuts in 2024",
        description: "Fed Chair hints at possible interest rate reductions if inflation continues its downward trend, boosting market sentiment.",
        url: "https://news.google.com/search?q=federal+reserve",
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
        source: "Financial Times"
      },
      {
        title: "Tech Stocks Lead Market Rally on Strong AI Earnings",
        description: "Major tech companies beat earnings expectations driven by artificial intelligence revenue growth.",
        url: "https://news.google.com/search?q=tech+stocks",
        publishedAt: new Date(Date.now() - 7200000).toISOString(),
        source: "Bloomberg"
      },
      {
        title: "Gold Prices Hit New Yearly Highs Amid Economic Uncertainty",
        description: "Precious metals rally as investors seek safe-haven assets amid geopolitical tensions and inflation concerns.",
        url: "https://news.google.com/search?q=gold+prices",
        publishedAt: new Date(Date.now() - 10800000).toISOString(),
        source: "Reuters"
      },
      {
        title: "Dollar Weakens Against Major Currencies on Rate Cut Speculation",
        description: "US Dollar index falls to multi-month lows as traders price in potential Federal Reserve policy shifts.",
        url: "https://news.google.com/search?q=dollar+forex",
        publishedAt: new Date(Date.now() - 14400000).toISOString(),
        source: "MarketWatch"
      },
      {
        title: "Oil Prices Surge on Supply Concerns and Rising Demand",
        description: "Crude oil jumps 5% as OPEC+ maintains production cuts and global demand outlook improves.",
        url: "https://news.google.com/search?q=oil+prices",
        publishedAt: new Date(Date.now() - 18000000).toISOString(),
        source: "CNBC"
      }
    ];
    
    setTimeout(() => {
      setNews(mockNews);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0A0F] via-[#1a1a2e] to-[#0f3460] text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            📰
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-[#FFD700] via-white to-[#FFA500] bg-clip-text text-transparent">
            Market News
          </h1>
          <p className="text-xl text-neutral-300">
            Stay updated with the latest financial market news
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-6xl mb-4 inline-block"
            >
              ⚡
            </motion.div>
            <p className="text-xl text-neutral-300">Loading news...</p>
          </div>
        )}

        {/* News Grid */}
        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <motion.a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:border-[#FFD700]/50 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="px-3 py-1 bg-[#FFD700]/20 border border-[#FFD700]/50 rounded-full text-xs font-bold text-[#FFD700]">
                    {article.source}
                  </span>
                  <span className="text-xs text-neutral-400">
                    {new Date(article.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                
                <h2 className="text-xl font-black text-white mb-3 line-clamp-2">
                  {article.title}
                </h2>
                
                <p className="text-sm text-neutral-300 mb-4 line-clamp-3">
                  {article.description}
                </p>
                
                <div className="flex items-center text-[#FFD700] font-bold text-sm">
                  Read more →
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center bg-gradient-to-r from-[#6366F1]/20 to-[#8B5CF6]/20 p-12 rounded-3xl border border-[#6366F1]/50"
        >
          <h2 className="text-3xl font-black mb-4">Want AI Analysis on These News Events?</h2>
          <p className="text-xl text-neutral-300 mb-6">
            Upload charts and get instant AI-powered analysis on how news affects your trades
          </p>
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-black text-xl rounded-full"
          >
            Analyze Chart Now 🚀
          </motion.a>
        </motion.div>
      </div>
    </main>
  );
}
