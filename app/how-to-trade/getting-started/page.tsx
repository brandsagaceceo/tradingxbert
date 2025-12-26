"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function GettingStarted() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0A0F] via-[#1a1a2e] to-[#0A0A0F]">
      {/* Hero */}
      <div className="relative h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=400&fit=crop"
          alt="Getting Started with Trading"
          width={1200}
          height={400}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-[#0A0A0F]/50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-bold mb-4"
          >
            Course 1 • Beginner • 45 min
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4"
          >
            Getting Started with Trading
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-neutral-300 max-w-2xl"
          >
            Master the fundamentals and build a solid trading foundation
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Course Overview */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-[#6366F1]/10 to-[#3B82F6]/10 p-8 rounded-2xl border border-[#6366F1]/20">
            <h2 className="text-3xl font-bold text-white mb-6">📚 What You'll Learn</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "What is trading and how markets work",
                "Different market types (Forex, Stocks, Crypto)",
                "Essential trading terminology",
                "How to read basic charts",
                "Market participants and order types",
                "Setting up your first trading account"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-neutral-300">
                  <span className="text-[#6366F1] text-xl">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Lesson 1 */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">Lesson 1: What is Trading?</h2>
          <div className="mb-8">
            <Image
              src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=400&fit=crop"
              alt="Trading Basics"
              width={800}
              height={400}
              className="w-full rounded-xl"
            />
          </div>
          <div className="space-y-4 text-neutral-300 text-lg leading-relaxed">
            <p>
              Trading is the act of buying and selling financial instruments (stocks, currencies, cryptocurrencies) with the goal of making a profit. Unlike investing, which focuses on long-term growth, trading typically involves shorter timeframes—from minutes to months.
            </p>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-white font-bold text-xl mb-3">Key Concept: Buy Low, Sell High</h3>
              <p>The fundamental principle of trading is simple: purchase an asset when its price is low and sell it when the price increases. The difference is your profit.</p>
            </div>
            <p>
              Professional traders use <span className="text-[#6366F1] font-bold">technical analysis</span> (chart patterns, indicators) and <span className="text-[#6366F1] font-bold">fundamental analysis</span> (news, economic data) to predict price movements and make informed decisions.
            </p>
          </div>
        </motion.section>

        {/* Lesson 2 */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">Lesson 2: Types of Markets</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              {
                title: "📈 Stock Market",
                desc: "Trade shares of companies like Apple, Tesla, Microsoft",
                hours: "9:30 AM - 4:00 PM EST",
                volatility: "Medium"
              },
              {
                title: "💱 Forex (FX)",
                desc: "Currency pairs like EUR/USD, GBP/JPY",
                hours: "24/5 (Mon-Fri)",
                volatility: "Medium-High"
              },
              {
                title: "₿ Cryptocurrency",
                desc: "Digital assets like Bitcoin, Ethereum, altcoins",
                hours: "24/7",
                volatility: "Very High"
              },
              {
                title: "📊 Indices",
                desc: "Market baskets like S&P 500, NASDAQ, Dow Jones",
                hours: "9:30 AM - 4:00 PM EST",
                volatility: "Medium"
              }
            ].map((market, i) => (
              <div key={i} className="bg-gradient-to-br from-white/5 to-white/[0.02] p-6 rounded-xl border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-3">{market.title}</h3>
                <p className="text-neutral-300 mb-4">{market.desc}</p>
                <div className="space-y-2 text-sm">
                  <p className="text-neutral-400"><span className="text-white font-bold">Hours:</span> {market.hours}</p>
                  <p className="text-neutral-400"><span className="text-white font-bold">Volatility:</span> {market.volatility}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Lesson 3 */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">Lesson 3: Essential Trading Terms</h2>
          <div className="space-y-4">
            {[
              { term: "Bull Market", def: "A market trending upward with rising prices" },
              { term: "Bear Market", def: "A market trending downward with falling prices" },
              { term: "Volume", def: "The number of shares/contracts traded in a period" },
              { term: "Liquidity", def: "How easily an asset can be bought or sold" },
              { term: "Volatility", def: "The degree of price fluctuation in an asset" },
              { term: "Leverage", def: "Borrowing money to increase position size (risky)" },
              { term: "Spread", def: "The difference between bid (buy) and ask (sell) price" },
              { term: "Long Position", def: "Buying an asset expecting price to rise" },
              { term: "Short Position", def: "Selling an asset expecting price to fall" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/5 p-5 rounded-xl border border-white/10"
              >
                <h3 className="text-[#6366F1] font-bold text-xl mb-2">{item.term}</h3>
                <p className="text-neutral-300">{item.def}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Lesson 4 */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">Lesson 4: Reading Your First Chart</h2>
          <div className="mb-8">
            <Image
              src="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&h=400&fit=crop"
              alt="Chart Reading"
              width={800}
              height={400}
              className="w-full rounded-xl"
            />
          </div>
          <div className="space-y-6 text-neutral-300 text-lg leading-relaxed">
            <p>
              Charts are the trader's most important tool. They visualize price movements over time, helping you identify trends and make predictions.
            </p>
            <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 p-8 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-2xl mb-4">🕯️ Understanding Candlesticks</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-white font-bold mb-2">Green/White Candle (Bullish):</p>
                  <p>Price closed HIGHER than it opened. Buyers were in control.</p>
                </div>
                <div>
                  <p className="text-white font-bold mb-2">Red/Black Candle (Bearish):</p>
                  <p>Price closed LOWER than it opened. Sellers were in control.</p>
                </div>
                <div>
                  <p className="text-white font-bold mb-2">Candle Parts:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><span className="font-bold">Body:</span> The thick part showing open/close prices</li>
                    <li><span className="font-bold">Wick/Shadow:</span> The thin lines showing high/low prices</li>
                  </ul>
                </div>
              </div>
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
          <Link href="/how-to-trade">
            <motion.button
              whileHover={{ x: -5 }}
              className="px-6 py-3 bg-white/5 text-white rounded-xl border border-white/10 hover:border-[#6366F1]/50 transition-all"
            >
              ← Back to Courses
            </motion.button>
          </Link>
          <Link href="/how-to-trade/spot-good-trades">
            <motion.button
              whileHover={{ x: 5 }}
              className="px-6 py-3 bg-gradient-to-r from-[#6366F1] to-[#3B82F6] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#6366F1]/50 transition-all"
            >
              Next: Spot Good Trades →
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
