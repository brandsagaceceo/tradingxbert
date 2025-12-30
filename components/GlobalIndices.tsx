"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface GlobalIndex {
  name: string;
  value: string;
  change: number;
  flag: string;
}

export default function GlobalIndices() {
  const [indices, setIndices] = useState<GlobalIndex[]>([
    { name: "S&P 500", value: "5,847.50", change: 1.18, flag: "🇺🇸" },
    { name: "Dow Jones", value: "42,892.30", change: 0.75, flag: "🇺🇸" },
    { name: "NASDAQ", value: "19,234.80", change: 2.04, flag: "🇺🇸" },
    { name: "FTSE 100", value: "8,234.50", change: 0.68, flag: "🇬🇧" },
    { name: "DAX", value: "17,823.40", change: 1.13, flag: "🇩🇪" },
    { name: "Nikkei", value: "38,456.20", change: -0.34, flag: "🇯🇵" },
    { name: "Shanghai", value: "3,245.60", change: 0.75, flag: "🇨🇳" },
    { name: "Hang Seng", value: "18,892.30", change: -0.36, flag: "🇭🇰" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndices(prev => prev.map(index => ({
        ...index,
        change: index.change + (Math.random() - 0.5) * 0.2
      })));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 p-6">
      <h3 className="text-2xl font-black text-white mb-6">Global Markets</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {indices.map((index, i) => (
          <motion.button
            key={index.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(`https://www.tradingview.com/symbols/${index.name.replace(/[^a-zA-Z0-9]/g, '')}/`, '_blank')}
            className="w-full bg-black/30 rounded-xl p-4 border border-white/5 hover:border-[#6366F1]/50 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{index.flag}</span>
                <span className="font-bold text-white">{index.name}</span>
              </div>
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`font-black text-lg ${index.change > 0 ? 'text-green-400' : 'text-red-400'}`}
              >
                {index.change > 0 ? '+' : ''}{index.change.toFixed(2)}%
              </motion.span>
            </div>
            <div className="text-2xl font-black text-white">{index.value}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
