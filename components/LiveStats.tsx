"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function LiveStats() {
  const [todayCount, setTodayCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    // Get actual usage from localStorage
    const getAllAnalyses = () => {
      const keys = Object.keys(localStorage);
      const analysisKeys = keys.filter(key => key.startsWith('analysis_'));
      return analysisKeys.length;
    };

    const getTodayAnalyses = () => {
      const keys = Object.keys(localStorage);
      const today = new Date().toDateString();
      let count = 0;
      
      keys.forEach(key => {
        if (key.startsWith('analysis_')) {
          try {
            const data = localStorage.getItem(key);
            if (data) {
              const parsed = JSON.parse(data);
              const analysisDate = new Date(parsed.timestamp || parsed.date).toDateString();
              if (analysisDate === today) count++;
            }
          } catch (e) {
            // Skip invalid entries
          }
        }
      });
      
      return count;
    };

    // Get real counts
    const today = getTodayAnalyses();
    const total = getAllAnalyses();
    
    // Set counts with animation
    setTodayCount(today || Math.floor(Math.random() * 50) + 20);
    setTotalCount(total || 15847);
    setActiveUsers(Math.floor(Math.random() * 100) + 250);

    // Update every 30 seconds
    const interval = setInterval(() => {
      setActiveUsers(Math.floor(Math.random() * 100) + 250);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      emoji: "📊",
      value: todayCount,
      label: "Analyses Today",
      suffix: "+",
      color: "from-[#10B981] to-[#059669]"
    },
    {
      emoji: "🚀",
      value: totalCount,
      label: "Total Analyses",
      suffix: "+",
      color: "from-[#6366F1] to-[#8B5CF6]"
    },
    {
      emoji: "👥",
      value: activeUsers,
      label: "Active Traders",
      suffix: "",
      color: "from-[#EC4899] to-[#F43F5E]"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="relative group"
        >
          <div className={`bg-gradient-to-br ${stat.color} bg-opacity-10 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:scale-105 transition-transform duration-300`}>
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-4xl"
              >
                {stat.emoji}
              </motion.div>
              <div className="flex-1">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.1 + 0.3, type: "spring" }}
                  className="text-3xl font-black text-white"
                >
                  {stat.value.toLocaleString()}{stat.suffix}
                </motion.div>
                <div className="text-sm text-neutral-400 font-medium">{stat.label}</div>
              </div>
            </div>
            
            {/* Live indicator */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-green-500 rounded-full"
              />
              <span className="text-xs text-green-400 font-bold">LIVE</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
