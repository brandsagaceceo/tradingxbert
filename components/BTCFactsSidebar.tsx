"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface BTCFact {
  icon: string;
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

export default function BTCFactsSidebar() {
  const [facts, setFacts] = useState<BTCFact[]>([
    { icon: "₿", label: "Bitcoin Price", value: "$88,000", change: "+2.4%", isPositive: true },
    { icon: "📊", label: "Market Cap", value: "$1.89T", change: "+3.8%", isPositive: true },
    { icon: "💎", label: "24h Volume", value: "$48.2B" },
    { icon: "⚡", label: "Hash Rate", value: "528 EH/s" },
    { icon: "🔥", label: "Circulating Supply", value: "19.6M BTC" },
    { icon: "📈", label: "All-Time High", value: "$108,135" },
    { icon: "⏰", label: "Next Halving", value: "2028" },
    { icon: "🌍", label: "Active Addresses", value: "1.2M/day" },
  ]);

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setFacts(prev => prev.map((fact, idx) => {
        if (idx === 0) { // Update Bitcoin price
          const basePrice = 88000;
          const variance = (Math.random() - 0.5) * 1000;
          const newPrice = basePrice + variance;
          const changePercent = ((variance / basePrice) * 100).toFixed(2);
          return {
            ...fact,
            value: `$${newPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
            change: `${parseFloat(changePercent) >= 0 ? '+' : ''}${changePercent}%`,
            isPositive: parseFloat(changePercent) >= 0
          };
        }
        return fact;
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-24 space-y-4"
    >
      {/* BTC Live Stats */}
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] rounded-2xl border-2 border-[#6366F1]/30 p-6 shadow-xl overflow-hidden relative">
        {/* Animated background */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-10 -right-10 w-40 h-40 bg-[#6366F1] rounded-full blur-3xl"
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <span className="text-2xl">₿</span>
              Bitcoin Live
            </h3>
            <div className="flex items-center gap-1.5 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/50">
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-emerald-500 rounded-full"
              />
              <span className="text-xs font-bold text-emerald-400">LIVE</span>
            </div>
          </div>

          <div className="space-y-3">
            {facts.map((fact, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className="bg-white/5 rounded-xl p-3 border border-white/10 hover:border-[#6366F1]/50 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl group-hover:scale-110 transition-transform">{fact.icon}</span>
                    <span className="text-sm text-neutral-400">{fact.label}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">{fact.value}</div>
                    {fact.change && (
                      <div className={`text-xs font-bold ${fact.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                        {fact.change}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-xl p-4 cursor-pointer group"
          >
            <div className="text-white font-bold text-center">
              📊 Track More Crypto
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
