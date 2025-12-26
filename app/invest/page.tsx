"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Invest() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0A0F] via-[#1a1a2e] to-[#0A0A0F]">
      {/* Hero */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-24 px-4 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10"></div>
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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-3xl"
        ></motion.div>
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-bold mb-6"
          >
            🚀 LAUNCHING SOON ON PUMP.FUN
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent"
          >
            $TXB
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            TradingXbert Token
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-2xl text-neutral-300 max-w-3xl mx-auto mb-8"
          >
            The world's first AI-powered trading analysis token. Join the revolution where AI meets DeFi.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="https://pump.fun"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-lg font-bold rounded-xl hover:shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300"
            >
              🔥 Buy $TXB on Pump.fun
            </a>
            <Link
              href="#tokenomics"
              className="px-8 py-4 bg-white/10 text-white text-lg font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Why TXB */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-white text-center mb-16"
        >
          Why Invest in $TXB?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "🤖",
              title: "Real Utility",
              description: "Not just another meme coin. TXB powers an actual AI trading platform used by real traders every day."
            },
            {
              icon: "💎",
              title: "Revenue Sharing",
              description: "Token holders get a share of platform revenue from Pro subscriptions and AI analysis fees."
            },
            {
              icon: "🌐",
              title: "Growing Community",
              description: "Join thousands of traders and investors building the future of AI-powered trading."
            },
            {
              icon: "🔒",
              title: "Fair Launch",
              description: "No pre-sale, no team allocation. 100% fair launch on Pump.fun with transparent tokenomics."
            },
            {
              icon: "📈",
              title: "Platform Growth",
              description: "As TradingXbert grows, so does the value of $TXB. Every new user drives token demand."
            },
            {
              icon: "⚡",
              title: "Instant Trading",
              description: "Built on Solana for lightning-fast transactions and minimal fees."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-emerald-500/20 p-8 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-neutral-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tokenomics */}
      <div id="tokenomics" className="max-w-6xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 backdrop-blur-sm rounded-3xl border border-emerald-500/30 p-12"
        >
          <h2 className="text-5xl font-bold text-white text-center mb-12">Tokenomics</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-emerald-400 mb-6">Token Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-neutral-300">Token Name:</span>
                  <span className="text-white font-bold">TradingXbert</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-neutral-300">Ticker:</span>
                  <span className="text-white font-bold">$TXB</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-neutral-300">Blockchain:</span>
                  <span className="text-white font-bold">Solana</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-neutral-300">Total Supply:</span>
                  <span className="text-white font-bold">1,000,000,000</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-neutral-300">Launch Platform:</span>
                  <span className="text-white font-bold">Pump.fun</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-6">Distribution</h3>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-bold">Fair Launch</span>
                    <span className="text-emerald-400 font-bold">100%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-3 rounded-full" style={{width: '100%'}}></div>
                  </div>
                  <p className="text-neutral-400 text-sm mt-2">All tokens available at launch - no team allocation</p>
                </div>
                
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                  <p className="text-emerald-400 font-bold mb-2">🔥 Revenue Distribution</p>
                  <p className="text-neutral-300 text-sm">
                    50% of TradingXbert platform revenue used to buyback and burn $TXB tokens quarterly
                  </p>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
                  <p className="text-cyan-400 font-bold mb-2">💰 Holder Benefits</p>
                  <p className="text-neutral-300 text-sm">
                    Hold $TXB to get discounts on Pro subscriptions and priority access to new features
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Roadmap */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-white text-center mb-16"
        >
          Roadmap
        </motion.h2>

        <div className="space-y-8">
          {[
            {
              phase: "Phase 1: Launch",
              status: "🚀 Coming Soon",
              items: [
                "Launch $TXB on Pump.fun",
                "List on DEX aggregators",
                "Community building on Twitter/Telegram",
                "Initial marketing campaign"
              ]
            },
            {
              phase: "Phase 2: Integration",
              status: "🔜 Q1 2026",
              items: [
                "Integrate $TXB payments on TradingXbert platform",
                "Token holder discounts (hold 10k TXB = 20% off Pro)",
                "First buyback and burn event",
                "CEX listing applications"
              ]
            },
            {
              phase: "Phase 3: Expansion",
              status: "📅 Q2 2026",
              items: [
                "Launch TXB staking for platform revenue share",
                "NFT collection for premium features",
                "Partnership with major crypto exchanges",
                "Mobile app with TXB wallet integration"
              ]
            },
            {
              phase: "Phase 4: Ecosystem",
              status: "🌟 Q3 2026",
              items: [
                "TXB DAO governance launched",
                "Multi-chain expansion (Ethereum, BSC)",
                "AI trading bot marketplace (pay with TXB)",
                "Major exchange listings"
              ]
            }
          ].map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:border-emerald-500/30 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h3 className="text-2xl font-bold text-white mb-2 md:mb-0">{phase.phase}</h3>
                <span className="text-emerald-400 font-bold">{phase.status}</span>
              </div>
              <ul className="space-y-3">
                {phase.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">✓</span>
                    <span className="text-neutral-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How to Buy */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-3xl border border-cyan-500/30 p-12 text-center"
        >
          <h2 className="text-5xl font-bold text-white mb-8">How to Buy $TXB</h2>
          
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { step: "1", title: "Get a Wallet", desc: "Download Phantom or Solflare wallet" },
              { step: "2", title: "Add SOL", desc: "Buy SOL on any exchange and transfer to wallet" },
              { step: "3", title: "Visit Pump.fun", desc: "Go to pump.fun and search for $TXB" },
              { step: "4", title: "Swap & Hold", desc: "Swap SOL for $TXB and HODL! 💎" }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 rounded-xl p-6"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-white font-bold mb-2">{step.title}</h3>
                <p className="text-neutral-400 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <a
            href="https://pump.fun"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xl font-bold rounded-xl hover:shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300"
          >
            🚀 Launch Pump.fun
          </a>
        </motion.div>
      </div>

      {/* Join Community */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-5xl font-bold text-white mb-8">Join the TXB Army</h2>
          <p className="text-xl text-neutral-300 mb-12 max-w-2xl mx-auto">
            Connect with thousands of traders and investors in our growing community
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="https://twitter.com/tradingxbert"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#1DA1F2]/20 border border-[#1DA1F2]/50 text-white font-bold rounded-xl hover:bg-[#1DA1F2]/30 transition-all duration-300"
            >
              🐦 Twitter
            </a>
            <a
              href="https://t.me/tradingxbert"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#0088cc]/20 border border-[#0088cc]/50 text-white font-bold rounded-xl hover:bg-[#0088cc]/30 transition-all duration-300"
            >
              💬 Telegram
            </a>
            <a
              href="https://discord.gg/tradingxbert"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#5865F2]/20 border border-[#5865F2]/50 text-white font-bold rounded-xl hover:bg-[#5865F2]/30 transition-all duration-300"
            >
              🎮 Discord
            </a>
          </div>
        </motion.div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-red-500/10 border border-red-500/30 rounded-xl p-6"
        >
          <p className="text-red-400 font-bold mb-2">⚠️ Investment Disclaimer</p>
          <p className="text-neutral-400 text-sm">
            Cryptocurrency investments carry high risk. $TXB is a utility token for the TradingXbert platform. 
            This is not financial advice. Do your own research (DYOR) before investing. Never invest more than you can afford to lose. 
            Past performance does not guarantee future results.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
