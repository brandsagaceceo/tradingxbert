"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLivePrices, formatPrice, formatChange } from "@/hooks/useLivePrices";

interface Mover {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: string;
  marketCap: string;
}

export default function TopMovers() {
  const [tab, setTab] = useState<"gainers" | "losers">("gainers");
  const { prices, loading } = useLivePrices(60000);
  
  // Generate movers from live prices
  const getMovers = () => {
    if (!prices) return { gainers: [], losers: [] };
    
    const allAssets = [
      { symbol: "BTC", name: "Bitcoin", price: prices.crypto.BTC.price, change: prices.crypto.BTC.change, volume: "$52.8B", marketCap: "$1.98T" },
      { symbol: "ETH", name: "Ethereum", price: prices.crypto.ETH.price, change: prices.crypto.ETH.change, volume: "$22.4B", marketCap: "$438B" },
      { symbol: "SOL", name: "Solana", price: prices.crypto.SOL.price, change: prices.crypto.SOL.change, volume: "$4.1B", marketCap: "$78B" },
      { symbol: "XRP", name: "Ripple", price: prices.crypto.XRP.price, change: prices.crypto.XRP.change, volume: "$3.5B", marketCap: "$152B" },
      { symbol: "NVDA", name: "NVIDIA", price: prices.stocks.NVDA.price, change: prices.stocks.NVDA.change, volume: "$14.8B", marketCap: "$362B" },
      { symbol: "AAPL", name: "Apple", price: prices.stocks.AAPL.price, change: prices.stocks.AAPL.change, volume: "$8.2B", marketCap: "$3.85T" },
      { symbol: "TSLA", name: "Tesla", price: prices.stocks.TSLA.price, change: prices.stocks.TSLA.change, volume: "$18.2B", marketCap: "$1.28T" },
      { symbol: "MSFT", name: "Microsoft", price: prices.stocks.MSFT.price, change: prices.stocks.MSFT.change, volume: "$7.1B", marketCap: "$3.1T" },
    ];
    
    const sorted = [...allAssets].sort((a, b) => b.change - a.change);
    return {
      gainers: sorted.filter(a => a.change > 0).slice(0, 5),
      losers: sorted.filter(a => a.change < 0).slice(0, 5)
    };
  };
  
  const movers = getMovers();
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
                  <div className="font-bold text-white">${formatPrice(mover.price)}</div>
                  <div className="text-xs text-neutral-400">{mover.marketCap}</div>
                </div>
              </div>
              <div className="text-right">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`text-2xl font-black ${mover.change > 0 ? 'text-green-400' : 'text-red-400'}`}
                >
                  {formatChange(mover.change)}
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
