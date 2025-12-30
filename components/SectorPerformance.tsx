"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface SectorData {
  name: string;
  change: number;
  icon: string;
}

export default function SectorPerformance() {
  const [sectors, setSectors] = useState<SectorData[]>([
    { name: "Technology", change: 3.2, icon: "💻" },
    { name: "Crypto", change: 5.8, icon: "₿" },
    { name: "Energy", change: 1.4, icon: "⚡" },
    { name: "Finance", change: 2.1, icon: "🏦" },
    { name: "Healthcare", change: -0.5, icon: "🏥" },
    { name: "Consumer", change: 1.8, icon: "🛒" },
    { name: "Real Estate", change: -1.2, icon: "🏠" },
    { name: "Utilities", change: 0.3, icon: "🔌" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSectors(prev => prev.map(sector => ({
        ...sector,
        change: sector.change + (Math.random() - 0.5) * 0.4
      })));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 p-6">
      <h3 className="text-2xl font-black text-white mb-6">Sector Performance</h3>
      
      <div className="space-y-3">
        {sectors.sort((a, b) => b.change - a.change).map((sector, i) => (
          <motion.div
            key={sector.name}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: i * 0.05 }}
            className="relative"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{sector.icon}</span>
                <span className="font-bold text-white">{sector.name}</span>
              </div>
              <span className={`font-black ${sector.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {sector.change > 0 ? '+' : ''}{sector.change.toFixed(2)}%
              </span>
            </div>
            <div className="h-2 bg-black/40 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(Math.abs(sector.change) * 10, 100)}%` }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className={`h-full rounded-full ${
                  sector.change > 0 
                    ? 'bg-gradient-to-r from-green-600 to-green-400' 
                    : 'bg-gradient-to-r from-red-600 to-red-400'
                }`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
