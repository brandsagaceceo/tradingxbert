"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Watchlist() {
  const [watchlist] = useState([
    { symbol: "BTC", name: "Bitcoin", price: "$88 000", change: "+2.4%", positive: true },
    { symbol: "ETH", name: "Ethereum", price: "$3 421", change: "+3.9%", positive: true },
    { symbol: "SOL", name: "Solana", price: "$143", change: "+8.9%", positive: true },
    { symbol: "AAPL", name: "Apple", price: "$250", change: "+0.8%", positive: true },
  ]);

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black text-white flex items-center gap-2">
          <span>⭐</span>
          <span>My Watchlist</span>
        </h3>
        <button className="text-[#6366F1] text-sm font-bold hover:underline">
          + Add
        </button>
      </div>
      
      <div className="space-y-3">
        {watchlist.map((asset, i) => (
          <motion.button
            key={asset.symbol}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
            onClick={() => window.open(`https://www.tradingview.com/symbols/${asset.symbol}/`, '_blank')}
            className="w-full flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/5 hover:border-[#6366F1]/50 transition-all"
          >
            <div className="text-left">
              <div className="text-sm font-bold text-white">{asset.symbol}</div>
              <div className="text-xs text-neutral-400">{asset.name}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-white">{asset.price}</div>
              <div className={`text-xs font-bold ${asset.positive ? 'text-green-400' : 'text-red-400'}`}>
                {asset.change}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.a
        href="/"
        whileHover={{ scale: 1.02 }}
        className="mt-4 block text-center py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#6366F1]/50 transition-all"
      >
        Analyze My Watchlist 🤖
      </motion.a>
    </div>
  );
}
