"use client";

import { motion } from "framer-motion";

export default function PromoBanner() {
  return (
    <div className="fixed top-[80px] left-0 right-0 z-[9998] bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899] overflow-hidden py-2 border-b border-white/10">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="flex items-center gap-12 whitespace-nowrap"
      >
        <div className="flex items-center gap-12">
          <span className="text-white font-bold text-sm flex items-center gap-2">
            🚀 PRO PLAN: $9.99/MO
          </span>
          <span className="text-white/90 text-sm">
            Unlimited Analyses: <span className="font-bold">ALL Timeframes</span>
          </span>
          <span className="text-white font-bold text-sm flex items-center gap-2">
            📊 1MIN • 5MIN • 15MIN
          </span>
          <span className="text-white/90 text-sm">
            Free Plan: <span className="font-bold">10 charts/month (Day only)</span>
          </span>
          <span className="text-white font-bold text-sm flex items-center gap-2">
            ⚡ INSTANT RESULTS
          </span>
          <span className="text-white/90 text-sm">
            AI-Powered: <span className="font-bold">90%+ Accuracy</span>
          </span>
          <span className="text-white font-bold text-sm flex items-center gap-2">
            💎 SMART MONEY DETECTION
          </span>
          <span className="text-white/90 text-sm">
            Pro Features: <span className="font-bold">Priority Processing</span>
          </span>
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex items-center gap-8 md:gap-12">
          <span className="text-white font-bold text-xs md:text-sm flex items-center gap-2">
            🚀 PRO PLAN: $9.99/MO
          </span>
          <span className="text-white/90 text-xs md:text-sm">
            Unlimited Analyses: <span className="font-bold">ALL Timeframes</span>
          </span>
          <span className="text-white font-bold text-xs md:text-sm flex items-center gap-2">
            📊 1MIN • 5MIN • 15MIN
          </span>
          <span className="text-white/90 text-xs md:text-sm">
            Free Plan: <span className="font-bold">10 charts/month (Day only)</span>
          </span>
          <span className="text-white font-bold text-xs md:text-sm flex items-center gap-2">
            ⚡ INSTANT RESULTS
          </span>
          <span className="text-white/90 text-xs md:text-sm">
            AI-Powered: <span className="font-bold">90%+ Accuracy</span>
          </span>
          <span className="text-white font-bold text-xs md:text-sm flex items-center gap-2">
            💎 SMART MONEY DETECTION
          </span>
          <span className="text-white/90 text-xs md:text-sm">
            Pro Features: <span className="font-bold">Priority Processing</span>
          </span>
        </div>
      </motion.div>
    </div>
  );
}
