"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function PositionCalculator() {
  const [accountSize, setAccountSize] = useState("");
  const [riskPercent, setRiskPercent] = useState("1");
  const [entryPrice, setEntryPrice] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [showResult, setShowResult] = useState(false);

  const calculate = () => {
    const account = parseFloat(accountSize);
    const risk = parseFloat(riskPercent);
    const entry = parseFloat(entryPrice);
    const sl = parseFloat(stopLoss);

    if (!account || !risk || !entry || !sl) return null;

    const riskAmount = (account * risk) / 100;
    const stopDistance = Math.abs(entry - sl);
    const positionSize = riskAmount / stopDistance;
    const totalValue = positionSize * entry;

    return {
      positionSize: positionSize.toFixed(4),
      totalValue: totalValue.toFixed(2),
      riskAmount: riskAmount.toFixed(2),
      stopDistance: stopDistance.toFixed(2)
    };
  };

  const result = calculate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-lg rounded-2xl border border-white/10 p-6 mb-8"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">🧮</span>
        <div>
          <h3 className="text-xl font-bold text-white">Position Size Calculator</h3>
          <p className="text-xs text-neutral-400">Calculate your exact position size based on risk</p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-xs text-neutral-400 mb-1 font-medium">Account Size ($)</label>
          <input
            type="number"
            value={accountSize}
            onChange={(e) => {
              setAccountSize(e.target.value);
              setShowResult(true);
            }}
            placeholder="10000"
            className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
          />
        </div>

        <div>
          <label className="block text-xs text-neutral-400 mb-1 font-medium">Risk % (1-3% max)</label>
          <input
            type="number"
            value={riskPercent}
            onChange={(e) => {
              setRiskPercent(e.target.value);
              setShowResult(true);
            }}
            placeholder="1"
            step="0.1"
            min="0.1"
            max="3"
            className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
          />
        </div>

        <div>
          <label className="block text-xs text-neutral-400 mb-1 font-medium">Entry Price ($)</label>
          <input
            type="number"
            value={entryPrice}
            onChange={(e) => {
              setEntryPrice(e.target.value);
              setShowResult(true);
            }}
            placeholder="50000"
            step="0.01"
            className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
          />
        </div>

        <div>
          <label className="block text-xs text-neutral-400 mb-1 font-medium">Stop Loss ($)</label>
          <input
            type="number"
            value={stopLoss}
            onChange={(e) => {
              setStopLoss(e.target.value);
              setShowResult(true);
            }}
            placeholder="49000"
            step="0.01"
            className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
          />
        </div>
      </div>

      <AnimatePresence>
        {result && showResult && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="grid md:grid-cols-4 gap-4 pt-4 border-t border-white/10"
          >
            <div className="bg-gradient-to-br from-[#10B981]/20 to-[#059669]/20 border border-[#10B981]/30 rounded-xl p-4">
              <div className="text-xs text-[#10B981] font-bold mb-1">POSITION SIZE</div>
              <div className="text-2xl font-black text-white">{result.positionSize}</div>
              <div className="text-xs text-neutral-400">units</div>
            </div>

            <div className="bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/20 border border-[#6366F1]/30 rounded-xl p-4">
              <div className="text-xs text-[#6366F1] font-bold mb-1">TOTAL VALUE</div>
              <div className="text-2xl font-black text-white">${result.totalValue}</div>
              <div className="text-xs text-neutral-400">position value</div>
            </div>

            <div className="bg-gradient-to-br from-[#F59E0B]/20 to-[#D97706]/20 border border-[#F59E0B]/30 rounded-xl p-4">
              <div className="text-xs text-[#F59E0B] font-bold mb-1">RISK AMOUNT</div>
              <div className="text-2xl font-black text-white">${result.riskAmount}</div>
              <div className="text-xs text-neutral-400">max loss</div>
            </div>

            <div className="bg-gradient-to-br from-[#EC4899]/20 to-[#F43F5E]/20 border border-[#EC4899]/30 rounded-xl p-4">
              <div className="text-xs text-[#EC4899] font-bold mb-1">STOP DISTANCE</div>
              <div className="text-2xl font-black text-white">${result.stopDistance}</div>
              <div className="text-xs text-neutral-400">from entry</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
