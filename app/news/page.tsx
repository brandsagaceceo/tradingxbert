"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import LiveStockTicker from "@/components/LiveStockTicker";
import FearGreedIndex from "@/components/FearGreedIndex";
import MarketHeatmap from "@/components/MarketHeatmap";
import ProfessionalChart from "@/components/ProfessionalChart";
import TopMovers from "@/components/TopMovers";
import TradingInsights from "@/components/TradingInsights";
import EconomicCalendar from "@/components/EconomicCalendar";
import PopularAssets from "@/components/PopularAssets";
import SectorPerformance from "@/components/SectorPerformance";
import GlobalIndices from "@/components/GlobalIndices";
import TrendingNews from "@/components/TrendingNews";
import NewsShareButtons from "@/components/NewsShareButtons";
import EmailNotificationPopup from "@/components/EmailNotificationPopup";
import BTCFactsSidebar from "@/components/BTCFactsSidebar";
import Watchlist from "@/components/Watchlist";
import MarketStats from "@/components/MarketStats";
import ServiceBanners from "@/components/ServiceBanners";
import Image from "next/image";
import Link from "next/link";

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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'CAD'>('USD');
  
  // USD to CAD exchange rate (approximate)
  const CAD_RATE = 1.35;
  
  // Format numbers with spaces instead of commas
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

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
          title: "Bitcoin Rallies to $88,000 as ETF Inflows Hit Record Highs",
          description: "Bitcoin maintains strong momentum as spot Bitcoin ETFs see unprecedented institutional demand. Major banks increase crypto exposure amid regulatory clarity.",
          url: "https://news.google.com/search?q=bitcoin+cryptocurrency",
          publishedAt: new Date().toISOString(),
          source: "Crypto Daily",
          category: "crypto",
          isNew: true,
          image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=500&fit=crop&q=80"
        },
        {
          title: "Fed Holds Rates Steady as Inflation Nears 2% Target",
          description: "Federal Reserve maintains current interest rate policy as inflation metrics show continued progress toward target. Markets rally on dovish outlook for 2026.",
          url: "https://news.google.com/search?q=federal+reserve+interest+rates",
          publishedAt: new Date(Date.now() - 3600000).toISOString(),
          source: "Financial Times",
          category: "forex",
          image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop&q=80"
        },
        {
          title: "NVIDIA Stock Surges Above $870 on AI Chip Dominance",
          description: "NVIDIA reaches new all-time highs as demand for AI processors remains insatiable. Q4 earnings exceed analyst expectations by 28%, driving tech sector rally.",
          url: "https://news.google.com/search?q=nvidia+stock+ai",
          publishedAt: new Date(Date.now() - 7200000).toISOString(),
          source: "Bloomberg",
          category: "stocks",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&q=80"
        },
        {
          title: "Gold Breaks $2,600 as Global Uncertainty Drives Safe-Haven Demand",
          description: "Precious metals rally as investors seek protection amid geopolitical tensions. Central banks continue accumulating gold reserves at fastest pace since 1967.",
          url: "https://news.google.com/search?q=gold+prices+precious+metals",
          publishedAt: new Date(Date.now() - 10800000).toISOString(),
          source: "Reuters",
          category: "commodities",
          image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&h=500&fit=crop&q=80"
        },
        {
          title: "S&P 500 Closes Above 5,800 for First Time Ever",
          description: "Major stock index reaches unprecedented heights as corporate earnings beat expectations. Technology and financial sectors lead broad-based market gains.",
          url: "https://news.google.com/search?q=sp500+stock+market+record",
          publishedAt: new Date(Date.now() - 14400000).toISOString(),
          source: "MarketWatch",
          category: "stocks",
          image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=500&fit=crop&q=80"
        },
        {
          title: "Crude Oil Jumps to $71 as OPEC+ Extends Production Cuts",
          description: "Energy markets rally as major oil producers announce extended output restrictions through Q2 2026. Analysts forecast continued supply tightness.",
          url: "https://news.google.com/search?q=oil+prices+opec",
          publishedAt: new Date(Date.now() - 18000000).toISOString(),
          source: "CNBC",
          category: "commodities",
          image: "https://images.unsplash.com/photo-1541844053589-346841d0b34c?w=800&h=500&fit=crop&q=80"
        },
        {
          title: "Ethereum Climbs Above $3,400 Following Major Network Upgrade",
          description: "ETH surges on successful Dencun upgrade implementation. Layer-2 transaction costs drop 90% as network scalability improvements exceed expectations.",
          url: "https://news.google.com/search?q=ethereum+upgrade+crypto",
          publishedAt: new Date(Date.now() - 21600000).toISOString(),
          source: "CoinDesk",
          category: "crypto",
          image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800&h=500&fit=crop&q=80"
        },
        {
          title: "Apple Stock Hits $194 on Strong iPhone 16 Sales",
          description: "Apple shares reach new highs as holiday quarter iPhone sales exceed projections. Services revenue growth accelerates with Apple Intelligence features.",
          url: "https://news.google.com/search?q=apple+stock+iphone",
          publishedAt: new Date(Date.now() - 25200000).toISOString(),
          source: "WSJ",
          category: "stocks",
          image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&h=500&fit=crop&q=80"
        },
        {
          title: "Tesla Stock Down 3.5% Despite Record EV Deliveries",
          description: "Tesla shares slide as investors take profits after strong Q4 delivery numbers. Stock remains up 45% year-to-date on Cybertruck success.",
          url: "https://news.google.com/search?q=tesla+stock+deliveries",
          publishedAt: new Date(Date.now() - 28800000).toISOString(),
          source: "MarketWatch",
          category: "stocks",
          image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=500&fit=crop&q=80"
        },
        {
          title: "XRP Soars 850% Year-Over-Year as SEC Case Concludes",
          description: "Ripple's XRP token rallies to $2.47 following final resolution of SEC lawsuit. Institutional adoption accelerates with regulatory clarity.",
          url: "https://news.google.com/search?q=xrp+ripple+sec",
          publishedAt: new Date(Date.now() - 32400000).toISOString(),
          source: "CoinTelegraph",
          category: "crypto",
          image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&h=500&fit=crop&q=80"
        },
        {
          title: "Microsoft Reaches $414 on Azure AI Revenue Surge",
          description: "Microsoft stock gains as cloud AI services drive 35% year-over-year revenue growth. Enterprise adoption of Copilot exceeds forecasts.",
          url: "https://news.google.com/search?q=microsoft+stock+azure+ai",
          publishedAt: new Date(Date.now() - 36000000).toISOString(),
          source: "Bloomberg",
          category: "stocks",
          image: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=800&h=500&fit=crop&q=80"
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

  // Manual refresh handler
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchNews();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Scroll to news section
  const scrollToNews = () => {
    const newsSection = document.getElementById('news');
    if (newsSection) {
      newsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Convert price based on currency
  const convertPrice = (usdPrice: number): string => {
    if (currency === 'CAD') {
      return (usdPrice * CAD_RATE).toFixed(2);
    }
    return usdPrice.toFixed(2);
  };

  // Format price with currency symbol
  const formatPrice = (usdPrice: number): string => {
    const price = currency === 'CAD' ? usdPrice * CAD_RATE : usdPrice;
    const formatted = formatNumber(Math.round(price));
    return currency === 'CAD' ? `C$${formatted}` : `$${formatted}`;
  };

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
        <LiveStockTicker currency={currency} />
      </div>

      {/* New Articles Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="md:fixed relative top-0 md:top-24 left-0 md:left-1/2 md:-translate-x-1/2 z-50 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-4 md:px-8 py-3 md:py-4 rounded-full shadow-2xl shadow-[#6366F1]/50 border border-white/20 mx-4 md:mx-0 mb-4 md:mb-0"
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
        {/* Breaking News Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500/50 rounded-2xl p-3 md:p-4 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 md:gap-4">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="px-2 md:px-4 py-1 md:py-2 bg-red-500 rounded-lg text-white font-black text-xs md:text-sm whitespace-nowrap"
            >
              🚨 BREAKING
            </motion.div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-xs md:text-base truncate md:whitespace-normal">
                Bitcoin Surges to $96K • S&P 500 Reaches 5,850 • Tech Stocks Rally
              </p>
            </div>
            <button 
              onClick={scrollToNews}
              className="hidden md:block px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold transition-all whitespace-nowrap hover:scale-105"
            >
              View All →
            </button>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-5xl md:text-6xl mb-4"
          >
            📰
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black mb-3 bg-gradient-to-r from-[#6366F1] via-white to-[#8B5CF6] bg-clip-text text-transparent">
            Live Market Intelligence
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 mb-4">
            Real-time market data, news & analysis • Professional trading terminal
          </p>
          
          {/* Currency Switcher */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-sm text-neutral-400">Currency:</span>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                currency === 'USD' 
                  ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white shadow-lg shadow-[#6366F1]/50' 
                  : 'bg-white/10 text-neutral-400 hover:bg-white/20'
              }`}
            >
              🇺🇸 USD
            </button>
            <button
              onClick={() => setCurrency('CAD')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                currency === 'CAD' 
                  ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white shadow-lg shadow-[#6366F1]/50' 
                  : 'bg-white/10 text-neutral-400 hover:bg-white/20'
              }`}
            >
              🇨🇦 CAD
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-4 text-sm text-neutral-400 flex-wrap">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-green-500 rounded-full"
              />
              <span>Live • Updated {lastUpdate.toLocaleTimeString()}</span>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-all disabled:opacity-50 flex items-center gap-2"
            >
              <span>🔄</span>
              <span className="hidden sm:inline">{isRefreshing ? 'Refreshing...' : 'Refresh Now'}</span>
            </button>
          </div>
        </motion.div>

        {/* Quick Stats Bar - Clickable */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open('https://www.tradingview.com/symbols/BTCUSD/', '_blank')}
            className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 hover:border-green-500/60 rounded-xl p-4 transition-all cursor-pointer text-left"
          >
            <div className="text-xs text-green-400 font-semibold mb-1">Bitcoin</div>
            <div className="text-xl md:text-2xl font-black text-white">{formatPrice(88000)}</div>
            <div className="text-sm text-green-400">+4.43% 📈</div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open('https://www.tradingview.com/symbols/SPX/', '_blank')}
            className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 hover:border-blue-500/60 rounded-xl p-4 transition-all cursor-pointer text-left"
          >
            <div className="text-xs text-blue-400 font-semibold mb-1">S&P 500</div>
            <div className="text-xl md:text-2xl font-black text-white">5,881</div>
            <div className="text-sm text-green-400">+1.18% 📊</div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open('https://www.tradingview.com/symbols/ETHUSD/', '_blank')}
            className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 hover:border-purple-500/60 rounded-xl p-4 transition-all cursor-pointer text-left"
          >
            <div className="text-xs text-purple-400 font-semibold mb-1">Ethereum</div>
            <div className="text-xl md:text-2xl font-black text-white">{formatPrice(3421)}</div>
            <div className="text-sm text-green-400">+3.76% 🚀</div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open('https://www.tradingview.com/symbols/XAUUSD/', '_blank')}
            className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 hover:border-amber-500/60 rounded-xl p-4 transition-all cursor-pointer text-left"
          >
            <div className="text-xs text-amber-400 font-semibold mb-1">Gold</div>
            <div className="text-xl md:text-2xl font-black text-white">{formatPrice(2631)}</div>
            <div className="text-sm text-green-400">+0.13% 💰</div>
          </motion.button>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide"
        >
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'charts', label: 'Charts', icon: '📈' },
            { id: 'news', label: 'News', icon: '📰' },
            { id: 'analysis', label: 'Analysis', icon: '🔍' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                const element = document.getElementById(tab.id);
                element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#6366F1]/50 rounded-xl font-semibold whitespace-nowrap transition-all flex items-center gap-2"
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Market Overview Section with Sidebars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left Sidebar - Market Sentiment & BTC Facts */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            {/* Market Sentiment Widget */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] rounded-2xl border-2 border-[#6366F1]/30 p-6 shadow-xl overflow-hidden relative"
            >
              <div className="relative z-10">
                <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">🧠</span>
                  Market Sentiment
                </h3>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-emerald-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-neutral-300">Overall Market</span>
                      <span className="text-emerald-400 font-black text-lg">🟢 Bullish</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "73%" }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full"
                      />
                    </div>
                    <div className="text-xs text-neutral-400 mt-1">73% Bullish</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <span>₿</span>
                        <span className="text-sm">Crypto</span>
                      </div>
                      <span className="text-emerald-400 text-sm font-bold">+85%</span>
                    </div>
                    <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <span>📈</span>
                        <span className="text-sm">Stocks</span>
                      </div>
                      <span className="text-emerald-400 text-sm font-bold">+68%</span>
                    </div>
                    <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <span>💱</span>
                        <span className="text-sm">Forex</span>
                      </div>
                      <span className="text-amber-400 text-sm font-bold">+52%</span>
                    </div>
                    <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <span>🛢️</span>
                        <span className="text-sm">Commodities</span>
                      </div>
                      <span className="text-emerald-400 text-sm font-bold">+61%</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <div className="text-xs text-neutral-400 mb-2">Trending Keywords</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-md text-xs text-emerald-400">AI Rally</span>
                      <span className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded-md text-xs text-blue-400">ETF Inflow</span>
                      <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded-md text-xs text-purple-400">Fed Policy</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <BTCFactsSidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6">
            <div id="overview" className="scroll-mt-32 space-y-6">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-black text-white mb-6 flex items-center gap-3"
              >
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  📊
                </motion.span>
                <span>Market Overview</span>
              </motion.h2>
              
              {/* Market Heatmap - Featured */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <MarketHeatmap />
              </motion.div>

              {/* Top Movers and Fear & Greed */}
              <div className="grid grid-cols-1 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <TopMovers />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <FearGreedIndex />
                </motion.div>
              </div>

              {/* Sector Performance and Global Indices */}
              <div className="grid grid-cols-1 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <SectorPerformance />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <GlobalIndices />
                </motion.div>
              </div>
            </div>

            {/* Professional Charts Section */}
            <div id="charts" className="scroll-mt-32 space-y-6 mt-12">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-black text-white mb-6 flex items-center gap-3"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  📈
                </motion.span>
                <span>Live Charts</span>
              </motion.h2>
              
              {/* Primary Charts Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <ProfessionalChart symbol="BTCUSD" title="Bitcoin" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <ProfessionalChart symbol="SPX" title="S&P 500" />
                </motion.div>
              </div>

              {/* Secondary Charts Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <ProfessionalChart symbol="ETH" title="Ethereum" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <ProfessionalChart symbol="AAPL" title="Apple" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <ProfessionalChart symbol="NVDA" title="NVIDIA" />
                </motion.div>
              </div>

              {/* Trending News */}
              <div className="mt-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <TrendingNews />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Multiple Widgets */}
          <div className="lg:col-span-3 space-y-6">
            {/* Trading Insights */}
            <TradingInsights />
            
            {/* Watchlist */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Watchlist />
            </motion.div>
            
            {/* Economic Calendar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <EconomicCalendar />
            </motion.div>
            
            {/* Market Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <MarketStats />
            </motion.div>
            
            {/* Popular Assets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <PopularAssets />
            </motion.div>
            
            {/* Service Banners */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <ServiceBanners />
            </motion.div>
          </div>
        </div>

        {/* News Articles Section with Sidebar */}
        <div id="news" className="scroll-mt-32 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* News Category Sidebar */}
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sticky top-24">
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                  <span>📰</span>
                  <span>Categories</span>
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-3 ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white shadow-lg shadow-[#6366F1]/30'
                          : 'bg-white/5 text-neutral-300 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      <span className="text-xl">{category.icon}</span>
                      <span>{category.label}</span>
                      <span className="ml-auto text-xs opacity-60">
                        {news.filter(n => category.id === 'all' || n.category === category.id).length}
                      </span>
                    </motion.button>
                  ))}
                </div>
                
                {/* Live Indicator */}
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 bg-green-500 rounded-full"
                    />
                    <span className="text-green-400 font-bold text-sm">Live Updates</span>
                  </div>
                  <p className="text-xs text-neutral-400">Auto-refreshing every 5 minutes</p>
                </div>
              </div>
            </div>

            {/* News Grid */}
            <div className="lg:col-span-9">
              <div className="mb-6">
                <h2 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
                  <span>📰</span>
                  <span>Latest Market News</span>
                </h2>
                <p className="text-neutral-400">{filteredNews.length} breaking stories from top financial sources</p>
              </div>

        {/* Analysis Section */}
        <div id="analysis" className="scroll-mt-32 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#6366F1]/10 to-[#8B5CF6]/10 rounded-3xl border-2 border-[#6366F1]/30 p-8"
          >
            <h2 className="text-3xl font-black text-white mb-4 flex items-center gap-3">
              <span>🔍</span>
              <span>Market Analysis</span>
            </h2>
            <p className="text-neutral-300 mb-6">
              Professional insights and trading signals powered by AI
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-[#6366F1]/50 transition-all cursor-pointer"
                >
                  <div className="text-4xl mb-3">🤖</div>
                  <h3 className="text-xl font-bold text-white mb-2">AI Chart Analysis</h3>
                  <p className="text-neutral-400 text-sm mb-4">
                    Upload any trading chart and get instant AI-powered analysis with entry/exit points
                  </p>
                  <div className="text-[#6366F1] font-bold flex items-center gap-2">
                    Analyze Now →
                  </div>
                </motion.div>
              </Link>
              <Link href="/journal">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-[#6366F1]/50 transition-all cursor-pointer"
                >
                  <div className="text-4xl mb-3">📓</div>
                  <h3 className="text-xl font-bold text-white mb-2">Trading Journal</h3>
                  <p className="text-neutral-400 text-sm mb-4">
                    Track your trades, analyze performance, and improve your strategy with detailed insights
                  </p>
                  <div className="text-[#6366F1] font-bold flex items-center gap-2">
                    View Journal →
                  </div>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>



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

              {/* News Articles Grid */}
              {!loading && (
                <div className="grid md:grid-cols-2 gap-6">
                {filteredNews.map((article, index) => (
                  <motion.a
                    key={index}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="group bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-[#6366F1]/50 transition-all overflow-hidden"
                  >
                    {/* Professional Article Image */}
                    <div className="relative h-56 w-full overflow-hidden bg-neutral-900">
                      <Image
                        src={article.image}
                        alt={article.title}
                        width={800}
                        height={500}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                      
                      {/* NEW Badge */}
                      {article.isNew && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-red-600 rounded-lg text-xs font-black shadow-lg"
                        >
                          🔴 LIVE
                        </motion.div>
                      )}
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-[#6366F1]/90 backdrop-blur-sm border border-white/20 rounded-full text-xs font-bold text-white">
                      {article.category.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-3 py-1 bg-[#6366F1]/20 border border-[#6366F1]/50 rounded-full text-xs font-bold text-[#6366F1]">
                      {article.source}
                    </span>
                    <span className="text-xs text-neutral-400">
                      {new Date(article.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-black text-white mb-3 line-clamp-2 group-hover:text-[#6366F1] transition-colors break-words">
                    {article.title}
                  </h2>
                  
                  <p className="text-sm text-neutral-300 mb-4 line-clamp-3 break-words">
                    {article.description}
                  </p>
                  
                  {/* Share and Views Section */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <NewsShareButtons title={article.title} url={article.url} />
                    <div className="flex items-center gap-4 text-xs text-neutral-400">
                      <span className="flex items-center gap-1">
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          👁️
                        </motion.span>
                        {(Math.random() * 50 + 10).toFixed(1)}K
                      </span>
                      <span className="flex items-center gap-1">
                        📤 {(Math.random() * 5 + 1).toFixed(1)}K
                      </span>
                    </div>
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
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 grid md:grid-cols-2 gap-8"
        >
          {/* AI Analysis CTA */}
          <div className="text-center bg-gradient-to-r from-[#6366F1]/20 to-[#8B5CF6]/20 p-8 rounded-3xl border border-[#6366F1]/50">
            <div className="text-5xl mb-4">🤖</div>
            <h2 className="text-2xl font-black mb-3">AI Chart Analysis</h2>
            <p className="text-neutral-300 mb-6">
              Upload charts and get instant AI-powered analysis on how news affects your trades
            </p>
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-black rounded-full shadow-lg shadow-[#6366F1]/50"
            >
              Analyze Now 🚀
            </motion.a>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-r from-[#EC4899]/20 to-[#8B5CF6]/20 p-8 rounded-3xl border border-[#EC4899]/50">
            <div className="text-5xl mb-4">📧</div>
            <h2 className="text-2xl font-black mb-3">Daily Market Digest</h2>
            <p className="text-neutral-300 mb-6">
              Get the top market stories delivered to your inbox every morning
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 bg-black/40 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#EC4899]"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] text-white font-black rounded-lg hover:scale-105 transition-transform">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-neutral-400 mt-3">
              ✓ Free forever • ✓ Unsubscribe anytime • ✓ No spam
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Email Notification Popup */}
      <EmailNotificationPopup />
    </main>
  );
}
