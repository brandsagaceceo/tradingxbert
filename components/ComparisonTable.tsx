"use client";

import { motion } from "framer-motion";

export default function ComparisonTable() {
  const features = [
    {
      feature: "Analysis Speed",
      tradingxbert: "Instant (< 10 sec)",
      manual: "30-60 minutes",
      others: "5-15 minutes",
      winner: "tradingxbert"
    },
    {
      feature: "Accuracy",
      tradingxbert: "85%+ confidence",
      manual: "Varies widely",
      others: "70-80%",
      winner: "tradingxbert"
    },
    {
      feature: "Cost",
      tradingxbert: "Free + $29/mo Pro",
      manual: "Your time",
      others: "$99-299/mo",
      winner: "tradingxbert"
    },
    {
      feature: "Learning Curve",
      tradingxbert: "None - instant",
      manual: "Years of practice",
      others: "Weeks to learn",
      winner: "tradingxbert"
    },
    {
      feature: "Emotional Bias",
      tradingxbert: "Zero - pure AI",
      manual: "High risk",
      others: "Some bias",
      winner: "tradingxbert"
    },
    {
      feature: "24/7 Availability",
      tradingxbert: "Always on",
      manual: "When you're awake",
      others: "Limited hours",
      winner: "tradingxbert"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-lg rounded-3xl border border-white/10 p-8 mb-12"
    >
      <div className="text-center mb-8">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-5xl mb-4"
        >
          ⚡
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-black mb-3 bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
          Why TradingXbert Wins
        </h2>
        <p className="text-neutral-400">See how we compare to traditional methods and competitors</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-4 px-4 text-neutral-400 font-bold text-sm">Feature</th>
              <th className="text-center py-4 px-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full flex items-center justify-center text-2xl">
                    🚀
                  </div>
                  <span className="text-white font-black text-sm">TradingXbert</span>
                </div>
              </th>
              <th className="text-center py-4 px-4 text-neutral-400 font-medium text-sm">Manual Analysis</th>
              <th className="text-center py-4 px-4 text-neutral-400 font-medium text-sm">Other Tools</th>
            </tr>
          </thead>
          <tbody>
            {features.map((item, idx) => (
              <motion.tr
                key={item.feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="py-4 px-4 text-white font-medium">{item.feature}</td>
                <td className="py-4 px-4 text-center">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                    item.winner === 'tradingxbert' 
                      ? 'bg-gradient-to-r from-[#10B981]/20 to-[#059669]/20 border border-[#10B981]/30' 
                      : 'bg-white/5'
                  }`}>
                    {item.winner === 'tradingxbert' && <span>✓</span>}
                    <span className={item.winner === 'tradingxbert' ? 'text-[#10B981] font-bold' : 'text-white'}>
                      {item.tradingxbert}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-center text-neutral-400">{item.manual}</td>
                <td className="py-4 px-4 text-center text-neutral-400">{item.others}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-center"
      >
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#10B981]/20 to-[#059669]/20 border border-[#10B981]/30 rounded-full">
          <span className="text-2xl">🏆</span>
          <span className="text-[#10B981] font-bold">Winner: TradingXbert on all fronts</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
