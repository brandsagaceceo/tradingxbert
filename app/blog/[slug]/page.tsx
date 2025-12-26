"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface BlogPost {
  title: string;
  description: string;
  image: string;
  readTime: string;
  category: string;
  date: string;
  content: React.ReactNode;
}

const blogDatabase: Record<string, BlogPost> = {
  "chart-patterns-guide": {
    title: "The Ultimate Guide to Chart Patterns Every Trader Must Master in 2025",
    description: "Master these proven technical analysis patterns to predict market movements with 85% accuracy and maximize your trading profits",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=600&fit=crop",
    readTime: "25 min read",
    category: "Technical Analysis",
    date: "Dec 7, 2025",
    content: (
      <div className="space-y-12">
        {/* Introduction */}
        <section>
          <p className="text-lg text-neutral-300 leading-relaxed">
            Chart patterns are the secret language of the markets. Professional traders who understand these patterns can spot opportunities before they appear on mainstream radar, giving them a significant edge in today's volatile markets. Whether you're a beginner or an experienced trader, mastering these patterns is essential for consistent profitability.
          </p>
        </section>

        {/* Why Patterns Matter */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 p-8 rounded-2xl border border-[#6366F1]/20"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Why Chart Patterns Matter More Than Ever</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "🌐", title: "Universal Language", desc: "Works across all markets - stocks, crypto, forex" },
              { icon: "📊", title: "Proven Track Record", desc: "70-85% success rate when properly identified" },
              { icon: "⚡", title: "Early Warning System", desc: "Spot reversals before most traders" },
              { icon: "🎯", title: "Risk Management", desc: "Clear entry, exit, and stop-loss levels" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <span className="text-4xl">{item.icon}</span>
                <div>
                  <h3 className="text-white font-bold mb-1">{item.title}</h3>
                  <p className="text-neutral-400 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Pattern 1: Head and Shoulders */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-6">1. Head and Shoulders: The King of Reversal Patterns</h2>
          
          <div className="relative h-80 mb-8 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1200&h=400&fit=crop"
              alt="Head and Shoulders Pattern"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent"></div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-2xl font-bold text-[#6366F1] mb-4">What Makes It Powerful</h3>
              <p className="text-neutral-300 leading-relaxed">
                The head and shoulders pattern is considered the most reliable reversal indicator in technical analysis, with an average <span className="text-[#6366F1] font-bold">success rate of 83%</span>. This pattern signals that the current trend is exhausted and a reversal is imminent.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: "Left Shoulder", desc: "First peak with moderate volume" },
                { title: "Head", desc: "Higher peak (highest point) with strong volume" },
                { title: "Right Shoulder", desc: "Third peak similar to left, declining volume" }
              ].map((part, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/20 p-6 rounded-xl border border-[#6366F1]/30"
                >
                  <div className="text-3xl font-bold text-[#6366F1] mb-2">{i + 1}</div>
                  <h4 className="text-white font-bold mb-2">{part.title}</h4>
                  <p className="text-neutral-400 text-sm">{part.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-xl">
              <h4 className="text-emerald-400 font-bold text-xl mb-4">✅ Pro Tips</h4>
              <ul className="space-y-2 text-neutral-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">▸</span>
                  <span>Wait for the neckline break - early entry increases failure risk</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">▸</span>
                  <span>Volume should decrease from left shoulder → head → right shoulder</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">▸</span>
                  <span>The pattern takes time to form (typically 3-6 months)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">▸</span>
                  <span>Inverse head and shoulders signals bullish reversal with same rules</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-xl">
              <h4 className="text-blue-400 font-bold text-xl mb-4">📈 Real-World Example</h4>
              <p className="text-neutral-300">
                Consider Bitcoin's 2021 top: The pattern formed over 3 months with the head at <span className="text-white font-bold">$64,800</span>, and shoulders at <span className="text-white font-bold">$58,000</span>. When the neckline at $53,000 broke, BTC fell to $29,000 - a <span className="text-red-400 font-bold">45% decline</span> predicted by the pattern's target.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Pattern 2: Double Top/Bottom */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-6">2. Double Top and Double Bottom: The Reversal Twins</h2>
          
          <div className="relative h-80 mb-8 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=1200&h=400&fit=crop"
              alt="Double Top Bottom Pattern"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent"></div>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-neutral-300 leading-relaxed">
              With a <span className="text-[#6366F1] font-bold">78% success rate</span>, double tops and bottoms are among the most frequently occurring and profitable patterns. They represent a major battle between buyers and sellers, with clear winners and losers.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-red-400 mb-4">Double Top - Bearish</h3>
                <ul className="space-y-3 text-neutral-300">
                  <li>• Price rallies to resistance (first top)</li>
                  <li>• Falls back to support</li>
                  <li>• Rallies to similar resistance (second top)</li>
                  <li>• Breaks below support = confirmation</li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-emerald-400 mb-4">Double Bottom - Bullish</h3>
                <ul className="space-y-3 text-neutral-300">
                  <li>• Two bottoms at similar support levels</li>
                  <li>• Rally between bottoms</li>
                  <li>• Break above resistance confirms pattern</li>
                  <li>• Volume should increase on second bottom</li>
                </ul>
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 p-6 rounded-xl">
              <h4 className="text-purple-400 font-bold text-xl mb-4">🚀 Success Story</h4>
              <p className="text-neutral-300">
                Tesla's 2023 double bottom at <span className="text-white font-bold">$101</span> provided a textbook setup. After forming two bottoms in January and April, the stock broke resistance at $120 with heavy volume, eventually rallying to <span className="text-emerald-400 font-bold">$299</span> - a <span className="text-emerald-400 font-bold">196% gain</span> from the pattern confirmation.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Pattern 3: Triangles */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-6">3. Triangles: The Consolidation Powerhouses</h2>
          
          <div className="relative h-80 mb-8 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=400&fit=crop"
              alt="Triangle Patterns"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent"></div>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-neutral-300 leading-relaxed">
              Triangle patterns are continuation patterns that appear when the market consolidates before making its next major move. Understanding each type gives you a roadmap for the next price explosion.
            </p>

            <div className="space-y-4">
              {[
                {
                  type: "Ascending Triangle",
                  success: "75%",
                  color: "emerald",
                  desc: "Flat horizontal resistance with rising support. Buyers becoming more aggressive.",
                  icon: "📈"
                },
                {
                  type: "Descending Triangle",
                  success: "72%",
                  color: "red",
                  desc: "Flat horizontal support with declining resistance. Sellers getting more aggressive.",
                  icon: "📉"
                },
                {
                  type: "Symmetrical Triangle",
                  success: "70%",
                  color: "blue",
                  desc: "Converging support and resistance. Equal pressure from buyers/sellers.",
                  icon: "⚖️"
                }
              ].map((triangle, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 10 }}
                  className={`bg-${triangle.color}-500/10 border border-${triangle.color}-500/30 p-6 rounded-xl`}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-5xl">{triangle.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className={`text-xl font-bold text-${triangle.color}-400`}>{triangle.type}</h3>
                        <span className={`px-3 py-1 text-xs font-bold bg-${triangle.color}-500/20 text-${triangle.color}-300 rounded-full`}>
                          {triangle.success} Success
                        </span>
                      </div>
                      <p className="text-neutral-300">{triangle.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Pattern 4: Flags and Pennants */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-6">4. Flags and Pennants: The Momentum Trader's Best Friend</h2>
          
          <div className="relative h-80 mb-8 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1642790551116-18e150f248e8?w=1200&h=400&fit=crop"
              alt="Flag and Pennant Patterns"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent"></div>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-neutral-300 leading-relaxed">
              Flags and pennants have an impressive <span className="text-[#6366F1] font-bold">82% success rate</span> because they represent brief pauses in strong trending moves. They're the market taking a breath before the next explosive move.
            </p>

            <div className="bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 p-8 rounded-2xl border border-[#6366F1]/20">
              <h3 className="text-2xl font-bold text-white mb-6">Ideal Setup Checklist</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Flagpole must be strong and fast (minimum 20% move)",
                  "Consolidation on declining volume",
                  "Pattern duration: 1-3 weeks",
                  "Breakout volume must exceed average",
                  "Works best in strong trending markets",
                  "Target: Flagpole length from breakout"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-emerald-400 text-xl">✓</span>
                    <span className="text-neutral-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 p-6 rounded-xl">
              <h4 className="text-yellow-400 font-bold text-xl mb-4">💡 Real-World Application</h4>
              <p className="text-neutral-300">
                NVIDIA's 2023 rally featured multiple flag patterns. Each 1-2 week pause led to another leg higher, with flags providing <span className="text-emerald-400 font-bold">40-60% gains</span> per breakout. Traders who mastered these patterns captured the entire <span className="text-emerald-400 font-bold">240% yearly move</span>.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Common Mistakes */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-red-500/10 to-orange-500/10 p-8 rounded-2xl border border-red-500/30"
        >
          <h2 className="text-3xl font-bold text-white mb-6">⚠️ Common Mistakes That Cost Traders Money</h2>
          <div className="space-y-4">
            {[
              {
                mistake: "Trading Without Confirmation",
                solution: "Wait for price to break key level with 2-3% confirmation and volume surge"
              },
              {
                mistake: "Ignoring Volume",
                solution: "Require 1.5x average volume minimum on breakouts. Low volume = likely failure"
              },
              {
                mistake: "No Risk Management",
                solution: "Never risk more than 1-2% per trade. Always set stop loss before entry"
              },
              {
                mistake: "Forcing Patterns",
                solution: "Be selective - wait for textbook setups. Quality over quantity always wins"
              }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">❌</span>
                  <div className="flex-1">
                    <h3 className="text-red-400 font-bold mb-2">{item.mistake}</h3>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">Solution:</span>
                      <p className="text-neutral-300 flex-1">{item.solution}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Action Plan */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#6366F1]/20 to-[#8B5CF6]/20 p-10 rounded-2xl border border-[#6366F1]/30"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">🎯 Your Pattern Trading Action Plan</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { week: "Week 1-2", title: "Education Phase", tasks: ["Study 2-3 patterns in depth", "Review 10 historical examples", "Watch pattern videos", "Join trading communities"] },
              { week: "Week 3-4", title: "Identification Phase", tasks: ["Scan charts daily (30 min)", "Mark patterns on charts", "Note characteristics", "Build recognition skills"] },
              { week: "Week 5-8", title: "Paper Trading", tasks: ["Execute paper trades", "Track results in journal", "Analyze wins and losses", "Refine entry/exit rules"] },
              { week: "Week 9+", title: "Live Trading", tasks: ["Start with minimum sizes", "Trade only best setups", "Track every trade", "Gradually increase size"] }
            ].map((phase, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 p-6 rounded-xl border border-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl font-bold text-[#6366F1]">{i + 1}</div>
                  <div>
                    <div className="text-[#6366F1] font-bold text-sm">{phase.week}</div>
                    <h3 className="text-white font-bold">{phase.title}</h3>
                  </div>
                </div>
                <ul className="space-y-2">
                  {phase.tasks.map((task, j) => (
                    <li key={j} className="flex items-start gap-2 text-neutral-300 text-sm">
                      <span className="text-[#6366F1]">▸</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Conclusion */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">Your Path to Pattern Trading Mastery</h2>
          <div className="space-y-6">
            <p className="text-lg text-neutral-300 leading-relaxed">
              Chart patterns are not magic, but they're the closest thing to a crystal ball in trading. With proven success rates of 70-85%, these patterns have made fortunes for traders who master them.
            </p>
            <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 p-8 rounded-2xl border border-emerald-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">Remember the Essentials:</h3>
              <ul className="grid md:grid-cols-2 gap-3">
                {[
                  "Wait for clear pattern formation",
                  "Confirm with volume",
                  "Use proper risk management",
                  "Start with 2-3 patterns",
                  "Practice before live trading",
                  "Track everything in a journal"
                ].map((essential, i) => (
                  <li key={i} className="flex items-center gap-3 text-neutral-300">
                    <span className="text-emerald-400 text-xl">✓</span>
                    <span>{essential}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>
      </div>
    )
  },
  "ai-trading-revolution": {
    title: "How AI is Revolutionizing Trading in 2025: The Complete Guide",
    description: "Discover how artificial intelligence and machine learning are transforming trading strategies. Learn to leverage AI tools for 10x better trading decisions.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
    readTime: "18 min read",
    category: "AI Trading",
    date: "Dec 6, 2025",
    content: (
      <div className="space-y-12">
        <section>
          <p className="text-lg text-neutral-300 leading-relaxed">
            Artificial Intelligence is fundamentally transforming how traders analyze markets, execute trades, and manage risk. What once required years of experience can now be augmented—and in some cases, automated—by sophisticated AI algorithms. This comprehensive guide explores how you can leverage AI to gain a competitive edge in today's markets.
          </p>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 p-8 rounded-2xl border border-[#6366F1]/20"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Why AI Trading is the Future</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "🚀", title: "Speed & Scale", desc: "Analyze thousands of data points in milliseconds" },
              { icon: "🎯", title: "Pattern Recognition", desc: "Identify complex patterns invisible to human eye" },
              { icon: "📊", title: "Data Processing", desc: "Process news, sentiment, and market data simultaneously" },
              { icon: "🤖", title: "Emotion-Free", desc: "Remove fear and greed from trading decisions" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <span className="text-4xl">{item.icon}</span>
                <div>
                  <h3 className="text-white font-bold mb-1">{item.title}</h3>
                  <p className="text-neutral-400 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-6">How to Get Started with AI Trading</h2>
          <div className="space-y-6">
            <p className="text-neutral-300 leading-relaxed">
              Start using TradingXbert's AI-powered analysis to identify high-probability setups, assess risk levels, and make data-driven decisions. Our platform combines machine learning with proven technical analysis to give you actionable insights in seconds.
            </p>
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-xl">
              <h3 className="text-emerald-400 font-bold text-xl mb-4">✨ Key Benefits of AI-Powered Trading</h3>
              <ul className="space-y-3 text-neutral-300">
                <li>• Real-time market analysis across multiple assets</li>
                <li>• Automated pattern recognition and signal generation</li>
                <li>• Risk assessment and position sizing recommendations</li>
                <li>• Sentiment analysis from news and social media</li>
                <li>• Backtesting strategies with historical data</li>
              </ul>
            </div>
          </div>
        </motion.section>
      </div>
    )
  },
  "risk-management-mastery": {
    title: "Risk Management Mastery: How Professional Traders Protect Capital",
    description: "The definitive guide to risk management that separates profitable traders from the rest. Position sizing, stop losses, and portfolio protection strategies.",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1200&h=600&fit=crop",
    readTime: "20 min read",
    category: "Risk Management",
    date: "Dec 5, 2025",
    content: (
      <div className="space-y-12">
        <section>
          <p className="text-lg text-neutral-300 leading-relaxed">
            Risk management is the most important—yet most overlooked—aspect of successful trading. Professional traders don't focus on making money; they focus on NOT LOSING money. Master these principles, and profitability will follow naturally.
          </p>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-red-500/10 to-orange-500/10 p-8 rounded-2xl border border-red-500/30"
        >
          <h2 className="text-3xl font-bold text-white mb-6">The Golden Rules of Risk Management</h2>
          <div className="space-y-6">
            {[
              { rule: "Never Risk More Than 1-2% Per Trade", desc: "Protect your capital by limiting exposure on any single trade. This ensures you can survive losing streaks." },
              { rule: "Always Use Stop Losses", desc: "Set your stop loss BEFORE entering the trade. Never move it further away—only tighten it." },
              { rule: "Position Sizing is Critical", desc: "Calculate position size based on account size and stop loss distance. Larger stop = smaller position." },
              { rule: "Diversify Across Assets", desc: "Don't put all capital in one market. Spread risk across uncorrelated assets." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 p-6 rounded-xl border border-white/10"
              >
                <h3 className="text-orange-400 font-bold text-xl mb-2">{item.rule}</h3>
                <p className="text-neutral-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-6">Position Sizing Calculator</h2>
          <div className="bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 p-8 rounded-2xl border border-[#6366F1]/20">
            <p className="text-neutral-300 mb-6">
              <span className="text-white font-bold">Formula:</span> Position Size = (Account Size × Risk %) ÷ (Entry Price - Stop Loss Price)
            </p>
            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-xl">
                <p className="text-neutral-400 text-sm mb-2">Example:</p>
                <p className="text-neutral-300">Account: $10,000 | Risk: 2% ($200) | Entry: $50 | Stop: $48 | Distance: $2</p>
                <p className="text-emerald-400 font-bold mt-2">Position Size = $200 ÷ $2 = 100 shares</p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    )
  },
  "scalping-strategies": {
    title: "Scalping Strategies for 2025: Make Money in Minutes",
    description: "Advanced scalping techniques used by professional day traders. Learn the setups, indicators, and psychology needed for consistent scalping profits.",
    image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=1200&h=600&fit=crop",
    readTime: "22 min read",
    category: "Day Trading",
    date: "Dec 4, 2025",
    content: (
      <div className="space-y-12">
        <section>
          <p className="text-lg text-neutral-300 leading-relaxed">
            Scalping is the art of making small, rapid profits by entering and exiting trades within minutes—sometimes seconds. It requires precision, discipline, and the right setup. This guide reveals the strategies professional scalpers use to generate consistent daily profits.
          </p>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 p-8 rounded-2xl border border-[#6366F1]/20"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Essential Scalping Indicators</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "1-min Chart", desc: "Primary timeframe for entries" },
              { name: "EMA 9/21", desc: "Trend direction and crossovers" },
              { name: "VWAP", desc: "Key support/resistance levels" },
              { name: "Volume", desc: "Confirm breakout strength" },
              { name: "Level 2", desc: "Order flow and liquidity" },
              { name: "Time & Sales", desc: "Real-time trade execution" }
            ].map((indicator, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 p-6 rounded-xl border border-white/10 text-center"
              >
                <h3 className="text-[#6366F1] font-bold mb-2">{indicator.name}</h3>
                <p className="text-neutral-400 text-sm">{indicator.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-6">Top 3 Scalping Setups</h2>
          <div className="space-y-6">
            {[
              {
                setup: "VWAP Bounce",
                entry: "Price pulls back to VWAP with volume",
                exit: "Target 2-5 cents profit or next resistance",
                win: "75%"
              },
              {
                setup: "Opening Range Breakout",
                entry: "Break of first 5-min high/low with volume",
                exit: "1:1.5 risk/reward or momentum exhaustion",
                win: "70%"
              },
              {
                setup: "EMA Crossover",
                entry: "9 EMA crosses 21 EMA with price confirmation",
                exit: "Opposite crossover or 3-8 cents",
                win: "68%"
              }
            ].map((strategy, i) => (
              <div key={i} className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 p-6 rounded-xl border border-emerald-500/20">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-emerald-400">{strategy.setup}</h3>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-bold">{strategy.win} Win Rate</span>
                </div>
                <div className="space-y-2 text-neutral-300">
                  <p><span className="text-white font-bold">Entry:</span> {strategy.entry}</p>
                  <p><span className="text-white font-bold">Exit:</span> {strategy.exit}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-yellow-500/10 border border-yellow-500/30 p-8 rounded-2xl"
        >
          <h2 className="text-3xl font-bold text-white mb-6">⚡ Scalping Psychology</h2>
          <div className="space-y-4 text-neutral-300">
            <p className="leading-relaxed">
              <span className="text-yellow-400 font-bold">Speed over perfection:</span> Don't wait for the "perfect" setup. Take the trade when your criteria are met.
            </p>
            <p className="leading-relaxed">
              <span className="text-yellow-400 font-bold">Cut losses instantly:</span> If the trade doesn't work in 30-60 seconds, exit. Don't hope it comes back.
            </p>
            <p className="leading-relaxed">
              <span className="text-yellow-400 font-bold">Take profits quickly:</span> Small gains add up. Don't get greedy trying to squeeze every cent.
            </p>
          </div>
        </motion.section>
      </div>
    )
  },
  "crypto-trading-2025": {
    title: "Cryptocurrency Trading in 2025: Navigate the Bull Market",
    description: "Everything you need to know about trading crypto in 2025. Market cycles, top altcoins, DeFi opportunities, and risk management for volatile markets.",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&h=600&fit=crop",
    readTime: "24 min read",
    category: "Cryptocurrency",
    date: "Dec 3, 2025",
    content: (
      <div className="space-y-12">
        <section>
          <p className="text-lg text-neutral-300 leading-relaxed">
            The cryptocurrency market in 2025 is more mature, regulated, and institutional than ever before. Bitcoin ETFs, mainstream adoption, and improved infrastructure have created unprecedented opportunities for traders. This guide shows you how to capitalize on the crypto bull market while managing the unique risks.
          </p>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 p-8 rounded-2xl border border-[#6366F1]/20"
        >
          <h2 className="text-3xl font-bold text-white mb-6">2025 Crypto Market Landscape</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "🏦", title: "Institutional Adoption", desc: "Major banks and hedge funds now hold crypto" },
              { icon: "📈", title: "Bitcoin ETFs", desc: "Multiple spot ETFs approved and trading" },
              { icon: "🌐", title: "DeFi Maturation", desc: "Decentralized finance reaching mainstream" },
              { icon: "⚖️", title: "Clear Regulations", desc: "Regulatory clarity in major markets" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <span className="text-4xl">{item.icon}</span>
                <div>
                  <h3 className="text-white font-bold mb-1">{item.title}</h3>
                  <p className="text-neutral-400 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-6">Top Trading Opportunities in 2025</h2>
          <div className="space-y-6">
            {[
              {
                category: "Bitcoin (BTC)",
                opportunity: "Digital gold narrative + ETF inflows",
                strategy: "Long-term hold with position trading on dips"
              },
              {
                category: "Ethereum (ETH)",
                opportunity: "Layer 2 scaling + institutional adoption",
                strategy: "Accumulate on pullbacks, stake for yield"
              },
              {
                category: "DeFi Tokens",
                opportunity: "Real yield protocols gaining traction",
                strategy: "Swing trade leaders with strong fundamentals"
              },
              {
                category: "Layer 2 Solutions",
                opportunity: "Solving Ethereum's scalability",
                strategy: "Early positions in top L2 ecosystems"
              }
            ].map((opp, i) => (
              <div key={i} className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-[#6366F1]/50 transition-all">
                <h3 className="text-[#6366F1] font-bold text-xl mb-2">{opp.category}</h3>
                <p className="text-neutral-300 mb-2"><span className="text-white font-bold">Opportunity:</span> {opp.opportunity}</p>
                <p className="text-neutral-400 text-sm"><span className="text-white font-bold">Strategy:</span> {opp.strategy}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-red-500/10 border border-red-500/30 p-8 rounded-2xl"
        >
          <h2 className="text-3xl font-bold text-white mb-6">⚠️ Crypto-Specific Risks</h2>
          <div className="space-y-4 text-neutral-300">
            <p className="leading-relaxed">
              <span className="text-red-400 font-bold">Extreme volatility:</span> 20-30% daily swings are common. Size positions accordingly and use stop losses.
            </p>
            <p className="leading-relaxed">
              <span className="text-red-400 font-bold">24/7 markets:</span> No circuit breakers or market close. Use alerts and don't over-leverage.
            </p>
            <p className="leading-relaxed">
              <span className="text-red-400 font-bold">Custody risk:</span> Use reputable exchanges and consider cold storage for large holdings.
            </p>
            <p className="leading-relaxed">
              <span className="text-red-400 font-bold">Regulatory changes:</span> Policy shifts can impact prices instantly. Stay informed of developments.
            </p>
          </div>
        </motion.section>
      </div>
    )
  },
  "trading-psychology": {
    title: "Trading Psychology: Master Your Mind, Master the Markets",
    description: "The mental game of trading revealed. Overcome fear, greed, and emotional trading. Build the psychological foundation for consistent profitability.",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=1200&h=600&fit=crop",
    readTime: "19 min read",
    category: "Psychology",
    date: "Dec 2, 2025",
    content: (
      <div className="space-y-12">
        <section>
          <p className="text-lg text-neutral-300 leading-relaxed">
            95% of traders fail—not because of bad strategies, but because of poor psychology. The markets are a psychological battlefield where emotions like fear, greed, and hope dictate most decisions. Master your mind, and you'll master the markets. This guide reveals the mental frameworks used by the top 5% of traders.
          </p>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-8 rounded-2xl border border-purple-500/30"
        >
          <h2 className="text-3xl font-bold text-white mb-6">The 4 Emotional Enemies of Traders</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { emotion: "Fear", impact: "Causes premature exits and missed opportunities", solution: "Trust your system and pre-defined rules" },
              { emotion: "Greed", impact: "Leads to over-trading and excessive risk", solution: "Set profit targets and stick to position sizes" },
              { emotion: "Hope", impact: "Holding losing trades waiting for recovery", solution: "Use stop losses without exception" },
              { emotion: "Revenge", impact: "Trying to 'win back' losses with reckless trades", solution: "Step away after losses, review objectively" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 p-6 rounded-xl border border-white/10"
              >
                <h3 className="text-purple-400 font-bold text-xl mb-2">{item.emotion}</h3>
                <p className="text-neutral-400 text-sm mb-3"><span className="text-white font-bold">Impact:</span> {item.impact}</p>
                <p className="text-emerald-400 text-sm"><span className="text-white font-bold">Solution:</span> {item.solution}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-6">Building Mental Discipline</h2>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 p-6 rounded-xl border border-[#6366F1]/20">
              <h3 className="text-[#6366F1] font-bold text-2xl mb-4">The Pre-Trade Checklist</h3>
              <ul className="space-y-3 text-neutral-300">
                <li className="flex items-start gap-3">
                  <span className="text-[#6366F1] text-xl">✓</span>
                  <span>Setup matches my proven strategy criteria</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#6366F1] text-xl">✓</span>
                  <span>Risk/reward ratio minimum 1:2</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#6366F1] text-xl">✓</span>
                  <span>Position size calculated based on stop loss</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#6366F1] text-xl">✓</span>
                  <span>Entry, stop, and target prices written down</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#6366F1] text-xl">✓</span>
                  <span>Emotional state: calm and focused (not angry, anxious, or euphoric)</span>
                </li>
              </ul>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-xl">
              <h3 className="text-emerald-400 font-bold text-2xl mb-4">Daily Trading Routine</h3>
              <div className="space-y-4 text-neutral-300">
                <p><span className="text-white font-bold">Morning:</span> Review previous day's trades, market news, and today's economic calendar. Set daily loss limit.</p>
                <p><span className="text-white font-bold">During Trading:</span> Follow checklist for every trade. Take breaks after wins AND losses. Stay hydrated.</p>
                <p><span className="text-white font-bold">Evening:</span> Journal all trades with emotional state notes. Calculate metrics. Plan tomorrow.</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-yellow-500/10 border border-yellow-500/30 p-8 rounded-2xl"
        >
          <h2 className="text-3xl font-bold text-white mb-6">💎 The Winning Trader's Mindset</h2>
          <div className="space-y-4 text-neutral-300">
            <p className="leading-relaxed">
              <span className="text-yellow-400 font-bold">Think in probabilities:</span> Any single trade can win or lose. Focus on process, not outcome.
            </p>
            <p className="leading-relaxed">
              <span className="text-yellow-400 font-bold">Embrace losses:</span> Losses are business expenses, not personal failures. They're part of the game.
            </p>
            <p className="leading-relaxed">
              <span className="text-yellow-400 font-bold">Patience pays:</span> The best traders wait for their setup. They don't force trades out of boredom.
            </p>
            <p className="leading-relaxed">
              <span className="text-yellow-400 font-bold">Continuous improvement:</span> Review every trade. Learn from wins AND losses. Adapt and evolve.
            </p>
          </div>
        </motion.section>
      </div>
    )
  }
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const post = blogDatabase[params.slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0F] via-[#1a1a2e] to-[#0A0A0F]">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] z-50 origin-left"
        style={{ scaleX: readingProgress / 100 }}
      />

      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/80 to-transparent"></div>
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 pb-16 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-2 text-sm font-semibold bg-[#6366F1] text-white rounded-full">
                  {post.category}
                </span>
                <span className="text-neutral-400 text-sm">{post.date}</span>
                <span className="text-neutral-400 text-sm">• {post.readTime}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {post.title}
              </h1>
              <p className="text-xl text-neutral-300 max-w-3xl">
                {post.description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-invert prose-lg max-w-none">
          {post.content}
        </div>
      </article>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-4 py-16"
      >
        <div className="bg-gradient-to-r from-[#6366F1]/20 to-[#8B5CF6]/20 p-12 rounded-3xl border border-[#6366F1]/30 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Put These Patterns to Work?
          </h2>
          <p className="text-neutral-300 mb-8 max-w-2xl mx-auto">
            Use TradingXbert's AI-powered analysis to identify these patterns automatically in real-time
          </p>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-bold rounded-full hover:shadow-lg hover:shadow-[#6366F1]/50 transition-all"
            >
              Start Analyzing Charts Now
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Back to Blog */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <Link href="/blog">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-[#6366F1] font-semibold hover:text-[#8B5CF6] transition-colors"
          >
            ← Back to All Articles
          </motion.button>
        </Link>
      </div>
    </div>
  );
}