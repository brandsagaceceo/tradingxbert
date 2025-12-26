"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const SpotGoodTrades = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0A0F] via-[#1a1a2e] to-[#0A0A0F]">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 px-4 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1]/10 to-[#3B82F6]/10"></div>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#6366F1]/20 rounded-full blur-3xl"
        ></motion.div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-[#6366F1] to-[#3B82F6] bg-clip-text text-transparent"
          >
            How to Spot Good Trades
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-neutral-300 max-w-2xl mx-auto"
          >
            Master the art of identifying high-probability trading opportunities
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Introduction */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <p className="text-lg text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Spotting good trades is a critical skill that separates profitable traders from the rest. In this comprehensive guide, we'll explore proven strategies and indicators to help you identify high-probability trading opportunities.
          </p>
        </motion.section>

        {/* Strategy 1 */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl font-bold text-[#6366F1]">1</span>
                <h2 className="text-3xl font-bold text-white">Use Technical Indicators</h2>
              </div>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                Technical indicators are mathematical calculations based on price, volume, or open interest that help predict future price movements.
              </p>
              <div className="space-y-4">
                {[
                  { name: "RSI (Relative Strength Index)", desc: "Identifies overbought (>70) or oversold (<30) conditions" },
                  { name: "MACD (Moving Average Convergence Divergence)", desc: "Shows trend direction and momentum strength" },
                  { name: "Bollinger Bands", desc: "Indicates volatility and potential reversal points" }
                ].map((indicator, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 10 }}
                    className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-[#6366F1]/50 transition-all"
                  >
                    <h3 className="text-white font-bold mb-1">{indicator.name}</h3>
                    <p className="text-neutral-400 text-sm">{indicator.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative h-80 rounded-2xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=600&fit=crop"
                alt="Technical Indicators"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent"></div>
            </motion.div>
          </div>
        </motion.section>

        {/* Strategy 2 */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative h-80 rounded-2xl overflow-hidden order-2 md:order-1"
            >
              <Image
                src="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&h=600&fit=crop"
                alt="Support and Resistance"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent"></div>
            </motion.div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl font-bold text-[#6366F1]">2</span>
                <h2 className="text-3xl font-bold text-white">Analyze Support & Resistance</h2>
              </div>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                Support and resistance levels are key price points where the market tends to reverse or consolidate. These psychological barriers are crucial for planning entries and exits.
              </p>
              <div className="bg-gradient-to-r from-[#6366F1]/10 to-[#3B82F6]/10 p-6 rounded-xl border border-[#6366F1]/20">
                <h3 className="text-white font-bold mb-4">Key Concepts:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#6366F1] font-bold">▸</span>
                    <span className="text-neutral-300"><span className="text-white font-bold">Support:</span> Price level where buying pressure exceeds selling pressure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#6366F1] font-bold">▸</span>
                    <span className="text-neutral-300"><span className="text-white font-bold">Resistance:</span> Price level where selling pressure exceeds buying pressure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#6366F1] font-bold">▸</span>
                    <span className="text-neutral-300"><span className="text-white font-bold">Breakout:</span> When price breaks through support/resistance with volume</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Strategy 3 */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl font-bold text-[#6366F1]">3</span>
                <h2 className="text-3xl font-bold text-white">Monitor Volume</h2>
              </div>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                Volume is the fuel that drives price movements. High volume confirms the strength of a move, while low volume suggests weakness.
              </p>
              <div className="space-y-4">
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-xl">
                  <h3 className="text-emerald-400 font-bold text-xl mb-3">✅ High Volume Signals</h3>
                  <ul className="space-y-2 text-neutral-300">
                    <li>• Strong conviction behind the move</li>
                    <li>• Breakouts more likely to succeed</li>
                    <li>• Trend changes are confirmed</li>
                    <li>• Institutional participation</li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-xl">
                  <h3 className="text-red-400 font-bold text-xl mb-3">❌ Low Volume Warnings</h3>
                  <ul className="space-y-2 text-neutral-300">
                    <li>• Weak moves likely to reverse</li>
                    <li>• Fake breakouts common</li>
                    <li>• Lack of market interest</li>
                    <li>• Higher risk of traps</li>
                  </ul>
                </div>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative h-80 rounded-2xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop"
                alt="Volume Analysis"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent"></div>
            </motion.div>
          </div>
        </motion.section>

        {/* Strategy 4 */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative h-80 rounded-2xl overflow-hidden order-2 md:order-1"
            >
              <Image
                src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop"
                alt="Market News"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent"></div>
            </motion.div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl font-bold text-[#6366F1]">4</span>
                <h2 className="text-3xl font-bold text-white">Stay Updated on Market News</h2>
              </div>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                Market news and events can trigger significant price movements. Staying informed helps you avoid surprises and capitalize on opportunities.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "📰", title: "Earnings Reports", impact: "High" },
                  { icon: "📊", title: "Economic Data", impact: "High" },
                  { icon: "🏦", title: "Fed Announcements", impact: "Critical" },
                  { icon: "🌍", title: "Geopolitical Events", impact: "Variable" }
                ].map((news, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-[#6366F1]/50 transition-all text-center"
                  >
                    <div className="text-3xl mb-2">{news.icon}</div>
                    <h3 className="text-white font-bold text-sm mb-1">{news.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      news.impact === 'Critical' ? 'bg-red-500/20 text-red-400' :
                      news.impact === 'High' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {news.impact}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Checklist Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#6366F1]/10 to-[#3B82F6]/10 p-10 rounded-2xl border border-[#6366F1]/20 mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Trade Setup Checklist</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Clear trend direction identified",
              "Multiple indicators confirm setup",
              "Support/resistance levels marked",
              "Volume confirms the move",
              "Risk/reward ratio minimum 1:2",
              "Stop loss level defined",
              "Entry and exit plan ready",
              "Market news reviewed"
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 bg-white/5 p-4 rounded-xl"
              >
                <span className="text-emerald-400 text-2xl">✓</span>
                <span className="text-neutral-300">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-[#6366F1]/20 to-[#3B82F6]/20 p-12 rounded-3xl border border-[#6366F1]/30">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Spot Your Next Winning Trade?</h2>
            <p className="text-neutral-300 mb-8 max-w-2xl mx-auto">
              Use TradingXbert's AI-powered analysis to identify high-probability setups automatically
            </p>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-[#6366F1] to-[#3B82F6] text-white font-bold rounded-full hover:shadow-lg hover:shadow-[#6366F1]/50 transition-all"
              >
                Start Analyzing Charts
              </motion.button>
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default SpotGoodTrades;
