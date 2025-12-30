"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import LiveStockTicker from "@/components/LiveStockTicker";
import FearGreedIndex from "@/components/FearGreedIndex";
import Image from "next/image";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  category: "crypto" | "stocks" | "forex" | "commodities";
  isNew?: boolean;
  image: string;
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
          title: "Bitcoin Rallies to $96,000 as ETF Inflows Hit Record Highs",
          description: "Bitcoin continues its historic bull run as spot Bitcoin ETFs see unprecedented institutional demand. Major banks increase crypto exposure amid regulatory clarity.",
          url: "https://news.google.com/search?q=bitcoin+cryptocurrency",
          publishedAt: new Date().toISOString(),
          source: "Crypto Daily",
          category: "crypto",
          isNew: true,
          image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=500&fit=crop"
        },
        {
          title: "Fed Holds Rates Steady as Inflation Nears 2% Target",
          description: "Federal Reserve maintains current interest rate policy as inflation metrics show continued progress toward target. Markets rally on dovish outlook for 2026.",
          url: "https://news.google.com/search?q=federal+reserve+interest+rates",
          publishedAt: new Date(Date.now() - 3600000).toISOString(),
          source: "Financial Times",
          category: "forex",
          image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=500&fit=crop"
        },
        {
          title: "NVIDIA Stock Surges Above $870 on AI Chip Dominance",
          description: "NVIDIA reaches new all-time highs as demand for AI processors remains insatiable. Q4 earnings exceed analyst expectations by 28%, driving tech sector rally.",
          url: "https://news.google.com/search?q=nvidia+stock+ai",
          publishedAt: new Date(Date.now() - 7200000).toISOString(),
          source: "Bloomberg",
          category: "stocks",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop"
        },
        {
          title: "Gold Breaks $2,600 as Global Uncertainty Drives Safe-Haven Demand",
          description: "Precious metals rally as investors seek protection amid geopolitical tensions. Central banks continue accumulating gold reserves at fastest pace since 1967.",
          url: "https://news.google.com/search?q=gold+prices+precious+metals",
          publishedAt: new Date(Date.now() - 10800000).toISOString(),
          source: "Reuters",
          category: "commodities",
          image: "https://images.unsplash.com/photo-1610375461369-d613b564f4c4?w=800&h=500&fit=crop"
        },
        {
          title: "S&P 500 Closes Above 5,800 for First Time Ever",
          description: "Major stock index reaches unprecedented heights as corporate earnings beat expectations. Technology and financial sectors lead broad-based market gains.",
          url: "https://news.google.com/search?q=sp500+stock+market+record",
          publishedAt: new Date(Date.now() - 14400000).toISOString(),
          source: "MarketWatch",
          category: "stocks",
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop"
        },
        {
          title: "Crude Oil Jumps to $71 as OPEC+ Extends Production Cuts",
          description: "Energy markets rally as major oil producers announce extended output restrictions through Q2 2026. Analysts forecast continued supply tightness.",
          url: "https://news.google.com/search?q=oil+prices+opec",
          publishedAt: new Date(Date.now() - 18000000).toISOString(),
          source: "CNBC",
          category: "commodities",
          image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=500&fit=crop"
        },
        {
          title: "Ethereum Climbs Above $3,400 Following Major Network Upgrade",
          description: "ETH surges on successful Dencun upgrade implementation. Layer-2 transaction costs drop 90% as network scalability improvements exceed expectations.",
          url: "https://news.google.com/search?q=ethereum+upgrade+crypto",
          publishedAt: new Date(Date.now() - 21600000).toISOString(),
          source: "CoinDesk",
          category: "crypto",
          image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=500&fit=crop"
        },
        {
          title: "Apple Stock Hits $194 on Strong iPhone 16 Sales",
          description: "Apple shares reach new highs as holiday quarter iPhone sales exceed projections. Services revenue growth accelerates with Apple Intelligence features.",
          url: "https://news.google.com/search?q=apple+stock+iphone",
          publishedAt: new Date(Date.now() - 25200000).toISOString(),
          source: "WSJ",
          category: "stocks",
          image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop"
        },
        {
          title: "Tesla Stock Down 3.5% Despite Record EV Deliveries",
          description: "Tesla shares slide as investors take profits after strong Q4 delivery numbers. Stock remains up 45% year-to-date on Cybertruck success.",
          url: "https://news.google.com/search?q=tesla+stock+deliveries",
          publishedAt: new Date(Date.now() - 28800000).toISOString(),
          source: "MarketWatch",
          category: "stocks",
          image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop"
        },
        {
          title: "XRP Soars 850% Year-Over-Year as SEC Case Concludes",
          description: "Ripple's XRP token rallies to $2.47 following final resolution of SEC lawsuit. Institutional adoption accelerates with regulatory clarity.",
          url: "https://news.google.com/search?q=xrp+ripple+sec",
          publishedAt: new Date(Date.now() - 32400000).toISOString(),
          source: "CoinTelegraph",
          category: "crypto",
          image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=500&fit=crop"
        },
        {
          title: "Microsoft Reaches $414 on Azure AI Revenue Surge",
          description: "Microsoft stock gains as cloud AI services drive 35% year-over-year revenue growth. Enterprise adoption of Copilot exceeds forecasts.",
          url: "https://news.google.com/search?q=microsoft+stock+azure+ai",
          publishedAt: new Date(Date.now() - 36000000).toISOString(),
          source: "Bloomberg",
          category: "stocks",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop"
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

      {/* Live Stock Ticker - Full Width at Top */}
      <div className="relative z-20">
        <LiveStockTicker />
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

        {/* Market Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Fear & Greed Index */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <FearGreedIndex />
          </motion.div>

          {/* Featured Image - Trading Floor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="relative h-full rounded-2xl overflow-hidden border-2 border-[#6366F1]/30 shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=400&fit=crop"
                alt="Trading floor"
                width={1200}
                height={400}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-black text-white mb-2">Market Analysis & Insights</h3>
                <p className="text-neutral-300">Professional trading analysis powered by AI</p>
              </div>
            </div>
          </motion.div>
        </div>

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
                className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border hover:border-[#6366F1]/50 transition-all cursor-pointer relative overflow-hidden ${
                  article.isNew ? 'border-[#6366F1]' : 'border-white/20'
                }`}
              >
                {article.isNew && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 z-10 px-3 py-1 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full text-xs font-black"
                  >
                    NEW
                  </motion.div>
                )}

                {/* Article Image */}
                <div className="relative h-48 w-full mb-4 rounded-xl overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={800}
                    height={500}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Category Badge on Image */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-[#6366F1]/90 backdrop-blur-sm border border-white/20 rounded-full text-xs font-bold text-white">
                      {article.category.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="px-2">
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
