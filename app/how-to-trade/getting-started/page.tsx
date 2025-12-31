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
            Course 1 • Beginner • 3 Hours 20 Minutes • 12 Comprehensive Lessons
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
            <h2 className="text-3xl font-bold text-white mb-6">📚 What You'll Master in This Course</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Complete understanding of how financial markets operate globally",
                "Deep dive into Forex, Stocks, Crypto, Commodities, and Indices",
                "Master 50+ essential trading terms and concepts",
                "Advanced chart reading and candlestick pattern recognition",
                "Understanding market psychology and participant behavior",
                "Order types, execution, and trade management",
                "Risk management fundamentals and position sizing",
                "Setting up and optimizing your trading workspace",
                "Platform selection and broker comparison",
                "Market hours, sessions, and optimal trading times",
                "Economic calendar and news impact on markets",
                "Building your first comprehensive trading plan"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-neutral-300">
                  <span className="text-[#6366F1] text-xl">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Lesson 1 - EXPANDED */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">Lesson 1: What is Trading? (Complete Introduction)</h2>
          <div className="mb-8">
            <Image
              src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=400&fit=crop"
              alt="Trading Basics"
              width={800}
              height={400}
              className="w-full rounded-xl"
            />
          </div>
          <div className="space-y-6 text-neutral-300 text-lg leading-relaxed">
            <p className="text-xl font-bold text-white">
              Trading is the strategic buying and selling of financial instruments with the goal of generating profit from price movements. Unlike passive investing, trading requires active participation, market analysis, and disciplined execution.
            </p>
            
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-white font-bold text-2xl mb-4">📊 Trading vs. Investing: Key Differences</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <p className="text-[#6366F1] font-bold text-xl">Trading</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Short to medium-term timeframes (minutes to months)</li>
                    <li>Active buying and selling for quick profits</li>
                    <li>Technical analysis and chart patterns</li>
                    <li>Higher risk, higher potential returns</li>
                    <li>Requires constant market monitoring</li>
                    <li>Capital gains taxed as short-term</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <p className="text-emerald-400 font-bold text-xl">Investing</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Long-term timeframes (years to decades)</li>
                    <li>Buy and hold for compound growth</li>
                    <li>Fundamental analysis and company value</li>
                    <li>Lower risk, steady returns over time</li>
                    <li>Passive management approach</li>
                    <li>Long-term capital gains tax benefits</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#6366F1]/10 to-[#3B82F6]/10 p-8 rounded-xl border border-[#6366F1]/20">
              <h3 className="text-white font-bold text-2xl mb-4">💡 The Core Trading Principle</h3>
              <p className="text-xl mb-4">The foundation of all trading: <span className="text-[#6366F1] font-black">BUY LOW, SELL HIGH</span></p>
              <p className="mb-4">
                This seems obvious, but executing it consistently requires deep understanding of:
              </p>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li><span className="font-bold">Market cycles:</span> Recognizing when prices are at relative lows or highs</li>
                <li><span className="font-bold">Trend analysis:</span> Understanding if the market is bullish, bearish, or ranging</li>
                <li><span className="font-bold">Entry/exit timing:</span> Knowing the optimal moments to enter and exit positions</li>
                <li><span className="font-bold">Risk management:</span> Protecting your capital when you're wrong</li>
                <li><span className="font-bold">Emotional control:</span> Making rational decisions under pressure</li>
              </ul>
            </div>

            <h3 className="text-white font-bold text-2xl mt-8 mb-4">🎯 Types of Trading Styles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  style: "Scalping",
                  time: "Seconds to minutes",
                  desc: "Ultra-short-term trading making dozens of trades per day for small profits. Requires intense focus, fast execution, and tight spreads.",
                  difficulty: "Expert"
                },
                {
                  style: "Day Trading",
                  time: "Minutes to hours",
                  desc: "Opening and closing positions within the same trading day. No overnight risk. Requires full-time commitment and quick decision-making.",
                  difficulty: "Advanced"
                },
                {
                  style: "Swing Trading",
                  time: "Days to weeks",
                  desc: "Holding positions for several days to capture larger price moves. Ideal for part-time traders. Balances risk and reward well.",
                  difficulty: "Intermediate"
                },
                {
                  style: "Position Trading",
                  time: "Weeks to months",
                  desc: "Long-term trading based on major trends. Requires patience and bigger capital. Less time-intensive than other styles.",
                  difficulty: "Beginner-Friendly"
                }
              ].map((type, i) => (
                <div key={i} className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-[#6366F1] font-bold text-xl mb-2">{type.style}</h4>
                  <p className="text-sm text-neutral-400 mb-3">⏱️ {type.time} | 📈 {type.difficulty}</p>
                  <p className="text-neutral-300">{type.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-amber-500/10 p-6 rounded-xl border border-amber-500/30 mt-8">
              <h3 className="text-amber-400 font-bold text-2xl mb-4">⚠️ Critical Trading Realities</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">📉</span>
                  <div>
                    <p className="font-bold text-white">90% of traders lose money initially</p>
                    <p>Success requires education, practice, and discipline. Most fail due to lack of preparation.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">💰</span>
                  <div>
                    <p className="font-bold text-white">You need risk capital only</p>
                    <p>Never trade with money you can't afford to lose. Trading is speculation, not guaranteed income.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">📚</span>
                  <div>
                    <p className="font-bold text-white">Education is non-negotiable</p>
                    <p>Successful traders spend months or years learning before risking significant capital.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🧠</span>
                  <div>
                    <p className="font-bold text-white">Psychology {'>'} Strategy</p>
                    <p>The best strategy fails without emotional discipline. Fear and greed destroy accounts faster than bad trades.</p>
                  </div>
                </li>
              </ul>
            </div>

            <h3 className="text-white font-bold text-2xl mt-8 mb-4">🔬 Two Pillars of Market Analysis</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/10 p-6 rounded-xl border border-[#6366F1]/30">
                <h4 className="text-2xl font-bold text-white mb-4">📊 Technical Analysis</h4>
                <p className="mb-4">
                  The study of price charts, patterns, and indicators to predict future movements. Based on the belief that history repeats itself and all information is reflected in price.
                </p>
                <p className="font-bold text-white mb-2">Key Components:</p>
                <ul className="space-y-2 list-disc list-inside ml-4">
                  <li>Candlestick patterns (doji, hammer, engulfing)</li>
                  <li>Chart patterns (head & shoulders, triangles, flags)</li>
                  <li>Indicators (RSI, MACD, Moving Averages, Bollinger Bands)</li>
                  <li>Support & resistance levels</li>
                  <li>Trend lines and channels</li>
                  <li>Volume analysis</li>
                  <li>Fibonacci retracements</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-emerald-500/20 to-blue-500/10 p-6 rounded-xl border border-emerald-500/30">
                <h4 className="text-2xl font-bold text-white mb-4">📰 Fundamental Analysis</h4>
                <p className="mb-4">
                  The examination of economic indicators, company financials, news events, and market sentiment to determine asset value and direction.
                </p>
                <p className="font-bold text-white mb-2">Key Components:</p>
                <ul className="space-y-2 list-disc list-inside ml-4">
                  <li>Economic reports (GDP, employment, inflation)</li>
                  <li>Central bank policies and interest rates</li>
                  <li>Corporate earnings and revenue</li>
                  <li>Geopolitical events and news</li>
                  <li>Market sentiment and investor confidence</li>
                  <li>Supply and demand dynamics</li>
                  <li>Sector rotation and industry trends</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Lesson 2 - MASSIVELY EXPANDED */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">Lesson 2: Deep Dive into Financial Markets</h2>
          
          <p className="text-xl text-neutral-300 mb-8 leading-relaxed">
            Financial markets are complex ecosystems where trillions of dollars change hands daily. Understanding each market's unique characteristics is crucial for choosing where to trade and developing appropriate strategies.
          </p>

          {/* Stock Market Section */}
          <div className="mb-12 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 p-8 rounded-2xl border border-blue-500/20">
            <h3 className="text-3xl font-bold text-white mb-6">📈 Stock Market (Equities)</h3>
            <div className="mb-6">
              <Image
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
                alt="Stock Market"
                width={800}
                height={400}
                className="w-full rounded-xl"
              />
            </div>
            <p className="text-lg text-neutral-300 mb-4">
              The stock market allows you to trade ownership shares in publicly-traded companies. When you buy a stock, you become a partial owner of that company and can profit from its growth.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-xl font-bold text-white mb-3">✅ Advantages</h4>
                <ul className="space-y-2 text-neutral-300 list-disc list-inside ml-4">
                  <li>Regulated and transparent markets</li>
                  <li>Dividend income from profitable companies</li>
                  <li>Wide variety of stocks across all sectors</li>
                  <li>Protection from SIPC insurance (up to $500k)</li>
                  <li>Extensive research and analysis tools available</li>
                  <li>Long-term wealth building potential</li>
                  <li>Ownership rights and voting power</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-3">⚠️ Considerations</h4>
                <ul className="space-y-2 text-neutral-300 list-disc list-inside ml-4">
                  <li>Limited trading hours (9:30 AM - 4:00 PM EST)</li>
                  <li>Requires more capital per share for expensive stocks</li>
                  <li>Company-specific risks (earnings, management)</li>
                  <li>Market can be closed during major news events</li>
                  <li>Pattern Day Trading (PDT) rule: Need $25k minimum</li>
                  <li>Settlement times (T+2 days)</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h4 className="text-white font-bold text-xl mb-4">🎯 Popular Stock Categories</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="font-bold text-[#6366F1] mb-2">Blue Chips</p>
                  <p className="text-sm text-neutral-400">Large, stable companies: AAPL, MSFT, JPM</p>
                </div>
                <div>
                  <p className="font-bold text-[#6366F1] mb-2">Growth Stocks</p>
                  <p className="text-sm text-neutral-400">High-growth potential: TSLA, NVDA, AMZN</p>
                </div>
                <div>
                  <p className="font-bold text-[#6366F1] mb-2">Penny Stocks</p>
                  <p className="text-sm text-neutral-400">Under $5/share, high risk/reward</p>
                </div>
              </div>
            </div>
          </div>

          {/* Forex Section */}
          <div className="mb-12 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 p-8 rounded-2xl border border-emerald-500/20">
            <h3 className="text-3xl font-bold text-white mb-6">💱 Forex Market (Foreign Exchange)</h3>
            <p className="text-lg text-neutral-300 mb-4">
              The Forex market is the world's largest financial market, with over $7.5 trillion in daily trading volume. Currencies are traded in pairs (EUR/USD, GBP/JPY), where you simultaneously buy one currency and sell another.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-xl font-bold text-white mb-3">✅ Advantages</h4>
                <ul className="space-y-2 text-neutral-300 list-disc list-inside ml-4">
                  <li>24-hour market, 5 days a week (Monday-Friday)</li>
                  <li>Highest liquidity of any financial market</li>
                  <li>Low capital requirements (can start with $100)</li>
                  <li>High leverage available (up to 1:500 internationally)</li>
                  <li>No exchange fees, only bid-ask spreads</li>
                  <li>Trade both directions equally (long/short)</li>
                  <li>Major pairs have tight spreads</li>
                  <li>No central exchange, decentralized trading</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-3">⚠️ Considerations</h4>
                <ul className="space-y-2 text-neutral-300 list-disc list-inside ml-4">
                  <li>High leverage = higher risk of losses</li>
                  <li>Complex factors affecting currency values</li>
                  <li>Less regulation than stock markets</li>
                  <li>Broker counterparty risk</li>
                  <li>Requires understanding of global economics</li>
                  <li>Weekend gaps can be significant</li>
                  <li>Smaller moves require larger positions</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
              <h4 className="text-white font-bold text-xl mb-4">🌍 Major Currency Pairs</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { pair: "EUR/USD", name: "Euro/US Dollar", nickname: "\"Fiber\"", volume: "Most traded pair - 24% of daily volume" },
                  { pair: "USD/JPY", name: "US Dollar/Japanese Yen", nickname: "\"Gopher\"", volume: "Safe-haven pair, 13% of volume" },
                  { pair: "GBP/USD", name: "British Pound/US Dollar", nickname: "\"Cable\"", volume: "High volatility, 9% of volume" },
                  { pair: "USD/CHF", name: "US Dollar/Swiss Franc", nickname: "\"Swissie\"", volume: "Safe-haven currency pair" },
                  { pair: "AUD/USD", name: "Australian Dollar/US Dollar", nickname: "\"Aussie\"", volume: "Commodity-linked currency" },
                  { pair: "USD/CAD", name: "US Dollar/Canadian Dollar", nickname: "\"Loonie\"", volume: "Oil-sensitive pair" }
                ].map((curr, i) => (
                  <div key={i} className="bg-emerald-500/5 p-4 rounded-lg">
                    <p className="font-bold text-emerald-400 text-lg mb-1">{curr.pair}</p>
                    <p className="text-sm text-neutral-400 mb-1">{curr.name}</p>
                    <p className="text-xs text-neutral-500 mb-2">{curr.nickname}</p>
                    <p className="text-sm text-neutral-300">{curr.volume}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-500/10 p-6 rounded-xl border border-amber-500/30">
              <h4 className="text-amber-400 font-bold text-xl mb-3">📅 Forex Trading Sessions</h4>
              <div className="space-y-3">
                <div>
                  <p className="font-bold text-white">Sydney Session: 5:00 PM - 2:00 AM EST</p>
                  <p className="text-neutral-300 text-sm">Lower volatility, AUD/JPY pairs most active</p>
                </div>
                <div>
                  <p className="font-bold text-white">Tokyo Session: 7:00 PM - 4:00 AM EST</p>
                  <p className="text-neutral-300 text-sm">JPY pairs active, moderate volatility</p>
                </div>
                <div>
                  <p className="font-bold text-white">London Session: 3:00 AM - 12:00 PM EST ⭐ Most Active</p>
                  <p className="text-neutral-300 text-sm">Highest volume, 35% of all forex trades</p>
                </div>
                <div>
                  <p className="font-bold text-white">New York Session: 8:00 AM - 5:00 PM EST</p>
                  <p className="text-neutral-300 text-sm">USD pairs most volatile, overlaps with London</p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="font-bold text-emerald-400">⚡ Best Trading Time: London/NY Overlap (8 AM - 12 PM EST)</p>
                  <p className="text-neutral-300 text-sm">Highest liquidity and volatility, tightest spreads</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cryptocurrency Section */}
          <div className="mb-12 bg-gradient-to-br from-purple-500/10 to-pink-500/5 p-8 rounded-2xl border border-purple-500/20">
            <h3 className="text-3xl font-bold text-white mb-6">₿ Cryptocurrency Market</h3>
            <p className="text-lg text-neutral-300 mb-4">
              The newest and most volatile market, cryptocurrencies are decentralized digital assets that operate on blockchain technology. Trading never stops—24 hours a day, 7 days a week, 365 days a year.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-xl font-bold text-white mb-3">✅ Advantages</h4>
                <ul className="space-y-2 text-neutral-300 list-disc list-inside ml-4">
                  <li>24/7/365 trading - never closes</li>
                  <li>Extremely high volatility = profit opportunities</li>
                  <li>Low barriers to entry</li>
                  <li>No central authority or regulation</li>
                  <li>Fast transaction settlements</li>
                  <li>Global accessibility</li>
                  <li>Fractional ownership (buy $10 of BTC)</li>
                  <li>Transparent blockchain transactions</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-3">⚠️ Considerations</h4>
                <ul className="space-y-2 text-neutral-300 list-disc list-inside ml-4">
                  <li>Extreme volatility can cause massive losses</li>
                  <li>Unregulated market with scam risks</li>
                  <li>Exchange hacks and security concerns</li>
                  <li>Tax implications can be complex</li>
                  <li>Liquidity varies greatly by coin</li>
                  <li>Emotional trading due to 24/7 access</li>
                  <li>Price manipulation on smaller coins</li>
                  <li>Regulatory uncertainty</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h4 className="text-white font-bold text-xl mb-4">🪙 Major Cryptocurrencies</h4>
              <div className="space-y-4">
                {[
                  { name: "Bitcoin (BTC)", mc: "$1.7T+", desc: "The original cryptocurrency, 'digital gold', most secure and established" },
                  { name: "Ethereum (ETH)", mc: "$350B+", desc: "Smart contract platform, powers DeFi and NFTs, programmable blockchain" },
                  { name: "Solana (SOL)", mc: "$70B+", desc: "High-speed blockchain, ultra-low fees, growing ecosystem" },
                  { name: "Ripple (XRP)", mc: "$120B+", desc: "Payment protocol for banks, fast cross-border transfers" },
                  { name: "Cardano (ADA)", mc: "$30B+", desc: "Research-driven blockchain, proof-of-stake consensus" },
                  { name: "Altcoins", mc: "Varies", desc: "Thousands of alternative coins, highly speculative, research required" }
                ].map((crypto, i) => (
                  <div key={i} className="flex justify-between items-center bg-purple-500/5 p-4 rounded-lg">
                    <div className="flex-1">
                      <p className="font-bold text-purple-400 text-lg">{crypto.name}</p>
                      <p className="text-sm text-neutral-300">{crypto.desc}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-xs text-neutral-500">Market Cap</p>
                      <p className="font-bold text-white">{crypto.mc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Indices and Commodities */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/5 p-6 rounded-xl border border-orange-500/20">
              <h3 className="text-2xl font-bold text-white mb-4">📊 Stock Indices</h3>
              <p className="text-neutral-300 mb-4">
                Indices track the performance of a basket of stocks, representing a sector or entire market. Trade the overall market direction without picking individual stocks.
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 p-3 rounded-lg">
                  <p className="font-bold text-orange-400">S&P 500 (SPX)</p>
                  <p className="text-sm text-neutral-400">500 largest US companies, market benchmark</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg">
                  <p className="font-bold text-orange-400">NASDAQ-100</p>
                  <p className="text-sm text-neutral-400">100 largest non-financial companies, tech-heavy</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg">
                  <p className="font-bold text-orange-400">Dow Jones (DJI)</p>
                  <p className="text-sm text-neutral-400">30 major US companies, oldest index</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg">
                  <p className="font-bold text-orange-400">DAX 40</p>
                  <p className="text-sm text-neutral-400">German stocks, European market indicator</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-amber-500/5 p-6 rounded-xl border border-yellow-500/20">
              <h3 className="text-2xl font-bold text-white mb-4">🛢️ Commodities</h3>
              <p className="text-neutral-300 mb-4">
                Trade raw materials and resources. Great for hedging inflation and portfolio diversification.
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 p-3 rounded-lg">
                  <p className="font-bold text-yellow-400">Gold (XAU/USD)</p>
                  <p className="text-sm text-neutral-400">Safe-haven asset, inflation hedge</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg">
                  <p className="font-bold text-yellow-400">Crude Oil (CL)</p>
                  <p className="text-sm text-neutral-400">Most traded commodity, global economy indicator</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg">
                  <p className="font-bold text-yellow-400">Silver (XAG/USD)</p>
                  <p className="text-sm text-neutral-400">Industrial and investment metal</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg">
                  <p className="font-bold text-yellow-400">Natural Gas (NG)</p>
                  <p className="text-sm text-neutral-400">Energy commodity, seasonal patterns</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Lesson 3 - MASSIVELY EXPANDED 50+ TERMS */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">Lesson 3: Master Trading Terminology (50+ Essential Terms)</h2>
          
          <p className="text-xl text-neutral-300 mb-8">
            Understanding trading language is crucial for reading charts, executing orders, and communicating with other traders. Here's your complete glossary organized by category.
          </p>

          {/* Order Types */}
          <div className="mb-10 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 p-8 rounded-2xl border border-blue-500/20">
            <h3 className="text-3xl font-bold text-white mb-6">📋 Order Types</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { term: "Market Order", def: "Buy or sell immediately at the current best available price. Guarantees execution but not price." },
                { term: "Limit Order", def: "Set a specific price you want to buy/sell at. Only executes if price reaches your level." },
                { term: "Stop Loss", def: "Automatic order that closes your position when price moves against you, limiting losses." },
                { term: "Take Profit", def: "Automatic order that closes your position when target profit is reached." },
                { term: "Stop-Limit Order", def: "Combines stop and limit: triggers at stop price, then becomes limit order." },
                { term: "Trailing Stop", def: "Stop loss that moves with price in your favor, locking in profits as position improves." },
                { term: "Fill or Kill (FOK)", def: "Order must be executed immediately in full or canceled entirely." },
                { term: "Good Till Cancelled (GTC)", def: "Order remains active until you cancel it or it executes." }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 p-5 rounded-xl">
                  <p className="font-bold text-blue-400 text-lg mb-2">{item.term}</p>
                  <p className="text-neutral-300 text-sm">{item.def}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Position and Trading Terms */}
          <div className="mb-10 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 p-8 rounded-2xl border border-emerald-500/20">
            <h3 className="text-3xl font-bold text-white mb-6">📍 Position & Trading Terms</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { term: "Long Position", def: "Buying an asset expecting price to rise. \"Going long\" = bullish bet." },
                { term: "Short Position", def: "Selling borrowed asset expecting price to fall. Profit when price drops." },
                { term: "Leverage", def: "Borrowing capital to increase position size. 10x leverage = control $10k with $1k." },
                { term: "Margin", def: "Collateral required to open leveraged position. Margin call = need more funds." },
                { term: "Lot Size", def: "Standard unit of trading. Forex: standard (100k), mini (10k), micro (1k) lots." },
                { term: "Position Size", def: "Amount of capital allocated to a single trade. Critical for risk management." },
                { term: "Entry Point", def: "Price level where you open a position." },
                { term: "Exit Point", def: "Price level where you close position (profit target or stop loss)." },
                { term: "Breakeven", def: "Point where trade has zero profit/loss. Moving stop to entry = \"breakeven stop\"." },
                { term: "Drawdown", def: "Peak-to-trough decline in account value. 20% drawdown = account fell 20% from high." }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 p-5 rounded-xl">
                  <p className="font-bold text-emerald-400 text-lg mb-2">{item.term}</p>
                  <p className="text-neutral-300 text-sm">{item.def}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chart Analysis Terms */}
          <div className="mb-10 bg-gradient-to-br from-purple-500/10 to-pink-500/5 p-8 rounded-2xl border border-purple-500/20">
            <h3 className="text-3xl font-bold text-white mb-6">📊 Chart Analysis Terms</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { term: "Support Level", def: "Price floor where buying pressure prevents further drops. Asset \"bounces\" here." },
                { term: "Resistance Level", def: "Price ceiling where selling pressure prevents further rises. Asset gets \"rejected\"." },
                { term: "Trend", def: "Overall price direction: Uptrend (higher highs/lows), Downtrend (lower highs/lows), Sideways." },
                { term: "Breakout", def: "Price breaks through support/resistance with strong momentum. Signals new trend." },
                { term: "Breakdown", def: "Price breaks below support level, typically bearish signal." },
                { term: "Consolidation", def: "Period where price moves sideways in tight range, building energy for next move." },
                { term: "Pullback/Retracement", def: "Temporary price reversal within larger trend. Buying opportunity in uptrend." },
                { term: "Reversal", def: "Trend changes direction completely. Uptrend becomes downtrend or vice versa." },
                { term: "Candlestick", def: "Price bar showing open, high, low, close (OHLC) for specific time period." },
                { term: "Wick/Shadow", def: "Lines above/below candle body showing high/low price. Long wicks = rejection." },
                { term: "Volume", def: "Number of shares/contracts traded. High volume confirms price moves." },
                { term: "Timeframe", def: "Chart period: M1 (1-minute), H1 (1-hour), D1 (daily), etc. Multiple timeframe analysis key." }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 p-5 rounded-xl">
                  <p className="font-bold text-purple-400 text-lg mb-2">{item.term}</p>
                  <p className="text-neutral-300 text-sm">{item.def}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators and Tools */}
          <div className="mb-10 bg-gradient-to-br from-orange-500/10 to-red-500/5 p-8 rounded-2xl border border-orange-500/20">
            <h3 className="text-3xl font-bold text-white mb-6">🔧 Technical Indicators</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { term: "Moving Average (MA)", def: "Average price over X periods. Smooths price action, shows trend direction." },
                { term: "Exponential MA (EMA)", def: "MA giving more weight to recent prices. More responsive than simple MA." },
                { term: "RSI (Relative Strength Index)", def: "Momentum indicator (0-100). Above 70 = overbought, below 30 = oversold." },
                { term: "MACD", def: "Trend and momentum indicator. Histogram shows divergence between two moving averages." },
                { term: "Bollinger Bands", def: "Volatility bands around price. Price at upper band = overbought, lower = oversold." },
                { term: "Fibonacci Retracement", def: "Horizontal lines at 23.6%, 38.2%, 50%, 61.8%, 78.6% for support/resistance." },
                { term: "Stochastic Oscillator", def: "Compares closing price to price range. Shows momentum and reversal points." },
                { term: "Volume Profile", def: "Shows how much volume traded at each price level. High volume = important level." }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 p-5 rounded-xl">
                  <p className="font-bold text-orange-400 text-lg mb-2">{item.term}</p>
                  <p className="text-neutral-300 text-sm">{item.def}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Management Terms */}
          <div className="mb-10 bg-gradient-to-br from-red-500/10 to-rose-500/5 p-8 rounded-2xl border border-red-500/20">
            <h3 className="text-3xl font-bold text-white mb-6">🛡️ Risk Management Terms</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { term: "Risk/Reward Ratio (R:R)", def: "Potential profit vs potential loss. 3:1 R:R = risk $100 to make $300." },
                { term: "Win Rate", def: "Percentage of profitable trades. 60% win rate = 60 winners out of 100 trades." },
                { term: "Expectancy", def: "Average amount you expect to win per trade over time. Combines win rate + R:R." },
                { term: "Max Risk Per Trade", def: "% of account risked on single trade. Professionals use 1-2%, never exceed 5%." },
                { term: "Portfolio Allocation", def: "How capital is divided across different assets/strategies." },
                { term: "Correlation", def: "How assets move together. Positive correlation = move same direction." },
                { term: "Diversification", def: "Spreading risk across multiple uncorrelated assets/strategies." },
                { term: "Slippage", def: "Difference between expected price and execution price. Common in fast markets." }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 p-5 rounded-xl">
                  <p className="font-bold text-red-400 text-lg mb-2">{item.term}</p>
                  <p className="text-neutral-300 text-sm">{item.def}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Market Participants and Psychology */}
          <div className="mb-10 bg-gradient-to-br from-yellow-500/10 to-amber-500/5 p-8 rounded-2xl border border-yellow-500/20">
            <h3 className="text-3xl font-bold text-white mb-6">🧠 Market Psychology & Participants</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { term: "Bull Market", def: "Extended period of rising prices. Optimism dominates, buyers in control." },
                { term: "Bear Market", def: "Extended period of falling prices (usually 20%+ decline). Pessimism prevails." },
                { term: "Volatility", def: "Rate of price movement. High volatility = large price swings = opportunity + risk." },
                { term: "Liquidity", def: "Ease of buying/selling without affecting price. High liquidity = tight spreads." },
                { term: "Spread", def: "Difference between bid (buy) and ask (sell) price. Lower spread = better for traders." },
                { term: "Market Makers", def: "Institutions providing liquidity by posting buy/sell orders. Profit from spread." },
                { term: "Institutional Traders", def: "Banks, hedge funds, large firms moving billions. Create major market moves." },
                { term: "Retail Traders", def: "Individual traders (like you). Smaller capital but can be profitable with skill." },
                { term: "FOMO (Fear of Missing Out)", def: "Emotional urge to enter trades late. Causes bad entries at tops/bottoms." },
                { term: "FUD (Fear, Uncertainty, Doubt)", def: "Negative sentiment spreading fear. Can cause panic selling." },
                { term: "Pump and Dump", def: "Manipulative scheme: artificially inflate price, then sell, causing crash." },
                { term: "Dead Cat Bounce", def: "Brief recovery in downtrend before continuing down. False hope for buyers." }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 p-5 rounded-xl">
                  <p className="font-bold text-yellow-400 text-lg mb-2">{item.term}</p>
                  <p className="text-neutral-300 text-sm">{item.def}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Trading Concepts */}
          <div className="bg-gradient-to-br from-indigo-500/10 to-blue-500/5 p-8 rounded-2xl border border-indigo-500/20">
            <h3 className="text-3xl font-bold text-white mb-6">🎓 Advanced Concepts</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { term: "Backtesting", def: "Testing strategy on historical data to see if it would've been profitable." },
                { term: "Forward Testing", def: "Testing strategy in real-time with demo account before risking real money." },
                { term: "Paper Trading", def: "Simulated trading with fake money to practice without risk." },
                { term: "Algo Trading", def: "Using automated programs to execute trades based on predefined rules." },
                { term: "High-Frequency Trading (HFT)", def: "Ultra-fast algorithmic trading, thousands of trades per second." },
                { term: "Arbitrage", def: "Profiting from price differences of same asset on different exchanges." },
                { term: "Hedging", def: "Opening offsetting position to reduce risk. Like buying insurance." },
                { term: "Scalping", def: "Taking many small profits on quick trades (seconds to minutes)." }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 p-5 rounded-xl">
                  <p className="font-bold text-indigo-400 text-lg mb-2">{item.term}</p>
                  <p className="text-neutral-300 text-sm">{item.def}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-[#6366F1]/20 to-[#EC4899]/20 p-6 rounded-xl border border-[#6366F1]/30">
            <p className="text-white font-bold text-xl mb-2">💡 Pro Tip: Master These Terms</p>
            <p className="text-neutral-300">
              Don't try to memorize everything at once. Reference this glossary as you encounter terms in real trading situations. Within a few weeks of active practice, these will become second nature. Screenshot or bookmark this page for quick reference!
            </p>
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
