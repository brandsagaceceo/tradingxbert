"use client";
import { motion } from "framer-motion";
import { useLivePrices, formatPrice, formatChange } from "@/hooks/useLivePrices";

export default function MarketStats() {
  const { prices, loading } = useLivePrices(60000);
  
  const getStats = () => {
    if (!prices) return [
      { label: "24h Volume", value: "Loading...", change: "+0.0%", positive: true },
      { label: "Market Cap", value: "Loading...", change: "+0.0%", positive: true },
      { label: "BTC Dominance", value: "55.2%", change: "-0.3%", positive: false },
      { label: "Active Traders", value: "8.7M", change: "+15.2%", positive: true }
    ];
    
    // Calculate approximate market cap from BTC price
    const btcMarketCap = (prices.crypto.BTC.price * 19.6) / 1000; // in trillions
    const totalMarketCap = btcMarketCap / 0.552; // BTC dominance ~55.2%
    
    return [
      { label: "24h Volume", value: "$542.3B", change: "+12.4%", positive: true },
      { label: "Market Cap", value: `$${totalMarketCap.toFixed(2)}T`, change: formatChange(prices.crypto.BTC.change), positive: prices.crypto.BTC.change >= 0 },
      { label: "BTC Dominance", value: "55.2%", change: "-0.3%", positive: false },
      { label: "Active Traders", value: "8.7M", change: "+15.2%", positive: true }
    ];
  };
  
  const stats = getStats();

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
      <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
        <span>📊</span>
        <span>Market Statistics</span>
      </h3>
      
      <div className="space-y-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/5"
          >
            <div>
              <div className="text-xs text-neutral-400 mb-1">{stat.label}</div>
              <div className="text-lg font-black text-white">{stat.value}</div>
            </div>
            <div className={`text-sm font-bold ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
              {stat.change}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-6 p-4 bg-gradient-to-r from-[#6366F1]/20 to-[#8B5CF6]/20 rounded-xl border border-[#6366F1]/30"
      >
        <div className="flex items-center gap-3">
          <div className="text-3xl">🔥</div>
          <div>
            <div className="text-sm font-bold text-white">Market is Hot!</div>
            <div className="text-xs text-neutral-400">Trading volume up 45% this week</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
