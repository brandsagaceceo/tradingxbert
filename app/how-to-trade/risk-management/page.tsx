"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function RiskManagement() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0A0F] via-[#1a1a2e] to-[#0A0A0F]">
      {/* Hero */}
      <div className="relative h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=400&fit=crop"
          alt="Risk Management"
          width={1200}
          height={400}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-[#0A0A0F]/50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-400 text-sm font-bold mb-4"
          >
            Course 3 • Intermediate • 50 min
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4"
          >
            Risk Management Mastery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-neutral-300 max-w-2xl"
          >
            Protect your capital and trade with confidence
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Overview */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 p-8 rounded-2xl border border-red-500/30">
            <h2 className="text-3xl font-bold text-white mb-6">🛡️ What You'll Learn</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "The 1-2% rule and position sizing",
                "Setting effective stop losses",
                "Risk/reward ratio calculation",
                "Portfolio diversification strategies",
                "Emotional discipline techniques",
                "Managing winning and losing streaks"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-neutral-300">
                  <span className="text-orange-400 text-xl">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Golden Rule */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-8 rounded-2xl border border-yellow-500/40 text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">⚡ The Golden Rule</h2>
            <p className="text-2xl text-yellow-200 font-bold">
              Never Risk More Than 1-2% of Your Account Per Trade
            </p>
          </div>
          
          <div className="space-y-6 text-neutral-300 text-lg leading-relaxed">
            <p>
              This single rule separates profitable traders from those who blow up their accounts. Professional traders protect their capital FIRST, make profits SECOND.
            </p>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-white font-bold text-xl mb-3">Why 1-2%?</h3>
              <p className="mb-3">
                Even with a 50% win rate, risking 1-2% per trade means you can survive 50+ consecutive losses before losing your account. This gives you room to learn and adapt.
              </p>
              <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/20">
                <p className="text-emerald-400 font-bold">Example:</p>
                <p className="mt-2">$10,000 account × 1% risk = $100 max loss per trade</p>
                <p>$10,000 account × 2% risk = $200 max loss per trade</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Position Sizing */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">Position Sizing Calculator</h2>
          <div className="mb-8">
            <Image
              src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=400&fit=crop"
              alt="Position Sizing"
              width={800}
              height={400}
              className="w-full rounded-xl"
            />
          </div>
          
          <div className="bg-gradient-to-r from-[#6366F1]/10 to-[#3B82F6]/10 p-8 rounded-2xl border border-[#6366F1]/20">
            <h3 className="text-2xl font-bold text-white mb-4">The Formula</h3>
            <div className="bg-white/5 p-6 rounded-xl mb-6">
              <p className="text-xl text-center text-white font-mono">
                Position Size = (Account Size × Risk %) ÷ (Entry Price - Stop Loss Price)
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-white font-bold text-lg mb-3">Step-by-Step Example:</h4>
                <div className="space-y-3 text-neutral-300">
                  <p><span className="text-white font-bold">1. Account Size:</span> $10,000</p>
                  <p><span className="text-white font-bold">2. Risk Percentage:</span> 2% ($200)</p>
                  <p><span className="text-white font-bold">3. Entry Price:</span> $50.00</p>
                  <p><span className="text-white font-bold">4. Stop Loss:</span> $48.00</p>
                  <p><span className="text-white font-bold">5. Distance:</span> $50 - $48 = $2.00</p>
                </div>
                <div className="mt-4 p-4 bg-emerald-500/20 rounded-xl border border-emerald-500/30">
                  <p className="text-emerald-400 font-bold text-lg">
                    Result: $200 ÷ $2 = 100 shares maximum
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Stop Losses */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">Stop Loss Strategies</h2>
          <div className="space-y-6">
            {[
              {
                type: "Technical Stop Loss",
                desc: "Place stop below key support (longs) or above resistance (shorts)",
                example: "If buying at $100 with support at $97, set stop at $96.50",
                best: "Best for swing trades and technical setups"
              },
              {
                type: "Percentage Stop Loss",
                desc: "Fixed percentage below entry (e.g., 2-3%)",
                example: "Entry at $50, 2% stop = $49.00",
                best: "Best for consistent risk management"
              },
              {
                type: "ATR-Based Stop Loss",
                desc: "Use Average True Range (ATR) indicator for volatility-adjusted stops",
                example: "If ATR is $2, set stop 1.5-2x ATR below entry",
                best: "Best for volatile markets like crypto"
              },
              {
                type: "Time-Based Stop Loss",
                desc: "Exit after specific time regardless of price",
                example: "Close position at end of day or after 4 hours",
                best: "Best for day trading and scalping"
              }
            ].map((strategy, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 p-6 rounded-xl border border-orange-500/20"
              >
                <h3 className="text-orange-400 font-bold text-xl mb-3">{strategy.type}</h3>
                <p className="text-neutral-300 mb-3">{strategy.desc}</p>
                <p className="text-neutral-400 text-sm mb-2"><span className="text-white font-bold">Example:</span> {strategy.example}</p>
                <p className="text-[#6366F1] text-sm"><span className="font-bold">💡</span> {strategy.best}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Risk/Reward */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">Risk/Reward Ratio</h2>
          <div className="mb-8">
            <Image
              src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
              alt="Risk Reward"
              width={800}
              height={400}
              className="w-full rounded-xl"
            />
          </div>
          
          <div className="space-y-6 text-neutral-300 text-lg">
            <p>
              Risk/Reward ratio compares potential profit to potential loss. Professional traders aim for minimum 1:2 (risk $1 to make $2).
            </p>
            
            <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 p-8 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-2xl mb-4">The Math Behind Profitability</h3>
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="font-bold text-white mb-2">1:1 Risk/Reward = Need 50%+ win rate</p>
                  <p className="text-sm">10 trades: 5 wins × $100 = $500, 5 losses × $100 = -$500 = $0 profit</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="font-bold text-white mb-2">1:2 Risk/Reward = Need 33%+ win rate</p>
                  <p className="text-sm">10 trades: 4 wins × $200 = $800, 6 losses × $100 = -$600 = $200 profit</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="font-bold text-white mb-2">1:3 Risk/Reward = Need 25%+ win rate</p>
                  <p className="text-sm">10 trades: 3 wins × $300 = $900, 7 losses × $100 = -$700 = $200 profit</p>
                </div>
              </div>
              <p className="text-emerald-400 font-bold mt-6">
                → Higher risk/reward = More room for error and still profitable!
              </p>
            </div>
          </div>
        </motion.section>

        {/* Common Mistakes */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 p-8 rounded-2xl border border-red-500/30">
            <h2 className="text-3xl font-bold text-white mb-6">❌ Common Risk Management Mistakes</h2>
            <div className="space-y-4">
              {[
                "Moving stop loss further away when trade goes against you",
                "Risking more on 'revenge trades' after a loss",
                "Not using stop losses at all ('I'll just watch it')",
                "Position size too large for account size",
                "Taking profit too early but letting losses run",
                "Over-leveraging in volatile markets"
              ].map((mistake, i) => (
                <div key={i} className="flex items-start gap-3 text-neutral-300 p-3 bg-white/5 rounded-lg">
                  <span className="text-red-400 text-xl">⚠️</span>
                  <span>{mistake}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-center pt-12 border-t border-white/10"
        >
          <Link href="/how-to-trade/spot-good-trades">
            <motion.button
              whileHover={{ x: -5 }}
              className="px-6 py-3 bg-white/5 text-white rounded-xl border border-white/10 hover:border-[#6366F1]/50 transition-all"
            >
              ← Previous: Spot Good Trades
            </motion.button>
          </Link>
          <Link href="/how-to-trade/using-ai">
            <motion.button
              whileHover={{ x: 5 }}
              className="px-6 py-3 bg-gradient-to-r from-[#6366F1] to-[#3B82F6] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#6366F1]/50 transition-all"
            >
              Next: Using AI →
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
