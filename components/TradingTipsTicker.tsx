"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function TradingTipsTicker() {
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    { emoji: "🎯", text: "Always use stop losses - protect your capital first" },
    { emoji: "📊", text: "The trend is your friend - trade with the direction" },
    { emoji: "💰", text: "Risk only 1-2% per trade - consistency beats big wins" },
    { emoji: "⏰", text: "Best times to trade: Market open, London session, NY open" },
    { emoji: "🧠", text: "Plan your trade, trade your plan - no emotional decisions" },
    { emoji: "📈", text: "Let winners run, cut losers quickly - the golden rule" },
    { emoji: "🔍", text: "Higher timeframes = stronger signals, lower = better entries" },
    { emoji: "⚡", text: "Volume confirms price moves - watch for confirmation" },
    { emoji: "🛡️", text: "Never risk more than you can afford to lose" },
    { emoji: "💎", text: "Patience is profitable - wait for your setup" },
    { emoji: "📉", text: "Markets range 70% of the time - don't force trades" },
    { emoji: "🎲", text: "Risk:Reward minimum 1:2 - make it worth the risk" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [tips.length]);

  return (
    <div className="bg-gradient-to-r from-[#6366F1]/10 via-[#8B5CF6]/10 to-[#EC4899]/10 border-y border-[#6366F1]/20 py-4 mb-8 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full shrink-0">
            <span className="text-sm font-black text-white">PRO TIP</span>
          </div>
          
          <motion.div
            key={currentTip}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex items-center gap-3 flex-1"
          >
            <span className="text-2xl">{tips[currentTip].emoji}</span>
            <p className="text-white font-medium">{tips[currentTip].text}</p>
          </motion.div>

          <div className="flex gap-1 shrink-0">
            {tips.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentTip ? 'bg-[#6366F1] w-6' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
