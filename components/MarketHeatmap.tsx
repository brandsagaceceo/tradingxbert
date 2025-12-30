"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Asset {
  symbol: string;
  name: string;
  change: number;
  volume: string;
}

export default function MarketHeatmap() {
  const [assets, setAssets] = useState<Asset[]>([
    { symbol: "BTC", name: "Bitcoin", change: 4.2, volume: "$45B" },
    { symbol: "ETH", name: "Ethereum", change: 3.8, volume: "$18B" },
    { symbol: "AAPL", name: "Apple", change: 1.5, volume: "$8.2B" },
    { symbol: "NVDA", name: "NVIDIA", change: 6.7, volume: "$12.5B" },
    { symbol: "TSLA", name: "Tesla", change: -2.3, volume: "$15.3B" },
    { symbol: "GOOGL", name: "Google", change: 2.1, volume: "$4.8B" },
    { symbol: "MSFT", name: "Microsoft", change: 1.9, volume: "$6.1B" },
    { symbol: "SOL", name: "Solana", change: 8.4, volume: "$3.2B" },
    { symbol: "XRP", name: "Ripple", change: 5.2, volume: "$2.8B" },
    { symbol: "AMZN", name: "Amazon", change: 1.2, volume: "$5.5B" },
    { symbol: "META", name: "Meta", change: -0.8, volume: "$3.9B" },
    { symbol: "GOLD", name: "Gold", change: 0.5, volume: "$2.1B" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(prev => prev.map(asset => ({
        ...asset,
        change: asset.change + (Math.random() - 0.5) * 0.5
      })));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getColor = (change: number) => {
    if (change > 5) return "from-green-600 to-green-400";
    if (change > 2) return "from-green-500 to-green-300";
    if (change > 0) return "from-emerald-600 to-emerald-400";
    if (change > -2) return "from-red-600 to-red-400";
    if (change > -5) return "from-red-700 to-red-500";
    return "from-red-800 to-red-600";
  };

  const getSize = (change: number) => {
    const absChange = Math.abs(change);
    if (absChange > 5) return "col-span-2 row-span-2";
    if (absChange > 3) return "col-span-2";
    return "";
  };

  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-black text-white">Market Heatmap</h3>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-neutral-400">Gainers</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-neutral-400">Losers</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-4 md:grid-cols-6 gap-2 auto-rows-[80px]">
        {assets.map((asset, i) => (
          <motion.div
            key={asset.symbol}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            className={`relative ${getSize(asset.change)} bg-gradient-to-br ${getColor(asset.change)} rounded-xl p-3 overflow-hidden cursor-pointer group`}
          >
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="font-black text-white text-sm mb-0.5">{asset.symbol}</div>
                <div className="text-[10px] text-white/80 truncate">{asset.name}</div>
              </div>
              <div>
                <div className="font-black text-white text-lg">{asset.change > 0 ? '+' : ''}{asset.change.toFixed(2)}%</div>
                <div className="text-[10px] text-white/70">{asset.volume}</div>
              </div>
            </div>
            <motion.div
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-white/10"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
