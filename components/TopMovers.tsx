"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Mover {
  symbol: string;
  name: string;
  price: string;
  change: number;
  volume: string;
  marketCap: string;
}

export default function TopMovers() {
  const [tab, setTab] = useState<"gainers" | "losers">("gainers");
  const [movers, setMovers] = useState<{ gainers: Mover[], losers: Mover[] }>({
    gainers: [
      { symbol: "SOL", name: "Solana", price: "$143.25", change: 8.92, volume: "$3.2B", marketCap: "$67B" },
      { symbol: "NVDA", name: "NVIDIA", price: "$140.15", change: 7.22, volume: "$12.5B", marketCap: "$345B" },
      { symbol: "XRP", name: "Ripple", price: "$2.47", change: 5.72, volume: "$2.8B", marketCap: "$141B" },
      { symbol: "BTC", name: "Bitcoin", price: "$96,247", change: 4.17, volume: "$45B", marketCap: "$1.89T" },
      { symbol: "ETH", name: "Ethereum", price: "$3,421", change: 4.26, volume: "$18B", marketCap: "$412B" }
    ],
    losers: [
      { symbol: "TSLA", name: "Tesla", price: "$358.00", change: -2.24, volume: "$15.3B", marketCap: "$1.14T" },
      { symbol: "META", name: "Meta", price: "$638.40", change: -0.78, volume: "$3.9B", marketCap: "$1.62T" },
      { symbol: "COIN", name: "Coinbase", price: "$234.50", change: -1.34, volume: "$2.1B", marketCap: "$58B" },
      { symbol: "SQ", name: "Block", price: "$78.90", change: -1.92, volume: "$1.5B", marketCap: "$46B" },
      { symbol: "PYPL", name: "PayPal", price: "$62.15", change: -0.67, volume: "$2.3B", marketCap: "$68B" }
    ]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMovers(prev => ({
        gainers: prev.gainers.map(m => ({
          ...m,
          change: m.change + (Math.random() - 0.3) * 0.3
        })),
        losers: prev.losers.map(m => ({
          ...m,
          change: m.change + (Math.random() - 0.7) * 0.3
        }))
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentMovers = movers[tab];

  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-black text-white">Top Movers</h3>
        <div className="flex gap-2 bg-black/30 p-1 rounded-lg">
          <button
            onClick={() => setTab("gainers")}
            className={`px-4 py-2 rounded font-bold text-sm transition-all ${
              tab === "gainers"
                ? 'bg-green-500 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            🚀 Gainers
          </button>
          <button
            onClick={() => setTab("losers")}
            className={`px-4 py-2 rounded font-bold text-sm transition-all ${
              tab === "losers"
                ? 'bg-red-500 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            📉 Losers
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {currentMovers.map((mover, i) => (
          <motion.button
            key={mover.symbol}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open(`https://www.tradingview.com/symbols/${mover.symbol}/`, '_blank')}
            className="w-full bg-black/30 rounded-xl p-4 border border-white/5 hover:border-[#6366F1]/50 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <div className="font-black text-white text-lg">{mover.symbol}</div>
                  <div className="text-xs text-neutral-400">{mover.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-white">{mover.price}</div>
                  <div className="text-xs text-neutral-400">{mover.marketCap}</div>
                </div>
              </div>
              <div className="text-right">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`text-2xl font-black ${mover.change > 0 ? 'text-green-400' : 'text-red-400'}`}
                >
                  {mover.change > 0 ? '+' : ''}{mover.change.toFixed(2)}%
                </motion.div>
                <div className="text-xs text-neutral-400">Vol: {mover.volume}</div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
