"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PopularAssets() {
  const assets = [
    { symbol: "BTC", name: "Bitcoin", price: "$96,247", change: "+4.2%", isPositive: true, volume: "$45B" },
    { symbol: "ETH", name: "Ethereum", price: "$3,421", change: "+3.9%", isPositive: true, volume: "$18B" },
    { symbol: "AAPL", name: "Apple", price: "$250.17", change: "+0.8%", isPositive: true, volume: "$8.2B" },
    { symbol: "NVDA", name: "NVIDIA", price: "$140.15", change: "+2.1%", isPositive: true, volume: "$12.5B" },
    { symbol: "TSLA", name: "Tesla", price: "$463.02", change: "-1.2%", isPositive: false, volume: "$15.3B" },
    { symbol: "GOOGL", name: "Google", price: "$178.32", change: "+1.5%", isPositive: true, volume: "$4.8B" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] rounded-2xl border-2 border-[#6366F1]/30 p-6 shadow-xl"
    >
      <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
        <span className="text-2xl">⭐</span>
        Popular Assets
      </h3>

      <div className="space-y-2">
        {assets.map((asset, idx) => (
          <Link key={idx} href={`/news`}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02, x: 4, backgroundColor: "rgba(99, 102, 241, 0.1)" }}
              className="bg-white/5 rounded-xl p-3 border border-white/10 hover:border-[#6366F1]/50 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-full flex items-center justify-center font-black text-white text-sm">
                    {asset.symbol.substring(0, 2)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{asset.symbol}</div>
                    <div className="text-xs text-neutral-400">{asset.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">{asset.price}</div>
                  <div className={`text-xs font-bold ${asset.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {asset.change}
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <Link href="/news">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-4 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all"
        >
          View All Markets →
        </motion.button>
      </Link>
    </motion.div>
  );
}
