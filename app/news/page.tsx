"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  category: "crypto" | "stocks" | "forex" | "commodities";
  isNew?: boolean;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [newArticlesCount, setNewArticlesCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showNotification, setShowNotification] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Fetch news from multiple sources
  const fetchNews = useCallback(async () => {
    try {
      // In production, integrate real APIs like:
      // - NewsAPI.org for general financial news
      // - CoinGecko/CryptoCompare for crypto news  
      // - Alpha Vantage for stock market news
      // - Finnhub for real-time market data
      
      const mockNews: NewsArticle[] = [
        {
          title: "Bitcoin Surges Past $45,000 as Institutional Interest Grows",
          description: "Cryptocurrency markets rally as major institutions announce increased Bitcoin exposure and regulatory clarity improves. Trading volumes hit record highs.",
          url: "https://news.google.com/search?q=bitcoin+cryptocurrency",
          publishedAt: new Date().toISOString(),
          source: "Crypto Daily",
          category: "crypto",
          isNew: true
        },
        {
          title: "Federal Reserve Signals Potential Rate Cuts in 2024",
          description: "Fed Chair hints at possible interest rate reductions if inflation continues its downward trend, boosting market sentiment and stock prices.",
          url: "https://news.google.com/search?q=federal+reserve+interest+rates",
          publishedAt: new Date(Date.now() - 3600000).toISOString(),
          source: "Financial Times",
          category: "forex"
        },
        {
          title: "Tech Stocks Lead Market Rally on Strong AI Earnings",
          description: "Major tech companies beat earnings expectations driven by artificial intelligence revenue growth. Nasdaq reaches new all-time highs.",
          url: "https://news.google.com/search?q=tech+stocks+ai+earnings",
          publishedAt: new Date(Date.now() - 7200000).toISOString(),
          source: "Bloomberg",
          category: "stocks"
        },
        {
          title: "Gold Prices Hit New Yearly Highs Amid Economic Uncertainty",
          description: "Precious metals rally as investors seek safe-haven assets amid geopolitical tensions and inflation concerns. Silver also gains momentum.",
          url: "https://news.google.com/search?q=gold+prices+precious+metals",
          publishedAt: new Date(Date.now() - 10800000).toISOString(),
          source: "Reuters",
          category: "commodities"
        },
        {
          title: "Dollar Weakens Against Major Currencies on Rate Cut Speculation",
          description: "US Dollar index falls to multi-month lows as traders price in potential Federal Reserve policy shifts. EUR/USD reaches key resistance.",
          url: "https://news.google.com/search?q=dollar+forex+currency",
          publishedAt: new Date(Date.now() - 14400000).toISOString(),
          source: "MarketWatch",
          category: "forex"
        },
        {
          title: "Oil Prices Surge on Supply Concerns and Rising Demand",
          description: "Crude oil jumps 5% as OPEC+ maintains production cuts and global demand outlook improves. Energy stocks rally on the news.",
          url: "https://news.google.com/search?q=oil+prices+crude+energy",
          publishedAt: new Date(Date.now() - 18000000).toISOString(),
          source: "CNBC",
          category: "commodities"
        },
        {
          title: "S&P 500 Breaks Above 5,000 Milestone on Economic Optimism",
          description: "Major stock index reaches historic level as investors bet on soft economic landing. Market breadth shows healthy participation.",
          url: "https://news.google.com/search?q=sp500+stock+market",
          publishedAt: new Date(Date.now() - 21600000).toISOString(),
          source: "WSJ",
          category: "stocks"
        },
        {
          title: "Ethereum Upgrade Boosts Network Efficiency and Reduces Fees",
          description: "Latest blockchain update improves transaction speeds and lowers costs. ETH price rallies on successful implementation.",
          url: "https://news.google.com/search?q=ethereum+crypto+blockchain",
          publishedAt: new Date(Date.now() - 25200000).toISOString(),
          source: "CoinDesk",
          category: "crypto"
        },
        {
          title: "Chinese Markets Rally on New Economic Stimulus Package",
          description: "Shanghai Composite jumps 3% as government announces targeted support measures. Asian markets follow suit with gains.",
          url: "https://news.google.com/search?q=china+market+stimulus",
          publishedAt: new Date(Date.now() - 28800000).toISOString(),
          source: "Asia Times",
          category: "stocks"
        }
      ];
      
      // Check for new articles
      const existingTitles = news.map(n => n.title);
      const newArticles = mockNews.filter(article => !existingTitles.includes(article.title));
      
      if (newArticles.length > 0 && news.length > 0) {
        setNewArticlesCount(newArticles.length);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 5000);
      }
      
      setNews(mockNews);
      setLastUpdate(new Date());
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch news:", error);
      setLoading(false);
    }
  }, [news]);

  // Initial fetch
  useEffect(() => {
    fetchNews();
  }, []);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNews();
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, [fetchNews]);

  const categories = [
    { id: "all", label: "All News", icon: "📰" },
    { id: "crypto", label: "Crypto", icon: "₿" },
    { id: "stocks", label: "Stocks", icon: "📈" },
    { id: "forex", label: "Forex", icon: "💱" },
    { id: "commodities", label: "Commodities", icon: "🛢️" }
  ];

  const filteredNews = selectedCategory === "all" 
    ? news 
    : news.filter(article => article.category === selectedCategory);

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
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] rounded-full blur-3xl"
        />
      </div>

      {/* New Articles Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-8 py-4 rounded-full shadow-2xl shadow-[#6366F1]/50 border border-white/20"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-2xl"
              >
                🔔
              </motion.div>
              <div className="font-bold">
                {newArticlesCount} New Article{newArticlesCount > 1 ? 's' : ''} Added!
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            📰
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-[#6366F1] via-white to-[#8B5CF6] bg-clip-text text-transparent">
            Live Market News
          </h1>
          <p className="text-xl text-neutral-300 mb-4">
            Real-time updates on financial markets • Auto-refreshing every 5 minutes
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-neutral-400">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-green-500 rounded-full"
            />
            <span>Live • Last updated: {lastUpdate.toLocaleTimeString()}</span>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-bold transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white shadow-lg shadow-[#6366F1]/50'
                  : 'bg-white/10 text-neutral-300 hover:bg-white/20'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Auto-refresh Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-8"
        >
          <button
            onClick={fetchNews}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-semibold transition-all border border-white/20 hover:border-[#6366F1]/50"
          >
            <span className="mr-2">🔄</span>
            Refresh Now
          </button>
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
            {filteredNews.map((article, index) => (
              <motion.a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border p-6 hover:border-[#6366F1]/50 transition-all cursor-pointer relative overflow-hidden ${
                  article.isNew ? 'border-[#6366F1]' : 'border-white/20'
                }`}
              >
                {article.isNew && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full text-xs font-black"
                  >
                    NEW
                  </motion.div>
                )}

                <div className="flex items-start justify-between mb-3">
                  <span className="px-3 py-1 bg-[#6366F1]/20 border border-[#6366F1]/50 rounded-full text-xs font-bold text-[#6366F1]">
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
                
                <div className="flex items-center text-[#6366F1] font-bold text-sm">
                  Read more →
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredNews.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No news in this category yet</h3>
            <p className="text-neutral-400">Try selecting a different category</p>
          </motion.div>
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
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-black text-xl rounded-full shadow-lg shadow-[#6366F1]/50"
          >
            Analyze Chart Now 🚀
          </motion.a>
        </motion.div>
      </div>
    </main>
  );
}
