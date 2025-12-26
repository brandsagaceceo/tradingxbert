"use client";
import { motion } from "framer-motion";

export default function ChartGuide() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 p-6 bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-2xl border border-[#FFD700]/20"
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl">📋</div>
        <div>
          <h3 className="text-xl font-bold text-[#FFD700] mb-3">Pro Trading Tips for Best Results</h3>
          
          <div className="space-y-3 text-sm text-neutral-300">
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              <div>
                <strong className="text-white">Clean Chart Screenshots:</strong> Remove indicators, keep only price action and key levels
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              <div>
                <strong className="text-white">Multiple Timeframes:</strong> Upload 4H/1D for swing trades, 5min/15min for scalps
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              <div>
                <strong className="text-white">Mark Important Zones:</strong> Highlight support/resistance you're watching
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <span className="text-yellow-400 mt-0.5">⚠️</span>
              <div>
                <strong className="text-white">Wait 5 Minutes Between Uploads:</strong> AI needs time to process complex patterns
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg">
            <div className="flex items-start gap-2">
              <span className="text-2xl">💡</span>
              <div className="text-xs text-neutral-200">
                <strong className="text-[#FFD700]">Best Setups to Upload:</strong> Clear breakouts, trend reversals, double tops/bottoms, liquidity sweeps, order blocks, fair value gaps
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
