"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Market {
  symbol: string;
  name: string;
  emoji: string;
  category: "crypto" | "stocks" | "forex" | "indices";
}

const POPULAR_MARKETS: Market[] = [
  { symbol: "BTC", name: "Bitcoin", emoji: "₿", category: "crypto" },
  { symbol: "ETH", name: "Ethereum", emoji: "⟠", category: "crypto" },
  { symbol: "SOL", name: "Solana", emoji: "◎", category: "crypto" },
  { symbol: "AAPL", name: "Apple", emoji: "🍎", category: "stocks" },
  { symbol: "TSLA", name: "Tesla", emoji: "🚗", category: "stocks" },
  { symbol: "NVDA", name: "NVIDIA", emoji: "🎮", category: "stocks" },
  { symbol: "EURUSD", name: "EUR/USD", emoji: "💱", category: "forex" },
  { symbol: "GBPUSD", name: "GBP/USD", emoji: "💷", category: "forex" },
  { symbol: "SPX", name: "S&P 500", emoji: "📊", category: "indices" },
  { symbol: "NASDAQ", name: "NASDAQ", emoji: "💹", category: "indices" },
];

export default function MarketsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const router = useRouter();

  const categories = [
    { id: "all", label: "All Markets", emoji: "🌐" },
    { id: "crypto", label: "Crypto", emoji: "₿" },
    { id: "stocks", label: "Stocks", emoji: "📈" },
    { id: "forex", label: "Forex", emoji: "💱" },
    { id: "indices", label: "Indices", emoji: "📊" },
  ];

  const filteredMarkets = POPULAR_MARKETS.filter((market) => {
    const matchesCategory = selectedCategory === "all" || market.category === selectedCategory;
    const matchesSearch = 
      market.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      market.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAnalyze = (symbol: string) => {
    router.push("/?symbol=" + encodeURIComponent(symbol));
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-12 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-6xl mb-6"
          >
            📊
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
            Quick Market Analysis
          </h1>
          <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto mb-4">
            Click "Analyze" on any market below to get instant AI-powered insights
          </p>
          <p className="text-base text-neutral-400 max-w-2xl mx-auto">
            Or search for any symbol and we'll analyze it for you
          </p>
          
          {/* Free Usage Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#10B981]/20 to-[#6366F1]/20 border-2 border-[#10B981]/50 rounded-full text-[#10B981] font-bold mb-8"
          >
            <span className="text-xl">✓</span>
            <span>Free to try • No credit card required</span>
          </motion.div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacit2xl mx-auto mb-12"
        >
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for any market... (e.g., BTC, AAPL, EURUSD)"
              className="w-full px-6 py-5 bg-white/5 border-2 border-[#6366F1]/30 rounded-2xl text-white placeholder-neutral-500 focus:outline-none focus:border-[#6366F1] transition-all text-lg backdrop-blur-xl"
            />
          </div>
          <p className="text-neutral-400 text-sm mt-3 text-center">
            Browse popular markets below or search for any symbol
          </form>
          <p className="text-neutral-400 text-sm mt-3 text-center">
            Or choose from popular markets below
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white shadow-lg shadow-[#6366F1]/50 scale-105"
                  : "bg-white/5 text-neutral-300 hover:bg-white/10 border border-white/10"
              }`}
            >
              <span className="mr-2">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Popular Markets Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            {selectedCategory === "all" ? "Popular Markets" : `${categories.find(c => c.id === selectedCategory)?.label || ""} Markets`}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMarkets.map((market, idx) => (
              <motion.button
                key={market.symbol}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * idx }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTdiv
                key={market.symbol}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * idx }}
                className="relative group bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-2xl p-6 backdrop-blur-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                    {market.emoji}
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-2xl font-bold text-white mb-1">{market.symbol}</div>
                  <div className="text-sm text-neutral-400">{market.name}</div>
                  <div className="text-xs text-neutral-500 mt-1 capitalize">{market.category}</div>
                </div>
                
                <button
                  onClick={() => handleAnalyze(market.symbol)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#5558E3] hover:to-[#7C3AED] text-white font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-[#6366F1]/50 hover:scale-105 active:scale-95"
                >
                  Analyze {market.symbol}
                </button>
              </motion.divext-neutral-400 text-lg">No markets found. Try a different search or category.</p>
            </div>
          )}
        </motion.div>

        {/* CTA to Upload Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="max-w-4xl mx-auto mt-16 text-center"
        >
          <div className="bg-gradient-to-br from-[#6366F1]/10 to-[#8B5CF6]/10 border-2 border-[#6366F1]/30 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Or Upload Your Own Chart
            </h3>
            <p className="text-neutral-300 mb-6">
              Have a specific chart to analyze? Upload any screenshot or image for instant AI analysis.
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#6366F1]/50 hover:scale-105 transition-all duration-300"
            >
              📸 Upload Chart
            </Link>
          </div>
        </motion.div>

        {/* How It Works - Quick Version */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <h3 className="text-2xl font-bold text-center text-white mb-8">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                emoji: "🔍",
                title: "Select or Search",
                desc: "Choose a popular market or search for any symbol"
              },
              {
                step: "2",
                emoji: "Choose Market",
                desc: "Click 'Analyze' on any market above"
              },
              {
                step: "2",
                emoji: "📊",
                title: "Upload Chart",
                desc: "Take a screenshot of your chart and upload it"
              },
              {
                step: "3",
                emoji: "🤖",
                title: "Get AI Analysis",
                desc: "Receive instant insights, levels, and
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + idx * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{item.emoji}</div>
                <div className="text-sm text-[#6366F1] font-bold mb-2">STEP {item.step}</div>
                <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                <p className="text-neutral-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
